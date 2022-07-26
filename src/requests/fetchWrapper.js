/**
 *
 * @param {string} url
 * @param {Record<string, any>} requestOptions
 * @returns {Promise<any>}
 */
export default function fetchWrapper(url, requestOptions) {
	return fetch(url, requestOptions)
		.then(async (response) => {
			const data = await response.json();

			if (!response.ok) {
				const error = (data && data.error) || response.status;
				return Promise.reject(error);
			}

			return Promise.resolve(data);
		})
		.catch((error) => {
			return Promise.reject(error);
		});
}
