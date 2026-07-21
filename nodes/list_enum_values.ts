import { isEnumType, GraphQLEnumType } from 'graphql';
import { ListEnumValuesInput, ListEnumValuesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, buildEnumValueInfoList, typeKindOf } from './graphql_helpers';

/**
 * List every value declared on one named enum type in a schema — each
 * value's name, description, and deprecation status. Returns a structured
 * error if the schema fails to build, the type does not exist, or the
 * named type is not an enum.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listEnumValues(ax: AxiomContext, input: ListEnumValuesInput): ListEnumValuesResult {
  const result = new ListEnumValuesResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const typeName = input.getTypeName();
  const type = built.schema.getType(typeName);
  if (!type) {
    result.setValid(false);
    result.setError(`Type "${typeName}" not found in schema.`);
    return result;
  }
  if (!isEnumType(type)) {
    result.setValid(false);
    result.setError(`Type "${typeName}" is a ${typeKindOf(type)}, not an enum.`);
    return result;
  }

  result.setValid(true);
  result.setValuesList(buildEnumValueInfoList((type as GraphQLEnumType).getValues()));
  return result;
}
