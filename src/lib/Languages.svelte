<script lang="ts">
	import { locale, locales, type MLocale } from '$lib/i18n'
	import { localeFlags } from 'omni18n'

	function selfLocale(locale: string) {
		return new Intl.DisplayNames(locale, { type: 'language' }).of(locale) || '???'
	}
	const localeDescriptions = locales.map((locale) => ({
		locale,
		flag: localeFlags(locale)[0],
		text: selfLocale(locale)
	}))
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
