import { SchemaInput } from '../gen/messages_pb';
import { listTypes } from './list_types';
import { testContext } from './test_helpers';

describe('ListTypes', () => {
  it('lists every user-defined type with its kind, sorted by name, excluding built-ins (hand-derived from the SDL)', () => {
    const input = new SchemaInput();
    input.setSchema(`
      scalar DateTime
      interface Node { id: ID! }
      type Post implements Node { id: ID! title: String createdAt: DateTime }
      union SearchResult = Post
      enum Status { DRAFT PUBLISHED }
      input PostFilter { status: Status }
      type Query { post(id: ID!): Post }
    `);
    const result = listTypes(testContext, input);
    expect(result.getValid()).toBe(true);
    const types = result.getTypesList().map((t) => [t.getName(), t.getKind()]);
    // Hand-derived: 7 caller-defined types, alphabetically sorted by name.
    // Int/Float/String/Boolean/ID (built-in scalars) and __* introspection
    // types are excluded.
    expect(types).toEqual([
      ['DateTime', 'SCALAR'],
      ['Node', 'INTERFACE'],
      ['Post', 'OBJECT'],
      ['PostFilter', 'INPUT_OBJECT'],
      ['Query', 'OBJECT'],
      ['SearchResult', 'UNION'],
      ['Status', 'ENUM'],
    ]);
    // No built-in scalar or introspection type ever appears.
    expect(types.some(([n]) => ['Int', 'Float', 'String', 'Boolean', 'ID'].includes(n))).toBe(false);
    expect(types.some(([n]) => n.startsWith('__'))).toBe(false);
  });

  it('returns a structured error, not a crash, when the schema fails to build', () => {
    const input = new SchemaInput();
    input.setSchema('type Query { foo: }');
    const result = listTypes(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError().length).toBeGreaterThan(0);
    expect(result.getTypesList().length).toBe(0);
  });
});
