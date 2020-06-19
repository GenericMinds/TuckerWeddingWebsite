import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as svg_element, c as claim_element, b as children, e as detach_dev, f as attr_dev, g as add_location, h as insert_dev, j as append_dev, n as noop } from './client.06577f92.js';

/* src\routes\MenuIcon.svelte generated by Svelte v3.23.2 */

const file = "src\\routes\\MenuIcon.svelte";

function create_fragment(ctx) {
	let svg;
	let rect0;
	let rect1;
	let rect2;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			rect0 = svg_element("rect");
			rect1 = svg_element("rect");
			rect2 = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(
				nodes,
				"svg",
				{
					viewBox: true,
					width: true,
					height: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			rect0 = claim_element(svg_nodes, "rect", { width: true, height: true }, 1);
			children(rect0).forEach(detach_dev);
			rect1 = claim_element(svg_nodes, "rect", { y: true, width: true, height: true }, 1);
			children(rect1).forEach(detach_dev);
			rect2 = claim_element(svg_nodes, "rect", { y: true, width: true, height: true }, 1);
			children(rect2).forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(rect0, "width", "100");
			attr_dev(rect0, "height", "20");
			add_location(rect0, file, 1, 2, 53);
			attr_dev(rect1, "y", "30");
			attr_dev(rect1, "width", "100");
			attr_dev(rect1, "height", "20");
			add_location(rect1, file, 2, 2, 94);
			attr_dev(rect2, "y", "60");
			attr_dev(rect2, "width", "100");
			attr_dev(rect2, "height", "20");
			add_location(rect2, file, 3, 2, 142);
			attr_dev(svg, "viewBox", "0 0 100 80");
			attr_dev(svg, "width", "40");
			attr_dev(svg, "height", "40");
			attr_dev(svg, "class", "svelte-1v3kczs");
			add_location(svg, file, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, rect0);
			append_dev(svg, rect1);
			append_dev(svg, rect2);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuIcon> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("MenuIcon", $$slots, []);
	return [];
}

class MenuIcon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuIcon",
			options,
			id: create_fragment.name
		});
	}
}

export default MenuIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUljb24uNTNjYzg1NGUuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
