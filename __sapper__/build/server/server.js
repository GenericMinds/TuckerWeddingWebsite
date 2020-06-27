'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));
var bodyParser = _interopDefault(require('body-parser'));

var sql = require("mssql");
const config = {
    server: 'tucker-wedding-website-db.cadofo8p7xec.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Freelmc2468',
    port: 1433,
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
        request.input('toasterAssociation', sql.Bit, req.body.toast.toasterAssociation);
        request.input('toastContent', sql.VarChar(sql.MAX), req.body.toast.toastContent);
        request.query("insert into Toast (toasterName, toasterRelationship, toasterAssociation, toastContent) VALUES (@toasterName, @toasterRelationship, @toasterAssociation, @toastContent);", function (err, recordset) {
            if (err) {
                throw err;
            }
        });
    });
}

var route_0 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get,
  post: post
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
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
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

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
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

var POSITIONS = [
  "bottom-right",
  "bottom-center",
  "bottom-left",
  "top-right",
  "top-center",
  "top-left",
  "right-bottom",
  "right-center",
  "right-top",
  "left-bottom",
  "left-center",
  "left-top"
];

const RIGHT = "right";
const LEFT = "left";
const TOP = "top";
const CENTER = "center";
const BOTTOM = "bottom";

// for SSR
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

const getNextPosition = (position, dimensions) => {
  const clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  const clientWidth = Math.min(document.body.clientWidth, document.documentElement.clientWidth);
  Object.assign(dimensions, { clientWidth, clientHeight });

  const [mainPosition, secondaryPosition] = position.split('-');
  const nextMainPosition = getMainPosition(mainPosition, dimensions);
  const nextSecondaryPosition = getSecondaryPosition(secondaryPosition, dimensions);

  return `${nextMainPosition}-${nextSecondaryPosition}`;
};

const getMainPosition = (
  position,
  {
    top,
    bottom,
    left,
    right,
    height,
    width,
    clientWidth,
    clientHeight,
  },
) => {

  const fitsOnTop = top > height;
  const fitsOnBottom = bottom + height < clientHeight;

  const fitsOnLeft = left > width;
  const fitsOnRight = right + width < clientWidth;

  const positions = {
    top: () => !fitsOnTop && fitsOnBottom ? BOTTOM : TOP,
    bottom: () => fitsOnTop && !fitsOnBottom ? TOP : BOTTOM,
    left: () => !fitsOnLeft && fitsOnRight ? RIGHT : LEFT,
    right: () => !fitsOnRight && fitsOnLeft ? LEFT : RIGHT,
  };

  return positions[position]();
};

const getSecondaryPosition = (
  position,
  {
    top,
    bottom,
    left,
    right,
    height,
    width,
    clientWidth,
    clientHeight,
  }
) => {
  const parentHeight = bottom - top;
  const parentCenter = top + parentHeight / 2;

  const fitsOnTop = bottom > height;
  const fitsOnBottom = top + height < clientHeight;
  const fitsCenter = (parentCenter - height / 2) > 0 && (parentCenter + height / 2) < clientHeight;
  const fitsOnLeft = right > width;
  const fitsOnRight = left + width < clientWidth;

  const positions = {
    top: () => !fitsOnTop && fitsOnBottom ? BOTTOM : TOP,
    center: () => fitsCenter ? CENTER : positions.top(),
    bottom: () => !fitsOnBottom && fitsOnTop ? TOP : BOTTOM,
    left: () => !fitsOnLeft && fitsOnRight ? RIGHT : LEFT,
    right: () => !fitsOnRight && fitsOnLeft ? LEFT : RIGHT,
  };

  return positions[position]();
};

/* node_modules\svelte-overlay\src\components\Overlay.svelte generated by Svelte v3.23.2 */

