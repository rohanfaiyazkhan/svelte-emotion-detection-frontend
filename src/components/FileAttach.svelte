<script>
	import ImageIcon from '../assets/noun-image-2718571.svg';
	import SubmitButton from './SubmitButton.svelte';

	let preview;
	let image;
	let fileinput;

	const onFileSelected = (e) => {
		image = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	};

	const onSubmit = (e) => {};
</script>

<form on:submit={onSubmit}>
	<div class="relative">
		<p class="text-lg mt-4 mb-4">Attach a file:</p>
	</div>

	<div
		class="w-40 h-40 hover:cursor-pointer focus:bg-gray-300 hover:bg-gray-400 border-4 rounded-lg border-gray-500"
		on:click={() => fileinput.click()}
		title="Attach a file"
	>
		{#if preview !== undefined}
			<img class="w-full h-full object-cover" alt="Preview of file to be uploaded" src={preview} />
		{:else}
			<div class="w-full h-full flex items-center justify-center  pt-4">
				<ImageIcon />
			</div>
		{/if}
		<input
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>
	</div>
	<SubmitButton class="mt-4 w-40 text-center" type="submit" disabled={image === undefined}
		>Upload Image</SubmitButton
	>
</form>
