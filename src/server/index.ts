import * as koa from 'koa';
import * as send from 'koa-send';
import * as serve from 'koa-static';
import sass from 'koa-node-sass';
import path from 'path';

const PORT = 3000;

const app = new koa();

// Serve static assets
app.use(serve('public'));

sass({
    src: path.join(__dirname, 'static', 'scss'), // default __dirname - sass Source File
    init: true                                   // default false     - Compile all '*.sass' or '*.scss' files in the src directory. Executed once when the project starts
});

// Serve index.html file
app.use(async (ctx, next) => {
    await send(ctx, 'index.html', { root: 'public' });
    return next();
})



app.listen(PORT, () => console.log('> Server listening at http://localhost:' + PORT))