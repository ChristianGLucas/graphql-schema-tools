import { GetTypeFieldsInput } from '../gen/messages_pb';
import { getTypeFields } from './get_type_fields';
import { testContext } from './test_helpers';

const SCHEMA = `
  """A single blog post"""
  type Post {
    id: ID!
    title: String
    tags(limit: Int = 5): [String!]!
    legacy: String @deprecated(reason: "use title")
  }
  input PostFilter {
    status: String
    limit: Int = 10
  }
  enum Status { DRAFT PUBLISHED }
  type Query { post(id: ID!): Post }
`;

describe('GetTypeFields', () => {
  it('extracts an object type\'s fields with types, nullability, args, and deprecation (hand-derived)', () => {
    const input = new GetTypeFieldsInput();
    input.setSchema(SCHEMA);
    input.setTypeName('Post');
    const result = getTypeFields(testContext, input);
    expect(result.getValid()).toBe(true);
    const fields = result.getFieldsList();
    expect(fields.map((f) => f.getName())).toEqual(['id', 'title', 'tags', 'legacy']);

    const id = fields[0];
    expect(id.getType()).toBe('ID!');
    expect(id.getNullable()).toBe(false);

    const title = fields[1];
    expect(title.getType()).toBe('String');
    expect(title.getNullable()).toBe(true);

    const tags = fields[2];
    expect(tags.getType()).toBe('[String!]!');
    expect(tags.getArgsList().length).toBe(1);
    expect(tags.getArgsList()[0].getName()).toBe('limit');
    expect(tags.getArgsList()[0].getType()).toBe('Int');
    expect(tags.getArgsList()[0].getHasDefaultValue()).toBe(true);
    expect(tags.getArgsList()[0].getDefaultValueJson()).toBe('5');

    const legacy = fields[3];
    expect(legacy.getIsDeprecated()).toBe(true);
    expect(legacy.getDeprecationReason()).toBe('use title');
  });

  it('extracts an input-object type\'s fields with no args', () => {
    const input = new GetTypeFieldsInput();
    input.setSchema(SCHEMA);
    input.setTypeName('PostFilter');
    const result = getTypeFields(testContext, input);
    expect(result.getValid()).toBe(true);
    const fields = result.getFieldsList();
    expect(fields.map((f) => f.getName())).toEqual(['status', 'limit']);
    expect(fields[0].getArgsList().length).toBe(0);
    expect(fields[1].getArgsList().length).toBe(0);
    expect(fields[1].getType()).toBe('Int');
  });

  it('returns a structured error when the type does not exist', () => {
    const input = new GetTypeFieldsInput();
    input.setSchema(SCHEMA);
    input.setTypeName('DoesNotExist');
    const result = getTypeFields(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/not found/);
  });

  it('returns a structured error pointing elsewhere when the type has no fields (an enum)', () => {
    const input = new GetTypeFieldsInput();
    input.setSchema(SCHEMA);
    input.setTypeName('Status');
    const result = getTypeFields(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/ENUM/);
    expect(result.getError()).toMatch(/ListEnumValues/);
  });
});
