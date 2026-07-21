import { SchemaInput } from '../gen/messages_pb';
import { listSubscriptions } from './list_subscriptions';
import { testContext } from './test_helpers';

describe('ListSubscriptions', () => {
  it("lists the Subscription root type's fields with full detail", () => {
    const input = new SchemaInput();
    input.setSchema(`
      type Post { id: ID! }
      type Query { post(id: ID!): Post }
      type Subscription {
        postCreated: Post
      }
    `);
    const result = listSubscriptions(testContext, input);
    expect(result.getValid()).toBe(true);
    const fields = result.getFieldsList();
    expect(fields.map((f) => f.getName())).toEqual(['postCreated']);
    expect(fields[0].getType()).toBe('Post');
    expect(fields[0].getNullable()).toBe(true);
  });

  it('returns an empty list (not an error) when the schema declares no Subscription type — optional per spec', () => {
    const input = new SchemaInput();
    input.setSchema(`type Post { id: ID! } type Query { post(id: ID!): Post }`);
    const result = listSubscriptions(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getFieldsList().length).toBe(0);
  });
});
