import ky from 'ky';

export default ky.extend({
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: 'application/json',
	},
});