const css = {
	code: ".overlay.svelte-m0jddf.svelte-m0jddf{position:relative;display:inline-block;box-sizing:border-box}.content-wrapper.svelte-m0jddf.svelte-m0jddf{position:fixed;pointer-events:none;width:max-content}.content-wrapper.svelte-m0jddf>.svelte-m0jddf{pointer-events:all}.content.svelte-m0jddf.svelte-m0jddf{position:absolute;min-width:100%}.top-left.svelte-m0jddf.svelte-m0jddf,.top-center.svelte-m0jddf.svelte-m0jddf,.top-right.svelte-m0jddf.svelte-m0jddf{bottom:100%}.bottom-left.svelte-m0jddf.svelte-m0jddf,.bottom-center.svelte-m0jddf.svelte-m0jddf,.bottom-right.svelte-m0jddf.svelte-m0jddf{top:100%}.top-left.svelte-m0jddf.svelte-m0jddf,.bottom-left.svelte-m0jddf.svelte-m0jddf{right:0}.top-center.svelte-m0jddf.svelte-m0jddf,.bottom-center.svelte-m0jddf.svelte-m0jddf{left:50%;transform:translateX(-50%)}.top-right.svelte-m0jddf.svelte-m0jddf,.bottom-right.svelte-m0jddf.svelte-m0jddf{left:0}.left-top.svelte-m0jddf.svelte-m0jddf,.left-bottom.svelte-m0jddf.svelte-m0jddf,.left-center.svelte-m0jddf.svelte-m0jddf{right:100%}.right-top.svelte-m0jddf.svelte-m0jddf,.right-bottom.svelte-m0jddf.svelte-m0jddf,.right-center.svelte-m0jddf.svelte-m0jddf{left:100%}.left-center.svelte-m0jddf.svelte-m0jddf,.right-center.svelte-m0jddf.svelte-m0jddf{top:50%;transform:translateY(-50%)}.left-top.svelte-m0jddf.svelte-m0jddf,.right-top.svelte-m0jddf.svelte-m0jddf{bottom:0}.left-bottom.svelte-m0jddf.svelte-m0jddf,.right-bottom.svelte-m0jddf.svelte-m0jddf{top:0}",
	map: "{\"version\":3,\"file\":\"Overlay.svelte\",\"sources\":[\"Overlay.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport {\\n\\t\\tbeforeUpdate,\\n\\t\\tonMount,\\n\\t\\tonDestroy,\\n\\t\\ttick,\\n\\t\\tcreateEventDispatcher,\\n\\t} from 'svelte';\\n\\timport POSITIONS from './positions';\\n\\timport { isBrowser, getNextPosition } from './helpers';\\n\\tconst dispatch = createEventDispatcher();\\n\\n\\tconst DEFAULT_POSITION = POSITIONS[0];\\n\\n\\texport let isOpen = false;\\n\\texport let updateOnScroll = false;\\n\\texport let closeOnScroll = false;\\n\\texport let position = DEFAULT_POSITION;\\n\\texport let closeOnClickOutside = false;\\n\\texport let zIndex = 1;\\n\\texport let onWindowKeyDown = () => {};\\n\\texport let style = '';\\n\\n\\t$: className = $$restProps['class'] || '';\\n\\n\\tlet currentPosition = null;\\n\\tlet parent;\\n\\tlet content;\\n\\tlet target;\\n\\n\\tlet topStyle = 0;\\n\\tlet leftStyle = 0;\\n\\tlet widthStyle = 0;\\n\\tlet heightStyle = 0;\\n\\n\\t$: hasParent = !parent || !!parent.childNodes.length;\\n\\t$: hasContent = !content || !!content.childNodes.length;\\n\\n\\t$: if(!hasParent) throw new Error('parent slot is required');\\n\\t$: if(!hasContent) throw new Error('content slot is required');\\n\\n\\t$: openedState = isOpen && hasParent && hasContent;\\n\\n\\tfunction addListeners() {\\n\\t\\tif (!isBrowser()) return;\\n\\t\\twindow.addEventListener('resize', updatePosition);\\n\\t\\tif (closeOnScroll) window.addEventListener('scroll', close);\\n\\t\\telse if (updateOnScroll) window.addEventListener('scroll', updatePosition);\\n\\t}\\n\\n\\tfunction removeListeners() {\\n\\t\\tif (!isBrowser()) return;\\n\\t\\twindow.removeEventListener('resize', updatePosition);\\n\\t\\twindow.removeEventListener('scroll', updatePosition);\\n\\t\\twindow.removeEventListener('scroll', close);\\n\\t}\\n\\n\\tonMount(() => {\\n\\t\\tif (openedState) {\\n\\t\\t\\taddListeners();\\n\\t\\t}\\n\\t});\\n\\n\\tonDestroy(() => {\\n\\t\\tif (!isBrowser()) return;\\n\\t\\tremoveListeners();\\n\\t});\\n\\n\\n\\tbeforeUpdate(updatePosition);\\n\\n\\tfunction toggle(value) {\\n\\t\\tconst prevOpen = isOpen;\\n\\t\\tconst nextOpen = value === true || value === false ? value : !isOpen;\\n\\n\\t\\tif (nextOpen && hasParent && hasContent || !nextOpen) isOpen = nextOpen;\\n\\n\\t\\tif(prevOpen !== isOpen) {\\n\\t\\t\\tdispatch('toggle', isOpen);\\n\\t\\t\\tif (isOpen) {\\n\\t\\t\\t\\taddListeners();\\n\\t\\t\\t\\tdispatch('open');\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tdispatch('close');\\n\\t\\t\\t\\tremoveListeners();\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t}\\n\\n\\tfunction open() {\\n\\t\\tif (!openedState) toggle(true);\\n\\t}\\n\\n\\tfunction close() {\\n\\t\\tif (openedState) toggle(false);\\n\\t}\\n\\n\\tfunction contains (event) {\\n\\t\\tconst path = event.path || event.composedPath();\\n\\t\\treturn path.includes(parent) || path.includes(content);\\n\\t}\\n\\n\\tfunction handleWindowClick(event) {\\n\\t\\tif (!closeOnClickOutside || !openedState || contains(event)) return;\\n\\t\\tclose();\\n\\t}\\n\\n\\tfunction handleWindowKeyDown(event) {\\n\\t\\tif (!onWindowKeyDown || !openedState) return;\\n\\t\\tonWindowKeyDown(event, { isOpen: openedState, open, close, toggle, contains });\\n\\t}\\n\\n\\tasync function updatePosition() {\\n\\t\\tawait tick();\\n\\t\\tif (!openedState) return;\\n\\t\\tif (!POSITIONS.includes(position)) position = DEFAULT_POSITION;\\n\\n\\t\\tconst {\\n\\t\\t\\ttop,\\n\\t\\t\\tbottom,\\n\\t\\t\\tleft,\\n\\t\\t\\tright,\\n\\t\\t\\twidth: parentWidth,\\n\\t\\t\\theight: parentHeight,\\n\\t\\t} = parent.getBoundingClientRect();\\n\\t\\tconst { height, width } = content.getBoundingClientRect();\\n\\n\\t\\tconst dimensions = { top, bottom, left, right, height, width };\\n\\t\\tconst nextPosition = getNextPosition(position, dimensions);\\n\\n\\t\\tif (currentPosition !== nextPosition) {\\n\\t\\t\\tcurrentPosition = nextPosition;\\n\\t\\t}\\n\\n\\t\\ttopStyle = top;\\n\\t\\tleftStyle = left;\\n\\t\\twidthStyle = parentWidth;\\n\\t\\theightStyle = parentHeight;\\n\\t}\\n</script>\\n\\n<svelte:window\\n\\ton:mousedown={handleWindowClick}\\n\\ton:keydown={handleWindowKeyDown} />\\n\\n<div bind:this={target} class={`overlay ${className}`} style={`z-index:${zIndex}; ${style}`}>\\n\\t<div bind:this={parent}>\\n\\t\\t<slot name=\\\"parent\\\" {toggle} isOpen={openedState} {open} {close} />\\n\\t</div>\\n\\t<div\\n\\t\\tclass=\\\"content-wrapper\\\"\\n\\t\\tstyle={`top: ${topStyle}px; left: ${leftStyle}px; width: ${widthStyle}px; height: ${heightStyle}px; z-index:${zIndex};`}\\n\\t>\\n\\t\\t{#if openedState}\\n\\t\\t\\t<div class={`content ${currentPosition || ''}`} bind:this={content}>\\n\\t\\t\\t\\t\\t<slot name=\\\"content\\\" {toggle} isOpen={openedState} {open} {close} />\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n.overlay {\\n  position: relative;\\ndisplay: inline-block;\\nbox-sizing: border-box;\\n}\\n\\n.content-wrapper {\\n  position: fixed;\\n  pointer-events: none;\\n  width: max-content;\\n}\\n\\n.content-wrapper > * {\\n  pointer-events: all;\\n}\\n\\n.content {\\n  position: absolute;\\n  min-width: 100%;\\n}\\n\\n.top-left,\\n.top-center,\\n.top-right {\\n  bottom: 100%;\\n}\\n\\n.bottom-left,\\n.bottom-center,\\n.bottom-right {\\n  top: 100%;\\n}\\n\\n.top-left,\\n.bottom-left {\\n  right: 0;\\n}\\n\\n.top-center,\\n.bottom-center {\\n  left: 50%;\\n  transform: translateX(-50%);\\n}\\n\\n.top-right,\\n.bottom-right {\\n  left: 0;\\n}\\n\\n.left-top,\\n.left-bottom,\\n.left-center {\\n  right: 100%;\\n}\\n\\n.right-top,\\n.right-bottom,\\n.right-center {\\n  left: 100%;\\n}\\n\\n.left-center,\\n.right-center {\\n  top: 50%;\\n  transform: translateY(-50%);\\n}\\n\\n.left-top,\\n.right-top {\\n  bottom: 0;\\n}\\n\\n.left-bottom,\\n.right-bottom {\\n  top: 0;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAmKA,QAAQ,4BAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CACpB,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,UAAU,AACtB,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,QAAQ,CAAE,KAAK,CACf,cAAc,CAAE,IAAI,CACpB,KAAK,CAAE,WAAW,AACpB,CAAC,AAED,8BAAgB,CAAG,cAAE,CAAC,AACpB,cAAc,CAAE,GAAG,AACrB,CAAC,AAED,QAAQ,4BAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,qCAAS,CACT,uCAAW,CACX,UAAU,4BAAC,CAAC,AACV,MAAM,CAAE,IAAI,AACd,CAAC,AAED,wCAAY,CACZ,0CAAc,CACd,aAAa,4BAAC,CAAC,AACb,GAAG,CAAE,IAAI,AACX,CAAC,AAED,qCAAS,CACT,YAAY,4BAAC,CAAC,AACZ,KAAK,CAAE,CAAC,AACV,CAAC,AAED,uCAAW,CACX,cAAc,4BAAC,CAAC,AACd,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,sCAAU,CACV,aAAa,4BAAC,CAAC,AACb,IAAI,CAAE,CAAC,AACT,CAAC,AAED,qCAAS,CACT,wCAAY,CACZ,YAAY,4BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,sCAAU,CACV,yCAAa,CACb,aAAa,4BAAC,CAAC,AACb,IAAI,CAAE,IAAI,AACZ,CAAC,AAED,wCAAY,CACZ,aAAa,4BAAC,CAAC,AACb,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,qCAAS,CACT,UAAU,4BAAC,CAAC,AACV,MAAM,CAAE,CAAC,AACX,CAAC,AAED,wCAAY,CACZ,aAAa,4BAAC,CAAC,AACb,GAAG,CAAE,CAAC,AACR,CAAC\"}"
};

