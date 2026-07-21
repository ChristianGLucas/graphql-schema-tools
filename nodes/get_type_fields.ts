import { isObjectType, isInterfaceType, isInputObjectType, GraphQLObjectType, GraphQLInterfaceType, GraphQLInputObjectType } from 'graphql';
import { GetTypeFieldsInput, GetTypeFieldsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, buildFieldsForOutputType, buildFieldsForInputType, typeKindOf } from './graphql_helpers';

/**
 * Extract one named type's fields from a schema — for an object,
 * interface, or input-object type: each field's name, GraphQL type
 * (rendered as SDL syntax, e.g. "[Post!]!"), nullability, arguments
 * (name/type/default/description), description, and deprecation status.
 * Returns a structured error if the schema fails to build, the type does
 * not exist, or the type has no fields (a scalar, enum, or union — use
 * ListEnumValues / ListUnionMembers for those).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function getTypeFields(ax: AxiomContext, input: GetTypeFieldsInput): GetTypeFieldsResult {
  const result = new GetTypeFieldsResult();
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

  if (isObjectType(type) || isInterfaceType(type)) {
    result.setValid(true);
    result.setFieldsList(buildFieldsForOutputType(type as GraphQLObjectType | GraphQLInterfaceType));
    return result;
  }
  if (isInputObjectType(type)) {
    result.setValid(true);
    result.setFieldsList(buildFieldsForInputType(type as GraphQLInputObjectType));
    return result;
  }

  result.setValid(false);
  result.setError(
    `Type "${typeName}" is a ${typeKindOf(type)} and has no fields; ` +
      `use ListEnumValues for an ENUM or ListUnionMembers for a UNION.`
  );
  return result;
}
