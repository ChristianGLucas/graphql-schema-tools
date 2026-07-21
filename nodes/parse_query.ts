import { Kind, OperationDefinitionNode } from 'graphql';
import { QueryInput, ParseQueryResult, OperationSummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseDocumentSafe } from './graphql_helpers';

/**
 * Syntactically parse a GraphQL query/operation document string, returning
 * every operation (name + operation type) and every fragment name found,
 * in document order. Grammar only — does not check the document against
 * any schema; see ValidateQuery for that.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseQuery(ax: AxiomContext, input: QueryInput): ParseQueryResult {
  const result = new ParseQueryResult();
  const { doc, error } = parseDocumentSafe(input.getQuery());
  if (error || !doc) {
    result.setValid(false);
    if (error) result.setErrorsList([error]);
    return result;
  }

  const operations: OperationSummary[] = [];
  const fragmentNames: string[] = [];
  for (const def of doc.definitions) {
    if (def.kind === Kind.OPERATION_DEFINITION) {
      const opDef = def as OperationDefinitionNode;
      const summary = new OperationSummary();
      summary.setName(opDef.name ? opDef.name.value : '');
      summary.setOperationType(opDef.operation);
      operations.push(summary);
    } else if (def.kind === Kind.FRAGMENT_DEFINITION) {
      fragmentNames.push(def.name.value);
    }
  }

  result.setValid(true);
  result.setOperationsList(operations);
  result.setFragmentNamesList(fragmentNames);
  return result;
}