const Overlay = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $$restProps = compute_rest_props($$props, [
		"isOpen","updateOnScroll","closeOnScroll","position","closeOnClickOutside","zIndex","onWindowKeyDown","style"
	]);

	const dispatch = createEventDispatcher();
	const DEFAULT_POSITION = POSITIONS[0];
	let { isOpen = false } = $$props;
	let { updateOnScroll = false } = $$props;
	let { closeOnScroll = false } = $$props;
	let { position = DEFAULT_POSITION } = $$props;
	let { closeOnClickOutside = false } = $$props;
	let { zIndex = 1 } = $$props;

	let { onWindowKeyDown = () => {
		
	} } = $$props;

	let { style = "" } = $$props;
	let currentPosition = null;
	let parent;
	let content;
	let target;
	let topStyle = 0;
	let leftStyle = 0;
	let widthStyle = 0;
	let heightStyle = 0;

	function addListeners() {
		if (!isBrowser()) return;
		window.addEventListener("resize", updatePosition);
		if (closeOnScroll) window.addEventListener("scroll", close); else if (updateOnScroll) window.addEventListener("scroll", updatePosition);
	}

	function removeListeners() {
		if (!isBrowser()) return;
		window.removeEventListener("resize", updatePosition);
		window.removeEventListener("scroll", updatePosition);
		window.removeEventListener("scroll", close);
	}

	onMount(() => {
		if (openedState) {
			addListeners();
		}
	});

	onDestroy(() => {
		if (!isBrowser()) return;
		removeListeners();
	});

	beforeUpdate(updatePosition);

	function toggle(value) {
		const prevOpen = isOpen;
		const nextOpen = value === true || value === false ? value : !isOpen;
		if (nextOpen && hasParent && hasContent || !nextOpen) isOpen = nextOpen;

		if (prevOpen !== isOpen) {
			dispatch("toggle", isOpen);

			if (isOpen) {
				addListeners();
				dispatch("open");
			} else {
				dispatch("close");
				removeListeners();
			}
		}
	}

	function open() {
		if (!openedState) toggle(true);
	}

	function close() {
		if (openedState) toggle(false);
	}

	async function updatePosition() {
		await tick();
		if (!openedState) return;
		if (!POSITIONS.includes(position)) position = DEFAULT_POSITION;
		const { top, bottom, left, right, width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
		const { height, width } = content.getBoundingClientRect();
		const dimensions = { top, bottom, left, right, height, width };
		const nextPosition = getNextPosition(position, dimensions);

		if (currentPosition !== nextPosition) {
			currentPosition = nextPosition;
		}

		topStyle = top;
		leftStyle = left;
		widthStyle = parentWidth;
		heightStyle = parentHeight;
	}

	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
	if ($$props.updateOnScroll === void 0 && $$bindings.updateOnScroll && updateOnScroll !== void 0) $$bindings.updateOnScroll(updateOnScroll);
	if ($$props.closeOnScroll === void 0 && $$bindings.closeOnScroll && closeOnScroll !== void 0) $$bindings.closeOnScroll(closeOnScroll);
	if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
	if ($$props.closeOnClickOutside === void 0 && $$bindings.closeOnClickOutside && closeOnClickOutside !== void 0) $$bindings.closeOnClickOutside(closeOnClickOutside);
	if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
	if ($$props.onWindowKeyDown === void 0 && $$bindings.onWindowKeyDown && onWindowKeyDown !== void 0) $$bindings.onWindowKeyDown(onWindowKeyDown);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	$$result.css.add(css);
	let className = $$restProps["class"] || "";
	let hasParent = !parent ;
	let hasContent = !content ;

	let openedState = isOpen && hasParent && hasContent;

	return `

<div class="${escape(null_to_empty(`overlay ${className}`)) + " svelte-m0jddf"}"${add_attribute("style", `z-index:${zIndex}; ${style}`, 0)}${add_attribute("this", target, 1)}><div class="${"svelte-m0jddf"}"${add_attribute("this", parent, 1)}>${$$slots.parent
	? $$slots.parent({ toggle, isOpen: openedState, open, close })
	: ``}</div>
	<div class="${"content-wrapper svelte-m0jddf"}"${add_attribute("style", `top: ${topStyle}px; left: ${leftStyle}px; width: ${widthStyle}px; height: ${heightStyle}px; z-index:${zIndex};`, 0)}>${openedState
	? `<div class="${escape(null_to_empty(`content ${currentPosition || ""}`)) + " svelte-m0jddf"}"${add_attribute("this", content, 1)}>${$$slots.content
		? $$slots.content({ toggle, isOpen: openedState, open, close })
		: ``}</div>`
	: ``}</div>
</div>`;
});

/* src\routes\_components\MenuIcon.svelte generated by Svelte v3.23.2 */

