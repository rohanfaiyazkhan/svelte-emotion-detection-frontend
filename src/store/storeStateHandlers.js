// eslint-disable-next-line no-unused-vars
import { apiDataStore } from './app.store';
import { makeFileUrlRequest } from '../requests/makeFileUrlRequest';

export async function fetchFileUrltWithStateHandler(url) {
	apiDataStore.set({
		loadingState: 'loading',
		fileUrl: url,
		requestType: 'url'
	});

	try {
		const response = await makeFileUrlRequest(url);

		apiDataStore.set({
			loadingState: 'success',
			fileUrl: url,
			requestType: 'url',
			resource: response
		});
	} catch (error) {
		apiDataStore.set({
			loadingState: 'failure',
			fileUrl: url,
			requestType: 'url',
			error
		});
	}
}
