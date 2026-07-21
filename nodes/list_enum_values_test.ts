import { ListEnumValuesInput } from '../gen/messages_pb';
import { listEnumValues } from './list_enum_values';
import { testContext } from './test_helpers';

const SCHEMA = `
  enum Status {
    DRAFT
    PUBLISHED
    ARCHIVED @deprecated(reason: "no longer supported")
  }
  type Query { status: Status }
`;

describe('ListEnumValues', () => {
  it('lists an enum\'s values with deprecation status (hand-derived)', () => {
    const input = new ListEnumValuesInput();
    input.setSchema(SCHEMA);
    input.setTypeName('Status');
    const result = listEnumValues(testContext, input);
    expect(result.getValid()).toBe(true);
    const values = result.getValuesList();
    expect(values.map((v) => v.getName())).toEqual(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
    expect(values[0].getIsDeprecated()).toBe(false);
    expect(values[2].getIsDeprecated()).toBe(true);
    expect(values[2].getDeprecationReason()).toBe('no longer supported');
  });

  it('returns a structured error when the type does not exist', () => {
    const input = new ListEnumValuesInput();
    input.setSchema(SCHEMA);
    input.setTypeName('DoesNotExist');
    const result = listEnumValues(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/not found/);
  });

  it('returns a structured error when the named type is not an enum', () => {
    const input = new ListEnumValuesInput();
    input.setSchema(SCHEMA);
    input.setTypeName('Query');
    const result = listEnumValues(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/OBJECT/);
    expect(result.getError()).toMatch(/not an enum/);
  });
});
