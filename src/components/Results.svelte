<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { apiDataStore } from '../store/app.store';
	import { drawRectOnCanvas, scaleFacesPixelValues } from '../utils/drawingUtils';
	import getTop3Results from '../utils/getTop3results';

	let container, canvas, img;
	const IMG_WIDTH = 384;
	const CANVAS_HEIGHT = 1024;

	let top3s = [],
		type;

	onMount(() => {
		container.scrollIntoView({ behavior: 'smooth' });

		const dataStore = get(apiDataStore);

		const resource = dataStore.resource;
		const results = resource?.results;
		const faces = resource?.faces;

		type = dataStore.requestType;
		top3s = results ? results.map((result) => getTop3Results(result)) : [];

		if (resource) {
			img.onload = function () {
				const naturalWidth = img.naturalWidth;
				const ctx = canvas.getContext('2d');

				const facesScaled = scaleFacesPixelValues(faces, naturalWidth, IMG_WIDTH);

				drawRectOnCanvas(ctx, facesScaled, results);
			};

			if (type === 'url') {
				img.src = dataStore.fileUrl;
			} else if (type === 'upload') {
				const filePreview = dataStore.filePreview;

				img.src = filePreview;
			}
		}
	});
</script>

<section class="border-t border-gray-500 pt-2 mt-4" bind:this={container}>
	<h2 class="text-2xl font-bold mb-2">Results</h2>

	{#each top3s as top3, i}
		{#if top3s.length > 1}
			<p>Detected Face {i + 1}:</p>
		{/if}
		{#if top3.length == 3}
			<p class="text-sm">
				<span class="font-bold">Top Prediction: </span>
				{top3[0][0]}
				{top3[0][1] * 100}%
			</p>
			<p class="mb-2 text-sm">
				Other predictions: {top3[1][0]}
				{top3[1][1] * 100}%, {top3[2][0]}
				{top3[2][1] * 100}%
			</p>
		{/if}
	{/each}

	<div class="relative" style="width: {IMG_WIDTH}px; height: {CANVAS_HEIGHT}px">
		<img bind:this={img} width="{IMG_WIDTH}px" alt="Results of inference" />

		<canvas
			bind:this={canvas}
			class="absolute top-0 left-0"
			width="{IMG_WIDTH}px"
			height="{CANVAS_HEIGHT}px"
		/>
	</div>
</section>
