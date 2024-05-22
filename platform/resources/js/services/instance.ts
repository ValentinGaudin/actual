import ky from 'ky';

console.log('toto');
export default ky.extend({
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: 'application/json',
	},
});