const css$1 = {
	code: "@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';ul.svelte-1r35ctc{position:fixed;-webkit-backface-visibility:hidden;top:40px;right:0;bottom:0;left:0;width:100%;height:100%;background:#375637;color:#ddd499;text-align:center;font-size:40px;overflow:hidden;padding:0;margin:0;list-style:none}li.svelte-1r35ctc{-webkit-backface-visibility:hidden;height:15vh;padding-top:3vh}svg.svelte-1r35ctc{position:fixed;-webkit-overflow-scrolling:touch;-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden;right:0;top:0;overflow:hidden;height:32px;width:32px;z-index:999}li.svelte-1r35ctc:hover{cursor:pointer}",
	map: "{\"version\":3,\"file\":\"MenuIcon.svelte\",\"sources\":[\"MenuIcon.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import Overlay from 'svelte-overlay';\\r\\nimport * as animateScroll from 'svelte-scrollto';\\r\\nlet isOpen = false;\\r\\nfunction handleToggle() {\\r\\n    isOpen = !isOpen;\\r\\n}\\r\\nfunction handleSectionSelection(section) {\\r\\n    isOpen = false;\\r\\n    if (section == 'home') {\\r\\n        animateScroll.scrollToTop();\\r\\n        return;\\r\\n    }\\r\\n    animateScroll.scrollTo({ element: '.' + section });\\r\\n}\\r\\n</script>\\r\\n\\r\\n<Overlay on:toggle={handleToggle} zIndex={100} bind:isOpen={isOpen}>    \\r\\n    <svg slot='parent' on:click={handleToggle} x='0px' y='0px' viewBox='0 0 50 50' enable-background='new 0 0 50 50' xml:space='preserve' height='40px' width='40px'>\\r\\n            <path fill='#ddd499' d='M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z'/>\\r\\n            <path fill='#ddd499' d='M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z'/>\\r\\n            <path fill='#ddd499' d='M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z'/>\\r\\n    </svg>     \\r\\n    <ul slot='content'>\\r\\n        <li class='home' on:click={() => {handleSectionSelection('home')}}>Home</li>\\r\\n        <li on:click={() => {handleSectionSelection('story')}}>Our Story</li>\\r\\n        <li on:click={() => {handleSectionSelection('clan')}}>Our Clan</li>\\r\\n        <li on:click={() => {handleSectionSelection('toasts')}}>Toasts</li>\\r\\n        <li on:click={() => {handleSectionSelection('propose')}}>Propose a Toast</li>\\r\\n        <li on:click={() => {handleSectionSelection('blended')}}>Blended Family</li>\\r\\n    </ul>\\r\\n</Overlay>\\r\\n\\r\\n<style lang='scss'>@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';\\nul {\\n  position: fixed;\\n  -webkit-backface-visibility: hidden;\\n  top: 40px;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background: #375637;\\n  color: #ddd499;\\n  text-align: center;\\n  font-size: 40px;\\n  overflow: hidden;\\n  padding: 0;\\n  margin: 0;\\n  list-style: none; }\\n\\nli {\\n  -webkit-backface-visibility: hidden;\\n  height: 15vh;\\n  padding-top: 3vh; }\\n\\nsvg {\\n  position: fixed;\\n  -webkit-overflow-scrolling: touch;\\n  -webkit-transform: translateZ(0);\\n  -webkit-backface-visibility: hidden;\\n  right: 0;\\n  top: 0;\\n  overflow: hidden;\\n  height: 32px;\\n  width: 32px;\\n  z-index: 999; }\\n\\nimg:hover, li:hover {\\n  cursor: pointer; }</style>\"],\"names\":[],\"mappings\":\"AAgCmB,QAAQ,wDAAwD,CAAC,AACpF,EAAE,eAAC,CAAC,AACF,QAAQ,CAAE,KAAK,CACf,2BAA2B,CAAE,MAAM,CACnC,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,AAAE,CAAC,AAErB,EAAE,eAAC,CAAC,AACF,2BAA2B,CAAE,MAAM,CACnC,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,GAAG,AAAE,CAAC,AAErB,GAAG,eAAC,CAAC,AACH,QAAQ,CAAE,KAAK,CACf,0BAA0B,CAAE,KAAK,CACjC,iBAAiB,CAAE,WAAW,CAAC,CAAC,CAChC,2BAA2B,CAAE,MAAM,CACnC,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,CACN,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,AAAE,CAAC,AAEN,iBAAE,MAAM,AAAC,CAAC,AACnB,MAAM,CAAE,OAAO,AAAE,CAAC\"}"
};

const MenuIcon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let isOpen = false;

	$$result.css.add(css$1);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `${validate_component(Overlay, "Overlay").$$render(
			$$result,
			{ zIndex: 100, isOpen },
			{
				isOpen: $$value => {
					isOpen = $$value;
					$$settled = false;
				}
			},
			{
				parent: () => `<svg slot="${"parent"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 50 50"}" enable-background="${"new 0 0 50 50"}" xml:space="${"preserve"}" height="${"40px"}" width="${"40px"}" class="${"svelte-1r35ctc"}"><path fill="${"#ddd499"}" d="${"M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"}"></path><path fill="${"#ddd499"}" d="${"M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"}"></path><path fill="${"#ddd499"}" d="${"M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"}"></path></svg>`,
				content: () => `<ul slot="${"content"}" class="${"svelte-1r35ctc"}"><li class="${"home svelte-1r35ctc"}">Home</li>
        <li class="${"svelte-1r35ctc"}">Our Story</li>
        <li class="${"svelte-1r35ctc"}">Our Clan</li>
        <li class="${"svelte-1r35ctc"}">Toasts</li>
        <li class="${"svelte-1r35ctc"}">Propose a Toast</li>
        <li class="${"svelte-1r35ctc"}">Blended Family</li></ul>`,
				default: () => `     
    
`
			}
		)}`;
	} while (!$$settled);

	return $$rendered;
});

/* src\routes\_components\SectionHeader.svelte generated by Svelte v3.23.2 */

const css$2 = {
	code: "div.svelte-10nrjo8{background-color:#375637;height:40px;line-height:40px;padding:0}p.svelte-10nrjo8{display:initial;color:#ddd499;font-weight:bold;font-size:20px}",
	map: "{\"version\":3,\"file\":\"SectionHeader.svelte\",\"sources\":[\"SectionHeader.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>import MenuIcon from './MenuIcon.svelte';\\r\\nexport let isNav;\\r\\n</script>\\r\\n\\r\\n<div>\\r\\n    {#if isNav === true}\\r\\n        <p>#blameitonfate</p>\\r\\n        <MenuIcon />\\r\\n    {/if}\\r\\n</div>\\r\\n\\r\\n<style lang='scss'>div {\\n  background-color: #375637;\\n  height: 40px;\\n  line-height: 40px;\\n  padding: 0; }\\n\\np {\\n  display: initial;\\n  color: #ddd499;\\n  font-weight: bold;\\n  font-size: 20px; }</style>\"],\"names\":[],\"mappings\":\"AAWmB,GAAG,eAAC,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,CAAC,AAAE,CAAC,AAEf,CAAC,eAAC,CAAC,AACD,OAAO,CAAE,OAAO,CAChB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,AAAE,CAAC\"}"
};

const SectionHeader = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { isNav } = $$props;
	if ($$props.isNav === void 0 && $$bindings.isNav && isNav !== void 0) $$bindings.isNav(isNav);
	$$result.css.add(css$2);

	return `<div class="${"svelte-10nrjo8"}">${isNav === true
	? `<p class="${"svelte-10nrjo8"}">#blameitonfate</p>
        ${validate_component(MenuIcon, "MenuIcon").$$render($$result, {}, {}, {})}`
	: ``}
