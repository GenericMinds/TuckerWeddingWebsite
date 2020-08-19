/* FOR ELASTIC BEANSTALK DEPLOY */

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
polka()
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) { throw err };
    });

/* FOR LOCAL 
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { createServer } = require('https');
const { readFileSync } = require('fs');
const ssl_port = 3000;

const options = {
  // The path & file names could be different.
  key: readFileSync('./client-1.local.key'),
  cert: readFileSync('./client-1.local.crt')
};

const { handler } = polka()
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    );

// Mount Polka to HTTPS server
createServer(options, handler).listen(ssl_port, _ => {
    console.log(`> Running on https://localhost:${ssl_port}`);
});
*/