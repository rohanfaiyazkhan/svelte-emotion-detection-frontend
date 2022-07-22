<script>
	import ImageIcon from '../assets/noun-image-2718571.svg';
	import SubmitButton from './SubmitButton.svelte';
	import { apiDataStore } from '../store/app.store';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import { makeMultipartFileRequest } from '../requests/makeMultipartFileRequest';

	let preview, image, fileinput;

	let loading = false,
		error;

	const onFileSelected = (e) => {
		image = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	};

	const onSubmit = (e) => {
		if (image) {
			makeMultipartFileRequest(image);
		}
	};

	apiDataStore.subscribe((data) => {
		loading = data.requestType === 'upload' && data.loadingState === 'loading';

		error =
			data.requestType === 'upload' && data.loadingState === 'failure' ? data.error : undefined;
	});
</script>

<form on:submit|preventDefault={onSubmit}>
	<div class="relative">
		<p class="text-lg mt-4 mb-4">Attach a file:</p>
	</div>

	<button
		class="block w-40 h-40 hover:cursor-pointer focus:border-blue-600 hover:bg-gray-400 border-4 rounded-lg border-gray-500"
		on:click={() => fileinput.click()}
		title="Attach a file"
	>
		{#if preview !== undefined}
			<img class="w-full h-full object-cover" alt="Preview of file to be uploaded" src={preview} />
		{:else}
			<div class="w-full h-full flex items-center justify-center  pt-4">
				<ImageIcon alt="Icon by Kmg Design from NounProject.com" />
			</div>
		{/if}
		<input
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>
	</button>
	<SubmitButton
		class="flex items-center justify-center mt-4 w-40 text-center"
		type="submit"
		disabled={image === undefined}
		>Upload Image{#if loading}<LoadingSpinner class="text-gray-300 ml-2" />{/if}</SubmitButton
	>
</form>
