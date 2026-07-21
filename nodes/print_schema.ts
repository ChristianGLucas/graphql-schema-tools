import { printSchema as gqlPrintSchema } from 'graphql';
import { SchemaInput, PrintSchemaResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe } from './graphql_helpers';

/**
 * Pretty-print a schema back to canonical, deterministically-formatted
 * SDL text — the same output regardless of the input SDL's original
 * whitespace, comment placement, or definition order for an equivalent
 * schema. Returns a structured error if the schema fails to build.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function printSchema(ax: AxiomContext, input: SchemaInput): PrintSchemaResult {
  const result = new PrintSchemaResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  result.setValid(true);
  result.setSdl(gqlPrintSchema(built.schema));
  return result;
}
