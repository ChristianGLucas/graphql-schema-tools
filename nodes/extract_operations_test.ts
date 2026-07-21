import { QueryInput } from '../gen/messages_pb';
import { extractOperations } from './extract_operations';
import { testContext } from './test_helpers';

describe('ExtractOperations', () => {
  it('extracts every operation with its name and type, in document order (hand-counted)', () => {
    const input = new QueryInput();
    input.setQuery(`
      query GetPost($id: ID!) { post(id: $id) { title } }
      mutation CreatePost($title: String!) { createPost(title: $title) { id } }
      subscription OnPostCreated { postCreated { id } }
      fragment Ignored on Post { id }
    `);
    const result = extractOperations(testContext, input);
    expect(result.getValid()).toBe(true);
    const ops = result.getOperationsList().map((o) => [o.getName(), o.getOperationType()]);
    expect(ops).toEqual([
      ['GetPost', 'query'],
      ['CreatePost', 'mutation'],
      ['OnPostCreated', 'subscription'],
    ]);
  });

  it('reports an anonymous operation with an empty name', () => {
    const input = new QueryInput();
    input.setQuery(`{ post { title } }`);
    const result = extractOperations(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getOperationsList().length).toBe(1);
    expect(result.getOperationsList()[0].getName()).toBe('');
  });

  it('returns a located structured error, not a crash, on a syntax error', () => {
    const input = new QueryInput();
    input.setQuery('query { post(');
    const result = extractOperations(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList().length).toBeGreaterThan(0);
  });
});
