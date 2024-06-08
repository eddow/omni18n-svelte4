<script lang="ts">
	import { localeFlags } from '$lib/i18n'
</script>

<svelte:head>
	{@html $localeFlags.headerContent}
</svelte:head>
<slot />
