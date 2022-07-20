<script>
	import SubmitButton from './SubmitButton.svelte';

	let imgUrl = '';

	function onSubmit(e) {
		if (imgUrl.length === 0) return;

		console.log(imgUrl);
	}
</script>

<form
	on:submit|preventDefault={onSubmit}
	class="relative flex flex-col md:flex-row md:space-x-2 md:items-center border-b border-gray-400 pb-8"
>
	<label for="img_url">Enter Image URL:</label>
	<input
		class="py-1 px-2 border-gray-700 border-2 rounded-sm focus:border-blue-700"
		id="img_url"
		name="img_url"
		bind:value={imgUrl}
	/>
	<SubmitButton type="submit" disabled={imgUrl.length === 0}>Submit</SubmitButton>
	<div class="absolute bg-gray-100 px-6 py-2 left-1/2 -bottom-4">OR</div>
</form>
