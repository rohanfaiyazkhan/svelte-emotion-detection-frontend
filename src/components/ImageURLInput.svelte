<script>
	import SubmitButton from './SubmitButton.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import { apiDataStore } from '../store/app.store';
	import { fetchFileUrltWithStateHandler } from '../store/storeStateHandlers';

	let imgUrl = '';
	let loading = false;
	let error;

	function onSubmit(e) {
		if (imgUrl.length === 0) return;

		fetchFileUrltWithStateHandler(imgUrl);
	}

	apiDataStore.subscribe((data) => {
		loading = data.requestType === 'url' && data.loadingState === 'loading';

		error = data.requestType === 'url' && data.loadingState === 'failure' ? data.error : undefined;
	});
</script>

<div class="relative border-b border-gray-400 pb-8">
	<form
		on:submit|preventDefault={onSubmit}
		class="flex flex-col items-stretch space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2 lg:items-center"
	>
		<label for="img_url">Enter Image URL:</label>
		<input
			class="py-1 px-2 lg:mb-0 border-gray-700 border-2 rounded-sm focus:border-blue-700 lg:flex-grow"
			id="img_url"
			name="img_url"
			bind:value={imgUrl}
		/>

		<SubmitButton class="flex items-center" type="submit" disabled={imgUrl.length === 0}
			>Submit {#if loading}<LoadingSpinner class="text-gray-300 ml-2" />{/if}</SubmitButton
		>
	</form>
	{#if error}
		<p class="text-red-600 font-bold italic text-sm">Error: {error}</p>
	{/if}
	<div class="absolute bg-gray-100 px-6 py-2 left-1/2 -bottom-4">OR</div>
</div>
