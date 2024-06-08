<script lang="ts">
	import Languages from '$lib/Languages.svelte'
	import { T } from '$lib/i18n'
	import CoolStuff from '$lib/coolStuff.svelte'
</script>

<Languages />
<h1>{$T.page.welcome.title}</h1>
<button on:click={() => alert($T.this.message.doesnt.exist)}>{$T.cmd.inexistent}</button>
<br />
<CoolStuff />
