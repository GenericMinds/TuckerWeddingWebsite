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
  key: readFileSync('D:/Projects/tuckerweddingwebsite/client-1.local.key'),
  cert: readFileSync('D:/Projects/tuckerweddingwebsite/client-1.local.crt')
};

const { handler } = polka()
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )
    .get('*', (req, res) => {
        res.end(`POLKA: Hello from ${req.pathname}`);
    });

// Mount Polka to HTTPS server
createServer(options, handler).listen(ssl_port, _ => {
    console.log(`> Running on https://localhost:${ssl_port}`);
});
