(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1593228943544;

	const files = [
		"service-worker-index.html",
		"global.scss",
		"HeadingDecorator.png",
		"LisaTimMainPhoto.jpg",
		"theme.scss"
	];

	const shell = [
		"client/client.0515c637.js",
		"client/index.ac0dff68.js",
		"client/sapper-dev-client.1e7a4a5e.js",
		"client/client.c3f4a43f.js"
	];

	const ASSETS = `cache${timestamp}`;

	// `shell` is an array of all the files generated by the bundler,
	// `files` is an array of everything in the `static` directory
	const to_cache = shell.concat(files);
	const cached = new Set(to_cache);

	self.addEventListener('install', event => {
		event.waitUntil(
			caches
				.open(ASSETS)
				.then(cache => cache.addAll(to_cache))
				.then(() => {
					self.skipWaiting();
				})
		);
	});

	self.addEventListener('activate', event => {
		event.waitUntil(
			caches.keys().then(async keys => {
				// delete old caches
				for (const key of keys) {
					if (key !== ASSETS) await caches.delete(key);
				}

				self.clients.claim();
			})
		);
	});

	self.addEventListener('fetch', event => {
		if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

		const url = new URL(event.request.url);

		// don't try to handle e.g. data: URIs
		if (!url.protocol.startsWith('http')) return;

		// ignore dev server requests
		if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

		// always serve static files and bundler-generated assets from cache
		if (url.host === self.location.host && cached.has(url.pathname)) {
			event.respondWith(caches.match(event.request));
			return;
		}

		// for pages, you might want to serve a shell `service-worker-index.html` file,
		// which Sapper has generated for you. It's not right for every
		// app, but if it's right for yours then uncomment this section
		/*
		if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
			event.respondWith(caches.match('/service-worker-index.html'));
			return;
		}
		*/

		if (event.request.cache === 'only-if-cached') return;

		// for everything else, try the network first, falling back to
		// cache if the user is offline. (If the pages never change, you
		// might prefer a cache-first approach to a network-first one.)
		event.respondWith(
			caches
				.open(`offline${timestamp}`)
				.then(async cache => {
					try {
						const response = await fetch(event.request);
						cache.put(event.request, response.clone());
						return response;
					} catch(err) {
						const response = await cache.match(event.request);
						if (response) return response;

						throw err;
					}
				})
		);
	});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTU5MzIyODk0MzU0NDtcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcInNlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWxcIixcblx0XCJnbG9iYWwuc2Nzc1wiLFxuXHRcIkhlYWRpbmdEZWNvcmF0b3IucG5nXCIsXG5cdFwiTGlzYVRpbU1haW5QaG90by5qcGdcIixcblx0XCJ0aGVtZS5zY3NzXCJcbl07XG5leHBvcnQgeyBmaWxlcyBhcyBhc3NldHMgfTsgLy8gbGVnYWN5XG5cbmV4cG9ydCBjb25zdCBzaGVsbCA9IFtcblx0XCJjbGllbnQvY2xpZW50LjA1MTVjNjM3LmpzXCIsXG5cdFwiY2xpZW50L2luZGV4LmFjMGRmZjY4LmpzXCIsXG5cdFwiY2xpZW50L3NhcHBlci1kZXYtY2xpZW50LjFlN2E0YTVlLmpzXCIsXG5cdFwiY2xpZW50L2NsaWVudC5jM2Y0YTQzZi5qc1wiXG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuXHR7IHBhdHRlcm46IC9eXFwvJC8gfVxuXTsiLCJpbXBvcnQgeyB0aW1lc3RhbXAsIGZpbGVzLCBzaGVsbCwgcm91dGVzIH0gZnJvbSAnQHNhcHBlci9zZXJ2aWNlLXdvcmtlcic7XHJcblxyXG5jb25zdCBBU1NFVFMgPSBgY2FjaGUke3RpbWVzdGFtcH1gO1xyXG5cclxuLy8gYHNoZWxsYCBpcyBhbiBhcnJheSBvZiBhbGwgdGhlIGZpbGVzIGdlbmVyYXRlZCBieSB0aGUgYnVuZGxlcixcclxuLy8gYGZpbGVzYCBpcyBhbiBhcnJheSBvZiBldmVyeXRoaW5nIGluIHRoZSBgc3RhdGljYCBkaXJlY3RvcnlcclxuY29uc3QgdG9fY2FjaGUgPSBzaGVsbC5jb25jYXQoZmlsZXMpO1xyXG5jb25zdCBjYWNoZWQgPSBuZXcgU2V0KHRvX2NhY2hlKTtcclxuXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGV2ZW50ID0+IHtcclxuXHRldmVudC53YWl0VW50aWwoXHJcblx0XHRjYWNoZXNcclxuXHRcdFx0Lm9wZW4oQVNTRVRTKVxyXG5cdFx0XHQudGhlbihjYWNoZSA9PiBjYWNoZS5hZGRBbGwodG9fY2FjaGUpKVxyXG5cdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0c2VsZi5za2lwV2FpdGluZygpO1xyXG5cdFx0XHR9KVxyXG5cdCk7XHJcbn0pO1xyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGV2ZW50ID0+IHtcclxuXHRldmVudC53YWl0VW50aWwoXHJcblx0XHRjYWNoZXMua2V5cygpLnRoZW4oYXN5bmMga2V5cyA9PiB7XHJcblx0XHRcdC8vIGRlbGV0ZSBvbGQgY2FjaGVzXHJcblx0XHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuXHRcdFx0XHRpZiAoa2V5ICE9PSBBU1NFVFMpIGF3YWl0IGNhY2hlcy5kZWxldGUoa2V5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5jbGllbnRzLmNsYWltKCk7XHJcblx0XHR9KVxyXG5cdCk7XHJcbn0pO1xyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGV2ZW50ID0+IHtcclxuXHRpZiAoZXZlbnQucmVxdWVzdC5tZXRob2QgIT09ICdHRVQnIHx8IGV2ZW50LnJlcXVlc3QuaGVhZGVycy5oYXMoJ3JhbmdlJykpIHJldHVybjtcclxuXHJcblx0Y29uc3QgdXJsID0gbmV3IFVSTChldmVudC5yZXF1ZXN0LnVybCk7XHJcblxyXG5cdC8vIGRvbid0IHRyeSB0byBoYW5kbGUgZS5nLiBkYXRhOiBVUklzXHJcblx0aWYgKCF1cmwucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSByZXR1cm47XHJcblxyXG5cdC8vIGlnbm9yZSBkZXYgc2VydmVyIHJlcXVlc3RzXHJcblx0aWYgKHVybC5ob3N0bmFtZSA9PT0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAmJiB1cmwucG9ydCAhPT0gc2VsZi5sb2NhdGlvbi5wb3J0KSByZXR1cm47XHJcblxyXG5cdC8vIGFsd2F5cyBzZXJ2ZSBzdGF0aWMgZmlsZXMgYW5kIGJ1bmRsZXItZ2VuZXJhdGVkIGFzc2V0cyBmcm9tIGNhY2hlXHJcblx0aWYgKHVybC5ob3N0ID09PSBzZWxmLmxvY2F0aW9uLmhvc3QgJiYgY2FjaGVkLmhhcyh1cmwucGF0aG5hbWUpKSB7XHJcblx0XHRldmVudC5yZXNwb25kV2l0aChjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gZm9yIHBhZ2VzLCB5b3UgbWlnaHQgd2FudCB0byBzZXJ2ZSBhIHNoZWxsIGBzZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sYCBmaWxlLFxyXG5cdC8vIHdoaWNoIFNhcHBlciBoYXMgZ2VuZXJhdGVkIGZvciB5b3UuIEl0J3Mgbm90IHJpZ2h0IGZvciBldmVyeVxyXG5cdC8vIGFwcCwgYnV0IGlmIGl0J3MgcmlnaHQgZm9yIHlvdXJzIHRoZW4gdW5jb21tZW50IHRoaXMgc2VjdGlvblxyXG5cdC8qXHJcblx0aWYgKHVybC5vcmlnaW4gPT09IHNlbGYub3JpZ2luICYmIHJvdXRlcy5maW5kKHJvdXRlID0+IHJvdXRlLnBhdHRlcm4udGVzdCh1cmwucGF0aG5hbWUpKSkge1xyXG5cdFx0ZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKCcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Ki9cclxuXHJcblx0aWYgKGV2ZW50LnJlcXVlc3QuY2FjaGUgPT09ICdvbmx5LWlmLWNhY2hlZCcpIHJldHVybjtcclxuXHJcblx0Ly8gZm9yIGV2ZXJ5dGhpbmcgZWxzZSwgdHJ5IHRoZSBuZXR3b3JrIGZpcnN0LCBmYWxsaW5nIGJhY2sgdG9cclxuXHQvLyBjYWNoZSBpZiB0aGUgdXNlciBpcyBvZmZsaW5lLiAoSWYgdGhlIHBhZ2VzIG5ldmVyIGNoYW5nZSwgeW91XHJcblx0Ly8gbWlnaHQgcHJlZmVyIGEgY2FjaGUtZmlyc3QgYXBwcm9hY2ggdG8gYSBuZXR3b3JrLWZpcnN0IG9uZS4pXHJcblx0ZXZlbnQucmVzcG9uZFdpdGgoXHJcblx0XHRjYWNoZXNcclxuXHRcdFx0Lm9wZW4oYG9mZmxpbmUke3RpbWVzdGFtcH1gKVxyXG5cdFx0XHQudGhlbihhc3luYyBjYWNoZSA9PiB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZXZlbnQucmVxdWVzdCk7XHJcblx0XHRcdFx0XHRjYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHJldHVybiByZXNwb25zZTtcclxuXHJcblx0XHRcdFx0XHR0aHJvdyBlcnI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Q0FBQTtDQUNPLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUN2QztDQUNPLE1BQU0sS0FBSyxHQUFHO0NBQ3JCLENBQUMsMkJBQTJCO0NBQzVCLENBQUMsYUFBYTtDQUNkLENBQUMsc0JBQXNCO0NBQ3ZCLENBQUMsc0JBQXNCO0NBQ3ZCLENBQUMsWUFBWTtDQUNiLENBQUMsQ0FBQztBQUVGO0NBQ08sTUFBTSxLQUFLLEdBQUc7Q0FD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
