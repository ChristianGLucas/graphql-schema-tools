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

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/graphql-schema-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/graphql-schema-tools/ParseSchema --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/graphql-schema-tools/0.1.0/ParseSchema \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/graphql-schema-tools/ParseSchema`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

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
