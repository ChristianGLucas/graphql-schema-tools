import { SchemaInput } from '../gen/messages_pb';
import { schemaSummary } from './schema_summary';
import { testContext } from './test_helpers';

describe('SchemaSummary', () => {
  it('computes exact type-kind counts and total field count (hand-counted from the SDL)', () => {
    const input = new SchemaInput();
    input.setSchema(`
      scalar DateTime
      interface Node { id: ID! }
      type Post implements Node { id: ID! title: String createdAt: DateTime }
      type Author implements Node { id: ID! name: String }
      union SearchResult = Post | Author
      enum Status { DRAFT PUBLISHED }
      input PostFilter { status: Status limit: Int }
      type Query { post(id: ID!): Post search: SearchResult }
      type Mutation { createPost(title: String!): Post }
    `);
    const result = schemaSummary(testContext, input);
    expect(result.getValid()).toBe(true);
    // Hand count: OBJECT = Post, Author, Query, Mutation = 4
    expect(result.getObjectCount()).toBe(4);
    // INTERFACE = Node = 1
    expect(result.getInterfaceCount()).toBe(1);
    // UNION = SearchResult = 1
    expect(result.getUnionCount()).toBe(1);
    // ENUM = Status = 1
    expect(result.getEnumCount()).toBe(1);
    // INPUT_OBJECT = PostFilter = 1
    expect(result.getInputObjectCount()).toBe(1);
    // SCALAR (custom only) = DateTime = 1
    expect(result.getScalarCount()).toBe(1);
    // Field counts: Node(1) + Post(3) + Author(2) + PostFilter(2) + Query(2) + Mutation(1) = 11
    expect(result.getTotalFieldCount()).toBe(11);
    expect(result.getHasQueryType()).toBe(true);
    expect(result.getHasMutationType()).toBe(true);
    expect(result.getHasSubscriptionType()).toBe(false);
  });

  it('reports false for root types the schema does not declare', () => {
    const input = new SchemaInput();
    input.setSchema(`type Query { hello: String }`);
    const result = schemaSummary(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getHasQueryType()).toBe(true);
    expect(result.getHasMutationType()).toBe(false);
    expect(result.getHasSubscriptionType()).toBe(false);
    expect(result.getObjectCount()).toBe(1);
    expect(result.getTotalFieldCount()).toBe(1);
  });

  it('returns a structured error, not a crash, when the schema fails to build', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: }');
    const result = schemaSummary(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError().length).toBeGreaterThan(0);
  });
});
