import {
	type TContext,
	I18nClient,
	type Locale,
	type Translator,
	type LocaleFlagsEngine,
	type TextKey
} from 'omni18n/ts'
import { writable } from 'svelte/store'

// PoI: Manage your locales here
export const locales = ['fr', 'en'] as const

export interface TextInfos {}
export interface KeyInfos {}

let rq = fetch
// Used server-side as `fetch` is onto our app, it comes from RequestEvent.fetch
export function setFetch(fn: typeof fetch) {
	rq = fn
}

class ClientSideClient extends I18nClient {
	report(key: TextKey, error: string, spec: object) {
		rq(`/i18n?report`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key, error, ...(spec && { spec }) })
		})
	}
}

export const i18nClient = new ClientSideClient([], condense)
export const T = writable<Translator>()
export const locale = writable<Locale>()
let queryLocale: string
locale.subscribe(async (locale) => {
	if (!locale) return
	queryLocale = locale
	await i18nClient.setLocales([locale])
	await initTranslator()
})

async function condense() {
	const response = await rq(`/i18n`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ locale: queryLocale })
	})
	return await response.json()
}
export async function initTranslator() {
	T.set(await i18nClient.enter())
}

export let localeFlags = writable<LocaleFlagsEngine>()
