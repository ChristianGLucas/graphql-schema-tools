import { isUnionType, GraphQLUnionType } from 'graphql';
import { ListUnionMembersInput, ListUnionMembersResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, typeKindOf } from './graphql_helpers';

/**
 * List the member object-type names of a named union type in a schema.
 * Returns a structured error if the schema fails to build, the type does
 * not exist, or the named type is not a union.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listUnionMembers(ax: AxiomContext, input: ListUnionMembersInput): ListUnionMembersResult {
  const result = new ListUnionMembersResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const unionName = input.getUnionName();
  const type = built.schema.getType(unionName);
  if (!type) {
    result.setValid(false);
    result.setError(`Type "${unionName}" not found in schema.`);
    return result;
  }
  if (!isUnionType(type)) {
    result.setValid(false);
    result.setError(`Type "${unionName}" is a ${typeKindOf(type)}, not a union.`);
    return result;
  }

  result.setValid(true);
  result.setMembersList((type as GraphQLUnionType).getTypes().map((t) => t.name));
  return result;
}
