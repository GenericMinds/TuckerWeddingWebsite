const webpack = require("webpack");
const path = require("path");
const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");
const { preprocess } = require("./svelte.config");
const autoPreprocess = require("svelte-preprocess");
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const alias = { svelte: path.resolve("node_modules", "svelte") };
const extensions = [ ".mjs", ".ts", ".js", ".json", ".svelte", ".html" ];
const mainFields = [ "svelte", "module", "browser", "main" ];

const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

module.exports = {
    client: {
        entry: config.client.entry(),
        output: config.client.output(),
        resolve: { 
          alias, 
          extensions, 
          mainFields 
        },
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: "svelte-loader",
                        options: {
                            preprocess: autoPreprocess(),
                            dev,
                            emitCss: true,
                            hydratable: true,
                        }
                    }
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader'
                    }
                },
                {
                  test: /\.(s*)css$/,
                  use: [
                      'style-loader',
                      'css-loader',
                      'sass-loader',
                  ]
                }
            ]
        },
        mode,
        plugins: [
            new Dotenv(),
            new webpack.DefinePlugin({
                "process.browser": true,
                envKeys
            })
        ].filter(Boolean),
        devtool: dev && "inline-source-map"
    },

    server: {
        entry: config.server.entry(),
        output: config.server.output(),
        target: "node",
        resolve: { 
            alias, 
            extensions, 
            mainFields 
        },
        externals: Object.keys(pkg.dependencies).concat("encoding"),
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: "svelte-loader",
                        options: {
                            preprocess,
                            css: false,
                            generate: "ssr",
                            dev
                        }         
                    }
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader'
                    }
                }
            ]
        },
        mode: process.env.NODE_ENV,
        performance: {
            hints: false // it doesn't matter if server.js is large
        }
    },

    serviceworker: {
        entry: config.serviceworker.entry(),
        output: config.serviceworker.output(),
        mode: process.env.NODE_ENV,
    }
};