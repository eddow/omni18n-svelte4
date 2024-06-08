<script lang="ts">
	import { locale, locales } from '$lib/i18n'
	import { gotUserAgent, localeFlags, type Locale } from 'omni18n/ts'
	import { onMount } from 'svelte'

	function selfLocale(locale: string) {
		return new Intl.DisplayNames(locale, { type: 'language' }).of(locale) || '???'
	}

	gotUserAgent()
	let localeDescriptions = locales.map((locale) => ({
		locale,
		flag: localeFlags(locale)[0],
		text: selfLocale(locale)
	})) /*
	onMount(() => {
		// If the client is on windows, the flags have to be treated differently...
		gotUserAgent()
		localeDescriptions = locales.map((locale) => ({
			locale,
			flag: localeFlags(locale)[0],
			text: selfLocale(locale)
		}))
	})*/
</script>

<div>
	{#each localeDescriptions as desc}
		<button on:click={() => locale.set(desc.locale)} class:selected={$locale === desc.locale}>
			{@html desc.flag}
			{desc.text}
		</button>
	{/each}
</div>

<style lang="scss">
	.selected {
		font-weight: bold;
	}
</style>
