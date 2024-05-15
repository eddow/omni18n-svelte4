# Boilerplate: Svelte4 & [OmnI18n](https://www.npmjs.com/package/omni18n)

All Points of Interests are denoted with a `PoI` so one can ctrl-shift-F `PoI` with case/whole words to find them. These are points where things become project-dependant.

## Idea

### `I18nClient`s

There are two `I18nClient` who are instantiated, one for the server-side only (in `event.locals.i18nClient`) and one for SSR/client-side (`import { i18nClient } from "$lib/i18n"`)

### Loading

The dictionary content is never downloaded as-is per usual, but rather given through PageData so that it is available on hydration.
This is the business of `routes/+layout.server.ts` and `routes/+layout.ts`: the former puts the "partial" loaded data (indeed everything) and the latter uses it to initialize its i18nClient.

### Changing language

The `condense` function is therefore only called when the language is changed. The client finally manages one locale on the client-side as the server knows better (cf. [`hooks.server.ts`](./src/hooks.server.ts))

## Database

For a boilerplate, the "database" is an in-memory database serializing on [dictionary.i18n](./dictionary.i18n).

When the file is changed manually, the server _has to_ be relaunched as the file is read only once at launch
