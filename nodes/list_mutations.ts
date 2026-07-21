import { SchemaInput, ListOperationFieldsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, buildFieldsForOutputType } from './graphql_helpers';

/**
 * List every field declared on a schema's Mutation root type — the API's
 * full set of mutations — with the same per-field detail as GetTypeFields
 * (type, nullability, args, description, deprecation). Mutation is
 * optional per the GraphQL spec, so this returns an empty list (not an
 * error) when the schema declares none; returns a structured error only
 * if the schema itself fails to build.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listMutations(ax: AxiomContext, input: SchemaInput): ListOperationFieldsResult {
  const result = new ListOperationFieldsResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const mutationType = built.schema.getMutationType();
  result.setValid(true);
  result.setFieldsList(mutationType ? buildFieldsForOutputType(mutationType) : []);
  return result;
}
