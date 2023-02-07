import { parse } from 'cookie';
import jwt from '@tsndr/cloudflare-worker-jwt';

export const onRequest = async ({ request, next, env }) => {
	const cookies = parse(request.headers.get('Cookie') || '');
	const sessionToken = cookies['__session'];

	// TODO: Make this more generic
	const publicKey =
		'-----BEGIN PUBLIC KEY-----\n' +
		env.PUBLIC_CLERK_JWT_VERIFICATION_KEY.match(/.{1,64}/g).join('\n') +
		'\n-----END PUBLIC KEY-----';

	let isValid = false;

	// TODO: Make algorithm a parameter
	if (sessionToken) {
		isValid = await jwt.verify(sessionToken, publicKey, { algorithm: 'RS256' });
	}

	if (!isValid) {
		return new Response(null, { status: 401 });
	} else {
		return next();
	}
};
