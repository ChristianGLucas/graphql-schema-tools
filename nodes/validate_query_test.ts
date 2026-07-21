import { ValidateQueryInput } from '../gen/messages_pb';
import { validateQuery } from './validate_query';
import { testContext } from './test_helpers';

const SCHEMA = `type Post { id: ID! title: String } type Query { post(id: ID!): Post }`;

describe('ValidateQuery', () => {
  it('accepts a query that is valid against the schema', () => {
    const input = new ValidateQueryInput();
    input.setSchema(SCHEMA);
    input.setQuery(`{ post(id: "1") { title } }`);
    const result = validateQuery(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getErrorsList().length).toBe(0);
  });

  it('rejects a query field that does not exist on the schema, with a location', () => {
    const input = new ValidateQueryInput();
    input.setSchema(SCHEMA);
    input.setQuery(`{ post(id: "1") { title, nope } }`);
    const result = validateQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList().length).toBe(1);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/Cannot query field "nope" on type "Post"/);
    expect(result.getErrorsList()[0].getLocationsList().length).toBe(1);
  });

  it('rejects a wrong argument type (ID accepts string/int literals but not boolean)', () => {
    const input = new ValidateQueryInput();
    input.setSchema(SCHEMA);
    input.setQuery(`{ post(id: true) { title } }`);
    const result = validateQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/ID cannot represent/);
  });

  it('reports a schema-build failure the same way as a query error', () => {
    const input = new ValidateQueryInput();
    input.setSchema(`type Query { foo: Bar }`);
    input.setQuery(`{ foo }`);
    const result = validateQuery(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorsList()[0].getMessage()).toMatch(/Unknown type "Bar"/);
  });
});
