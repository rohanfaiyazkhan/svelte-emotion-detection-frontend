// eslint-disable-next-line no-unused-vars
import { derived, writable } from 'svelte/store';

/**
 * @typedef {"success" | "failure" | "loading" | "idle"} LoadingState
 * 
 * @typedef {{
 * 	createdAt: string,
 * 	results: Array<[string, number, number[]]>
 * 	latency: number,
 * 	faces: Array<number[]>
 * }} ApiResults
 *
 * @typedef {{
 * 	updatedOn?: number
 *  loadingState: LoadingState;
 *  error?: string;
 *  resource?: ApiResults;
 *  requestType?: "url" | "upload"
 *  fileUrl?: string;
 *  filePreview?: unknown;
 * }} ApiData
 *


/** @type {ApiData} */
const inititalApiData = {
	loadingState: 'idle'
};

export const apiDataStore = writable(inititalApiData);

export const loadingStateStore = derived(apiDataStore, (val) => val.loadingState);
