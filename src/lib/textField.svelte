<script lang="ts">
	import { T } from '$lib/i18n'
	export let name: string
</script>
<label for={name}>
	{$T.fld[name]}
</label>
<input type="text" name={name} placeholder={$T.fld[name].placeholder} />
