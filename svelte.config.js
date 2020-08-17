const sveltePreprocess = require("svelte-preprocess");
const { dev } = require("sapper/dist/webpack");

module.exports.preprocess = sveltePreprocess({
  postcss: {
    plugins: [require("autoprefixer")],
  },
  scss: true,
  typescript: true
});