</div>`;
});

/* src\routes\_components\Jumbotron.svelte generated by Svelte v3.23.2 */

const css$3 = {
	code: "img.svelte-ypvhaw{width:100%;height:50%;border:2px solid #ddd499;box-sizing:border-box;margin:0}",
	map: "{\"version\":3,\"file\":\"Jumbotron.svelte\",\"sources\":[\"Jumbotron.svelte\"],\"sourcesContent\":[\"<img src='LisaTimMainPhoto.jpg' alt='Lisa and Tim posing during a hike in the woods.'/>\\r\\n\\r\\n<style lang='scss'>img {\\n  width: 100%;\\n  height: 50%;\\n  border: 2px solid #ddd499;\\n  box-sizing: border-box;\\n  margin: 0; }</style>\"],\"names\":[],\"mappings\":\"AAEmB,GAAG,cAAC,CAAC,AACtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,CAAC,AAAE,CAAC\"}"
};

const Jumbotron = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$3);
	return `<img src="${"LisaTimMainPhoto.jpg"}" alt="${"Lisa and Tim posing during a hike in the woods."}" class="${"svelte-ypvhaw"}">`;
});

/* src\routes\_components\Story.svelte generated by Svelte v3.23.2 */

const css$4 = {
	code: "p.svelte-1ooxxts{text-align:left}",
	map: "{\"version\":3,\"file\":\"Story.svelte\",\"sources\":[\"Story.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import SectionHeader from './SectionHeader.svelte';\\r\\n</script>\\r\\n\\r\\n<section class='story'>\\r\\n    <SectionHeader isNav={false} />\\r\\n    <h1>Our Story</h1>\\r\\n    <img alt='Heading Decoration' src='./HeadingDecorator.png'/>\\r\\n    <div>\\r\\n        <p>Once upon a time there was a king and a viking princess. They did not know it, but the gods had set the table for them to be together.</p>\\r\\n        <p>As the gods planned out their destiny, they couldn't quite agree on the path these two should take to get there. One of the gods set up their first meeting. As they were both looking to learn more about the world around them, they attended the Academy at the same time. The first god set it up so that they lived in close proximity. Once the other gods noticed, they intervened and kept them from meeting each other. It was not their time yet.</p>\\r\\n        <p>Both the king and the viking princess went on to have families of their own. Another one of the gods thought that this was the time and moved them to the same town. Both of their families grew up at the same time. The king had two daughters and the viking princess had two sons and two daughters. The kids grew up with each other and became friends. The eldest viking son and the eldest princess of the king both pursued the bardic arts together. The youngest viking daughter and the youngest princess of the king battled for the raiders through volley after volley of balls flung by the invading armies. Through all of this the other gods decided it was not time for the king and the viking princess to meet, and kept them apart. It was not their time yet.</p>\\r\\n        <p>A third god decided to make his move and arranged it so the viking princess joined the Parent Teacher Student Guild along with the Queen. Both were valiant champions in making sure the children of the kingdom were getting the appropriate education. Throughout their many meetings and public events, the other gods decided to intervene and not allow the king and viking princess to cross paths. It was not their time yet.</p>\\r\\n        <p>The viking princess pursued her advancement in the Parent Teacher Student Guild with fervor and eventually reached the rank of Teacher of The Native Tongue. A fourth god decided this would be the perfect time to introduce the king and the viking princess. This god arranged for the king's youngest princess to become an apprentice of the viking princess. Alas, the other gods intervened yet again and did not let their paths cross. It was not their time yet.</p>\\r\\n        <p>Living within the same kingdom, they were often in the market at the same time. Neither taking notice of each other. The gods had again decided to keep them away from each other. It was not their time yet.</p>\\r\\n        <p>By this point in time, both had moved on from their previous relationships. While there were times where they were happy, they knew deep down that something was missing. Their sons and daughters had grown up and had families of their own. The gods finally decided it was time.</p>\\r\\n        <p>One fateful day, they aligned the stars to allow them to meet. The king was discussing life with a noble friend of his in the market when the viking princess entered. Their paths would have crossed yet again without interaction, but the gods had carefully laid out this moment. The noble that the king was talking to happened to also be the brother in law of the eldest viking daughter. The noble noticed the viking princess and decided to make an introduction. After the noble left, they continued their shopping, glancing at each other through the market stalls. The strands of fate spinning stronger and stronger with each passing. Humans tend to be unpredictable and resist their destinies. The viking princess abruptly left the market without talking with the king further.</p>\\r\\n        <p>The gods didn't like this. They filled her head with doubt and her heart with excitement. She knew she veered from their plans and decided to take her shot. She sent out messengers to find the king. They eventually tracked him down and arranged for them to meet again. A quick meeting at the tavern turned into a long conversations leading into the dead of night, yet somehow time felt like it was standing still. Everything was falling into place and the match felt like a perfect fit. But as a human himself, the king was stubborn and decided he wasn't ready for his destiny.</p>\\r\\n        <p>The gods didn't like this. One day as the king was at the theater watching the newest play, he took note of one of the characters. This character was a viking. He thought back to the viking princess and began to doubt his choices. The king decided to give it another chance. This time when they met, they were both ready to embrace their destinies.</p>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>p {\\n  text-align: left; }</style>\"],\"names\":[],\"mappings\":\"AAsBmB,CAAC,eAAC,CAAC,AACpB,UAAU,CAAE,IAAI,AAAE,CAAC\"}"
};

const Story = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$4);

	return `<section class="${"story"}">${validate_component(SectionHeader, "SectionHeader").$$render($$result, { isNav: false }, {}, {})}
    <h1>Our Story</h1>
    <img alt="${"Heading Decoration"}" src="${"./HeadingDecorator.png"}">
    <div><p class="${"svelte-1ooxxts"}">Once upon a time there was a king and a viking princess. They did not know it, but the gods had set the table for them to be together.</p>
        <p class="${"svelte-1ooxxts"}">As the gods planned out their destiny, they couldn&#39;t quite agree on the path these two should take to get there. One of the gods set up their first meeting. As they were both looking to learn more about the world around them, they attended the Academy at the same time. The first god set it up so that they lived in close proximity. Once the other gods noticed, they intervened and kept them from meeting each other. It was not their time yet.</p>
        <p class="${"svelte-1ooxxts"}">Both the king and the viking princess went on to have families of their own. Another one of the gods thought that this was the time and moved them to the same town. Both of their families grew up at the same time. The king had two daughters and the viking princess had two sons and two daughters. The kids grew up with each other and became friends. The eldest viking son and the eldest princess of the king both pursued the bardic arts together. The youngest viking daughter and the youngest princess of the king battled for the raiders through volley after volley of balls flung by the invading armies. Through all of this the other gods decided it was not time for the king and the viking princess to meet, and kept them apart. It was not their time yet.</p>
        <p class="${"svelte-1ooxxts"}">A third god decided to make his move and arranged it so the viking princess joined the Parent Teacher Student Guild along with the Queen. Both were valiant champions in making sure the children of the kingdom were getting the appropriate education. Throughout their many meetings and public events, the other gods decided to intervene and not allow the king and viking princess to cross paths. It was not their time yet.</p>
        <p class="${"svelte-1ooxxts"}">The viking princess pursued her advancement in the Parent Teacher Student Guild with fervor and eventually reached the rank of Teacher of The Native Tongue. A fourth god decided this would be the perfect time to introduce the king and the viking princess. This god arranged for the king&#39;s youngest princess to become an apprentice of the viking princess. Alas, the other gods intervened yet again and did not let their paths cross. It was not their time yet.</p>
        <p class="${"svelte-1ooxxts"}">Living within the same kingdom, they were often in the market at the same time. Neither taking notice of each other. The gods had again decided to keep them away from each other. It was not their time yet.</p>
        <p class="${"svelte-1ooxxts"}">By this point in time, both had moved on from their previous relationships. While there were times where they were happy, they knew deep down that something was missing. Their sons and daughters had grown up and had families of their own. The gods finally decided it was time.</p>
        <p class="${"svelte-1ooxxts"}">One fateful day, they aligned the stars to allow them to meet. The king was discussing life with a noble friend of his in the market when the viking princess entered. Their paths would have crossed yet again without interaction, but the gods had carefully laid out this moment. The noble that the king was talking to happened to also be the brother in law of the eldest viking daughter. The noble noticed the viking princess and decided to make an introduction. After the noble left, they continued their shopping, glancing at each other through the market stalls. The strands of fate spinning stronger and stronger with each passing. Humans tend to be unpredictable and resist their destinies. The viking princess abruptly left the market without talking with the king further.</p>
        <p class="${"svelte-1ooxxts"}">The gods didn&#39;t like this. They filled her head with doubt and her heart with excitement. She knew she veered from their plans and decided to take her shot. She sent out messengers to find the king. They eventually tracked him down and arranged for them to meet again. A quick meeting at the tavern turned into a long conversations leading into the dead of night, yet somehow time felt like it was standing still. Everything was falling into place and the match felt like a perfect fit. But as a human himself, the king was stubborn and decided he wasn&#39;t ready for his destiny.</p>
        <p class="${"svelte-1ooxxts"}">The gods didn&#39;t like this. One day as the king was at the theater watching the newest play, he took note of one of the characters. This character was a viking. He thought back to the viking princess and began to doubt his choices. The king decided to give it another chance. This time when they met, they were both ready to embrace their destinies.</p></div>
