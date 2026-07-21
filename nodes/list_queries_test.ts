import { SchemaInput } from '../gen/messages_pb';
import { listQueries } from './list_queries';
import { testContext } from './test_helpers';

describe('ListQueries', () => {
  it("lists the Query root type's fields with full detail", () => {
    const input = new SchemaInput();
    input.setSchema(`
      type Post { id: ID! }
      type Query {
        post(id: ID!): Post
        posts(limit: Int = 10): [Post!]!
      }
      type Mutation { noop: Boolean }
    `);
    const result = listQueries(testContext, input);
    expect(result.getValid()).toBe(true);
    const fields = result.getFieldsList();
    expect(fields.map((f) => f.getName())).toEqual(['post', 'posts']);
    expect(fields[1].getArgsList()[0].getDefaultValueJson()).toBe('10');
  });

  it('returns an empty list (not an error) when the schema declares no Query type — buildSchema itself does not require one', () => {
    const input = new SchemaInput();
    input.setSchema(`type Foo { x: String }`);
    const result = listQueries(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getFieldsList().length).toBe(0);
    expect(result.getError()).toBe('');
  });

  it('returns a structured error when the schema itself fails to build', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: }');
    const result = listQueries(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError().length).toBeGreaterThan(0);
  });
});
