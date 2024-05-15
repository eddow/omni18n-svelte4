import { FileDB, I18nClient, I18nServer } from 'omni18n/src'
import type { MLocale } from './i18n'
export { removeDuplicates } from './i18n'

// PoI: Manage your locales here
// Note: Dictionary data is "downloaded" at *each* request involving text, we might consider caching
export const i18nSource = new FileDB('dictionary.i18n')
export const i18nServer = new I18nServer(i18nSource)

export type ClientSideError = object & { clientSide?: true }

class ReportingI18nClient extends I18nClient {
	error(key: string, error: string, spec: ClientSideError) {
		// PoI: actually report
		console.error(
			`Error ${error} for ${key} in ${this.locales[0]}:\n`,
			JSON.stringify(spec, null, 2)
		)
		// If error on server-side, avoid at all costs sending an email with no text
		if (!spec.clientSide) throw Error(`Error ${error} for ${key} in ${this.locales[0]}`)
		return '[*error*]'
	}

	missing(key: string, fallback: string) {
		// PoI: actually report
		console.error(`Missing ${key} in ${this.locales[0]}`)
		// If no fallbacks is provided, avoid at all costs sending an email with no text
		if (!fallback) throw Error(`Missing ${key} in ${this.locales[0]}`)
		return fallback || `[${key}]`
	}
}
export function createClient(locales: MLocale[]) {
	return new ReportingI18nClient(locales, i18nServer.condense)
}
