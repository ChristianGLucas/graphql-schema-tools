import { SchemaInput } from '../gen/messages_pb';
import { validateSchema } from './validate_schema';
import { testContext } from './test_helpers';

describe('ValidateSchema', () => {
  it('accepts a well-formed schema', () => {
    const input = new SchemaInput();
    input.setSchema(`
      type Post { id: ID! title: String }
      type Query { post(id: ID!): Post }
    `);
    const result = validateSchema(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getErrorsList().length).toBe(0);
  });

  it('rejects a dangling type reference (buildSchema throws; surfaced the same way)', () => {
    const input = new SchemaInput();
    input.setSchema(`type Query { foo: TotallyUndefinedType }`);
    const result = validateSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/Unknown type "TotallyUndefinedType"/);
  });

  it('rejects a duplicate type definition (another buildSchema-throw path)', () => {
    const input = new SchemaInput();
    input.setSchema(`type Query { foo: String } type Query { bar: String }`);
    const result = validateSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/only one type named "Query"/);
  });

  it('rejects an interface implementation missing a required field, WITH a location (the validateSchema path, distinct from the buildSchema-throw path above)', () => {
    const input = new SchemaInput();
    input.setSchema(`
      interface Node { id: ID! }
      type User implements Node { name: String }
      type Query { user: User }
    `);
    const result = validateSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    const err = result.getErrorsList()[0];
    expect(err.getMessage()).toMatch(/Interface field Node\.id expected but User does not provide it/);
    expect(err.getLocationsList().length).toBeGreaterThan(0);
  });

  it('reports a schema with no Query type as invalid', () => {
    const input = new SchemaInput();
    input.setSchema(`type Foo { x: String }`);
    const result = validateSchema(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/Query root type must be provided/);
  });
});
