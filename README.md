# graphql-schema-tools

Composable Axiom nodes for deterministic parsing, validation, and structural
inspection of GraphQL schemas (SDL — Schema Definition Language) and GraphQL
query/operation documents, wrapping [graphql-js](https://github.com/graphql/graphql-js)
(the GraphQL Foundation's reference implementation, MIT).

Built for the [Axiom marketplace](https://axiomide.com) (`christiangeorgelucas/graphql-schema-tools`).

Every node is a pure text-in / struct-out transform: the schema or query is
always supplied as plain text by the caller. Nothing is fetched, introspected
over a live API, cached between calls, or executed against a backend — this
is purely static schema/document analysis. Caller-supplied text is
size- and nesting-depth-bounded before it ever reaches the parser.

## Nodes

- **ParseSchema** — syntactically parse SDL text into a summary of its top-level definitions.
- **ValidateSchema** — build + fully validate an SDL schema, with located errors.
- **ParseQuery** — syntactically parse a query/operation document.
- **ValidateQuery** — validate a query document against a caller-supplied schema.
- **ListTypes** — list every caller-defined type (object/interface/union/enum/input/scalar) with its kind.
- **GetTypeFields** — extract one type's fields (name, type, args, nullability, description, deprecation).
- **ListQueries** / **ListMutations** / **ListSubscriptions** — list a schema's root-operation fields.
- **ListEnumValues** — list an enum type's values.
- **ListInterfaceImplementations** — list the object/interface types implementing a named interface.
- **ListUnionMembers** — list a union type's member types.
- **PrintSchema** — pretty-print a schema back to canonical SDL.
- **PrintQuery** — pretty-print a query document back to canonical text.
- **ExtractOperations** — list every operation (name + type) in a multi-operation document.
- **ExtractOperationVariables** — extract one operation's declared variables.
- **SchemaSummary** — type-kind counts, total field count, and root-type presence.

## License

MIT — see [LICENSE](./LICENSE).
