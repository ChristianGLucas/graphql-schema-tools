import { Kind, OperationDefinitionNode, print as gqlPrint, valueFromASTUntyped } from 'graphql';
import { ExtractVariablesInput, ExtractVariablesResult, VariableInfo } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseDocumentSafe } from './graphql_helpers';

/**
 * Extract the variables one operation declares in its `($var: Type =
 * default)` list — each variable's name, GraphQL type, nullability, and
 * default value (JSON-encoded) when present. `operation_name` is required
 * when the document declares more than one operation, and ignored (the
 * sole operation is used) otherwise. Returns a structured error on a
 * parse failure or an unresolved/missing operation name.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractOperationVariables(ax: AxiomContext, input: ExtractVariablesInput): ExtractVariablesResult {
  const result = new ExtractVariablesResult();
  const { doc, error } = parseDocumentSafe(input.getQuery());
  if (error || !doc) {
    result.setValid(false);
    result.setError(error ? error.getMessage() : 'Failed to parse query document.');
    return result;
  }

  const operations = doc.definitions.filter(
    (def) => def.kind === Kind.OPERATION_DEFINITION
  ) as OperationDefinitionNode[];

  if (operations.length === 0) {
    result.setValid(false);
    result.setError('Document contains no operations.');
    return result;
  }

  const operationName = input.getOperationName();
  let target: OperationDefinitionNode;
  if (operations.length === 1) {
    target = operations[0];
  } else if (!operationName) {
    result.setValid(false);
    result.setError('operation_name is required: the document declares more than one operation.');
    return result;
  } else {
    const found = operations.find((op) => op.name && op.name.value === operationName);
    if (!found) {
      result.setValid(false);
      result.setError(`No operation named "${operationName}" found in the document.`);
      return result;
    }
    target = found;
  }

  const variables: VariableInfo[] = (target.variableDefinitions || []).map((v) => {
    const info = new VariableInfo();
    info.setName(v.variable.name.value);
    info.setType(gqlPrint(v.type));
    info.setNullable(v.type.kind !== Kind.NON_NULL_TYPE);
    if (v.defaultValue) {
      info.setHasDefaultValue(true);
      info.setDefaultValueJson(JSON.stringify(valueFromASTUntyped(v.defaultValue)));
    } else {
      info.setHasDefaultValue(false);
      info.setDefaultValueJson('');
    }
    return info;
  });

  result.setValid(true);
  result.setVariablesList(variables);
  return result;
}