</section>`;
});

/* src\routes\_components\Blended.svelte generated by Svelte v3.23.2 */

const Blended = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<section class="${"blended"}"><h1>Blended Family Recipe</h1>
    <img alt="${"Heading Decoration"}" src="${"./HeadingDecorator.png"}">
    <div><p>Put a good and honest man</p>
        <p>into a mixing pan.</p>
        <p>Combine one loving woman</p>
        <p>and blend well with the man.</p>
        <br>
        <p>Add the children of the man,</p>
        <p>and the woman&#39;s children too.</p>
        <p>Mix them all together</p>
        <p>as you would a pot of stew.</p>
        <br>
        <p>Slowly stir in patience.</p>
        <p>It will really help a lot.</p>
        <p>If you&#39;re not sure how much,</p>
        <p>throw in all you&#39;ve got.</p>
        <br>
        <p>Then, six cups of sweetener</p>
        <p>and fourteen cups of love.</p>
        <p>Sprinkle in some blessings</p>
        <p>from the heavens high above.</p>
        <br>
        <p>When the mixture is complete,</p>
        <p>with great joy you will see...</p>
        <p>creation of our awesome,</p>
        <p>loving blended family.</p></div></section>`;
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
	code: ".headingDecorator.svelte-696ytv.svelte-696ytv{width:50%;margin-top:-20px}.demo.svelte-696ytv.svelte-696ytv{margin:0 auto;height:350px;width:350px}.control.svelte-696ytv.svelte-696ytv svg{width:100%;height:100%;color:#fff;border:2px solid #fff;border-radius:32px}.slide-content.svelte-696ytv.svelte-696ytv{border:1px solid #eee;display:flex;flex-direction:column;height:350px;background-color:beige}.slide-content.svelte-696ytv header.svelte-696ytv{flex:1;background-size:contain;background-repeat:no-repeat;background-position:50% 50%;background-color:#375637;border:3px solid #ded599}",
	map: "{\"version\":3,\"file\":\"Clan.svelte\",\"sources\":[\"Clan.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\timport Carousel from '@beyonk/svelte-carousel';\\r\\n\\timport { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'\\r\\n\\tlet carousels = [\\r\\n\\t\\t{\\r\\n\\t\\t\\tperPage: 1\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tperPage: 1,\\r\\n\\t\\t\\tcontrols: false\\r\\n\\t\\t}\\r\\n\\t]\\r\\n\\tfunction changed (event) {\\r\\n\\t\\tconsole.log(event.detail.currentSlide)\\r\\n\\t}\\r\\n</script>\\r\\n\\r\\n<section class='clan'>\\r\\n    <h1>Our Clan</h1>\\r\\n    <img alt='Heading Decoration' class='headingDecorator' src='./HeadingDecorator.png'/>\\r\\n</section>\\r\\n<div class=\\\"demo\\\">\\r\\n    {#each carousels as carousel}\\r\\n    <Carousel on:change={changed} {...carousel} dots={false}>\\r\\n        <span class=\\\"control\\\" slot=\\\"left-control\\\">\\r\\n            <ChevronLeftIcon />\\r\\n        </span>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg)\\\">\\t\\t\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg)\\\">\\t\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg)\\\">\\t\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\t\\t\\t\\t\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\t\\t\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg)\\\">\\r\\n            </header>\\r\\n        </div>        \\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <div class=\\\"slide-content\\\">\\r\\n            <header style=\\\"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg)\\\">\\r\\n            </header>\\r\\n        </div>\\r\\n        <span class=\\\"control\\\" slot=\\\"right-control\\\">\\r\\n            <ChevronRightIcon />\\r\\n        </span>\\r\\n    </Carousel>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    {/each}\\r\\n</div>\\r\\n<style lang='scss'>.headingDecorator {\\n  width: 50%;\\n  margin-top: -20px; }\\n\\n.demo {\\n  margin: 0 auto;\\n  height: 350px;\\n  width: 350px; }\\n\\n.control :global(svg) {\\n  width: 100%;\\n  height: 100%;\\n  color: #fff;\\n  border: 2px solid #fff;\\n  border-radius: 32px; }\\n\\n.slide-content {\\n  border: 1px solid #eee;\\n  display: flex;\\n  flex-direction: column;\\n  height: 350px;\\n  background-color: beige; }\\n\\n.slide-content header {\\n  flex: 1;\\n  background-size: contain;\\n  background-repeat: no-repeat;\\n  background-position: 50% 50%;\\n  background-color: #375637;\\n  border: 3px solid #ded599; }</style>\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA2HmB,iBAAiB,4BAAC,CAAC,AACpC,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,KAAK,AAAE,CAAC,AAEtB,KAAK,4BAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AAAE,CAAC,AAEjB,oCAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,cAAc,4BAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,KAAK,AAAE,CAAC,AAE5B,4BAAc,CAAC,MAAM,cAAC,CAAC,AACrB,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,OAAO,CACxB,iBAAiB,CAAE,SAAS,CAC5B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAAE,CAAC\"}"
};

