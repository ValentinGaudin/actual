import ky from 'ky';

export default ky.extend({
	prefixUrl: 'http://actual.localhost/api/',
	headers: {
		Accept: 'application/json',
	},
});
