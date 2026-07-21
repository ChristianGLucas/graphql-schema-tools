import { isInterfaceType, GraphQLInterfaceType } from 'graphql';
import { ListInterfaceImplementationsInput, ListInterfaceImplementationsResult, ImplementingType } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe, typeKindOf } from './graphql_helpers';

/**
 * List every type that implements a named interface in a schema — object
 * types, and any other interface that itself implements this one — each
 * with its name and kind (OBJECT or INTERFACE). Returns a structured
 * error if the schema fails to build, the type does not exist, or the
 * named type is not an interface.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listInterfaceImplementations(ax: AxiomContext, input: ListInterfaceImplementationsInput): ListInterfaceImplementationsResult {
  const result = new ListInterfaceImplementationsResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const interfaceName = input.getInterfaceName();
  const type = built.schema.getType(interfaceName);
  if (!type) {
    result.setValid(false);
    result.setError(`Type "${interfaceName}" not found in schema.`);
    return result;
  }
  if (!isInterfaceType(type)) {
    result.setValid(false);
    result.setError(`Type "${interfaceName}" is a ${typeKindOf(type)}, not an interface.`);
    return result;
  }

  const { objects, interfaces } = built.schema.getImplementations(type as GraphQLInterfaceType);
  const implementations: ImplementingType[] = [];
  for (const t of objects) {
    const impl = new ImplementingType();
    impl.setName(t.name);
    impl.setKind('OBJECT');
    implementations.push(impl);
  }
  for (const t of interfaces) {
    const impl = new ImplementingType();
    impl.setName(t.name);
    impl.setKind('INTERFACE');
    implementations.push(impl);
  }

  result.setValid(true);
  result.setImplementationsList(implementations);
  return result;
}
