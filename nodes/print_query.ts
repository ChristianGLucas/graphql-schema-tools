import { print as gqlPrint } from 'graphql';
import { QueryInput, PrintQueryResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseDocumentSafe } from './graphql_helpers';

/**
 * Pretty-print a query/operation document back to canonical,
 * deterministically-formatted GraphQL text. Returns a structured, located
 * syntax error (not a crash) if the document does not parse.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function printQuery(ax: AxiomContext, input: QueryInput): PrintQueryResult {
  const result = new PrintQueryResult();
  const { doc, error } = parseDocumentSafe(input.getQuery());
  if (error || !doc) {
    result.setValid(false);
    if (error) result.setErrorsList([error]);
    return result;
  }

  result.setValid(true);
  result.setFormattedQuery(gqlPrint(doc));
  return result;
}
