import { ListUnionMembersInput } from '../gen/messages_pb';
import { listUnionMembers } from './list_union_members';
import { testContext } from './test_helpers';

const SCHEMA = `
  type Cat { name: String }
  type Dog { name: String }
  union Pet = Cat | Dog
  type Query { pet: Pet }
`;

describe('ListUnionMembers', () => {
  it('lists a union\'s member types (hand-derived)', () => {
    const input = new ListUnionMembersInput();
    input.setSchema(SCHEMA);
    input.setUnionName('Pet');
    const result = listUnionMembers(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getMembersList()).toEqual(['Cat', 'Dog']);
  });

  it('returns a structured error when the type does not exist', () => {
    const input = new ListUnionMembersInput();
    input.setSchema(SCHEMA);
    input.setUnionName('DoesNotExist');
    const result = listUnionMembers(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/not found/);
  });

  it('returns a structured error when the named type is not a union', () => {
    const input = new ListUnionMembersInput();
    input.setSchema(SCHEMA);
    input.setUnionName('Cat');
    const result = listUnionMembers(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/OBJECT/);
    expect(result.getError()).toMatch(/not a union/);
  });
});
