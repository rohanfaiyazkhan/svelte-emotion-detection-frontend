const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				'spin-fast': 'spin 0.5s linear infinite'
			}
		}
	},

	plugins: []
};

module.exports = config;
