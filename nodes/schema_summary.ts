import {
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isScalarType,
  isSpecifiedScalarType,
  isIntrospectionType,
} from 'graphql';
import { SchemaInput, SchemaSummaryResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { buildSchemaSafe } from './graphql_helpers';

/**
 * Compute a simple structural census of a schema: counts of types by kind
 * (object/interface/union/enum/input-object/scalar), the total field
 * count across all object, interface, and input-object types, and which
 * of Query/Mutation/Subscription root types are declared. Returns a
 * structured error if the schema fails to build.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function schemaSummary(ax: AxiomContext, input: SchemaInput): SchemaSummaryResult {
  const result = new SchemaSummaryResult();
  const built = buildSchemaSafe(input.getSchema());
  if (built.error || !built.schema) {
    result.setValid(false);
    result.setError(built.error || 'Schema failed to build.');
    return result;
  }

  const schema = built.schema;
  const typeMap = schema.getTypeMap();

  let objectCount = 0;
  let interfaceCount = 0;
  let unionCount = 0;
  let enumCount = 0;
  let inputObjectCount = 0;
  let scalarCount = 0;
  let totalFieldCount = 0;

  for (const name of Object.keys(typeMap)) {
    const type = typeMap[name];
    if (isSpecifiedScalarType(type) || isIntrospectionType(type)) continue;

    if (isObjectType(type)) {
      objectCount++;
      totalFieldCount += Object.keys(type.getFields()).length;
    } else if (isInterfaceType(type)) {
      interfaceCount++;
      totalFieldCount += Object.keys(type.getFields()).length;
    } else if (isUnionType(type)) {
      unionCount++;
    } else if (isEnumType(type)) {
      enumCount++;
    } else if (isInputObjectType(type)) {
      inputObjectCount++;
      totalFieldCount += Object.keys(type.getFields()).length;
    } else if (isScalarType(type)) {
      scalarCount++;
    }
  }

  result.setValid(true);
  result.setObjectCount(objectCount);
  result.setInterfaceCount(interfaceCount);
  result.setUnionCount(unionCount);
  result.setEnumCount(enumCount);
  result.setInputObjectCount(inputObjectCount);
  result.setScalarCount(scalarCount);
  result.setTotalFieldCount(totalFieldCount);
  result.setHasQueryType(!!schema.getQueryType());
  result.setHasMutationType(!!schema.getMutationType());
  result.setHasSubscriptionType(!!schema.getSubscriptionType());
  return result;
}
