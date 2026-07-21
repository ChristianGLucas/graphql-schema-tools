import { validateSchema as gqlValidateSchema } from 'graphql';
import { SchemaInput, ValidateSchemaResult, GraphQLError as GraphQLErrorMsg } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, toErrorProto } from './graphql_helpers';

/**
 * Build a GraphQL schema from SDL text and run graphql-js's full semantic
 * well-formedness checks: every referenced type must resolve, interfaces
 * must be correctly implemented, unions/enums must be non-empty, and so
 * on. Returns valid=true, or valid=false with one structured, located
 * error per rule violation.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function validateSchema(ax: AxiomContext, input: SchemaInput): ValidateSchemaResult {
  const result = new ValidateSchemaResult();
  const sdl = input.getSchema();

  // buildSchema throws synchronously for some classes of invalid SDL
  // (duplicate type names, dangling type references) rather than
  // reporting them through validateSchema — both paths are surfaced the
  // same way here so the caller never has to know which one fired.
  const built = buildSchemaSafe(sdl);
  if (built.error || !built.schema) {
    const e = new GraphQLErrorMsg();
    e.setMessage(built.error || 'Schema failed to build.');
    result.setValid(false);
    result.setErrorsList([e]);
    return result;
  }

  const errors = gqlValidateSchema(built.schema);
  if (errors.length > 0) {
    result.setValid(false);
    result.setErrorsList(errors.map((e) => toErrorProto(e)));
    return result;
  }

  result.setValid(true);
  return result;
}
