// Shared helpers for every node in this package: bounded, safe entry points
// into graphql-js (parse/build), plus converters from graphql-js's runtime
// types into this package's protobuf messages.
//
// Every caller-supplied schema/query string passes through checkBounds
// BEFORE it reaches graphql-js's parser — this is the package's guard
// against a deeply-nested input driving the parser's recursive descent into
// a native stack overflow (which cannot be caught as a JS exception). The
// scan itself is a single linear pass with no recursion, so it cannot
// itself be attacked the same way. Payload size is the platform's concern,
// not this package's, so there is no byte-size cap here.

import {
  parse,
  print,
  buildSchema,
  GraphQLError,
  GraphQLSchema,
  DocumentNode,
  GraphQLNamedType,
  GraphQLArgument,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumValue,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isScalarType,
  isNonNullType,
} from 'graphql';
import {
  GraphQLError as GraphQLErrorMsg,
  Location,
  ArgInfo,
  FieldInfo,
  EnumValueInfo,
} from '../gen/messages_pb';

/** Hard cap on simultaneous nesting of {, (, [ in the raw text — a
 * stack-overflow guard for graphql-js's recursive-descent parser, not a
 * memory/DoS bound. */
export const MAX_NESTING_DEPTH = 150;

/**
 * Scan raw GraphQL text for a nesting-depth bound BEFORE it is handed to
 * graphql-js. Returns a human-readable rejection reason, or null when the
 * input is within bounds. Single linear pass, no recursion — skips comments
 * (# to end of line) and string/block-string contents so braces inside a
 * string literal don't inflate the count.
 */
export function checkBounds(text: string): string | null {
  let depth = 0;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const ch = text[i];
    if (ch === '#') {
      while (i < n && text[i] !== '\n') i++;
      continue;
    }
    if (ch === '"' && text[i + 1] === '"' && text[i + 2] === '"') {
      i += 3;
      while (i < n && !(text[i] === '"' && text[i + 1] === '"' && text[i + 2] === '"')) {
        i++;
      }
      i += 3;
      continue;
    }
    if (ch === '"') {
      i++;
      while (i < n && text[i] !== '"' && text[i] !== '\n') {
        if (text[i] === '\\') i++;
        i++;
      }
      i++;
      continue;
    }
    if (ch === '{' || ch === '(' || ch === '[') {
      depth++;
      if (depth > MAX_NESTING_DEPTH) {
        return `Input nesting depth exceeds the ${MAX_NESTING_DEPTH}-level limit.`;
      }
    } else if (ch === '}' || ch === ')' || ch === ']') {
      if (depth > 0) depth--;
    }
    i++;
  }
  return null;
}

export function toLocationProtos(
  locations: ReadonlyArray<{ line: number; column: number }> | undefined
): Location[] {
  if (!locations) return [];
  return locations.map((loc) => {
    const l = new Location();
    l.setLine(loc.line);
    l.setColumn(loc.column);
    return l;
  });
}

export function toErrorProto(err: unknown): GraphQLErrorMsg {
  const out = new GraphQLErrorMsg();
  if (err instanceof GraphQLError) {
    out.setMessage(err.message);
    out.setLocationsList(toLocationProtos(err.locations));
    if (err.path && err.path.length > 0) {
      out.setPath(err.path.map(String).join('.'));
    }
  } else if (err instanceof Error) {
    out.setMessage(err.message);
  } else {
    out.setMessage(String(err));
  }
  return out;
}

/** Bounded, non-throwing wrapper around graphql-js `parse`. */
export function parseDocumentSafe(text: string): { doc: DocumentNode | null; error: GraphQLErrorMsg | null } {
  const boundsError = checkBounds(text);
  if (boundsError) {
    const e = new GraphQLErrorMsg();
    e.setMessage(boundsError);
    return { doc: null, error: e };
  }
  try {
    const doc = parse(text);
    return { doc, error: null };
  } catch (err) {
    return { doc: null, error: toErrorProto(err) };
  }
}

/** Bounded, non-throwing wrapper around graphql-js `buildSchema`. */
export function buildSchemaSafe(sdl: string): { schema: GraphQLSchema | null; error: string } {
  const boundsError = checkBounds(sdl);
  if (boundsError) return { schema: null, error: boundsError };
  try {
    const schema = buildSchema(sdl);
    return { schema, error: '' };
  } catch (err) {
    return { schema: null, error: err instanceof Error ? err.message : String(err) };
  }
}

export function typeKindOf(type: GraphQLNamedType): string {
  if (isObjectType(type)) return 'OBJECT';
  if (isInterfaceType(type)) return 'INTERFACE';
  if (isUnionType(type)) return 'UNION';
  if (isEnumType(type)) return 'ENUM';
  if (isInputObjectType(type)) return 'INPUT_OBJECT';
  if (isScalarType(type)) return 'SCALAR';
  return 'UNKNOWN';
}

export function buildArgInfoList(args: ReadonlyArray<GraphQLArgument>): ArgInfo[] {
  return args.map((arg) => {
    const a = new ArgInfo();
    a.setName(arg.name);
    a.setType(String(arg.type));
    a.setDescription(arg.description || '');
    if (arg.defaultValue !== undefined) {
      a.setHasDefaultValue(true);
      a.setDefaultValueJson(JSON.stringify(arg.defaultValue));
    } else {
      a.setHasDefaultValue(false);
      a.setDefaultValueJson('');
    }
    return a;
  });
}

function buildFieldInfo(
  name: string,
  type: { toString(): string },
  description: string | null | undefined,
  args: ReadonlyArray<GraphQLArgument> | null,
  deprecationReason: string | null | undefined
): FieldInfo {
  const f = new FieldInfo();
  f.setName(name);
  f.setType(String(type));
  f.setNullable(!isNonNullType(type as never));
  f.setDescription(description || '');
  if (args) f.setArgsList(buildArgInfoList(args));
  f.setIsDeprecated(!!deprecationReason);
  f.setDeprecationReason(deprecationReason || '');
  return f;
}

/** Fields (with args) of an object or interface type, in declaration order. */
export function buildFieldsForOutputType(type: GraphQLObjectType | GraphQLInterfaceType): FieldInfo[] {
  const fieldMap = type.getFields();
  return Object.values(fieldMap).map((field) =>
    buildFieldInfo(field.name, field.type, field.description, field.args, field.deprecationReason)
  );
}

/** Fields (no args — input fields never take arguments) of an input-object type. */
export function buildFieldsForInputType(type: GraphQLInputObjectType): FieldInfo[] {
  const fieldMap = type.getFields();
  return Object.values(fieldMap).map((field) =>
    buildFieldInfo(field.name, field.type, field.description, null, field.deprecationReason)
  );
}

export function buildEnumValueInfoList(values: ReadonlyArray<GraphQLEnumValue>): EnumValueInfo[] {
  return values.map((v) => {
    const e = new EnumValueInfo();
    e.setName(v.name);
    e.setDescription(v.description || '');
    e.setIsDeprecated(!!v.deprecationReason);
    e.setDeprecationReason(v.deprecationReason || '');
    return e;
  });
}

export { print };
