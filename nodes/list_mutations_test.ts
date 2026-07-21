import { SchemaInput } from '../gen/messages_pb';
import { listMutations } from './list_mutations';
import { testContext } from './test_helpers';

describe('ListMutations', () => {
  it("lists the Mutation root type's fields with full detail", () => {
    const input = new SchemaInput();
    input.setSchema(`
      type Post { id: ID! }
      type Query { post(id: ID!): Post }
      type Mutation {
        createPost(title: String!): Post
        deletePost(id: ID!): Boolean
      }
    `);
    const result = listMutations(testContext, input);
    expect(result.getValid()).toBe(true);
    const fields = result.getFieldsList();
    expect(fields.map((f) => f.getName())).toEqual(['createPost', 'deletePost']);
    expect(fields[0].getArgsList()[0].getName()).toBe('title');
    expect(fields[0].getArgsList()[0].getType()).toBe('String!');
  });

  it('returns an empty list (not an error) when the schema declares no Mutation type — optional per spec', () => {
    const input = new SchemaInput();
    input.setSchema(`type Post { id: ID! } type Query { post(id: ID!): Post }`);
    const result = listMutations(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getFieldsList().length).toBe(0);
  });
});
