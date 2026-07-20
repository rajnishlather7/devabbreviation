# devabbr

A Static, fast, searchable reference of software engineering abbreviations.

**[Live demo →](https://rajnishlather7.github.io/devabbreviation/)**


## To run locally
```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding or editing a term

Everything lives in `data/abbreviations.js`. Each entry looks like:

```js
{ a: "API", f: "Application Programming Interface", d: "A set of rules/protocols that lets software applications communicate with each other.", c: "core" }
```

- `a` — the abbreviation itself
- `f` — what it stands for (full form)
- `d` — a one-sentence plain-English definition
- `c` — category key: `core`, `web`, `networking`, `security`, `devops`, `data`, `architecture`, or `hardware`
- `s` — *(optional)* subtype label, for grouping a cluster of related terms within one category (e.g. `s: "certificates"` for PKI/cert terms inside `security`). Shows as a small badge next to the category tag and is searchable.

The same abbreviation (`a`) can appear more than once with a different `f`/`c` if it means different things in different contexts (e.g. `CSR` = Client-Side Rendering in `web`, vs. Certificate Signing Request in `security`).

## Adding a lifecycle / mini diagram

The "Lifecycles" tab renders step-by-step process diagrams (e.g. the TLS certificate lifecycle, OAuth's authorization code flow) from `data/lifecycles.js`. It's data-driven — `js/lifecycle.js` builds the tab list and diagram from whatever's in that array, so adding a new one is just appending an object, no other code changes needed:

```js
{
  id: "unique-slug",
  title: "Display title",
  tagline: "short eyebrow line",
  summary: "1-2 sentence intro to the whole flow",
  steps: [
    { label: "Short step name", tag: "optional related abbreviation/command", detail: "1-2 sentence explanation" },
    // ...as many steps as needed
  ]
}
```

See `data/lifecycles.js` for the full doc comment and two worked examples.
