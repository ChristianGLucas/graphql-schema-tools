import { QueryInput } from '../gen/messages_pb';
import { parseQuery } from './parse_query';
import { testContext } from './test_helpers';
import { MAX_NESTING_DEPTH } from './graphql_helpers';

describe('ParseQuery', () => {
  it('extracts every operation and fragment name from a multi-operation document (hand-counted)', () => {
    const input = new QueryInput();
    input.setQuery(`
      fragment PostFields on Post { id title }
      query GetPost($id: ID!) { post(id: $id) { ...PostFields } }
      mutation CreatePost($title: String!) { createPost(title: $title) { id } }
      subscription OnPost { postCreated { id } }
    `);
    const result = parseQuery(testContext, input);
    expect(result.getValid()).toBe(true);
    const ops = result.getOperationsList().map((o) => [o.getName(), o.getOperationType()]);
    expect(ops).toEqual([
      ['GetPost', 'query'],
      ['CreatePost', 'mutation'],
      ['OnPost', 'subscription'],
    ]);
    expect(result.getFragmentNamesList()).toEqual(['PostFields']);
  });

  it('reports an anonymous single operation with an empty name', () => {
    const input = new QueryInput();
    input.setQuery(`{ post(id: "1") { title } }`);
    const result = parseQuery(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getOperationsList().length).toBe(1);
    expect(result.getOperationsList()[0].getName()).toBe('');
    expect(result.getOperationsList()[0].getOperationType()).toBe('query');
  });

  it('returns a located structured error on a syntax error, not a crash', () => {
    const input = new QueryInput();
    input.setQuery('{ post(id: }');
    const result = parseQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList().length).toBe(1);
    expect(result.getErrorsList()[0].getLocationsList().length).toBe(1);
  });

  it('handles a large (multi-MB) input without crashing', () => {
    const input = new QueryInput();
    input.setQuery('{ post { title } }\n' + '#'.repeat(2_000_010));
    const result = parseQuery(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getErrorsList().length).toBe(0);
  });

  it('rejects pathologically deep nesting before it ever reaches the parser', () => {
    const input = new QueryInput();
    const deep = '{a'.repeat(MAX_NESTING_DEPTH + 20) + '}'.repeat(MAX_NESTING_DEPTH + 20);
    input.setQuery(deep);
    const result = parseQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/nesting depth/);
  });
});
