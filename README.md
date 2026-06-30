# devabbr

A Static, fast, searchable reference of software engineering abbreviations.

**[Live demo →](#)** *(update this link once deployed — see below)*


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
