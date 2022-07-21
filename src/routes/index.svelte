<script>
	import Results from '../components/Results.svelte';
	import FileAttach from '../components/FileAttach.svelte';
	import ImageUrlInput from '../components/ImageURLInput.svelte';
	import { apiDataStore } from '../store/app.store';

	let loadingState;

	apiDataStore.subscribe((val) => {
		loadingState = val.loadingState;
	});
</script>

<h1 class="text-2xl lg:text-3xl font-bold">Facial Emotion Detector Roulette!</h1>

<p class="text-lg mb-4 pb-2">Please enter an image URL or attach a file</p>

<ImageUrlInput />
<FileAttach />

{#if loadingState === 'success'}
	<Results />
{/if}
