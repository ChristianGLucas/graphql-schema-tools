import { ListInterfaceImplementationsInput } from '../gen/messages_pb';
import { listInterfaceImplementations } from './list_interface_implementations';
import { testContext } from './test_helpers';

const SCHEMA = `
  interface Node { id: ID! }
  interface Named implements Node { id: ID! name: String }
  type User implements Node & Named { id: ID! name: String }
  type Product implements Node { id: ID! }
  type Query { node: Node }
`;

describe('ListInterfaceImplementations', () => {
  it('lists both object and interface implementers of an interface (hand-derived)', () => {
    const input = new ListInterfaceImplementationsInput();
    input.setSchema(SCHEMA);
    input.setInterfaceName('Node');
    const result = listInterfaceImplementations(testContext, input);
    expect(result.getValid()).toBe(true);
    const impls = result.getImplementationsList().map((i) => [i.getName(), i.getKind()]);
    // Node is implemented by: User (OBJECT), Product (OBJECT), and Named
    // (INTERFACE, which itself implements Node).
    expect(impls).toContainEqual(['User', 'OBJECT']);
    expect(impls).toContainEqual(['Product', 'OBJECT']);
    expect(impls).toContainEqual(['Named', 'INTERFACE']);
    expect(impls.length).toBe(3);
  });

  it('returns a structured error when the type does not exist', () => {
    const input = new ListInterfaceImplementationsInput();
    input.setSchema(SCHEMA);
    input.setInterfaceName('DoesNotExist');
    const result = listInterfaceImplementations(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/not found/);
  });

  it('returns a structured error when the named type is not an interface', () => {
    const input = new ListInterfaceImplementationsInput();
    input.setSchema(SCHEMA);
    input.setInterfaceName('User');
    const result = listInterfaceImplementations(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toMatch(/OBJECT/);
    expect(result.getError()).toMatch(/not an interface/);
  });
});
