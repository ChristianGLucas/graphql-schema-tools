import { QueryInput } from '../gen/messages_pb';
import { printQuery } from './print_query';
import { testContext } from './test_helpers';

describe('PrintQuery', () => {
  it('reformats a compact query into canonical, deterministically-indented text', () => {
    const input = new QueryInput();
    input.setQuery(`query GetPost($id:ID!){post(id:$id){title  ,  id}}`);
    const result = printQuery(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getFormattedQuery()).toBe(
      'query GetPost($id: ID!) {\n  post(id: $id) {\n    title\n    id\n  }\n}'
    );
  });

  it('returns a located structured error, not a crash, on a syntax error', () => {
    const input = new QueryInput();
    input.setQuery('{ post(id: }');
    const result = printQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList().length).toBe(1);
    expect(result.getErrorsList()[0].getLocationsList().length).toBe(1);
    expect(result.getFormattedQuery()).toBe('');
  });
});
