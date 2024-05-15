<script lang="ts">
	import { locale, locales, type MLocale } from '$lib/i18n'
	import { localeFlags } from 'omni18n/src/client'

	function selfLocale(locale: string) {
		return new Intl.DisplayNames(locale, { type: 'language' }).of(locale) || '???'
	}
	const localeDescriptions = locales.map((locale) => ({
		locale,
		flag: localeFlags(locale)[0],
		text: selfLocale(locale)
	}))
	let flag: string
	$: flag = localeFlags($locale)[0]

	function setLocale(newLocale: MLocale) {
		locale.set(newLocale)
	}
</script>

<div>
	{#each localeDescriptions as desc}
		<button on:click={() => setLocale(desc.locale)} class:selected={$locale === desc.locale}>
			{desc.flag}
			{desc.text}
		</button>
	{/each}
</div>

<style lang="scss">
	.selected {
		font-weight: bold;
	}
</style>
