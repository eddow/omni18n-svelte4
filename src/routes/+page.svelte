<script lang="ts">
	import Languages from '$lib/languages.svelte'
	import { T } from '$lib/i18n'
	import TextField from '$lib/textField.svelte'
</script>

<Languages />
<h1>{$T.page.welcome.title}</h1>
<button on:click={() => alert($T.this.message.doesnt.exist)}>{$T.cmd.inexistent}</button>
<br />
<TextField name="nickname" />