const Clan = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let carousels = [{ perPage: 1 }, { perPage: 1, controls: false }];
	$$result.css.add(css$6);

	return `<section class="${"clan"}"><h1>Our Clan</h1>
    <img alt="${"Heading Decoration"}" class="${"headingDecorator svelte-696ytv"}" src="${"./HeadingDecorator.png"}"></section>
<div class="${"demo svelte-696ytv"}">${each(carousels, carousel => `${validate_component(Carousel, "Carousel").$$render($$result, Object.assign(carousel, { dots: false }), {}, {
		"left-control": () => `<span class="${"control svelte-696ytv"}" slot="${"left-control"}">${validate_component(ChevronLeftIcon, "ChevronLeftIcon").$$render($$result, {}, {}, {})}</span>`,
		"right-control": () => `<span class="${"control svelte-696ytv"}" slot="${"right-control"}">${validate_component(ChevronRightIcon, "ChevronRightIcon").$$render($$result, {}, {}, {})}
        </span>`,
		default: () => `
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/GrandchildrenWithBarb.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Cheese.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/MovingDay.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/FireAndIce.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithLiam.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Lake.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithNora.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/CarenaAndDog.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Masks2.jpg)"}" class="${"svelte-696ytv"}"></header></div>				
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/RhiannahAndAdam.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SportsBar.jpg)"}" class="${"svelte-696ytv"}"></header></div>		
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/SummerAndClan.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/StPatricksDay.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndCarenaAndBri.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ToryAndClan.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/AustinAndClan.jpg)"}" class="${"svelte-696ytv"}"></header></div>        
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/Grandchildren.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/ShannonAndClan.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/WithRhiannah.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/LisaAndAdam.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        <div class="${"slide-content svelte-696ytv"}"><header style="${"background-image: url(https://lisaandtimpictures.s3.amazonaws.com/NanaAndPoppop.jpg)"}" class="${"svelte-696ytv"}"></header></div>
        `
	})}
    <br>
    <br>`)}
</div>`;
});

/* src\routes\_components\Toasts.svelte generated by Svelte v3.23.2 */

const Toasts = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let toasts = [];

	onMount(async () => {
		await fetch("api/toastController", { method: "GET" }).then(toasts => toasts.json()).then(toastsData => {
			toasts = toastsData;
		});
	});

	return `<section class="${"toasts"}"><h1>Toasts</h1>
    <img alt="${"Heading Decoration"}" src="${"./HeadingDecorator.png"}">
    <div>${each(toasts, toast => `<p>${escape(toast.toastContent)}</p>
            <p>- ${escape(toast.toasterName)}, ${escape(toast.toasterRelationship)} of the ${escape(toast.toasterAssociation)}</p>`)}</div></section>`;
});

/* src\routes\_components\ProposeToastForm.svelte generated by Svelte v3.23.2 */

const css$7 = {
	code: "section.svelte-c15mx9{width:100%;margin-bottom:40px}div.svelte-c15mx9{padding:0}.form.svelte-c15mx9{background-color:#ded599;height:100%;margin:20px;border-radius:20px}.header.svelte-c15mx9{border-radius:20px 20px 0 0;height:75px;background-color:#375637;position:relative}.heading.svelte-c15mx9{font-size:32px;margin:0;position:absolute;top:50%;transform:translate(0, -50%);padding-left:10px;color:#ddd499}input.svelte-c15mx9,textarea.svelte-c15mx9{width:80%;padding-left:10px;padding-right:10px;line-height:40px;font-size:20px}input.svelte-c15mx9{margin-top:25px}textarea.svelte-c15mx9{margin-bottom:25px}.selectstuff.svelte-c15mx9{display:table-cell;line-height:40px;font-size:20px}.container.svelte-c15mx9{display:table;width:100%;table-layout:fixed}select.svelte-c15mx9{width:65px}button.svelte-c15mx9{margin-bottom:20px}",
	map: "{\"version\":3,\"file\":\"ProposeToastForm.svelte\",\"sources\":[\"ProposeToastForm.svelte\"],\"sourcesContent\":[\"<script lang='typescript'>;\\r\\nlet toast = {\\r\\n    toasterName: '',\\r\\n    toasterRelationship: '',\\r\\n    toasterAssociation: '',\\r\\n    toastContent: ''\\r\\n};\\r\\nasync function proposeToast() {\\r\\n    if (toast.toasterName == '' || toast.toastContent == '') {\\r\\n        return;\\r\\n    }\\r\\n    await fetch('/api/toastController', {\\r\\n        method: 'POST',\\r\\n        body: JSON.stringify({ toast }),\\r\\n        headers: { \\\"Content-type\\\": \\\"application/json\\\" }\\r\\n    });\\r\\n}\\r\\n;\\r\\n</script>\\r\\n\\r\\n<section class='propose'>\\r\\n    <div class='form'>\\r\\n        <div class='header'>\\r\\n            <p class='heading'>Propose a Toast...</p>\\r\\n        </div>\\r\\n        <input type='text' placeholder='Name' bind:value={toast.toasterName}/>\\r\\n        <div class='container'>\\r\\n        <div class='selectstuff'>\\r\\n            <select bind:value={toast.toasterRelationship}>\\r\\n                <option value='Father' selected>Father</option>\\r\\n                <option value='Mother'>Mother</option>\\r\\n                <option value='Brother'>Brother</option>\\r\\n                <option value='Sister'>Sister</option>\\r\\n                <option value='Son'>Son</option>\\r\\n                <option value='Daughter'>Daughter</option>\\r\\n                <option value='Relative'>Relative</option>\\r\\n                <option value='Friend'>Friend</option>\\r\\n            </select>\\r\\n        </div>\\r\\n        <div class='selectstuff'>of the</div>\\r\\n        <div class='selectstuff'>\\r\\n            <select bind:value={toast.toasterAssociation}>\\r\\n                <option value='Groom' selected>Groom</option>\\r\\n                <option value='Bride'>Bride</option>\\r\\n            </select>\\r\\n        </div>\\r\\n        </div>\\r\\n        <textarea bind:value={toast.toastContent} rows='7' placeholder='Message'></textarea>\\r\\n        <br/>\\r\\n        <button on:click={proposeToast}>Propose!</button>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style lang='scss'>section {\\n  width: 100%;\\n  margin-bottom: 40px; }\\n\\ndiv {\\n  padding: 0; }\\n\\n.form {\\n  background-color: #ded599;\\n  height: 100%;\\n  margin: 20px;\\n  border-radius: 20px; }\\n\\n.header {\\n  border-radius: 20px 20px 0 0;\\n  height: 75px;\\n  background-color: #375637;\\n  position: relative; }\\n\\n.heading {\\n  font-size: 32px;\\n  margin: 0;\\n  position: absolute;\\n  top: 50%;\\n  transform: translate(0, -50%);\\n  padding-left: 10px;\\n  color: #ddd499; }\\n\\ninput, textarea {\\n  width: 80%;\\n  padding-left: 10px;\\n  padding-right: 10px;\\n  line-height: 40px;\\n  font-size: 20px; }\\n\\ninput {\\n  margin-top: 25px; }\\n\\ntextarea {\\n  margin-bottom: 25px; }\\n\\n.selectstuff {\\n  display: table-cell;\\n  line-height: 40px;\\n  font-size: 20px; }\\n\\n.container {\\n  display: table;\\n  width: 100%;\\n  table-layout: fixed; }\\n\\nselect {\\n  width: 65px; }\\n\\nbutton {\\n  margin-bottom: 20px; }</style>\"],\"names\":[],\"mappings\":\"AAqDmB,OAAO,cAAC,CAAC,AAC1B,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,GAAG,cAAC,CAAC,AACH,OAAO,CAAE,CAAC,AAAE,CAAC,AAEf,KAAK,cAAC,CAAC,AACL,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,OAAO,cAAC,CAAC,AACP,aAAa,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAC5B,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AAEvB,QAAQ,cAAC,CAAC,AACR,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,CAAC,CAAC,CAAC,IAAI,CAAC,CAC7B,YAAY,CAAE,IAAI,CAClB,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,mBAAK,CAAE,QAAQ,cAAC,CAAC,AACf,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,AAAE,CAAC,AAEpB,KAAK,cAAC,CAAC,AACL,UAAU,CAAE,IAAI,AAAE,CAAC,AAErB,QAAQ,cAAC,CAAC,AACR,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,YAAY,cAAC,CAAC,AACZ,OAAO,CAAE,UAAU,CACnB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,AAAE,CAAC,AAEpB,UAAU,cAAC,CAAC,AACV,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,YAAY,CAAE,KAAK,AAAE,CAAC,AAExB,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,IAAI,AAAE,CAAC,AAEhB,MAAM,cAAC,CAAC,AACN,aAAa,CAAE,IAAI,AAAE,CAAC\"}"
};

