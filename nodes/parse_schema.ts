import { SchemaInput, ParseSchemaResult, SchemaDefinitionSummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseDocumentSafe } from './graphql_helpers';

/**
 * Syntactically parse a GraphQL SDL schema string, returning every
 * top-level definition found (types, directives, schema/type extensions)
 * with its AST node kind. Grammar only — does not check that referenced
 * types resolve; see ValidateSchema for full semantic checking.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseSchema(ax: AxiomContext, input: SchemaInput): ParseSchemaResult {
  const result = new ParseSchemaResult();
  const { doc, error } = parseDocumentSafe(input.getSchema());
  if (error || !doc) {
    result.setValid(false);
    if (error) result.setErrorsList([error]);
    return result;
  }
  const definitions: SchemaDefinitionSummary[] = [];
  for (const def of doc.definitions) {
    const summary = new SchemaDefinitionSummary();
    const named = def as { name?: { value: string } };
    summary.setName(named.name ? named.name.value : '');
    summary.setAstKind(def.kind);
    definitions.push(summary);
  }
  result.setValid(true);
  result.setDefinitionsList(definitions);
  return result;
}
