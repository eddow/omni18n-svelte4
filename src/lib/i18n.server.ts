import { FileDB, I18nClient, I18nServer, type Locale } from 'omni18n/ts'
import { type KeyInfos, type TextInfos } from './i18n'

// PoI: Manage your database here
// Note: Dictionary data is "downloaded" at *each* request involving text, caching might be considered
export const i18nSource = new FileDB('dictionary.i18n')

export const i18nServer = new I18nServer<KeyInfos, TextInfos>(i18nSource)

class ReportingI18nClient extends I18nClient {
	report(key: string, error: string, spec?: object) {
		// PoI: actually report
		console.error(
			`${error}: ${key} in ${this.locales[0]}:\n`,
			spec ? JSON.stringify(spec, null, 2) : ''
		)
	}
	error(key: string, error: string, spec?: object): string {
		// PoI: actually report
		console.error(
			`Error ${error} for ${key} in ${this.locales[0]}:\n`,
			JSON.stringify(spec, null, 2)
		)
		// If error on server-side, avoid at all costs sending an email with no text
		throw new Error(`Error ${error} for ${key} in ${this.locales[0]}`)
	}

	missing(key: string, fallback: string) {
		// PoI: actually report
		console.error(`Missing ${key} in ${this.locales[0]}`)
		// If no fallbacks is provided, avoid at all costs sending an email with no text
		if (!fallback) throw new Error(`Missing ${key} in ${this.locales[0]}`)
		return fallback || `[${key}]`
	}
}
export function createClient(locales: Locale[]) {
	return new ReportingI18nClient(locales, i18nServer.condense)
}
