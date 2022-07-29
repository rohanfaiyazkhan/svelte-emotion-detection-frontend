import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		prerender: {
			default: true
		},
		paths: {
			// change below to your repo name
			base: isProd ? '/svelte-emotion-detection-frontend' : '',
			assets: isProd ? '/svelte-emotion-detection-frontend' : ''
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
