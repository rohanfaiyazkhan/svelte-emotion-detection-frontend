/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<number[]>} faces Array of tuples containing pixel coordinates of [x, y, w, h]
 * @param {Array<[string, number, number[]]>} results
 */
export function drawRectOnCanvas(ctx, faces, results) {
	ctx.font = '12px sans-serif';
	ctx.lineWidth = '3';

	for (let i = 0; i < faces.length; i++) {
		const face = faces[i],
			text = results[i][0] + ' ' + results[i][1] * 100 + '%';
		const [x, y, w, h] = face;

		ctx.strokeStyle = '#00b3ff';
		ctx.strokeRect(x, y, w, h);

		ctx.fillStyle = '#fff';
		ctx.fillRect(x, y - 20, text.length * 8, 16);

		ctx.fillStyle = '#000';
		ctx.fillText(text, x, y - 8);
	}
}

/**
 * Takes existing faces parameter and rescales to target width
 *
 * @param {Array<number[]>} faces Array of tuples containing pixel coordinates of [x, y, w, h]
 * @param {number} originalWidth
 * @param {number} targetWidth
 */
export function scaleFacesPixelValues(faces, originalWidth, targetWidth) {
	const ratio = targetWidth / originalWidth;

	for (let i = 0; i < faces.length; i++) {
		faces[i] = faces[i].map((num) => num * ratio);
	}

	return faces;
}
