import { SchemaInput } from '../gen/messages_pb';
import { printSchema } from './print_schema';
import { testContext } from './test_helpers';

describe('PrintSchema', () => {
  it('reformats untidy SDL into canonical, deterministically-indented text', () => {
    const input = new SchemaInput();
    input.setSchema(`type    Post{id:ID!
      title:String}
      type Query{post(id:ID!):Post}`);
    const result = printSchema(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getSdl()).toBe(
      'type Post {\n  id: ID!\n  title: String\n}\n\ntype Query {\n  post(id: ID!): Post\n}'
    );
  });

  it('is idempotent: printing the already-canonical output again yields the same text', () => {
    const input = new SchemaInput();
    input.setSchema(`type Post { id: ID! } type Query { post: Post }`);
    const first = printSchema(testContext, input);
    expect(first.getValid()).toBe(true);

    const second = new SchemaInput();
    second.setSchema(first.getSdl());
    const result = printSchema(testContext, second);
    expect(result.getValid()).toBe(true);
    expect(result.getSdl()).toBe(first.getSdl());
  });

  it('returns a structured error, not a crash, when the schema fails to build', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: }');
    const result = printSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError().length).toBeGreaterThan(0);
    expect(result.getSdl()).toBe('');
  });
});
