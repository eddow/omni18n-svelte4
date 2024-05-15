// See https://kit.svelte.dev/docs/types#app

import type { I18nClient } from 'omni18n/src'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			i18nClient: I18nClient
		}
	}
}

export {}
