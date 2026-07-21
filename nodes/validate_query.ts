import { validate as gqlValidate } from 'graphql';
import { ValidateQueryInput, ValidateQueryResult, GraphQLError as GraphQLErrorMsg } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, parseDocumentSafe, toErrorProto } from './graphql_helpers';

/**
 * Validate a GraphQL query/operation document against a caller-supplied
 * SDL schema, running the complete GraphQL Validation spec (unknown
 * fields/types/arguments, type mismatches, fragment cycles, undefined
 * variables, and every other validation rule). Returns valid=true, or
 * valid=false with one structured, located error per violation —
 * including a schema-build failure, reported the same way.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function validateQuery(ax: AxiomContext, input: ValidateQueryInput): ValidateQueryResult {
  const result = new ValidateQueryResult();

  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    const e = new GraphQLErrorMsg();
    e.setMessage(built.error || 'Schema failed to build.');
    result.setValid(false);
    result.setErrorsList([e]);
    return result;
  }

  const { doc, error } = parseDocumentSafe(input.getQuery());
  if (error || !doc) {
    result.setValid(false);
    if (error) result.setErrorsList([error]);
    return result;
  }

  const errors = gqlValidate(built.schema, doc);
  if (errors.length > 0) {
    result.setValid(false);
    result.setErrorsList(errors.map((e) => toErrorProto(e)));
    return result;
  }

  result.setValid(true);
  return result;
}
