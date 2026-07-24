import { SchemaInput, ParseSchemaResult } from '../gen/messages_pb';
import { parseSchema } from './parse_schema';
import { testContext } from './test_helpers';
import { MAX_NESTING_DEPTH } from './graphql_helpers';

describe('ParseSchema', () => {
  it('lists every top-level definition with its AST kind (hand-counted from the SDL text)', () => {
    const input = new SchemaInput();
    input.setSchema(`
      "A single blog post"
      type Post {
        id: ID!
        title: String
      }
      enum Status {
        DRAFT
        PUBLISHED
      }
      type Query {
        post(id: ID!): Post
      }
    `);
    const result = parseSchema(testContext, input);
    expect(result).toBeInstanceOf(ParseSchemaResult);
    expect(result.getValid()).toBe(true);
    const defs = result.getDefinitionsList().map((d) => [d.getName(), d.getAstKind()]);
    // Hand-derived from the SDL above: exactly 3 top-level definitions, in order.
    expect(defs).toEqual([
      ['Post', 'ObjectTypeDefinition'],
      ['Status', 'EnumTypeDefinition'],
      ['Query', 'ObjectTypeDefinition'],
    ]);
  });

  it('does not require referenced types to resolve (syntax-only parse)', () => {
    const input = new SchemaInput();
    input.setSchema(`type Query { foo: TotallyUndefinedType }`);
    const result = parseSchema(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getDefinitionsList().length).toBe(1);
  });

  it('returns a located structured error on a syntax error, not a crash', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: }');
    const result = parseSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList().length).toBe(1);
    const err = result.getErrorsList()[0];
    expect(err.getMessage()).toMatch(/Syntax Error/);
    expect(err.getLocationsList().length).toBe(1);
    expect(err.getLocationsList()[0].getLine()).toBe(1);
    expect(err.getLocationsList()[0].getColumn()).toBe(19);
  });

  it('handles a large (multi-MB) input without crashing', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: String }\n' + '#'.repeat(2_000_010));
    const result = parseSchema(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getErrorsList().length).toBe(0);
  });

  it('rejects pathologically deep nesting before it ever reaches the parser', () => {
    const input = new SchemaInput();
    const deep = '{'.repeat(MAX_NESTING_DEPTH + 20) + '}'.repeat(MAX_NESTING_DEPTH + 20);
    input.setSchema(`type Query ${deep}`);
    const result = parseSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/nesting depth/);
  });
});
