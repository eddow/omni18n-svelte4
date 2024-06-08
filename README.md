# Boilerplate: Svelte4 & [OmnI18n](https://www.npmjs.com/package/omni18n)

All Points of Interests are denoted with a `PoI` so one can ctrl-shift-F `PoI` with case/whole words to find them. These are points where things become project-dependant.

## Idea

### `I18nClient`s

There are two `I18nClient` who are instantiated, one for the server-side only (in `event.locals.i18nClient`) and one for SSR/client-side (`import { i18nClient } from "$lib/i18n"`)

As per the structure, the client-side client manages one locale (the selected language) while the server-side one adds to this "selected language" (in the cookie `language`) all the locales accepted by the browser, plus a default one - here english (for fallbacks), so the server is more aware than the client of the used locales. This fact explains why the only API who takes a locale as argument occurs when the language is changed.

### Loading

The dictionary content is never downloaded as-is per usual, but rather given through [`PageData`](https://kit.svelte.dev/docs/load) so that it is available on hydration.
This is the business of `routes/+layout.server.ts` and `routes/+layout.ts`: the former puts the "partial" loaded data (indeed everything) and the latter uses it to initialize its `i18nClient`.

### Changing language

The `condense` function is therefore only called when the language is changed. The client finally manages one locale on the client-side as the server knows better (cf. [`hooks.server.ts`](./src/hooks.server.ts))

## Database

For a boilerplate, the "database" is an in-memory database serializing on [dictionary.i18n](./dictionary.i18n).

When the file is changed manually, the server _has to_ be relaunched as the file is read only once at launch

## Files

### lib/i18n.server.ts

Responsible of the creation of:

- a unique source (DB)
- a unique I18nServer
- an I18nClient per request

Manages therefore the interaction with the databaseS, as it also manages the error/missing translation reports. Even the client-side missing/errors reach there (marked with PoIs)

The client created here is the one who might enter the `server` zone. It is also the one condensing the dictionary - the client-side client has no clues of all the fallbacks (it just gets a flag they are fallbacks).

### lib/i18n.ts

Is the root of the i18n centralization (`i18n.server.ts` can import `i18n.ts`, but not the other way around)

Therefore contains the structural information:

- The list of locales the application manages
- The `KeyInfos` and `TextInfos` definition

Responsible of the unique I18nClient

- unique to the request on SSR
- unique to the browser

It also provides 2 stores: `locale` (self-speaking) and `T` who is the unique translator.

It also forward the `condense` as well as the missing and error reports with a request.

### route/i18n/+server.ts

Manages all the requests relative to i18n activities. Some of these procedures **should be** protected by access right verification.

For everyone:

- `POST` can both:
  - changes the user's language
  - report a missing/error

For translators:

- `GET` retrieves a list of translations, without consideration of fallbacks and with all the infos (`KeyInfos` and `TextInfos`)
- `PUT` modifies a translation and/or the `TextInfos`

For developers:

- `PATCH` upsert a key with zone and `KeyInfos`
- `DELETE` can be used for both deleting _and_ renaming a key (but at the end of the day, the original key won't exist anymore)

### route/+layout.[server.]ts

These 2 files will make sure the whole dictionary is passed through `PageData` and is available for hydration.

### hooks.server.ts

Creates the one server-side-client, manage the fallback locales as well as the `<html lang="%language%">` part of `app.html`

## The inexistent message...

...Is about the fact it's logged server-side
