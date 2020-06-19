import Koa from "koa";
import connect from "koa-connect";
import koaStatic from "koa-static";
import * as sapper from '@sapper/server';

const { PORT } = process.env;

const app = new Koa();

app.use(koaStatic('static/assets'));

app.use(connect((req, res, next) => {
  req.originalUrl = req.url;
  sapper.middleware()(req, res, next);
}));

app.listen(PORT);