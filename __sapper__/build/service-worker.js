!function(){"use strict";const e=["client/client.c2fba592.js","client/client.e5b2ea58.js","client/index.121f6cbc.js"].concat(["service-worker-index.html","134216-32.png","daBurger.jpg","daBurger.svg","global.scss","HeadingDecorator.png","LisaTimMainPhoto.jpg","theme.scss"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1593235402720").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1593235402720"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1593235402720").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const c=await t.match(e.request);if(c)return c;throw s}}))))})}();
