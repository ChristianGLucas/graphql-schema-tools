import { Kind, OperationDefinitionNode } from 'graphql';
import { QueryInput, ExtractOperationsResult, OperationSummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseDocumentSafe } from './graphql_helpers';

/**
 * Extract every operation from a (possibly multi-operation) GraphQL query
 * document, each with its name (empty for an anonymous operation) and
 * operation type (query/mutation/subscription), in document order.
 * Returns a structured, located syntax error if the document does not
 * parse.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractOperations(ax: AxiomContext, input: QueryInput): ExtractOperationsResult {
  const result = new ExtractOperationsResult();
  const { doc, error } = parseDocumentSafe(input.getQuery());
  if (error || !doc) {
    result.setValid(false);
    if (error) result.setErrorsList([error]);
    return result;
  }

  const operations: OperationSummary[] = [];
  for (const def of doc.definitions) {
    if (def.kind === Kind.OPERATION_DEFINITION) {
      const opDef = def as OperationDefinitionNode;
      const summary = new OperationSummary();
      summary.setName(opDef.name ? opDef.name.value : '');
      summary.setOperationType(opDef.operation);
      operations.push(summary);
    }
  }

  result.setValid(true);
  result.setOperationsList(operations);
  return result;
}
