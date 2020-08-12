'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var bodyParser = _interopDefault(require('body-parser'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
require('query-string');
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

var sql = require("mssql");
const config = {
    server: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: parseInt(process.env.RDS_PORT),
    database: 'TuckerWeddingWebsite'
};
async function get(req, res) {
    let toasts;
    sql.connect(config, function (err) {
        if (err) {
            throw err;
        }
        var request = new sql.Request();
        request.query('select * from Toast', function (err, recordset) {
            if (err) {
                throw err;
            }
            toasts = recordset.recordset;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(toasts));
        });
    });
}
async function post(req, res) {
    sql.connect(config, function (err) {
        if (err) {
            throw err;
        }
        var request = new sql.Request();
        request.input('toasterName', sql.VarChar(50), req.body.toast.toasterName);
        request.input('toasterRelationship', sql.VarChar(15), req.body.toast.toasterRelationship);
        request.input('toasterAssociation', sql.VarChar(5), req.body.toast.toasterAssociation);
        request.input('toastContent', sql.VarChar(sql.MAX), req.body.toast.toastContent);
        request.input('toasterFacebookId', sql.VarChar(50), req.body.toast.toasterFacebookId);
        request.query("insert into Toast (toasterName, toasterRelationship, toasterAssociation, toastContent, toasterFacebookId) VALUES (@toasterName, @toasterRelationship, @toasterAssociation, @toastContent, @toasterfacebookId);", function (err, recordset) {
            if (err) {
                throw err;
            }
            res.end(JSON.stringify(recordset));
        });
    });
}
async function put(req, res) {
    sql.connect(config, function (err) {
        if (err) {
            throw err;
        }
        var request = new sql.Request();
        request.input('toastId', sql.Int, req.body.toast.toastId);
        request.input('toasterName', sql.VarChar(50), req.body.toast.toasterName);
        request.input('toasterRelationship', sql.VarChar(15), req.body.toast.toasterRelationship);
        request.input('toasterAssociation', sql.VarChar(5), req.body.toast.toasterAssociation);
        request.input('toastContent', sql.VarChar(sql.MAX), req.body.toast.toastContent);
        request.input('toasterFacebookId', sql.VarChar(50), req.body.toast.toasterFacebookId);
        request.query("update Toast set toasterName = @toasterName, toasterRelationship = @toasterRelationship, toasterAssociation = @toasterAssociation, toastContent = @toastContent, toasterFacebookId = @toasterFacebookId where toastId = @toastId;", function (err, recordset) {
            if (err) {
                throw err;
            }
            res.end(JSON.stringify(recordset));
        });
    });
}
async function del(req, res) {
    sql.connect(config, function (err) {
        if (err) {
            throw err;
        }
        var request = new sql.Request();
        request.input('toastId', sql.Int, req.body.toastId);
        request.query("delete from Toast where toastId = @toastId;", function (err, recordset) {
            if (err) {
                throw err;
            }
            res.end(JSON.stringify(recordset));
        });
    });
}

var route_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    post: post,
    put: put,
    del: del
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += " " + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src\routes\_components\HeadingDecorator.svelte generated by Svelte v3.23.2 */

const css = {
	code: "img.svelte-1i0nu9n{padding-left:35%;padding-right:35%}div.svelte-1i0nu9n{padding:0;display:flex}@media only screen \r\nand (min-width : 320px) \r\nand (max-width : 450px){div.svelte-1i0nu9n{height:20px}}@media only screen \r\nand (min-width : 451px){div.svelte-1i0nu9n{height:40px}}",
	map: "{\"version\":3,\"file\":\"HeadingDecorator.svelte\",\"sources\":[\"HeadingDecorator.svelte\"],\"sourcesContent\":[\"<div>\\r\\n    <img alt='Heading Decoration' src='./HeadingDecorator.png'>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\nimg {\\r\\n    padding-left: 35%;\\r\\n    padding-right: 35%;\\r\\n}\\r\\n\\r\\ndiv {\\r\\n    padding: 0;\\r\\n    display: flex;\\r\\n}\\r\\n\\r\\n@media only screen \\r\\nand (min-width : 320px) \\r\\nand (max-width : 450px) {  \\r\\n    div {\\r\\n        height: 20px;\\r\\n    }\\r\\n}\\r\\n\\r\\n@media only screen \\r\\nand (min-width : 451px) {\\r\\n    div {\\r\\n        height: 40px;\\r\\n    }\\r\\n}\\r\\n</style>\"],\"names\":[],\"mappings\":\"AAKA,GAAG,eAAC,CAAC,AACD,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GAAG,AACtB,CAAC,AAED,GAAG,eAAC,CAAC,AACD,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM;AAClB,GAAG,CAAC,aAAa,KAAK,CAAC;AACvB,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AACrB,GAAG,eAAC,CAAC,AACD,MAAM,CAAE,IAAI,AAChB,CAAC,AACL,CAAC,AAED,OAAO,IAAI,CAAC,MAAM;AAClB,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AACrB,GAAG,eAAC,CAAC,AACD,MAAM,CAAE,IAAI,AAChB,CAAC,AACL,CAAC\"}"
};

const HeadingDecorator = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css);

	return `<div class="${"svelte-1i0nu9n"}"><img alt="${"Heading Decoration"}" src="${"./HeadingDecorator.png"}" class="${"svelte-1i0nu9n"}">
</div>`;
});

/* src\routes\_components\SectionHeader.svelte generated by Svelte v3.23.2 */

const css$1 = {
	code: "div.svelte-1j9basi{background-color:#375637;width:100%;margin-top:20px;padding:0;border-top-left-radius:10px;border-top-right-radius:10px}h1.svelte-1j9basi{color:#ddd499;margin:0 !important;padding-top:12px !important}@media only screen and (min-width: 0px) and (max-width: 450px){h1.svelte-1j9basi{font-size:32px !important;line-height:32px;padding-top:12px !important}}@media only screen and (min-width: 451px){h1.svelte-1j9basi{font-size:70px !important;line-height:70px}}",
	map: "{\"version\":3,\"file\":\"SectionHeader.svelte\",\"sources\":[\"SectionHeader.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import HeadingDecorator from './HeadingDecorator.svelte';\\r\\nexport let title;\\r\\n</script>\\r\\n\\r\\n<div class='SectionHeaderOutterWrapper'>\\r\\n    <h1>{title}</h1>\\r\\n    <HeadingDecorator />\\r\\n</div>\\r\\n\\r\\n<style lang='scss'>div {\\n  background-color: #375637;\\n  width: 100%;\\n  margin-top: 20px;\\n  padding: 0;\\n  border-top-left-radius: 10px;\\n  border-top-right-radius: 10px; }\\n\\nh1 {\\n  color: #ddd499;\\n  margin: 0 !important;\\n  padding-top: 12px !important; }\\n\\n@media only screen and (min-width: 0px) and (max-width: 450px) {\\n  h1 {\\n    font-size: 32px !important;\\n    line-height: 32px;\\n    padding-top: 12px !important; } }\\n\\n@media only screen and (min-width: 451px) {\\n  h1 {\\n    font-size: 70px !important;\\n    line-height: 70px; } }</style>\"],\"names\":[],\"mappings\":\"AASmB,GAAG,eAAC,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,sBAAsB,CAAE,IAAI,CAC5B,uBAAuB,CAAE,IAAI,AAAE,CAAC,AAElC,EAAE,eAAC,CAAC,AACF,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,CAAC,CAAC,UAAU,CACpB,WAAW,CAAE,IAAI,CAAC,UAAU,AAAE,CAAC,AAEjC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,GAAG,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC9D,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CAAC,UAAU,AAAE,CAAC,AAAC,CAAC,AAErC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,WAAW,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC\"}"
};

const SectionHeader = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { title } = $$props;
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	$$result.css.add(css$1);

	return `<div class="${"SectionHeaderOutterWrapper svelte-1j9basi"}"><h1 class="${"svelte-1j9basi"}">${escape(title)}</h1>
    ${validate_component(HeadingDecorator, "HeadingDecorator").$$render($$result, {}, {}, {})}
</div>`;
});

/* src\routes\_components\Jumbotron.svelte generated by Svelte v3.23.2 */

const css$2 = {
	code: "img.svelte-13cy81i{width:100%;object-fit:cover;border:2px solid #ddd499;box-sizing:border-box;border-radius:10px}div.svelte-13cy81i{width:100%;text-align:center}",
	map: "{\"version\":3,\"file\":\"Jumbotron.svelte\",\"sources\":[\"Jumbotron.svelte\"],\"sourcesContent\":[\"<div>\\r\\n    <img src='LisaTimMainPhoto.jpg' alt='Lisa and Tim posing during a hike in the woods.'/>\\r\\n</div>\\r\\n\\r\\n<style lang='scss'>img {\\n  width: 100%;\\n  object-fit: cover;\\n  border: 2px solid #ddd499;\\n  box-sizing: border-box;\\n  border-radius: 10px; }\\n\\ndiv {\\n  width: 100%;\\n  text-align: center; }</style>\"],\"names\":[],\"mappings\":\"AAImB,GAAG,eAAC,CAAC,AACtB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,UAAU,CACtB,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,GAAG,eAAC,CAAC,AACH,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,AAAE,CAAC\"}"
};

const Jumbotron = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$2);

	return `<div class="${"svelte-13cy81i"}"><img src="${"LisaTimMainPhoto.jpg"}" alt="${"Lisa and Tim posing during a hike in the woods."}" class="${"svelte-13cy81i"}">
</div>`;
});

/* src\routes\_components\Story.svelte generated by Svelte v3.23.2 */

const css$3 = {
	code: "@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';p.svelte-1rgh7vm{text-align:left;font-size:20px}span.svelte-1rgh7vm{font-family:'Princess Sofia';font-size:32px}div.svelte-1rgh7vm{padding:20px;background-color:#fff9ea;line-height:24px}",
	map: "{\"version\":3,\"file\":\"Story.svelte\",\"sources\":[\"Story.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import SectionHeader from './SectionHeader.svelte';\\r\\n</script>\\r\\n\\r\\n<section class='story'>\\r\\n    <SectionHeader title={'Our Story'}/>\\r\\n    <div>\\r\\n        <p><span>Once upon a time...</span> there was a king and a viking princess. They did not know it, but the gods had set the table for them to be together.</p>\\r\\n        <p>As the gods planned out their destiny, they couldn't quite agree on the path these two should take to get there. One of the gods set up their first meeting. As they were both looking to learn more about the world around them, they attended the Academy at the same time. The first god set it up so that they lived in close proximity. Once the other gods noticed, they intervened and kept them from meeting each other. It was not their time yet.</p>\\r\\n        <p>Both the king and the viking princess went on to have families of their own. Another one of the gods thought that this was the time and moved them to the same town. Both of their families grew up at the same time. The king had two daughters and the viking princess had two sons and two daughters. The kids grew up with each other and became friends. The eldest viking son and the eldest princess of the king both pursued the bardic arts together. The youngest viking daughter and the youngest princess of the king battled for the raiders through volley after volley of balls flung by the invading armies. Through all of this the other gods decided it was not time for the king and the viking princess to meet, and kept them apart. It was not their time yet.</p>\\r\\n        <p>A third god decided to make his move and arranged it so the viking princess joined the Parent Teacher Student Guild along with the Queen. Both were valiant champions in making sure the children of the kingdom were getting the appropriate education. Throughout their many meetings and public events, the other gods decided to intervene and not allow the king and viking princess to cross paths. It was not their time yet.</p>\\r\\n        <p>The viking princess pursued her advancement in the Parent Teacher Student Guild with fervor and eventually reached the rank of Teacher of The Native Tongue. A fourth god decided this would be the perfect time to introduce the king and the viking princess. This god arranged for the king's youngest princess to become an apprentice of the viking princess. Alas, the other gods intervened yet again and did not let their paths cross. It was not their time yet.</p>\\r\\n        <p>Living within the same kingdom, they were often in the market at the same time. Neither taking notice of each other. The gods had again decided to keep them away from each other. It was not their time yet.</p>\\r\\n        <p>By this point in time, both had moved on from their previous relationships. While there were times where they were happy, they knew deep down that something was missing. Their sons and daughters had grown up and had families of their own. The gods finally decided it was time.</p>\\r\\n        <p>One fateful day, they aligned the stars to allow them to meet. The king was discussing life with a noble friend of his in the market when the viking princess entered. Their paths would have crossed yet again without interaction, but the gods had carefully laid out this moment. The noble that the king was talking to happened to also be the brother in law of the eldest viking daughter. The noble noticed the viking princess and decided to make an introduction. After the noble left, they continued their shopping, glancing at each other through the market stalls. The strands of fate spinning stronger and stronger with each passing. Humans tend to be unpredictable and resist their destinies. The viking princess abruptly left the market without talking with the king further.</p>\\r\\n        <p>The gods didn't like this. They filled her head with doubt and her heart with excitement. She knew she veered from their plans and decided to take her shot. She sent out messengers to find the king. They eventually tracked him down and arranged for them to meet again. A quick meeting at the tavern turned into a long conversations leading into the dead of night, yet somehow time felt like it was standing still. Everything was falling into place and the match felt like a perfect fit. But as a human himself, the king was stubborn and decided he wasn't ready for his destiny.</p>\\r\\n        <p>The gods didn't like this. One day as the king was at the theater watching the newest play, he took note of one of the characters. This character was a viking. He thought back to the viking princess and began to doubt his choices. The king decided to give it another chance. This time when they met, they were both ready to embrace their destinies.</p>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';\\np {\\n  text-align: left;\\n  font-size: 20px; }\\n\\nspan {\\n  font-family: 'Princess Sofia';\\n  font-size: 32px; }\\n\\ndiv {\\n  padding: 20px;\\n  background-color: #fff9ea;\\n  line-height: 24px; }</style>\"],\"names\":[],\"mappings\":\"AAoBmB,QAAQ,wDAAwD,CAAC,AACpF,CAAC,eAAC,CAAC,AACD,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,AAAE,CAAC,AAEpB,IAAI,eAAC,CAAC,AACJ,WAAW,CAAE,gBAAgB,CAC7B,SAAS,CAAE,IAAI,AAAE,CAAC,AAEpB,GAAG,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,IAAI,AAAE,CAAC\"}"
};

const Story = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$3);

	return `<section class="${"story"}">${validate_component(SectionHeader, "SectionHeader").$$render($$result, { title: "Our Story" }, {}, {})}
    <div class="${"svelte-1rgh7vm"}"><p class="${"svelte-1rgh7vm"}"><span class="${"svelte-1rgh7vm"}">Once upon a time...</span> there was a king and a viking princess. They did not know it, but the gods had set the table for them to be together.</p>
        <p class="${"svelte-1rgh7vm"}">As the gods planned out their destiny, they couldn&#39;t quite agree on the path these two should take to get there. One of the gods set up their first meeting. As they were both looking to learn more about the world around them, they attended the Academy at the same time. The first god set it up so that they lived in close proximity. Once the other gods noticed, they intervened and kept them from meeting each other. It was not their time yet.</p>
        <p class="${"svelte-1rgh7vm"}">Both the king and the viking princess went on to have families of their own. Another one of the gods thought that this was the time and moved them to the same town. Both of their families grew up at the same time. The king had two daughters and the viking princess had two sons and two daughters. The kids grew up with each other and became friends. The eldest viking son and the eldest princess of the king both pursued the bardic arts together. The youngest viking daughter and the youngest princess of the king battled for the raiders through volley after volley of balls flung by the invading armies. Through all of this the other gods decided it was not time for the king and the viking princess to meet, and kept them apart. It was not their time yet.</p>
        <p class="${"svelte-1rgh7vm"}">A third god decided to make his move and arranged it so the viking princess joined the Parent Teacher Student Guild along with the Queen. Both were valiant champions in making sure the children of the kingdom were getting the appropriate education. Throughout their many meetings and public events, the other gods decided to intervene and not allow the king and viking princess to cross paths. It was not their time yet.</p>
        <p class="${"svelte-1rgh7vm"}">The viking princess pursued her advancement in the Parent Teacher Student Guild with fervor and eventually reached the rank of Teacher of The Native Tongue. A fourth god decided this would be the perfect time to introduce the king and the viking princess. This god arranged for the king&#39;s youngest princess to become an apprentice of the viking princess. Alas, the other gods intervened yet again and did not let their paths cross. It was not their time yet.</p>
        <p class="${"svelte-1rgh7vm"}">Living within the same kingdom, they were often in the market at the same time. Neither taking notice of each other. The gods had again decided to keep them away from each other. It was not their time yet.</p>
        <p class="${"svelte-1rgh7vm"}">By this point in time, both had moved on from their previous relationships. While there were times where they were happy, they knew deep down that something was missing. Their sons and daughters had grown up and had families of their own. The gods finally decided it was time.</p>
        <p class="${"svelte-1rgh7vm"}">One fateful day, they aligned the stars to allow them to meet. The king was discussing life with a noble friend of his in the market when the viking princess entered. Their paths would have crossed yet again without interaction, but the gods had carefully laid out this moment. The noble that the king was talking to happened to also be the brother in law of the eldest viking daughter. The noble noticed the viking princess and decided to make an introduction. After the noble left, they continued their shopping, glancing at each other through the market stalls. The strands of fate spinning stronger and stronger with each passing. Humans tend to be unpredictable and resist their destinies. The viking princess abruptly left the market without talking with the king further.</p>
        <p class="${"svelte-1rgh7vm"}">The gods didn&#39;t like this. They filled her head with doubt and her heart with excitement. She knew she veered from their plans and decided to take her shot. She sent out messengers to find the king. They eventually tracked him down and arranged for them to meet again. A quick meeting at the tavern turned into a long conversations leading into the dead of night, yet somehow time felt like it was standing still. Everything was falling into place and the match felt like a perfect fit. But as a human himself, the king was stubborn and decided he wasn&#39;t ready for his destiny.</p>
        <p class="${"svelte-1rgh7vm"}">The gods didn&#39;t like this. One day as the king was at the theater watching the newest play, he took note of one of the characters. This character was a viking. He thought back to the viking princess and began to doubt his choices. The king decided to give it another chance. This time when they met, they were both ready to embrace their destinies.</p></div>
</section>`;
});

/* src\routes\_components\Blended.svelte generated by Svelte v3.23.2 */

const css$4 = {
	code: "div.svelte-qk7tdo{background-color:#fff9ea;padding:20px;margin-bottom:20px}p.svelte-qk7tdo{font-size:20px;line-height:20px;margin:0}",
	map: "{\"version\":3,\"file\":\"Blended.svelte\",\"sources\":[\"Blended.svelte\"],\"sourcesContent\":[\"<script >\\r\\n    import SectionHeader from './SectionHeader.svelte';\\r\\n</script>\\r\\n\\r\\n<section class='blended'>\\r\\n    <SectionHeader title={'Blended Family Recipe'}/>\\r\\n    <div>\\r\\n        <p>Put a good and honest man</p>\\r\\n        <p>into a mixing pan.</p>\\r\\n        <p>Combine one loving woman</p>\\r\\n        <p>and blend well with the man.</p>\\r\\n        <br/>\\r\\n        <p>Add the children of the man,</p>\\r\\n        <p>and the woman's children too.</p>\\r\\n        <p>Mix them all together</p>\\r\\n        <p>as you would a pot of stew.</p>\\r\\n        <br/>\\r\\n        <p>Slowly stir in patience.</p>\\r\\n        <p>It will really help a lot.</p>\\r\\n        <p>If you're not sure how much,</p>\\r\\n        <p>throw in all you've got.</p>\\r\\n        <br/>\\r\\n        <p>Then, six cups of sweetener</p>\\r\\n        <p>and fourteen cups of love.</p>\\r\\n        <p>Sprinkle in some blessings</p>\\r\\n        <p>from the heavens high above.</p>\\r\\n        <br/>\\r\\n        <p>When the mixture is complete,</p>\\r\\n        <p>with great joy you will see...</p>\\r\\n        <p>creation of our awesome,</p>\\r\\n        <p>loving blended family.</p>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>div {\\n  background-color: #fff9ea;\\n  padding: 20px;\\n  margin-bottom: 20px; }\\n\\np {\\n  font-size: 20px;\\n  line-height: 20px;\\n  margin: 0; }</style>\"],\"names\":[],\"mappings\":\"AAkCmB,GAAG,cAAC,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,CAAC,cAAC,CAAC,AACD,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,AAAE,CAAC\"}"
};

const Blended = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$4);

	return `<section class="${"blended"}">${validate_component(SectionHeader, "SectionHeader").$$render($$result, { title: "Blended Family Recipe" }, {}, {})}
    <div class="${"svelte-qk7tdo"}"><p class="${"svelte-qk7tdo"}">Put a good and honest man</p>
        <p class="${"svelte-qk7tdo"}">into a mixing pan.</p>
        <p class="${"svelte-qk7tdo"}">Combine one loving woman</p>
        <p class="${"svelte-qk7tdo"}">and blend well with the man.</p>
        <br>
        <p class="${"svelte-qk7tdo"}">Add the children of the man,</p>
        <p class="${"svelte-qk7tdo"}">and the woman&#39;s children too.</p>
        <p class="${"svelte-qk7tdo"}">Mix them all together</p>
        <p class="${"svelte-qk7tdo"}">as you would a pot of stew.</p>
        <br>
        <p class="${"svelte-qk7tdo"}">Slowly stir in patience.</p>
        <p class="${"svelte-qk7tdo"}">It will really help a lot.</p>
        <p class="${"svelte-qk7tdo"}">If you&#39;re not sure how much,</p>
        <p class="${"svelte-qk7tdo"}">throw in all you&#39;ve got.</p>
        <br>
        <p class="${"svelte-qk7tdo"}">Then, six cups of sweetener</p>
        <p class="${"svelte-qk7tdo"}">and fourteen cups of love.</p>
        <p class="${"svelte-qk7tdo"}">Sprinkle in some blessings</p>
        <p class="${"svelte-qk7tdo"}">from the heavens high above.</p>
        <br>
        <p class="${"svelte-qk7tdo"}">When the mixture is complete,</p>
        <p class="${"svelte-qk7tdo"}">with great joy you will see...</p>
        <p class="${"svelte-qk7tdo"}">creation of our awesome,</p>
        <p class="${"svelte-qk7tdo"}">loving blended family.</p></div>
</section>`;
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var siema_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),l=function(){function e(t){var i=this;if(r(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.loop?this.config.startIndex%this.innerElements.length:Math.max(0,Math.min(this.config.startIndex,this.innerElements.length-this.perPage)),this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler","clickHandler"].forEach(function(e){i[e]=i[e].bind(i);}),this.init();}return s(e,[{key:"attachEvents",value:function(){window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:!1},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler),this.selector.addEventListener("click",this.clickHandler));}},{key:"detachEvents",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("click",this.clickHandler);}},{key:"init",value:function(){this.attachEvents(),this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr",this.buildSliderFrame(),this.config.onInit.call(this);}},{key:"buildSliderFrame",value:function(){var e=this.selectorWidth/this.perPage,t=this.config.loop?this.innerElements.length+2*this.perPage:this.innerElements.length;this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=e*t+"px",this.enableTransition(),this.config.draggable&&(this.selector.style.cursor="-webkit-grab");var i=document.createDocumentFragment();if(this.config.loop)for(var r=this.innerElements.length-this.perPage;r<this.innerElements.length;r++){var n=this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));i.appendChild(n);}for(var s=0;s<this.innerElements.length;s++){var l=this.buildSliderFrameItem(this.innerElements[s]);i.appendChild(l);}if(this.config.loop)for(var o=0;o<this.perPage;o++){var a=this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));i.appendChild(a);}this.sliderFrame.appendChild(i),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent();}},{key:"buildSliderFrameItem",value:function(e){var t=document.createElement("div");return t.style.cssFloat=this.config.rtl?"right":"left",t.style.float=this.config.rtl?"right":"left",t.style.width=(this.config.loop?100/(this.innerElements.length+2*this.perPage):100/this.innerElements.length)+"%",t.appendChild(e),t}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===n(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e]);}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide-e<0){this.disableTransition();var r=this.currentSlide+this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r-e;}else this.currentSlide=this.currentSlide-e;}else this.currentSlide=Math.max(this.currentSlide-e,0);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this));}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide+e>this.innerElements.length-this.perPage){this.disableTransition();var r=this.currentSlide-this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r+e;}else this.currentSlide=this.currentSlide+e;}else this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this));}}},{key:"disableTransition",value:function(){this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;}},{key:"enableTransition",value:function(){this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing;}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;this.currentSlide=this.config.loop?e%this.innerElements.length:Math.min(Math.max(e,0),this.innerElements.length-this.perPage),i!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this));}}},{key:"slideToCurrent",value:function(e){var t=this,i=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,r=(this.config.rtl?1:-1)*i*(this.selectorWidth/this.perPage);e?requestAnimationFrame(function(){requestAnimationFrame(function(){t.enableTransition(),t.sliderFrame.style[t.transformProperty]="translate3d("+r+"px, 0, 0)";});}):this.sliderFrame.style[this.transformProperty]="translate3d("+r+"px, 0, 0)";}},{key:"updateAfterDrag",value:function(){var e=(this.config.rtl?-1:1)*(this.drag.endX-this.drag.startX),t=Math.abs(e),i=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.perPage)):1,r=e>0&&this.currentSlide-i<0,n=e<0&&this.currentSlide+i>this.innerElements.length-this.perPage;e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(i):e<0&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(i),this.slideToCurrent(r||n);}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.currentSlide+this.perPage>this.innerElements.length&&(this.currentSlide=this.innerElements.length<=this.perPage?0:this.innerElements.length-this.perPage),this.selectorWidth=this.selector.offsetWidth,this.buildSliderFrame();}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:this.drag.preventClick};}},{key:"touchstartHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY);}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag();}},{key:"touchmoveHandler",value:function(e){if(e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo){e.preventDefault(),this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)";}}},{key:"mousedownHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX);}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag();}},{key:"mousemoveHandler",value:function(e){if(e.preventDefault(),this.pointerDown){"A"===e.target.nodeName&&(this.drag.preventClick=!0),this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)";}}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.drag.preventClick=!1,this.enableTransition(),this.updateAfterDrag(),this.clearDrag());}},{key:"clickHandler",value:function(e){this.drag.preventClick&&e.preventDefault(),this.drag.preventClick=!1;}},{key:"remove",value:function(e,t){if(e<0||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");var i=e<this.currentSlide,r=this.currentSlide+this.perPage-1===e;(i||r)&&this.currentSlide--,this.innerElements.splice(e,1),this.buildSliderFrame(),t&&t.call(this);}},{key:"insert",value:function(e,t,i){if(t<0||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");var r=t<=this.currentSlide>0&&this.innerElements.length;this.currentSlide=r?this.currentSlide+1:this.currentSlide,this.innerElements.splice(t,0,e),this.buildSliderFrame(),i&&i.call(this);}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this);}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this);}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(this.detachEvents(),this.selector.style.cursor="auto",e){for(var i=document.createDocumentFragment(),r=0;r<this.innerElements.length;r++)i.appendChild(this.innerElements[r]);this.selector.innerHTML="",this.selector.appendChild(i),this.selector.removeAttribute("style");}t&&t.call(this);}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:!1,rtl:!1,onInit:function(){},onChange:function(){}},i=e;for(var r in i)t[r]=i[r];return t}},{key:"webkitOrNot",value:function(){return "string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}}]),e}();t.default=l,e.exports=t.default;}])});
});

var Siema = /*@__PURE__*/unwrapExports(siema_min);

/* node_modules\@beyonk\svelte-carousel\src\Carousel.svelte generated by Svelte v3.23.2 */

const css$5 = {
	code: ".carousel.svelte-1d83jxb.svelte-1d83jxb{position:relative;width:100%;justify-content:center;align-items:center}button.svelte-1d83jxb.svelte-1d83jxb{position:absolute;width:40px;height:40px;top:50%;z-index:50;margin-top:-20px;border:none;background-color:transparent}button.svelte-1d83jxb.svelte-1d83jxb:focus{outline:none}.left.svelte-1d83jxb.svelte-1d83jxb{left:2vw}.right.svelte-1d83jxb.svelte-1d83jxb{right:2vw}ul.svelte-1d83jxb.svelte-1d83jxb{list-style-type:none;position:absolute;display:flex;justify-content:center;width:100%;margin-top:-30px;padding:0}ul.svelte-1d83jxb li.svelte-1d83jxb{margin:6px;border-radius:100%;background-color:rgba(255,255,255,0.5);height:8px;width:8px}ul.svelte-1d83jxb li.svelte-1d83jxb:hover{background-color:rgba(255,255,255,0.85)}ul.svelte-1d83jxb li.active.svelte-1d83jxb{background-color:rgba(255,255,255,1)}",
	map: "{\"version\":3,\"file\":\"Carousel.svelte\",\"sources\":[\"Carousel.svelte\"],\"sourcesContent\":[\"\\n<div class=\\\"carousel\\\">\\n\\t<div class=\\\"slides\\\" bind:this={siema}>\\n\\t\\t<slot></slot>\\n\\t</div>\\n\\t{#if controls}\\n\\t<button class=\\\"left\\\" on:click={left} aria-label=\\\"left\\\">\\n\\t\\t<slot name=\\\"left-control\\\"></slot>\\n\\t</button>\\n\\t<button class=\\\"right\\\" on:click={right} aria-label=\\\"right\\\">\\n\\t\\t<slot name=\\\"right-control\\\"></slot>\\n\\t</button>\\n\\t{/if}\\n    {#if dots}\\n\\t<ul>\\n\\t\\t{#each {length: totalDots} as _, i}\\n\\t\\t<li on:click={() => go(i*currentPerPage)} class={isDotActive(currentIndex, i) ? \\\"active\\\" : \\\"\\\"}></li>\\n\\t\\t{/each}\\n\\t</ul>\\n    {/if}\\n</div>\\n\\n<style>\\n.carousel {\\n\\tposition: relative;\\n\\twidth: 100%;\\n\\tjustify-content: center;\\n\\talign-items: center;\\n}\\n\\nbutton {\\n\\tposition: absolute;\\n\\twidth: 40px;\\n\\theight: 40px;\\n\\ttop: 50%;\\n\\tz-index: 50;\\n\\tmargin-top: -20px;\\n\\tborder: none;\\n\\tbackground-color: transparent;\\n}\\n\\n button:focus {\\n   outline: none;\\n }\\n\\n.left {\\n\\tleft: 2vw;\\n}\\n\\n.right {\\n\\tright: 2vw;\\n}\\n\\nul {\\n\\tlist-style-type: none;\\n\\tposition: absolute;\\n\\tdisplay: flex;\\n\\tjustify-content: center;\\n\\twidth: 100%;\\n\\tmargin-top: -30px;\\n\\tpadding: 0;\\n}\\n\\nul li {\\n\\tmargin: 6px;\\n\\tborder-radius: 100%;\\n\\tbackground-color: rgba(255,255,255,0.5);\\n\\theight: 8px;\\n\\twidth: 8px;\\n}\\n\\nul li:hover {\\n\\tbackground-color: rgba(255,255,255,0.85);\\n}\\n\\nul li.active {\\n\\tbackground-color: rgba(255,255,255,1);\\n}\\n</style>\\n\\n<script>\\n\\timport Siema from 'siema'\\n\\timport { onMount, createEventDispatcher } from 'svelte'\\n\\t\\n\\texport let perPage = 3\\n\\texport let loop = true\\n\\texport let autoplay = 0\\n\\texport let duration = 200\\n\\texport let easing = 'ease-out'\\n\\texport let startIndex = 0\\n\\texport let draggable = true\\n\\texport let multipleDrag = true\\t\\n\\texport let dots = true\\t\\n\\texport let controls = true\\n\\texport let threshold = 20\\n\\texport let rtl = false\\n\\tlet currentIndex = startIndex;\\n\\t\\n\\tlet siema\\n\\tlet controller\\n\\tlet timer\\n\\n\\tconst dispatch = createEventDispatcher()\\n\\n\\t$: pips = controller ? controller.innerElements : []\\n\\t$: currentPerPage = controller ? controller.perPage : perPage\\n\\t$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : []\\n\\t\\n\\tonMount(() => {\\n\\t\\tcontroller = new Siema({\\n\\t\\t\\tselector: siema,\\n\\t\\t\\tperPage: typeof perPage === 'object' ? perPage : Number(perPage),\\n\\t\\t\\tloop,\\n  \\t\\t\\tduration,\\n  \\t\\t\\teasing,\\n  \\t\\t\\tstartIndex,\\n  \\t\\t\\tdraggable,\\n \\t\\t\\tmultipleDrag,\\n  \\t\\t\\tthreshold,\\n  \\t\\t\\trtl,\\n\\t\\t\\tonChange: handleChange\\n\\t\\t})\\n\\t\\t\\n\\t\\tif(autoplay) {\\n\\t\\t\\ttimer = setInterval(right, autoplay);\\n\\t\\t}\\n\\n\\t\\treturn () => {\\n\\t\\t\\tautoplay && clearInterval(timer)\\n\\t\\t\\tcontroller.destroy()\\n\\t\\t}\\n\\t})\\n\\n\\texport function isDotActive (currentIndex, dotIndex) {\\n        if (currentIndex < 0) currentIndex = pips.length + currentIndex;\\n        return currentIndex >= dotIndex*currentPerPage && currentIndex < (dotIndex*currentPerPage)+currentPerPage\\n    }\\n\\t\\n\\texport function left () {\\n\\t\\tcontroller.prev()\\n\\t}\\n\\t\\n\\texport function right () {\\n\\t\\tcontroller.next()\\n\\t}\\n\\n\\texport function go (index) {\\n\\t\\tcontroller.goTo(index)\\n\\t}\\n\\t\\n\\texport function pause() {\\n\\t\\tclearInterval(timer);\\n\\t}\\n\\n\\texport function resume() {\\n\\t\\tif (autoplay) {\\n\\t\\t\\ttimer = setInterval(right, autoplay);\\n\\t\\t}\\n\\t}\\n\\n\\tfunction handleChange (event) {\\n\\t\\tcurrentIndex = controller.currentSlide\\n\\n\\t\\tdispatch('change', {\\n\\t\\t\\tcurrentSlide: controller.currentSlide,\\n\\t\\t\\tslideCount: controller.innerElements.length\\n\\t\\t} )\\n\\t}\\n</script>\\n\"],\"names\":[],\"mappings\":\"AAuBA,SAAS,8BAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,8BAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,AAC9B,CAAC,AAEA,oCAAM,MAAM,AAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AAEF,KAAK,8BAAC,CAAC,AACN,IAAI,CAAE,GAAG,AACV,CAAC,AAED,MAAM,8BAAC,CAAC,AACP,KAAK,CAAE,GAAG,AACX,CAAC,AAED,EAAE,8BAAC,CAAC,AACH,eAAe,CAAE,IAAI,CACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,CAAC,AACX,CAAC,AAED,iBAAE,CAAC,EAAE,eAAC,CAAC,AACN,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,IAAI,CACnB,gBAAgB,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CACvC,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,AACX,CAAC,AAED,iBAAE,CAAC,iBAAE,MAAM,AAAC,CAAC,AACZ,gBAAgB,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,AACzC,CAAC,AAED,iBAAE,CAAC,EAAE,OAAO,eAAC,CAAC,AACb,gBAAgB,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,AACtC,CAAC\"}"
};

const Carousel = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { perPage = 3 } = $$props;
	let { loop = true } = $$props;
	let { autoplay = 0 } = $$props;
	let { duration = 200 } = $$props;
	let { easing = "ease-out" } = $$props;
	let { startIndex = 0 } = $$props;
	let { draggable = true } = $$props;
	let { multipleDrag = true } = $$props;
	let { dots = true } = $$props;
	let { controls = true } = $$props;
	let { threshold = 20 } = $$props;
	let { rtl = false } = $$props;
	let currentIndex = startIndex;
	let siema;
	let controller;
	let timer;
	const dispatch = createEventDispatcher();

	onMount(() => {
		controller = new Siema({
				selector: siema,
				perPage: typeof perPage === "object" ? perPage : Number(perPage),
				loop,
				duration,
				easing,
				startIndex,
				draggable,
				multipleDrag,
				threshold,
				rtl,
				onChange: handleChange
			});

		if (autoplay) {
			timer = setInterval(right, autoplay);
		}

		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});

	function isDotActive(currentIndex, dotIndex) {
		if (currentIndex < 0) currentIndex = pips.length + currentIndex;
		return currentIndex >= dotIndex * currentPerPage && currentIndex < dotIndex * currentPerPage + currentPerPage;
	}

	function left() {
		controller.prev();
	}

	function right() {
		controller.next();
	}

	function go(index) {
		controller.goTo(index);
	}

	function pause() {
		clearInterval(timer);
	}

	function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	function handleChange(event) {
		currentIndex = controller.currentSlide;

		dispatch("change", {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		});
	}

	if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0) $$bindings.perPage(perPage);
	if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
	if ($$props.autoplay === void 0 && $$bindings.autoplay && autoplay !== void 0) $$bindings.autoplay(autoplay);
	if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
	if ($$props.easing === void 0 && $$bindings.easing && easing !== void 0) $$bindings.easing(easing);
	if ($$props.startIndex === void 0 && $$bindings.startIndex && startIndex !== void 0) $$bindings.startIndex(startIndex);
	if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0) $$bindings.draggable(draggable);
	if ($$props.multipleDrag === void 0 && $$bindings.multipleDrag && multipleDrag !== void 0) $$bindings.multipleDrag(multipleDrag);
	if ($$props.dots === void 0 && $$bindings.dots && dots !== void 0) $$bindings.dots(dots);
	if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0) $$bindings.controls(controls);
	if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0) $$bindings.threshold(threshold);
	if ($$props.rtl === void 0 && $$bindings.rtl && rtl !== void 0) $$bindings.rtl(rtl);
	if ($$props.isDotActive === void 0 && $$bindings.isDotActive && isDotActive !== void 0) $$bindings.isDotActive(isDotActive);
	if ($$props.left === void 0 && $$bindings.left && left !== void 0) $$bindings.left(left);
	if ($$props.right === void 0 && $$bindings.right && right !== void 0) $$bindings.right(right);
	if ($$props.go === void 0 && $$bindings.go && go !== void 0) $$bindings.go(go);
	if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0) $$bindings.pause(pause);
	if ($$props.resume === void 0 && $$bindings.resume && resume !== void 0) $$bindings.resume(resume);
	$$result.css.add(css$5);
	let pips = controller ? controller.innerElements : [];
	let currentPerPage = controller ? controller.perPage : perPage;

	let totalDots = controller
	? Math.ceil(controller.innerElements.length / currentPerPage)
	: [];

	return `<div class="${"carousel svelte-1d83jxb"}"><div class="${"slides"}"${add_attribute("this", siema, 1)}>${$$slots.default ? $$slots.default({}) : ``}</div>
	${controls
	? `<button class="${"left svelte-1d83jxb"}" aria-label="${"left"}">${$$slots["left-control"]
		? $$slots["left-control"]({})
		: ``}</button>
	<button class="${"right svelte-1d83jxb"}" aria-label="${"right"}">${$$slots["right-control"]
		? $$slots["right-control"]({})
		: ``}</button>`
	: ``}
    ${dots
	? `<ul class="${"svelte-1d83jxb"}">${each({ length: totalDots }, (_, i) => `<li class="${escape(null_to_empty(isDotActive(currentIndex, i) ? "active" : "")) + " svelte-1d83jxb"}"></li>`)}</ul>`
	: ``}
</div>`;
});

/* node_modules\svelte-feather-icons\src\icons\ChevronLeftIcon.svelte generated by Svelte v3.23.2 */

const ChevronLeftIcon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { size = "100%" } = $$props;
	let { class: customClass = "" } = $$props;

	if (size !== "100%") {
		size = size.slice(-1) === "x"
		? size.slice(0, size.length - 1) + "em"
		: parseInt(size) + "px";
	}

	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.class === void 0 && $$bindings.class && customClass !== void 0) $$bindings.class(customClass);
	return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-left " + escape(customClass)}"><polyline points="${"15 18 9 12 15 6"}"></polyline></svg>`;
});

/* node_modules\svelte-feather-icons\src\icons\ChevronRightIcon.svelte generated by Svelte v3.23.2 */

const ChevronRightIcon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { size = "100%" } = $$props;
	let { class: customClass = "" } = $$props;

	if (size !== "100%") {
		size = size.slice(-1) === "x"
		? size.slice(0, size.length - 1) + "em"
		: parseInt(size) + "px";
	}

	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.class === void 0 && $$bindings.class && customClass !== void 0) $$bindings.class(customClass);
	return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-chevron-right " + escape(customClass)}"><polyline points="${"9 18 15 12 9 6"}"></polyline></svg>`;
});

/* src\routes\_components\Clan.svelte generated by Svelte v3.23.2 */

const css$6 = {
	code: ".outterWrapper.svelte-1jtf3io{background-color:#375637;padding-bottom:20px;box-sizing:content-box;border-bottom-right-radius:10px;border-bottom-left-radius:10px}.innerWrapper.svelte-1jtf3io{margin:0 auto;height:300px;width:300px;overflow:hidden;background-color:#fff9ea;border-radius:10px}.control.svelte-1jtf3io svg{color:#375637}.left.svelte-1jtf3io{float:left}.right.svelte-1jtf3io{float:right}.slide-content.svelte-1jtf3io{border:1px solid #eee;display:flex;flex-direction:column;height:300px}img.svelte-1jtf3io{position:relative;top:50%;transform:translateY(-50%)}@media only screen and (min-width: 320px) and (max-width: 450px){.innerWrapper.svelte-1jtf3io{height:300px;width:300px}.control.svelte-1jtf3io svg{width:50%;height:50%}.slide-content.svelte-1jtf3io{height:300px}}@media only screen and (min-width: 451px) and (max-width: 1224px){.innerWrapper.svelte-1jtf3io{height:400px;width:400px}.control.svelte-1jtf3io svg{width:50%;height:50%}.slide-content.svelte-1jtf3io{height:400px}}@media only screen and (min-width: 1225px){.innerWrapper.svelte-1jtf3io{height:600px;width:600px}.control.svelte-1jtf3io svg{width:100%;height:100%;border:2px solid #375637;border-radius:32px}.slide-content.svelte-1jtf3io{height:600px}}",
	map: "{\"version\":3,\"file\":\"Clan.svelte\",\"sources\":[\"Clan.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import SectionHeader from './SectionHeader.svelte';\\r\\n\\timport Carousel from '@beyonk/svelte-carousel';\\r\\n    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';\\r\\n\\r\\n\\tlet carouselOptions = [\\r\\n\\t\\t{\\r\\n            perPage: 1,\\r\\n            dots: false\\r\\n\\t\\t}\\r\\n    ]\\r\\n    \\r\\n    let photos = [\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg',\\t\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg',\\t\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg',\\r\\n        'https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg'\\r\\n    ];\\r\\n</script>\\r\\n\\r\\n<section class='clan'>\\r\\n    <SectionHeader title={'Our Clan'}/>\\r\\n    <div class='outterWrapper'>\\r\\n        <div class='innerWrapper'>\\r\\n            {#each carouselOptions as carousel}\\r\\n            <Carousel {...carousel}>\\r\\n                <span class=\\\"control left\\\" slot=\\\"left-control\\\">\\r\\n                    <ChevronLeftIcon />\\r\\n                </span>\\r\\n                {#each photos as photo}\\r\\n                <div class=\\\"slide-content\\\">\\r\\n                    <img src={photo} alt=\\\"Lisa and Tim's Family\\\">\\r\\n                </div>\\r\\n                {/each}\\r\\n                <span class=\\\"control right\\\" slot=\\\"right-control\\\">\\r\\n                    <ChevronRightIcon />\\r\\n                </span>\\r\\n            </Carousel>\\r\\n            <br/>\\r\\n            <br/>\\r\\n            {/each}\\r\\n        </div>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>.outterWrapper {\\n  background-color: #375637;\\n  padding-bottom: 20px;\\n  box-sizing: content-box;\\n  border-bottom-right-radius: 10px;\\n  border-bottom-left-radius: 10px; }\\n\\n.innerWrapper {\\n  margin: 0 auto;\\n  height: 300px;\\n  width: 300px;\\n  overflow: hidden;\\n  background-color: #fff9ea;\\n  border-radius: 10px; }\\n\\n.control :global(svg) {\\n  color: #375637; }\\n\\n.left {\\n  float: left; }\\n\\n.right {\\n  float: right; }\\n\\n.slide-content {\\n  border: 1px solid #eee;\\n  display: flex;\\n  flex-direction: column;\\n  height: 300px; }\\n\\nimg {\\n  position: relative;\\n  top: 50%;\\n  transform: translateY(-50%); }\\n\\n@media only screen and (min-width: 320px) and (max-width: 450px) {\\n  .innerWrapper {\\n    height: 300px;\\n    width: 300px; }\\n  .control :global(svg) {\\n    width: 50%;\\n    height: 50%; }\\n  .slide-content {\\n    height: 300px; } }\\n\\n@media only screen and (min-width: 451px) and (max-width: 1224px) {\\n  .innerWrapper {\\n    height: 400px;\\n    width: 400px; }\\n  .control :global(svg) {\\n    width: 50%;\\n    height: 50%; }\\n  .slide-content {\\n    height: 400px; } }\\n\\n@media only screen and (min-width: 1225px) {\\n  .innerWrapper {\\n    height: 600px;\\n    width: 600px; }\\n  .control :global(svg) {\\n    width: 100%;\\n    height: 100%;\\n    border: 2px solid #375637;\\n    border-radius: 32px; }\\n  .slide-content {\\n    height: 600px; } }</style>\\r\\n\"],\"names\":[],\"mappings\":\"AA+DmB,cAAc,eAAC,CAAC,AACjC,gBAAgB,CAAE,OAAO,CACzB,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,WAAW,CACvB,0BAA0B,CAAE,IAAI,CAChC,yBAAyB,CAAE,IAAI,AAAE,CAAC,AAEpC,aAAa,eAAC,CAAC,AACb,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,AAAE,CAAC,AAEhB,MAAM,eAAC,CAAC,AACN,KAAK,CAAE,KAAK,AAAE,CAAC,AAEjB,cAAc,eAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,KAAK,AAAE,CAAC,AAElB,GAAG,eAAC,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,AAAE,CAAC,AAEhC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAChE,aAAa,eAAC,CAAC,AACb,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AAAE,CAAC,AACjB,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AAAE,CAAC,AAChB,cAAc,eAAC,CAAC,AACd,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAEtB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACjE,aAAa,eAAC,CAAC,AACb,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AAAE,CAAC,AACjB,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AAAE,CAAC,AAChB,cAAc,eAAC,CAAC,AACd,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAEtB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,aAAa,eAAC,CAAC,AACb,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AAAE,CAAC,AACjB,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,IAAI,AAAE,CAAC,AACxB,cAAc,eAAC,CAAC,AACd,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC\"}"
};

const Clan = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let carouselOptions = [{ perPage: 1, dots: false }];

	let photos = [
		"https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg",
		"https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg"
	];

	$$result.css.add(css$6);

	return `<section class="${"clan"}">${validate_component(SectionHeader, "SectionHeader").$$render($$result, { title: "Our Clan" }, {}, {})}
    <div class="${"outterWrapper svelte-1jtf3io"}"><div class="${"innerWrapper svelte-1jtf3io"}">${each(carouselOptions, carousel => `${validate_component(Carousel, "Carousel").$$render($$result, Object.assign(carousel), {}, {
		"left-control": () => `<span class="${"control left svelte-1jtf3io"}" slot="${"left-control"}">${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, {}, {}, {})}</span>`,
		"right-control": () => `<span class="${"control right svelte-1jtf3io"}" slot="${"right-control"}">${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, {}, {}, {})}
                </span>`,
		default: () => `
                ${each(photos, photo => `<div class="${"slide-content svelte-1jtf3io"}"><img${add_attribute("src", photo, 0)} alt="${"Lisa and Tim's Family"}" class="${"svelte-1jtf3io"}">
                </div>`)}
                `
	})}
            <br>
            <br>`)}</div></div>
</section>`;
});

/* src\routes\_components\ToastForm.svelte generated by Svelte v3.23.2 */

const css$7 = {
	code: ".svelte-182jy8j::placeholder{color:black}.svelte-182jy8j:disabled{opacity:.5}div.svelte-182jy8j{padding:20px;border:2px solid #375637}.form-element.svelte-182jy8j{background-color:#fff9ea;border:2px solid #375637 !important;margin-bottom:20px}button.svelte-182jy8j{border-radius:5px;border:none;color:#ddd499;padding:6px 32px}.facebook-button.svelte-182jy8j{background-color:#3578e5}.propose-button.svelte-182jy8j{background-color:#375637}",
	map: "{\"version\":3,\"file\":\"ToastForm.svelte\",\"sources\":[\"ToastForm.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>;\\r\\nimport SectionHeader from './SectionHeader.svelte';\\r\\nimport { createEventDispatcher } from 'svelte';\\r\\nconst dispatch = createEventDispatcher();\\r\\nexport let isLoggedIn;\\r\\nexport let facebookUserId;\\r\\nexport let toast;\\r\\nexport let isEdittingToast;\\r\\nasync function proposeToast() {\\r\\n    if (toast.toasterName == '' || toast.toastContent == '') {\\r\\n        return;\\r\\n    }\\r\\n    toast.toasterFacebookId = facebookUserId;\\r\\n    await fetch('/api/toastController', {\\r\\n        method: 'POST',\\r\\n        body: JSON.stringify({ toast }),\\r\\n        headers: { \\\"Content-type\\\": \\\"application/json\\\" }\\r\\n    }).then(response => window.location.reload());\\r\\n}\\r\\n;\\r\\nasync function updateToast() {\\r\\n    if (toast.toasterName == '' || toast.toastContent == '') {\\r\\n        return;\\r\\n    }\\r\\n    await fetch('/api/toastController', {\\r\\n        method: 'PUT',\\r\\n        body: JSON.stringify({ toast }),\\r\\n        headers: { \\\"Content-type\\\": \\\"application/json\\\" }\\r\\n    }).then(response => window.location.reload());\\r\\n}\\r\\nfunction logIn() {\\r\\n    dispatch(\\\"toggleLogIn\\\");\\r\\n}\\r\\n</script>\\r\\n\\r\\n<section class='propose'>\\r\\n    <SectionHeader title={isEdittingToast ? 'Editting Toast...' : 'Propose a Toast'}/>\\r\\n    <div>\\r\\n        <input class='form-element' type='text' disabled={!isLoggedIn} placeholder='Name' bind:value={toast.toasterName}/>\\r\\n            <select class='form-element' disabled={!isLoggedIn} bind:value={toast.toasterRelationship}>\\r\\n                <option selected disabled hidden>Select Relationship</option>\\r\\n                <option value='Father'>Father</option>\\r\\n                <option value='Mother'>Mother</option>\\r\\n                <option value='Brother'>Brother</option>\\r\\n                <option value='Sister'>Sister</option>\\r\\n                <option value='Son'>Son</option>\\r\\n                <option value='Daughter'>Daughter</option>\\r\\n                <option value='Relative'>Relative</option>\\r\\n                <option value='Friend'>Friend</option>\\r\\n            </select>\\r\\n        <p>of the</p>\\r\\n            <select class='form-element' disabled={!isLoggedIn} bind:value={toast.toasterAssociation}>\\r\\n                <option selected disabled hidden>Select Bride or Groom</option>\\r\\n                <option value='Groom'>Groom</option>\\r\\n                <option value='Bride'>Bride</option>\\r\\n            </select>\\r\\n        <textarea class='form-element' disabled={!isLoggedIn} bind:value={toast.toastContent} rows={7} placeholder='Toast'></textarea>\\r\\n        {#if !isLoggedIn}\\r\\n            <button class='facebook-button' on:click={logIn}>Log in with Facebook to Propose</button>\\r\\n        {/if}\\r\\n        {#if isLoggedIn}\\r\\n            {#if isEdittingToast}\\r\\n                <button class='propose-button' on:click={updateToast}>Update!</button>\\r\\n            {:else}\\r\\n                <button class='propose-button' on:click={proposeToast}>Propose!</button>\\r\\n            {/if}\\r\\n        {/if}\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>::placeholder {\\n  color: black; }\\n\\n:disabled {\\n  opacity: .5; }\\n\\ndiv {\\n  padding: 20px;\\n  border: 2px solid #375637; }\\n\\n.form-element {\\n  background-color: #fff9ea;\\n  border: 2px solid #375637 !important;\\n  margin-bottom: 20px; }\\n\\nbutton {\\n  border-radius: 5px;\\n  border: none;\\n  color: #ddd499;\\n  padding: 6px 32px; }\\n\\n.facebook-button {\\n  background-color: #3578e5; }\\n\\n.propose-button {\\n  background-color: #375637; }</style>\"],\"names\":[],\"mappings\":\"eAsEmB,aAAa,AAAC,CAAC,AAChC,KAAK,CAAE,KAAK,AAAE,CAAC,eAEjB,SAAS,AAAC,CAAC,AACT,OAAO,CAAE,EAAE,AAAE,CAAC,AAEhB,GAAG,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAAE,CAAC,AAE9B,aAAa,eAAC,CAAC,AACb,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,MAAM,eAAC,CAAC,AACN,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,GAAG,CAAC,IAAI,AAAE,CAAC,AAEtB,gBAAgB,eAAC,CAAC,AAChB,gBAAgB,CAAE,OAAO,AAAE,CAAC,AAE9B,eAAe,eAAC,CAAC,AACf,gBAAgB,CAAE,OAAO,AAAE,CAAC\"}"
};

const ToastForm = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	const dispatch = createEventDispatcher();
	let { isLoggedIn } = $$props;
	let { facebookUserId } = $$props;
	let { toast } = $$props;
	let { isEdittingToast } = $$props;

	if ($$props.isLoggedIn === void 0 && $$bindings.isLoggedIn && isLoggedIn !== void 0) $$bindings.isLoggedIn(isLoggedIn);
	if ($$props.facebookUserId === void 0 && $$bindings.facebookUserId && facebookUserId !== void 0) $$bindings.facebookUserId(facebookUserId);
	if ($$props.toast === void 0 && $$bindings.toast && toast !== void 0) $$bindings.toast(toast);
	if ($$props.isEdittingToast === void 0 && $$bindings.isEdittingToast && isEdittingToast !== void 0) $$bindings.isEdittingToast(isEdittingToast);
	$$result.css.add(css$7);

	return `<section class="${"propose svelte-182jy8j"}">${validate_component(SectionHeader, "SectionHeader").$$render(
		$$result,
		{
			title: isEdittingToast
			? "Editting Toast..."
			: "Propose a Toast"
		},
		{},
		{}
	)}
    <div class="${"svelte-182jy8j"}"><input class="${"form-element svelte-182jy8j"}" type="${"text"}" ${!isLoggedIn ? "disabled" : ""} placeholder="${"Name"}"${add_attribute("value", toast.toasterName, 1)}>
            <select class="${"form-element svelte-182jy8j"}" ${!isLoggedIn ? "disabled" : ""}${add_attribute("value", toast.toasterRelationship, 1)}><option selected disabled hidden value="${"Select Relationship"}" class="${"svelte-182jy8j"}">Select Relationship</option><option value="${"Father"}" class="${"svelte-182jy8j"}">Father</option><option value="${"Mother"}" class="${"svelte-182jy8j"}">Mother</option><option value="${"Brother"}" class="${"svelte-182jy8j"}">Brother</option><option value="${"Sister"}" class="${"svelte-182jy8j"}">Sister</option><option value="${"Son"}" class="${"svelte-182jy8j"}">Son</option><option value="${"Daughter"}" class="${"svelte-182jy8j"}">Daughter</option><option value="${"Relative"}" class="${"svelte-182jy8j"}">Relative</option><option value="${"Friend"}" class="${"svelte-182jy8j"}">Friend</option></select>
        <p class="${"svelte-182jy8j"}">of the</p>
            <select class="${"form-element svelte-182jy8j"}" ${!isLoggedIn ? "disabled" : ""}${add_attribute("value", toast.toasterAssociation, 1)}><option selected disabled hidden value="${"Select Bride or Groom"}" class="${"svelte-182jy8j"}">Select Bride or Groom</option><option value="${"Groom"}" class="${"svelte-182jy8j"}">Groom</option><option value="${"Bride"}" class="${"svelte-182jy8j"}">Bride</option></select>
        <textarea class="${"form-element svelte-182jy8j"}" ${!isLoggedIn ? "disabled" : ""}${add_attribute("rows", 7, 0)} placeholder="${"Toast"}">${toast.toastContent || ""}</textarea>
        ${!isLoggedIn
	? `<button class="${"facebook-button svelte-182jy8j"}">Log in with Facebook to Propose</button>`
	: ``}
        ${isLoggedIn
	? `${isEdittingToast
		? `<button class="${"propose-button svelte-182jy8j"}">Update!</button>`
		: `<button class="${"propose-button svelte-182jy8j"}">Propose!</button>`}`
	: ``}</div>
</section>`;
});

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

/* node_modules\svelte-chota\cmp\Modal.svelte generated by Svelte v3.23.2 */

const css$8 = {
	code: ".container.svelte-4lwi8h{position:fixed;top:0px;left:0px;width:100vw;height:100vh;z-index:10000}.background.svelte-4lwi8h{position:fixed;top:0px;left:0px;width:100vw;height:100vh;background-color:black;opacity:0.5}.modal.svelte-4lwi8h{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);min-width:400px;background-color:white}",
	map: "{\"version\":3,\"file\":\"Modal.svelte\",\"sources\":[\"Modal.svelte\"],\"sourcesContent\":[\"<script>\\n    import {getEventsAction} from './utils';\\n    import {fade} from 'svelte/transition';\\n    import {current_component} from 'svelte/internal';\\n    \\n    export let open = false;\\n\\n    const events = getEventsAction(current_component);\\n\\n    let is_header = $$props.$$slots && $$props.$$slots.header !== undefined;\\n    let is_footer = $$props.$$slots && $$props.$$slots.footer !== undefined;\\n</script>\\n\\n\\n{#if open}\\n<div class=\\\"container\\\" transition:fade={{ duration: 200 }}>\\n    <div class=\\\"background\\\" on:click={e => open=false}/>\\n    <div class:modal={1} use:events {...$$restProps}><slot></slot></div>\\n</div>\\n{/if}\\n\\n<style>\\n.container{\\n    position:fixed;\\n    top:0px;\\n    left:0px;\\n    width:100vw;\\n    height:100vh;\\n    z-index:10000;\\n}\\n\\n.background{\\n    position:fixed;\\n    top:0px;\\n    left: 0px;\\n    width:100vw;\\n    height:100vh;\\n    background-color:black;\\n    opacity: 0.5;\\n}\\n\\n.modal{\\n    position: fixed;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    min-width:400px;\\n    background-color: white;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAsBA,wBAAU,CAAC,AACP,SAAS,KAAK,CACd,IAAI,GAAG,CACP,KAAK,GAAG,CACR,MAAM,KAAK,CACX,OAAO,KAAK,CACZ,QAAQ,KAAK,AACjB,CAAC,AAED,yBAAW,CAAC,AACR,SAAS,KAAK,CACd,IAAI,GAAG,CACP,IAAI,CAAE,GAAG,CACT,MAAM,KAAK,CACX,OAAO,KAAK,CACZ,iBAAiB,KAAK,CACtB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,oBAAM,CAAC,AACH,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,UAAU,KAAK,CACf,gBAAgB,CAAE,KAAK,AAC3B,CAAC\"}"
};

const Modal = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $$restProps = compute_rest_props($$props, ["open"]);
	let { open = false } = $$props;
	let is_header = $$props.$$slots && $$props.$$slots.header !== undefined;
	let is_footer = $$props.$$slots && $$props.$$slots.footer !== undefined;
	if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
	$$result.css.add(css$8);

	return `${open
	? `<div class="${"container svelte-4lwi8h"}"><div class="${"background svelte-4lwi8h"}"></div>
    <div${spread([$$restProps], ( "modal" ) + " " + "svelte-4lwi8h")}>${$$slots.default ? $$slots.default({}) : ``}</div></div>`
	: ``}`;
});

/* src\routes\_components\ToastsList.svelte generated by Svelte v3.23.2 */

const css$9 = {
	code: "button.svelte-18biagw{border-radius:5px;border:none;background-color:#375637;color:#ddd499;padding:6px 12px}div.svelte-18biagw{padding:20px 20px 20px 20px;font-size:20px;background-color:#fff9ea}",
	map: "{\"version\":3,\"file\":\"ToastsList.svelte\",\"sources\":[\"ToastsList.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import { onMount } from \\\"svelte\\\";\\r\\n;\\r\\nimport SectionHeader from './SectionHeader.svelte';\\r\\nimport { createEventDispatcher } from 'svelte';\\r\\nimport { Modal } from 'svelte-chota';\\r\\nconst dispatch = createEventDispatcher();\\r\\nlet open = false;\\r\\nlet toasts = [];\\r\\nexport let isLoggedIn;\\r\\nexport let facebookUserId;\\r\\nfunction isAuthor(toasterFacebookId) {\\r\\n    return facebookUserId === toasterFacebookId;\\r\\n}\\r\\nfunction editToast(toast) {\\r\\n    dispatch('editToast', toast);\\r\\n}\\r\\nonMount(async () => {\\r\\n    await fetch('api/toastController', { method: 'GET' })\\r\\n        .then(toasts => toasts.json())\\r\\n        .then(toastsData => {\\r\\n        toasts = toastsData;\\r\\n    });\\r\\n});\\r\\nasync function deleteToast(toastId) {\\r\\n    await fetch('/api/toastController', {\\r\\n        method: 'DELETE',\\r\\n        body: JSON.stringify({ toastId }),\\r\\n        headers: { \\\"Content-type\\\": \\\"application/json\\\" }\\r\\n    }).then(response => window.location.reload());\\r\\n}\\r\\n</script>\\r\\n\\r\\n<section class='toasts'>\\r\\n    <SectionHeader title={'Toasts'}/>\\r\\n    <div class='toasts'>\\r\\n        {#each toasts as toast}\\r\\n            <p>{toast.toastContent}</p>\\r\\n            <p> - {toast.toasterName}, {toast.toasterRelationship} of the {toast.toasterAssociation}\\r\\n            {#if isLoggedIn && isAuthor(toast.toasterFacebookId)}\\r\\n                <button on:click={() => {editToast(toast)}}>Edit</button>\\r\\n                <button on:click={e => open=true}>Delete</button>\\r\\n                <Modal bind:open>\\r\\n                    <div>\\r\\n                        Are you sure you want to delete this toast?\\r\\n                        <div>\\r\\n                            <button on:click={deleteToast(toast.toastId)}>Delete</button>\\r\\n                            <button on:click={e => open=false}>Cancel</button>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </Modal>\\r\\n            {/if}\\r\\n            </p> \\r\\n        {/each}\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>button {\\n  border-radius: 5px;\\n  border: none;\\n  background-color: #375637;\\n  color: #ddd499;\\n  padding: 6px 12px; }\\n\\ndiv {\\n  padding: 20px 20px 20px 20px;\\n  font-size: 20px;\\n  background-color: #fff9ea; }</style>\"],\"names\":[],\"mappings\":\"AAwDmB,MAAM,eAAC,CAAC,AACzB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,GAAG,CAAC,IAAI,AAAE,CAAC,AAEtB,GAAG,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAC5B,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,OAAO,AAAE,CAAC\"}"
};

const ToastsList = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	const dispatch = createEventDispatcher();
	let open = false;
	let toasts = [];
	let { isLoggedIn } = $$props;
	let { facebookUserId } = $$props;

	function isAuthor(toasterFacebookId) {
		return facebookUserId === toasterFacebookId;
	}

	onMount(async () => {
		await fetch("api/toastController", { method: "GET" }).then(toasts => toasts.json()).then(toastsData => {
			toasts = toastsData;
		});
	});

	if ($$props.isLoggedIn === void 0 && $$bindings.isLoggedIn && isLoggedIn !== void 0) $$bindings.isLoggedIn(isLoggedIn);
	if ($$props.facebookUserId === void 0 && $$bindings.facebookUserId && facebookUserId !== void 0) $$bindings.facebookUserId(facebookUserId);
	$$result.css.add(css$9);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `<section class="${"toasts"}">${validate_component(SectionHeader, "SectionHeader").$$render($$result, { title: "Toasts" }, {}, {})}
    <div class="${"toasts svelte-18biagw"}">${each(toasts, toast => `<p>${escape(toast.toastContent)}</p>
            <p>- ${escape(toast.toasterName)}, ${escape(toast.toasterRelationship)} of the ${escape(toast.toasterAssociation)}
            ${isLoggedIn && isAuthor(toast.toasterFacebookId)
		? `<button class="${"svelte-18biagw"}">Edit</button>
                <button class="${"svelte-18biagw"}">Delete</button>
                ${validate_component(Modal, "Modal").$$render(
				$$result,
				{ open },
				{
					open: $$value => {
						open = $$value;
						$$settled = false;
					}
				},
				{
					default: () => `<div class="${"svelte-18biagw"}">Are you sure you want to delete this toast?
                        <div class="${"svelte-18biagw"}"><button class="${"svelte-18biagw"}">Delete</button>
                            <button class="${"svelte-18biagw"}">Cancel</button>
                        </div></div>
                `
				}
			)}`
		: ``}
            </p>`)}</div>
</section>`;
	} while (!$$settled);

	return $$rendered;
});

/* src\routes\_components\Toasts.svelte generated by Svelte v3.23.2 */

const Toasts = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	const dispatch = createEventDispatcher();
	let { isLoggedIn } = $$props;
	let { facebookUserId } = $$props;
	let isEdittingToast = false;

	let toast = {
		toastId: null,
		toasterName: "",
		toasterRelationship: "",
		toasterAssociation: "",
		toastContent: "",
		toasterFacebookId: ""
	};

	if ($$props.isLoggedIn === void 0 && $$bindings.isLoggedIn && isLoggedIn !== void 0) $$bindings.isLoggedIn(isLoggedIn);
	if ($$props.facebookUserId === void 0 && $$bindings.facebookUserId && facebookUserId !== void 0) $$bindings.facebookUserId(facebookUserId);

	return `${validate_component(ToastsList, "ToastsList").$$render($$result, { facebookUserId, isLoggedIn }, {}, {})}
${validate_component(ToastForm, "ToastForm").$$render(
		$$result,
		{
			isEdittingToast,
			toast,
			facebookUserId,
			isLoggedIn
		},
		{},
		{}
	)}`;
});

/* src\routes\_components\MenuIcon.svelte generated by Svelte v3.23.2 */

const css$a = {
	code: "img.svelte-1wfooms{position:fixed;right:30px;top:17.5px;height:30px;width:30px;margin:0}img.svelte-1wfooms:hover{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"MenuIcon.svelte\",\"sources\":[\"MenuIcon.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import { createEventDispatcher } from 'svelte';\\r\\nconst dispatch = createEventDispatcher();\\r\\nlet isOpen = false;\\r\\nfunction handleToggle() {\\r\\n    dispatch('handleToggle');\\r\\n}\\r\\n</script>\\r\\n\\r\\n<img on:click={handleToggle} src='./MenuIcon.png' alt='Menu Icon'/>     \\r\\n\\r\\n<style>\\r\\nimg {\\r\\n    position: fixed;\\r\\n    right: 30px;\\r\\n    top: 17.5px;\\r\\n    height: 30px;\\r\\n    width: 30px;\\r\\n    margin: 0;\\r\\n}\\r\\n\\r\\nimg:hover {\\r\\n    cursor: pointer;\\r\\n}\\r\\n</style>\"],\"names\":[],\"mappings\":\"AAWA,GAAG,eAAC,CAAC,AACD,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,MAAM,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,CAAC,AACb,CAAC,AAED,kBAAG,MAAM,AAAC,CAAC,AACP,MAAM,CAAE,OAAO,AACnB,CAAC\"}"
};

const MenuIcon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();

	$$result.css.add(css$a);
	return `<img src="${"./MenuIcon.png"}" alt="${"Menu Icon"}" class="${"svelte-1wfooms"}">`;
});

/* src\routes\_components\Menu.svelte generated by Svelte v3.23.2 */

const css$b = {
	code: "@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';.menu.svelte-f675pp.svelte-f675pp{position:absolute;top:65px;right:0;height:100vh;background-color:#375637;color:#ddd499;z-index:999}ul.svelte-f675pp.svelte-f675pp{text-align:center;font-size:35px;overflow:hidden;padding:20px 0 0 0;margin:0;list-style:none;height:100%}li.svelte-f675pp.svelte-f675pp:hover{background-color:#2E4A2E}li.svelte-f675pp:hover div.svelte-f675pp{text-decoration:underline;cursor:pointer}li.svelte-f675pp.svelte-f675pp{height:10%}div.svelte-f675pp.svelte-f675pp{display:block;height:100%;text-align:center;font-size:32px;line-height:32px}.arrow.svelte-f675pp.svelte-f675pp{float:left}img.svelte-f675pp.svelte-f675pp{width:100%}.section.svelte-f675pp.svelte-f675pp{float:right}@media only screen and (min-width: 320px) and (max-width: 450px){.menu.svelte-f675pp.svelte-f675pp{width:100%}.arrow.svelte-f675pp.svelte-f675pp{width:0%}.section.svelte-f675pp.svelte-f675pp{width:100%}}@media only screen and (min-width: 451px){.menu.svelte-f675pp.svelte-f675pp{width:25%}.arrow.svelte-f675pp.svelte-f675pp{width:6.25%}.section.svelte-f675pp.svelte-f675pp{width:93.75%}}",
	map: "{\"version\":3,\"file\":\"Menu.svelte\",\"sources\":[\"Menu.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import Overlay from 'svelte-overlay';\\r\\nimport * as animateScroll from 'svelte-scrollto';\\r\\nimport { createEventDispatcher } from 'svelte';\\r\\nconst dispatch = createEventDispatcher();\\r\\nexport let isLoggedIn;\\r\\nexport let isOpen;\\r\\nfunction logOut() {\\r\\n    dispatch(\\\"toggleLogIn\\\");\\r\\n    handleSectionSelection('home');\\r\\n}\\r\\nfunction handleSectionSelection(section) {\\r\\n    dispatch('handleToggle');\\r\\n    if (section == 'home') {\\r\\n        animateScroll.scrollToTop();\\r\\n        return;\\r\\n    }\\r\\n    animateScroll.scrollTo({ element: '.' + section, offset: -65 });\\r\\n}\\r\\n</script>\\r\\n\\r\\n{#if isOpen}\\r\\n    <div class='menu'>\\r\\n        <ul>\\r\\n            <li on:click={() => {handleSectionSelection('home')}}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Home</div>\\r\\n            </li>\\r\\n            <li on:click={() => {handleSectionSelection('story')}}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Our Story</div>\\r\\n            </li>\\r\\n            <li on:click={() => {handleSectionSelection('clan')}}>                \\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Our Clan</div>\\r\\n            </li>\\r\\n            <li on:click={() => {handleSectionSelection('toasts')}}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Toasts</div>\\r\\n            </li>\\r\\n            <li on:click={() => {handleSectionSelection('propose')}}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Propose a Toast</div>\\r\\n            </li>\\r\\n            <li on:click={() => {handleSectionSelection('blended')}}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Blended Family</div>\\r\\n            </li>\\r\\n        {#if isLoggedIn}\\r\\n            <li on:click={logOut}>\\r\\n                <div class='arrow'>\\r\\n                    <img src='./MenuArrowIcon.png' alt='Menu Arrow Icon'/>\\r\\n                </div>\\r\\n                <div class='section'>Log out</div>\\r\\n            </li>\\r\\n        {/if}\\r\\n        </ul>\\r\\n    </div>\\r\\n{/if}\\r\\n\\r\\n<style lang='scss'>@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';\\n.menu {\\n  position: absolute;\\n  top: 65px;\\n  right: 0;\\n  height: 100vh;\\n  background-color: #375637;\\n  color: #ddd499;\\n  z-index: 999; }\\n\\nul {\\n  text-align: center;\\n  font-size: 35px;\\n  overflow: hidden;\\n  padding: 20px 0 0 0;\\n  margin: 0;\\n  list-style: none;\\n  height: 100%; }\\n\\nli:hover {\\n  background-color: #2E4A2E; }\\n  li:hover div {\\n    text-decoration: underline;\\n    cursor: pointer; }\\n\\nli {\\n  height: 10%; }\\n\\ndiv {\\n  display: block;\\n  height: 100%;\\n  text-align: center;\\n  font-size: 32px;\\n  line-height: 32px; }\\n\\n.arrow {\\n  float: left; }\\n\\nimg {\\n  width: 100%; }\\n\\n.section {\\n  float: right; }\\n\\n@media only screen and (min-width: 320px) and (max-width: 450px) {\\n  .menu {\\n    width: 100%; }\\n  .arrow {\\n    width: 0%; }\\n  .section {\\n    width: 100%; } }\\n\\n@media only screen and (min-width: 451px) {\\n  .menu {\\n    width: 25%; }\\n  .arrow {\\n    width: 6.25%; }\\n  .section {\\n    width: 93.75%; } }</style>\"],\"names\":[],\"mappings\":\"AAuEmB,QAAQ,wDAAwD,CAAC,AACpF,KAAK,4BAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,GAAG,AAAE,CAAC,AAEjB,EAAE,4BAAC,CAAC,AACF,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,AAAE,CAAC,AAEjB,8BAAE,MAAM,AAAC,CAAC,AACR,gBAAgB,CAAE,OAAO,AAAE,CAAC,AAC5B,gBAAE,MAAM,CAAC,GAAG,cAAC,CAAC,AACZ,eAAe,CAAE,SAAS,CAC1B,MAAM,CAAE,OAAO,AAAE,CAAC,AAEtB,EAAE,4BAAC,CAAC,AACF,MAAM,CAAE,GAAG,AAAE,CAAC,AAEhB,GAAG,4BAAC,CAAC,AACH,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AAAE,CAAC,AAEtB,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,IAAI,AAAE,CAAC,AAEhB,GAAG,4BAAC,CAAC,AACH,KAAK,CAAE,IAAI,AAAE,CAAC,AAEhB,QAAQ,4BAAC,CAAC,AACR,KAAK,CAAE,KAAK,AAAE,CAAC,AAEjB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAChE,KAAK,4BAAC,CAAC,AACL,KAAK,CAAE,IAAI,AAAE,CAAC,AAChB,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,EAAE,AAAE,CAAC,AACd,QAAQ,4BAAC,CAAC,AACR,KAAK,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEpB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,KAAK,4BAAC,CAAC,AACL,KAAK,CAAE,GAAG,AAAE,CAAC,AACf,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,KAAK,AAAE,CAAC,AACjB,QAAQ,4BAAC,CAAC,AACR,KAAK,CAAE,MAAM,AAAE,CAAC,AAAC,CAAC\"}"
};

const Menu = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();
	let { isLoggedIn } = $$props;
	let { isOpen } = $$props;

	if ($$props.isLoggedIn === void 0 && $$bindings.isLoggedIn && isLoggedIn !== void 0) $$bindings.isLoggedIn(isLoggedIn);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
	$$result.css.add(css$b);

	return `${isOpen
	? `<div class="${"menu svelte-f675pp"}"><ul class="${"svelte-f675pp"}"><li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Home</div></li>
            <li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Our Story</div></li>
            <li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Our Clan</div></li>
            <li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Toasts</div></li>
            <li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Propose a Toast</div></li>
            <li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Blended Family</div></li>
        ${isLoggedIn
		? `<li class="${"svelte-f675pp"}"><div class="${"arrow svelte-f675pp"}"><img src="${"./MenuArrowIcon.png"}" alt="${"Menu Arrow Icon"}" class="${"svelte-f675pp"}"></div>
                <div class="${"section svelte-f675pp"}">Log out</div></li>`
		: ``}</ul></div>`
	: ``}`;
});

/* src\routes\_components\Nav.svelte generated by Svelte v3.23.2 */

const css$c = {
	code: ".svelte-1u6idg5{z-index:999}div.svelte-1u6idg5{background-color:#375637;height:65px;width:calc(100% - 18px) !important;position:absolute;top:0}p.svelte-1u6idg5{color:#ddd499;font-weight:bold;font-size:30px;line-height:30px;margin:17.5px 0 0 30px}@media only screen and (min-width: 320px) and (max-width: 450px){div.svelte-1u6idg5{width:100%}}@media only screen and (min-width: 451px){div.svelte-1u6idg5{width:calc(100% - 18px) !important}}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import MenuIcon from './MenuIcon.svelte';\\r\\nimport Menu from './Menu.svelte';\\r\\nimport * as queryString from 'query-string';\\r\\nimport { createEventDispatcher } from 'svelte';\\r\\nconst dispatch = createEventDispatcher();\\r\\nexport let isLoggedIn;\\r\\nlet isOpen = false;\\r\\nfunction forward() {\\r\\n    dispatch('toggleLogIn');\\r\\n}\\r\\nfunction handleToggle() {\\r\\n    isOpen = !isOpen;\\r\\n}\\r\\n</script>\\r\\n\\r\\n<div>\\r\\n    <p>#blameitonfate</p>\\r\\n    <MenuIcon on:handleToggle={handleToggle} isOpen={isOpen}/>\\r\\n    <Menu on:handleToggle={handleToggle} isLoggedIn={isLoggedIn} on:toggleLogIn={forward} isOpen={isOpen}/>\\r\\n</div>\\r\\n\\r\\n<style lang='scss'>* {\\n  z-index: 999; }\\n\\ndiv {\\n  background-color: #375637;\\n  height: 65px;\\n  width: calc(100% - 18px) !important;\\n  position: absolute;\\n  top: 0; }\\n\\np {\\n  color: #ddd499;\\n  font-weight: bold;\\n  font-size: 30px;\\n  line-height: 30px;\\n  margin: 17.5px 0 0 30px; }\\n\\n@media only screen and (min-width: 320px) and (max-width: 450px) {\\n  div {\\n    width: 100%; } }\\n\\n@media only screen and (min-width: 451px) {\\n  div {\\n    width: calc(100% - 18px) !important; } }</style>\"],\"names\":[],\"mappings\":\"AAqBmB,eAAE,CAAC,AACpB,OAAO,CAAE,GAAG,AAAE,CAAC,AAEjB,GAAG,eAAC,CAAC,AACH,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACnC,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,AAAE,CAAC,AAEX,CAAC,eAAC,CAAC,AACD,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,AAAE,CAAC,AAE5B,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAChE,GAAG,eAAC,CAAC,AACH,KAAK,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEpB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,GAAG,eAAC,CAAC,AACH,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,AAAE,CAAC,AAAC,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const dispatch = createEventDispatcher();
	let { isLoggedIn } = $$props;
	let isOpen = false;

	if ($$props.isLoggedIn === void 0 && $$bindings.isLoggedIn && isLoggedIn !== void 0) $$bindings.isLoggedIn(isLoggedIn);
	$$result.css.add(css$c);

	return `<div class="${"svelte-1u6idg5"}"><p class="${"svelte-1u6idg5"}">#blameitonfate</p>
    ${validate_component(MenuIcon, "MenuIcon").$$render($$result, { isOpen }, {}, {})}
    ${validate_component(Menu, "Menu").$$render($$result, { isLoggedIn, isOpen }, {}, {})}
</div>`;
});

/* src\routes\index.svelte generated by Svelte v3.23.2 */

const css$d = {
	code: "@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';@import 'https://fonts.googleapis.com/css?family=Rokkitt';body{background-color:#dfe1e0 !important;margin:0;overflow:auto;height:100%;line-height:0 !important;font-family:'Rokkit' !important}h1{font-family:'Princess Sofia'}section{line-height:100%;text-align:center}p,a,li{font-family:'Rokkitt'}html{position:absolute;height:100%;overflow:hidden}@media only screen and (min-width: 320px) and (max-width: 450px){#sapper{width:100vw;height:100vh}}@media only screen and (min-width: 451){#sapper{width:calc(100vw - 18px);height:100vh}}@media only screen and (min-width: 320px) and (max-width: 1100px){.pageDecorator{position:fixed;pointer-events:none;width:0%;height:0%}.wrapper{width:100%;display:grid;grid-template-columns:0% 100% 0%;margin-top:65px;padding:20px}}@media only screen and (min-width: 1101px){.pageDecorator{position:fixed;pointer-events:none}.left{top:65px;left:0px}.right{bottom:0px;right:18px}.wrapper{width:100%;display:grid;grid-template-columns:25% 50% 25%;margin-top:65px;padding:20px 0 20px 0}}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import { onMount } from 'svelte';\\r\\nimport SectionHeader from './_components/SectionHeader.svelte';\\r\\nimport Jumbotron from './_components/Jumbotron.svelte';\\r\\nimport Story from './_components/Story.svelte';\\r\\nimport Blended from './_components/Blended.svelte';\\r\\nimport Clan from './_components/Clan.svelte';\\r\\nimport Toasts from './_components/Toasts.svelte';\\r\\nimport Nav from './_components/Nav.svelte';\\r\\nlet isLoggedIn = false;\\r\\nlet facebookUserId;\\r\\nonMount(() => {\\r\\n    FB.init({\\r\\n        appId: '778058433003434',\\r\\n        cookie: true,\\r\\n        xfbml: true,\\r\\n        version: 'v7.0'\\r\\n    });\\r\\n    FB.getLoginStatus(function (response) {\\r\\n        isLoggedIn = (response.status === 'connected');\\r\\n        facebookUserId = response.authResponse.userID;\\r\\n    });\\r\\n});\\r\\nfunction toggleLogIn() {\\r\\n    if (isFacebookConnected()) {\\r\\n        FB.logout(function (response) {\\r\\n            facebookUserId = '';\\r\\n            isLoggedIn = false;\\r\\n        });\\r\\n    }\\r\\n    else {\\r\\n        FB.login(function (response) {\\r\\n            facebookUserId = response.authResponse.userID;\\r\\n            isLoggedIn = true;\\r\\n        });\\r\\n    }\\r\\n}\\r\\nfunction isFacebookConnected() {\\r\\n    let isConnected = false;\\r\\n    FB.getLoginStatus(function (response) {\\r\\n        isConnected = (response.status === 'connected');\\r\\n    });\\r\\n    return isConnected;\\r\\n}\\r\\n</script>\\r\\n<Nav isLoggedIn={isLoggedIn} on:toggleLogIn={toggleLogIn}/>\\r\\n<div class='wrapper'>\\r\\n    <div><img src='PageLeftDecorator.png' alt='decoration' class='left pageDecorator'></div>\\r\\n<div class='content'>\\r\\n    <Jumbotron />\\r\\n    <Story />\\r\\n    <Clan />\\r\\n    <Toasts isLoggedIn={isLoggedIn} facebookUserId={facebookUserId} on:toggleLogIn={toggleLogIn}/>\\r\\n    <Blended />\\r\\n</div>\\r\\n<div><img src='PageRightDecorator.png' alt='decoration' class='right pageDecorator'></div>\\r\\n</div><style global lang='scss'>@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';\\n@import 'https://fonts.googleapis.com/css?family=Rokkitt';\\n:global(body) {\\n  background-color: #dfe1e0 !important;\\n  margin: 0;\\n  overflow: auto;\\n  height: 100%;\\n  line-height: 0 !important;\\n  font-family: 'Rokkit' !important; }\\n\\n:global(h1) {\\n  font-family: 'Princess Sofia'; }\\n\\n:global(section) {\\n  line-height: 100%;\\n  text-align: center; }\\n\\n:global(p), :global(a), :global(li) {\\n  font-family: 'Rokkitt'; }\\n\\n:global(html) {\\n  position: absolute;\\n  height: 100%;\\n  overflow: hidden; }\\n\\n@media only screen and (min-width: 320px) and (max-width: 450px) {\\n  :global(#sapper) {\\n    width: 100vw;\\n    height: 100vh; } }\\n\\n@media only screen and (min-width: 451) {\\n  :global(#sapper) {\\n    width: calc(100vw - 18px);\\n    height: 100vh; } }\\n\\n@media only screen and (min-width: 320px) and (max-width: 1100px) {\\n  :global(.pageDecorator) {\\n    position: fixed;\\n    pointer-events: none;\\n    width: 0%;\\n    height: 0%; }\\n  :global(.wrapper) {\\n    width: 100%;\\n    display: grid;\\n    grid-template-columns: 0% 100% 0%;\\n    margin-top: 65px;\\n    padding: 20px; } }\\n\\n@media only screen and (min-width: 1101px) {\\n  :global(.pageDecorator) {\\n    position: fixed;\\n    pointer-events: none; }\\n  :global(.left) {\\n    top: 65px;\\n    left: 0px; }\\n  :global(.right) {\\n    bottom: 0px;\\n    right: 18px; }\\n  :global(.wrapper) {\\n    width: 100%;\\n    display: grid;\\n    grid-template-columns: 25% 50% 25%;\\n    margin-top: 65px;\\n    padding: 20px 0 20px 0; } }</style>\"],\"names\":[],\"mappings\":\"AAuDgC,QAAQ,wDAAwD,CAAC,AACjG,QAAQ,iDAAiD,CAAC,AAClD,IAAI,AAAE,CAAC,AACb,gBAAgB,CAAE,OAAO,CAAC,UAAU,CACpC,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,IAAI,CACd,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,CAAC,CAAC,UAAU,CACzB,WAAW,CAAE,QAAQ,CAAC,UAAU,AAAE,CAAC,AAE7B,EAAE,AAAE,CAAC,AACX,WAAW,CAAE,gBAAgB,AAAE,CAAC,AAE1B,OAAO,AAAE,CAAC,AAChB,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AAAE,CAAC,AAEf,CAAC,AAAC,CAAU,CAAC,AAAC,CAAU,EAAE,AAAE,CAAC,AACnC,WAAW,CAAE,SAAS,AAAE,CAAC,AAEnB,IAAI,AAAE,CAAC,AACb,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,AAAE,CAAC,AAErB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACxD,OAAO,AAAE,CAAC,AAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAEtB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,GAAG,CAAC,AAAC,CAAC,AAC/B,OAAO,AAAE,CAAC,AAChB,KAAK,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,MAAM,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAEtB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACzD,cAAc,AAAE,CAAC,AACvB,QAAQ,CAAE,KAAK,CACf,cAAc,CAAE,IAAI,CACpB,KAAK,CAAE,EAAE,CACT,MAAM,CAAE,EAAE,AAAE,CAAC,AACP,QAAQ,AAAE,CAAC,AACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,EAAE,CAAC,IAAI,CAAC,EAAE,CACjC,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEtB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAClC,cAAc,AAAE,CAAC,AACvB,QAAQ,CAAE,KAAK,CACf,cAAc,CAAE,IAAI,AAAE,CAAC,AACjB,KAAK,AAAE,CAAC,AACd,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,AAAE,CAAC,AACN,MAAM,AAAE,CAAC,AACf,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,AAAE,CAAC,AACR,QAAQ,AAAE,CAAC,AACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,AAAE,CAAC,AAAC,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let isLoggedIn = false;
	let facebookUserId;

	onMount(() => {
		FB.init({
			appId: "778058433003434",
			cookie: true,
			xfbml: true,
			version: "v7.0"
		});

		FB.getLoginStatus(function (response) {
			isLoggedIn = response.status === "connected";
			facebookUserId = response.authResponse.userID;
		});
	});

	$$result.css.add(css$d);

	return `${validate_component(Nav, "Nav").$$render($$result, { isLoggedIn }, {}, {})}
<div class="${"wrapper"}"><div><img src="${"PageLeftDecorator.png"}" alt="${"decoration"}" class="${"left pageDecorator"}"></div>
<div class="${"content"}">${validate_component(Jumbotron, "Jumbotron").$$render($$result, {}, {}, {})}
    ${validate_component(Story, "Story").$$render($$result, {}, {}, {})}
    ${validate_component(Clan, "Clan").$$render($$result, {}, {}, {})}
    ${validate_component(Toasts, "Toasts").$$render($$result, { isLoggedIn, facebookUserId }, {}, {})}
    ${validate_component(Blended, "Blended").$$render($$result, {}, {}, {})}</div>
<div><img src="${"PageRightDecorator.png"}" alt="${"decoration"}" class="${"right pageDecorator"}"></div></div>`;
});

/* src\node_modules\@sapper\internal\layout.svelte generated by Svelte v3.23.2 */

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${$$slots.default ? $$slots.default({}) : ``}`;
});

/* src\node_modules\@sapper\internal\error.svelte generated by Svelte v3.23.2 */

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { error } = $$props;
	let { status } = $$props;
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);

	return `<h1>${escape(status)}</h1>

<p>${escape(error.message)}</p>

${ `<pre>${escape(error.stack)}</pre>`
	}`;
});

// This file is generated by Sapper — do not edit it!

const manifest = {
	server_routes: [
		{
			// api/toastController.ts
			pattern: /^\/api\/toastController\/?$/,
			handlers: route_0,
			params: () => ({})
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/dev";

const src_dir = "src";

const CONTEXT_KEY = {};

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.23.2 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch$1(url, opts) {

	// allow custom promise
	if (!fetch$1.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch$1.Promise;

	// wrap http.request into fetch
	return new fetch$1.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch$1.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch$1(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch$1.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch$1.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'))
		;

	const template =  () => read_template(src_dir)
		;

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  escape_html(err.message) ;

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'no-cache' );

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		let session;
		try {
			session = await session_getter(req, res);
		} catch (err) {
			return bail(req, res, err);
		}

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				opts = Object.assign({}, opts);

				const include_credentials = (
					opts.credentials === 'include' ||
					opts.credentials !== 'omit' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
				);

				if (include_credentials) {
					opts.headers = Object.assign({}, opts.headers);

					const cookies = Object.assign(
						{},
						cookie.parse(req.headers.cookie || ''),
						cookie.parse(opts.headers.cookie || '')
					);

					const set_cookie = res.getHeader('Set-Cookie');
					(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
						const match = /([^=]+)=([^;]+)/.exec(str);
						if (match) cookies[match[1]] = match[2];
					});

					const str = Object.keys(cookies)
						.map(key => `${key}=${cookies[key]}`)
						.join('; ');

					opts.headers.cookie = str;

					if (!opts.headers.authorization && req.headers.authorization) {
						opts.headers.authorization = req.headers.authorization;
					}
				}

				return fetch$1(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && serialize_error(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
	if (!error) return null;
	let serialized = try_serialize(error);
	if (!serialized) {
		const { name, message, stack } = error ;
		serialized = try_serialize({ name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}

function escape_html(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'no-cache' 
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const read =  (file) => fs.readFileSync(path.join(build_dir, file))
		;

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

/* FOR ELASTIC BEANSTALK DEPLOY

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
*/
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
    .use(compression({ threshold: 0 }), sirv('static', { dev }), middleware())
    .get('*', (req, res) => {
    res.end(`POLKA: Hello from ${req.pathname}`);
});
// Mount Polka to HTTPS server
createServer(options, handler).listen(ssl_port, _ => {
    console.log(`> Running on https://localhost:${ssl_port}`);
});
//# sourceMappingURL=server.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FwaS90b2FzdENvbnRyb2xsZXIudHMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19jb21wb25lbnRzL1N0b3J5LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2NvbXBvbmVudHMvQmxlbmRlZC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2llbWEvZGlzdC9zaWVtYS5taW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJleW9uay9zdmVsdGUtY2Fyb3VzZWwvc3JjL0Nhcm91c2VsLnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtZmVhdGhlci1pY29ucy9zcmMvaWNvbnMvQ2hldnJvbkxlZnRJY29uLnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtZmVhdGhlci1pY29ucy9zcmMvaWNvbnMvQ2hldnJvblJpZ2h0SWNvbi5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19jb21wb25lbnRzL0NsYW4uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fY29tcG9uZW50cy9Ub2FzdEZvcm0uc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zdG9yZS9pbmRleC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlLWNob3RhL2NtcC9Nb2RhbC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19jb21wb25lbnRzL1RvYXN0c0xpc3Quc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fY29tcG9uZW50cy9Ub2FzdHMuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fY29tcG9uZW50cy9NZW51SWNvbi5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19jb21wb25lbnRzL01lbnUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fY29tcG9uZW50cy9OYXYuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9pbmRleC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvZXJyb3Iuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LXNlcnZlci5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvc2hhcmVkLm1qcyIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9BcHAuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL3NlcnZlci5tanMiLCIuLi8uLi8uLi9zcmMvc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzcWwgPSByZXF1aXJlKFwibXNzcWxcIik7XHJcbmltcG9ydCB7IFRvYXN0TW9kZWwgfSBmcm9tICcuLi9fbW9kZWxzL1RvYXN0TW9kZWwnO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gICAgc2VydmVyICAgICA6IHByb2Nlc3MuZW52LlJEU19IT1NUTkFNRSxcclxuICAgIHVzZXIgICAgIDogcHJvY2Vzcy5lbnYuUkRTX1VTRVJOQU1FLFxyXG4gICAgcGFzc3dvcmQgOiBwcm9jZXNzLmVudi5SRFNfUEFTU1dPUkQsXHJcbiAgICBwb3J0ICAgICA6IHBhcnNlSW50KHByb2Nlc3MuZW52LlJEU19QT1JUKSxcclxuICAgIGRhdGFiYXNlOiAnVHVja2VyV2VkZGluZ1dlYnNpdGUnXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXQocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGxldCB0b2FzdHM6IFRvYXN0TW9kZWxbXTtcclxuICAgIFxyXG4gICAgc3FsLmNvbm5lY3QoY29uZmlnLCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICBpZiAoZXJyKSB7IHRocm93IGVycjsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IHNxbC5SZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5xdWVyeSgnc2VsZWN0ICogZnJvbSBUb2FzdCcsIGZ1bmN0aW9uKGVyciwgcmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgIGlmKGVycikgeyB0aHJvdyBlcnI7IH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvYXN0cyA9IHJlY29yZHNldC5yZWNvcmRzZXQ7XHJcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkodG9hc3RzKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9zdChyZXEsIHJlcyk6IFByb21pc2U8dm9pZD4geyBcclxuICAgIHNxbC5jb25uZWN0KGNvbmZpZywgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgaWYgKGVycikgeyB0aHJvdyBlcnI7IH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBzcWwuUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0ZXJOYW1lJywgc3FsLlZhckNoYXIoNTApLCByZXEuYm9keS50b2FzdC50b2FzdGVyTmFtZSk7XHJcbiAgICAgICAgcmVxdWVzdC5pbnB1dCgndG9hc3RlclJlbGF0aW9uc2hpcCcsIHNxbC5WYXJDaGFyKDE1KSwgcmVxLmJvZHkudG9hc3QudG9hc3RlclJlbGF0aW9uc2hpcCk7XHJcbiAgICAgICAgcmVxdWVzdC5pbnB1dCgndG9hc3RlckFzc29jaWF0aW9uJywgc3FsLlZhckNoYXIoNSksIHJlcS5ib2R5LnRvYXN0LnRvYXN0ZXJBc3NvY2lhdGlvbik7XHJcbiAgICAgICAgcmVxdWVzdC5pbnB1dCgndG9hc3RDb250ZW50Jywgc3FsLlZhckNoYXIoc3FsLk1BWCksIHJlcS5ib2R5LnRvYXN0LnRvYXN0Q29udGVudCk7XHJcbiAgICAgICAgcmVxdWVzdC5pbnB1dCgndG9hc3RlckZhY2Vib29rSWQnLCBzcWwuVmFyQ2hhcig1MCksIHJlcS5ib2R5LnRvYXN0LnRvYXN0ZXJGYWNlYm9va0lkKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5xdWVyeShcImluc2VydCBpbnRvIFRvYXN0ICh0b2FzdGVyTmFtZSwgdG9hc3RlclJlbGF0aW9uc2hpcCwgdG9hc3RlckFzc29jaWF0aW9uLCB0b2FzdENvbnRlbnQsIHRvYXN0ZXJGYWNlYm9va0lkKSBWQUxVRVMgKEB0b2FzdGVyTmFtZSwgQHRvYXN0ZXJSZWxhdGlvbnNoaXAsIEB0b2FzdGVyQXNzb2NpYXRpb24sIEB0b2FzdENvbnRlbnQsIEB0b2FzdGVyZmFjZWJvb2tJZCk7XCIsIGZ1bmN0aW9uKGVyciwgcmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgIGlmKGVycikgeyB0aHJvdyBlcnI7IH1cclxuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShyZWNvcmRzZXQpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXQocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHNxbC5jb25uZWN0KGNvbmZpZywgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgaWYoZXJyKSB7IHRocm93IGVycjsgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBzcWwuUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0SWQnLCBzcWwuSW50LCByZXEuYm9keS50b2FzdC50b2FzdElkKTtcclxuICAgICAgICByZXF1ZXN0LmlucHV0KCd0b2FzdGVyTmFtZScsIHNxbC5WYXJDaGFyKDUwKSwgcmVxLmJvZHkudG9hc3QudG9hc3Rlck5hbWUpO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0ZXJSZWxhdGlvbnNoaXAnLCBzcWwuVmFyQ2hhcigxNSksIHJlcS5ib2R5LnRvYXN0LnRvYXN0ZXJSZWxhdGlvbnNoaXApO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0ZXJBc3NvY2lhdGlvbicsIHNxbC5WYXJDaGFyKDUpLCByZXEuYm9keS50b2FzdC50b2FzdGVyQXNzb2NpYXRpb24pO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0Q29udGVudCcsIHNxbC5WYXJDaGFyKHNxbC5NQVgpLCByZXEuYm9keS50b2FzdC50b2FzdENvbnRlbnQpO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0ZXJGYWNlYm9va0lkJywgc3FsLlZhckNoYXIoNTApLCByZXEuYm9keS50b2FzdC50b2FzdGVyRmFjZWJvb2tJZCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3QucXVlcnkoXCJ1cGRhdGUgVG9hc3Qgc2V0IHRvYXN0ZXJOYW1lID0gQHRvYXN0ZXJOYW1lLCB0b2FzdGVyUmVsYXRpb25zaGlwID0gQHRvYXN0ZXJSZWxhdGlvbnNoaXAsIHRvYXN0ZXJBc3NvY2lhdGlvbiA9IEB0b2FzdGVyQXNzb2NpYXRpb24sIHRvYXN0Q29udGVudCA9IEB0b2FzdENvbnRlbnQsIHRvYXN0ZXJGYWNlYm9va0lkID0gQHRvYXN0ZXJGYWNlYm9va0lkIHdoZXJlIHRvYXN0SWQgPSBAdG9hc3RJZDtcIiwgZnVuY3Rpb24oZXJyLCByZWNvcmRzZXQpIHtcclxuICAgICAgICAgICAgaWYgKGVycikgeyB0aHJvdyBlcnI7IH1cclxuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShyZWNvcmRzZXQpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWwocmVxLCByZXMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHNxbC5jb25uZWN0KGNvbmZpZywgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgaWYoZXJyKSB7IHRocm93IGVycjsgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBzcWwuUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3QuaW5wdXQoJ3RvYXN0SWQnLCBzcWwuSW50LCByZXEuYm9keS50b2FzdElkKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5xdWVyeShcImRlbGV0ZSBmcm9tIFRvYXN0IHdoZXJlIHRvYXN0SWQgPSBAdG9hc3RJZDtcIiwgZnVuY3Rpb24gKGVyciwgcmVjb3Jkc2V0KSB7XHJcbiAgICAgICAgICAgIGlmKGVycikgeyB0aHJvdyBlcnI7IH1cclxuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShyZWNvcmRzZXQpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdChzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4sIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBjb25zdCBzbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzKHNsb3RfZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4pO1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUgPSByZXQpIHtcbiAgICBzdG9yZS5zZXQodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59XG5jb25zdCBoYXNfcHJvcCA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuZnVuY3Rpb24gYWN0aW9uX2Rlc3Ryb3llcihhY3Rpb25fcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xubGV0IG5vdyA9IGlzX2NsaWVudFxuICAgID8gKCkgPT4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgOiAoKSA9PiBEYXRlLm5vdygpO1xubGV0IHJhZiA9IGlzX2NsaWVudCA/IGNiID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYikgOiBub29wO1xuLy8gdXNlZCBpbnRlcm5hbGx5IGZvciB0ZXN0aW5nXG5mdW5jdGlvbiBzZXRfbm93KGZuKSB7XG4gICAgbm93ID0gZm47XG59XG5mdW5jdGlvbiBzZXRfcmFmKGZuKSB7XG4gICAgcmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKG5vdykge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFzay5jKG5vdykpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2suZigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhc2tzLnNpemUgIT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xufVxuLyoqXG4gKiBGb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5IVxuICovXG5mdW5jdGlvbiBjbGVhcl9sb29wcygpIHtcbiAgICB0YXNrcy5jbGVhcigpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHRhc2sgdGhhdCBydW5zIG9uIGVhY2ggcmFmIGZyYW1lXG4gKiB1bnRpbCBpdCByZXR1cm5zIGEgZmFsc3kgdmFsdWUgb3IgaXMgYWJvcnRlZFxuICovXG5mdW5jdGlvbiBsb29wKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRhc2s7XG4gICAgaWYgKHRhc2tzLnNpemUgPT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgICAgICAgICAgdGFza3MuYWRkKHRhc2sgPSB7IGM6IGNhbGxiYWNrLCBmOiBmdWxmaWxsIH0pO1xuICAgICAgICB9KSxcbiAgICAgICAgYWJvcnQoKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnNbaV0pXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lLCB7IGlzIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNfcHJvcChvYmosIGspXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAmJiBleGNsdWRlLmluZGV4T2YoaykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN2Z19lbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuZnVuY3Rpb24gdGV4dChkYXRhKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xufVxuZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRleHQoJyAnKTtcbn1cbmZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHJldHVybiB0ZXh0KCcnKTtcbn1cbmZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNlbGYoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpICE9PSB2YWx1ZSlcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobm9kZS5fX3Byb3RvX18pO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3JzW2tleV0gJiYgZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIGlmICghY2hlY2tlZCkge1xuICAgICAgICB2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyB1bmRlZmluZWQgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqKytdO1xuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVtb3ZlLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmVtb3ZlW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN2ZyA/IHN2Z19lbGVtZW50KG5hbWUpIDogZWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9ICcnICsgZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQoZGF0YSk7XG59XG5mdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQuZGF0YSAhPT0gZGF0YSlcbiAgICAgICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF92YWx1ZShpbnB1dCwgdmFsdWUpIHtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5sZXQgY3Jvc3NvcmlnaW47XG5mdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcbiAgICBpZiAoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcm9zc29yaWdpbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjcm9zc29yaWdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihub2RlLCBmbikge1xuICAgIGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCB6X2luZGV4ID0gKHBhcnNlSW50KGNvbXB1dGVkX3N0eWxlLnpJbmRleCkgfHwgMCkgLSAxO1xuICAgIGlmIChjb21wdXRlZF9zdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuICAgIGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgYCArXG4gICAgICAgIGBvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDA7IG9wYWNpdHk6IDA7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAke3pfaW5kZXh9O2ApO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZnJhbWUudGFiSW5kZXggPSAtMTtcbiAgICBjb25zdCBjcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luKCk7XG4gICAgbGV0IHVuc3Vic2NyaWJlO1xuICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICBpZnJhbWUuc3JjID0gYGRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PmA7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKHdpbmRvdywgJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGlmcmFtZS5jb250ZW50V2luZG93KVxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGlmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3RlbihpZnJhbWUuY29udGVudFdpbmRvdywgJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXBwZW5kKG5vZGUsIGlmcmFtZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVuc3Vic2NyaWJlICYmIGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRldGFjaChpZnJhbWUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHF1ZXJ5X3NlbGVjdG9yX2FsbChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5jbGFzcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYSA9IGFuY2hvcjtcbiAgICAgICAgdGhpcy5lID0gdGhpcy5uID0gbnVsbDtcbiAgICB9XG4gICAgbShodG1sLCB0YXJnZXQsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmUpIHtcbiAgICAgICAgICAgIHRoaXMuZSA9IGVsZW1lbnQodGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudCA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmkoYW5jaG9yKTtcbiAgICB9XG4gICAgaChodG1sKSB7XG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLm4gPSBBcnJheS5mcm9tKHRoaXMuZS5jaGlsZE5vZGVzKTtcbiAgICB9XG4gICAgaShhbmNob3IpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluc2VydCh0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwKGh0bWwpIHtcbiAgICAgICAgdGhpcy5kKCk7XG4gICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgdGhpcy5pKHRoaXMuYSk7XG4gICAgfVxuICAgIGQoKSB7XG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XG4gICAgfVxufVxuXG5jb25zdCBhY3RpdmVfZG9jcyA9IG5ldyBTZXQoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9ydWxlKG5vZGUsIGEsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzZSwgZm4sIHVpZCA9IDApIHtcbiAgICBjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XG4gICAgbGV0IGtleWZyYW1lcyA9ICd7XFxuJztcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8PSAxOyBwICs9IHN0ZXApIHtcbiAgICAgICAgY29uc3QgdCA9IGEgKyAoYiAtIGEpICogZWFzZShwKTtcbiAgICAgICAga2V5ZnJhbWVzICs9IHAgKiAxMDAgKyBgJXske2ZuKHQsIDEgLSB0KX19XFxuYDtcbiAgICB9XG4gICAgY29uc3QgcnVsZSA9IGtleWZyYW1lcyArIGAxMDAlIHske2ZuKGIsIDEgLSBiKX19XFxufWA7XG4gICAgY29uc3QgbmFtZSA9IGBfX3N2ZWx0ZV8ke2hhc2gocnVsZSl9XyR7dWlkfWA7XG4gICAgY29uc3QgZG9jID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIGFjdGl2ZV9kb2NzLmFkZChkb2MpO1xuICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2MuX19zdmVsdGVfc3R5bGVzaGVldCB8fCAoZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgPSBkb2MuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KCdzdHlsZScpKS5zaGVldCk7XG4gICAgY29uc3QgY3VycmVudF9ydWxlcyA9IGRvYy5fX3N2ZWx0ZV9ydWxlcyB8fCAoZG9jLl9fc3ZlbHRlX3J1bGVzID0ge30pO1xuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xuICAgICAgICBjdXJyZW50X3J1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogYGB9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBhY3RpdmVfZG9jcy5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQ7XG4gICAgICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgICAgICBkb2MuX19zdmVsdGVfcnVsZXMgPSB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZV9kb2NzLmNsZWFyKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9hbmltYXRpb24obm9kZSwgZnJvbSwgZm4sIHBhcmFtcykge1xuICAgIGlmICghZnJvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86IHNob3VsZCB0aGlzIGJlIHNlcGFyYXRlZCBmcm9tIGRlc3RydWN0dXJpbmc/IE9yIHN0YXJ0L2VuZCBhZGRlZCB0byBwdWJsaWMgYXBpIGFuZCBkb2N1bWVudGF0aW9uP1xuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudF9jb21wb25lbnQ7XG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb25gKTtcbiAgICByZXR1cm4gY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LnNldChrZXksIGNvbnRleHQpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cbi8vIFRPRE8gZmlndXJlIG91dCBpZiB3ZSBzdGlsbCB3YW50IHRvIHN1cHBvcnRcbi8vIHNob3J0aGFuZCBldmVudHMsIG9yIGlmIHdlIHdhbnQgdG8gaW1wbGVtZW50XG4vLyBhIHJlYWwgYnViYmxpbmcgbWVjaGFuaXNtXG5mdW5jdGlvbiBidWJibGUoY29tcG9uZW50LCBldmVudCkge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbZXZlbnQudHlwZV07XG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuKGV2ZW50KSk7XG4gICAgfVxufVxuXG5jb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG5jb25zdCBpbnRyb3MgPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVuZGVyX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xuICAgICAgICB1cGRhdGVfc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgIHJldHVybiByZXNvbHZlZF9wcm9taXNlO1xufVxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xuICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcbiAgICBmbHVzaF9jYWxsYmFja3MucHVzaChmbik7XG59XG5sZXQgZmx1c2hpbmcgPSBmYWxzZTtcbmNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgaWYgKGZsdXNoaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIGRvIHtcbiAgICAgICAgLy8gZmlyc3QsIGNhbGwgYmVmb3JlVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgICAvLyBhbmQgdXBkYXRlIGNvbXBvbmVudHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LiQkKTtcbiAgICAgICAgfVxuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIHNlZW5fY2FsbGJhY2tzLmNsZWFyKCk7XG59XG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgJCQudXBkYXRlKCk7XG4gICAgICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gJCQuZGlydHk7XG4gICAgICAgICQkLmRpcnR5ID0gWy0xXTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQucCgkJC5jdHgsIGRpcnR5KTtcbiAgICAgICAgJCQuYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG4gICAgfVxufVxuXG5sZXQgcHJvbWlzZTtcbmZ1bmN0aW9uIHdhaXQoKSB7XG4gICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBkaXNwYXRjaChub2RlLCBkaXJlY3Rpb24sIGtpbmQpIHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KGAke2RpcmVjdGlvbiA/ICdpbnRybycgOiAnb3V0cm8nfSR7a2luZH1gKSk7XG59XG5jb25zdCBvdXRyb2luZyA9IG5ldyBTZXQoKTtcbmxldCBvdXRyb3M7XG5mdW5jdGlvbiBncm91cF9vdXRyb3MoKSB7XG4gICAgb3V0cm9zID0ge1xuICAgICAgICByOiAwLFxuICAgICAgICBjOiBbXSxcbiAgICAgICAgcDogb3V0cm9zIC8vIHBhcmVudCBncm91cFxuICAgIH07XG59XG5mdW5jdGlvbiBjaGVja19vdXRyb3MoKSB7XG4gICAgaWYgKCFvdXRyb3Mucikge1xuICAgICAgICBydW5fYWxsKG91dHJvcy5jKTtcbiAgICB9XG4gICAgb3V0cm9zID0gb3V0cm9zLnA7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX2luKGJsb2NrLCBsb2NhbCkge1xuICAgIGlmIChibG9jayAmJiBibG9jay5pKSB7XG4gICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgIGJsb2NrLmkobG9jYWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25fb3V0KGJsb2NrLCBsb2NhbCwgZGV0YWNoLCBjYWxsYmFjaykge1xuICAgIGlmIChibG9jayAmJiBibG9jay5vKSB7XG4gICAgICAgIGlmIChvdXRyb2luZy5oYXMoYmxvY2spKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvdXRyb2luZy5hZGQoYmxvY2spO1xuICAgICAgICBvdXRyb3MuYy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoZGV0YWNoKVxuICAgICAgICAgICAgICAgICAgICBibG9jay5kKDEpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBibG9jay5vKGxvY2FsKTtcbiAgICB9XG59XG5jb25zdCBudWxsX3RyYW5zaXRpb24gPSB7IGR1cmF0aW9uOiAwIH07XG5mdW5jdGlvbiBjcmVhdGVfaW5fdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHVpZCA9IDA7XG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcywgdWlkKyspO1xuICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gcHJvZ3JhbS5iIC0gdDtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBpbnRybywgYW5kIHRoZXJlJ3MgYSBkZWxheSwgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiKVxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHByb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgYiwgJ3N0YXJ0JykpO1xuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nX3Byb2dyYW0gJiYgbm93ID4gcGVuZGluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocGVuZGluZ19wcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIHJ1bm5pbmdfcHJvZ3JhbS5iLCBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24sIDAsIGVhc2luZywgY29uZmlnLmNzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbS5iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludHJvIOKAlCB3ZSBjYW4gdGlkeSB1cCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIOKAlCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcnVubmluZ19wcm9ncmFtLmdyb3VwLnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKHJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBydW5uaW5nX3Byb2dyYW0uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIShydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bihiKSB7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3Byb21pc2UocHJvbWlzZSwgaW5mbykge1xuICAgIGNvbnN0IHRva2VuID0gaW5mby50b2tlbiA9IHt9O1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGNoaWxkX2N0eCA9IGluZm8uY3R4O1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkX2N0eCA9IGNoaWxkX2N0eC5zbGljZSgpO1xuICAgICAgICAgICAgY2hpbGRfY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBuZWVkc19mbHVzaCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xuICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cF9vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5ibG9ja3NbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9jay5kKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgICAgICBibG9jay5tKGluZm8ubW91bnQoKSwgaW5mby5hbmNob3IpO1xuICAgICAgICAgICAgbmVlZHNfZmx1c2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGlmIChuZWVkc19mbHVzaCkge1xuICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgICAgICBwcm9taXNlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLmNhdGNoLCAyLCBpbmZvLmVycm9yLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiB3ZSBwcmV2aW91c2x5IGhhZCBhIHRoZW4vY2F0Y2ggYmxvY2ssIGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHByb21pc2U7XG4gICAgfVxufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2hgKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncywgY2xhc3Nlc190b19hZGQpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XG4gICAgaWYgKGNsYXNzZXNfdG9fYWRkKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RyICs9IGAgJHtuYW1lfT1cIiR7U3RyaW5nKHZhbHVlKS5yZXBsYWNlKC9cIi9nLCAnJiMzNDsnKS5yZXBsYWNlKC8nL2csICcmIzM5OycpfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBlc2NhcGVkID0ge1xuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7J1xufTtcbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC9bXCInJjw+XS9nLCBtYXRjaCA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5mdW5jdGlvbiBlYWNoKGl0ZW1zLCBmbikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBmbihpdGVtc1tpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBtaXNzaW5nX2NvbXBvbmVudCA9IHtcbiAgICAkJHJlbmRlcjogKCkgPT4gJydcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZV9jb21wb25lbnQoY29tcG9uZW50LCBuYW1lKSB7XG4gICAgaWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ3N2ZWx0ZTpjb21wb25lbnQnKVxuICAgICAgICAgICAgbmFtZSArPSAnIHRoaXM9ey4uLn0nO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBkZWJ1ZyhmaWxlLCBsaW5lLCBjb2x1bW4sIHZhbHVlcykge1xuICAgIGNvbnNvbGUubG9nKGB7QGRlYnVnfSAke2ZpbGUgPyBmaWxlICsgJyAnIDogJyd9KCR7bGluZX06JHtjb2x1bW59KWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICByZXR1cm4gJyc7XG59XG5sZXQgb25fZGVzdHJveTtcbmZ1bmN0aW9uIGNyZWF0ZV9zc3JfY29tcG9uZW50KGZuKSB7XG4gICAgZnVuY3Rpb24gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICAgICAgY29uc3QgJCQgPSB7XG4gICAgICAgICAgICBvbl9kZXN0cm95LFxuICAgICAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgPyAnJyA6IGA9JHt0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkoZXNjYXBlKHZhbHVlKSkgOiBgXCIke3ZhbHVlfVwiYH1gfWA7XG59XG5mdW5jdGlvbiBhZGRfY2xhc3NlcyhjbGFzc2VzKSB7XG4gICAgcmV0dXJuIGNsYXNzZXMgPyBgIGNsYXNzPVwiJHtjbGFzc2VzfVwiYCA6IGBgO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG4gICAgYmxvY2sgJiYgYmxvY2suYygpO1xufVxuZnVuY3Rpb24gY2xhaW1fY29tcG9uZW50KGJsb2NrLCBwYXJlbnRfbm9kZXMpIHtcbiAgICBibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvcikge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICAvLyBvbk1vdW50IGhhcHBlbnMgYmVmb3JlIHRoZSBpbml0aWFsIGFmdGVyVXBkYXRlXG4gICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgaWYgKG9uX2Rlc3Ryb3kpIHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgIHJ1bl9hbGwobmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgIH0pO1xuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgcnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgJCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgJCQuY3R4ID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuICAgIH1cbiAgICBjb21wb25lbnQuJCQuZGlydHlbKGkgLyAzMSkgfCAwXSB8PSAoMSA8PCAoaSAlIDMxKSk7XG59XG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wcywgZGlydHkgPSBbLTFdKSB7XG4gICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0IHByb3BfdmFsdWVzID0gb3B0aW9ucy5wcm9wcyB8fCB7fTtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJCA9IHtcbiAgICAgICAgZnJhZ21lbnQ6IG51bGwsXG4gICAgICAgIGN0eDogbnVsbCxcbiAgICAgICAgLy8gc3RhdGVcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIHVwZGF0ZTogbm9vcCxcbiAgICAgICAgbm90X2VxdWFsLFxuICAgICAgICBib3VuZDogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIC8vIGxpZmVjeWNsZVxuICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgIG9uX2Rlc3Ryb3k6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHlcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICgkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCkge1xuICAgICAgICAgICAgLy8gb3ZlcnJpZGRlbiBieSBpbnN0YW5jZSwgaWYgaXQgaGFzIHByb3BzXG4gICAgICAgIH1cbiAgICB9O1xufVxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgIH1cbiAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJHNldCgpIHtcbiAgICAgICAgLy8gb3ZlcnJpZGRlbiBieSBpbnN0YW5jZSwgaWYgaXQgaGFzIHByb3BzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjIzLjInIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NSW5zZXJ0XCIsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUluc2VydFwiLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBkZXRhY2hfZGV2KG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVcIiwgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gW1wiY2FwdHVyZVwiXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01BZGRFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlQXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0QXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHByb3BfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0UHJvcGVydHlcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YXNldFwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC5kYXRhID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YVwiLCB7IG5vZGU6IHRleHQsIGRhdGEgfSk7XG4gICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQoYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnICYmICEoYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFyZykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICd7I2VhY2h9IG9ubHkgaXRlcmF0ZXMgb3ZlciBhcnJheS1saWtlIG9iamVjdHMuJztcbiAgICAgICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgYXJnICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcmcpIHtcbiAgICAgICAgICAgIG1zZyArPSAnIFlvdSBjYW4gdXNlIGEgc3ByZWFkIHRvIGNvbnZlcnQgdGhpcyBpdGVyYWJsZSBpbnRvIGFuIGFycmF5Lic7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfc2xvdHMobmFtZSwgc2xvdCwga2V5cykge1xuICAgIGZvciAoY29uc3Qgc2xvdF9rZXkgb2YgT2JqZWN0LmtleXMoc2xvdCkpIHtcbiAgICAgICAgaWYgKCF+a2V5cy5pbmRleE9mKHNsb3Rfa2V5KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGA8JHtuYW1lfT4gcmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBzbG90IFwiJHtzbG90X2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25gKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZGApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJGNhcHR1cmVfc3RhdGUoKSB7IH1cbiAgICAkaW5qZWN0X3N0YXRlKCkgeyB9XG59XG5mdW5jdGlvbiBsb29wX2d1YXJkKHRpbWVvdXQpIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydCA+IHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5maW5pdGUgbG9vcCBkZXRlY3RlZGApO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2NvbXBvbmVudCwgY2xhaW1fZWxlbWVudCwgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZXNjYXBlLCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldENvbnRleHQsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHQsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbG9vcF9ndWFyZCwgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHF1ZXJ5X3NlbGVjdG9yX2FsbCwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9rZXllZF9lYWNoLCB1cGRhdGVfc2xvdCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50LCB2YWxpZGF0ZV9lYWNoX2tleXMsIHZhbGlkYXRlX3Nsb3RzLCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz5cclxuICAgIGltcG9ydCBIZWFkaW5nRGVjb3JhdG9yIGZyb20gJy4vSGVhZGluZ0RlY29yYXRvci5zdmVsdGUnO1xyXG4gICAgZXhwb3J0IGxldCB0aXRsZTogc3RyaW5nO1xyXG48L3NjcmlwdD5cclxuXHJcbjxkaXYgY2xhc3M9J1NlY3Rpb25IZWFkZXJPdXR0ZXJXcmFwcGVyJz5cclxuICAgIDxoMT57dGl0bGV9PC9oMT5cclxuICAgIDxIZWFkaW5nRGVjb3JhdG9yIC8+XHJcbjwvZGl2PlxyXG5cclxuPHN0eWxlIGxhbmc9J3Njc3MnPlxyXG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3RhdGljL3RoZW1lLnNjc3MnO1xyXG4gICAgZGl2IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWNjZW50LWNvbG9yLWdyZWVuO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgfSAgXHJcbiAgICBcclxuICAgIGgxIHtcclxuICAgICAgICBjb2xvcjogJGFjY2VudC1jb2xvci1jcmVhbTtcclxuICAgICAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxuICAgICAgICBwYWRkaW5nLXRvcDogMTJweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBcclxuICAgIGFuZCAobWluLXdpZHRoIDogMHB4KSBcclxuICAgIGFuZCAobWF4LXdpZHRoIDogNDUwcHgpIHsgICBcclxuICAgICAgICBoMSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzJweDtcclxuICAgICAgICAgICAgcGFkZGluZy10b3A6IDEycHggIWltcG9ydGFudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuXHJcbiAgICBhbmQgKG1pbi13aWR0aCA6IDQ1MXB4KSB7XHJcbiAgICAgICAgaDEge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDcwcHggIWltcG9ydGFudDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDcwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3N0eWxlPiIsIjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICcuL1NlY3Rpb25IZWFkZXIuc3ZlbHRlJztcclxuPC9zY3JpcHQ+XHJcblxyXG48c2VjdGlvbiBjbGFzcz0nc3RvcnknPlxyXG4gICAgPFNlY3Rpb25IZWFkZXIgdGl0bGU9eydPdXIgU3RvcnknfS8+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxwPjxzcGFuPk9uY2UgdXBvbiBhIHRpbWUuLi48L3NwYW4+IHRoZXJlIHdhcyBhIGtpbmcgYW5kIGEgdmlraW5nIHByaW5jZXNzLiBUaGV5IGRpZCBub3Qga25vdyBpdCwgYnV0IHRoZSBnb2RzIGhhZCBzZXQgdGhlIHRhYmxlIGZvciB0aGVtIHRvIGJlIHRvZ2V0aGVyLjwvcD5cclxuICAgICAgICA8cD5BcyB0aGUgZ29kcyBwbGFubmVkIG91dCB0aGVpciBkZXN0aW55LCB0aGV5IGNvdWxkbid0IHF1aXRlIGFncmVlIG9uIHRoZSBwYXRoIHRoZXNlIHR3byBzaG91bGQgdGFrZSB0byBnZXQgdGhlcmUuIE9uZSBvZiB0aGUgZ29kcyBzZXQgdXAgdGhlaXIgZmlyc3QgbWVldGluZy4gQXMgdGhleSB3ZXJlIGJvdGggbG9va2luZyB0byBsZWFybiBtb3JlIGFib3V0IHRoZSB3b3JsZCBhcm91bmQgdGhlbSwgdGhleSBhdHRlbmRlZCB0aGUgQWNhZGVteSBhdCB0aGUgc2FtZSB0aW1lLiBUaGUgZmlyc3QgZ29kIHNldCBpdCB1cCBzbyB0aGF0IHRoZXkgbGl2ZWQgaW4gY2xvc2UgcHJveGltaXR5LiBPbmNlIHRoZSBvdGhlciBnb2RzIG5vdGljZWQsIHRoZXkgaW50ZXJ2ZW5lZCBhbmQga2VwdCB0aGVtIGZyb20gbWVldGluZyBlYWNoIG90aGVyLiBJdCB3YXMgbm90IHRoZWlyIHRpbWUgeWV0LjwvcD5cclxuICAgICAgICA8cD5Cb3RoIHRoZSBraW5nIGFuZCB0aGUgdmlraW5nIHByaW5jZXNzIHdlbnQgb24gdG8gaGF2ZSBmYW1pbGllcyBvZiB0aGVpciBvd24uIEFub3RoZXIgb25lIG9mIHRoZSBnb2RzIHRob3VnaHQgdGhhdCB0aGlzIHdhcyB0aGUgdGltZSBhbmQgbW92ZWQgdGhlbSB0byB0aGUgc2FtZSB0b3duLiBCb3RoIG9mIHRoZWlyIGZhbWlsaWVzIGdyZXcgdXAgYXQgdGhlIHNhbWUgdGltZS4gVGhlIGtpbmcgaGFkIHR3byBkYXVnaHRlcnMgYW5kIHRoZSB2aWtpbmcgcHJpbmNlc3MgaGFkIHR3byBzb25zIGFuZCB0d28gZGF1Z2h0ZXJzLiBUaGUga2lkcyBncmV3IHVwIHdpdGggZWFjaCBvdGhlciBhbmQgYmVjYW1lIGZyaWVuZHMuIFRoZSBlbGRlc3QgdmlraW5nIHNvbiBhbmQgdGhlIGVsZGVzdCBwcmluY2VzcyBvZiB0aGUga2luZyBib3RoIHB1cnN1ZWQgdGhlIGJhcmRpYyBhcnRzIHRvZ2V0aGVyLiBUaGUgeW91bmdlc3QgdmlraW5nIGRhdWdodGVyIGFuZCB0aGUgeW91bmdlc3QgcHJpbmNlc3Mgb2YgdGhlIGtpbmcgYmF0dGxlZCBmb3IgdGhlIHJhaWRlcnMgdGhyb3VnaCB2b2xsZXkgYWZ0ZXIgdm9sbGV5IG9mIGJhbGxzIGZsdW5nIGJ5IHRoZSBpbnZhZGluZyBhcm1pZXMuIFRocm91Z2ggYWxsIG9mIHRoaXMgdGhlIG90aGVyIGdvZHMgZGVjaWRlZCBpdCB3YXMgbm90IHRpbWUgZm9yIHRoZSBraW5nIGFuZCB0aGUgdmlraW5nIHByaW5jZXNzIHRvIG1lZXQsIGFuZCBrZXB0IHRoZW0gYXBhcnQuIEl0IHdhcyBub3QgdGhlaXIgdGltZSB5ZXQuPC9wPlxyXG4gICAgICAgIDxwPkEgdGhpcmQgZ29kIGRlY2lkZWQgdG8gbWFrZSBoaXMgbW92ZSBhbmQgYXJyYW5nZWQgaXQgc28gdGhlIHZpa2luZyBwcmluY2VzcyBqb2luZWQgdGhlIFBhcmVudCBUZWFjaGVyIFN0dWRlbnQgR3VpbGQgYWxvbmcgd2l0aCB0aGUgUXVlZW4uIEJvdGggd2VyZSB2YWxpYW50IGNoYW1waW9ucyBpbiBtYWtpbmcgc3VyZSB0aGUgY2hpbGRyZW4gb2YgdGhlIGtpbmdkb20gd2VyZSBnZXR0aW5nIHRoZSBhcHByb3ByaWF0ZSBlZHVjYXRpb24uIFRocm91Z2hvdXQgdGhlaXIgbWFueSBtZWV0aW5ncyBhbmQgcHVibGljIGV2ZW50cywgdGhlIG90aGVyIGdvZHMgZGVjaWRlZCB0byBpbnRlcnZlbmUgYW5kIG5vdCBhbGxvdyB0aGUga2luZyBhbmQgdmlraW5nIHByaW5jZXNzIHRvIGNyb3NzIHBhdGhzLiBJdCB3YXMgbm90IHRoZWlyIHRpbWUgeWV0LjwvcD5cclxuICAgICAgICA8cD5UaGUgdmlraW5nIHByaW5jZXNzIHB1cnN1ZWQgaGVyIGFkdmFuY2VtZW50IGluIHRoZSBQYXJlbnQgVGVhY2hlciBTdHVkZW50IEd1aWxkIHdpdGggZmVydm9yIGFuZCBldmVudHVhbGx5IHJlYWNoZWQgdGhlIHJhbmsgb2YgVGVhY2hlciBvZiBUaGUgTmF0aXZlIFRvbmd1ZS4gQSBmb3VydGggZ29kIGRlY2lkZWQgdGhpcyB3b3VsZCBiZSB0aGUgcGVyZmVjdCB0aW1lIHRvIGludHJvZHVjZSB0aGUga2luZyBhbmQgdGhlIHZpa2luZyBwcmluY2Vzcy4gVGhpcyBnb2QgYXJyYW5nZWQgZm9yIHRoZSBraW5nJ3MgeW91bmdlc3QgcHJpbmNlc3MgdG8gYmVjb21lIGFuIGFwcHJlbnRpY2Ugb2YgdGhlIHZpa2luZyBwcmluY2Vzcy4gQWxhcywgdGhlIG90aGVyIGdvZHMgaW50ZXJ2ZW5lZCB5ZXQgYWdhaW4gYW5kIGRpZCBub3QgbGV0IHRoZWlyIHBhdGhzIGNyb3NzLiBJdCB3YXMgbm90IHRoZWlyIHRpbWUgeWV0LjwvcD5cclxuICAgICAgICA8cD5MaXZpbmcgd2l0aGluIHRoZSBzYW1lIGtpbmdkb20sIHRoZXkgd2VyZSBvZnRlbiBpbiB0aGUgbWFya2V0IGF0IHRoZSBzYW1lIHRpbWUuIE5laXRoZXIgdGFraW5nIG5vdGljZSBvZiBlYWNoIG90aGVyLiBUaGUgZ29kcyBoYWQgYWdhaW4gZGVjaWRlZCB0byBrZWVwIHRoZW0gYXdheSBmcm9tIGVhY2ggb3RoZXIuIEl0IHdhcyBub3QgdGhlaXIgdGltZSB5ZXQuPC9wPlxyXG4gICAgICAgIDxwPkJ5IHRoaXMgcG9pbnQgaW4gdGltZSwgYm90aCBoYWQgbW92ZWQgb24gZnJvbSB0aGVpciBwcmV2aW91cyByZWxhdGlvbnNoaXBzLiBXaGlsZSB0aGVyZSB3ZXJlIHRpbWVzIHdoZXJlIHRoZXkgd2VyZSBoYXBweSwgdGhleSBrbmV3IGRlZXAgZG93biB0aGF0IHNvbWV0aGluZyB3YXMgbWlzc2luZy4gVGhlaXIgc29ucyBhbmQgZGF1Z2h0ZXJzIGhhZCBncm93biB1cCBhbmQgaGFkIGZhbWlsaWVzIG9mIHRoZWlyIG93bi4gVGhlIGdvZHMgZmluYWxseSBkZWNpZGVkIGl0IHdhcyB0aW1lLjwvcD5cclxuICAgICAgICA8cD5PbmUgZmF0ZWZ1bCBkYXksIHRoZXkgYWxpZ25lZCB0aGUgc3RhcnMgdG8gYWxsb3cgdGhlbSB0byBtZWV0LiBUaGUga2luZyB3YXMgZGlzY3Vzc2luZyBsaWZlIHdpdGggYSBub2JsZSBmcmllbmQgb2YgaGlzIGluIHRoZSBtYXJrZXQgd2hlbiB0aGUgdmlraW5nIHByaW5jZXNzIGVudGVyZWQuIFRoZWlyIHBhdGhzIHdvdWxkIGhhdmUgY3Jvc3NlZCB5ZXQgYWdhaW4gd2l0aG91dCBpbnRlcmFjdGlvbiwgYnV0IHRoZSBnb2RzIGhhZCBjYXJlZnVsbHkgbGFpZCBvdXQgdGhpcyBtb21lbnQuIFRoZSBub2JsZSB0aGF0IHRoZSBraW5nIHdhcyB0YWxraW5nIHRvIGhhcHBlbmVkIHRvIGFsc28gYmUgdGhlIGJyb3RoZXIgaW4gbGF3IG9mIHRoZSBlbGRlc3QgdmlraW5nIGRhdWdodGVyLiBUaGUgbm9ibGUgbm90aWNlZCB0aGUgdmlraW5nIHByaW5jZXNzIGFuZCBkZWNpZGVkIHRvIG1ha2UgYW4gaW50cm9kdWN0aW9uLiBBZnRlciB0aGUgbm9ibGUgbGVmdCwgdGhleSBjb250aW51ZWQgdGhlaXIgc2hvcHBpbmcsIGdsYW5jaW5nIGF0IGVhY2ggb3RoZXIgdGhyb3VnaCB0aGUgbWFya2V0IHN0YWxscy4gVGhlIHN0cmFuZHMgb2YgZmF0ZSBzcGlubmluZyBzdHJvbmdlciBhbmQgc3Ryb25nZXIgd2l0aCBlYWNoIHBhc3NpbmcuIEh1bWFucyB0ZW5kIHRvIGJlIHVucHJlZGljdGFibGUgYW5kIHJlc2lzdCB0aGVpciBkZXN0aW5pZXMuIFRoZSB2aWtpbmcgcHJpbmNlc3MgYWJydXB0bHkgbGVmdCB0aGUgbWFya2V0IHdpdGhvdXQgdGFsa2luZyB3aXRoIHRoZSBraW5nIGZ1cnRoZXIuPC9wPlxyXG4gICAgICAgIDxwPlRoZSBnb2RzIGRpZG4ndCBsaWtlIHRoaXMuIFRoZXkgZmlsbGVkIGhlciBoZWFkIHdpdGggZG91YnQgYW5kIGhlciBoZWFydCB3aXRoIGV4Y2l0ZW1lbnQuIFNoZSBrbmV3IHNoZSB2ZWVyZWQgZnJvbSB0aGVpciBwbGFucyBhbmQgZGVjaWRlZCB0byB0YWtlIGhlciBzaG90LiBTaGUgc2VudCBvdXQgbWVzc2VuZ2VycyB0byBmaW5kIHRoZSBraW5nLiBUaGV5IGV2ZW50dWFsbHkgdHJhY2tlZCBoaW0gZG93biBhbmQgYXJyYW5nZWQgZm9yIHRoZW0gdG8gbWVldCBhZ2Fpbi4gQSBxdWljayBtZWV0aW5nIGF0IHRoZSB0YXZlcm4gdHVybmVkIGludG8gYSBsb25nIGNvbnZlcnNhdGlvbnMgbGVhZGluZyBpbnRvIHRoZSBkZWFkIG9mIG5pZ2h0LCB5ZXQgc29tZWhvdyB0aW1lIGZlbHQgbGlrZSBpdCB3YXMgc3RhbmRpbmcgc3RpbGwuIEV2ZXJ5dGhpbmcgd2FzIGZhbGxpbmcgaW50byBwbGFjZSBhbmQgdGhlIG1hdGNoIGZlbHQgbGlrZSBhIHBlcmZlY3QgZml0LiBCdXQgYXMgYSBodW1hbiBoaW1zZWxmLCB0aGUga2luZyB3YXMgc3R1YmJvcm4gYW5kIGRlY2lkZWQgaGUgd2Fzbid0IHJlYWR5IGZvciBoaXMgZGVzdGlueS48L3A+XHJcbiAgICAgICAgPHA+VGhlIGdvZHMgZGlkbid0IGxpa2UgdGhpcy4gT25lIGRheSBhcyB0aGUga2luZyB3YXMgYXQgdGhlIHRoZWF0ZXIgd2F0Y2hpbmcgdGhlIG5ld2VzdCBwbGF5LCBoZSB0b29rIG5vdGUgb2Ygb25lIG9mIHRoZSBjaGFyYWN0ZXJzLiBUaGlzIGNoYXJhY3RlciB3YXMgYSB2aWtpbmcuIEhlIHRob3VnaHQgYmFjayB0byB0aGUgdmlraW5nIHByaW5jZXNzIGFuZCBiZWdhbiB0byBkb3VidCBoaXMgY2hvaWNlcy4gVGhlIGtpbmcgZGVjaWRlZCB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmNlLiBUaGlzIHRpbWUgd2hlbiB0aGV5IG1ldCwgdGhleSB3ZXJlIGJvdGggcmVhZHkgdG8gZW1icmFjZSB0aGVpciBkZXN0aW5pZXMuPC9wPlxyXG4gICAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuXHJcbjxzdHlsZSBsYW5nPSdzY3NzJz5cclxuICAgIEBpbXBvcnQgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1QcmluY2VzcytTb2ZpYSc7XHJcbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdGF0aWMvdGhlbWUuc2Nzcyc7XHJcbiAgICBwIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuXHJcbiAgICBzcGFuIHtcclxuICAgICAgICBmb250LWZhbWlseTogJ1ByaW5jZXNzIFNvZmlhJztcclxuICAgICAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBkaXYge1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgICB9XHJcbjwvc3R5bGU+IiwiPHNjcmlwdCA+XHJcbiAgICBpbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICcuL1NlY3Rpb25IZWFkZXIuc3ZlbHRlJztcclxuPC9zY3JpcHQ+XHJcblxyXG48c2VjdGlvbiBjbGFzcz0nYmxlbmRlZCc+XHJcbiAgICA8U2VjdGlvbkhlYWRlciB0aXRsZT17J0JsZW5kZWQgRmFtaWx5IFJlY2lwZSd9Lz5cclxuICAgIDxkaXY+XHJcbiAgICAgICAgPHA+UHV0IGEgZ29vZCBhbmQgaG9uZXN0IG1hbjwvcD5cclxuICAgICAgICA8cD5pbnRvIGEgbWl4aW5nIHBhbi48L3A+XHJcbiAgICAgICAgPHA+Q29tYmluZSBvbmUgbG92aW5nIHdvbWFuPC9wPlxyXG4gICAgICAgIDxwPmFuZCBibGVuZCB3ZWxsIHdpdGggdGhlIG1hbi48L3A+XHJcbiAgICAgICAgPGJyLz5cclxuICAgICAgICA8cD5BZGQgdGhlIGNoaWxkcmVuIG9mIHRoZSBtYW4sPC9wPlxyXG4gICAgICAgIDxwPmFuZCB0aGUgd29tYW4ncyBjaGlsZHJlbiB0b28uPC9wPlxyXG4gICAgICAgIDxwPk1peCB0aGVtIGFsbCB0b2dldGhlcjwvcD5cclxuICAgICAgICA8cD5hcyB5b3Ugd291bGQgYSBwb3Qgb2Ygc3Rldy48L3A+XHJcbiAgICAgICAgPGJyLz5cclxuICAgICAgICA8cD5TbG93bHkgc3RpciBpbiBwYXRpZW5jZS48L3A+XHJcbiAgICAgICAgPHA+SXQgd2lsbCByZWFsbHkgaGVscCBhIGxvdC48L3A+XHJcbiAgICAgICAgPHA+SWYgeW91J3JlIG5vdCBzdXJlIGhvdyBtdWNoLDwvcD5cclxuICAgICAgICA8cD50aHJvdyBpbiBhbGwgeW91J3ZlIGdvdC48L3A+XHJcbiAgICAgICAgPGJyLz5cclxuICAgICAgICA8cD5UaGVuLCBzaXggY3VwcyBvZiBzd2VldGVuZXI8L3A+XHJcbiAgICAgICAgPHA+YW5kIGZvdXJ0ZWVuIGN1cHMgb2YgbG92ZS48L3A+XHJcbiAgICAgICAgPHA+U3ByaW5rbGUgaW4gc29tZSBibGVzc2luZ3M8L3A+XHJcbiAgICAgICAgPHA+ZnJvbSB0aGUgaGVhdmVucyBoaWdoIGFib3ZlLjwvcD5cclxuICAgICAgICA8YnIvPlxyXG4gICAgICAgIDxwPldoZW4gdGhlIG1peHR1cmUgaXMgY29tcGxldGUsPC9wPlxyXG4gICAgICAgIDxwPndpdGggZ3JlYXQgam95IHlvdSB3aWxsIHNlZS4uLjwvcD5cclxuICAgICAgICA8cD5jcmVhdGlvbiBvZiBvdXIgYXdlc29tZSw8L3A+XHJcbiAgICAgICAgPHA+bG92aW5nIGJsZW5kZWQgZmFtaWx5LjwvcD5cclxuICAgIDwvZGl2PlxyXG48L3NlY3Rpb24+XHJcblxyXG48c3R5bGUgbGFuZz0nc2Nzcyc+XHJcbiAgICBAaW1wb3J0ICcuLi8uLi8uLi9zdGF0aWMvdGhlbWUuc2Nzcyc7XHJcbiAgICBcclxuICAgIGRpdiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgfVxyXG48L3N0eWxlPiIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiU2llbWFcIixbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlNpZW1hPXQoKTplLlNpZW1hPXQoKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYoaVtyXSlyZXR1cm4gaVtyXS5leHBvcnRzO3ZhciBuPWlbcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwobi5leHBvcnRzLG4sbi5leHBvcnRzLHQpLG4ubD0hMCxuLmV4cG9ydHN9dmFyIGk9e307cmV0dXJuIHQubT1lLHQuYz1pLHQuZD1mdW5jdGlvbihlLGkscil7dC5vKGUsaSl8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLGkse2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgaT1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKGksXCJhXCIsaSksaX0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0wKX0oW2Z1bmN0aW9uKGUsdCxpKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSxzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXt2YXIgcj10W2ldO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19cmV0dXJuIGZ1bmN0aW9uKHQsaSxyKXtyZXR1cm4gaSYmZSh0LnByb3RvdHlwZSxpKSxyJiZlKHQsciksdH19KCksbD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7dmFyIGk9dGhpcztpZihyKHRoaXMsZSksdGhpcy5jb25maWc9ZS5tZXJnZVNldHRpbmdzKHQpLHRoaXMuc2VsZWN0b3I9XCJzdHJpbmdcIj09dHlwZW9mIHRoaXMuY29uZmlnLnNlbGVjdG9yP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcuc2VsZWN0b3IpOnRoaXMuY29uZmlnLnNlbGVjdG9yLG51bGw9PT10aGlzLnNlbGVjdG9yKXRocm93IG5ldyBFcnJvcihcIlNvbWV0aGluZyB3cm9uZyB3aXRoIHlvdXIgc2VsZWN0b3Ig8J+YrVwiKTt0aGlzLnJlc29sdmVTbGlkZXNOdW1iZXIoKSx0aGlzLnNlbGVjdG9yV2lkdGg9dGhpcy5zZWxlY3Rvci5vZmZzZXRXaWR0aCx0aGlzLmlubmVyRWxlbWVudHM9W10uc2xpY2UuY2FsbCh0aGlzLnNlbGVjdG9yLmNoaWxkcmVuKSx0aGlzLmN1cnJlbnRTbGlkZT10aGlzLmNvbmZpZy5sb29wP3RoaXMuY29uZmlnLnN0YXJ0SW5kZXgldGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aDpNYXRoLm1heCgwLE1hdGgubWluKHRoaXMuY29uZmlnLnN0YXJ0SW5kZXgsdGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aC10aGlzLnBlclBhZ2UpKSx0aGlzLnRyYW5zZm9ybVByb3BlcnR5PWUud2Via2l0T3JOb3QoKSxbXCJyZXNpemVIYW5kbGVyXCIsXCJ0b3VjaHN0YXJ0SGFuZGxlclwiLFwidG91Y2hlbmRIYW5kbGVyXCIsXCJ0b3VjaG1vdmVIYW5kbGVyXCIsXCJtb3VzZWRvd25IYW5kbGVyXCIsXCJtb3VzZXVwSGFuZGxlclwiLFwibW91c2VsZWF2ZUhhbmRsZXJcIixcIm1vdXNlbW92ZUhhbmRsZXJcIixcImNsaWNrSGFuZGxlclwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lbZV09aVtlXS5iaW5kKGkpfSksdGhpcy5pbml0KCl9cmV0dXJuIHMoZSxbe2tleTpcImF0dGFjaEV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKCl7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZUhhbmRsZXIpLHRoaXMuY29uZmlnLmRyYWdnYWJsZSYmKHRoaXMucG9pbnRlckRvd249ITEsdGhpcy5kcmFnPXtzdGFydFg6MCxlbmRYOjAsc3RhcnRZOjAsbGV0SXRHbzpudWxsLHByZXZlbnRDbGljazohMX0sdGhpcy5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLHRoaXMudG91Y2hzdGFydEhhbmRsZXIpLHRoaXMuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsdGhpcy50b3VjaGVuZEhhbmRsZXIpLHRoaXMuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMudG91Y2htb3ZlSGFuZGxlciksdGhpcy5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5tb3VzZWRvd25IYW5kbGVyKSx0aGlzLnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5tb3VzZXVwSGFuZGxlciksdGhpcy5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLHRoaXMubW91c2VsZWF2ZUhhbmRsZXIpLHRoaXMuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMubW91c2Vtb3ZlSGFuZGxlciksdGhpcy5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmNsaWNrSGFuZGxlcikpfX0se2tleTpcImRldGFjaEV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZUhhbmRsZXIpLHRoaXMuc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIix0aGlzLnRvdWNoc3RhcnRIYW5kbGVyKSx0aGlzLnNlbGVjdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHRoaXMudG91Y2hlbmRIYW5kbGVyKSx0aGlzLnNlbGVjdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLnRvdWNobW92ZUhhbmRsZXIpLHRoaXMuc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMubW91c2Vkb3duSGFuZGxlciksdGhpcy5zZWxlY3Rvci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMubW91c2V1cEhhbmRsZXIpLHRoaXMuc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIix0aGlzLm1vdXNlbGVhdmVIYW5kbGVyKSx0aGlzLnNlbGVjdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLm1vdXNlbW92ZUhhbmRsZXIpLHRoaXMuc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5jbGlja0hhbmRsZXIpfX0se2tleTpcImluaXRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuYXR0YWNoRXZlbnRzKCksdGhpcy5zZWxlY3Rvci5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLHRoaXMuc2VsZWN0b3Iuc3R5bGUuZGlyZWN0aW9uPXRoaXMuY29uZmlnLnJ0bD9cInJ0bFwiOlwibHRyXCIsdGhpcy5idWlsZFNsaWRlckZyYW1lKCksdGhpcy5jb25maWcub25Jbml0LmNhbGwodGhpcyl9fSx7a2V5OlwiYnVpbGRTbGlkZXJGcmFtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5zZWxlY3RvcldpZHRoL3RoaXMucGVyUGFnZSx0PXRoaXMuY29uZmlnLmxvb3A/dGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aCsyKnRoaXMucGVyUGFnZTp0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoO3RoaXMuc2xpZGVyRnJhbWU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0aGlzLnNsaWRlckZyYW1lLnN0eWxlLndpZHRoPWUqdCtcInB4XCIsdGhpcy5lbmFibGVUcmFuc2l0aW9uKCksdGhpcy5jb25maWcuZHJhZ2dhYmxlJiYodGhpcy5zZWxlY3Rvci5zdHlsZS5jdXJzb3I9XCItd2Via2l0LWdyYWJcIik7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2lmKHRoaXMuY29uZmlnLmxvb3ApZm9yKHZhciByPXRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGgtdGhpcy5wZXJQYWdlO3I8dGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aDtyKyspe3ZhciBuPXRoaXMuYnVpbGRTbGlkZXJGcmFtZUl0ZW0odGhpcy5pbm5lckVsZW1lbnRzW3JdLmNsb25lTm9kZSghMCkpO2kuYXBwZW5kQ2hpbGQobil9Zm9yKHZhciBzPTA7czx0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoO3MrKyl7dmFyIGw9dGhpcy5idWlsZFNsaWRlckZyYW1lSXRlbSh0aGlzLmlubmVyRWxlbWVudHNbc10pO2kuYXBwZW5kQ2hpbGQobCl9aWYodGhpcy5jb25maWcubG9vcClmb3IodmFyIG89MDtvPHRoaXMucGVyUGFnZTtvKyspe3ZhciBhPXRoaXMuYnVpbGRTbGlkZXJGcmFtZUl0ZW0odGhpcy5pbm5lckVsZW1lbnRzW29dLmNsb25lTm9kZSghMCkpO2kuYXBwZW5kQ2hpbGQoYSl9dGhpcy5zbGlkZXJGcmFtZS5hcHBlbmRDaGlsZChpKSx0aGlzLnNlbGVjdG9yLmlubmVySFRNTD1cIlwiLHRoaXMuc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5zbGlkZXJGcmFtZSksdGhpcy5zbGlkZVRvQ3VycmVudCgpfX0se2tleTpcImJ1aWxkU2xpZGVyRnJhbWVJdGVtXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gdC5zdHlsZS5jc3NGbG9hdD10aGlzLmNvbmZpZy5ydGw/XCJyaWdodFwiOlwibGVmdFwiLHQuc3R5bGUuZmxvYXQ9dGhpcy5jb25maWcucnRsP1wicmlnaHRcIjpcImxlZnRcIix0LnN0eWxlLndpZHRoPSh0aGlzLmNvbmZpZy5sb29wPzEwMC8odGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aCsyKnRoaXMucGVyUGFnZSk6MTAwL3RoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGgpK1wiJVwiLHQuYXBwZW5kQ2hpbGQoZSksdH19LHtrZXk6XCJyZXNvbHZlU2xpZGVzTnVtYmVyXCIsdmFsdWU6ZnVuY3Rpb24oKXtpZihcIm51bWJlclwiPT10eXBlb2YgdGhpcy5jb25maWcucGVyUGFnZSl0aGlzLnBlclBhZ2U9dGhpcy5jb25maWcucGVyUGFnZTtlbHNlIGlmKFwib2JqZWN0XCI9PT1uKHRoaXMuY29uZmlnLnBlclBhZ2UpKXt0aGlzLnBlclBhZ2U9MTtmb3IodmFyIGUgaW4gdGhpcy5jb25maWcucGVyUGFnZSl3aW5kb3cuaW5uZXJXaWR0aD49ZSYmKHRoaXMucGVyUGFnZT10aGlzLmNvbmZpZy5wZXJQYWdlW2VdKX19fSx7a2V5OlwicHJldlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjEsdD1hcmd1bWVudHNbMV07aWYoISh0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoPD10aGlzLnBlclBhZ2UpKXt2YXIgaT10aGlzLmN1cnJlbnRTbGlkZTtpZih0aGlzLmNvbmZpZy5sb29wKXtpZih0aGlzLmN1cnJlbnRTbGlkZS1lPDApe3RoaXMuZGlzYWJsZVRyYW5zaXRpb24oKTt2YXIgcj10aGlzLmN1cnJlbnRTbGlkZSt0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoLG49dGhpcy5wZXJQYWdlLHM9cituLGw9KHRoaXMuY29uZmlnLnJ0bD8xOi0xKSpzKih0aGlzLnNlbGVjdG9yV2lkdGgvdGhpcy5wZXJQYWdlKSxvPXRoaXMuY29uZmlnLmRyYWdnYWJsZT90aGlzLmRyYWcuZW5kWC10aGlzLmRyYWcuc3RhcnRYOjA7dGhpcy5zbGlkZXJGcmFtZS5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5XT1cInRyYW5zbGF0ZTNkKFwiKyhsK28pK1wicHgsIDAsIDApXCIsdGhpcy5jdXJyZW50U2xpZGU9ci1lfWVsc2UgdGhpcy5jdXJyZW50U2xpZGU9dGhpcy5jdXJyZW50U2xpZGUtZX1lbHNlIHRoaXMuY3VycmVudFNsaWRlPU1hdGgubWF4KHRoaXMuY3VycmVudFNsaWRlLWUsMCk7aSE9PXRoaXMuY3VycmVudFNsaWRlJiYodGhpcy5zbGlkZVRvQ3VycmVudCh0aGlzLmNvbmZpZy5sb29wKSx0aGlzLmNvbmZpZy5vbkNoYW5nZS5jYWxsKHRoaXMpLHQmJnQuY2FsbCh0aGlzKSl9fX0se2tleTpcIm5leHRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXToxLHQ9YXJndW1lbnRzWzFdO2lmKCEodGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aDw9dGhpcy5wZXJQYWdlKSl7dmFyIGk9dGhpcy5jdXJyZW50U2xpZGU7aWYodGhpcy5jb25maWcubG9vcCl7aWYodGhpcy5jdXJyZW50U2xpZGUrZT50aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoLXRoaXMucGVyUGFnZSl7dGhpcy5kaXNhYmxlVHJhbnNpdGlvbigpO3ZhciByPXRoaXMuY3VycmVudFNsaWRlLXRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGgsbj10aGlzLnBlclBhZ2Uscz1yK24sbD0odGhpcy5jb25maWcucnRsPzE6LTEpKnMqKHRoaXMuc2VsZWN0b3JXaWR0aC90aGlzLnBlclBhZ2UpLG89dGhpcy5jb25maWcuZHJhZ2dhYmxlP3RoaXMuZHJhZy5lbmRYLXRoaXMuZHJhZy5zdGFydFg6MDt0aGlzLnNsaWRlckZyYW1lLnN0eWxlW3RoaXMudHJhbnNmb3JtUHJvcGVydHldPVwidHJhbnNsYXRlM2QoXCIrKGwrbykrXCJweCwgMCwgMClcIix0aGlzLmN1cnJlbnRTbGlkZT1yK2V9ZWxzZSB0aGlzLmN1cnJlbnRTbGlkZT10aGlzLmN1cnJlbnRTbGlkZStlfWVsc2UgdGhpcy5jdXJyZW50U2xpZGU9TWF0aC5taW4odGhpcy5jdXJyZW50U2xpZGUrZSx0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoLXRoaXMucGVyUGFnZSk7aSE9PXRoaXMuY3VycmVudFNsaWRlJiYodGhpcy5zbGlkZVRvQ3VycmVudCh0aGlzLmNvbmZpZy5sb29wKSx0aGlzLmNvbmZpZy5vbkNoYW5nZS5jYWxsKHRoaXMpLHQmJnQuY2FsbCh0aGlzKSl9fX0se2tleTpcImRpc2FibGVUcmFuc2l0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnNsaWRlckZyYW1lLnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCJhbGwgMG1zIFwiK3RoaXMuY29uZmlnLmVhc2luZyx0aGlzLnNsaWRlckZyYW1lLnN0eWxlLnRyYW5zaXRpb249XCJhbGwgMG1zIFwiK3RoaXMuY29uZmlnLmVhc2luZ319LHtrZXk6XCJlbmFibGVUcmFuc2l0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnNsaWRlckZyYW1lLnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCJhbGwgXCIrdGhpcy5jb25maWcuZHVyYXRpb24rXCJtcyBcIit0aGlzLmNvbmZpZy5lYXNpbmcsdGhpcy5zbGlkZXJGcmFtZS5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIFwiK3RoaXMuY29uZmlnLmR1cmF0aW9uK1wibXMgXCIrdGhpcy5jb25maWcuZWFzaW5nfX0se2tleTpcImdvVG9cIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKCEodGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aDw9dGhpcy5wZXJQYWdlKSl7dmFyIGk9dGhpcy5jdXJyZW50U2xpZGU7dGhpcy5jdXJyZW50U2xpZGU9dGhpcy5jb25maWcubG9vcD9lJXRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGg6TWF0aC5taW4oTWF0aC5tYXgoZSwwKSx0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoLXRoaXMucGVyUGFnZSksaSE9PXRoaXMuY3VycmVudFNsaWRlJiYodGhpcy5zbGlkZVRvQ3VycmVudCgpLHRoaXMuY29uZmlnLm9uQ2hhbmdlLmNhbGwodGhpcyksdCYmdC5jYWxsKHRoaXMpKX19fSx7a2V5Olwic2xpZGVUb0N1cnJlbnRcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLGk9dGhpcy5jb25maWcubG9vcD90aGlzLmN1cnJlbnRTbGlkZSt0aGlzLnBlclBhZ2U6dGhpcy5jdXJyZW50U2xpZGUscj0odGhpcy5jb25maWcucnRsPzE6LTEpKmkqKHRoaXMuc2VsZWN0b3JXaWR0aC90aGlzLnBlclBhZ2UpO2U/cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7dC5lbmFibGVUcmFuc2l0aW9uKCksdC5zbGlkZXJGcmFtZS5zdHlsZVt0LnRyYW5zZm9ybVByb3BlcnR5XT1cInRyYW5zbGF0ZTNkKFwiK3IrXCJweCwgMCwgMClcIn0pfSk6dGhpcy5zbGlkZXJGcmFtZS5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5XT1cInRyYW5zbGF0ZTNkKFwiK3IrXCJweCwgMCwgMClcIn19LHtrZXk6XCJ1cGRhdGVBZnRlckRyYWdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPSh0aGlzLmNvbmZpZy5ydGw/LTE6MSkqKHRoaXMuZHJhZy5lbmRYLXRoaXMuZHJhZy5zdGFydFgpLHQ9TWF0aC5hYnMoZSksaT10aGlzLmNvbmZpZy5tdWx0aXBsZURyYWc/TWF0aC5jZWlsKHQvKHRoaXMuc2VsZWN0b3JXaWR0aC90aGlzLnBlclBhZ2UpKToxLHI9ZT4wJiZ0aGlzLmN1cnJlbnRTbGlkZS1pPDAsbj1lPDAmJnRoaXMuY3VycmVudFNsaWRlK2k+dGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aC10aGlzLnBlclBhZ2U7ZT4wJiZ0PnRoaXMuY29uZmlnLnRocmVzaG9sZCYmdGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aD50aGlzLnBlclBhZ2U/dGhpcy5wcmV2KGkpOmU8MCYmdD50aGlzLmNvbmZpZy50aHJlc2hvbGQmJnRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGg+dGhpcy5wZXJQYWdlJiZ0aGlzLm5leHQoaSksdGhpcy5zbGlkZVRvQ3VycmVudChyfHxuKX19LHtrZXk6XCJyZXNpemVIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnJlc29sdmVTbGlkZXNOdW1iZXIoKSx0aGlzLmN1cnJlbnRTbGlkZSt0aGlzLnBlclBhZ2U+dGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aCYmKHRoaXMuY3VycmVudFNsaWRlPXRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGg8PXRoaXMucGVyUGFnZT8wOnRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGgtdGhpcy5wZXJQYWdlKSx0aGlzLnNlbGVjdG9yV2lkdGg9dGhpcy5zZWxlY3Rvci5vZmZzZXRXaWR0aCx0aGlzLmJ1aWxkU2xpZGVyRnJhbWUoKX19LHtrZXk6XCJjbGVhckRyYWdcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuZHJhZz17c3RhcnRYOjAsZW5kWDowLHN0YXJ0WTowLGxldEl0R286bnVsbCxwcmV2ZW50Q2xpY2s6dGhpcy5kcmFnLnByZXZlbnRDbGlja319fSx7a2V5OlwidG91Y2hzdGFydEhhbmRsZXJcIix2YWx1ZTpmdW5jdGlvbihlKXstMSE9PVtcIlRFWFRBUkVBXCIsXCJPUFRJT05cIixcIklOUFVUXCIsXCJTRUxFQ1RcIl0uaW5kZXhPZihlLnRhcmdldC5ub2RlTmFtZSl8fChlLnN0b3BQcm9wYWdhdGlvbigpLHRoaXMucG9pbnRlckRvd249ITAsdGhpcy5kcmFnLnN0YXJ0WD1lLnRvdWNoZXNbMF0ucGFnZVgsdGhpcy5kcmFnLnN0YXJ0WT1lLnRvdWNoZXNbMF0ucGFnZVkpfX0se2tleTpcInRvdWNoZW5kSGFuZGxlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCksdGhpcy5wb2ludGVyRG93bj0hMSx0aGlzLmVuYWJsZVRyYW5zaXRpb24oKSx0aGlzLmRyYWcuZW5kWCYmdGhpcy51cGRhdGVBZnRlckRyYWcoKSx0aGlzLmNsZWFyRHJhZygpfX0se2tleTpcInRvdWNobW92ZUhhbmRsZXJcIix2YWx1ZTpmdW5jdGlvbihlKXtpZihlLnN0b3BQcm9wYWdhdGlvbigpLG51bGw9PT10aGlzLmRyYWcubGV0SXRHbyYmKHRoaXMuZHJhZy5sZXRJdEdvPU1hdGguYWJzKHRoaXMuZHJhZy5zdGFydFktZS50b3VjaGVzWzBdLnBhZ2VZKTxNYXRoLmFicyh0aGlzLmRyYWcuc3RhcnRYLWUudG91Y2hlc1swXS5wYWdlWCkpLHRoaXMucG9pbnRlckRvd24mJnRoaXMuZHJhZy5sZXRJdEdvKXtlLnByZXZlbnREZWZhdWx0KCksdGhpcy5kcmFnLmVuZFg9ZS50b3VjaGVzWzBdLnBhZ2VYLHRoaXMuc2xpZGVyRnJhbWUuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cImFsbCAwbXMgXCIrdGhpcy5jb25maWcuZWFzaW5nLHRoaXMuc2xpZGVyRnJhbWUuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAwbXMgXCIrdGhpcy5jb25maWcuZWFzaW5nO3ZhciB0PXRoaXMuY29uZmlnLmxvb3A/dGhpcy5jdXJyZW50U2xpZGUrdGhpcy5wZXJQYWdlOnRoaXMuY3VycmVudFNsaWRlLGk9dCoodGhpcy5zZWxlY3RvcldpZHRoL3RoaXMucGVyUGFnZSkscj10aGlzLmRyYWcuZW5kWC10aGlzLmRyYWcuc3RhcnRYLG49dGhpcy5jb25maWcucnRsP2krcjppLXI7dGhpcy5zbGlkZXJGcmFtZS5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5XT1cInRyYW5zbGF0ZTNkKFwiKyh0aGlzLmNvbmZpZy5ydGw/MTotMSkqbitcInB4LCAwLCAwKVwifX19LHtrZXk6XCJtb3VzZWRvd25IYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7LTEhPT1bXCJURVhUQVJFQVwiLFwiT1BUSU9OXCIsXCJJTlBVVFwiLFwiU0VMRUNUXCJdLmluZGV4T2YoZS50YXJnZXQubm9kZU5hbWUpfHwoZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCksdGhpcy5wb2ludGVyRG93bj0hMCx0aGlzLmRyYWcuc3RhcnRYPWUucGFnZVgpfX0se2tleTpcIm1vdXNldXBIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7ZS5zdG9wUHJvcGFnYXRpb24oKSx0aGlzLnBvaW50ZXJEb3duPSExLHRoaXMuc2VsZWN0b3Iuc3R5bGUuY3Vyc29yPVwiLXdlYmtpdC1ncmFiXCIsdGhpcy5lbmFibGVUcmFuc2l0aW9uKCksdGhpcy5kcmFnLmVuZFgmJnRoaXMudXBkYXRlQWZ0ZXJEcmFnKCksdGhpcy5jbGVhckRyYWcoKX19LHtrZXk6XCJtb3VzZW1vdmVIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMucG9pbnRlckRvd24pe1wiQVwiPT09ZS50YXJnZXQubm9kZU5hbWUmJih0aGlzLmRyYWcucHJldmVudENsaWNrPSEwKSx0aGlzLmRyYWcuZW5kWD1lLnBhZ2VYLHRoaXMuc2VsZWN0b3Iuc3R5bGUuY3Vyc29yPVwiLXdlYmtpdC1ncmFiYmluZ1wiLHRoaXMuc2xpZGVyRnJhbWUuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cImFsbCAwbXMgXCIrdGhpcy5jb25maWcuZWFzaW5nLHRoaXMuc2xpZGVyRnJhbWUuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAwbXMgXCIrdGhpcy5jb25maWcuZWFzaW5nO3ZhciB0PXRoaXMuY29uZmlnLmxvb3A/dGhpcy5jdXJyZW50U2xpZGUrdGhpcy5wZXJQYWdlOnRoaXMuY3VycmVudFNsaWRlLGk9dCoodGhpcy5zZWxlY3RvcldpZHRoL3RoaXMucGVyUGFnZSkscj10aGlzLmRyYWcuZW5kWC10aGlzLmRyYWcuc3RhcnRYLG49dGhpcy5jb25maWcucnRsP2krcjppLXI7dGhpcy5zbGlkZXJGcmFtZS5zdHlsZVt0aGlzLnRyYW5zZm9ybVByb3BlcnR5XT1cInRyYW5zbGF0ZTNkKFwiKyh0aGlzLmNvbmZpZy5ydGw/MTotMSkqbitcInB4LCAwLCAwKVwifX19LHtrZXk6XCJtb3VzZWxlYXZlSGFuZGxlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMucG9pbnRlckRvd24mJih0aGlzLnBvaW50ZXJEb3duPSExLHRoaXMuc2VsZWN0b3Iuc3R5bGUuY3Vyc29yPVwiLXdlYmtpdC1ncmFiXCIsdGhpcy5kcmFnLmVuZFg9ZS5wYWdlWCx0aGlzLmRyYWcucHJldmVudENsaWNrPSExLHRoaXMuZW5hYmxlVHJhbnNpdGlvbigpLHRoaXMudXBkYXRlQWZ0ZXJEcmFnKCksdGhpcy5jbGVhckRyYWcoKSl9fSx7a2V5OlwiY2xpY2tIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5kcmFnLnByZXZlbnRDbGljayYmZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuZHJhZy5wcmV2ZW50Q2xpY2s9ITF9fSx7a2V5OlwicmVtb3ZlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtpZihlPDB8fGU+PXRoaXMuaW5uZXJFbGVtZW50cy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiSXRlbSB0byByZW1vdmUgZG9lc24ndCBleGlzdCDwn5itXCIpO3ZhciBpPWU8dGhpcy5jdXJyZW50U2xpZGUscj10aGlzLmN1cnJlbnRTbGlkZSt0aGlzLnBlclBhZ2UtMT09PWU7KGl8fHIpJiZ0aGlzLmN1cnJlbnRTbGlkZS0tLHRoaXMuaW5uZXJFbGVtZW50cy5zcGxpY2UoZSwxKSx0aGlzLmJ1aWxkU2xpZGVyRnJhbWUoKSx0JiZ0LmNhbGwodGhpcyl9fSx7a2V5OlwiaW5zZXJ0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LGkpe2lmKHQ8MHx8dD50aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoKzEpdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGluc2V0IGl0IGF0IHRoaXMgaW5kZXgg8J+YrVwiKTtpZigtMSE9PXRoaXMuaW5uZXJFbGVtZW50cy5pbmRleE9mKGUpKXRocm93IG5ldyBFcnJvcihcIlRoZSBzYW1lIGl0ZW0gaW4gYSBjYXJvdXNlbD8gUmVhbGx5PyBOb3BlIPCfmK1cIik7dmFyIHI9dDw9dGhpcy5jdXJyZW50U2xpZGU+MCYmdGhpcy5pbm5lckVsZW1lbnRzLmxlbmd0aDt0aGlzLmN1cnJlbnRTbGlkZT1yP3RoaXMuY3VycmVudFNsaWRlKzE6dGhpcy5jdXJyZW50U2xpZGUsdGhpcy5pbm5lckVsZW1lbnRzLnNwbGljZSh0LDAsZSksdGhpcy5idWlsZFNsaWRlckZyYW1lKCksaSYmaS5jYWxsKHRoaXMpfX0se2tleTpcInByZXBlbmRcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMuaW5zZXJ0KGUsMCksdCYmdC5jYWxsKHRoaXMpfX0se2tleTpcImFwcGVuZFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpcy5pbnNlcnQoZSx0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoKzEpLHQmJnQuY2FsbCh0aGlzKX19LHtrZXk6XCJkZXN0cm95XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzWzFdO2lmKHRoaXMuZGV0YWNoRXZlbnRzKCksdGhpcy5zZWxlY3Rvci5zdHlsZS5jdXJzb3I9XCJhdXRvXCIsZSl7Zm9yKHZhciBpPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxyPTA7cjx0aGlzLmlubmVyRWxlbWVudHMubGVuZ3RoO3IrKylpLmFwcGVuZENoaWxkKHRoaXMuaW5uZXJFbGVtZW50c1tyXSk7dGhpcy5zZWxlY3Rvci5pbm5lckhUTUw9XCJcIix0aGlzLnNlbGVjdG9yLmFwcGVuZENoaWxkKGkpLHRoaXMuc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIil9dCYmdC5jYWxsKHRoaXMpfX1dLFt7a2V5OlwibWVyZ2VTZXR0aW5nc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXtzZWxlY3RvcjpcIi5zaWVtYVwiLGR1cmF0aW9uOjIwMCxlYXNpbmc6XCJlYXNlLW91dFwiLHBlclBhZ2U6MSxzdGFydEluZGV4OjAsZHJhZ2dhYmxlOiEwLG11bHRpcGxlRHJhZzohMCx0aHJlc2hvbGQ6MjAsbG9vcDohMSxydGw6ITEsb25Jbml0OmZ1bmN0aW9uKCl7fSxvbkNoYW5nZTpmdW5jdGlvbigpe319LGk9ZTtmb3IodmFyIHIgaW4gaSl0W3JdPWlbcl07cmV0dXJuIHR9fSx7a2V5Olwid2Via2l0T3JOb3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtP1widHJhbnNmb3JtXCI6XCJXZWJraXRUcmFuc2Zvcm1cIn19XSksZX0oKTt0LmRlZmF1bHQ9bCxlLmV4cG9ydHM9dC5kZWZhdWx0fV0pfSk7IiwiXG48ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIj5cblx0PGRpdiBjbGFzcz1cInNsaWRlc1wiIGJpbmQ6dGhpcz17c2llbWF9PlxuXHRcdDxzbG90Pjwvc2xvdD5cblx0PC9kaXY+XG5cdHsjaWYgY29udHJvbHN9XG5cdDxidXR0b24gY2xhc3M9XCJsZWZ0XCIgb246Y2xpY2s9e2xlZnR9IGFyaWEtbGFiZWw9XCJsZWZ0XCI+XG5cdFx0PHNsb3QgbmFtZT1cImxlZnQtY29udHJvbFwiPjwvc2xvdD5cblx0PC9idXR0b24+XG5cdDxidXR0b24gY2xhc3M9XCJyaWdodFwiIG9uOmNsaWNrPXtyaWdodH0gYXJpYS1sYWJlbD1cInJpZ2h0XCI+XG5cdFx0PHNsb3QgbmFtZT1cInJpZ2h0LWNvbnRyb2xcIj48L3Nsb3Q+XG5cdDwvYnV0dG9uPlxuXHR7L2lmfVxuICAgIHsjaWYgZG90c31cblx0PHVsPlxuXHRcdHsjZWFjaCB7bGVuZ3RoOiB0b3RhbERvdHN9IGFzIF8sIGl9XG5cdFx0PGxpIG9uOmNsaWNrPXsoKSA9PiBnbyhpKmN1cnJlbnRQZXJQYWdlKX0gY2xhc3M9e2lzRG90QWN0aXZlKGN1cnJlbnRJbmRleCwgaSkgPyBcImFjdGl2ZVwiIDogXCJcIn0+PC9saT5cblx0XHR7L2VhY2h9XG5cdDwvdWw+XG4gICAgey9pZn1cbjwvZGl2PlxuXG48c3R5bGU+XG5cdC5jYXJvdXNlbCB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdH1cblx0XG5cdGJ1dHRvbiB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHdpZHRoOiA0MHB4O1xuXHRcdGhlaWdodDogNDBweDtcblx0XHR0b3A6IDUwJTtcblx0XHR6LWluZGV4OiA1MDtcblx0XHRtYXJnaW4tdG9wOiAtMjBweDtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdH1cblxuICBidXR0b246Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblx0XG5cdC5sZWZ0IHtcblx0XHRsZWZ0OiAydnc7XG5cdH1cblx0XG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDJ2dztcblx0fVxuXG5cdHVsIHtcblx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0bWFyZ2luLXRvcDogLTMwcHg7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXG5cdHVsIGxpIHtcblx0XHRtYXJnaW46IDZweDtcblx0XHRib3JkZXItcmFkaXVzOiAxMDAlO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcblx0XHRoZWlnaHQ6IDhweDtcblx0XHR3aWR0aDogOHB4O1xuXHR9XG5cblx0dWwgbGk6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC44NSk7XG5cdH1cblxuXHR1bCBsaS5hY3RpdmUge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMSk7XG5cdH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG5cdGltcG9ydCBTaWVtYSBmcm9tICdzaWVtYSdcblx0aW1wb3J0IHsgb25Nb3VudCwgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJ1xuXHRcblx0ZXhwb3J0IGxldCBwZXJQYWdlID0gM1xuXHRleHBvcnQgbGV0IGxvb3AgPSB0cnVlXG5cdGV4cG9ydCBsZXQgYXV0b3BsYXkgPSAwXG5cdGV4cG9ydCBsZXQgZHVyYXRpb24gPSAyMDBcblx0ZXhwb3J0IGxldCBlYXNpbmcgPSAnZWFzZS1vdXQnXG5cdGV4cG9ydCBsZXQgc3RhcnRJbmRleCA9IDBcblx0ZXhwb3J0IGxldCBkcmFnZ2FibGUgPSB0cnVlXG5cdGV4cG9ydCBsZXQgbXVsdGlwbGVEcmFnID0gdHJ1ZVx0XG5cdGV4cG9ydCBsZXQgZG90cyA9IHRydWVcdFxuXHRleHBvcnQgbGV0IGNvbnRyb2xzID0gdHJ1ZVxuXHRleHBvcnQgbGV0IHRocmVzaG9sZCA9IDIwXG5cdGV4cG9ydCBsZXQgcnRsID0gZmFsc2Vcblx0bGV0IGN1cnJlbnRJbmRleCA9IHN0YXJ0SW5kZXg7XG5cdFxuXHRsZXQgc2llbWFcblx0bGV0IGNvbnRyb2xsZXJcblx0bGV0IHRpbWVyXG5cblx0Y29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKVxuXG5cdCQ6IHBpcHMgPSBjb250cm9sbGVyID8gY29udHJvbGxlci5pbm5lckVsZW1lbnRzIDogW11cblx0JDogY3VycmVudFBlclBhZ2UgPSBjb250cm9sbGVyID8gY29udHJvbGxlci5wZXJQYWdlIDogcGVyUGFnZVxuXHQkOiB0b3RhbERvdHMgPSBjb250cm9sbGVyID8gTWF0aC5jZWlsKGNvbnRyb2xsZXIuaW5uZXJFbGVtZW50cy5sZW5ndGggLyBjdXJyZW50UGVyUGFnZSkgOiBbXVxuXHRcblx0b25Nb3VudCgoKSA9PiB7XG5cdFx0Y29udHJvbGxlciA9IG5ldyBTaWVtYSh7XG5cdFx0XHRzZWxlY3Rvcjogc2llbWEsXG5cdFx0XHRwZXJQYWdlOiB0eXBlb2YgcGVyUGFnZSA9PT0gJ29iamVjdCcgPyBwZXJQYWdlIDogTnVtYmVyKHBlclBhZ2UpLFxuXHRcdFx0bG9vcCxcbiAgXHRcdFx0ZHVyYXRpb24sXG4gIFx0XHRcdGVhc2luZyxcbiAgXHRcdFx0c3RhcnRJbmRleCxcbiAgXHRcdFx0ZHJhZ2dhYmxlLFxuIFx0XHRcdG11bHRpcGxlRHJhZyxcbiAgXHRcdFx0dGhyZXNob2xkLFxuICBcdFx0XHRydGwsXG5cdFx0XHRvbkNoYW5nZTogaGFuZGxlQ2hhbmdlXG5cdFx0fSlcblx0XHRcblx0XHRpZihhdXRvcGxheSkge1xuXHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbChyaWdodCwgYXV0b3BsYXkpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRhdXRvcGxheSAmJiBjbGVhckludGVydmFsKHRpbWVyKVxuXHRcdFx0Y29udHJvbGxlci5kZXN0cm95KClcblx0XHR9XG5cdH0pXG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGlzRG90QWN0aXZlIChjdXJyZW50SW5kZXgsIGRvdEluZGV4KSB7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSBjdXJyZW50SW5kZXggPSBwaXBzLmxlbmd0aCArIGN1cnJlbnRJbmRleDtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleCA+PSBkb3RJbmRleCpjdXJyZW50UGVyUGFnZSAmJiBjdXJyZW50SW5kZXggPCAoZG90SW5kZXgqY3VycmVudFBlclBhZ2UpK2N1cnJlbnRQZXJQYWdlXG4gICAgfVxuXHRcblx0ZXhwb3J0IGZ1bmN0aW9uIGxlZnQgKCkge1xuXHRcdGNvbnRyb2xsZXIucHJldigpXG5cdH1cblx0XG5cdGV4cG9ydCBmdW5jdGlvbiByaWdodCAoKSB7XG5cdFx0Y29udHJvbGxlci5uZXh0KClcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnbyAoaW5kZXgpIHtcblx0XHRjb250cm9sbGVyLmdvVG8oaW5kZXgpXG5cdH1cblx0XG5cdGV4cG9ydCBmdW5jdGlvbiBwYXVzZSgpIHtcblx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiByZXN1bWUoKSB7XG5cdFx0aWYgKGF1dG9wbGF5KSB7XG5cdFx0XHR0aW1lciA9IHNldEludGVydmFsKHJpZ2h0LCBhdXRvcGxheSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlQ2hhbmdlIChldmVudCkge1xuXHRcdGN1cnJlbnRJbmRleCA9IGNvbnRyb2xsZXIuY3VycmVudFNsaWRlXG5cblx0XHRkaXNwYXRjaCgnY2hhbmdlJywge1xuXHRcdFx0Y3VycmVudFNsaWRlOiBjb250cm9sbGVyLmN1cnJlbnRTbGlkZSxcblx0XHRcdHNsaWRlQ291bnQ6IGNvbnRyb2xsZXIuaW5uZXJFbGVtZW50cy5sZW5ndGhcblx0XHR9IClcblx0fVxuPC9zY3JpcHQ+XG4iLCI8c2NyaXB0PlxuICBleHBvcnQgbGV0IHNpemUgPSBcIjEwMCVcIjtcbiAgbGV0IGN1c3RvbUNsYXNzID0gXCJcIjtcbiAgZXhwb3J0IHsgY3VzdG9tQ2xhc3MgYXMgY2xhc3MgfTtcblxuICBpZiAoc2l6ZSAhPT0gXCIxMDAlXCIpIHtcbiAgICBzaXplID0gc2l6ZS5zbGljZSgtMSkgPT09ICd4JyBcbiAgICAgICAgICA/IHNpemUuc2xpY2UoMCwgc2l6ZS5sZW5ndGggLTEpICsgJ2VtJ1xuICAgICAgICAgIDogcGFyc2VJbnQoc2l6ZSkgKyAncHgnO1xuICB9XG48L3NjcmlwdD5cblxuPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9e3NpemV9IGhlaWdodD17c2l6ZX0gZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBjbGFzcz1cImZlYXRoZXIgZmVhdGhlci1jaGV2cm9uLWxlZnQge2N1c3RvbUNsYXNzfVwiPjxwb2x5bGluZSBwb2ludHM9XCIxNSAxOCA5IDEyIDE1IDZcIj48L3BvbHlsaW5lPjwvc3ZnPlxuIiwiPHNjcmlwdD5cbiAgZXhwb3J0IGxldCBzaXplID0gXCIxMDAlXCI7XG4gIGxldCBjdXN0b21DbGFzcyA9IFwiXCI7XG4gIGV4cG9ydCB7IGN1c3RvbUNsYXNzIGFzIGNsYXNzIH07XG5cbiAgaWYgKHNpemUgIT09IFwiMTAwJVwiKSB7XG4gICAgc2l6ZSA9IHNpemUuc2xpY2UoLTEpID09PSAneCcgXG4gICAgICAgICAgPyBzaXplLnNsaWNlKDAsIHNpemUubGVuZ3RoIC0xKSArICdlbSdcbiAgICAgICAgICA6IHBhcnNlSW50KHNpemUpICsgJ3B4JztcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPXtzaXplfSBoZWlnaHQ9e3NpemV9IGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1yaWdodCB7Y3VzdG9tQ2xhc3N9XCI+PHBvbHlsaW5lIHBvaW50cz1cIjkgMTggMTUgMTIgOSA2XCI+PC9wb2x5bGluZT48L3N2Zz5cbiIsIjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICcuL1NlY3Rpb25IZWFkZXIuc3ZlbHRlJztcclxuXHRpbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnQGJleW9uay9zdmVsdGUtY2Fyb3VzZWwnO1xyXG4gICAgaW1wb3J0IHsgQ2hldnJvbkxlZnRJY29uLCBDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAnc3ZlbHRlLWZlYXRoZXItaWNvbnMnO1xyXG5cclxuXHRsZXQgY2Fyb3VzZWxPcHRpb25zID0gW1xyXG5cdFx0e1xyXG4gICAgICAgICAgICBwZXJQYWdlOiAxLFxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZVxyXG5cdFx0fVxyXG4gICAgXVxyXG4gICAgXHJcbiAgICBsZXQgcGhvdG9zID0gW1xyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL0dyYW5kY2hpbGRyZW5XaXRoQmFyYi5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL0NoZWVzZS5qcGcnLFx0XHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vTW92aW5nRGF5LmpwZycsXHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vRmlyZUFuZEljZS5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1dpdGhMaWFtLmpwZycsXHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vTGFrZS5qcGcnLFx0XHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vV2l0aE5vcmEuanBnJyxcclxuICAgICAgICAnaHR0cHM6Ly9saXNhYW5kdGltcGljdHVyZXMuczMuYW1hem9uYXdzLmNvbS9NYXNrcy5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL0NhcmVuYUFuZERvZy5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL01hc2tzMi5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1JoaWFubmFoQW5kQWRhbS5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1Nwb3J0c0Jhci5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1N1bW1lckFuZENsYW4uanBnJyxcclxuICAgICAgICAnaHR0cHM6Ly9saXNhYW5kdGltcGljdHVyZXMuczMuYW1hem9uYXdzLmNvbS9TdFBhdHJpY2tzRGF5LmpwZycsXHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vVG9yeUFuZENhcmVuYUFuZEJyaS5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1RvcnlBbmRDbGFuLmpwZycsXHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vQXVzdGluQW5kQ2xhbi5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL0dyYW5kY2hpbGRyZW4uanBnJyxcclxuICAgICAgICAnaHR0cHM6Ly9saXNhYW5kdGltcGljdHVyZXMuczMuYW1hem9uYXdzLmNvbS9TaGFubm9uQW5kQ2xhbi5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL1dpdGhSaGlhbm5haC5qcGcnLFxyXG4gICAgICAgICdodHRwczovL2xpc2FhbmR0aW1waWN0dXJlcy5zMy5hbWF6b25hd3MuY29tL0xpc2FBbmRBZGFtLmpwZycsXHJcbiAgICAgICAgJ2h0dHBzOi8vbGlzYWFuZHRpbXBpY3R1cmVzLnMzLmFtYXpvbmF3cy5jb20vTmFuYUFuZFBvcHBvcC5qcGcnXHJcbiAgICBdO1xyXG48L3NjcmlwdD5cclxuXHJcbjxzZWN0aW9uIGNsYXNzPSdjbGFuJz5cclxuICAgIDxTZWN0aW9uSGVhZGVyIHRpdGxlPXsnT3VyIENsYW4nfS8+XHJcbiAgICA8ZGl2IGNsYXNzPSdvdXR0ZXJXcmFwcGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdpbm5lcldyYXBwZXInPlxyXG4gICAgICAgICAgICB7I2VhY2ggY2Fyb3VzZWxPcHRpb25zIGFzIGNhcm91c2VsfVxyXG4gICAgICAgICAgICA8Q2Fyb3VzZWwgey4uLmNhcm91c2VsfT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udHJvbCBsZWZ0XCIgc2xvdD1cImxlZnQtY29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gLz5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHsjZWFjaCBwaG90b3MgYXMgcGhvdG99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtwaG90b30gYWx0PVwiTGlzYSBhbmQgVGltJ3MgRmFtaWx5XCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvZWFjaH1cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udHJvbCByaWdodFwiIHNsb3Q9XCJyaWdodC1jb250cm9sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gLz5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9DYXJvdXNlbD5cclxuICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgey9lYWNofVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuXHJcbjxzdHlsZSBsYW5nPSdzY3NzJz5cclxuICAgIEBpbXBvcnQgJy4uLy4uLy4uL3N0YXRpYy90aGVtZS5zY3NzJztcclxuICAgIFxyXG4gICAgLm91dHRlcldyYXBwZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRhY2NlbnQtY29sb3ItZ3JlZW47XHJcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDsgXHJcbiAgICB9XHJcblxyXG4gICAgLmlubmVyV3JhcHBlciB7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgICAgICB3aWR0aDogMzAwcHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB9IFxyXG5cclxuICAgIC5jb250cm9sIDpnbG9iYWwoc3ZnKSB7XHJcbiAgICAgICAgY29sb3I6ICRhY2NlbnQtY29sb3ItZ3JlZW47XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZnQge1xyXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAucmlnaHQge1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAuc2xpZGUtY29udGVudCB7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIGltZyB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIH1cclxuXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gXHJcbiAgICBhbmQgKG1pbi13aWR0aCA6IDMyMHB4KSBcclxuICAgIGFuZCAobWF4LXdpZHRoIDogNDUwcHgpIHsgICBcclxuICAgICAgICBcclxuICAgICAgICAuaW5uZXJXcmFwcGVyIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAuY29udHJvbCA6Z2xvYmFsKHN2Zykge1xyXG4gICAgICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDUwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zbGlkZS1jb250ZW50IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIFxyXG4gICAgYW5kIChtaW4td2lkdGggOiA0NTFweClcclxuICAgIGFuZCAobWF4LXdpZHRoIDogMTIyNHB4KSB7ICAgICAgICBcclxuICAgICAgICAuaW5uZXJXcmFwcGVyIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MDBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAuY29udHJvbCA6Z2xvYmFsKHN2Zykge1xyXG4gICAgICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDUwJTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLnNsaWRlLWNvbnRlbnQge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIFxyXG4gICAgYW5kIChtaW4td2lkdGggOiAxMjI1cHgpIHsgICAgXHJcbiAgICAgICAgLmlubmVyV3JhcHBlciB7XHJcbiAgICAgICAgICAgIGhlaWdodDogNjAwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2MDBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLmNvbnRyb2wgOmdsb2JhbChzdmcpIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgJGFjY2VudC1jb2xvci1ncmVlbjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMzJweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLnNsaWRlLWNvbnRlbnQge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zdHlsZT5cclxuIiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz4gXHJcbiAgICBpbXBvcnQgeyBUb2FzdE1vZGVsIH0gZnJvbSAnLi4vX21vZGVscy9Ub2FzdE1vZGVsJztcclxuICAgIGltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJy4vU2VjdGlvbkhlYWRlci5zdmVsdGUnO1xyXG4gICAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICBcclxuICAgIGV4cG9ydCBsZXQgaXNMb2dnZWRJbjogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBsZXQgZmFjZWJvb2tVc2VySWQ6IHN0cmluZztcclxuICAgIGV4cG9ydCBsZXQgdG9hc3Q6IFRvYXN0TW9kZWw7XHJcbiAgICBleHBvcnQgbGV0IGlzRWRpdHRpbmdUb2FzdDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcHJvcG9zZVRvYXN0ICgpIHtcclxuICAgICAgICBpZiAodG9hc3QudG9hc3Rlck5hbWUgPT0gJycgfHwgdG9hc3QudG9hc3RDb250ZW50ID09ICcnKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9hc3QudG9hc3RlckZhY2Vib29rSWQgPSBmYWNlYm9va1VzZXJJZDtcclxuICAgICAgICBhd2FpdCBmZXRjaCgnL2FwaS90b2FzdENvbnRyb2xsZXInLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLCBcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3RvYXN0fSksIFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiB1cGRhdGVUb2FzdCAoKSB7XHJcbiAgICAgICAgaWYgKHRvYXN0LnRvYXN0ZXJOYW1lID09ICcnIHx8IHRvYXN0LnRvYXN0Q29udGVudCA9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBmZXRjaCgnL2FwaS90b2FzdENvbnRyb2xsZXInLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt0b2FzdH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XHJcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvZ0luICgpIHtcclxuICAgICAgICBkaXNwYXRjaChcInRvZ2dsZUxvZ0luXCIpO1xyXG4gICAgfVxyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c2VjdGlvbiBjbGFzcz0ncHJvcG9zZSc+XHJcbiAgICA8U2VjdGlvbkhlYWRlciB0aXRsZT17aXNFZGl0dGluZ1RvYXN0ID8gJ0VkaXR0aW5nIFRvYXN0Li4uJyA6ICdQcm9wb3NlIGEgVG9hc3QnfS8+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz0nZm9ybS1lbGVtZW50JyB0eXBlPSd0ZXh0JyBkaXNhYmxlZD17IWlzTG9nZ2VkSW59IHBsYWNlaG9sZGVyPSdOYW1lJyBiaW5kOnZhbHVlPXt0b2FzdC50b2FzdGVyTmFtZX0vPlxyXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPSdmb3JtLWVsZW1lbnQnIGRpc2FibGVkPXshaXNMb2dnZWRJbn0gYmluZDp2YWx1ZT17dG9hc3QudG9hc3RlclJlbGF0aW9uc2hpcH0+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbj5TZWxlY3QgUmVsYXRpb25zaGlwPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdGYXRoZXInPkZhdGhlcjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nTW90aGVyJz5Nb3RoZXI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0Jyb3RoZXInPkJyb3RoZXI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J1Npc3Rlcic+U2lzdGVyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdTb24nPlNvbjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nRGF1Z2h0ZXInPkRhdWdodGVyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdSZWxhdGl2ZSc+UmVsYXRpdmU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0ZyaWVuZCc+RnJpZW5kPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDxwPm9mIHRoZTwvcD5cclxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz0nZm9ybS1lbGVtZW50JyBkaXNhYmxlZD17IWlzTG9nZ2VkSW59IGJpbmQ6dmFsdWU9e3RvYXN0LnRvYXN0ZXJBc3NvY2lhdGlvbn0+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbj5TZWxlY3QgQnJpZGUgb3IgR3Jvb208L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0dyb29tJz5Hcm9vbTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQnJpZGUnPkJyaWRlPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz0nZm9ybS1lbGVtZW50JyBkaXNhYmxlZD17IWlzTG9nZ2VkSW59IGJpbmQ6dmFsdWU9e3RvYXN0LnRvYXN0Q29udGVudH0gcm93cz17N30gcGxhY2Vob2xkZXI9J1RvYXN0Jz48L3RleHRhcmVhPlxyXG4gICAgICAgIHsjaWYgIWlzTG9nZ2VkSW59XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2ZhY2Vib29rLWJ1dHRvbicgb246Y2xpY2s9e2xvZ0lufT5Mb2cgaW4gd2l0aCBGYWNlYm9vayB0byBQcm9wb3NlPC9idXR0b24+XHJcbiAgICAgICAgey9pZn1cclxuICAgICAgICB7I2lmIGlzTG9nZ2VkSW59XHJcbiAgICAgICAgICAgIHsjaWYgaXNFZGl0dGluZ1RvYXN0fVxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0ncHJvcG9zZS1idXR0b24nIG9uOmNsaWNrPXt1cGRhdGVUb2FzdH0+VXBkYXRlITwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7OmVsc2V9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSdwcm9wb3NlLWJ1dHRvbicgb246Y2xpY2s9e3Byb3Bvc2VUb2FzdH0+UHJvcG9zZSE8L2J1dHRvbj5cclxuICAgICAgICAgICAgey9pZn1cclxuICAgICAgICB7L2lmfVxyXG4gICAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuXHJcbjxzdHlsZSBsYW5nPSdzY3NzJz5cclxuICAgIEBpbXBvcnQgJy4uLy4uLy4uL3N0YXRpYy90aGVtZS5zY3NzJztcclxuICAgIDo6cGxhY2Vob2xkZXIge1xyXG4gICAgICAgIGNvbG9yOiBibGFjaztcclxuICAgIH1cclxuXHJcbiAgICA6ZGlzYWJsZWQge1xyXG4gICAgICAgIG9wYWNpdHk6IC41O1xyXG4gICAgfVxyXG5cclxuICAgIGRpdiB7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAkYWNjZW50LWNvbG9yLWdyZWVuO1xyXG4gICAgfVxyXG5cclxuICAgIC5mb3JtLWVsZW1lbnQge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICRhY2NlbnQtY29sb3ItZ3JlZW4gIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICBjb2xvcjogJGFjY2VudC1jb2xvci1jcmVhbTtcclxuICAgICAgICBwYWRkaW5nOiA2cHggMzJweDtcclxuICAgIH1cclxuXHJcbiAgICAuZmFjZWJvb2stYnV0dG9uIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzU3OGU1O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9wb3NlLWJ1dHRvbiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjY2VudC1jb2xvci1ncmVlbjtcclxuICAgIH1cclxuPC9zdHlsZT4iLCJpbXBvcnQgeyBub29wLCBzYWZlX25vdF9lcXVhbCwgc3Vic2NyaWJlLCBydW5fYWxsLCBpc19mdW5jdGlvbiB9IGZyb20gJy4uL2ludGVybmFsJztcbmV4cG9ydCB7IGdldF9zdG9yZV92YWx1ZSBhcyBnZXQgfSBmcm9tICcuLi9pbnRlcm5hbCc7XG5cbmNvbnN0IHN1YnNjcmliZXJfcXVldWUgPSBbXTtcbi8qKlxuICogQ3JlYXRlcyBhIGBSZWFkYWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0gdmFsdWUgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcn1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHJlYWRhYmxlKHZhbHVlLCBzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogd3JpdGFibGUodmFsdWUsIHN0YXJ0KS5zdWJzY3JpYmUsXG4gICAgfTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgYFdyaXRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyBib3RoIHVwZGF0aW5nIGFuZCByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB7Kj19dmFsdWUgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcj19c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICovXG5mdW5jdGlvbiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQgPSBub29wKSB7XG4gICAgbGV0IHN0b3A7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcbiAgICBmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG4gICAgICAgIGlmIChzYWZlX25vdF9lcXVhbCh2YWx1ZSwgbmV3X3ZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXdfdmFsdWU7XG4gICAgICAgICAgICBpZiAoc3RvcCkgeyAvLyBzdG9yZSBpcyByZWFkeVxuICAgICAgICAgICAgICAgIGNvbnN0IHJ1bl9xdWV1ZSA9ICFzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgc1sxXSgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLnB1c2gocywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVuX3F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZVtpXVswXShzdWJzY3JpYmVyX3F1ZXVlW2kgKyAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGUoZm4pIHtcbiAgICAgICAgc2V0KGZuKHZhbHVlKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShydW4sIGludmFsaWRhdGUgPSBub29wKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBbcnVuLCBpbnZhbGlkYXRlXTtcbiAgICAgICAgc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgc3RvcCA9IHN0YXJ0KHNldCkgfHwgbm9vcDtcbiAgICAgICAgfVxuICAgICAgICBydW4odmFsdWUpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdWJzY3JpYmVycy5pbmRleE9mKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgICAgICAgIHN0b3AgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyBzZXQsIHVwZGF0ZSwgc3Vic2NyaWJlIH07XG59XG5mdW5jdGlvbiBkZXJpdmVkKHN0b3JlcywgZm4sIGluaXRpYWxfdmFsdWUpIHtcbiAgICBjb25zdCBzaW5nbGUgPSAhQXJyYXkuaXNBcnJheShzdG9yZXMpO1xuICAgIGNvbnN0IHN0b3Jlc19hcnJheSA9IHNpbmdsZVxuICAgICAgICA/IFtzdG9yZXNdXG4gICAgICAgIDogc3RvcmVzO1xuICAgIGNvbnN0IGF1dG8gPSBmbi5sZW5ndGggPCAyO1xuICAgIHJldHVybiByZWFkYWJsZShpbml0aWFsX3ZhbHVlLCAoc2V0KSA9PiB7XG4gICAgICAgIGxldCBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGxldCBwZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNsZWFudXAgPSBub29wO1xuICAgICAgICBjb25zdCBzeW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbihzaW5nbGUgPyB2YWx1ZXNbMF0gOiB2YWx1ZXMsIHNldCk7XG4gICAgICAgICAgICBpZiAoYXV0bykge1xuICAgICAgICAgICAgICAgIHNldChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IGlzX2Z1bmN0aW9uKHJlc3VsdCkgPyByZXN1bHQgOiBub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZXJzID0gc3RvcmVzX2FycmF5Lm1hcCgoc3RvcmUsIGkpID0+IHN1YnNjcmliZShzdG9yZSwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHBlbmRpbmcgJj0gfigxIDw8IGkpO1xuICAgICAgICAgICAgaWYgKGluaXRlZCkge1xuICAgICAgICAgICAgICAgIHN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgcGVuZGluZyB8PSAoMSA8PCBpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpbml0ZWQgPSB0cnVlO1xuICAgICAgICBzeW5jKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgcnVuX2FsbCh1bnN1YnNjcmliZXJzKTtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgZGVyaXZlZCwgcmVhZGFibGUsIHdyaXRhYmxlIH07XG4iLCI8c2NyaXB0PlxuICAgIGltcG9ydCB7Z2V0RXZlbnRzQWN0aW9ufSBmcm9tICcuL3V0aWxzJztcbiAgICBpbXBvcnQge2ZhZGV9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbiAgICBpbXBvcnQge2N1cnJlbnRfY29tcG9uZW50fSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICAgIFxuICAgIGV4cG9ydCBsZXQgb3BlbiA9IGZhbHNlO1xuXG4gICAgY29uc3QgZXZlbnRzID0gZ2V0RXZlbnRzQWN0aW9uKGN1cnJlbnRfY29tcG9uZW50KTtcblxuICAgIGxldCBpc19oZWFkZXIgPSAkJHByb3BzLiQkc2xvdHMgJiYgJCRwcm9wcy4kJHNsb3RzLmhlYWRlciAhPT0gdW5kZWZpbmVkO1xuICAgIGxldCBpc19mb290ZXIgPSAkJHByb3BzLiQkc2xvdHMgJiYgJCRwcm9wcy4kJHNsb3RzLmZvb3RlciAhPT0gdW5kZWZpbmVkO1xuPC9zY3JpcHQ+XG5cblxueyNpZiBvcGVufVxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHRyYW5zaXRpb246ZmFkZT17eyBkdXJhdGlvbjogMjAwIH19PlxuICAgIDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCIgb246Y2xpY2s9e2UgPT4gb3Blbj1mYWxzZX0vPlxuICAgIDxkaXYgY2xhc3M6bW9kYWw9ezF9IHVzZTpldmVudHMgey4uLiQkcmVzdFByb3BzfT48c2xvdD48L3Nsb3Q+PC9kaXY+XG48L2Rpdj5cbnsvaWZ9XG5cbjxzdHlsZT5cbi5jb250YWluZXJ7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gICAgdG9wOjBweDtcbiAgICBsZWZ0OjBweDtcbiAgICB3aWR0aDoxMDB2dztcbiAgICBoZWlnaHQ6MTAwdmg7XG4gICAgei1pbmRleDoxMDAwMDtcbn1cblxuLmJhY2tncm91bmR7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gICAgdG9wOjBweDtcbiAgICBsZWZ0OiAwcHg7XG4gICAgd2lkdGg6MTAwdnc7XG4gICAgaGVpZ2h0OjEwMHZoO1xuICAgIGJhY2tncm91bmQtY29sb3I6YmxhY2s7XG4gICAgb3BhY2l0eTogMC41O1xufVxuXG4ubW9kYWx7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICBtaW4td2lkdGg6NDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG48L3N0eWxlPlxuIiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz5cclxuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tIFwic3ZlbHRlXCI7XHJcbiAgICBpbXBvcnQgeyBUb2FzdE1vZGVsIH0gZnJvbSAnLi4vX21vZGVscy9Ub2FzdE1vZGVsJztcclxuICAgIGltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJy4vU2VjdGlvbkhlYWRlci5zdmVsdGUnO1xyXG4gICAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcclxuICAgIGltcG9ydCB7TW9kYWx9IGZyb20gJ3N2ZWx0ZS1jaG90YSc7XHJcblxyXG5cdGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XHJcblxyXG5sZXQgb3Blbjpib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgdG9hc3RzOiBUb2FzdE1vZGVsW10gPSBbXTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGxldCBpc0xvZ2dlZEluOiBib29sZWFuO1xyXG4gICAgZXhwb3J0IGxldCBmYWNlYm9va1VzZXJJZDogc3RyaW5nO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzQXV0aG9yKHRvYXN0ZXJGYWNlYm9va0lkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZmFjZWJvb2tVc2VySWQgPT09IHRvYXN0ZXJGYWNlYm9va0lkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRUb2FzdCh0b2FzdCkge1xyXG4gICAgICAgIGRpc3BhdGNoKCdlZGl0VG9hc3QnLCB0b2FzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VudChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgZmV0Y2goJ2FwaS90b2FzdENvbnRyb2xsZXInLCB7IG1ldGhvZDogJ0dFVCcgfSlcclxuICAgICAgICAudGhlbih0b2FzdHMgPT4gdG9hc3RzLmpzb24oKSlcclxuICAgICAgICAudGhlbih0b2FzdHNEYXRhID0+IHtcclxuICAgICAgICAgICAgdG9hc3RzID0gdG9hc3RzRGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVG9hc3QgKHRvYXN0SWQpIHtcclxuICAgICAgICBhd2FpdCBmZXRjaCgnL2FwaS90b2FzdENvbnRyb2xsZXInLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt0b2FzdElkfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn1cclxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSk7XHJcbiAgICB9XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzZWN0aW9uIGNsYXNzPSd0b2FzdHMnPlxyXG4gICAgPFNlY3Rpb25IZWFkZXIgdGl0bGU9eydUb2FzdHMnfS8+XHJcbiAgICA8ZGl2IGNsYXNzPSd0b2FzdHMnPlxyXG4gICAgICAgIHsjZWFjaCB0b2FzdHMgYXMgdG9hc3R9XHJcbiAgICAgICAgICAgIDxwPnt0b2FzdC50b2FzdENvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICA8cD4gLSB7dG9hc3QudG9hc3Rlck5hbWV9LCB7dG9hc3QudG9hc3RlclJlbGF0aW9uc2hpcH0gb2YgdGhlIHt0b2FzdC50b2FzdGVyQXNzb2NpYXRpb259XHJcbiAgICAgICAgICAgIHsjaWYgaXNMb2dnZWRJbiAmJiBpc0F1dGhvcih0b2FzdC50b2FzdGVyRmFjZWJvb2tJZCl9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiB7ZWRpdFRvYXN0KHRvYXN0KX19PkVkaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gb246Y2xpY2s9e2UgPT4gb3Blbj10cnVlfT5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbCBiaW5kOm9wZW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHRvYXN0P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17ZGVsZXRlVG9hc3QodG9hc3QudG9hc3RJZCl9PkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17ZSA9PiBvcGVuPWZhbHNlfT5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgICAgICB7L2lmfVxyXG4gICAgICAgICAgICA8L3A+IFxyXG4gICAgICAgIHsvZWFjaH1cclxuICAgIDwvZGl2PlxyXG48L3NlY3Rpb24+XHJcblxyXG48c3R5bGUgbGFuZz0nc2Nzcyc+ICAgIFxyXG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3RhdGljL3RoZW1lLnNjc3MnO1xyXG4gICAgYnV0dG9uIHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzNzU2Mzc7XHJcbiAgICAgICAgY29sb3I6ICNkZGQ0OTk7XHJcbiAgICAgICAgcGFkZGluZzogNnB4IDEycHg7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2IHtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4IDIwcHggMjBweCAyMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcclxuICAgIH1cclxuPC9zdHlsZT4iLCI8c2NyaXB0IGxhbmc9J3R5cGVzY3JpcHQnPlxyXG4gICAgaW1wb3J0IFRvYXN0Rm9ybSBmcm9tICcuL1RvYXN0Rm9ybS5zdmVsdGUnO1xyXG4gICAgaW1wb3J0IFRvYXN0c0xpc3QgZnJvbSAnLi9Ub2FzdHNMaXN0LnN2ZWx0ZSc7XHJcbiAgICBpbXBvcnQgeyBUb2FzdE1vZGVsIH0gZnJvbSAnLi4vX21vZGVscy9Ub2FzdE1vZGVsJztcclxuICAgIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XHJcblxyXG5cdGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XHJcblxyXG4gICAgZXhwb3J0IGxldCBpc0xvZ2dlZEluOiBib29sZWFuO1xyXG4gICAgZXhwb3J0IGxldCBmYWNlYm9va1VzZXJJZDogc3RyaW5nO1xyXG4gICAgbGV0IGlzRWRpdHRpbmdUb2FzdCA9IGZhbHNlO1xyXG5cclxuICAgIGxldCB0b2FzdDogVG9hc3RNb2RlbCA9IHtcclxuICAgICAgICB0b2FzdElkOiBudWxsLFxyXG4gICAgICAgIHRvYXN0ZXJOYW1lOiAnJyxcclxuICAgICAgICB0b2FzdGVyUmVsYXRpb25zaGlwOiAnJyxcclxuICAgICAgICB0b2FzdGVyQXNzb2NpYXRpb246ICcnLFxyXG4gICAgICAgIHRvYXN0Q29udGVudDogJycsXHJcbiAgICAgICAgdG9hc3RlckZhY2Vib29rSWQ6ICcnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvcndhcmQoKSB7XHJcbiAgICAgICAgZGlzcGF0Y2goJ3RvZ2dsZUxvZ0luJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRpdFRvYXN0KGV2ZW50KSB7XHJcbiAgICAgICAgdG9hc3QgPSB7Li4uZXZlbnQuZGV0YWlsfTtcclxuICAgICAgICBpc0VkaXR0aW5nVG9hc3QgPSB0cnVlO1xyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxUb2FzdHNMaXN0IGZhY2Vib29rVXNlcklkPXtmYWNlYm9va1VzZXJJZH0gaXNMb2dnZWRJbj17aXNMb2dnZWRJbn0gb246ZWRpdFRvYXN0PXtlZGl0VG9hc3R9Lz5cclxuPFRvYXN0Rm9ybSBpc0VkaXR0aW5nVG9hc3Q9e2lzRWRpdHRpbmdUb2FzdH0gdG9hc3Q9e3RvYXN0fSBmYWNlYm9va1VzZXJJZD17ZmFjZWJvb2tVc2VySWR9IGlzTG9nZ2VkSW49e2lzTG9nZ2VkSW59IG9uOnRvZ2dsZUxvZ0luPXtmb3J3YXJkfS8+IiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz5cclxuICAgIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XHJcblxyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcclxuICAgIGxldCBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb2dnbGUoKTogdm9pZCB7XHJcbiAgICAgICAgZGlzcGF0Y2goJ2hhbmRsZVRvZ2dsZScpO1xyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxpbWcgb246Y2xpY2s9e2hhbmRsZVRvZ2dsZX0gc3JjPScuL01lbnVJY29uLnBuZycgYWx0PSdNZW51IEljb24nLz4gICAgIFxyXG5cclxuPHN0eWxlPiAgICBcclxuICAgIGltZyB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHJpZ2h0OiAzMHB4O1xyXG4gICAgICAgIHRvcDogMTcuNXB4O1xyXG4gICAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgICB3aWR0aDogMzBweDtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaW1nOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbjwvc3R5bGU+IiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz5cclxuICAgIGltcG9ydCBPdmVybGF5IGZyb20gJ3N2ZWx0ZS1vdmVybGF5JztcclxuICAgIGltcG9ydCAqIGFzIGFuaW1hdGVTY3JvbGwgZnJvbSAnc3ZlbHRlLXNjcm9sbHRvJztcclxuICAgIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XHJcblxyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcclxuICAgIGV4cG9ydCBsZXQgaXNMb2dnZWRJbjogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBsZXQgaXNPcGVuOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBsb2dPdXQoKSB7XHJcbiAgICAgICAgZGlzcGF0Y2goXCJ0b2dnbGVMb2dJblwiKTtcclxuICAgICAgICBoYW5kbGVTZWN0aW9uU2VsZWN0aW9uKCdob21lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VjdGlvblNlbGVjdGlvbihzZWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgZGlzcGF0Y2goJ2hhbmRsZVRvZ2dsZScpO1xyXG4gICAgICAgIGlmIChzZWN0aW9uID09ICdob21lJykge1xyXG4gICAgICAgICAgICBhbmltYXRlU2Nyb2xsLnNjcm9sbFRvVG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5pbWF0ZVNjcm9sbC5zY3JvbGxUbyh7ZWxlbWVudDogJy4nICsgc2VjdGlvbiwgb2Zmc2V0OiAtNjV9KTtcclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG57I2lmIGlzT3Blbn1cclxuICAgIDxkaXYgY2xhc3M9J21lbnUnPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPGxpIG9uOmNsaWNrPXsoKSA9PiB7aGFuZGxlU2VjdGlvblNlbGVjdGlvbignaG9tZScpfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcnJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Jy4vTWVudUFycm93SWNvbi5wbmcnIGFsdD0nTWVudSBBcnJvdyBJY29uJy8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPkhvbWU8L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpIG9uOmNsaWNrPXsoKSA9PiB7aGFuZGxlU2VjdGlvblNlbGVjdGlvbignc3RvcnknKX19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYXJyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPScuL01lbnVBcnJvd0ljb24ucG5nJyBhbHQ9J01lbnUgQXJyb3cgSWNvbicvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdzZWN0aW9uJz5PdXIgU3Rvcnk8L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpIG9uOmNsaWNrPXsoKSA9PiB7aGFuZGxlU2VjdGlvblNlbGVjdGlvbignY2xhbicpfX0+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYXJyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPScuL01lbnVBcnJvd0ljb24ucG5nJyBhbHQ9J01lbnUgQXJyb3cgSWNvbicvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdzZWN0aW9uJz5PdXIgQ2xhbjwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGkgb246Y2xpY2s9eygpID0+IHtoYW5kbGVTZWN0aW9uU2VsZWN0aW9uKCd0b2FzdHMnKX19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYXJyb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPScuL01lbnVBcnJvd0ljb24ucG5nJyBhbHQ9J01lbnUgQXJyb3cgSWNvbicvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdzZWN0aW9uJz5Ub2FzdHM8L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpIG9uOmNsaWNrPXsoKSA9PiB7aGFuZGxlU2VjdGlvblNlbGVjdGlvbigncHJvcG9zZScpfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhcnJvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9Jy4vTWVudUFycm93SWNvbi5wbmcnIGFsdD0nTWVudSBBcnJvdyBJY29uJy8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPlByb3Bvc2UgYSBUb2FzdDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGkgb246Y2xpY2s9eygpID0+IHtoYW5kbGVTZWN0aW9uU2VsZWN0aW9uKCdibGVuZGVkJyl9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Fycm93Jz5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0nLi9NZW51QXJyb3dJY29uLnBuZycgYWx0PSdNZW51IEFycm93IEljb24nLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nc2VjdGlvbic+QmxlbmRlZCBGYW1pbHk8L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICB7I2lmIGlzTG9nZ2VkSW59XHJcbiAgICAgICAgICAgIDxsaSBvbjpjbGljaz17bG9nT3V0fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Fycm93Jz5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0nLi9NZW51QXJyb3dJY29uLnBuZycgYWx0PSdNZW51IEFycm93IEljb24nLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nc2VjdGlvbic+TG9nIG91dDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIHsvaWZ9XHJcbiAgICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG57L2lmfVxyXG5cclxuPHN0eWxlIGxhbmc9J3Njc3MnPlxyXG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3RhdGljL3RoZW1lLnNjc3MnO1xyXG4gICAgQGltcG9ydCAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVByaW5jZXNzK1NvZmlhJztcclxuICAgIFxyXG4gICAgLm1lbnUge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDY1cHg7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWNjZW50LWNvbG9yLWdyZWVuO1xyXG4gICAgICAgIGNvbG9yOiAkYWNjZW50LWNvbG9yLWNyZWFtO1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTtcclxuICAgIH1cclxuXHJcbiAgICB1bCB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggMCAwIDA7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIGxpOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXItY29sb3I7XHJcbiAgICAgICAgZGl2IHtcclxuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGkge1xyXG4gICAgICAgIGhlaWdodDogMTAlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkaXYge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgICAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMycHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmFycm93IHtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICBpbWcge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlOyBcclxuICAgIH1cclxuXHJcbiAgICAuc2VjdGlvbiB7XHJcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gXHJcbiAgICBhbmQgKG1pbi13aWR0aCA6IDMyMHB4KSBcclxuICAgIGFuZCAobWF4LXdpZHRoIDogNDUwcHgpIHsgIFxyXG4gICAgICAgIC5tZW51IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYXJyb3cge1xyXG4gICAgICAgICAgICB3aWR0aDowJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zZWN0aW9uIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW5cclxuICAgIGFuZCAobWluLXdpZHRoIDogNDUxcHgpIHtcclxuICAgICAgICAubWVudSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyNSU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYXJyb3cge1xyXG4gICAgICAgICAgICB3aWR0aDo2LjI1JTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zZWN0aW9uIHtcclxuICAgICAgICAgICAgd2lkdGg6IDkzLjc1JTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc3R5bGU+IiwiPHNjcmlwdCBsYW5nPSd0eXBlc2NyaXB0Jz5cclxuICAgIGltcG9ydCBNZW51SWNvbiBmcm9tICcuL01lbnVJY29uLnN2ZWx0ZSc7XHJcbiAgICBpbXBvcnQgTWVudSBmcm9tICcuL01lbnUuc3ZlbHRlJztcclxuICAgIGltcG9ydCAqIGFzIHF1ZXJ5U3RyaW5nIGZyb20gJ3F1ZXJ5LXN0cmluZyc7XHJcblx0aW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcclxuXHJcblx0Y29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcclxuXHJcbiAgICBleHBvcnQgbGV0IGlzTG9nZ2VkSW46IGJvb2xlYW47XHJcbiAgICBsZXQgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcclxuXHRcdGRpc3BhdGNoKCd0b2dnbGVMb2dJbicpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb2dnbGUoKSB7XHJcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlbjtcclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48ZGl2PlxyXG4gICAgPHA+I2JsYW1laXRvbmZhdGU8L3A+XHJcbiAgICA8TWVudUljb24gb246aGFuZGxlVG9nZ2xlPXtoYW5kbGVUb2dnbGV9IGlzT3Blbj17aXNPcGVufS8+XHJcbiAgICA8TWVudSBvbjpoYW5kbGVUb2dnbGU9e2hhbmRsZVRvZ2dsZX0gaXNMb2dnZWRJbj17aXNMb2dnZWRJbn0gb246dG9nZ2xlTG9nSW49e2ZvcndhcmR9IGlzT3Blbj17aXNPcGVufS8+XHJcbjwvZGl2PlxyXG5cclxuPHN0eWxlIGxhbmc9J3Njc3MnPlxyXG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc3RhdGljL3RoZW1lLnNjc3MnO1xyXG4gICAgXHJcbiAgICAqIHtcclxuICAgICAgICB6LWluZGV4OiA5OTk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRpdiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjY2VudC1jb2xvci1ncmVlbjtcclxuICAgICAgICBoZWlnaHQ6IDY1cHg7XHJcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4cHgpICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwIHtcclxuICAgICAgICBjb2xvcjogJGFjY2VudC1jb2xvci1jcmVhbTtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAxNy41cHggMCAwIDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIFxyXG4gICAgYW5kIChtaW4td2lkdGggOiAzMjBweCkgXHJcbiAgICBhbmQgKG1heC13aWR0aCA6IDQ1MHB4KSB7ICAgXHJcbiAgICAgICAgZGl2IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlblxyXG4gICAgYW5kIChtaW4td2lkdGggOiA0NTFweCkge1xyXG4gICAgICAgIGRpdiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zdHlsZT4iLCI8c2NyaXB0IGxhbmc9J3R5cGVzY3JpcHQnPlxyXG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XHJcbiAgICBpbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICcuL19jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIuc3ZlbHRlJztcclxuICAgIGltcG9ydCBKdW1ib3Ryb24gZnJvbSAnLi9fY29tcG9uZW50cy9KdW1ib3Ryb24uc3ZlbHRlJztcclxuICAgIGltcG9ydCBTdG9yeSBmcm9tICcuL19jb21wb25lbnRzL1N0b3J5LnN2ZWx0ZSc7XHJcbiAgICBpbXBvcnQgQmxlbmRlZCBmcm9tICcuL19jb21wb25lbnRzL0JsZW5kZWQuc3ZlbHRlJztcclxuICAgIGltcG9ydCBDbGFuIGZyb20gJy4vX2NvbXBvbmVudHMvQ2xhbi5zdmVsdGUnO1xyXG4gICAgaW1wb3J0IFRvYXN0cyBmcm9tICcuL19jb21wb25lbnRzL1RvYXN0cy5zdmVsdGUnO1xyXG4gICAgaW1wb3J0IE5hdiBmcm9tICcuL19jb21wb25lbnRzL05hdi5zdmVsdGUnO1xyXG5cclxuICAgIGRlY2xhcmUgY29uc3QgRkI6IGFueTtcclxuICAgIGxldCBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgZmFjZWJvb2tVc2VySWQ6IHN0cmluZztcclxuXHJcbiAgICBvbk1vdW50KCAoKSA9PiB7XHJcbiAgICAgICAgICAgIEZCLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgYXBwSWQgICAgICA6ICc3NzgwNTg0MzMwMDM0MzQnLFxyXG4gICAgICAgICAgICAgICAgY29va2llICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB4ZmJtbCAgICAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZlcnNpb24gICAgOiAndjcuMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBGQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaXNMb2dnZWRJbiA9IChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGZhY2Vib29rVXNlcklkID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRDtcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVMb2dJbigpIHtcclxuICAgICAgICBpZiAoaXNGYWNlYm9va0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIEZCLmxvZ291dChmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZmFjZWJvb2tVc2VySWQgPSAnJztcclxuICAgICAgICAgICAgICAgIGlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEZCLmxvZ2luKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWNlYm9va1VzZXJJZCA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZS51c2VySUQ7XHJcbiAgICAgICAgICAgICAgICBpc0xvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNGYWNlYm9va0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBGQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXNDb25uZWN0ZWQ7XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG48TmF2IGlzTG9nZ2VkSW49e2lzTG9nZ2VkSW59IG9uOnRvZ2dsZUxvZ0luPXt0b2dnbGVMb2dJbn0vPlxyXG48ZGl2IGNsYXNzPSd3cmFwcGVyJz5cclxuICAgIDxkaXY+PGltZyBzcmM9J1BhZ2VMZWZ0RGVjb3JhdG9yLnBuZycgYWx0PSdkZWNvcmF0aW9uJyBjbGFzcz0nbGVmdCBwYWdlRGVjb3JhdG9yJz48L2Rpdj5cclxuPGRpdiBjbGFzcz0nY29udGVudCc+XHJcbiAgICA8SnVtYm90cm9uIC8+XHJcbiAgICA8U3RvcnkgLz5cclxuICAgIDxDbGFuIC8+XHJcbiAgICA8VG9hc3RzIGlzTG9nZ2VkSW49e2lzTG9nZ2VkSW59IGZhY2Vib29rVXNlcklkPXtmYWNlYm9va1VzZXJJZH0gb246dG9nZ2xlTG9nSW49e3RvZ2dsZUxvZ0lufS8+XHJcbiAgICA8QmxlbmRlZCAvPlxyXG48L2Rpdj5cclxuPGRpdj48aW1nIHNyYz0nUGFnZVJpZ2h0RGVjb3JhdG9yLnBuZycgYWx0PSdkZWNvcmF0aW9uJyBjbGFzcz0ncmlnaHQgcGFnZURlY29yYXRvcic+PC9kaXY+XHJcbjwvZGl2PjxzdHlsZSBnbG9iYWwgbGFuZz0nc2Nzcyc+XHJcbiAgICBAaW1wb3J0ICcuLi8uLi9zdGF0aWMvZ2xvYmFsLnNjc3MnO1xyXG5cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBcclxuICAgIGFuZCAobWluLXdpZHRoIDogMzIwcHgpIFxyXG4gICAgYW5kIChtYXgtd2lkdGggOiAxMTAwcHgpIHsgICBcclxuICAgICAgICAucGFnZURlY29yYXRvciB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICAgICAgICAgIHdpZHRoOiAwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwJTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC53cmFwcGVyIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMCUgMTAwJSAwJTtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogNjVweDtcclxuICAgICAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuXHJcbiAgICBhbmQgKG1pbi13aWR0aCA6IDExMDFweCkge1xyXG4gICAgICAgIC5wYWdlRGVjb3JhdG9yIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5sZWZ0IHtcclxuICAgICAgICAgICAgdG9wOiA2NXB4O1xyXG4gICAgICAgICAgICBsZWZ0OjBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5yaWdodCB7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMHB4O1xyXG4gICAgICAgICAgICByaWdodDogMThweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC53cmFwcGVyIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUlIDUwJSAyNSU7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDY1cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHggMCAyMHB4IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3N0eWxlPiIsIjxzY3JpcHQ+XG5cdGV4cG9ydCBsZXQgZXJyb3I7XG5cdGV4cG9ydCBsZXQgc3RhdHVzO1xuPC9zY3JpcHQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J31cblx0PHByZT57ZXJyb3Iuc3RhY2t9PC9wcmU+XG57L2lmfSIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmltcG9ydCAqIGFzIHJvdXRlXzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9hcGkvdG9hc3RDb250cm9sbGVyLnRzXCI7XG5pbXBvcnQgY29tcG9uZW50XzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCByb290IGZyb20gXCIuL2xheW91dC5zdmVsdGVcIjtcbmltcG9ydCBlcnJvciBmcm9tIFwiLi9lcnJvci5zdmVsdGVcIjtcblxuY29uc3QgZCA9IGRlY29kZVVSSUNvbXBvbmVudDtcblxuZXhwb3J0IGNvbnN0IG1hbmlmZXN0ID0ge1xuXHRzZXJ2ZXJfcm91dGVzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gYXBpL3RvYXN0Q29udHJvbGxlci50c1xuXHRcdFx0cGF0dGVybjogL15cXC9hcGlcXC90b2FzdENvbnRyb2xsZXJcXC8/JC8sXG5cdFx0XHRoYW5kbGVyczogcm91dGVfMCxcblx0XHRcdHBhcmFtczogKCkgPT4gKHt9KVxuXHRcdH1cblx0XSxcblxuXHRwYWdlczogW1xuXHRcdHtcblx0XHRcdC8vIGluZGV4LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJpbmRleFwiLCBmaWxlOiBcImluZGV4LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8wIH1cblx0XHRcdF1cblx0XHR9XG5cdF0sXG5cblx0cm9vdCxcblx0cm9vdF9wcmVsb2FkOiAoKSA9PiB7fSxcblx0ZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZF9kaXIgPSBcIl9fc2FwcGVyX18vZGV2XCI7XG5cbmV4cG9ydCBjb25zdCBzcmNfZGlyID0gXCJzcmNcIjtcblxuZXhwb3J0IGNvbnN0IGRldiA9IHRydWU7IiwiaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9LRVkgPSB7fTtcblxuZXhwb3J0IGNvbnN0IHByZWxvYWQgPSAoKSA9PiAoe30pOyIsIjwhLS0gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQsIGFmdGVyVXBkYXRlIH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi9sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4vZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cdGV4cG9ydCBsZXQgbm90aWZ5O1xuXG5cdGFmdGVyVXBkYXRlKG5vdGlmeSk7XG5cdHNldENvbnRleHQoQ09OVEVYVF9LRVksIHN0b3Jlcyk7XG48L3NjcmlwdD5cblxuPExheW91dCBzZWdtZW50PVwie3NlZ21lbnRzWzBdfVwiIHsuLi5sZXZlbDAucHJvcHN9PlxuXHR7I2lmIGVycm9yfVxuXHRcdDxFcnJvciB7ZXJyb3J9IHtzdGF0dXN9Lz5cblx0ezplbHNlfVxuXHRcdDxzdmVsdGU6Y29tcG9uZW50IHRoaXM9XCJ7bGV2ZWwxLmNvbXBvbmVudH1cIiB7Li4ubGV2ZWwxLnByb3BzfS8+XG5cdHsvaWZ9XG48L0xheW91dD4iLCJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZXYsIGJ1aWxkX2Rpciwgc3JjX2RpciwgbWFuaWZlc3QgfSBmcm9tICcuL2ludGVybmFsL21hbmlmZXN0LXNlcnZlcic7XG5pbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5pbXBvcnQgU3RyZWFtIGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgemxpYiBmcm9tICd6bGliJztcbmltcG9ydCBBcHAgZnJvbSAnLi9pbnRlcm5hbC9BcHAuc3ZlbHRlJztcblxuLyoqXG4gKiBAcGFyYW0gdHlwZU1hcCBbT2JqZWN0XSBNYXAgb2YgTUlNRSB0eXBlIC0+IEFycmF5W2V4dGVuc2lvbnNdXG4gKiBAcGFyYW0gLi4uXG4gKi9cbmZ1bmN0aW9uIE1pbWUoKSB7XG4gIHRoaXMuX3R5cGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fZXh0ZW5zaW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLmRlZmluZShhcmd1bWVudHNbaV0pO1xuICB9XG5cbiAgdGhpcy5kZWZpbmUgPSB0aGlzLmRlZmluZS5iaW5kKHRoaXMpO1xuICB0aGlzLmdldFR5cGUgPSB0aGlzLmdldFR5cGUuYmluZCh0aGlzKTtcbiAgdGhpcy5nZXRFeHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbi5iaW5kKHRoaXMpO1xufVxuXG4vKipcbiAqIERlZmluZSBtaW1ldHlwZSAtPiBleHRlbnNpb24gbWFwcGluZ3MuICBFYWNoIGtleSBpcyBhIG1pbWUtdHlwZSB0aGF0IG1hcHNcbiAqIHRvIGFuIGFycmF5IG9mIGV4dGVuc2lvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSB0eXBlLiAgVGhlIGZpcnN0IGV4dGVuc2lvbiBpc1xuICogdXNlZCBhcyB0aGUgZGVmYXVsdCBleHRlbnNpb24gZm9yIHRoZSB0eXBlLlxuICpcbiAqIGUuZy4gbWltZS5kZWZpbmUoeydhdWRpby9vZ2cnLCBbJ29nYScsICdvZ2cnLCAnc3B4J119KTtcbiAqXG4gKiBJZiBhIHR5cGUgZGVjbGFyZXMgYW4gZXh0ZW5zaW9uIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLCBhbiBlcnJvciB3aWxsXG4gKiBiZSB0aHJvd24uICBUbyBzdXBwcmVzcyB0aGlzIGVycm9yIGFuZCBmb3JjZSB0aGUgZXh0ZW5zaW9uIHRvIGJlIGFzc29jaWF0ZWRcbiAqIHdpdGggdGhlIG5ldyB0eXBlLCBwYXNzIGBmb3JjZWA9dHJ1ZS4gIEFsdGVybmF0aXZlbHksIHlvdSBtYXkgcHJlZml4IHRoZVxuICogZXh0ZW5zaW9uIHdpdGggXCIqXCIgdG8gbWFwIHRoZSB0eXBlIHRvIGV4dGVuc2lvbiwgd2l0aG91dCBtYXBwaW5nIHRoZVxuICogZXh0ZW5zaW9uIHRvIHRoZSB0eXBlLlxuICpcbiAqIGUuZy4gbWltZS5kZWZpbmUoeydhdWRpby93YXYnLCBbJ3dhdiddfSwgeydhdWRpby94LXdhdicsIFsnKndhdiddfSk7XG4gKlxuICpcbiAqIEBwYXJhbSBtYXAgKE9iamVjdCkgdHlwZSBkZWZpbml0aW9uc1xuICogQHBhcmFtIGZvcmNlIChCb29sZWFuKSBpZiB0cnVlLCBmb3JjZSBvdmVycmlkaW5nIG9mIGV4aXN0aW5nIGRlZmluaXRpb25zXG4gKi9cbk1pbWUucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uKHR5cGVNYXAsIGZvcmNlKSB7XG4gIGZvciAodmFyIHR5cGUgaW4gdHlwZU1hcCkge1xuICAgIHZhciBleHRlbnNpb25zID0gdHlwZU1hcFt0eXBlXS5tYXAoZnVuY3Rpb24odCkge3JldHVybiB0LnRvTG93ZXJDYXNlKCl9KTtcbiAgICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXh0ID0gZXh0ZW5zaW9uc1tpXTtcblxuICAgICAgLy8gJyonIHByZWZpeCA9IG5vdCB0aGUgcHJlZmVycmVkIHR5cGUgZm9yIHRoaXMgZXh0ZW5zaW9uLiAgU28gZml4dXAgdGhlXG4gICAgICAvLyBleHRlbnNpb24sIGFuZCBza2lwIGl0LlxuICAgICAgaWYgKGV4dFswXSA9PSAnKicpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZm9yY2UgJiYgKGV4dCBpbiB0aGlzLl90eXBlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdBdHRlbXB0IHRvIGNoYW5nZSBtYXBwaW5nIGZvciBcIicgKyBleHQgK1xuICAgICAgICAgICdcIiBleHRlbnNpb24gZnJvbSBcIicgKyB0aGlzLl90eXBlc1tleHRdICsgJ1wiIHRvIFwiJyArIHR5cGUgK1xuICAgICAgICAgICdcIi4gUGFzcyBgZm9yY2U9dHJ1ZWAgdG8gYWxsb3cgdGhpcywgb3RoZXJ3aXNlIHJlbW92ZSBcIicgKyBleHQgK1xuICAgICAgICAgICdcIiBmcm9tIHRoZSBsaXN0IG9mIGV4dGVuc2lvbnMgZm9yIFwiJyArIHR5cGUgKyAnXCIuJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90eXBlc1tleHRdID0gdHlwZTtcbiAgICB9XG5cbiAgICAvLyBVc2UgZmlyc3QgZXh0ZW5zaW9uIGFzIGRlZmF1bHRcbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMuX2V4dGVuc2lvbnNbdHlwZV0pIHtcbiAgICAgIHZhciBleHQgPSBleHRlbnNpb25zWzBdO1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uc1t0eXBlXSA9IChleHRbMF0gIT0gJyonKSA/IGV4dCA6IGV4dC5zdWJzdHIoMSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIExvb2t1cCBhIG1pbWUgdHlwZSBiYXNlZCBvbiBleHRlbnNpb25cbiAqL1xuTWltZS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcGF0aCA9IFN0cmluZyhwYXRoKTtcbiAgdmFyIGxhc3QgPSBwYXRoLnJlcGxhY2UoL14uKlsvXFxcXF0vLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGV4dCA9IGxhc3QucmVwbGFjZSgvXi4qXFwuLywgJycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIGhhc1BhdGggPSBsYXN0Lmxlbmd0aCA8IHBhdGgubGVuZ3RoO1xuICB2YXIgaGFzRG90ID0gZXh0Lmxlbmd0aCA8IGxhc3QubGVuZ3RoIC0gMTtcblxuICByZXR1cm4gKGhhc0RvdCB8fCAhaGFzUGF0aCkgJiYgdGhpcy5fdHlwZXNbZXh0XSB8fCBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZmlsZSBleHRlbnNpb24gYXNzb2NpYXRlZCB3aXRoIGEgbWltZSB0eXBlXG4gKi9cbk1pbWUucHJvdG90eXBlLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdHlwZSA9IC9eXFxzKihbXjtcXHNdKikvLnRlc3QodHlwZSkgJiYgUmVnRXhwLiQxO1xuICByZXR1cm4gdHlwZSAmJiB0aGlzLl9leHRlbnNpb25zW3R5cGUudG9Mb3dlckNhc2UoKV0gfHwgbnVsbDtcbn07XG5cbnZhciBNaW1lXzEgPSBNaW1lO1xuXG52YXIgc3RhbmRhcmQgPSB7XCJhcHBsaWNhdGlvbi9hbmRyZXctaW5zZXRcIjpbXCJlelwiXSxcImFwcGxpY2F0aW9uL2FwcGxpeHdhcmVcIjpbXCJhd1wiXSxcImFwcGxpY2F0aW9uL2F0b20reG1sXCI6W1wiYXRvbVwiXSxcImFwcGxpY2F0aW9uL2F0b21jYXQreG1sXCI6W1wiYXRvbWNhdFwiXSxcImFwcGxpY2F0aW9uL2F0b21zdmMreG1sXCI6W1wiYXRvbXN2Y1wiXSxcImFwcGxpY2F0aW9uL2Jkb2NcIjpbXCJiZG9jXCJdLFwiYXBwbGljYXRpb24vY2N4bWwreG1sXCI6W1wiY2N4bWxcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLWNhcGFiaWxpdHlcIjpbXCJjZG1pYVwiXSxcImFwcGxpY2F0aW9uL2NkbWktY29udGFpbmVyXCI6W1wiY2RtaWNcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLWRvbWFpblwiOltcImNkbWlkXCJdLFwiYXBwbGljYXRpb24vY2RtaS1vYmplY3RcIjpbXCJjZG1pb1wiXSxcImFwcGxpY2F0aW9uL2NkbWktcXVldWVcIjpbXCJjZG1pcVwiXSxcImFwcGxpY2F0aW9uL2N1LXNlZW1lXCI6W1wiY3VcIl0sXCJhcHBsaWNhdGlvbi9kYXNoK3htbFwiOltcIm1wZFwiXSxcImFwcGxpY2F0aW9uL2Rhdm1vdW50K3htbFwiOltcImRhdm1vdW50XCJdLFwiYXBwbGljYXRpb24vZG9jYm9vayt4bWxcIjpbXCJkYmtcIl0sXCJhcHBsaWNhdGlvbi9kc3NjK2RlclwiOltcImRzc2NcIl0sXCJhcHBsaWNhdGlvbi9kc3NjK3htbFwiOltcInhkc3NjXCJdLFwiYXBwbGljYXRpb24vZWNtYXNjcmlwdFwiOltcImVjbWFcIixcImVzXCJdLFwiYXBwbGljYXRpb24vZW1tYSt4bWxcIjpbXCJlbW1hXCJdLFwiYXBwbGljYXRpb24vZXB1Yit6aXBcIjpbXCJlcHViXCJdLFwiYXBwbGljYXRpb24vZXhpXCI6W1wiZXhpXCJdLFwiYXBwbGljYXRpb24vZm9udC10ZHBmclwiOltcInBmclwiXSxcImFwcGxpY2F0aW9uL2dlbytqc29uXCI6W1wiZ2VvanNvblwiXSxcImFwcGxpY2F0aW9uL2dtbCt4bWxcIjpbXCJnbWxcIl0sXCJhcHBsaWNhdGlvbi9ncHgreG1sXCI6W1wiZ3B4XCJdLFwiYXBwbGljYXRpb24vZ3hmXCI6W1wiZ3hmXCJdLFwiYXBwbGljYXRpb24vZ3ppcFwiOltcImd6XCJdLFwiYXBwbGljYXRpb24vaGpzb25cIjpbXCJoanNvblwiXSxcImFwcGxpY2F0aW9uL2h5cGVyc3R1ZGlvXCI6W1wic3RrXCJdLFwiYXBwbGljYXRpb24vaW5rbWwreG1sXCI6W1wiaW5rXCIsXCJpbmttbFwiXSxcImFwcGxpY2F0aW9uL2lwZml4XCI6W1wiaXBmaXhcIl0sXCJhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmVcIjpbXCJqYXJcIixcIndhclwiLFwiZWFyXCJdLFwiYXBwbGljYXRpb24vamF2YS1zZXJpYWxpemVkLW9iamVjdFwiOltcInNlclwiXSxcImFwcGxpY2F0aW9uL2phdmEtdm1cIjpbXCJjbGFzc1wiXSxcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIjpbXCJqc1wiLFwibWpzXCJdLFwiYXBwbGljYXRpb24vanNvblwiOltcImpzb25cIixcIm1hcFwiXSxcImFwcGxpY2F0aW9uL2pzb241XCI6W1wianNvbjVcIl0sXCJhcHBsaWNhdGlvbi9qc29ubWwranNvblwiOltcImpzb25tbFwiXSxcImFwcGxpY2F0aW9uL2xkK2pzb25cIjpbXCJqc29ubGRcIl0sXCJhcHBsaWNhdGlvbi9sb3N0K3htbFwiOltcImxvc3R4bWxcIl0sXCJhcHBsaWNhdGlvbi9tYWMtYmluaGV4NDBcIjpbXCJocXhcIl0sXCJhcHBsaWNhdGlvbi9tYWMtY29tcGFjdHByb1wiOltcImNwdFwiXSxcImFwcGxpY2F0aW9uL21hZHMreG1sXCI6W1wibWFkc1wiXSxcImFwcGxpY2F0aW9uL21hbmlmZXN0K2pzb25cIjpbXCJ3ZWJtYW5pZmVzdFwiXSxcImFwcGxpY2F0aW9uL21hcmNcIjpbXCJtcmNcIl0sXCJhcHBsaWNhdGlvbi9tYXJjeG1sK3htbFwiOltcIm1yY3hcIl0sXCJhcHBsaWNhdGlvbi9tYXRoZW1hdGljYVwiOltcIm1hXCIsXCJuYlwiLFwibWJcIl0sXCJhcHBsaWNhdGlvbi9tYXRobWwreG1sXCI6W1wibWF0aG1sXCJdLFwiYXBwbGljYXRpb24vbWJveFwiOltcIm1ib3hcIl0sXCJhcHBsaWNhdGlvbi9tZWRpYXNlcnZlcmNvbnRyb2wreG1sXCI6W1wibXNjbWxcIl0sXCJhcHBsaWNhdGlvbi9tZXRhbGluayt4bWxcIjpbXCJtZXRhbGlua1wiXSxcImFwcGxpY2F0aW9uL21ldGFsaW5rNCt4bWxcIjpbXCJtZXRhNFwiXSxcImFwcGxpY2F0aW9uL21ldHMreG1sXCI6W1wibWV0c1wiXSxcImFwcGxpY2F0aW9uL21vZHMreG1sXCI6W1wibW9kc1wiXSxcImFwcGxpY2F0aW9uL21wMjFcIjpbXCJtMjFcIixcIm1wMjFcIl0sXCJhcHBsaWNhdGlvbi9tcDRcIjpbXCJtcDRzXCIsXCJtNHBcIl0sXCJhcHBsaWNhdGlvbi9tc3dvcmRcIjpbXCJkb2NcIixcImRvdFwiXSxcImFwcGxpY2F0aW9uL214ZlwiOltcIm14ZlwiXSxcImFwcGxpY2F0aW9uL24tcXVhZHNcIjpbXCJucVwiXSxcImFwcGxpY2F0aW9uL24tdHJpcGxlc1wiOltcIm50XCJdLFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI6W1wiYmluXCIsXCJkbXNcIixcImxyZlwiLFwibWFyXCIsXCJzb1wiLFwiZGlzdFwiLFwiZGlzdHpcIixcInBrZ1wiLFwiYnBrXCIsXCJkdW1wXCIsXCJlbGNcIixcImRlcGxveVwiLFwiZXhlXCIsXCJkbGxcIixcImRlYlwiLFwiZG1nXCIsXCJpc29cIixcImltZ1wiLFwibXNpXCIsXCJtc3BcIixcIm1zbVwiLFwiYnVmZmVyXCJdLFwiYXBwbGljYXRpb24vb2RhXCI6W1wib2RhXCJdLFwiYXBwbGljYXRpb24vb2VicHMtcGFja2FnZSt4bWxcIjpbXCJvcGZcIl0sXCJhcHBsaWNhdGlvbi9vZ2dcIjpbXCJvZ3hcIl0sXCJhcHBsaWNhdGlvbi9vbWRvYyt4bWxcIjpbXCJvbWRvY1wiXSxcImFwcGxpY2F0aW9uL29uZW5vdGVcIjpbXCJvbmV0b2NcIixcIm9uZXRvYzJcIixcIm9uZXRtcFwiLFwib25lcGtnXCJdLFwiYXBwbGljYXRpb24vb3hwc1wiOltcIm94cHNcIl0sXCJhcHBsaWNhdGlvbi9wYXRjaC1vcHMtZXJyb3IreG1sXCI6W1wieGVyXCJdLFwiYXBwbGljYXRpb24vcGRmXCI6W1wicGRmXCJdLFwiYXBwbGljYXRpb24vcGdwLWVuY3J5cHRlZFwiOltcInBncFwiXSxcImFwcGxpY2F0aW9uL3BncC1zaWduYXR1cmVcIjpbXCJhc2NcIixcInNpZ1wiXSxcImFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcIjpbXCJwcmZcIl0sXCJhcHBsaWNhdGlvbi9wa2NzMTBcIjpbXCJwMTBcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1taW1lXCI6W1wicDdtXCIsXCJwN2NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1zaWduYXR1cmVcIjpbXCJwN3NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzOFwiOltcInA4XCJdLFwiYXBwbGljYXRpb24vcGtpeC1hdHRyLWNlcnRcIjpbXCJhY1wiXSxcImFwcGxpY2F0aW9uL3BraXgtY2VydFwiOltcImNlclwiXSxcImFwcGxpY2F0aW9uL3BraXgtY3JsXCI6W1wiY3JsXCJdLFwiYXBwbGljYXRpb24vcGtpeC1wa2lwYXRoXCI6W1wicGtpcGF0aFwiXSxcImFwcGxpY2F0aW9uL3BraXhjbXBcIjpbXCJwa2lcIl0sXCJhcHBsaWNhdGlvbi9wbHMreG1sXCI6W1wicGxzXCJdLFwiYXBwbGljYXRpb24vcG9zdHNjcmlwdFwiOltcImFpXCIsXCJlcHNcIixcInBzXCJdLFwiYXBwbGljYXRpb24vcHNrYyt4bWxcIjpbXCJwc2tjeG1sXCJdLFwiYXBwbGljYXRpb24vcmFtbCt5YW1sXCI6W1wicmFtbFwiXSxcImFwcGxpY2F0aW9uL3JkZit4bWxcIjpbXCJyZGZcIixcIm93bFwiXSxcImFwcGxpY2F0aW9uL3JlZ2luZm8reG1sXCI6W1wicmlmXCJdLFwiYXBwbGljYXRpb24vcmVsYXgtbmctY29tcGFjdC1zeW50YXhcIjpbXCJybmNcIl0sXCJhcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cyt4bWxcIjpbXCJybFwiXSxcImFwcGxpY2F0aW9uL3Jlc291cmNlLWxpc3RzLWRpZmYreG1sXCI6W1wicmxkXCJdLFwiYXBwbGljYXRpb24vcmxzLXNlcnZpY2VzK3htbFwiOltcInJzXCJdLFwiYXBwbGljYXRpb24vcnBraS1naG9zdGJ1c3RlcnNcIjpbXCJnYnJcIl0sXCJhcHBsaWNhdGlvbi9ycGtpLW1hbmlmZXN0XCI6W1wibWZ0XCJdLFwiYXBwbGljYXRpb24vcnBraS1yb2FcIjpbXCJyb2FcIl0sXCJhcHBsaWNhdGlvbi9yc2QreG1sXCI6W1wicnNkXCJdLFwiYXBwbGljYXRpb24vcnNzK3htbFwiOltcInJzc1wiXSxcImFwcGxpY2F0aW9uL3J0ZlwiOltcInJ0ZlwiXSxcImFwcGxpY2F0aW9uL3NibWwreG1sXCI6W1wic2JtbFwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVxdWVzdFwiOltcInNjcVwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVzcG9uc2VcIjpbXCJzY3NcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlcXVlc3RcIjpbXCJzcHFcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlc3BvbnNlXCI6W1wic3BwXCJdLFwiYXBwbGljYXRpb24vc2RwXCI6W1wic2RwXCJdLFwiYXBwbGljYXRpb24vc2V0LXBheW1lbnQtaW5pdGlhdGlvblwiOltcInNldHBheVwiXSxcImFwcGxpY2F0aW9uL3NldC1yZWdpc3RyYXRpb24taW5pdGlhdGlvblwiOltcInNldHJlZ1wiXSxcImFwcGxpY2F0aW9uL3NoZit4bWxcIjpbXCJzaGZcIl0sXCJhcHBsaWNhdGlvbi9zaWV2ZVwiOltcInNpdlwiLFwic2lldmVcIl0sXCJhcHBsaWNhdGlvbi9zbWlsK3htbFwiOltcInNtaVwiLFwic21pbFwiXSxcImFwcGxpY2F0aW9uL3NwYXJxbC1xdWVyeVwiOltcInJxXCJdLFwiYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMreG1sXCI6W1wic3J4XCJdLFwiYXBwbGljYXRpb24vc3Jnc1wiOltcImdyYW1cIl0sXCJhcHBsaWNhdGlvbi9zcmdzK3htbFwiOltcImdyeG1sXCJdLFwiYXBwbGljYXRpb24vc3J1K3htbFwiOltcInNydVwiXSxcImFwcGxpY2F0aW9uL3NzZGwreG1sXCI6W1wic3NkbFwiXSxcImFwcGxpY2F0aW9uL3NzbWwreG1sXCI6W1wic3NtbFwiXSxcImFwcGxpY2F0aW9uL3RlaSt4bWxcIjpbXCJ0ZWlcIixcInRlaWNvcnB1c1wiXSxcImFwcGxpY2F0aW9uL3RocmF1ZCt4bWxcIjpbXCJ0ZmlcIl0sXCJhcHBsaWNhdGlvbi90aW1lc3RhbXBlZC1kYXRhXCI6W1widHNkXCJdLFwiYXBwbGljYXRpb24vdm9pY2V4bWwreG1sXCI6W1widnhtbFwiXSxcImFwcGxpY2F0aW9uL3dhc21cIjpbXCJ3YXNtXCJdLFwiYXBwbGljYXRpb24vd2lkZ2V0XCI6W1wid2d0XCJdLFwiYXBwbGljYXRpb24vd2luaGxwXCI6W1wiaGxwXCJdLFwiYXBwbGljYXRpb24vd3NkbCt4bWxcIjpbXCJ3c2RsXCJdLFwiYXBwbGljYXRpb24vd3Nwb2xpY3kreG1sXCI6W1wid3Nwb2xpY3lcIl0sXCJhcHBsaWNhdGlvbi94YW1sK3htbFwiOltcInhhbWxcIl0sXCJhcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXCI6W1wieGRmXCJdLFwiYXBwbGljYXRpb24veGVuYyt4bWxcIjpbXCJ4ZW5jXCJdLFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI6W1wieGh0bWxcIixcInhodFwiXSxcImFwcGxpY2F0aW9uL3htbFwiOltcInhtbFwiLFwieHNsXCIsXCJ4c2RcIixcInJuZ1wiXSxcImFwcGxpY2F0aW9uL3htbC1kdGRcIjpbXCJkdGRcIl0sXCJhcHBsaWNhdGlvbi94b3AreG1sXCI6W1wieG9wXCJdLFwiYXBwbGljYXRpb24veHByb2MreG1sXCI6W1wieHBsXCJdLFwiYXBwbGljYXRpb24veHNsdCt4bWxcIjpbXCJ4c2x0XCJdLFwiYXBwbGljYXRpb24veHNwZit4bWxcIjpbXCJ4c3BmXCJdLFwiYXBwbGljYXRpb24veHYreG1sXCI6W1wibXhtbFwiLFwieGh2bWxcIixcInh2bWxcIixcInh2bVwiXSxcImFwcGxpY2F0aW9uL3lhbmdcIjpbXCJ5YW5nXCJdLFwiYXBwbGljYXRpb24veWluK3htbFwiOltcInlpblwiXSxcImFwcGxpY2F0aW9uL3ppcFwiOltcInppcFwiXSxcImF1ZGlvLzNncHBcIjpbXCIqM2dwcFwiXSxcImF1ZGlvL2FkcGNtXCI6W1wiYWRwXCJdLFwiYXVkaW8vYmFzaWNcIjpbXCJhdVwiLFwic25kXCJdLFwiYXVkaW8vbWlkaVwiOltcIm1pZFwiLFwibWlkaVwiLFwia2FyXCIsXCJybWlcIl0sXCJhdWRpby9tcDNcIjpbXCIqbXAzXCJdLFwiYXVkaW8vbXA0XCI6W1wibTRhXCIsXCJtcDRhXCJdLFwiYXVkaW8vbXBlZ1wiOltcIm1wZ2FcIixcIm1wMlwiLFwibXAyYVwiLFwibXAzXCIsXCJtMmFcIixcIm0zYVwiXSxcImF1ZGlvL29nZ1wiOltcIm9nYVwiLFwib2dnXCIsXCJzcHhcIl0sXCJhdWRpby9zM21cIjpbXCJzM21cIl0sXCJhdWRpby9zaWxrXCI6W1wic2lsXCJdLFwiYXVkaW8vd2F2XCI6W1wid2F2XCJdLFwiYXVkaW8vd2F2ZVwiOltcIip3YXZcIl0sXCJhdWRpby93ZWJtXCI6W1wid2ViYVwiXSxcImF1ZGlvL3htXCI6W1wieG1cIl0sXCJmb250L2NvbGxlY3Rpb25cIjpbXCJ0dGNcIl0sXCJmb250L290ZlwiOltcIm90ZlwiXSxcImZvbnQvdHRmXCI6W1widHRmXCJdLFwiZm9udC93b2ZmXCI6W1wid29mZlwiXSxcImZvbnQvd29mZjJcIjpbXCJ3b2ZmMlwiXSxcImltYWdlL2FjZXNcIjpbXCJleHJcIl0sXCJpbWFnZS9hcG5nXCI6W1wiYXBuZ1wiXSxcImltYWdlL2JtcFwiOltcImJtcFwiXSxcImltYWdlL2NnbVwiOltcImNnbVwiXSxcImltYWdlL2RpY29tLXJsZVwiOltcImRybGVcIl0sXCJpbWFnZS9lbWZcIjpbXCJlbWZcIl0sXCJpbWFnZS9maXRzXCI6W1wiZml0c1wiXSxcImltYWdlL2czZmF4XCI6W1wiZzNcIl0sXCJpbWFnZS9naWZcIjpbXCJnaWZcIl0sXCJpbWFnZS9oZWljXCI6W1wiaGVpY1wiXSxcImltYWdlL2hlaWMtc2VxdWVuY2VcIjpbXCJoZWljc1wiXSxcImltYWdlL2hlaWZcIjpbXCJoZWlmXCJdLFwiaW1hZ2UvaGVpZi1zZXF1ZW5jZVwiOltcImhlaWZzXCJdLFwiaW1hZ2UvaWVmXCI6W1wiaWVmXCJdLFwiaW1hZ2UvamxzXCI6W1wiamxzXCJdLFwiaW1hZ2UvanAyXCI6W1wianAyXCIsXCJqcGcyXCJdLFwiaW1hZ2UvanBlZ1wiOltcImpwZWdcIixcImpwZ1wiLFwianBlXCJdLFwiaW1hZ2UvanBtXCI6W1wianBtXCJdLFwiaW1hZ2UvanB4XCI6W1wianB4XCIsXCJqcGZcIl0sXCJpbWFnZS9qeHJcIjpbXCJqeHJcIl0sXCJpbWFnZS9rdHhcIjpbXCJrdHhcIl0sXCJpbWFnZS9wbmdcIjpbXCJwbmdcIl0sXCJpbWFnZS9zZ2lcIjpbXCJzZ2lcIl0sXCJpbWFnZS9zdmcreG1sXCI6W1wic3ZnXCIsXCJzdmd6XCJdLFwiaW1hZ2UvdDM4XCI6W1widDM4XCJdLFwiaW1hZ2UvdGlmZlwiOltcInRpZlwiLFwidGlmZlwiXSxcImltYWdlL3RpZmYtZnhcIjpbXCJ0ZnhcIl0sXCJpbWFnZS93ZWJwXCI6W1wid2VicFwiXSxcImltYWdlL3dtZlwiOltcIndtZlwiXSxcIm1lc3NhZ2UvZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1wiZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCJdLFwibWVzc2FnZS9nbG9iYWxcIjpbXCJ1OG1zZ1wiXSxcIm1lc3NhZ2UvZ2xvYmFsLWRlbGl2ZXJ5LXN0YXR1c1wiOltcInU4ZHNuXCJdLFwibWVzc2FnZS9nbG9iYWwtZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1widThtZG5cIl0sXCJtZXNzYWdlL2dsb2JhbC1oZWFkZXJzXCI6W1widThoZHJcIl0sXCJtZXNzYWdlL3JmYzgyMlwiOltcImVtbFwiLFwibWltZVwiXSxcIm1vZGVsLzNtZlwiOltcIjNtZlwiXSxcIm1vZGVsL2dsdGYranNvblwiOltcImdsdGZcIl0sXCJtb2RlbC9nbHRmLWJpbmFyeVwiOltcImdsYlwiXSxcIm1vZGVsL2lnZXNcIjpbXCJpZ3NcIixcImlnZXNcIl0sXCJtb2RlbC9tZXNoXCI6W1wibXNoXCIsXCJtZXNoXCIsXCJzaWxvXCJdLFwibW9kZWwvc3RsXCI6W1wic3RsXCJdLFwibW9kZWwvdnJtbFwiOltcIndybFwiLFwidnJtbFwiXSxcIm1vZGVsL3gzZCtiaW5hcnlcIjpbXCIqeDNkYlwiLFwieDNkYnpcIl0sXCJtb2RlbC94M2QrZmFzdGluZm9zZXRcIjpbXCJ4M2RiXCJdLFwibW9kZWwveDNkK3ZybWxcIjpbXCIqeDNkdlwiLFwieDNkdnpcIl0sXCJtb2RlbC94M2QreG1sXCI6W1wieDNkXCIsXCJ4M2R6XCJdLFwibW9kZWwveDNkLXZybWxcIjpbXCJ4M2R2XCJdLFwidGV4dC9jYWNoZS1tYW5pZmVzdFwiOltcImFwcGNhY2hlXCIsXCJtYW5pZmVzdFwiXSxcInRleHQvY2FsZW5kYXJcIjpbXCJpY3NcIixcImlmYlwiXSxcInRleHQvY29mZmVlc2NyaXB0XCI6W1wiY29mZmVlXCIsXCJsaXRjb2ZmZWVcIl0sXCJ0ZXh0L2Nzc1wiOltcImNzc1wiXSxcInRleHQvY3N2XCI6W1wiY3N2XCJdLFwidGV4dC9odG1sXCI6W1wiaHRtbFwiLFwiaHRtXCIsXCJzaHRtbFwiXSxcInRleHQvamFkZVwiOltcImphZGVcIl0sXCJ0ZXh0L2pzeFwiOltcImpzeFwiXSxcInRleHQvbGVzc1wiOltcImxlc3NcIl0sXCJ0ZXh0L21hcmtkb3duXCI6W1wibWFya2Rvd25cIixcIm1kXCJdLFwidGV4dC9tYXRobWxcIjpbXCJtbWxcIl0sXCJ0ZXh0L21keFwiOltcIm1keFwiXSxcInRleHQvbjNcIjpbXCJuM1wiXSxcInRleHQvcGxhaW5cIjpbXCJ0eHRcIixcInRleHRcIixcImNvbmZcIixcImRlZlwiLFwibGlzdFwiLFwibG9nXCIsXCJpblwiLFwiaW5pXCJdLFwidGV4dC9yaWNodGV4dFwiOltcInJ0eFwiXSxcInRleHQvcnRmXCI6W1wiKnJ0ZlwiXSxcInRleHQvc2dtbFwiOltcInNnbWxcIixcInNnbVwiXSxcInRleHQvc2hleFwiOltcInNoZXhcIl0sXCJ0ZXh0L3NsaW1cIjpbXCJzbGltXCIsXCJzbG1cIl0sXCJ0ZXh0L3N0eWx1c1wiOltcInN0eWx1c1wiLFwic3R5bFwiXSxcInRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcIjpbXCJ0c3ZcIl0sXCJ0ZXh0L3Ryb2ZmXCI6W1widFwiLFwidHJcIixcInJvZmZcIixcIm1hblwiLFwibWVcIixcIm1zXCJdLFwidGV4dC90dXJ0bGVcIjpbXCJ0dGxcIl0sXCJ0ZXh0L3VyaS1saXN0XCI6W1widXJpXCIsXCJ1cmlzXCIsXCJ1cmxzXCJdLFwidGV4dC92Y2FyZFwiOltcInZjYXJkXCJdLFwidGV4dC92dHRcIjpbXCJ2dHRcIl0sXCJ0ZXh0L3htbFwiOltcIip4bWxcIl0sXCJ0ZXh0L3lhbWxcIjpbXCJ5YW1sXCIsXCJ5bWxcIl0sXCJ2aWRlby8zZ3BwXCI6W1wiM2dwXCIsXCIzZ3BwXCJdLFwidmlkZW8vM2dwcDJcIjpbXCIzZzJcIl0sXCJ2aWRlby9oMjYxXCI6W1wiaDI2MVwiXSxcInZpZGVvL2gyNjNcIjpbXCJoMjYzXCJdLFwidmlkZW8vaDI2NFwiOltcImgyNjRcIl0sXCJ2aWRlby9qcGVnXCI6W1wianBndlwiXSxcInZpZGVvL2pwbVwiOltcIipqcG1cIixcImpwZ21cIl0sXCJ2aWRlby9tajJcIjpbXCJtajJcIixcIm1qcDJcIl0sXCJ2aWRlby9tcDJ0XCI6W1widHNcIl0sXCJ2aWRlby9tcDRcIjpbXCJtcDRcIixcIm1wNHZcIixcIm1wZzRcIl0sXCJ2aWRlby9tcGVnXCI6W1wibXBlZ1wiLFwibXBnXCIsXCJtcGVcIixcIm0xdlwiLFwibTJ2XCJdLFwidmlkZW8vb2dnXCI6W1wib2d2XCJdLFwidmlkZW8vcXVpY2t0aW1lXCI6W1wicXRcIixcIm1vdlwiXSxcInZpZGVvL3dlYm1cIjpbXCJ3ZWJtXCJdfTtcblxudmFyIGxpdGUgPSBuZXcgTWltZV8xKHN0YW5kYXJkKTtcblxuZnVuY3Rpb24gZ2V0X3NlcnZlcl9yb3V0ZV9oYW5kbGVyKHJvdXRlcykge1xuXHRhc3luYyBmdW5jdGlvbiBoYW5kbGVfcm91dGUocm91dGUsIHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0cmVxLnBhcmFtcyA9IHJvdXRlLnBhcmFtcyhyb3V0ZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpKTtcblxuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKTtcblx0XHQvLyAnZGVsZXRlJyBjYW5ub3QgYmUgZXhwb3J0ZWQgZnJvbSBhIG1vZHVsZSBiZWNhdXNlIGl0IGlzIGEga2V5d29yZCxcblx0XHQvLyBzbyBjaGVjayBmb3IgJ2RlbCcgaW5zdGVhZFxuXHRcdGNvbnN0IG1ldGhvZF9leHBvcnQgPSBtZXRob2QgPT09ICdkZWxldGUnID8gJ2RlbCcgOiBtZXRob2Q7XG5cdFx0Y29uc3QgaGFuZGxlX21ldGhvZCA9IHJvdXRlLmhhbmRsZXJzW21ldGhvZF9leHBvcnRdO1xuXHRcdGlmIChoYW5kbGVfbWV0aG9kKSB7XG5cdFx0XHRpZiAocHJvY2Vzcy5lbnYuU0FQUEVSX0VYUE9SVCkge1xuXHRcdFx0XHRjb25zdCB7IHdyaXRlLCBlbmQsIHNldEhlYWRlciB9ID0gcmVzO1xuXHRcdFx0XHRjb25zdCBjaHVua3MgPSBbXTtcblx0XHRcdFx0Y29uc3QgaGVhZGVycyA9IHt9O1xuXG5cdFx0XHRcdC8vIGludGVyY2VwdCBkYXRhIHNvIHRoYXQgaXQgY2FuIGJlIGV4cG9ydGVkXG5cdFx0XHRcdHJlcy53cml0ZSA9IGZ1bmN0aW9uKGNodW5rKSB7XG5cdFx0XHRcdFx0Y2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcblx0XHRcdFx0XHR3cml0ZS5hcHBseShyZXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG5cdFx0XHRcdFx0c2V0SGVhZGVyLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXMuZW5kID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRpZiAoY2h1bmspIGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XG5cdFx0XHRcdFx0ZW5kLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblxuXHRcdFx0XHRcdHByb2Nlc3Muc2VuZCh7XG5cdFx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZXZlbnQ6ICdmaWxlJyxcblx0XHRcdFx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdFx0XHRcdG1ldGhvZDogcmVxLm1ldGhvZCxcblx0XHRcdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBoZWFkZXJzWydjb250ZW50LXR5cGUnXSxcblx0XHRcdFx0XHRcdGJvZHk6IEJ1ZmZlci5jb25jYXQoY2h1bmtzKS50b1N0cmluZygpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGhhbmRsZV9uZXh0ID0gKGVycikgPT4ge1xuXHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0cmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cdFx0XHRcdFx0cmVzLmVuZChlcnIubWVzc2FnZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJvY2Vzcy5uZXh0VGljayhuZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgaGFuZGxlX21ldGhvZChyZXEsIHJlcywgaGFuZGxlX25leHQpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0aGFuZGxlX25leHQoZXJyKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbm8gbWF0Y2hpbmcgaGFuZGxlciBmb3IgbWV0aG9kXG5cdFx0XHRwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbiBmaW5kX3JvdXRlKHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0Zm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcblx0XHRcdGlmIChyb3V0ZS5wYXR0ZXJuLnRlc3QocmVxLnBhdGgpKSB7XG5cdFx0XHRcdGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bmV4dCgpO1xuXHR9O1xufVxuXG4vKiFcbiAqIGNvb2tpZVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBSb21hbiBTaHR5bG1hblxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxudmFyIHBhcnNlXzEgPSBwYXJzZTtcbnZhciBzZXJpYWxpemVfMSA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xudmFyIGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcbnZhciBwYWlyU3BsaXRSZWdFeHAgPSAvOyAqLztcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggZmllbGQtY29udGVudCBpbiBSRkMgNzIzMCBzZWMgMy4yXG4gKlxuICogZmllbGQtY29udGVudCA9IGZpZWxkLXZjaGFyIFsgMSooIFNQIC8gSFRBQiApIGZpZWxkLXZjaGFyIF1cbiAqIGZpZWxkLXZjaGFyICAgPSBWQ0hBUiAvIG9icy10ZXh0XG4gKiBvYnMtdGV4dCAgICAgID0gJXg4MC1GRlxuICovXG5cbnZhciBmaWVsZENvbnRlbnRSZWdFeHAgPSAvXltcXHUwMDA5XFx1MDAyMC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXSskLztcblxuLyoqXG4gKiBQYXJzZSBhIGNvb2tpZSBoZWFkZXIuXG4gKlxuICogUGFyc2UgdGhlIGdpdmVuIGNvb2tpZSBoZWFkZXIgc3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKiBUaGUgb2JqZWN0IGhhcyB0aGUgdmFyaW91cyBjb29raWVzIGFzIGtleXMobmFtZXMpID0+IHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge29iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdChwYWlyU3BsaXRSZWdFeHApO1xuICB2YXIgZGVjID0gb3B0LmRlY29kZSB8fCBkZWNvZGU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwYWlyID0gcGFpcnNbaV07XG4gICAgdmFyIGVxX2lkeCA9IHBhaXIuaW5kZXhPZignPScpO1xuXG4gICAgLy8gc2tpcCB0aGluZ3MgdGhhdCBkb24ndCBsb29rIGxpa2Uga2V5PXZhbHVlXG4gICAgaWYgKGVxX2lkeCA8IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBrZXkgPSBwYWlyLnN1YnN0cigwLCBlcV9pZHgpLnRyaW0oKTtcbiAgICB2YXIgdmFsID0gcGFpci5zdWJzdHIoKytlcV9pZHgsIHBhaXIubGVuZ3RoKS50cmltKCk7XG5cbiAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgaWYgKCdcIicgPT0gdmFsWzBdKSB7XG4gICAgICB2YWwgPSB2YWwuc2xpY2UoMSwgLTEpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgYXNzaWduIG9uY2VcbiAgICBpZiAodW5kZWZpbmVkID09IG9ialtrZXldKSB7XG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIGRlYyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgZGF0YSBpbnRvIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBTZXJpYWxpemUgdGhlIGEgbmFtZSB2YWx1ZSBwYWlyIGludG8gYSBjb29raWUgc3RyaW5nIHN1aXRhYmxlIGZvclxuICogaHR0cCBoZWFkZXJzLiBBbiBvcHRpb25hbCBvcHRpb25zIG9iamVjdCBzcGVjaWZpZWQgY29va2llIHBhcmFtZXRlcnMuXG4gKlxuICogc2VyaWFsaXplKCdmb28nLCAnYmFyJywgeyBodHRwT25seTogdHJ1ZSB9KVxuICogICA9PiBcImZvbz1iYXI7IGh0dHBPbmx5XCJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShuYW1lLCB2YWwsIG9wdGlvbnMpIHtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG4gIHZhciBlbmMgPSBvcHQuZW5jb2RlIHx8IGVuY29kZTtcblxuICBpZiAodHlwZW9mIGVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBlbmNvZGUgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChuYW1lKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IG5hbWUgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgdmFyIHZhbHVlID0gZW5jKHZhbCk7XG5cbiAgaWYgKHZhbHVlICYmICFmaWVsZENvbnRlbnRSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCB2YWwgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgdmFyIHN0ciA9IG5hbWUgKyAnPScgKyB2YWx1ZTtcblxuICBpZiAobnVsbCAhPSBvcHQubWF4QWdlKSB7XG4gICAgdmFyIG1heEFnZSA9IG9wdC5tYXhBZ2UgLSAwO1xuICAgIGlmIChpc05hTihtYXhBZ2UpKSB0aHJvdyBuZXcgRXJyb3IoJ21heEFnZSBzaG91bGQgYmUgYSBOdW1iZXInKTtcbiAgICBzdHIgKz0gJzsgTWF4LUFnZT0nICsgTWF0aC5mbG9vcihtYXhBZ2UpO1xuICB9XG5cbiAgaWYgKG9wdC5kb21haW4pIHtcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5kb21haW4pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZG9tYWluIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgRG9tYWluPScgKyBvcHQuZG9tYWluO1xuICB9XG5cbiAgaWYgKG9wdC5wYXRoKSB7XG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQucGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBwYXRoIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgUGF0aD0nICsgb3B0LnBhdGg7XG4gIH1cblxuICBpZiAob3B0LmV4cGlyZXMpIHtcbiAgICBpZiAodHlwZW9mIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZXhwaXJlcyBpcyBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgc3RyICs9ICc7IEV4cGlyZXM9JyArIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nKCk7XG4gIH1cblxuICBpZiAob3B0Lmh0dHBPbmx5KSB7XG4gICAgc3RyICs9ICc7IEh0dHBPbmx5JztcbiAgfVxuXG4gIGlmIChvcHQuc2VjdXJlKSB7XG4gICAgc3RyICs9ICc7IFNlY3VyZSc7XG4gIH1cblxuICBpZiAob3B0LnNhbWVTaXRlKSB7XG4gICAgdmFyIHNhbWVTaXRlID0gdHlwZW9mIG9wdC5zYW1lU2l0ZSA9PT0gJ3N0cmluZydcbiAgICAgID8gb3B0LnNhbWVTaXRlLnRvTG93ZXJDYXNlKCkgOiBvcHQuc2FtZVNpdGU7XG5cbiAgICBzd2l0Y2ggKHNhbWVTaXRlKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1MYXgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmljdCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9Tm9uZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHNhbWVTaXRlIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFRyeSBkZWNvZGluZyBhIHN0cmluZyB1c2luZyBhIGRlY29kaW5nIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRlY29kZVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoc3RyLCBkZWNvZGUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlKHN0cik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbnZhciBjb29raWUgPSB7XG5cdHBhcnNlOiBwYXJzZV8xLFxuXHRzZXJpYWxpemU6IHNlcmlhbGl6ZV8xXG59O1xuXG52YXIgY2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8kJztcbnZhciB1bnNhZmVDaGFycyA9IC9bPD5cXGJcXGZcXG5cXHJcXHRcXDBcXHUyMDI4XFx1MjAyOV0vZztcbnZhciByZXNlcnZlZCA9IC9eKD86ZG98aWZ8aW58Zm9yfGludHxsZXR8bmV3fHRyeXx2YXJ8Ynl0ZXxjYXNlfGNoYXJ8ZWxzZXxlbnVtfGdvdG98bG9uZ3x0aGlzfHZvaWR8d2l0aHxhd2FpdHxicmVha3xjYXRjaHxjbGFzc3xjb25zdHxmaW5hbHxmbG9hdHxzaG9ydHxzdXBlcnx0aHJvd3x3aGlsZXx5aWVsZHxkZWxldGV8ZG91YmxlfGV4cG9ydHxpbXBvcnR8bmF0aXZlfHJldHVybnxzd2l0Y2h8dGhyb3dzfHR5cGVvZnxib29sZWFufGRlZmF1bHR8ZXh0ZW5kc3xmaW5hbGx5fHBhY2thZ2V8cHJpdmF0ZXxhYnN0cmFjdHxjb250aW51ZXxkZWJ1Z2dlcnxmdW5jdGlvbnx2b2xhdGlsZXxpbnRlcmZhY2V8cHJvdGVjdGVkfHRyYW5zaWVudHxpbXBsZW1lbnRzfGluc3RhbmNlb2Z8c3luY2hyb25pemVkKSQvO1xudmFyIGVzY2FwZWQgPSB7XG4gICAgJzwnOiAnXFxcXHUwMDNDJyxcbiAgICAnPic6ICdcXFxcdTAwM0UnLFxuICAgICcvJzogJ1xcXFx1MDAyRicsXG4gICAgJ1xcXFwnOiAnXFxcXFxcXFwnLFxuICAgICdcXGInOiAnXFxcXGInLFxuICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICdcXG4nOiAnXFxcXG4nLFxuICAgICdcXHInOiAnXFxcXHInLFxuICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICdcXDAnOiAnXFxcXDAnLFxuICAgICdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAnXFxcXHUyMDI5J1xufTtcbnZhciBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QucHJvdG90eXBlKS5zb3J0KCkuam9pbignXFwwJyk7XG5mdW5jdGlvbiBkZXZhbHVlKHZhbHVlKSB7XG4gICAgdmFyIGNvdW50cyA9IG5ldyBNYXAoKTtcbiAgICBmdW5jdGlvbiB3YWxrKHRoaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnRzLmhhcyh0aGluZykpIHtcbiAgICAgICAgICAgIGNvdW50cy5zZXQodGhpbmcsIGNvdW50cy5nZXQodGhpbmcpICsgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY291bnRzLnNldCh0aGluZywgMSk7XG4gICAgICAgIGlmICghaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nLmZvckVhY2god2Fsayk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGluZykuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3RvICE9PSBPYmplY3QucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90byAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLnNvcnQoKS5qb2luKCdcXDAnKSAhPT0gb2JqZWN0UHJvdG9Pd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IGFyYml0cmFyeSBub24tUE9KT3NcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGhpbmcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgUE9KT3Mgd2l0aCBzeW1ib2xpYyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHdhbGsodGhpbmdba2V5XSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHdhbGsodmFsdWUpO1xuICAgIHZhciBuYW1lcyA9IG5ldyBNYXAoKTtcbiAgICBBcnJheS5mcm9tKGNvdW50cylcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5WzFdID4gMTsgfSlcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGJbMV0gLSBhWzFdOyB9KVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgICAgICAgbmFtZXMuc2V0KGVudHJ5WzBdLCBnZXROYW1lKGkpKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnkodGhpbmcpIHtcbiAgICAgICAgaWYgKG5hbWVzLmhhcyh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lcy5nZXQodGhpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICBjYXNlICdCb29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJPYmplY3QoXCIgKyBzdHJpbmdpZnkodGhpbmcudmFsdWVPZigpKSArIFwiKVwiO1xuICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpbmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgdmFyIG1lbWJlcnMgPSB0aGluZy5tYXAoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGkgaW4gdGhpbmcgPyBzdHJpbmdpZnkodikgOiAnJzsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWwgPSB0aGluZy5sZW5ndGggPT09IDAgfHwgKHRoaW5nLmxlbmd0aCAtIDEgaW4gdGhpbmcpID8gJycgOiAnLCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgbWVtYmVycy5qb2luKCcsJykgKyB0YWlsICsgXCJdXCI7XG4gICAgICAgICAgICBjYXNlICdTZXQnOlxuICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXcgXCIgKyB0eXBlICsgXCIoW1wiICsgQXJyYXkuZnJvbSh0aGluZykubWFwKHN0cmluZ2lmeSkuam9pbignLCcpICsgXCJdKVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gXCJ7XCIgKyBPYmplY3Qua2V5cyh0aGluZykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHNhZmVLZXkoa2V5KSArIFwiOlwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pOyB9KS5qb2luKCcsJykgKyBcIn1cIjtcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksXCIgKyBvYmogKyBcIilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk9iamVjdC5jcmVhdGUobnVsbClcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgc3RyID0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBpZiAobmFtZXMuc2l6ZSkge1xuICAgICAgICB2YXIgcGFyYW1zXzEgPSBbXTtcbiAgICAgICAgdmFyIHN0YXRlbWVudHNfMSA9IFtdO1xuICAgICAgICB2YXIgdmFsdWVzXzEgPSBbXTtcbiAgICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgdGhpbmcpIHtcbiAgICAgICAgICAgIHBhcmFtc18xLnB1c2gobmFtZSk7XG4gICAgICAgICAgICBpZiAoaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiT2JqZWN0KFwiICsgc3RyaW5naWZ5KHRoaW5nLnZhbHVlT2YoKSkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2godGhpbmcudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIkFycmF5KFwiICsgdGhpbmcubGVuZ3RoICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGluZy5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCJbXCIgKyBpICsgXCJdPVwiICsgc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgU2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFwiYWRkKFwiICsgc3RyaW5naWZ5KHYpICsgXCIpXCI7IH0pLmpvaW4oJy4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01hcCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgTWFwXCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzZXQoXCIgKyBzdHJpbmdpZnkoaykgKyBcIiwgXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpID09PSBudWxsID8gJ09iamVjdC5jcmVhdGUobnVsbCknIDogJ3t9Jyk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwiXCIgKyBuYW1lICsgc2FmZVByb3Aoa2V5KSArIFwiPVwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChcInJldHVybiBcIiArIHN0cik7XG4gICAgICAgIHJldHVybiBcIihmdW5jdGlvbihcIiArIHBhcmFtc18xLmpvaW4oJywnKSArIFwiKXtcIiArIHN0YXRlbWVudHNfMS5qb2luKCc7JykgKyBcIn0oXCIgKyB2YWx1ZXNfMS5qb2luKCcsJykgKyBcIikpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE5hbWUobnVtKSB7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBkbyB7XG4gICAgICAgIG5hbWUgPSBjaGFyc1tudW0gJSBjaGFycy5sZW5ndGhdICsgbmFtZTtcbiAgICAgICAgbnVtID0gfn4obnVtIC8gY2hhcnMubGVuZ3RoKSAtIDE7XG4gICAgfSB3aGlsZSAobnVtID49IDApO1xuICAgIHJldHVybiByZXNlcnZlZC50ZXN0KG5hbWUpID8gbmFtZSArIFwiX1wiIDogbmFtZTtcbn1cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdCh0aGluZykgIT09IHRoaW5nO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5UHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0aGluZyA9PT0gdm9pZCAwKVxuICAgICAgICByZXR1cm4gJ3ZvaWQgMCc7XG4gICAgaWYgKHRoaW5nID09PSAwICYmIDEgLyB0aGluZyA8IDApXG4gICAgICAgIHJldHVybiAnLTAnO1xuICAgIHZhciBzdHIgPSBTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL14oLSk/MFxcLi8sICckMS4nKTtcbiAgICByZXR1cm4gc3RyO1xufVxuZnVuY3Rpb24gZ2V0VHlwZSh0aGluZykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpbmcpLnNsaWNlKDgsIC0xKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXIoYykge1xuICAgIHJldHVybiBlc2NhcGVkW2NdIHx8IGM7XG59XG5mdW5jdGlvbiBlc2NhcGVVbnNhZmVDaGFycyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UodW5zYWZlQ2hhcnMsIGVzY2FwZVVuc2FmZUNoYXIpO1xufVxuZnVuY3Rpb24gc2FmZUtleShrZXkpIHtcbiAgICByZXR1cm4gL15bXyRhLXpBLVpdW18kYS16QS1aMC05XSokLy50ZXN0KGtleSkgPyBrZXkgOiBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKTtcbn1cbmZ1bmN0aW9uIHNhZmVQcm9wKGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IFwiLlwiICsga2V5IDogXCJbXCIgKyBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKSArIFwiXVwiO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5U3RyaW5nKHN0cikge1xuICAgIHZhciByZXN1bHQgPSAnXCInO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcXFxcIic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhciBpbiBlc2NhcGVkKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gZXNjYXBlZFtjaGFyXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID49IDB4ZDgwMCAmJiBjb2RlIDw9IDB4ZGZmZikge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBzdHIuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBbaGlnaCwgbG93XSBzdXJyb2dhdGUgcGFpcixcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV4dCB0d28gY2hhcmFjdGVycywgb3RoZXJ3aXNlIGVzY2FwZVxuICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHhkYmZmICYmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY2hhciArIHN0clsrK2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxcXHVcIiArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJ1wiJztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdG1wdmFyL2pzZG9tL2Jsb2IvYWE4NWIyYWJmMDc3NjZmZjdiZjVjMWY2ZGFhZmIzNzI2ZjJmMmRiNS9saWIvanNkb20vbGl2aW5nL2Jsb2IuanNcblxuLy8gZml4IGZvciBcIlJlYWRhYmxlXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgaXNzdWVcbmNvbnN0IFJlYWRhYmxlID0gU3RyZWFtLlJlYWRhYmxlO1xuXG5jb25zdCBCVUZGRVIgPSBTeW1ib2woJ2J1ZmZlcicpO1xuY29uc3QgVFlQRSA9IFN5bWJvbCgndHlwZScpO1xuXG5jbGFzcyBCbG9iIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpc1tUWVBFXSA9ICcnO1xuXG5cdFx0Y29uc3QgYmxvYlBhcnRzID0gYXJndW1lbnRzWzBdO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBhcmd1bWVudHNbMV07XG5cblx0XHRjb25zdCBidWZmZXJzID0gW107XG5cdFx0bGV0IHNpemUgPSAwO1xuXG5cdFx0aWYgKGJsb2JQYXJ0cykge1xuXHRcdFx0Y29uc3QgYSA9IGJsb2JQYXJ0cztcblx0XHRcdGNvbnN0IGxlbmd0aCA9IE51bWJlcihhLmxlbmd0aCk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBhW2ldO1xuXHRcdFx0XHRsZXQgYnVmZmVyO1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20oZWxlbWVudC5idWZmZXIsIGVsZW1lbnQuYnl0ZU9mZnNldCwgZWxlbWVudC5ieXRlTGVuZ3RoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmxvYikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnRbQlVGRkVSXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbSh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBlbGVtZW50IDogU3RyaW5nKGVsZW1lbnQpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzaXplICs9IGJ1ZmZlci5sZW5ndGg7XG5cdFx0XHRcdGJ1ZmZlcnMucHVzaChidWZmZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbQlVGRkVSXSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XG5cblx0XHRsZXQgdHlwZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50eXBlICE9PSB1bmRlZmluZWQgJiYgU3RyaW5nKG9wdGlvbnMudHlwZSkudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodHlwZSAmJiAhL1teXFx1MDAyMC1cXHUwMDdFXS8udGVzdCh0eXBlKSkge1xuXHRcdFx0dGhpc1tUWVBFXSA9IHR5cGU7XG5cdFx0fVxuXHR9XG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiB0aGlzW0JVRkZFUl0ubGVuZ3RoO1xuXHR9XG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzW1RZUEVdO1xuXHR9XG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzW0JVRkZFUl0udG9TdHJpbmcoKSk7XG5cdH1cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0Y29uc3QgYnVmID0gdGhpc1tCVUZGRVJdO1xuXHRcdGNvbnN0IGFiID0gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhYik7XG5cdH1cblx0c3RyZWFtKCkge1xuXHRcdGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlKCk7XG5cdFx0cmVhZGFibGUuX3JlYWQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHRyZWFkYWJsZS5wdXNoKHRoaXNbQlVGRkVSXSk7XG5cdFx0cmVhZGFibGUucHVzaChudWxsKTtcblx0XHRyZXR1cm4gcmVhZGFibGU7XG5cdH1cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuICdbb2JqZWN0IEJsb2JdJztcblx0fVxuXHRzbGljZSgpIHtcblx0XHRjb25zdCBzaXplID0gdGhpcy5zaXplO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3QgZW5kID0gYXJndW1lbnRzWzFdO1xuXHRcdGxldCByZWxhdGl2ZVN0YXJ0LCByZWxhdGl2ZUVuZDtcblx0XHRpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IDA7XG5cdFx0fSBlbHNlIGlmIChzdGFydCA8IDApIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1heChzaXplICsgc3RhcnQsIDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gTWF0aC5taW4oc3RhcnQsIHNpemUpO1xuXHRcdH1cblx0XHRpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gc2l6ZTtcblx0XHR9IGVsc2UgaWYgKGVuZCA8IDApIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5tYXgoc2l6ZSArIGVuZCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5taW4oZW5kLCBzaXplKTtcblx0XHR9XG5cdFx0Y29uc3Qgc3BhbiA9IE1hdGgubWF4KHJlbGF0aXZlRW5kIC0gcmVsYXRpdmVTdGFydCwgMCk7XG5cblx0XHRjb25zdCBidWZmZXIgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3Qgc2xpY2VkQnVmZmVyID0gYnVmZmVyLnNsaWNlKHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlU3RhcnQgKyBzcGFuKTtcblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW10sIHsgdHlwZTogYXJndW1lbnRzWzJdIH0pO1xuXHRcdGJsb2JbQlVGRkVSXSA9IHNsaWNlZEJ1ZmZlcjtcblx0XHRyZXR1cm4gYmxvYjtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCbG9iLnByb3RvdHlwZSwge1xuXHRzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dHlwZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNsaWNlOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnQmxvYicsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogZmV0Y2gtZXJyb3IuanNcbiAqXG4gKiBGZXRjaEVycm9yIGludGVyZmFjZSBmb3Igb3BlcmF0aW9uYWwgZXJyb3JzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgRmV0Y2hFcnJvciBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIG1lc3NhZ2UgICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuICogQHBhcmFtICAgU3RyaW5nICAgICAgdHlwZSAgICAgICAgIEVycm9yIHR5cGUgZm9yIG1hY2hpbmVcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHN5c3RlbUVycm9yICBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3JcbiAqIEByZXR1cm4gIEZldGNoRXJyb3JcbiAqL1xuZnVuY3Rpb24gRmV0Y2hFcnJvcihtZXNzYWdlLCB0eXBlLCBzeXN0ZW1FcnJvcikge1xuICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgLy8gd2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcbiAgaWYgKHN5c3RlbUVycm9yKSB7XG4gICAgdGhpcy5jb2RlID0gdGhpcy5lcnJubyA9IHN5c3RlbUVycm9yLmNvZGU7XG4gIH1cblxuICAvLyBoaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5GZXRjaEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkZldGNoRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRmV0Y2hFcnJvcjtcbkZldGNoRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnRmV0Y2hFcnJvcic7XG5cbmxldCBjb252ZXJ0O1xudHJ5IHtcblx0Y29udmVydCA9IHJlcXVpcmUoJ2VuY29kaW5nJykuY29udmVydDtcbn0gY2F0Y2ggKGUpIHt9XG5cbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFBhc3NUaHJvdWdoID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xuXG4vKipcbiAqIEJvZHkgbWl4aW5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNib2R5XG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5mdW5jdGlvbiBCb2R5KGJvZHkpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHR2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG5cdCAgICBfcmVmJHNpemUgPSBfcmVmLnNpemU7XG5cblx0bGV0IHNpemUgPSBfcmVmJHNpemUgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHNpemU7XG5cdHZhciBfcmVmJHRpbWVvdXQgPSBfcmVmLnRpbWVvdXQ7XG5cdGxldCB0aW1lb3V0ID0gX3JlZiR0aW1lb3V0ID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiR0aW1lb3V0O1xuXG5cdGlmIChib2R5ID09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0Ym9keSA9IG51bGw7XG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkudG9TdHJpbmcoKSk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSA7IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkgOyBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkpO1xuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkuYnVmZmVyLCBib2R5LmJ5dGVPZmZzZXQsIGJvZHkuYnl0ZUxlbmd0aCk7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkgOyBlbHNlIHtcblx0XHQvLyBub25lIG9mIHRoZSBhYm92ZVxuXHRcdC8vIGNvZXJjZSB0byBzdHJpbmcgdGhlbiBidWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcblx0fVxuXHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0Ym9keSxcblx0XHRkaXN0dXJiZWQ6IGZhbHNlLFxuXHRcdGVycm9yOiBudWxsXG5cdH07XG5cdHRoaXMuc2l6ZSA9IHNpemU7XG5cdHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRib2R5Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJyA/IGVyciA6IG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXMudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKTtcblx0XHRcdF90aGlzW0lOVEVSTkFMU10uZXJyb3IgPSBlcnJvcjtcblx0XHR9KTtcblx0fVxufVxuXG5Cb2R5LnByb3RvdHlwZSA9IHtcblx0Z2V0IGJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5ib2R5O1xuXHR9LFxuXG5cdGdldCBib2R5VXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZDtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgQXJyYXlCdWZmZXJcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG4gICpcbiAgKiBAcmV0dXJuIFByb21pc2VcbiAgKi9cblx0YmxvYigpIHtcblx0XHRsZXQgY3QgPSB0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdC8vIFByZXZlbnQgY29weWluZ1xuXHRcdFx0bmV3IEJsb2IoW10sIHtcblx0XHRcdFx0dHlwZTogY3QudG9Mb3dlckNhc2UoKVxuXHRcdFx0fSksIHtcblx0XHRcdFx0W0JVRkZFUl06IGJ1ZlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0anNvbigpIHtcblx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoYnVmZmVyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBGZXRjaEVycm9yKGBpbnZhbGlkIGpzb24gcmVzcG9uc2UgYm9keSBhdCAke190aGlzMi51cmx9IHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnaW52YWxpZC1qc29uJykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyB0ZXh0XG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRyZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGJ1ZmZlciAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRidWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcyk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHQsIHdoaWxlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0aW5nIHRoZSBlbmNvZGluZyBhbmRcbiAgKiB0cnlpbmcgdG8gZGVjb2RlIHRvIFVURi04IChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHRDb252ZXJ0ZWQoKSB7XG5cdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0Qm9keShidWZmZXIsIF90aGlzMy5oZWFkZXJzKTtcblx0XHR9KTtcblx0fVxufTtcblxuLy8gSW4gYnJvd3NlcnMsIGFsbCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQm9keS5wcm90b3R5cGUsIHtcblx0Ym9keTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJvZHlVc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXJyYXlCdWZmZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRibG9iOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0anNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHRleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuQm9keS5taXhJbiA9IGZ1bmN0aW9uIChwcm90bykge1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoQm9keS5wcm90b3R5cGUpKSB7XG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2U6IGZ1dHVyZSBwcm9vZlxuXHRcdGlmICghKG5hbWUgaW4gcHJvdG8pKSB7XG5cdFx0XHRjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihCb2R5LnByb3RvdHlwZSwgbmFtZSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG5hbWUsIGRlc2MpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuICBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIGNvbnN1bWVCb2R5KCkge1xuXHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHt0aGlzLnVybH1gKSk7XG5cdH1cblxuXHR0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkID0gdHJ1ZTtcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmVycm9yKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QodGhpc1tJTlRFUk5BTFNdLmVycm9yKTtcblx0fVxuXG5cdGxldCBib2R5ID0gdGhpcy5ib2R5O1xuXG5cdC8vIGJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5ID0gYm9keS5zdHJlYW0oKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgYnVmZmVyXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoYm9keSk7XG5cdH1cblxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWY6IHNob3VsZCBuZXZlciBoYXBwZW5cblx0aWYgKCEoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoQnVmZmVyLmFsbG9jKDApKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgc3RyZWFtXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XG5cdGxldCBhY2N1bSA9IFtdO1xuXHRsZXQgYWNjdW1CeXRlcyA9IDA7XG5cdGxldCBhYm9ydCA9IGZhbHNlO1xuXG5cdHJldHVybiBuZXcgQm9keS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHRsZXQgcmVzVGltZW91dDtcblxuXHRcdC8vIGFsbG93IHRpbWVvdXQgb24gc2xvdyByZXNwb25zZSBib2R5XG5cdFx0aWYgKF90aGlzNC50aW1lb3V0KSB7XG5cdFx0XHRyZXNUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBSZXNwb25zZSB0aW1lb3V0IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9IChvdmVyICR7X3RoaXM0LnRpbWVvdXR9bXMpYCwgJ2JvZHktdGltZW91dCcpKTtcblx0XHRcdH0sIF90aGlzNC50aW1lb3V0KTtcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc3RyZWFtIGVycm9yc1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0aWYgKGVyci5uYW1lID09PSAnQWJvcnRFcnJvcicpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHJlcXVlc3Qgd2FzIGFib3J0ZWQsIHJlamVjdCB3aXRoIHRoaXMgRXJyb3Jcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIG90aGVyIGVycm9ycywgc3VjaCBhcyBpbmNvcnJlY3QgY29udGVudC1lbmNvZGluZ1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRpZiAoYWJvcnQgfHwgY2h1bmsgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3RoaXM0LnNpemUgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IF90aGlzNC5zaXplKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtfdGhpczQudXJsfSBvdmVyIGxpbWl0OiAke190aGlzNC5zaXplfWAsICdtYXgtc2l6ZScpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdGFjY3VtLnB1c2goY2h1bmspO1xuXHRcdH0pO1xuXG5cdFx0Ym9keS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGFib3J0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlc1RpbWVvdXQpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNvbHZlKEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBoYW5kbGUgc3RyZWFtcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWQgdG9vIG11Y2ggZGF0YSAoaXNzdWUgIzQxNClcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIEJ1ZmZlciBmcm9tIHJlc3BvbnNlIGJvZHkgZm9yICR7X3RoaXM0LnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYnVmZmVyIGVuY29kaW5nIGFuZCBjb252ZXJ0IHRvIHRhcmdldCBlbmNvZGluZ1xuICogcmVmOiBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1dELWh0bWw1LTIwMTEwMTEzL3BhcnNpbmcuaHRtbCNkZXRlcm1pbmluZy10aGUtY2hhcmFjdGVyLWVuY29kaW5nXG4gKlxuICogQHBhcmFtICAgQnVmZmVyICBidWZmZXIgICAgSW5jb21pbmcgYnVmZmVyXG4gKiBAcGFyYW0gICBTdHJpbmcgIGVuY29kaW5nICBUYXJnZXQgZW5jb2RpbmdcbiAqIEByZXR1cm4gIFN0cmluZ1xuICovXG5mdW5jdGlvbiBjb252ZXJ0Qm9keShidWZmZXIsIGhlYWRlcnMpIHtcblx0aWYgKHR5cGVvZiBjb252ZXJ0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgcGFja2FnZSBgZW5jb2RpbmdgIG11c3QgYmUgaW5zdGFsbGVkIHRvIHVzZSB0aGUgdGV4dENvbnZlcnRlZCgpIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRjb25zdCBjdCA9IGhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblx0bGV0IGNoYXJzZXQgPSAndXRmLTgnO1xuXHRsZXQgcmVzLCBzdHI7XG5cblx0Ly8gaGVhZGVyXG5cdGlmIChjdCkge1xuXHRcdHJlcyA9IC9jaGFyc2V0PShbXjtdKikvaS5leGVjKGN0KTtcblx0fVxuXG5cdC8vIG5vIGNoYXJzZXQgaW4gY29udGVudCB0eXBlLCBwZWVrIGF0IHJlc3BvbnNlIGJvZHkgZm9yIGF0IG1vc3QgMTAyNCBieXRlc1xuXHRzdHIgPSBidWZmZXIuc2xpY2UoMCwgMTAyNCkudG9TdHJpbmcoKTtcblxuXHQvLyBodG1sNVxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPG1ldGEuKz9jaGFyc2V0PShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcblx0fVxuXG5cdC8vIGh0bWw0XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YVtcXHNdKz9odHRwLWVxdWl2PShbJ1wiXSljb250ZW50LXR5cGVcXDFbXFxzXSs/Y29udGVudD0oWydcIl0pKC4rPylcXDIvaS5leGVjKHN0cik7XG5cblx0XHRpZiAocmVzKSB7XG5cdFx0XHRyZXMgPSAvY2hhcnNldD0oLiopL2kuZXhlYyhyZXMucG9wKCkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHhtbFxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPFxcP3htbC4rP2VuY29kaW5nPShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcblx0fVxuXG5cdC8vIGZvdW5kIGNoYXJzZXRcblx0aWYgKHJlcykge1xuXHRcdGNoYXJzZXQgPSByZXMucG9wKCk7XG5cblx0XHQvLyBwcmV2ZW50IGRlY29kZSBpc3N1ZXMgd2hlbiBzaXRlcyB1c2UgaW5jb3JyZWN0IGVuY29kaW5nXG5cdFx0Ly8gcmVmOiBodHRwczovL2hzaXZvbmVuLmZpL2VuY29kaW5nLW1lbnUvXG5cdFx0aWYgKGNoYXJzZXQgPT09ICdnYjIzMTInIHx8IGNoYXJzZXQgPT09ICdnYmsnKSB7XG5cdFx0XHRjaGFyc2V0ID0gJ2diMTgwMzAnO1xuXHRcdH1cblx0fVxuXG5cdC8vIHR1cm4gcmF3IGJ1ZmZlcnMgaW50byBhIHNpbmdsZSB1dGYtOCBidWZmZXJcblx0cmV0dXJuIGNvbnZlcnQoYnVmZmVyLCAnVVRGLTgnLCBjaGFyc2V0KS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIERldGVjdCBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL2JpdGlubi9ub2RlLWZldGNoL2lzc3Vlcy8yOTYjaXNzdWVjb21tZW50LTMwNzU5ODE0M1xuICpcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICAgICBPYmplY3QgdG8gZGV0ZWN0IGJ5IHR5cGUgb3IgYnJhbmRcbiAqIEByZXR1cm4gIFN0cmluZ1xuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyhvYmopIHtcblx0Ly8gRHVjay10eXBpbmcgYXMgYSBuZWNlc3NhcnkgY29uZGl0aW9uLlxuXHRpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iai5hcHBlbmQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5kZWxldGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5nZXQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5nZXRBbGwgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5oYXMgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5zZXQgIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBCcmFuZC1jaGVja2luZyBhbmQgbW9yZSBkdWNrLXR5cGluZyBhcyBvcHRpb25hbCBjb25kaXRpb24uXG5cdHJldHVybiBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gJ1VSTFNlYXJjaFBhcmFtcycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFVSTFNlYXJjaFBhcmFtc10nIHx8IHR5cGVvZiBvYmouc29ydCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIFczQyBgQmxvYmAgb2JqZWN0ICh3aGljaCBgRmlsZWAgaW5oZXJpdHMgZnJvbSlcbiAqIEBwYXJhbSAgeyp9IG9ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNCbG9iKG9iaikge1xuXHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnR5cGUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBvYmouc3RyZWFtID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmouY29uc3RydWN0b3IubmFtZSkgJiYgL14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqW1N5bWJvbC50b1N0cmluZ1RhZ10pO1xufVxuXG4vKipcbiAqIENsb25lIGJvZHkgZ2l2ZW4gUmVzL1JlcSBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIE1peGVkICBpbnN0YW5jZSAgUmVzcG9uc2Ugb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHJldHVybiAgTWl4ZWRcbiAqL1xuZnVuY3Rpb24gY2xvbmUoaW5zdGFuY2UpIHtcblx0bGV0IHAxLCBwMjtcblx0bGV0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cdC8vIGRvbid0IGFsbG93IGNsb25pbmcgYSB1c2VkIGJvZHlcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY2xvbmUgYm9keSBhZnRlciBpdCBpcyB1c2VkJyk7XG5cdH1cblxuXHQvLyBjaGVjayB0aGF0IGJvZHkgaXMgYSBzdHJlYW0gYW5kIG5vdCBmb3JtLWRhdGEgb2JqZWN0XG5cdC8vIG5vdGU6IHdlIGNhbid0IGNsb25lIHRoZSBmb3JtLWRhdGEgb2JqZWN0IHdpdGhvdXQgaGF2aW5nIGl0IGFzIGEgZGVwZW5kZW5jeVxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSAmJiB0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIHRlZSBpbnN0YW5jZSBib2R5XG5cdFx0cDEgPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0XHRwMiA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuXHRcdGJvZHkucGlwZShwMSk7XG5cdFx0Ym9keS5waXBlKHAyKTtcblx0XHQvLyBzZXQgaW5zdGFuY2UgYm9keSB0byB0ZWVkIGJvZHkgYW5kIHJldHVybiB0aGUgb3RoZXIgdGVlZCBib2R5XG5cdFx0aW5zdGFuY2VbSU5URVJOQUxTXS5ib2R5ID0gcDE7XG5cdFx0Ym9keSA9IHAyO1xuXHR9XG5cblx0cmV0dXJuIGJvZHk7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgdGhlIG9wZXJhdGlvbiBcImV4dHJhY3QgYSBgQ29udGVudC1UeXBlYCB2YWx1ZSBmcm9tIHxvYmplY3R8XCIgYXNcbiAqIHNwZWNpZmllZCBpbiB0aGUgc3BlY2lmaWNhdGlvbjpcbiAqIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHlpbml0LWV4dHJhY3RcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBpbnN0YW5jZS5ib2R5IGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBBbnkgb3B0aW9ucy5ib2R5IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDb250ZW50VHlwZShib2R5KSB7XG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJpbmdcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0cmV0dXJuICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCc7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBibG9iXG5cdFx0cmV0dXJuIGJvZHkudHlwZSB8fCBudWxsO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBkZXRlY3QgZm9ybSBkYXRhIGlucHV0IGZyb20gZm9ybS1kYXRhIG1vZHVsZVxuXHRcdHJldHVybiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTtib3VuZGFyeT0ke2JvZHkuZ2V0Qm91bmRhcnkoKX1gO1xuXHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdC8vIGNhbid0IHJlYWxseSBkbyBtdWNoIGFib3V0IHRoaXNcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIHtcblx0XHQvLyBCb2R5IGNvbnN0cnVjdG9yIGRlZmF1bHRzIG90aGVyIHRoaW5ncyB0byBzdHJpbmdcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgRmV0Y2ggU3RhbmRhcmQgdHJlYXRzIHRoaXMgYXMgaWYgXCJ0b3RhbCBieXRlc1wiIGlzIGEgcHJvcGVydHkgb24gdGhlIGJvZHkuXG4gKiBGb3IgdXMsIHdlIGhhdmUgdG8gZXhwbGljaXRseSBnZXQgaXQgd2l0aCBhIGZ1bmN0aW9uLlxuICpcbiAqIHJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS10b3RhbC1ieXRlc1xuICpcbiAqIEBwYXJhbSAgIEJvZHkgICAgaW5zdGFuY2UgICBJbnN0YW5jZSBvZiBCb2R5XG4gKiBAcmV0dXJuICBOdW1iZXI/ICAgICAgICAgICAgTnVtYmVyIG9mIGJ5dGVzLCBvciBudWxsIGlmIG5vdCBwb3NzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRUb3RhbEJ5dGVzKGluc3RhbmNlKSB7XG5cdGNvbnN0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRyZXR1cm4gMDtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS5zaXplO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0cmV0dXJuIGJvZHkubGVuZ3RoO1xuXHR9IGVsc2UgaWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkuZ2V0TGVuZ3RoU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdFx0aWYgKGJvZHkuX2xlbmd0aFJldHJpZXZlcnMgJiYgYm9keS5fbGVuZ3RoUmV0cmlldmVycy5sZW5ndGggPT0gMCB8fCAvLyAxLnhcblx0XHRib2R5Lmhhc0tub3duTGVuZ3RoICYmIGJvZHkuaGFzS25vd25MZW5ndGgoKSkge1xuXHRcdFx0Ly8gMi54XG5cdFx0XHRyZXR1cm4gYm9keS5nZXRMZW5ndGhTeW5jKCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBXcml0ZSBhIEJvZHkgdG8gYSBOb2RlLmpzIFdyaXRhYmxlU3RyZWFtIChlLmcuIGh0dHAuUmVxdWVzdCkgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAgIEJvZHkgICAgaW5zdGFuY2UgICBJbnN0YW5jZSBvZiBCb2R5XG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmZ1bmN0aW9uIHdyaXRlVG9TdHJlYW0oZGVzdCwgaW5zdGFuY2UpIHtcblx0Y29uc3QgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ym9keS5zdHJlYW0oKS5waXBlKGRlc3QpO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0ZGVzdC53cml0ZShib2R5KTtcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0Ym9keS5waXBlKGRlc3QpO1xuXHR9XG59XG5cbi8vIGV4cG9zZSBQcm9taXNlXG5Cb2R5LlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuLyoqXG4gKiBoZWFkZXJzLmpzXG4gKlxuICogSGVhZGVycyBjbGFzcyBvZmZlcnMgY29udmVuaWVudCBoZWxwZXJzXG4gKi9cblxuY29uc3QgaW52YWxpZFRva2VuUmVnZXggPSAvW15cXF5fYGEtekEtWlxcLTAtOSEjJCUmJyorLnx+XS87XG5jb25zdCBpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4ID0gL1teXFx0XFx4MjAtXFx4N2VcXHg4MC1cXHhmZl0vO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUobmFtZSkge1xuXHRuYW1lID0gYCR7bmFtZX1gO1xuXHRpZiAoaW52YWxpZFRva2VuUmVnZXgudGVzdChuYW1lKSB8fCBuYW1lID09PSAnJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7bmFtZX0gaXMgbm90IGEgbGVnYWwgSFRUUCBoZWFkZXIgbmFtZWApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWUodmFsdWUpIHtcblx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRpZiAoaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KHZhbHVlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dmFsdWV9IGlzIG5vdCBhIGxlZ2FsIEhUVFAgaGVhZGVyIHZhbHVlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBrZXkgaW4gdGhlIG1hcCBvYmplY3QgZ2l2ZW4gYSBoZWFkZXIgbmFtZS5cbiAqXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICogQHJldHVybiAgU3RyaW5nfFVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBmaW5kKG1hcCwgbmFtZSkge1xuXHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRmb3IgKGNvbnN0IGtleSBpbiBtYXApIHtcblx0XHRpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IG5hbWUpIHtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IE1BUCA9IFN5bWJvbCgnbWFwJyk7XG5jbGFzcyBIZWFkZXJzIHtcblx0LyoqXG4gICogSGVhZGVycyBjbGFzc1xuICAqXG4gICogQHBhcmFtICAgT2JqZWN0ICBoZWFkZXJzICBSZXNwb25zZSBoZWFkZXJzXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuXG5cdFx0dGhpc1tNQVBdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgSGVhZGVycykge1xuXHRcdFx0Y29uc3QgcmF3SGVhZGVycyA9IGluaXQucmF3KCk7XG5cdFx0XHRjb25zdCBoZWFkZXJOYW1lcyA9IE9iamVjdC5rZXlzKHJhd0hlYWRlcnMpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGhlYWRlck5hbWUgb2YgaGVhZGVyTmFtZXMpIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiByYXdIZWFkZXJzW2hlYWRlck5hbWVdKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoaGVhZGVyTmFtZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXZSBkb24ndCB3b3JyeSBhYm91dCBjb252ZXJ0aW5nIHByb3AgdG8gQnl0ZVN0cmluZyBoZXJlIGFzIGFwcGVuZCgpXG5cdFx0Ly8gd2lsbCBoYW5kbGUgaXQuXG5cdFx0aWYgKGluaXQgPT0gbnVsbCkgOyBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGNvbnN0IG1ldGhvZCA9IGluaXRbU3ltYm9sLml0ZXJhdG9yXTtcblx0XHRcdGlmIChtZXRob2QgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0hlYWRlciBwYWlycyBtdXN0IGJlIGl0ZXJhYmxlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBzZXF1ZW5jZTxzZXF1ZW5jZTxCeXRlU3RyaW5nPj5cblx0XHRcdFx0Ly8gTm90ZTogcGVyIHNwZWMgd2UgaGF2ZSB0byBmaXJzdCBleGhhdXN0IHRoZSBsaXN0cyB0aGVuIHByb2Nlc3MgdGhlbVxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgaW5pdCkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgcGFpciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhaXJbU3ltYm9sLml0ZXJhdG9yXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGl0ZXJhYmxlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goQXJyYXkuZnJvbShwYWlyKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcblx0XHRcdFx0XHRpZiAocGFpci5sZW5ndGggIT09IDIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBhIG5hbWUvdmFsdWUgdHVwbGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQocGFpclswXSwgcGFpclsxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlY29yZDxCeXRlU3RyaW5nLCBCeXRlU3RyaW5nPlxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhpbml0KSkge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gaW5pdFtrZXldO1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIGluaXRpYWxpemVyIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmV0dXJuIGNvbWJpbmVkIGhlYWRlciB2YWx1ZSBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgTWl4ZWRcbiAgKi9cblx0Z2V0KG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpc1tNQVBdW2tleV0uam9pbignLCAnKTtcblx0fVxuXG5cdC8qKlxuICAqIEl0ZXJhdGUgb3ZlciBhbGwgaGVhZGVyc1xuICAqXG4gICogQHBhcmFtICAgRnVuY3Rpb24gIGNhbGxiYWNrICBFeGVjdXRlZCBmb3IgZWFjaCBpdGVtIHdpdGggcGFyYW1ldGVycyAodmFsdWUsIG5hbWUsIHRoaXNBcmcpXG4gICogQHBhcmFtICAgQm9vbGVhbiAgIHRoaXNBcmcgICBgdGhpc2AgY29udGV4dCBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGZvckVhY2goY2FsbGJhY2spIHtcblx0XHRsZXQgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuXG5cdFx0bGV0IHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcblx0XHRsZXQgaSA9IDA7XG5cdFx0d2hpbGUgKGkgPCBwYWlycy5sZW5ndGgpIHtcblx0XHRcdHZhciBfcGFpcnMkaSA9IHBhaXJzW2ldO1xuXHRcdFx0Y29uc3QgbmFtZSA9IF9wYWlycyRpWzBdLFxuXHRcdFx0ICAgICAgdmFsdWUgPSBfcGFpcnMkaVsxXTtcblxuXHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG5cdFx0XHRwYWlycyA9IGdldEhlYWRlcnModGhpcyk7XG5cdFx0XHRpKys7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogT3ZlcndyaXRlIGhlYWRlciB2YWx1ZXMgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICAgSGVhZGVyIG5hbWVcbiAgKiBAcGFyYW0gICBTdHJpbmcgIHZhbHVlICBIZWFkZXIgdmFsdWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdHNldChuYW1lLCB2YWx1ZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0dGhpc1tNQVBdW2tleSAhPT0gdW5kZWZpbmVkID8ga2V5IDogbmFtZV0gPSBbdmFsdWVdO1xuXHR9XG5cblx0LyoqXG4gICogQXBwZW5kIGEgdmFsdWUgb250byBleGlzdGluZyBoZWFkZXJcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgIEhlYWRlciBuYW1lXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRhcHBlbmQobmFtZSwgdmFsdWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0dmFsaWRhdGVWYWx1ZSh2YWx1ZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpc1tNQVBdW2tleV0ucHVzaCh2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNbTUFQXVtuYW1lXSA9IFt2YWx1ZV07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogQ2hlY2sgZm9yIGhlYWRlciBuYW1lIGV4aXN0ZW5jZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBCb29sZWFuXG4gICovXG5cdGhhcyhuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0cmV0dXJuIGZpbmQodGhpc1tNQVBdLCBuYW1lKSAhPT0gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG4gICogRGVsZXRlIGFsbCBoZWFkZXIgdmFsdWVzIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGRlbGV0ZShuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbTUFQXVtrZXldO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIFJldHVybiByYXcgaGVhZGVycyAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgT2JqZWN0XG4gICovXG5cdHJhdygpIHtcblx0XHRyZXR1cm4gdGhpc1tNQVBdO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIGtleXMuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHRrZXlzKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ2tleScpO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIHZhbHVlcy5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdHZhbHVlcygpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICd2YWx1ZScpO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIGVudHJpZXMuXG4gICpcbiAgKiBUaGlzIGlzIHRoZSBkZWZhdWx0IGl0ZXJhdG9yIG9mIHRoZSBIZWFkZXJzIG9iamVjdC5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ2tleSt2YWx1ZScpO1xuXHR9XG59XG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlcnMucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdIZWFkZXJzJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSGVhZGVycy5wcm90b3R5cGUsIHtcblx0Z2V0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Zm9yRWFjaDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNldDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGFwcGVuZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhhczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGRlbGV0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGtleXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR2YWx1ZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRlbnRyaWVzOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnMoaGVhZGVycykge1xuXHRsZXQga2luZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2tleSt2YWx1ZSc7XG5cblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnNbTUFQXSkuc29ydCgpO1xuXHRyZXR1cm4ga2V5cy5tYXAoa2luZCA9PT0gJ2tleScgPyBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBrLnRvTG93ZXJDYXNlKCk7XG5cdH0gOiBraW5kID09PSAndmFsdWUnID8gZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gaGVhZGVyc1tNQVBdW2tdLmpvaW4oJywgJyk7XG5cdH0gOiBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBbay50b0xvd2VyQ2FzZSgpLCBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKV07XG5cdH0pO1xufVxuXG5jb25zdCBJTlRFUk5BTCA9IFN5bWJvbCgnaW50ZXJuYWwnKTtcblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRhcmdldCwga2luZCkge1xuXHRjb25zdCBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlKTtcblx0aXRlcmF0b3JbSU5URVJOQUxdID0ge1xuXHRcdHRhcmdldCxcblx0XHRraW5kLFxuXHRcdGluZGV4OiAwXG5cdH07XG5cdHJldHVybiBpdGVyYXRvcjtcbn1cblxuY29uc3QgSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHtcblx0bmV4dCgpIHtcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcblx0XHRpZiAoIXRoaXMgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpICE9PSBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG9mIGB0aGlzYCBpcyBub3QgYSBIZWFkZXJzSXRlcmF0b3InKTtcblx0XHR9XG5cblx0XHR2YXIgX0lOVEVSTkFMID0gdGhpc1tJTlRFUk5BTF07XG5cdFx0Y29uc3QgdGFyZ2V0ID0gX0lOVEVSTkFMLnRhcmdldCxcblx0XHQgICAgICBraW5kID0gX0lOVEVSTkFMLmtpbmQsXG5cdFx0ICAgICAgaW5kZXggPSBfSU5URVJOQUwuaW5kZXg7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBnZXRIZWFkZXJzKHRhcmdldCwga2luZCk7XG5cdFx0Y29uc3QgbGVuID0gdmFsdWVzLmxlbmd0aDtcblx0XHRpZiAoaW5kZXggPj0gbGVuKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHRcdFx0XHRkb25lOiB0cnVlXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxdLmluZGV4ID0gaW5kZXggKyAxO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiB2YWx1ZXNbaW5kZXhdLFxuXHRcdFx0ZG9uZTogZmFsc2Vcblx0XHR9O1xuXHR9XG59LCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnSGVhZGVyc0l0ZXJhdG9yJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBFeHBvcnQgdGhlIEhlYWRlcnMgb2JqZWN0IGluIGEgZm9ybSB0aGF0IE5vZGUuanMgY2FuIGNvbnN1bWUuXG4gKlxuICogQHBhcmFtICAgSGVhZGVycyAgaGVhZGVyc1xuICogQHJldHVybiAgT2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGV4cG9ydE5vZGVDb21wYXRpYmxlSGVhZGVycyhoZWFkZXJzKSB7XG5cdGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24oeyBfX3Byb3RvX186IG51bGwgfSwgaGVhZGVyc1tNQVBdKTtcblxuXHQvLyBodHRwLnJlcXVlc3QoKSBvbmx5IHN1cHBvcnRzIHN0cmluZyBhcyBIb3N0IGhlYWRlci4gVGhpcyBoYWNrIG1ha2VzXG5cdC8vIHNwZWNpZnlpbmcgY3VzdG9tIEhvc3QgaGVhZGVyIHBvc3NpYmxlLlxuXHRjb25zdCBob3N0SGVhZGVyS2V5ID0gZmluZChoZWFkZXJzW01BUF0sICdIb3N0Jyk7XG5cdGlmIChob3N0SGVhZGVyS2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRvYmpbaG9zdEhlYWRlcktleV0gPSBvYmpbaG9zdEhlYWRlcktleV1bMF07XG5cdH1cblxuXHRyZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIEhlYWRlcnMgb2JqZWN0IGZyb20gYW4gb2JqZWN0IG9mIGhlYWRlcnMsIGlnbm9yaW5nIHRob3NlIHRoYXQgZG9cbiAqIG5vdCBjb25mb3JtIHRvIEhUVFAgZ3JhbW1hciBwcm9kdWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0gICBPYmplY3QgIG9iaiAgT2JqZWN0IG9mIGhlYWRlcnNcbiAqIEByZXR1cm4gIEhlYWRlcnNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSGVhZGVyc0xlbmllbnQob2JqKSB7XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuXHRcdGlmIChpbnZhbGlkVG9rZW5SZWdleC50ZXN0KG5hbWUpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqW25hbWVdKSkge1xuXHRcdFx0Zm9yIChjb25zdCB2YWwgb2Ygb2JqW25hbWVdKSB7XG5cdFx0XHRcdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChoZWFkZXJzW01BUF1bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXSA9IFt2YWxdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXS5wdXNoKHZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3Qob2JqW25hbWVdKSkge1xuXHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW29ialtuYW1lXV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBoZWFkZXJzO1xufVxuXG5jb25zdCBJTlRFUk5BTFMkMSA9IFN5bWJvbCgnUmVzcG9uc2UgaW50ZXJuYWxzJyk7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlNUQVRVU19DT0RFU1wiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFNUQVRVU19DT0RFUyA9IGh0dHAuU1RBVFVTX0NPREVTO1xuXG4vKipcbiAqIFJlc3BvbnNlIGNsYXNzXG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXNwb25zZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBib2R5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuXHRcdGxldCBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHRcdEJvZHkuY2FsbCh0aGlzLCBib2R5LCBvcHRzKTtcblxuXHRcdGNvbnN0IHN0YXR1cyA9IG9wdHMuc3RhdHVzIHx8IDIwMDtcblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0cy5oZWFkZXJzKTtcblxuXHRcdGlmIChib2R5ICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoYm9keSk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMUyQxXSA9IHtcblx0XHRcdHVybDogb3B0cy51cmwsXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiBvcHRzLnN0YXR1c1RleHQgfHwgU1RBVFVTX0NPREVTW3N0YXR1c10sXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0Y291bnRlcjogb3B0cy5jb3VudGVyXG5cdFx0fTtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnVybCB8fCAnJztcblx0fVxuXG5cdGdldCBzdGF0dXMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cztcblx0fVxuXG5cdC8qKlxuICAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxuICAqL1xuXHRnZXQgb2soKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA+PSAyMDAgJiYgdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzIDwgMzAwO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmNvdW50ZXIgPiAwO1xuXHR9XG5cblx0Z2V0IHN0YXR1c1RleHQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1c1RleHQ7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uaGVhZGVycztcblx0fVxuXG5cdC8qKlxuICAqIENsb25lIHRoaXMgcmVzcG9uc2VcbiAgKlxuICAqIEByZXR1cm4gIFJlc3BvbnNlXG4gICovXG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBuZXcgUmVzcG9uc2UoY2xvbmUodGhpcyksIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLFxuXHRcdFx0b2s6IHRoaXMub2ssXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWRcblx0XHR9KTtcblx0fVxufVxuXG5Cb2R5Lm1peEluKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlc3BvbnNlLnByb3RvdHlwZSwge1xuXHR1cmw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzdGF0dXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRvazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHJlZGlyZWN0ZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzdGF0dXNUZXh0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGVhZGVyczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGNsb25lOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXNwb25zZS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ1Jlc3BvbnNlJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuY29uc3QgSU5URVJOQUxTJDIgPSBTeW1ib2woJ1JlcXVlc3QgaW50ZXJuYWxzJyk7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcImZvcm1hdFwiLCBcInBhcnNlXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgcGFyc2VfdXJsID0gVXJsLnBhcnNlO1xuY29uc3QgZm9ybWF0X3VybCA9IFVybC5mb3JtYXQ7XG5cbmNvbnN0IHN0cmVhbURlc3RydWN0aW9uU3VwcG9ydGVkID0gJ2Rlc3Ryb3knIGluIFN0cmVhbS5SZWFkYWJsZS5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgaW5wdXRcbiAqIEByZXR1cm4gIEJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gaXNSZXF1ZXN0KGlucHV0KSB7XG5cdHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBpbnB1dFtJTlRFUk5BTFMkMl0gPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBpc0Fib3J0U2lnbmFsKHNpZ25hbCkge1xuXHRjb25zdCBwcm90byA9IHNpZ25hbCAmJiB0eXBlb2Ygc2lnbmFsID09PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc2lnbmFsKTtcblx0cmV0dXJuICEhKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBYm9ydFNpZ25hbCcpO1xufVxuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0ICBVcmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICBpbml0ICAgQ3VzdG9tIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgUmVxdWVzdCB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0bGV0IGluaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0bGV0IHBhcnNlZFVSTDtcblxuXHRcdC8vIG5vcm1hbGl6ZSBpbnB1dFxuXHRcdGlmICghaXNSZXF1ZXN0KGlucHV0KSkge1xuXHRcdFx0aWYgKGlucHV0ICYmIGlucHV0LmhyZWYpIHtcblx0XHRcdFx0Ly8gaW4gb3JkZXIgdG8gc3VwcG9ydCBOb2RlLmpzJyBVcmwgb2JqZWN0czsgdGhvdWdoIFdIQVRXRydzIFVSTCBvYmplY3RzXG5cdFx0XHRcdC8vIHdpbGwgZmFsbCBpbnRvIHRoaXMgYnJhbmNoIGFsc28gKHNpbmNlIHRoZWlyIGB0b1N0cmluZygpYCB3aWxsIHJldHVyblxuXHRcdFx0XHQvLyBgaHJlZmAgcHJvcGVydHkgYW55d2F5KVxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQuaHJlZik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBjb2VyY2UgaW5wdXQgdG8gYSBzdHJpbmcgYmVmb3JlIGF0dGVtcHRpbmcgdG8gcGFyc2Vcblx0XHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGAke2lucHV0fWApO1xuXHRcdFx0fVxuXHRcdFx0aW5wdXQgPSB7fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGlucHV0LnVybCk7XG5cdFx0fVxuXG5cdFx0bGV0IG1ldGhvZCA9IGluaXQubWV0aG9kIHx8IGlucHV0Lm1ldGhvZCB8fCAnR0VUJztcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcblxuXHRcdGlmICgoaW5pdC5ib2R5ICE9IG51bGwgfHwgaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsKSAmJiAobWV0aG9kID09PSAnR0VUJyB8fCBtZXRob2QgPT09ICdIRUFEJykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3Qgd2l0aCBHRVQvSEVBRCBtZXRob2QgY2Fubm90IGhhdmUgYm9keScpO1xuXHRcdH1cblxuXHRcdGxldCBpbnB1dEJvZHkgPSBpbml0LmJvZHkgIT0gbnVsbCA/IGluaXQuYm9keSA6IGlzUmVxdWVzdChpbnB1dCkgJiYgaW5wdXQuYm9keSAhPT0gbnVsbCA/IGNsb25lKGlucHV0KSA6IG51bGw7XG5cblx0XHRCb2R5LmNhbGwodGhpcywgaW5wdXRCb2R5LCB7XG5cdFx0XHR0aW1lb3V0OiBpbml0LnRpbWVvdXQgfHwgaW5wdXQudGltZW91dCB8fCAwLFxuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcblxuXHRcdGlmIChpbnB1dEJvZHkgIT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShpbnB1dEJvZHkpO1xuXHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IHNpZ25hbCA9IGlzUmVxdWVzdChpbnB1dCkgPyBpbnB1dC5zaWduYWwgOiBudWxsO1xuXHRcdGlmICgnc2lnbmFsJyBpbiBpbml0KSBzaWduYWwgPSBpbml0LnNpZ25hbDtcblxuXHRcdGlmIChzaWduYWwgIT0gbnVsbCAmJiAhaXNBYm9ydFNpZ25hbChzaWduYWwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzaWduYWwgdG8gYmUgYW4gaW5zdGFuY2VvZiBBYm9ydFNpZ25hbCcpO1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDJdID0ge1xuXHRcdFx0bWV0aG9kLFxuXHRcdFx0cmVkaXJlY3Q6IGluaXQucmVkaXJlY3QgfHwgaW5wdXQucmVkaXJlY3QgfHwgJ2ZvbGxvdycsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0cGFyc2VkVVJMLFxuXHRcdFx0c2lnbmFsXG5cdFx0fTtcblxuXHRcdC8vIG5vZGUtZmV0Y2gtb25seSBvcHRpb25zXG5cdFx0dGhpcy5mb2xsb3cgPSBpbml0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5pdC5mb2xsb3cgOiBpbnB1dC5mb2xsb3cgIT09IHVuZGVmaW5lZCA/IGlucHV0LmZvbGxvdyA6IDIwO1xuXHRcdHRoaXMuY29tcHJlc3MgPSBpbml0LmNvbXByZXNzICE9PSB1bmRlZmluZWQgPyBpbml0LmNvbXByZXNzIDogaW5wdXQuY29tcHJlc3MgIT09IHVuZGVmaW5lZCA/IGlucHV0LmNvbXByZXNzIDogdHJ1ZTtcblx0XHR0aGlzLmNvdW50ZXIgPSBpbml0LmNvdW50ZXIgfHwgaW5wdXQuY291bnRlciB8fCAwO1xuXHRcdHRoaXMuYWdlbnQgPSBpbml0LmFnZW50IHx8IGlucHV0LmFnZW50O1xuXHR9XG5cblx0Z2V0IG1ldGhvZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ubWV0aG9kO1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gZm9ybWF0X3VybCh0aGlzW0lOVEVSTkFMUyQyXS5wYXJzZWRVUkwpO1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLmhlYWRlcnM7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnJlZGlyZWN0O1xuXHR9XG5cblx0Z2V0IHNpZ25hbCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uc2lnbmFsO1xuXHR9XG5cblx0LyoqXG4gICogQ2xvbmUgdGhpcyByZXF1ZXN0XG4gICpcbiAgKiBAcmV0dXJuICBSZXF1ZXN0XG4gICovXG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBuZXcgUmVxdWVzdCh0aGlzKTtcblx0fVxufVxuXG5Cb2R5Lm1peEluKFJlcXVlc3QucHJvdG90eXBlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdSZXF1ZXN0Jyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0bWV0aG9kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGVhZGVyczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHJlZGlyZWN0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzaWduYWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgUmVxdWVzdCB0byBOb2RlLmpzIGh0dHAgcmVxdWVzdCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAgIFJlcXVlc3QgIEEgUmVxdWVzdCBpbnN0YW5jZVxuICogQHJldHVybiAgT2JqZWN0ICAgVGhlIG9wdGlvbnMgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBodHRwLnJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gZ2V0Tm9kZVJlcXVlc3RPcHRpb25zKHJlcXVlc3QpIHtcblx0Y29uc3QgcGFyc2VkVVJMID0gcmVxdWVzdFtJTlRFUk5BTFMkMl0ucGFyc2VkVVJMO1xuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdFtJTlRFUk5BTFMkMl0uaGVhZGVycyk7XG5cblx0Ly8gZmV0Y2ggc3RlcCAxLjNcblx0aWYgKCFoZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0JywgJyovKicpO1xuXHR9XG5cblx0Ly8gQmFzaWMgZmV0Y2hcblx0aWYgKCFwYXJzZWRVUkwucHJvdG9jb2wgfHwgIXBhcnNlZFVSTC5ob3N0bmFtZSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09ubHkgYWJzb2x1dGUgVVJMcyBhcmUgc3VwcG9ydGVkJyk7XG5cdH1cblxuXHRpZiAoIS9eaHR0cHM/OiQvLnRlc3QocGFyc2VkVVJMLnByb3RvY29sKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09ubHkgSFRUUChTKSBwcm90b2NvbHMgYXJlIHN1cHBvcnRlZCcpO1xuXHR9XG5cblx0aWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSAmJiAhc3RyZWFtRGVzdHJ1Y3Rpb25TdXBwb3J0ZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbmNlbGxhdGlvbiBvZiBzdHJlYW1lZCByZXF1ZXN0cyB3aXRoIEFib3J0U2lnbmFsIGlzIG5vdCBzdXBwb3J0ZWQgaW4gbm9kZSA8IDgnKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwcyAyLjQtMi43XG5cdGxldCBjb250ZW50TGVuZ3RoVmFsdWUgPSBudWxsO1xuXHRpZiAocmVxdWVzdC5ib2R5ID09IG51bGwgJiYgL14oUE9TVHxQVVQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG5cdFx0Y29udGVudExlbmd0aFZhbHVlID0gJzAnO1xuXHR9XG5cdGlmIChyZXF1ZXN0LmJvZHkgIT0gbnVsbCkge1xuXHRcdGNvbnN0IHRvdGFsQnl0ZXMgPSBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpO1xuXHRcdGlmICh0eXBlb2YgdG90YWxCeXRlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9IFN0cmluZyh0b3RhbEJ5dGVzKTtcblx0XHR9XG5cdH1cblx0aWYgKGNvbnRlbnRMZW5ndGhWYWx1ZSkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb250ZW50LUxlbmd0aCcsIGNvbnRlbnRMZW5ndGhWYWx1ZSk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjExXG5cdGlmICghaGVhZGVycy5oYXMoJ1VzZXItQWdlbnQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdVc2VyLUFnZW50JywgJ25vZGUtZmV0Y2gvMS4wICgraHR0cHM6Ly9naXRodWIuY29tL2JpdGlubi9ub2RlLWZldGNoKScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xNVxuXHRpZiAocmVxdWVzdC5jb21wcmVzcyAmJiAhaGVhZGVycy5oYXMoJ0FjY2VwdC1FbmNvZGluZycpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLGRlZmxhdGUnKTtcblx0fVxuXG5cdGxldCBhZ2VudCA9IHJlcXVlc3QuYWdlbnQ7XG5cdGlmICh0eXBlb2YgYWdlbnQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRhZ2VudCA9IGFnZW50KHBhcnNlZFVSTCk7XG5cdH1cblxuXHRpZiAoIWhlYWRlcnMuaGFzKCdDb25uZWN0aW9uJykgJiYgIWFnZW50KSB7XG5cdFx0aGVhZGVycy5zZXQoJ0Nvbm5lY3Rpb24nLCAnY2xvc2UnKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDQuMlxuXHQvLyBjaHVua2VkIGVuY29kaW5nIGlzIGhhbmRsZWQgYnkgTm9kZS5qc1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwYXJzZWRVUkwsIHtcblx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdGhlYWRlcnM6IGV4cG9ydE5vZGVDb21wYXRpYmxlSGVhZGVycyhoZWFkZXJzKSxcblx0XHRhZ2VudFxuXHR9KTtcbn1cblxuLyoqXG4gKiBhYm9ydC1lcnJvci5qc1xuICpcbiAqIEFib3J0RXJyb3IgaW50ZXJmYWNlIGZvciBjYW5jZWxsZWQgcmVxdWVzdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBBYm9ydEVycm9yIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG4gKiBAcmV0dXJuICBBYm9ydEVycm9yXG4gKi9cbmZ1bmN0aW9uIEFib3J0RXJyb3IobWVzc2FnZSkge1xuICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIHRoaXMudHlwZSA9ICdhYm9ydGVkJztcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAvLyBoaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5BYm9ydEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkFib3J0RXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWJvcnRFcnJvcjtcbkFib3J0RXJyb3IucHJvdG90eXBlLm5hbWUgPSAnQWJvcnRFcnJvcic7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlBhc3NUaHJvdWdoXCIsIFwicmVzb2x2ZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFBhc3NUaHJvdWdoJDEgPSBTdHJlYW0uUGFzc1Rocm91Z2g7XG5jb25zdCByZXNvbHZlX3VybCA9IFVybC5yZXNvbHZlO1xuXG4vKipcbiAqIEZldGNoIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICAgdXJsICAgQWJzb2x1dGUgdXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgIG9wdHMgIEZldGNoIG9wdGlvbnNcbiAqIEByZXR1cm4gIFByb21pc2VcbiAqL1xuZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRzKSB7XG5cblx0Ly8gYWxsb3cgY3VzdG9tIHByb21pc2Vcblx0aWYgKCFmZXRjaC5Qcm9taXNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCduYXRpdmUgcHJvbWlzZSBtaXNzaW5nLCBzZXQgZmV0Y2guUHJvbWlzZSB0byB5b3VyIGZhdm9yaXRlIGFsdGVybmF0aXZlJyk7XG5cdH1cblxuXHRCb2R5LlByb21pc2UgPSBmZXRjaC5Qcm9taXNlO1xuXG5cdC8vIHdyYXAgaHR0cC5yZXF1ZXN0IGludG8gZmV0Y2hcblx0cmV0dXJuIG5ldyBmZXRjaC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHQvLyBidWlsZCByZXF1ZXN0IG9iamVjdFxuXHRcdGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIG9wdHMpO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCk7XG5cblx0XHRjb25zdCBzZW5kID0gKG9wdGlvbnMucHJvdG9jb2wgPT09ICdodHRwczonID8gaHR0cHMgOiBodHRwKS5yZXF1ZXN0O1xuXHRcdGNvbnN0IHNpZ25hbCA9IHJlcXVlc3Quc2lnbmFsO1xuXG5cdFx0bGV0IHJlc3BvbnNlID0gbnVsbDtcblxuXHRcdGNvbnN0IGFib3J0ID0gZnVuY3Rpb24gYWJvcnQoKSB7XG5cdFx0XHRsZXQgZXJyb3IgPSBuZXcgQWJvcnRFcnJvcignVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyk7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0aWYgKHJlcXVlc3QuYm9keSAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0cmVxdWVzdC5ib2R5LmRlc3Ryb3koZXJyb3IpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuYm9keSkgcmV0dXJuO1xuXHRcdFx0cmVzcG9uc2UuYm9keS5lbWl0KCdlcnJvcicsIGVycm9yKTtcblx0XHR9O1xuXG5cdFx0aWYgKHNpZ25hbCAmJiBzaWduYWwuYWJvcnRlZCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBhYm9ydEFuZEZpbmFsaXplID0gZnVuY3Rpb24gYWJvcnRBbmRGaW5hbGl6ZSgpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH07XG5cblx0XHQvLyBzZW5kIHJlcXVlc3Rcblx0XHRjb25zdCByZXEgPSBzZW5kKG9wdGlvbnMpO1xuXHRcdGxldCByZXFUaW1lb3V0O1xuXG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZmluYWxpemUoKSB7XG5cdFx0XHRyZXEuYWJvcnQoKTtcblx0XHRcdGlmIChzaWduYWwpIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXHRcdH1cblxuXHRcdGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcblx0XHRcdHJlcS5vbmNlKCdzb2NrZXQnLCBmdW5jdGlvbiAoc29ja2V0KSB7XG5cdFx0XHRcdHJlcVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYG5ldHdvcmsgdGltZW91dCBhdDogJHtyZXF1ZXN0LnVybH1gLCAncmVxdWVzdC10aW1lb3V0JykpO1xuXHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdH0sIHJlcXVlc3QudGltZW91dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZXF1ZXN0IHRvICR7cmVxdWVzdC51cmx9IGZhaWxlZCwgcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fSk7XG5cblx0XHRyZXEub24oJ3Jlc3BvbnNlJywgZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJzID0gY3JlYXRlSGVhZGVyc0xlbmllbnQocmVzLmhlYWRlcnMpO1xuXG5cdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNVxuXHRcdFx0aWYgKGZldGNoLmlzUmVkaXJlY3QocmVzLnN0YXR1c0NvZGUpKSB7XG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjJcblx0XHRcdFx0Y29uc3QgbG9jYXRpb24gPSBoZWFkZXJzLmdldCgnTG9jYXRpb24nKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4zXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uVVJMID0gbG9jYXRpb24gPT09IG51bGwgPyBudWxsIDogcmVzb2x2ZV91cmwocmVxdWVzdC51cmwsIGxvY2F0aW9uKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS41XG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgcmVkaXJlY3QgbW9kZSBpcyBzZXQgdG8gZXJyb3I6ICR7cmVxdWVzdC51cmx9YCwgJ25vLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRjYXNlICdtYW51YWwnOlxuXHRcdFx0XHRcdFx0Ly8gbm9kZS1mZXRjaC1zcGVjaWZpYyBzdGVwOiBtYWtlIG1hbnVhbCByZWRpcmVjdCBhIGJpdCBlYXNpZXIgdG8gdXNlIGJ5IHNldHRpbmcgdGhlIExvY2F0aW9uIGhlYWRlciB2YWx1ZSB0byB0aGUgcmVzb2x2ZWQgVVJMLlxuXHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVVJMICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGhhbmRsZSBjb3JydXB0ZWQgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVycy5zZXQoJ0xvY2F0aW9uJywgbG9jYXRpb25VUkwpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm9kZWpzIHNlcnZlciBwcmV2ZW50IGludmFsaWQgcmVzcG9uc2UgaGVhZGVycywgd2UgY2FuJ3QgdGVzdCB0aGlzIHRocm91Z2ggbm9ybWFsIHJlcXVlc3Rcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnZm9sbG93Jzpcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA1XG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbWF4aW11bSByZWRpcmVjdCByZWFjaGVkIGF0OiAke3JlcXVlc3QudXJsfWAsICdtYXgtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdE9wdHMgPSB7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXG5cdFx0XHRcdFx0XHRcdGZvbGxvdzogcmVxdWVzdC5mb2xsb3csXG5cdFx0XHRcdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlciArIDEsXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxuXHRcdFx0XHRcdFx0XHRjb21wcmVzczogcmVxdWVzdC5jb21wcmVzcyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0Ym9keTogcmVxdWVzdC5ib2R5LFxuXHRcdFx0XHRcdFx0XHRzaWduYWw6IHJlcXVlc3Quc2lnbmFsLFxuXHRcdFx0XHRcdFx0XHR0aW1lb3V0OiByZXF1ZXN0LnRpbWVvdXRcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA5XG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgIT09IDMwMyAmJiByZXF1ZXN0LmJvZHkgJiYgZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoJ0Nhbm5vdCBmb2xsb3cgcmVkaXJlY3Qgd2l0aCBib2R5IGJlaW5nIGEgcmVhZGFibGUgc3RyZWFtJywgJ3Vuc3VwcG9ydGVkLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxMVxuXHRcdFx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDMgfHwgKHJlcy5zdGF0dXNDb2RlID09PSAzMDEgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDMwMikgJiYgcmVxdWVzdC5tZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5tZXRob2QgPSAnR0VUJztcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMuYm9keSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtbGVuZ3RoJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxNVxuXHRcdFx0XHRcdFx0cmVzb2x2ZShmZXRjaChuZXcgUmVxdWVzdChsb2NhdGlvblVSTCwgcmVxdWVzdE9wdHMpKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHByZXBhcmUgcmVzcG9uc2Vcblx0XHRcdHJlcy5vbmNlKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChzaWduYWwpIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgYm9keSA9IHJlcy5waXBlKG5ldyBQYXNzVGhyb3VnaCQxKCkpO1xuXG5cdFx0XHRjb25zdCByZXNwb25zZV9vcHRpb25zID0ge1xuXHRcdFx0XHR1cmw6IHJlcXVlc3QudXJsLFxuXHRcdFx0XHRzdGF0dXM6IHJlcy5zdGF0dXNDb2RlLFxuXHRcdFx0XHRzdGF0dXNUZXh0OiByZXMuc3RhdHVzTWVzc2FnZSxcblx0XHRcdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRcdFx0c2l6ZTogcmVxdWVzdC5zaXplLFxuXHRcdFx0XHR0aW1lb3V0OiByZXF1ZXN0LnRpbWVvdXQsXG5cdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlclxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjNcblx0XHRcdGNvbnN0IGNvZGluZ3MgPSBoZWFkZXJzLmdldCgnQ29udGVudC1FbmNvZGluZycpO1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuNDogaGFuZGxlIGNvbnRlbnQgY29kaW5nc1xuXG5cdFx0XHQvLyBpbiBmb2xsb3dpbmcgc2NlbmFyaW9zIHdlIGlnbm9yZSBjb21wcmVzc2lvbiBzdXBwb3J0XG5cdFx0XHQvLyAxLiBjb21wcmVzc2lvbiBzdXBwb3J0IGlzIGRpc2FibGVkXG5cdFx0XHQvLyAyLiBIRUFEIHJlcXVlc3Rcblx0XHRcdC8vIDMuIG5vIENvbnRlbnQtRW5jb2RpbmcgaGVhZGVyXG5cdFx0XHQvLyA0LiBubyBjb250ZW50IHJlc3BvbnNlICgyMDQpXG5cdFx0XHQvLyA1LiBjb250ZW50IG5vdCBtb2RpZmllZCByZXNwb25zZSAoMzA0KVxuXHRcdFx0aWYgKCFyZXF1ZXN0LmNvbXByZXNzIHx8IHJlcXVlc3QubWV0aG9kID09PSAnSEVBRCcgfHwgY29kaW5ncyA9PT0gbnVsbCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMjA0IHx8IHJlcy5zdGF0dXNDb2RlID09PSAzMDQpIHtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBOb2RlIHY2K1xuXHRcdFx0Ly8gQmUgbGVzcyBzdHJpY3Qgd2hlbiBkZWNvZGluZyBjb21wcmVzc2VkIHJlc3BvbnNlcywgc2luY2Ugc29tZXRpbWVzXG5cdFx0XHQvLyBzZXJ2ZXJzIHNlbmQgc2xpZ2h0bHkgaW52YWxpZCByZXNwb25zZXMgdGhhdCBhcmUgc3RpbGwgYWNjZXB0ZWRcblx0XHRcdC8vIGJ5IGNvbW1vbiBicm93c2Vycy5cblx0XHRcdC8vIEFsd2F5cyB1c2luZyBaX1NZTkNfRkxVU0ggaXMgd2hhdCBjVVJMIGRvZXMuXG5cdFx0XHRjb25zdCB6bGliT3B0aW9ucyA9IHtcblx0XHRcdFx0Zmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNILFxuXHRcdFx0XHRmaW5pc2hGbHVzaDogemxpYi5aX1NZTkNfRkxVU0hcblx0XHRcdH07XG5cblx0XHRcdC8vIGZvciBnemlwXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnZ3ppcCcgfHwgY29kaW5ncyA9PSAneC1nemlwJykge1xuXHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlR3VuemlwKHpsaWJPcHRpb25zKSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBmb3IgZGVmbGF0ZVxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2RlZmxhdGUnIHx8IGNvZGluZ3MgPT0gJ3gtZGVmbGF0ZScpIHtcblx0XHRcdFx0Ly8gaGFuZGxlIHRoZSBpbmZhbW91cyByYXcgZGVmbGF0ZSByZXNwb25zZSBmcm9tIG9sZCBzZXJ2ZXJzXG5cdFx0XHRcdC8vIGEgaGFjayBmb3Igb2xkIElJUyBhbmQgQXBhY2hlIHNlcnZlcnNcblx0XHRcdFx0Y29uc3QgcmF3ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRcdFx0Ly8gc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzc1MTk4Mjhcblx0XHRcdFx0XHRpZiAoKGNodW5rWzBdICYgMHgwRikgPT09IDB4MDgpIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVJbmZsYXRlKCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlSW5mbGF0ZVJhdygpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBiclxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2JyJyAmJiB0eXBlb2YgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCkpO1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gb3RoZXJ3aXNlLCB1c2UgcmVzcG9uc2UgYXMtaXNcblx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0fSk7XG5cblx0XHR3cml0ZVRvU3RyZWFtKHJlcSwgcmVxdWVzdCk7XG5cdH0pO1xufVxuLyoqXG4gKiBSZWRpcmVjdCBjb2RlIG1hdGNoaW5nXG4gKlxuICogQHBhcmFtICAgTnVtYmVyICAgY29kZSAgU3RhdHVzIGNvZGVcbiAqIEByZXR1cm4gIEJvb2xlYW5cbiAqL1xuZmV0Y2guaXNSZWRpcmVjdCA9IGZ1bmN0aW9uIChjb2RlKSB7XG5cdHJldHVybiBjb2RlID09PSAzMDEgfHwgY29kZSA9PT0gMzAyIHx8IGNvZGUgPT09IDMwMyB8fCBjb2RlID09PSAzMDcgfHwgY29kZSA9PT0gMzA4O1xufTtcblxuLy8gZXhwb3NlIFByb21pc2VcbmZldGNoLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuZnVuY3Rpb24gZ2V0X3BhZ2VfaGFuZGxlcihcblx0bWFuaWZlc3QsXG5cdHNlc3Npb25fZ2V0dGVyXG4pIHtcblx0Y29uc3QgZ2V0X2J1aWxkX2luZm8gPSBkZXZcblx0XHQ/ICgpID0+IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdidWlsZC5qc29uJyksICd1dGYtOCcpKVxuXHRcdDogKGFzc2V0cyA9PiAoKSA9PiBhc3NldHMpKEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdidWlsZC5qc29uJyksICd1dGYtOCcpKSk7XG5cblx0Y29uc3QgdGVtcGxhdGUgPSBkZXZcblx0XHQ/ICgpID0+IHJlYWRfdGVtcGxhdGUoc3JjX2Rpcilcblx0XHQ6IChzdHIgPT4gKCkgPT4gc3RyKShyZWFkX3RlbXBsYXRlKGJ1aWxkX2RpcikpO1xuXG5cdGNvbnN0IGhhc19zZXJ2aWNlX3dvcmtlciA9IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpO1xuXG5cdGNvbnN0IHsgc2VydmVyX3JvdXRlcywgcGFnZXMgfSA9IG1hbmlmZXN0O1xuXHRjb25zdCBlcnJvcl9yb3V0ZSA9IG1hbmlmZXN0LmVycm9yO1xuXG5cdGZ1bmN0aW9uIGJhaWwocmVxLCByZXMsIGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblxuXHRcdGNvbnN0IG1lc3NhZ2UgPSBkZXYgPyBlc2NhcGVfaHRtbChlcnIubWVzc2FnZSkgOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJztcblxuXHRcdHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuXHRcdHJlcy5lbmQoYDxwcmU+JHttZXNzYWdlfTwvcHJlPmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlX2Vycm9yKHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvcikge1xuXHRcdGhhbmRsZV9wYWdlKHtcblx0XHRcdHBhdHRlcm46IG51bGwsXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IG51bGwsIGNvbXBvbmVudDogZXJyb3Jfcm91dGUgfVxuXHRcdFx0XVxuXHRcdH0sIHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3IgaW4gcHJlbG9hZCBmdW5jdGlvbicpKTtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9wYWdlKHBhZ2UsIHJlcSwgcmVzLCBzdGF0dXMgPSAyMDAsIGVycm9yID0gbnVsbCkge1xuXHRcdGNvbnN0IGlzX3NlcnZpY2Vfd29ya2VyX2luZGV4ID0gcmVxLnBhdGggPT09ICcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCc7XG5cdFx0Y29uc3QgYnVpbGRfaW5mb1xuXG5cblxuXG4gPSBnZXRfYnVpbGRfaW5mbygpO1xuXG5cdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuXHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBkZXYgPyAnbm8tY2FjaGUnIDogJ21heC1hZ2U9NjAwJyk7XG5cblx0XHQvLyBwcmVsb2FkIG1haW4uanMgYW5kIGN1cnJlbnQgcm91dGVcblx0XHQvLyBUT0RPIGRldGVjdCBvdGhlciBzdHVmZiB3ZSBjYW4gcHJlbG9hZD8gaW1hZ2VzLCBDU1MsIGZvbnRzP1xuXHRcdGxldCBwcmVsb2FkZWRfY2h1bmtzID0gQXJyYXkuaXNBcnJheShidWlsZF9pbmZvLmFzc2V0cy5tYWluKSA/IGJ1aWxkX2luZm8uYXNzZXRzLm1haW4gOiBbYnVpbGRfaW5mby5hc3NldHMubWFpbl07XG5cdFx0aWYgKCFlcnJvciAmJiAhaXNfc2VydmljZV93b3JrZXJfaW5kZXgpIHtcblx0XHRcdHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcblx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm47XG5cblx0XHRcdFx0Ly8gdXNpbmcgY29uY2F0IGJlY2F1c2UgaXQgY291bGQgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuIHRoYW5rcyB3ZWJwYWNrIVxuXHRcdFx0XHRwcmVsb2FkZWRfY2h1bmtzID0gcHJlbG9hZGVkX2NodW5rcy5jb25jYXQoYnVpbGRfaW5mby5hc3NldHNbcGFydC5uYW1lXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xuXHRcdFx0Ly8gVE9ETyBhZGQgZGVwZW5kZW5jaWVzIGFuZCBDU1Ncblx0XHRcdGNvbnN0IGxpbmsgPSBwcmVsb2FkZWRfY2h1bmtzXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXG5cdFx0XHRcdC5tYXAoZmlsZSA9PiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJtb2R1bGVwcmVsb2FkXCJgKVxuXHRcdFx0XHQuam9pbignLCAnKTtcblxuXHRcdFx0cmVzLnNldEhlYWRlcignTGluaycsIGxpbmspO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBsaW5rID0gcHJlbG9hZGVkX2NodW5rc1xuXHRcdFx0XHQuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAhZmlsZS5tYXRjaCgvXFwubWFwJC8pKVxuXHRcdFx0XHQubWFwKChmaWxlKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgYXMgPSAvXFwuY3NzJC8udGVzdChmaWxlKSA/ICdzdHlsZScgOiAnc2NyaXB0Jztcblx0XHRcdFx0XHRyZXR1cm4gYDwke3JlcS5iYXNlVXJsfS9jbGllbnQvJHtmaWxlfT47cmVsPVwicHJlbG9hZFwiO2FzPVwiJHthc31cImA7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5qb2luKCcsICcpO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XG5cdFx0fVxuXG5cdFx0bGV0IHNlc3Npb247XG5cdFx0dHJ5IHtcblx0XHRcdHNlc3Npb24gPSBhd2FpdCBzZXNzaW9uX2dldHRlcihyZXEsIHJlcyk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRyZXR1cm4gYmFpbChyZXEsIHJlcywgZXJyKTtcblx0XHR9XG5cblx0XHRsZXQgcmVkaXJlY3Q7XG5cdFx0bGV0IHByZWxvYWRfZXJyb3I7XG5cblx0XHRjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG5cdFx0XHRyZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XG5cdFx0XHRcdGlmIChyZWRpcmVjdCAmJiAocmVkaXJlY3Quc3RhdHVzQ29kZSAhPT0gc3RhdHVzQ29kZSB8fCByZWRpcmVjdC5sb2NhdGlvbiAhPT0gbG9jYXRpb24pKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb25mbGljdGluZyByZWRpcmVjdHNgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsb2NhdGlvbiA9IGxvY2F0aW9uLnJlcGxhY2UoL15cXC8vZywgJycpOyAvLyBsZWFkaW5nIHNsYXNoIChvbmx5KVxuXHRcdFx0XHRyZWRpcmVjdCA9IHsgc3RhdHVzQ29kZSwgbG9jYXRpb24gfTtcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogKHN0YXR1c0NvZGUsIG1lc3NhZ2UpID0+IHtcblx0XHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZSwgbWVzc2FnZSB9O1xuXHRcdFx0fSxcblx0XHRcdGZldGNoOiAodXJsLCBvcHRzKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBhcnNlZCA9IG5ldyBVcmwuVVJMKHVybCwgYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfSR7cmVxLmJhc2VVcmwgPyByZXEuYmFzZVVybCArICcvJyA6Jyd9YCk7XG5cblx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuXG5cdFx0XHRcdGNvbnN0IGluY2x1ZGVfY3JlZGVudGlhbHMgPSAoXG5cdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XG5cdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyAhPT0gJ29taXQnICYmIHBhcnNlZC5vcmlnaW4gPT09IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKGluY2x1ZGVfY3JlZGVudGlhbHMpIHtcblx0XHRcdFx0XHRvcHRzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmhlYWRlcnMpO1xuXG5cdFx0XHRcdFx0Y29uc3QgY29va2llcyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdGNvb2tpZS5wYXJzZShyZXEuaGVhZGVycy5jb29raWUgfHwgJycpLFxuXHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKG9wdHMuaGVhZGVycy5jb29raWUgfHwgJycpXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGNvbnN0IHNldF9jb29raWUgPSByZXMuZ2V0SGVhZGVyKCdTZXQtQ29va2llJyk7XG5cdFx0XHRcdFx0KEFycmF5LmlzQXJyYXkoc2V0X2Nvb2tpZSkgPyBzZXRfY29va2llIDogW3NldF9jb29raWVdKS5mb3JFYWNoKHN0ciA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkgY29va2llc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGNvbnN0IHN0ciA9IE9iamVjdC5rZXlzKGNvb2tpZXMpXG5cdFx0XHRcdFx0XHQubWFwKGtleSA9PiBgJHtrZXl9PSR7Y29va2llc1trZXldfWApXG5cdFx0XHRcdFx0XHQuam9pbignOyAnKTtcblxuXHRcdFx0XHRcdG9wdHMuaGVhZGVycy5jb29raWUgPSBzdHI7XG5cblx0XHRcdFx0XHRpZiAoIW9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmV0Y2gocGFyc2VkLmhyZWYsIG9wdHMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRsZXQgcHJlbG9hZGVkO1xuXHRcdGxldCBtYXRjaDtcblx0XHRsZXQgcGFyYW1zO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJvb3RfcHJlbG9hZGVkID0gbWFuaWZlc3Qucm9vdF9wcmVsb2FkXG5cdFx0XHRcdD8gbWFuaWZlc3Qucm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdHBhcmFtczoge31cblx0XHRcdFx0fSwgc2Vzc2lvbilcblx0XHRcdFx0OiB7fTtcblxuXHRcdFx0bWF0Y2ggPSBlcnJvciA/IG51bGwgOiBwYWdlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCk7XG5cblxuXHRcdFx0bGV0IHRvUHJlbG9hZCA9IFtyb290X3ByZWxvYWRlZF07XG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdHRvUHJlbG9hZCA9IHRvUHJlbG9hZC5jb25jYXQocGFnZS5wYXJ0cy5tYXAocGFydCA9PiB7XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblxuXHRcdFx0XHRcdC8vIHRoZSBkZWVwZXN0IGxldmVsIGlzIHVzZWQgYmVsb3csIHRvIGluaXRpYWxpc2UgdGhlIHN0b3JlXG5cdFx0XHRcdFx0cGFyYW1zID0gcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyhtYXRjaCkgOiB7fTtcblxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnByZWxvYWRcblx0XHRcdFx0XHRcdD8gcGFydC5wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0XHRcdHBhdGg6IHJlcS5wYXRoLFxuXHRcdFx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdFx0XHRwYXJhbXNcblx0XHRcdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdFx0XHQ6IHt9O1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRlZCA9IGF3YWl0IFByb21pc2UuYWxsKHRvUHJlbG9hZCk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGJhaWwocmVxLCByZXMsIGVycilcblx0XHRcdH1cblxuXHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZTogNTAwLCBtZXNzYWdlOiBlcnIgfTtcblx0XHRcdHByZWxvYWRlZCA9IFtdOyAvLyBhcHBlYXNlIFR5cGVTY3JpcHRcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKHJlZGlyZWN0KSB7XG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gVXJsLnJlc29sdmUoKHJlcS5iYXNlVXJsIHx8ICcnKSArICcvJywgcmVkaXJlY3QubG9jYXRpb24pO1xuXG5cdFx0XHRcdHJlcy5zdGF0dXNDb2RlID0gcmVkaXJlY3Quc3RhdHVzQ29kZTtcblx0XHRcdFx0cmVzLnNldEhlYWRlcignTG9jYXRpb24nLCBsb2NhdGlvbik7XG5cdFx0XHRcdHJlcy5lbmQoKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwcmVsb2FkX2Vycm9yKSB7XG5cdFx0XHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgcHJlbG9hZF9lcnJvci5zdGF0dXNDb2RlLCBwcmVsb2FkX2Vycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gcmVxLnBhdGguc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRcdC8vIFRPRE8gbWFrZSB0aGlzIGxlc3MgY29uZnVzaW5nXG5cdFx0XHRjb25zdCBsYXlvdXRfc2VnbWVudHMgPSBbc2VnbWVudHNbMF1dO1xuXHRcdFx0bGV0IGwgPSAxO1xuXG5cdFx0XHRwYWdlLnBhcnRzLmZvckVhY2goKHBhcnQsIGkpID0+IHtcblx0XHRcdFx0bGF5b3V0X3NlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdO1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybiBudWxsO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHRcdHN0b3Jlczoge1xuXHRcdFx0XHRcdHBhZ2U6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUoe1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9KS5zdWJzY3JpYmVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHByZWxvYWRpbmc6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUobnVsbCkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXNzaW9uOiB3cml0YWJsZShzZXNzaW9uKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWdtZW50czogbGF5b3V0X3NlZ21lbnRzLFxuXHRcdFx0XHRzdGF0dXM6IGVycm9yID8gc3RhdHVzIDogMjAwLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgPyBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiB7IG1lc3NhZ2U6IGVycm9yIH0gOiBudWxsLFxuXHRcdFx0XHRsZXZlbDA6IHtcblx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkWzBdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxldmVsMToge1xuXHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxuXHRcdFx0XHRcdHByb3BzOiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdGxldCBsID0gMTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlLnBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydCA9IHBhZ2UucGFydHNbaV07XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSBjb250aW51ZTtcblxuXHRcdFx0XHRcdHByb3BzW2BsZXZlbCR7bCsrfWBdID0ge1xuXHRcdFx0XHRcdFx0Y29tcG9uZW50OiBwYXJ0LmNvbXBvbmVudCxcblx0XHRcdFx0XHRcdHByb3BzOiBwcmVsb2FkZWRbaSArIDFdIHx8IHt9LFxuXHRcdFx0XHRcdFx0c2VnbWVudDogc2VnbWVudHNbaV1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHsgaHRtbCwgaGVhZCwgY3NzIH0gPSBBcHAucmVuZGVyKHByb3BzKTtcblxuXHRcdFx0Y29uc3Qgc2VyaWFsaXplZCA9IHtcblx0XHRcdFx0cHJlbG9hZGVkOiBgWyR7cHJlbG9hZGVkLm1hcChkYXRhID0+IHRyeV9zZXJpYWxpemUoZGF0YSkpLmpvaW4oJywnKX1dYCxcblx0XHRcdFx0c2Vzc2lvbjogc2Vzc2lvbiAmJiB0cnlfc2VyaWFsaXplKHNlc3Npb24sIGVyciA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2VyaWFsaXplIHNlc3Npb24gZGF0YTogJHtlcnIubWVzc2FnZX1gKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdGVycm9yOiBlcnJvciAmJiBzZXJpYWxpemVfZXJyb3IocHJvcHMuZXJyb3IpXG5cdFx0XHR9O1xuXG5cdFx0XHRsZXQgc2NyaXB0ID0gYF9fU0FQUEVSX189eyR7W1xuXHRcdFx0XHRlcnJvciAmJiBgZXJyb3I6JHtzZXJpYWxpemVkLmVycm9yfSxzdGF0dXM6JHtzdGF0dXN9YCxcblx0XHRcdFx0YGJhc2VVcmw6XCIke3JlcS5iYXNlVXJsfVwiYCxcblx0XHRcdFx0c2VyaWFsaXplZC5wcmVsb2FkZWQgJiYgYHByZWxvYWRlZDoke3NlcmlhbGl6ZWQucHJlbG9hZGVkfWAsXG5cdFx0XHRcdHNlcmlhbGl6ZWQuc2Vzc2lvbiAmJiBgc2Vzc2lvbjoke3NlcmlhbGl6ZWQuc2Vzc2lvbn1gXG5cdFx0XHRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcsJyl9fTtgO1xuXG5cdFx0XHRpZiAoaGFzX3NlcnZpY2Vfd29ya2VyKSB7XG5cdFx0XHRcdHNjcmlwdCArPSBgaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvciluYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignJHtyZXEuYmFzZVVybH0vc2VydmljZS13b3JrZXIuanMnKTtgO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmaWxlID0gW10uY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pLmZpbHRlcihmaWxlID0+IGZpbGUgJiYgL1xcLmpzJC8udGVzdChmaWxlKSlbMF07XG5cdFx0XHRjb25zdCBtYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9YDtcblxuXHRcdFx0aWYgKGJ1aWxkX2luZm8uYnVuZGxlciA9PT0gJ3JvbGx1cCcpIHtcblx0XHRcdFx0aWYgKGJ1aWxkX2luZm8ubGVnYWN5X2Fzc2V0cykge1xuXHRcdFx0XHRcdGNvbnN0IGxlZ2FjeV9tYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC9sZWdhY3kvJHtidWlsZF9pbmZvLmxlZ2FjeV9hc3NldHMubWFpbn1gO1xuXHRcdFx0XHRcdHNjcmlwdCArPSBgKGZ1bmN0aW9uKCl7dHJ5e2V2YWwoXCJhc3luYyBmdW5jdGlvbiB4KCl7fVwiKTt2YXIgbWFpbj1cIiR7bWFpbn1cIn1jYXRjaChlKXttYWluPVwiJHtsZWdhY3lfbWFpbn1cIn07dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9bWFpbjtzLnR5cGU9XCJtb2R1bGVcIjtzLmNyb3NzT3JpZ2luPVwidXNlLWNyZWRlbnRpYWxzXCI7fWNhdGNoKGUpe3Muc3JjPVwiJHtyZXEuYmFzZVVybH0vY2xpZW50L3NoaW1wb3J0QCR7YnVpbGRfaW5mby5zaGltcG9ydH0uanNcIjtzLnNldEF0dHJpYnV0ZShcImRhdGEtbWFpblwiLG1haW4pO31kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO30oKSk7YDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY3JpcHQgKz0gYHZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dHJ5e25ldyBGdW5jdGlvbihcImlmKDApaW1wb3J0KCcnKVwiKSgpO3Muc3JjPVwiJHttYWlufVwiO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsXCIke21haW59XCIpfWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocylgO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY3JpcHQgKz0gYDwvc2NyaXB0PjxzY3JpcHQgc3JjPVwiJHttYWlufVwiPmA7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzdHlsZXM7XG5cblx0XHRcdC8vIFRPRE8gbWFrZSB0aGlzIGNvbnNpc3RlbnQgYWNyb3NzIGFwcHNcblx0XHRcdC8vIFRPRE8gZW1iZWQgYnVpbGRfaW5mbyBpbiBwbGFjZWhvbGRlci50c1xuXHRcdFx0aWYgKGJ1aWxkX2luZm8uY3NzICYmIGJ1aWxkX2luZm8uY3NzLm1haW4pIHtcblx0XHRcdFx0Y29uc3QgY3NzX2NodW5rcyA9IG5ldyBTZXQoKTtcblx0XHRcdFx0aWYgKGJ1aWxkX2luZm8uY3NzLm1haW4pIGNzc19jaHVua3MuYWRkKGJ1aWxkX2luZm8uY3NzLm1haW4pO1xuXHRcdFx0XHRwYWdlLnBhcnRzLmZvckVhY2gocGFydCA9PiB7XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm47XG5cdFx0XHRcdFx0Y29uc3QgY3NzX2NodW5rc19mb3JfcGFydCA9IGJ1aWxkX2luZm8uY3NzLmNodW5rc1twYXJ0LmZpbGVdO1xuXG5cdFx0XHRcdFx0aWYgKGNzc19jaHVua3NfZm9yX3BhcnQpIHtcblx0XHRcdFx0XHRcdGNzc19jaHVua3NfZm9yX3BhcnQuZm9yRWFjaChmaWxlID0+IHtcblx0XHRcdFx0XHRcdFx0Y3NzX2NodW5rcy5hZGQoZmlsZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHN0eWxlcyA9IEFycmF5LmZyb20oY3NzX2NodW5rcylcblx0XHRcdFx0XHQubWFwKGhyZWYgPT4gYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiY2xpZW50LyR7aHJlZn1cIj5gKVxuXHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0eWxlcyA9IChjc3MgJiYgY3NzLmNvZGUgPyBgPHN0eWxlPiR7Y3NzLmNvZGV9PC9zdHlsZT5gIDogJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB1c2VycyBjYW4gc2V0IGEgQ1NQIG5vbmNlIHVzaW5nIHJlcy5sb2NhbHMubm9uY2Vcblx0XHRcdGNvbnN0IG5vbmNlX2F0dHIgPSAocmVzLmxvY2FscyAmJiByZXMubG9jYWxzLm5vbmNlKSA/IGAgbm9uY2U9XCIke3Jlcy5sb2NhbHMubm9uY2V9XCJgIDogJyc7XG5cblx0XHRcdGNvbnN0IGJvZHkgPSB0ZW1wbGF0ZSgpXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmJhc2UlJywgKCkgPT4gYDxiYXNlIGhyZWY9XCIke3JlcS5iYXNlVXJsfS9cIj5gKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5zY3JpcHRzJScsICgpID0+IGA8c2NyaXB0JHtub25jZV9hdHRyfT4ke3NjcmlwdH08L3NjcmlwdD5gKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5odG1sJScsICgpID0+IGh0bWwpXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmhlYWQlJywgKCkgPT4gYDxub3NjcmlwdCBpZD0nc2FwcGVyLWhlYWQtc3RhcnQnPjwvbm9zY3JpcHQ+JHtoZWFkfTxub3NjcmlwdCBpZD0nc2FwcGVyLWhlYWQtZW5kJz48L25vc2NyaXB0PmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLnN0eWxlcyUnLCAoKSA9PiBzdHlsZXMpO1xuXG5cdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcblx0XHRcdHJlcy5lbmQoYm9keSk7XG5cdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRiYWlsKHJlcSwgcmVzLCBlcnIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlX2Vycm9yKHJlcSwgcmVzLCA1MDAsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcblx0XHRpZiAocmVxLnBhdGggPT09ICcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpIHtcblx0XHRcdGNvbnN0IGhvbWVQYWdlID0gcGFnZXMuZmluZChwYWdlID0+IHBhZ2UucGF0dGVybi50ZXN0KCcvJykpO1xuXHRcdFx0aGFuZGxlX3BhZ2UoaG9tZVBhZ2UsIHJlcSwgcmVzKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcblx0XHRcdGlmIChwYWdlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcblx0XHRcdFx0aGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlX2Vycm9yKHJlcSwgcmVzLCA0MDQsICdOb3QgZm91bmQnKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gcmVhZF90ZW1wbGF0ZShkaXIgPSBidWlsZF9kaXIpIHtcblx0cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhgJHtkaXJ9L3RlbXBsYXRlLmh0bWxgLCAndXRmLTgnKTtcbn1cblxuZnVuY3Rpb24gdHJ5X3NlcmlhbGl6ZShkYXRhLCBmYWlsKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRldmFsdWUoZGF0YSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGlmIChmYWlsKSBmYWlsKGVycik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuLy8gRW5zdXJlIHdlIHJldHVybiBzb21ldGhpbmcgdHJ1dGh5IHNvIHRoZSBjbGllbnQgd2lsbCBub3QgcmUtcmVuZGVyIHRoZSBwYWdlIG92ZXIgdGhlIGVycm9yXG5mdW5jdGlvbiBzZXJpYWxpemVfZXJyb3IoZXJyb3IpIHtcblx0aWYgKCFlcnJvcikgcmV0dXJuIG51bGw7XG5cdGxldCBzZXJpYWxpemVkID0gdHJ5X3NlcmlhbGl6ZShlcnJvcik7XG5cdGlmICghc2VyaWFsaXplZCkge1xuXHRcdGNvbnN0IHsgbmFtZSwgbWVzc2FnZSwgc3RhY2sgfSA9IGVycm9yIDtcblx0XHRzZXJpYWxpemVkID0gdHJ5X3NlcmlhbGl6ZSh7IG5hbWUsIG1lc3NhZ2UsIHN0YWNrIH0pO1xuXHR9XG5cdGlmICghc2VyaWFsaXplZCkge1xuXHRcdHNlcmlhbGl6ZWQgPSAne30nO1xuXHR9XG5cdHJldHVybiBzZXJpYWxpemVkO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XG5cdGNvbnN0IGNoYXJzID0ge1xuXHRcdCdcIicgOiAncXVvdCcsXG5cdFx0XCInXCI6ICcjMzknLFxuXHRcdCcmJzogJ2FtcCcsXG5cdFx0JzwnIDogJ2x0Jyxcblx0XHQnPicgOiAnZ3QnXG5cdH07XG5cblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xufVxuXG5mdW5jdGlvbiBtaWRkbGV3YXJlKG9wdHNcblxuXG4gPSB7fSkge1xuXHRjb25zdCB7IHNlc3Npb24sIGlnbm9yZSB9ID0gb3B0cztcblxuXHRsZXQgZW1pdHRlZF9iYXNlcGF0aCA9IGZhbHNlO1xuXG5cdHJldHVybiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgW1xuXHRcdChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdFx0aWYgKHJlcS5iYXNlVXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bGV0IHsgb3JpZ2luYWxVcmwgfSA9IHJlcTtcblx0XHRcdFx0aWYgKHJlcS51cmwgPT09ICcvJyAmJiBvcmlnaW5hbFVybFtvcmlnaW5hbFVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG5cdFx0XHRcdFx0b3JpZ2luYWxVcmwgKz0gJy8nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxLmJhc2VVcmwgPSBvcmlnaW5hbFVybFxuXHRcdFx0XHRcdD8gb3JpZ2luYWxVcmwuc2xpY2UoMCwgLXJlcS51cmwubGVuZ3RoKVxuXHRcdFx0XHRcdDogJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZW1pdHRlZF9iYXNlcGF0aCAmJiBwcm9jZXNzLnNlbmQpIHtcblx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxuXHRcdFx0XHRcdGV2ZW50OiAnYmFzZXBhdGgnLFxuXHRcdFx0XHRcdGJhc2VwYXRoOiByZXEuYmFzZVVybFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRlbWl0dGVkX2Jhc2VwYXRoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlcS5wYXRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVxLnBhdGggPSByZXEudXJsLnJlcGxhY2UoL1xcPy4qLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuZXh0KCk7XG5cdFx0fSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpICYmIHNlcnZlKHtcblx0XHRcdHBhdGhuYW1lOiAnL3NlcnZpY2Utd29ya2VyLmpzJyxcblx0XHRcdGNhY2hlX2NvbnRyb2w6ICduby1jYWNoZSwgbm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZSdcblx0XHR9KSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzLm1hcCcpKSAmJiBzZXJ2ZSh7XG5cdFx0XHRwYXRobmFtZTogJy9zZXJ2aWNlLXdvcmtlci5qcy5tYXAnLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xuXHRcdH0pLFxuXG5cdFx0c2VydmUoe1xuXHRcdFx0cHJlZml4OiAnL2NsaWVudC8nLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogZGV2ID8gJ25vLWNhY2hlJyA6ICdtYXgtYWdlPTMxNTM2MDAwLCBpbW11dGFibGUnXG5cdFx0fSksXG5cblx0XHRnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIobWFuaWZlc3Quc2VydmVyX3JvdXRlcyksXG5cblx0XHRnZXRfcGFnZV9oYW5kbGVyKG1hbmlmZXN0LCBzZXNzaW9uIHx8IG5vb3ApXG5cdF0uZmlsdGVyKEJvb2xlYW4pKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIGhhbmRsZXJzKSB7XG5cdGNvbnN0IHRvdGFsID0gaGFuZGxlcnMubGVuZ3RoO1xuXG5cdGZ1bmN0aW9uIG50aF9oYW5kbGVyKG4sIHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0aWYgKG4gPj0gdG90YWwpIHtcblx0XHRcdHJldHVybiBuZXh0KCk7XG5cdFx0fVxuXG5cdFx0aGFuZGxlcnNbbl0ocmVxLCByZXMsICgpID0+IG50aF9oYW5kbGVyKG4rMSwgcmVxLCByZXMsIG5leHQpKTtcblx0fVxuXG5cdHJldHVybiAhaWdub3JlXG5cdFx0PyAocmVxLCByZXMsIG5leHQpID0+IG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KVxuXHRcdDogKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAoc2hvdWxkX2lnbm9yZShyZXEucGF0aCwgaWdub3JlKSkge1xuXHRcdFx0XHRuZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRudGhfaGFuZGxlcigwLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHR9XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkX2lnbm9yZSh1cmksIHZhbCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSByZXR1cm4gdmFsLnNvbWUoeCA9PiBzaG91bGRfaWdub3JlKHVyaSwgeCkpO1xuXHRpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gdmFsLnRlc3QodXJpKTtcblx0aWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWwodXJpKTtcblx0cmV0dXJuIHVyaS5zdGFydHNXaXRoKHZhbC5jaGFyQ29kZUF0KDApID09PSA0NyA/IHZhbCA6IGAvJHt2YWx9YCk7XG59XG5cbmZ1bmN0aW9uIHNlcnZlKHsgcHJlZml4LCBwYXRobmFtZSwgY2FjaGVfY29udHJvbCB9XG5cblxuXG4pIHtcblx0Y29uc3QgZmlsdGVyID0gcGF0aG5hbWVcblx0XHQ/IChyZXEpID0+IHJlcS5wYXRoID09PSBwYXRobmFtZVxuXHRcdDogKHJlcSkgPT4gcmVxLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpO1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuXG5cdGNvbnN0IHJlYWQgPSBkZXZcblx0XHQ/IChmaWxlKSA9PiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgZmlsZSkpXG5cdFx0OiAoZmlsZSkgPT4gKGNhY2hlLmhhcyhmaWxlKSA/IGNhY2hlIDogY2FjaGUuc2V0KGZpbGUsIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCBmaWxlKSkpKS5nZXQoZmlsZSk7XG5cblx0cmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdGlmIChmaWx0ZXIocmVxKSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9IGxpdGUuZ2V0VHlwZShyZXEucGF0aCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGZpbGUgPSBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQocmVxLnBhdGgpKTtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlYWQoZmlsZSk7XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgdHlwZSk7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBjYWNoZV9jb250cm9sKTtcblx0XHRcdFx0cmVzLmVuZChkYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDQwNDtcblx0XHRcdFx0cmVzLmVuZCgnbm90IGZvdW5kJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHQoKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKXt9XG5cbmV4cG9ydCB7IG1pZGRsZXdhcmUgfTtcbiIsIi8qIEZPUiBFTEFTVElDIEJFQU5TVEFMSyBERVBMT1lcclxuXHJcbmltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xyXG5pbXBvcnQgcG9sa2EgZnJvbSAncG9sa2EnO1xyXG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xyXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XHJcblxyXG5jb25zdCB7IFBPUlQsIE5PREVfRU5WIH0gPSBwcm9jZXNzLmVudjtcclxuY29uc3QgZGV2ID0gTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XHJcblxyXG5wb2xrYSgpXHJcblx0LnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSlcclxuXHQudXNlKGJvZHlQYXJzZXIuanNvbigpKVxyXG5cdC51c2UoXHJcblx0XHRjb21wcmVzc2lvbih7IHRocmVzaG9sZDogMCB9KSxcclxuXHRcdHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxyXG5cdFx0c2FwcGVyLm1pZGRsZXdhcmUoKVxyXG5cdClcclxuXHQubGlzdGVuKFBPUlQsIGVyciA9PiB7XHJcblx0XHRpZiAoZXJyKSB7IHRocm93IGVyciB9O1xyXG4gICAgfSk7XHJcbiovXHJcbi8qIEZPUiBMT0NBTCAqL1xyXG5pbXBvcnQgc2lydiBmcm9tICdzaXJ2JztcclxuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcclxuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcclxuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xyXG5cclxuY29uc3QgeyBQT1JULCBOT0RFX0VOViB9ID0gcHJvY2Vzcy5lbnY7XHJcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xyXG5cclxuY29uc3QgeyBjcmVhdGVTZXJ2ZXIgfSA9IHJlcXVpcmUoJ2h0dHBzJyk7XHJcbmNvbnN0IHsgcmVhZEZpbGVTeW5jIH0gPSByZXF1aXJlKCdmcycpO1xyXG5jb25zdCBzc2xfcG9ydCA9IDMwMDA7XHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gIC8vIFRoZSBwYXRoICYgZmlsZSBuYW1lcyBjb3VsZCBiZSBkaWZmZXJlbnQuXHJcbiAga2V5OiByZWFkRmlsZVN5bmMoJy4vY2xpZW50LTEubG9jYWwua2V5JyksXHJcbiAgY2VydDogcmVhZEZpbGVTeW5jKCcuL2NsaWVudC0xLmxvY2FsLmNydCcpXHJcbn07XHJcblxyXG5jb25zdCB7IGhhbmRsZXIgfSA9IHBvbGthKClcclxuXHQudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKVxyXG5cdC51c2UoYm9keVBhcnNlci5qc29uKCkpXHJcbiAgICAudXNlKFxyXG4gICAgICAgIGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxyXG4gICAgICAgIHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxyXG4gICAgICAgIHNhcHBlci5taWRkbGV3YXJlKClcclxuICAgIClcclxuICAgIC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcclxuICAgICAgICByZXMuZW5kKGBQT0xLQTogSGVsbG8gZnJvbSAke3JlcS5wYXRobmFtZX1gKTtcclxuICAgIH0pO1xyXG5cclxuLy8gTW91bnQgUG9sa2EgdG8gSFRUUFMgc2VydmVyXHJcbmNyZWF0ZVNlcnZlcihvcHRpb25zLCBoYW5kbGVyKS5saXN0ZW4oc3NsX3BvcnQsIF8gPT4ge1xyXG4gICAgY29uc29sZS5sb2coYD4gUnVubmluZyBvbiBodHRwczovL2xvY2FsaG9zdDoke3NzbF9wb3J0fWApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbInRoaXMiLCJjb21wb25lbnRfMCIsInJvb3QiLCJlcnJvciIsImVzY2FwZWQiLCJmZXRjaCIs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LENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLFVB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QUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMseUNBQXlDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzdzUDtB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
