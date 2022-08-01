const labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'];

/**
 *
 * @param {[string, number, number[]]} result One set of results
 * @returns {Array<[string, number]>} top3
 */
export default function getTop3Results(result) {
	if (!result || result.length !== 3) {
		return [];
	}

	const confidences = result[2];
	const confidencesWithLabels = confidences.map((conf, i) => [labels[i], conf]);

	const reverseSortedConf = confidencesWithLabels.sort((prev, next) => next[1] - prev[1]);

	return reverseSortedConf.slice(0, 3);
}
