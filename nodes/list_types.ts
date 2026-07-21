import { isSpecifiedScalarType, isIntrospectionType } from 'graphql';
import { SchemaInput, ListTypesResult, TypeSummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, typeKindOf } from './graphql_helpers';

/**
 * List every type explicitly defined in a schema's SDL text — object,
 * interface, union, enum, input-object, and custom scalar — each with its
 * name, kind, and description. GraphQL's five built-in scalars (Int,
 * Float, String, Boolean, ID) and introspection meta-types are excluded
 * since the caller did not define them.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listTypes(ax: AxiomContext, input: SchemaInput): ListTypesResult {
  const result = new ListTypesResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const typeMap = built.schema.getTypeMap();
  const types: TypeSummary[] = [];
  for (const name of Object.keys(typeMap).sort()) {
    const type = typeMap[name];
    if (isSpecifiedScalarType(type) || isIntrospectionType(type)) continue;
    const summary = new TypeSummary();
    summary.setName(type.name);
    summary.setKind(typeKindOf(type));
    summary.setDescription(type.description || '');
    types.push(summary);
  }

  result.setValid(true);
  result.setTypesList(types);
  return result;
}