const ProposeToastForm = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

	let toast = {
		toasterName: "",
		toasterRelationship: "",
		toasterAssociation: "",
		toastContent: ""
	};

	
	$$result.css.add(css$7);

	return `<section class="${"propose svelte-c15mx9"}"><div class="${"form svelte-c15mx9"}"><div class="${"header svelte-c15mx9"}"><p class="${"heading svelte-c15mx9"}">Propose a Toast...</p></div>
        <input type="${"text"}" placeholder="${"Name"}" class="${"svelte-c15mx9"}"${add_attribute("value", toast.toasterName, 1)}>
        <div class="${"container svelte-c15mx9"}"><div class="${"selectstuff svelte-c15mx9"}"><select class="${"svelte-c15mx9"}"${add_attribute("value", toast.toasterRelationship, 1)}><option value="${"Father"}" selected>Father</option><option value="${"Mother"}">Mother</option><option value="${"Brother"}">Brother</option><option value="${"Sister"}">Sister</option><option value="${"Son"}">Son</option><option value="${"Daughter"}">Daughter</option><option value="${"Relative"}">Relative</option><option value="${"Friend"}">Friend</option></select></div>
        <div class="${"selectstuff svelte-c15mx9"}">of the</div>
        <div class="${"selectstuff svelte-c15mx9"}"><select class="${"svelte-c15mx9"}"${add_attribute("value", toast.toasterAssociation, 1)}><option value="${"Groom"}" selected>Groom</option><option value="${"Bride"}">Bride</option></select></div></div>
        <textarea rows="${"7"}" placeholder="${"Message"}" class="${"svelte-c15mx9"}">${toast.toastContent || ""}</textarea>
        <br>
        <button class="${"svelte-c15mx9"}">Propose!</button></div>
</section>`;
});

/* src\routes\index.svelte generated by Svelte v3.23.2 */

const css$8 = {
	code: "@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';@import 'https://fonts.googleapis.com/css?family=Rokkitt';body{background-color:#fff9ea;margin:0;font-size:0;font-family:'Princess Sofia'}h1{font-weight:100;text-align:center;font-size:40px;color:#ddd499;margin-bottom:0}div{overflow:hidden}section{text-align:center}section div{padding:20px}img{width:50%;margin-top:-20px}p{font-size:20px;font-family:'Rokkitt'}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\r\\n    import SectionHeader from './_components/SectionHeader.svelte';\\r\\n    import Jumbotron from './_components/Jumbotron.svelte';\\r\\n    import Story from './_components/Story.svelte';\\r\\n    import Blended from './_components/Blended.svelte';\\r\\n    import Clan from './_components/Clan.svelte';\\r\\n    import Toasts from './_components/Toasts.svelte';\\r\\n    import ProposeToastForm from './_components/ProposeToastForm.svelte';\\r\\n</script>\\r\\n\\r\\n<SectionHeader isNav={true} />\\r\\n<Jumbotron />\\r\\n<Story />\\r\\n<Clan />\\r\\n<Toasts />\\r\\n<ProposeToastForm/>\\r\\n<Blended />\\r\\n\\r\\n<style global lang='scss'>@import 'https://fonts.googleapis.com/css?family=Princess+Sofia';\\n@import 'https://fonts.googleapis.com/css?family=Rokkitt';\\n:global(body) {\\n  background-color: #fff9ea;\\n  margin: 0;\\n  font-size: 0;\\n  font-family: 'Princess Sofia'; }\\n\\n:global(h1) {\\n  font-weight: 100;\\n  text-align: center;\\n  font-size: 40px;\\n  color: #ddd499;\\n  margin-bottom: 0; }\\n\\n:global(div) {\\n  overflow: hidden; }\\n\\n:global(section) {\\n  text-align: center; }\\n  :global(section) :global(div) {\\n    padding: 20px; }\\n\\n:global(img) {\\n  width: 50%;\\n  margin-top: -20px; }\\n\\n:global(p) {\\n  font-size: 20px;\\n  font-family: 'Rokkitt'; }</style>\"],\"names\":[],\"mappings\":\"AAkB0B,QAAQ,wDAAwD,CAAC,AAC3F,QAAQ,iDAAiD,CAAC,AAClD,IAAI,AAAE,CAAC,AACb,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,CAAC,CACZ,WAAW,CAAE,gBAAgB,AAAE,CAAC,AAE1B,EAAE,AAAE,CAAC,AACX,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,CAAC,AAAE,CAAC,AAEb,GAAG,AAAE,CAAC,AACZ,QAAQ,CAAE,MAAM,AAAE,CAAC,AAEb,OAAO,AAAE,CAAC,AAChB,UAAU,CAAE,MAAM,AAAE,CAAC,AACb,OAAO,AAAC,CAAC,AAAQ,GAAG,AAAE,CAAC,AAC7B,OAAO,CAAE,IAAI,AAAE,CAAC,AAEZ,GAAG,AAAE,CAAC,AACZ,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,KAAK,AAAE,CAAC,AAEd,CAAC,AAAE,CAAC,AACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,SAAS,AAAE,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$8);

	return `${validate_component(SectionHeader, "SectionHeader").$$render($$result, { isNav: true }, {}, {})}
${validate_component(Jumbotron, "Jumbotron").$$render($$result, {}, {}, {})}
${validate_component(Story, "Story").$$render($$result, {}, {}, {})}
${validate_component(Clan, "Clan").$$render($$result, {}, {}, {})}
${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})}
${validate_component(ProposeToastForm, "ProposeToastForm").$$render($$result, {}, {}, {})}
${validate_component(Blended, "Blended").$$render($$result, {}, {}, {})}`;
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

${ ``}`;
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

const build_dir = "__sapper__/build";

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
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

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
		res.setHeader('Cache-Control',  'max-age=600');

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
			cache_control:  'max-age=31536000, immutable'
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

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

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

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
polka()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(compression({ threshold: 0 }), sirv('static', { dev }), middleware())
    .listen(PORT, err => {
    if (err) {
        throw err;
    }
});
