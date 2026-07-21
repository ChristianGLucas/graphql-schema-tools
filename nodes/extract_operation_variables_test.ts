import { ExtractVariablesInput } from '../gen/messages_pb';
import { extractOperationVariables } from './extract_operation_variables';
import { testContext } from './test_helpers';

describe('ExtractOperationVariables', () => {
  it('extracts a single operation\'s variables with types and JSON-encoded defaults (hand-derived)', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(
      `query GetPosts($id: ID!, $limit: Int = 10, $tags: [String!] = ["a", "b"]) { posts(id: $id) { title } }`
    );
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(true);
    const vars = result.getVariablesList();
    expect(vars.map((v) => v.getName())).toEqual(['id', 'limit', 'tags']);

    expect(vars[0].getType()).toBe('ID!');
    expect(vars[0].getNullable()).toBe(false);
    expect(vars[0].getHasDefaultValue()).toBe(false);

    expect(vars[1].getType()).toBe('Int');
    expect(vars[1].getNullable()).toBe(true);
    expect(vars[1].getHasDefaultValue()).toBe(true);
    expect(vars[1].getDefaultValueJson()).toBe('10');

    expect(vars[2].getType()).toBe('[String!]');
    expect(vars[2].getDefaultValueJson()).toBe('["a","b"]');
  });

  it('uses the sole operation when operation_name is omitted and there is only one', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(`query X($a: Int) { foo(a: $a) }`);
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getVariablesList().map((v) => v.getName())).toEqual(['a']);
  });

  it('requires operation_name for a multi-operation document, and selects the right one when given', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(`
      query First($a: Int) { foo(a: $a) }
      query Second($b: String) { bar(b: $b) }
    `);
    const missingName = extractOperationVariables(testContext, input);
    expect(missingName.getValid()).toBe(false);
    expect(missingName.getError()).toMatch(/operation_name is required/);

    input.setOperationName('Second');
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getVariablesList().map((v) => v.getName())).toEqual(['b']);
  });

  it('returns a structured error for an unmatched operation name', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(`query First($a: Int) { foo(a: $a) } query Second($b: String) { bar(b: $b) }`);
    input.setOperationName('DoesNotExist');
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/No operation named/);
  });

  it('returns a structured error for a document with no operations', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(`fragment F on Post { id }`);
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/no operations/);
  });

  it('returns a structured error, not a crash, on a syntax error', () => {
    const input = new ExtractVariablesInput();
    input.setQuery(`query X($a: `);
    const result = extractOperationVariables(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError().length).toBeGreaterThan(0);
  });
});
