<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { apiDataStore } from '../store/app.store';
	import { drawRectOnCanvas, scaleFacesPixelValues } from '../utils/drawingUtils';

	let container, canvas, img;
	const IMG_WIDTH = 384;

	let file, fileUrl, type, preview, updatedOn;

	onMount(() => {
		container.scrollIntoView({ behavior: 'smooth' });

		const dataStore = get(apiDataStore);

		const resource = dataStore.resource;
		const results = resource?.results;
		const faces = resource?.faces;
		updatedOn = dataStore.updatedOn;
		type = dataStore.requestType;

		if (type === 'url') {
			fileUrl = dataStore.fileUrl;
		} else if (type === 'upload') {
			file = dataStore.file;

			let reader = new window.FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				preview = e.target.result;
			};
		}

		if (resource) {
			img.onload = function () {
				const naturalWidth = img.naturalWidth;
				const ctx = canvas.getContext('2d');

				const facesScaled = scaleFacesPixelValues(faces, naturalWidth, IMG_WIDTH);

				console.debug({ naturalWidth, faces, facesScaled, results });
				drawRectOnCanvas(ctx, facesScaled, results);
			};

			img.src = type === 'url' ? fileUrl : type === 'upload' ? preview : '#';
		}
	});
</script>

<section class="border-t border-gray-500 pt-2 mt-4" bind:this={container}>
	<h2 class="text-xl mb-2">Results</h2>

	<div class="relative" style="width: {IMG_WIDTH}px; height: 550px">
		<img bind:this={img} width="{IMG_WIDTH}px" alt="Results of inference" />

		<canvas bind:this={canvas} class="absolute top-0 left-0" width="{IMG_WIDTH}px" height="500px" />
	</div>
</section>
