import { SchemaInput, ListOperationFieldsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, buildFieldsForOutputType } from './graphql_helpers';

/**
 * List every field declared on a schema's Query root type — the API's
 * full set of queries — with the same per-field detail as GetTypeFields
 * (type, nullability, args, description, deprecation). Returns an empty
 * list (not an error) if the schema declares no Query type; returns a
 * structured error only if the schema itself fails to build.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listQueries(ax: AxiomContext, input: SchemaInput): ListOperationFieldsResult {
  const result = new ListOperationFieldsResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const queryType = built.schema.getQueryType();
  result.setValid(true);
  result.setFieldsList(queryType ? buildFieldsForOutputType(queryType) : []);
  return result;
}
