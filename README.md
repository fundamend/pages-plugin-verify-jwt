# pages-plugin-verify-jwt

_pages-plugin-verify-jwt_ is a [Cloudflare Pages plugin] used by the [fundamend.dev] ecosystem.
It offers a [middleware] for verifying [JWT]s with a verification key.

## Installation

Use your favorite Node.js package manager, for example [npm], like so:

    npm install --save @fundamend/pages-plugin-verify-jwt

... or [yarn], like so:

    yarn add @fundamend/pages-plugin-verify-jwt

## Usage

Add a `_middleware.js` file where you want to verify JWTs, import _pages-plugin-verify-jwt_ and call it on a request, like so:

```js
import verifyJWTPlugin from '@fundamend/pages-plugin-verify-jwt';

export const onRequest = verifyJWTPlugin();
```

The plugin expects an environment variable of the name `JWT_VERIFICATION_KEY` to be set in Cloudflare.
Create this variable in the Cloudflare Dashboard or with wrangler (for local testing use a `.dev.vars` file) and set it to the verification key of your JWT token.

The plugin will be executed on every request inside the `_middleware.js` file's path.
If the JWT verifies with the `JWT_VERIFICATION_KEY`, it calls the next Cloudflare Pages function or middleware.
If not, it returns a `401 - Unauthorized` response.

## License

[MIT]

[cloudflare pages plugin]: https://developers.cloudflare.com/pages/platform/functions/plugins/
[fundamend.dev]: https://fundamend.dev
[jwt]: https://jwt.io/
[middleware]: https://developers.cloudflare.com/pages/platform/functions/#adding-middleware
[mit]: https://choosealicense.com/licenses/mit/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
