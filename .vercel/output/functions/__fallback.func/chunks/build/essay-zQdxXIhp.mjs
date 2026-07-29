import { _ as _sfc_main$2, N as NuxtLink, d as _sfc_main$7, $ as $fetch$2, e as useComponentProps, f as useAppConfig, g as useForwardProps, r as reactivePick, s as usePortal, m as useFormField, v as useFieldGroup, o as useComponentIcons, t as tv, w as isArrayOfArray, a as _sfc_main$2$1, p as _sfc_main$8, F as FieldGroupReset, x as get, y as _sfc_main$1$2, h as useVModel, z as isNullish, A as useCollection, q as looseToNumber, i as useForwardExpose, P as Primitive, B as getDisplayValue, T as Teleport_default, k as Presence_default, C as injectConfigProviderContext, l as createContext, V as VisuallyHidden_default, D as refAutoReset, E as useForwardProps$1, G as useEmitAsProps, H as unrefElement, I as getActiveElement, J as useResizeObserver, K as __exportAll, L as __reExport } from '../virtual/entry.mjs';
import { u as useFetch, _ as _sfc_main$6, b as useFormControl, a as useId$1 } from './fetch-FeZ2-RLM.mjs';
import { _ as _sfc_main$1, E as ESSAY_DIRECTIONS, u as useBodyScrollLock, b as useHideOthers, F as FocusScope_default, D as DismissableLayer_default, h as handleAndDispatchCustomEvent, f as focusFirst } from '../_/constants.mjs';
import { _ as _sfc_main$5 } from './Card-Cufg5vwz.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Input-DmQXC8tz.mjs';
import { _ as _sfc_main$4 } from './Alert-Cv2_53fX.mjs';
import * as vue from 'vue';
import { defineComponent, withAsyncContext, computed, ref, reactive, mergeProps, isRef, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSlots, toRef, useTemplateRef, renderSlot, Fragment, renderList, resolveDynamicComponent, toRefs, createElementBlock, withModifiers, normalizeProps, guardReactiveProps, watch, Teleport, createElementVNode, watchPostEffect, watchEffect, nextTick, normalizeStyle, withMemo, mergeDefaults, useSSRContext } from 'vue';
import { K as defu, Q as isEqual } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'fnv1a-64';
import 'object-identity';
import 'node:fs';
import '@libsql/client';
import 'drizzle-orm/libsql';
import 'drizzle-orm/sqlite-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import '@iconify/utils';
import 'consola';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/clamp.js
/**
* The `clamp` function restricts a number within a specified range by returning the value itself if it
* falls within the range, or the closest boundary value if it exceeds the range.
* @param {number} value - The `value` parameter represents the number that you want to clamp within
* the specified range defined by `min` and `max` values.
* @param {number} min - If the `value` parameter is less than the `min` value, the
* function will return the `min` value.
* @param {number} max - If the `value` parameter is greater than the `max` value,
* the function will return `max`.
* @returns The `clamp` function returns the value of `value` constrained within the range defined by
* `min` and `max`.
*/
function clamp$1(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
	return Math.min(max, Math.max(min, value));
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useDirection.js
/**
* The `useDirection` function provides a way to access the current direction in your application.
* @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
* @returns  computed value that combines with the resolved direction.
*/
function useDirection(dir) {
	const context = injectConfigProviderContext({ dir: ref("ltr") });
	return computed(() => dir?.value || context.dir?.value || "ltr");
}
/**
* Injects a pair of focus guards at the edges of the whole DOM tree
* to ensure `focusin` & `focusout` events can be caught consistently.
*/
function useFocusGuards() {
	watchEffect((cleanupFn) => {});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function useForwardPropsEmits(props, emit) {
	const parsedProps = useForwardProps$1(props);
	const emitsAsProps = emit ? useEmitAsProps(emit) : {};
	return computed(() => ({
		...parsedProps.value,
		...emitsAsProps
	}));
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useSize.js
function useSize(element) {
	const size = ref();
	return {
		width: computed(() => size.value?.width ?? 0),
		height: computed(() => size.value?.height ?? 0)
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useTypeahead.js
function useTypeahead(callback) {
	const search = refAutoReset("", 1e3);
	const handleTypeaheadSearch = (key, items) => {
		search.value = search.value + key;
		{
			const currentItem = getActiveElement();
			const itemsWithTextValue = items.map((item) => ({
				...item,
				textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
			}));
			const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
			const nextMatch = getNextMatch(itemsWithTextValue.map((item) => item.textValue), search.value, currentMatch?.textValue);
			const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
			if (newItem) newItem.ref.focus();
			return newItem?.ref;
		}
	};
	const resetTypeahead = () => {
		search.value = "";
	};
	return {
		search,
		handleTypeaheadSearch,
		resetTypeahead
	};
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
/**
* This is the "meat" of the typeahead matching logic. It takes in all the values,
* the search and the current match, and returns the next match (or `undefined`).
*
* We normalize the search because if a user has repeatedly pressed a character,
* we want the exact same behavior as if we only had that one character
* (ie. cycle through options starting with that character)
*
* We also reorder the values by wrapping the array around the current match.
* This is so we always look forward from the current match, and picking the first
* match will always be the correct one.
*
* Finally, if the normalized search is exactly one character, we exclude the
* current match from the values because otherwise it would be the first to match always
* and focus would never move. This is as opposed to the regular case, where we
* don't want focus to move if the current match still matches.
*/
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Popper/PopperRoot.js
var [injectPopperRootContext, providePopperRootContext] = /*#__PURE__*/ createContext("PopperRoot");
var PopperRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperRoot",
	setup(__props) {
		const anchor = ref();
		providePopperRootContext({
			anchor,
			onAnchorChange: (element) => anchor.value = element
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Popper/PopperAnchor.js
var PopperAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectPopperRootContext();
		watchPostEffect(() => {
			rootContext.onAnchorChange(props.reference ?? currentElement.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/component/Arrow.js
var _hoisted_1$3 = {
	key: 0,
	d: "M0 0L6 6L12 0"
};
var _hoisted_2 = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_default = /* @__PURE__ */ defineComponent({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				width: _ctx.width,
				height: _ctx.height,
				viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
				preserveAspectRatio: _ctx.asChild ? void 0 : "none"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1$3)) : (openBlock(), createElementBlock("path", _hoisted_2))])]),
				_: 3
			}, 16, [
				"width",
				"height",
				"viewBox",
				"preserveAspectRatio"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Popper/utils.js
function isNotNull(value) {
	return value !== null;
}
function transformOrigin(options) {
	return {
		name: "transformOrigin",
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlignX = {
				start: options.dir === "rtl" ? "100%" : "0%",
				center: "50%",
				end: options.dir === "rtl" ? "0%" : "100%"
			}[placedAlign];
			const noArrowAlignY = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlignX : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlignX : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlignY : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlignY : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top, _padding$right, _padding$bottom, _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$2 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(minPadding, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			var _rawOffset$mainAxis, _rawOffset$crossAxis;
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
				crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const shiftData = state.middlewareData.shift;
			const noShift = !shiftData;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth;
			if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right);
			else availableHeight = height - 2 * max(overflow.top, overflow.bottom);
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
function getNodeName(node) {
	if (isNode()) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || void 0;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode() ? node.ownerDocument : node.document) || (void 0).document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	return false;
}
function isElement(value) {
	return false;
}
function isHTMLElement(value) {
	return false;
}
function isShadowRoot(value) {
	return false;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement() ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement() && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement()) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot() && node.host || getDocumentElement(node);
	return isShadowRoot() ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement() && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement();
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement$1(element) {
	return !isElement() ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement$1(element);
	if (!isHTMLElement()) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement$1(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement()) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement() ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement();
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement()) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement() && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement() && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement();
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement() || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement()) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement() && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement$1(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = offset$1;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = shift$1;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = flip$1;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = size$1;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = hide$1;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = arrow$2;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = limitShift$1;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_1440e003b2b5f3f98ec44a6bc416fe70/node_modules/nuxt/dist/app/compat/capi.js
var install = () => {};
function set(target, key, val) {
	if (Array.isArray(target)) {
		target.length = Math.max(target.length, key);
		target.splice(key, 1, val);
		return val;
	}
	target[key] = val;
	return val;
}
function del(target, key) {
	if (Array.isArray(target)) {
		target.splice(key, 1);
		return;
	}
	delete target[key];
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@babel+plugin-syntax-typ_1440e003b2b5f3f98ec44a6bc416fe70/node_modules/nuxt/dist/app/compat/vue-demi.js
var vue_demi_exports = /* @__PURE__ */ __exportAll({
	Vue2: () => void 0,
	del: () => del,
	install: () => install,
	isVue2: () => false,
	isVue3: () => true,
	set: () => set
});
__reExport(vue_demi_exports, vue);
//#endregion
//#region node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.40_typescript@7.0.2_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
	return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement(target) {
	if (isComponentPublicInstance(target)) {
		const element = target.$el;
		return isNode() && getNodeName(element) === "#comment" ? null : element;
	}
	return target;
}
function toValue$1(source) {
	return typeof source === "function" ? source() : (0, vue_demi_exports.unref)(source);
}
/**
* Positions an inner element of the floating element such that it is centered to the reference element.
* @param options The arrow options.
* @see https://floating-ui.com/docs/arrow
*/
function arrow(options) {
	return {
		name: "arrow",
		options,
		fn(args) {
			const element = unwrapElement(toValue$1(options.element));
			if (element == null) return {};
			return arrow$1({
				element,
				padding: options.padding
			}).fn(args);
		}
	};
}
function getDPR(element) {
	return 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR();
	return Math.round(value * dpr) / dpr;
}
/**
* Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
* @param reference The reference template ref.
* @param floating The floating template ref.
* @param options The floating options.
* @see https://floating-ui.com/docs/vue
*/
function useFloating(reference, floating, options) {
	if (options === void 0) options = {};
	const whileElementsMountedOption = options.whileElementsMounted;
	const openOption = (0, vue_demi_exports.computed)(() => {
		var _toValue;
		return (_toValue = toValue$1(options.open)) != null ? _toValue : true;
	});
	const middlewareOption = (0, vue_demi_exports.computed)(() => toValue$1(options.middleware));
	const placementOption = (0, vue_demi_exports.computed)(() => {
		var _toValue2;
		return (_toValue2 = toValue$1(options.placement)) != null ? _toValue2 : "bottom";
	});
	const strategyOption = (0, vue_demi_exports.computed)(() => {
		var _toValue3;
		return (_toValue3 = toValue$1(options.strategy)) != null ? _toValue3 : "absolute";
	});
	const transformOption = (0, vue_demi_exports.computed)(() => {
		var _toValue4;
		return (_toValue4 = toValue$1(options.transform)) != null ? _toValue4 : true;
	});
	const referenceElement = (0, vue_demi_exports.computed)(() => unwrapElement(reference.value));
	const floatingElement = (0, vue_demi_exports.computed)(() => unwrapElement(floating.value));
	const x = (0, vue_demi_exports.ref)(0);
	const y = (0, vue_demi_exports.ref)(0);
	const strategy = (0, vue_demi_exports.ref)(strategyOption.value);
	const placement = (0, vue_demi_exports.ref)(placementOption.value);
	const middlewareData = (0, vue_demi_exports.shallowRef)({});
	const isPositioned = (0, vue_demi_exports.ref)(false);
	const floatingStyles = (0, vue_demi_exports.computed)(() => {
		const initialStyles = {
			position: strategy.value,
			left: "0",
			top: "0"
		};
		if (!floatingElement.value) return initialStyles;
		const xVal = roundByDPR(floatingElement.value, x.value);
		const yVal = roundByDPR(floatingElement.value, y.value);
		if (transformOption.value) return {
			...initialStyles,
			transform: "translate(" + xVal + "px, " + yVal + "px)",
			...getDPR(floatingElement.value) >= 1.5
		};
		return {
			position: strategy.value,
			left: xVal + "px",
			top: yVal + "px"
		};
	});
	let whileElementsMountedCleanup;
	function update() {
		if (referenceElement.value == null || floatingElement.value == null) return;
		const open = openOption.value;
		computePosition(referenceElement.value, floatingElement.value, {
			middleware: middlewareOption.value,
			placement: placementOption.value,
			strategy: strategyOption.value
		}).then((position) => {
			x.value = position.x;
			y.value = position.y;
			strategy.value = position.strategy;
			placement.value = position.placement;
			middlewareData.value = position.middlewareData;
			/**
			* The floating element's position may be recomputed while it's closed
			* but still mounted (such as when transitioning out). To ensure
			* `isPositioned` will be `false` initially on the next open, avoid
			* setting it to `true` when `open === false` (must be specified).
			*/
			isPositioned.value = open !== false;
		});
	}
	function cleanup() {
		if (typeof whileElementsMountedCleanup === "function") {
			whileElementsMountedCleanup();
			whileElementsMountedCleanup = void 0;
		}
	}
	function attach() {
		cleanup();
		if (whileElementsMountedOption === void 0) {
			update();
			return;
		}
		if (referenceElement.value != null && floatingElement.value != null) {
			whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
			return;
		}
	}
	function reset() {
		if (!openOption.value) isPositioned.value = false;
	}
	(0, vue_demi_exports.watch)([
		middlewareOption,
		placementOption,
		strategyOption,
		openOption
	], update, { flush: "sync" });
	(0, vue_demi_exports.watch)([referenceElement, floatingElement], attach, { flush: "sync" });
	(0, vue_demi_exports.watch)(openOption, reset, { flush: "sync" });
	if ((0, vue_demi_exports.getCurrentScope)()) (0, vue_demi_exports.onScopeDispose)(cleanup);
	return {
		x: (0, vue_demi_exports.shallowReadonly)(x),
		y: (0, vue_demi_exports.shallowReadonly)(y),
		strategy: (0, vue_demi_exports.shallowReadonly)(strategy),
		placement: (0, vue_demi_exports.shallowReadonly)(placement),
		middlewareData: (0, vue_demi_exports.shallowReadonly)(middlewareData),
		isPositioned: (0, vue_demi_exports.shallowReadonly)(isPositioned),
		floatingStyles,
		update
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Popper/PopperContent.js
var _hoisted_1$2 = ["dir"];
var PopperContentPropsDefaultValue = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: true,
	align: "center",
	alignOffset: 0,
	alignFlip: true,
	arrowPadding: 0,
	hideShiftedArrow: true,
	avoidCollisions: true,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: false,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: false
};
var [injectPopperContentContext, providePopperContentContext] = /*#__PURE__*/ createContext("PopperContent");
var PopperContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperContent",
	props: /* @__PURE__ */ mergeDefaults({
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopperRootContext();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const dir = useDirection(computed(() => props.dir));
		const floatingRef = ref();
		const arrow$1 = ref();
		const { width: arrowWidth, height: arrowHeight } = useSize();
		const desiredPlacement = computed(() => props.side + (props.align !== "center" ? `-${props.align}` : ""));
		const collisionPadding = computed(() => {
			return typeof props.collisionPadding === "number" ? props.collisionPadding : {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				...props.collisionPadding
			};
		});
		const boundary = computed(() => {
			return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
		});
		const detectOverflowOptions = computed(() => {
			return {
				padding: collisionPadding.value,
				boundary: boundary.value.filter(isNotNull),
				altBoundary: boundary.value.length > 0
			};
		});
		const flipOptions = computed(() => {
			return {
				mainAxis: props.sideFlip,
				crossAxis: props.alignFlip
			};
		});
		const computedMiddleware = computed(() => {
			return [
				offset({
					mainAxis: props.sideOffset + arrowHeight.value,
					alignmentAxis: props.alignOffset
				}),
				props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				props.avoidCollisions && shift({
					mainAxis: true,
					crossAxis: !!props.prioritizePosition,
					limiter: props.sticky === "partial" ? limitShift() : void 0,
					...detectOverflowOptions.value
				}),
				!props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				size({
					...detectOverflowOptions.value,
					apply: ({ elements, rects, availableWidth, availableHeight }) => {
						const { width: anchorWidth, height: anchorHeight } = rects.reference;
						const contentStyle = elements.floating.style;
						contentStyle.setProperty("--reka-popper-available-width", `${availableWidth}px`);
						contentStyle.setProperty("--reka-popper-available-height", `${availableHeight}px`);
						contentStyle.setProperty("--reka-popper-anchor-width", `${anchorWidth}px`);
						contentStyle.setProperty("--reka-popper-anchor-height", `${anchorHeight}px`);
					}
				}),
				arrow$1.value && arrow({
					element: arrow$1.value,
					padding: props.arrowPadding
				}),
				transformOrigin({
					arrowWidth: arrowWidth.value,
					arrowHeight: arrowHeight.value,
					dir: dir.value
				}),
				props.hideWhenDetached && hide({
					strategy: "referenceHidden",
					...detectOverflowOptions.value
				})
			];
		});
		const { floatingStyles, placement, isPositioned, middlewareData} = useFloating(computed(() => props.reference ?? rootContext.anchor.value), floatingRef, {
			strategy: props.positionStrategy,
			placement: desiredPlacement,
			whileElementsMounted: (...args) => {
				return autoUpdate(...args, {
					layoutShift: !props.disableUpdateOnLayoutShift,
					animationFrame: props.updatePositionStrategy === "always"
				});
			},
			middleware: computedMiddleware
		});
		const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
		const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
		watchPostEffect(() => {
			if (isPositioned.value) emits("placed");
		});
		const shouldHideArrow = computed(() => {
			const cannotCenterArrow = middlewareData.value.arrow?.centerOffset !== 0;
			return props.hideShiftedArrow && cannotCenterArrow;
		});
		const contentZIndex = ref("");
		watchEffect(() => {
			if (contentElement.value) contentZIndex.value = (void 0).getComputedStyle(contentElement.value).zIndex;
		});
		providePopperContentContext({
			placedSide,
			onArrowChange: (element) => arrow$1.value = element,
			arrowX: computed(() => middlewareData.value.arrow?.x ?? 0),
			arrowY: computed(() => middlewareData.value.arrow?.y ?? 0),
			shouldHideArrow
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "floatingRef",
				ref: floatingRef,
				"data-reka-popper-content-wrapper": "",
				dir: unref(dir),
				style: normalizeStyle({
					...unref(floatingStyles),
					transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)",
					minWidth: "max-content",
					zIndex: contentZIndex.value,
					["--reka-popper-transform-origin"]: [unref(middlewareData).transformOrigin?.x, unref(middlewareData).transformOrigin?.y].join(" "),
					...unref(middlewareData).hide?.referenceHidden && {
						visibility: "hidden",
						pointerEvents: "none"
					}
				})
			}, [props.memoDependencies ? withMemo([
				props.asChild,
				props.as,
				placedSide.value,
				placedAlign.value,
				unref(isPositioned),
				...Object.values(_ctx.$attrs),
				...props.memoDependencies
			], () => (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				ref: unref(forwardRef)
			}, _ctx.$attrs, {
				"as-child": props.asChild,
				as: props.as,
				"data-side": placedSide.value,
				"data-align": placedAlign.value,
				style: { animation: !unref(isPositioned) ? "none" : void 0 }
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as-child",
				"as",
				"data-side",
				"data-align",
				"style"
			])), _cache, 0) : (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 1,
				ref: unref(forwardRef)
			}, _ctx.$attrs, {
				"as-child": props.asChild,
				as: props.as,
				"data-side": placedSide.value,
				"data-align": placedAlign.value,
				dir: unref(dir),
				style: { animation: !unref(isPositioned) ? "none" : void 0 }
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as-child",
				"as",
				"data-side",
				"data-align",
				"dir",
				"style"
			]))], 12, _hoisted_1$2);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Popper/PopperArrow.js
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const contentContext = injectPopperContentContext();
		const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				ref: (el) => {
					unref(contentContext).onArrowChange(el ?? void 0);
				},
				style: normalizeStyle({
					position: "absolute",
					left: unref(contentContext).arrowX?.value ? `${unref(contentContext).arrowX?.value}px` : void 0,
					top: unref(contentContext).arrowY?.value ? `${unref(contentContext).arrowY?.value}px` : void 0,
					[baseSide.value]: 0,
					transformOrigin: {
						top: "",
						right: "0 0",
						bottom: "center 0",
						left: "100% 0"
					}[unref(contentContext).placedSide.value],
					transform: {
						top: "translateY(100%)",
						right: "translateY(50%) rotate(90deg) translateX(-50%)",
						bottom: `rotate(180deg)`,
						left: "translateY(50%) rotate(-90deg) translateX(50%)"
					}[unref(contentContext).placedSide.value],
					visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
				})
			}, [createVNode(Arrow_default, mergeProps(_ctx.$attrs, {
				ref: unref(forwardRef),
				style: { display: "block" },
				as: _ctx.as,
				"as-child": _ctx.asChild,
				rounded: _ctx.rounded,
				width: _ctx.width,
				height: _ctx.height
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"rounded",
				"width",
				"height"
			])], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useNonce.js
function useNonce(nonce) {
	const context = injectConfigProviderContext({ nonce: ref() });
	return computed(() => nonce?.value || context.nonce?.value);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/utils.js
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
	else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
	return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectRoot.js
var _hoisted_1$1 = ["value"];
var [injectSelectRootContext, provideSelectRootContext] = /*#__PURE__*/ createContext("SelectRoot");
var SelectRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		nullableValue: {
			type: String,
			required: false,
			default: ""
		},
		by: {
			type: [String, Function],
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { required, disabled, multiple, dir: propDir } = toRefs(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const valueElement = ref();
		const triggerPointerDownPosRef = ref({
			x: 0,
			y: 0
		});
		const isEmptyModelValue = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
			else return isNullish(modelValue.value);
		});
		useCollection({ isProvider: true });
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(triggerElement);
		const optionsSet = ref(/* @__PURE__ */ new Set());
		const nativeSelectKey = computed(() => {
			return Array.from(optionsSet.value).map((option) => option.value).join(";");
		});
		function handleValueChange(value) {
			if (multiple.value) {
				const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = array.findIndex((i) => compare(i, value, props.by));
				index === -1 ? array.push(value) : array.splice(index, 1);
				modelValue.value = [...array];
			} else modelValue.value = value;
		}
		function getOption(value) {
			return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
		}
		provideSelectRootContext({
			triggerElement,
			onTriggerChange: (node) => {
				triggerElement.value = node;
			},
			valueElement,
			onValueElementChange: (node) => {
				valueElement.value = node;
			},
			contentId: "",
			modelValue,
			onValueChange: handleValueChange,
			by: props.by,
			open,
			multiple,
			required,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			triggerPointerDownPosRef,
			disabled,
			isEmptyModelValue,
			optionsSet,
			onOptionAdd: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
				optionsSet.value.add(option);
			},
			onOptionRemove: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					open: unref(open)
				}), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(BubbleSelect_default, {
					key: nativeSelectKey.value,
					"aria-hidden": "true",
					tabindex: "-1",
					multiple: unref(multiple),
					required: unref(required),
					name: _ctx.name,
					autocomplete: _ctx.autocomplete,
					disabled: unref(disabled),
					value: unref(modelValue)
				}, {
					default: withCtx(() => [unref(isNullish)(unref(modelValue)) ? (openBlock(), createElementBlock("option", {
						key: 0,
						value: _ctx.nullableValue
					}, null, 8, _hoisted_1$1)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(optionsSet.value), (option) => {
						return openBlock(), createElementBlock("option", mergeProps({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
					}), 128))]),
					_: 1
				}, 8, [
					"multiple",
					"required",
					"name",
					"autocomplete",
					"disabled",
					"value"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/BubbleSelect.js
var BubbleSelect_default = /* @__PURE__ */ defineComponent({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		form: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		size: {
			type: Number,
			required: false
		},
		value: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const selectElement = ref();
		const rootContext = injectSelectRootContext();
		watch(() => props.value, (cur, prev) => {
			const selectProto = (void 0).HTMLSelectElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
			if (cur !== prev && setValue && selectElement.value) {
				const event = new Event("change", { bubbles: true });
				setValue.call(selectElement.value, cur);
				selectElement.value.dispatchEvent(event);
			}
		});
		/**
		* Form autofill will trigger an `input` event on the `select` element.
		* We listen to that event and update our internal state to support it.
		*/
		function handleInput(event) {
			rootContext.onValueChange(event.target.value);
		}
		/**
		* We purposefully use a `select` here to support form autofill as much
		* as possible.
		*
		* We purposefully do not add the `value` attribute here to allow the value
		* to be set programmatically and bubble to any parent form `onChange` event.
		*
		* We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
		* won't work otherwise.
		*/
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(VisuallyHidden_default), { "as-child": "" }, {
				default: withCtx(() => [createElementVNode("select", mergeProps({
					ref_key: "selectElement",
					ref: selectElement
				}, props, { onInput: handleInput }), [renderSlot(_ctx.$slots, "default")], 16)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectPopperPosition.js
var SelectPopperPosition_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPopperPosition",
	props: {
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 10
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const forwarded = useForwardProps$1(__props);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperContent_default), mergeProps(unref(forwarded), { style: {
				"boxSizing": "border-box",
				"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-select-content-available-width": "var(--reka-popper-available-width)",
				"--reka-select-content-available-height": "var(--reka-popper-available-height)",
				"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectContentImpl.js
var SelectContentDefaultContextValue = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
};
var [injectSelectContentContext, provideSelectContentContext] = /*#__PURE__*/ createContext("SelectContent");
var SelectContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: false,
			default: true
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSelectRootContext();
		useFocusGuards();
		useBodyScrollLock(props.bodyLock);
		const { CollectionSlot, getItems } = useCollection();
		const content = ref();
		useHideOthers(content);
		const { search, handleTypeaheadSearch } = useTypeahead();
		const viewport = ref();
		const selectedItem = ref();
		const selectedItemText = ref();
		const isPositioned = ref(false);
		const firstValidItemFoundRef = ref(false);
		const firstSelectedItemInArrayFoundRef = ref(false);
		function focusSelectedItem() {
			if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
		}
		watch(isPositioned, () => {
			focusSelectedItem();
		});
		const { onOpenChange, triggerPointerDownPosRef } = rootContext;
		watchEffect((cleanupFn) => {
			if (!content.value) return;
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (event.pointerType === "touch") return;
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.value?.contains(event.target)) onOpenChange(false);
				(void 0).removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.value = null;
			};
			if (triggerPointerDownPosRef.value !== null) {
				(void 0).addEventListener("pointermove", handlePointerMove);
				(void 0).addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			cleanupFn(() => {
				(void 0).removeEventListener("pointermove", handlePointerMove);
				(void 0).removeEventListener("pointerup", handlePointerUp, { capture: true });
			});
		});
		function handleKeyDown(event) {
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			if (event.key === "Tab") event.preventDefault();
			if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
			if ([
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(event.key)) {
				let candidateNodes = [...getItems().map((i) => i.ref)];
				if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
				if (["ArrowUp", "ArrowDown"].includes(event.key)) {
					const currentElement = event.target;
					const currentIndex = candidateNodes.indexOf(currentElement);
					candidateNodes = candidateNodes.slice(currentIndex + 1);
				}
				setTimeout(() => focusFirst(candidateNodes));
				event.preventDefault();
			}
		}
		const forwardedProps = useForwardProps$1(computed(() => {
			if (props.position === "popper") return props;
			else return {};
		}).value);
		provideSelectContentContext({
			content,
			viewport,
			onViewportChange: (node) => {
				viewport.value = node;
			},
			itemRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
				if (rootContext.multiple.value) {
					if (firstSelectedItemInArrayFoundRef.value) return;
					if (isSelectedItem || isFirstValidItem) {
						selectedItem.value = node;
						if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
					}
				} else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
				if (isFirstValidItem) firstValidItemFoundRef.value = true;
			},
			selectedItem,
			selectedItemText,
			onItemLeave: () => {
				content.value?.focus();
			},
			itemTextRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				if (valueComparator(rootContext.modelValue.value, value, rootContext.by) || isFirstValidItem) selectedItemText.value = node;
			},
			focusSelectedItem,
			position: props.position,
			isPositioned,
			searchRef: search
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
						emits("closeAutoFocus", event);
						if (event.defaultPrevented) return;
						unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
						event.preventDefault();
					})
				}, {
					default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
						onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onOpenChange(false)),
						onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), mergeProps({
							..._ctx.$attrs,
							...unref(forwardedProps)
						}, {
							id: unref(rootContext).contentId,
							ref: (vnode) => {
								if (!vnode) return void 0;
								const el = unref(unrefElement)(vnode);
								if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
								else content.value = el;
							},
							role: "listbox",
							"data-state": unref(rootContext).open.value ? "open" : "closed",
							dir: unref(rootContext).dir.value,
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none"
							},
							onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"])),
							onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
							onKeydown: handleKeyDown
						}), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"data-state",
							"dir",
							"onKeydown"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectItemAlignedPosition.js
var [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = /*#__PURE__*/ createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemAlignedPosition",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection();
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const shouldExpandOnScrollRef = ref(false);
		const shouldRepositionRef = ref(true);
		const contentWrapperElement = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
		function position() {
			if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
				const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
				const contentRect = contentElement.value.getBoundingClientRect();
				const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
				const itemTextRect = selectedItemText.value.getBoundingClientRect();
				if (rootContext.dir.value !== "rtl") {
					const itemTextOffset = itemTextRect.left - contentRect.left;
					const left = valueNodeRect.left - itemTextOffset;
					const leftDelta = triggerRect.left - left;
					const minContentWidth = triggerRect.width + leftDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const rightEdge = (void 0).innerWidth - 10;
					const clampedLeft = clamp$1(left, 10, Math.max(10, rightEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.left = `${clampedLeft}px`;
				} else {
					const itemTextOffset = contentRect.right - itemTextRect.right;
					const right = (void 0).innerWidth - valueNodeRect.right - itemTextOffset;
					const rightDelta = (void 0).innerWidth - triggerRect.right - right;
					const minContentWidth = triggerRect.width + rightDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const leftEdge = (void 0).innerWidth - 10;
					const clampedRight = clamp$1(right, 10, Math.max(10, leftEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.right = `${clampedRight}px`;
				}
				const items = getItems().map((i) => i.ref);
				const availableHeight = (void 0).innerHeight - 20;
				const itemsHeight = viewport.value.scrollHeight;
				const contentStyles = (void 0).getComputedStyle(contentElement.value);
				const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
				const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
				const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
				const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
				const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
				const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
				const viewportStyles = (void 0).getComputedStyle(viewport.value);
				const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
				const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
				const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - 10;
				const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
				const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
				const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
				const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
				const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
				if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
					const isLastItem = selectedItem.value === items.at(-1);
					contentWrapperElement.value.style.bottom = `0px`;
					const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
					const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
					contentWrapperElement.value.style.height = `${height}px`;
				} else {
					const isFirstItem = selectedItem.value === items[0];
					contentWrapperElement.value.style.top = `0px`;
					const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
					contentWrapperElement.value.style.height = `${height}px`;
					viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
				}
				contentWrapperElement.value.style.margin = `10px 0`;
				contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
				contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
				emits("placed");
				requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
			}
		}
		const contentZIndex = ref("");
		function handleScrollButtonChange(node) {
			if (node && shouldRepositionRef.value === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.value = false;
			}
		}
		useResizeObserver(rootContext.triggerElement, () => {
			position();
		});
		provideSelectItemAlignedPositionContext({
			contentWrapper: contentWrapperElement,
			shouldExpandOnScrollRef,
			onScrollButtonChange: handleScrollButtonChange
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "contentWrapperElement",
				ref: contentWrapperElement,
				style: normalizeStyle({
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					zIndex: contentZIndex.value
				})
			}, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				style: {
					boxSizing: "border-box",
					maxHeight: "100%"
				}
			}, {
				..._ctx.$attrs,
				...props
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectArrow.js
var SelectArrow_default = /* @__PURE__ */ defineComponent({
	__name: "SelectArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return unref(contentContext).position === "popper" ? (openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(mergeProps({ key: 0 }, props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectProvider.js
var SelectProvider_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: true
	} },
	setup(__props) {
		provideSelectRootContext(__props.context);
		provideSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectContent.js
var _hoisted_1 = { key: 1 };
var SelectContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const forwarded = useForwardPropsEmits(props, __emit);
		const rootContext = injectSelectRootContext();
		const fragment = ref();
		const presenceRef = ref();
		const present = computed(() => props.forceMount || rootContext.open.value);
		const renderPresence = ref(present.value);
		let renderPresenceTimeout;
		function clearRenderPresenceTimeout() {
			if (renderPresenceTimeout) {
				clearTimeout(renderPresenceTimeout);
				renderPresenceTimeout = void 0;
			}
		}
		watch(present, (_value, _oldValue, onCleanup) => {
			clearRenderPresenceTimeout();
			renderPresenceTimeout = setTimeout(() => {
				renderPresence.value = present.value;
				renderPresenceTimeout = void 0;
			});
			onCleanup(clearRenderPresenceTimeout);
		});
		return (_ctx, _cache) => {
			return present.value || renderPresence.value || presenceRef.value?.present ? (openBlock(), createBlock(unref(Presence_default), {
				key: 0,
				ref_key: "presenceRef",
				ref: presenceRef,
				present: present.value
			}, {
				default: withCtx(() => [createVNode(SelectContentImpl_default, normalizeProps(guardReactiveProps({
					...unref(forwarded),
					..._ctx.$attrs
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"])) : fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(Teleport, { to: fragment.value }, [createVNode(SelectProvider_default, { context: unref(rootContext) }, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["context"])], 8, ["to"]))])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectGroup.js
var [injectSelectGroupContext, provideSelectGroupContext] = /*#__PURE__*/ createContext("SelectGroup");
var SelectGroup_default = /* @__PURE__ */ defineComponent({
	__name: "SelectGroup",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const id = useId$1(void 0, "reka-select-group");
		provideSelectGroupContext({ id });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectItem.js
var [injectSelectItemContext, provideSelectItemContext] = /*#__PURE__*/ createContext("SelectItem");
var SelectItem_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled } = toRefs(props);
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const { forwardRef} = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
		const isFocused = ref(false);
		const textValue = ref(props.textValue ?? "");
		const textId = useId$1(void 0, "reka-select-item-text");
		const SELECT_SELECT = "select.select";
		async function handleSelectCustomEvent(ev) {
			if (ev.defaultPrevented) return;
			const eventDetail = {
				originalEvent: ev,
				value: props.value
			};
			handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
		}
		async function handleSelect(ev) {
			await nextTick();
			emits("select", ev);
			if (ev.defaultPrevented) return;
			if (!disabled.value) {
				rootContext.onValueChange(props.value);
				if (!rootContext.multiple.value) rootContext.onOpenChange(false);
			}
		}
		async function handlePointerMove(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (disabled.value) contentContext.onItemLeave?.();
			else event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
		}
		async function handleKeyDown(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (contentContext.searchRef?.value !== "" && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
			if (event.key === " ") event.preventDefault();
		}
		if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		provideSelectItemContext({
			value: props.value,
			disabled,
			textId,
			isSelected,
			onItemTextChange: (node) => {
				textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: textValue.value } }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "option",
					"aria-labelledby": unref(textId),
					"data-highlighted": isFocused.value ? "" : void 0,
					"aria-selected": isSelected.value,
					"data-state": isSelected.value ? "checked" : "unchecked",
					"aria-disabled": unref(disabled) || void 0,
					"data-disabled": unref(disabled) ? "" : void 0,
					tabindex: unref(disabled) ? void 0 : -1,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
					onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
					onPointerup: handleSelectCustomEvent,
					onPointerdown: _cache[2] || (_cache[2] = (event) => {
						event.currentTarget.focus({ preventScroll: true });
					}),
					onTouchend: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent", "stop"])),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"aria-labelledby",
					"data-highlighted",
					"aria-selected",
					"data-state",
					"aria-disabled",
					"data-disabled",
					"tabindex",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectItemIndicator.js
var SelectItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectSelectItemContext();
		return (_ctx, _cache) => {
			return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectItemText.js
var SelectItemText_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		injectSelectRootContext();
		injectSelectContentContext();
		const itemContext = injectSelectItemContext();
		const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
		computed(() => {
			return {
				value: itemContext.value,
				disabled: itemContext.disabled.value,
				textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				id: unref(itemContext).textId,
				ref: unref(forwardRef)
			}, {
				...props,
				..._ctx.$attrs
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectLabel.js
var SelectLabel_default = /* @__PURE__ */ defineComponent({
	__name: "SelectLabel",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		const groupContext = injectSelectGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectPortal.js
var SelectPortal_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectSeparator.js
var SelectSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "SelectSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ "aria-hidden": "true" }, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectTrigger.js
var SelectTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const { forwardRef} = useForwardExpose();
		const isDisabled = computed(() => rootContext.disabled?.value || props.disabled);
		rootContext.contentId ||= useId$1(void 0, "reka-select-content");
		const { getItems } = useCollection();
		const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
		function handleOpen() {
			if (!isDisabled.value) {
				rootContext.onOpenChange(true);
				resetTypeahead();
			}
		}
		function handlePointerOpen(event) {
			handleOpen();
			rootContext.triggerPointerDownPosRef.value = {
				x: Math.round(event.pageX),
				y: Math.round(event.pageY)
			};
		}
		function isPlainLeftClick(event) {
			return event.button === 0 && event.ctrlKey === false;
		}
		let openedFromPointerDown = false;
		function onTriggerPointerDown(event) {
			if (event.pointerType === "touch") return event.preventDefault();
			const target = event.target;
			if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
			if (isPlainLeftClick(event)) {
				handlePointerOpen(event);
				openedFromPointerDown = true;
			}
		}
		function onTriggerMouseDown(event) {
			if (isPlainLeftClick(event)) event.preventDefault();
		}
		function onTriggerClick(event) {
			if (!openedFromPointerDown) event.currentTarget?.focus();
			openedFromPointerDown = false;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "combobox",
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-controls": unref(rootContext).contentId,
					"aria-expanded": unref(rootContext).open.value || false,
					"aria-required": unref(rootContext).required?.value,
					"aria-autocomplete": "none",
					disabled: isDisabled.value,
					dir: unref(rootContext)?.dir.value,
					"data-state": unref(rootContext)?.open.value ? "open" : "closed",
					"data-disabled": isDisabled.value ? "" : void 0,
					"data-placeholder": unref(shouldShowPlaceholder)(unref(rootContext).modelValue?.value) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					onClick: onTriggerClick,
					onPointerdown: onTriggerPointerDown,
					onMousedown: onTriggerMouseDown,
					onPointerup: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (event.pointerType === "touch") handlePointerOpen(event);
					}, ["prevent"])),
					onKeydown: _cache[1] || (_cache[1] = (event) => {
						const isTypingAhead = unref(search) !== "";
						if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) {
							if (isTypingAhead && event.key === " ") return;
						}
						unref(handleTypeaheadSearch)(event.key, unref(getItems)());
						if (unref(OPEN_KEYS).includes(event.key)) {
							handleOpen();
							event.preventDefault();
						}
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"type",
					"aria-controls",
					"aria-expanded",
					"aria-required",
					"disabled",
					"dir",
					"data-state",
					"data-disabled",
					"data-placeholder",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectValue.js
var SelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef} = useForwardExpose();
		const rootContext = injectSelectRootContext();
		const selectedLabel = computed(() => {
			let list = [];
			const options = Array.from(rootContext.optionsSet.value);
			const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
			if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
			else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
			return list.filter(Boolean);
		});
		const slotText = computed(() => {
			return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				style: { pointerEvents: "none" },
				"data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					selectedLabel: selectedLabel.value,
					modelValue: unref(rootContext).modelValue.value
				}, () => [createTextVNode(toDisplayString(slotText.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-placeholder"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Select/SelectViewport.js
var SelectViewport_default = /* @__PURE__ */ defineComponent({
	__name: "SelectViewport",
	props: {
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { nonce: propNonce } = toRefs(props);
		const nonce = useNonce(propNonce);
		const alignedPositionContext = injectSelectContentContext().position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef} = useForwardExpose();
		const prevScrollTopRef = ref(0);
		function handleScroll(event) {
			const viewport = event.currentTarget;
			const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
			if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
				const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
				if (scrolledBy > 0) {
					const availableHeight = (void 0).innerHeight - 20;
					const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
					const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
					const prevHeight = Math.max(cssMinHeight, cssHeight);
					if (prevHeight < availableHeight) {
						const nextHeight = prevHeight + scrolledBy;
						const clampedNextHeight = Math.min(availableHeight, nextHeight);
						const heightDiff = nextHeight - clampedNextHeight;
						contentWrapper.value.style.height = `${clampedNextHeight}px`;
						if (contentWrapper.value.style.bottom === "0px") {
							viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
							contentWrapper.value.style.justifyContent = "flex-end";
						}
					}
				}
			}
			prevScrollTopRef.value = viewport.scrollTop;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				"data-reka-select-viewport": "",
				role: "presentation"
			}, {
				..._ctx.$attrs,
				...props
			}, {
				style: {
					position: "relative",
					flex: 1,
					overflow: "hidden auto"
				},
				onScroll: handleScroll
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16), createVNode(unref(Primitive), {
				as: "style",
				nonce: unref(nonce)
			}, {
				default: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
				_: 1,
				__: [0]
			}, 8, ["nonce"])], 64);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fselect.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default = {
	"slots": {
		"base": ["relative group rounded-md inline-flex items-center disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute inset-y-0 start-0 flex items-center",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute inset-y-0 end-0 flex items-center",
		"trailingIcon": "shrink-0 text-dimmed",
		"value": "truncate pointer-events-none",
		"placeholder": "truncate text-dimmed",
		"arrow": "fill-bg stroke-default",
		"content": "max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
		"viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
		"group": "p-1 isolate",
		"empty": "text-center text-muted",
		"label": "font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": ["group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50", "transition-colors before:transition-colors"],
		"itemLeadingIcon": ["shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default", "transition-colors"],
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemLeadingChip": "shrink-0",
		"itemLeadingChipSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemWrapper": "flex-1 flex flex-col min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
			"vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-xs gap-1",
				"leading": "ps-2",
				"trailing": "pe-2",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1 text-[10px]/3 gap-1",
				"item": "p-1 text-xs gap-1",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2 text-xs"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-xs gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1.5 text-[10px]/3 gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2.5 text-xs"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-sm gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-2.5 text-sm"
			},
			"lg": {
				"base": "px-3 py-2 text-sm gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-2 text-xs gap-2",
				"item": "p-2 text-sm gap-2",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-3 text-sm"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6",
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-base gap-2",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemLeadingChip": "size-6",
				"itemLeadingChipSize": "lg",
				"itemTrailingIcon": "size-6",
				"empty": "p-3 text-base"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" },
		"position": {
			"popper": { "content": "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]" },
			"item-aligned": { "content": "" }
		},
		"multiple": { "true": "" }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
		},
		{
			"color": "primary",
			"variant": ["soft", "ghost"],
			"class": "outline-primary/25 focus-visible:outline-3"
		},
		{
			"color": "secondary",
			"variant": ["soft", "ghost"],
			"class": "outline-secondary/25 focus-visible:outline-3"
		},
		{
			"color": "success",
			"variant": ["soft", "ghost"],
			"class": "outline-success/25 focus-visible:outline-3"
		},
		{
			"color": "info",
			"variant": ["soft", "ghost"],
			"class": "outline-info/25 focus-visible:outline-3"
		},
		{
			"color": "warning",
			"variant": ["soft", "ghost"],
			"class": "outline-warning/25 focus-visible:outline-3"
		},
		{
			"color": "error",
			"variant": ["soft", "ghost"],
			"class": "outline-error/25 focus-visible:outline-3"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"variant": ["soft", "ghost"],
			"class": "outline-inverted/25 focus-visible:outline-3"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline",
		"position": "popper"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Select.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "USelect",
	__ssrInlineRender: true,
	props: {
		id: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		selectedIcon: {
			type: null,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		valueKey: {
			type: null,
			required: false,
			default: "value"
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		descriptionKey: {
			type: null,
			required: false,
			default: "description"
		},
		items: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		nullableValue: {
			type: String,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	},
	emits: [
		"change",
		"blur",
		"focus",
		"update:modelValue",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("select", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple", "nullableValue"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const position = computed(() => props.content?.position ?? appConfig.ui?.select?.defaultVariants?.position ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default.defaultVariants?.position);
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8,
			position: position.value
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props);
		const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
		const selectSize = computed(() => fieldGroupSize.value || formFieldSize.value);
		const isItemAligned = computed(() => position.value === "item-aligned");
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default,
			...appConfig.ui?.select || {}
		})({
			color: color.value ?? props.color,
			variant: props.variant,
			size: selectSize.value ?? props.size,
			loading: props.loading,
			highlight: highlight.value ?? props.highlight,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing,
			fieldGroup: orientation.value,
			position: position.value,
			multiple: props.multiple
		}));
		const groups = computed(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		const items = computed(() => groups.value.flatMap((group) => group));
		function displayValue(value) {
			if (props.multiple && Array.isArray(value)) {
				const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
					labelKey: props.labelKey,
					valueKey: props.valueKey
				})).filter((v) => v != null && v !== "");
				return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
			}
			return getDisplayValue(items.value, value, {
				labelKey: props.labelKey,
				valueKey: props.valueKey
			});
		}
		const triggerRef = useTemplateRef("triggerRef");
		function onUpdate(value) {
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number) value = looseToNumber(value);
			if (props.modelModifiers?.nullable) value ??= null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) value ??= void 0;
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		function onUpdateOpen(value) {
			if (!value) {
				const event = new FocusEvent("blur");
				emits("blur", event);
				emitFormBlur();
			} else {
				const event = new FocusEvent("focus");
				emits("focus", event);
				emitFormFocus();
			}
		}
		function isSelectItem(item) {
			return typeof item === "object" && item !== null;
		}
		function onTriggerClick(open) {
			if (!open) triggerRef.value?.$el?.dispatchEvent(new PointerEvent("pointerdown", {
				bubbles: true,
				button: 0
			}));
		}
		const viewportRef = useTemplateRef("viewportRef");
		__expose({
			triggerRef: toRef(() => triggerRef.value?.$el),
			viewportRef: toRef(() => {
				const instance = viewportRef.value;
				return instance && typeof instance === "object" && "$el" in instance ? instance.$el : instance;
			})
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(SelectRoot_default), mergeProps({ name: unref(name) }, unref(rootProps), {
				autocomplete: unref(props).autocomplete,
				disabled: unref(disabled),
				"default-value": unref(props).defaultValue,
				"model-value": __props.modelValue,
				"onUpdate:modelValue": onUpdate,
				"onUpdate:open": onUpdateOpen
			}, _attrs), {
				default: withCtx(({ modelValue, open }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(SelectTrigger_default), mergeProps({
							id: unref(id),
							ref_key: "triggerRef",
							ref: triggerRef,
							"data-slot": "base",
							class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] })
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, { onClick: ($event) => onTriggerClick(open) }), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
										_push(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
										ssrRenderSlot(_ctx.$slots, "leading", {
											modelValue,
											open,
											ui: ui.value
										}, () => {
											if (unref(isLeading) && unref(leadingIconName)) _push(ssrRenderComponent(_sfc_main$2$1, {
												name: unref(leadingIconName),
												"data-slot": "leadingIcon",
												class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
											}, null, _parent, _scopeId));
											else if (!!unref(props).avatar) _push(ssrRenderComponent(_sfc_main$8, mergeProps({ size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, unref(props).avatar, {
												"data-slot": "itemLeadingAvatar",
												class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
											}), null, _parent, _scopeId));
											else _push(`<!---->`);
										}, _push, _parent, _scopeId);
										_push(`</span>`);
									} else _push(`<!---->`);
									_push(`<!--[-->`);
									ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
										_push(ssrRenderComponent(unref(SelectValue_default), {
											"data-slot": displayedModelValue != null ? "value" : "placeholder",
											class: displayedModelValue != null ? ui.value.value({ class: unref(props).ui?.value }) : ui.value.placeholder({ class: unref(props).ui?.placeholder })
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) ssrRenderSlot(_ctx.$slots, "default", {
													modelValue,
													open,
													ui: ui.value
												}, () => {
													_push(`${ssrInterpolate(displayedModelValue ?? unref(props).placeholder ?? "\xA0")}`);
												}, _push, _parent, _scopeId);
												else return [renderSlot(_ctx.$slots, "default", {
													modelValue,
													open,
													ui: ui.value
												}, () => [createTextVNode(toDisplayString(displayedModelValue ?? unref(props).placeholder ?? "\xA0"), 1)])];
											}),
											_: 2
										}, _parent, _scopeId));
									});
									_push(`<!--]-->`);
									if (unref(isTrailing) || !!slots.trailing) {
										_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
										ssrRenderSlot(_ctx.$slots, "trailing", {
											modelValue,
											open,
											ui: ui.value
										}, () => {
											if (unref(trailingIconName)) _push(ssrRenderComponent(_sfc_main$2$1, {
												name: unref(trailingIconName),
												"data-slot": "trailingIcon",
												class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
											}, null, _parent, _scopeId));
											else _push(`<!---->`);
										}, _push, _parent, _scopeId);
										_push(`</span>`);
									} else _push(`<!---->`);
								} else return [
									unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
										key: 0,
										"data-slot": "leading",
										class: ui.value.leading({ class: unref(props).ui?.leading })
									}, [renderSlot(_ctx.$slots, "leading", {
										modelValue,
										open,
										ui: ui.value
									}, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
										key: 0,
										name: unref(leadingIconName),
										"data-slot": "leadingIcon",
										class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
									}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
										key: 1,
										size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
									}, unref(props).avatar, {
										"data-slot": "itemLeadingAvatar",
										class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
									}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
									(openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
										return openBlock(), createBlock(unref(SelectValue_default), {
											key: displayedModelValue,
											"data-slot": displayedModelValue != null ? "value" : "placeholder",
											class: displayedModelValue != null ? ui.value.value({ class: unref(props).ui?.value }) : ui.value.placeholder({ class: unref(props).ui?.placeholder })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
												modelValue,
												open,
												ui: ui.value
											}, () => [createTextVNode(toDisplayString(displayedModelValue ?? unref(props).placeholder ?? "\xA0"), 1)])]),
											_: 2
										}, 1032, ["data-slot", "class"]);
									}), 128)),
									unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
										key: 1,
										"data-slot": "trailing",
										class: ui.value.trailing({ class: unref(props).ui?.trailing })
									}, [renderSlot(_ctx.$slots, "trailing", {
										modelValue,
										open,
										ui: ui.value
									}, () => [unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
										key: 0,
										name: unref(trailingIconName),
										"data-slot": "trailingIcon",
										class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
									}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
								];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(SelectPortal_default), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(SelectContent_default), mergeProps({
											"data-slot": "content",
											class: ui.value.content({ class: unref(props).ui?.content })
										}, contentProps.value), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent, _scopeId);
													ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
														ref_key: "viewportRef",
														ref: viewportRef,
														role: "presentation",
														"data-slot": "viewport",
														class: ui.value.viewport({ class: unref(props).ui?.viewport })
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(`<!--[-->`);
																ssrRenderList(groups.value, (group, groupIndex) => {
																	_push(ssrRenderComponent(unref(SelectGroup_default), {
																		key: `group-${groupIndex}`,
																		"data-slot": "group",
																		class: ui.value.group({ class: unref(props).ui?.group })
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) {
																				_push(`<!--[-->`);
																				ssrRenderList(group, (item, index) => {
																					_push(`<!--[-->`);
																					if (isSelectItem(item) && item.type === "label") _push(ssrRenderComponent(unref(SelectLabel_default), {
																						"data-slot": "label",
																						class: ui.value.label({ class: [
																							unref(props).ui?.label,
																							item.ui?.label,
																							item.class
																						] })
																					}, {
																						default: withCtx((_, _push, _parent, _scopeId) => {
																							if (_push) _push(`${ssrInterpolate(unref(get)(item, unref(props).labelKey))}`);
																							else return [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)];
																						}),
																						_: 2
																					}, _parent, _scopeId));
																					else if (isSelectItem(item) && item.type === "separator") _push(ssrRenderComponent(unref(SelectSeparator_default), {
																						"data-slot": "separator",
																						class: ui.value.separator({ class: [
																							unref(props).ui?.separator,
																							item.ui?.separator,
																							item.class
																						] })
																					}, null, _parent, _scopeId));
																					else _push(ssrRenderComponent(unref(SelectItem_default), {
																						"data-slot": "item",
																						class: ui.value.item({ class: [
																							unref(props).ui?.item,
																							isSelectItem(item) && item.ui?.item,
																							isSelectItem(item) && item.class
																						] }),
																						disabled: isSelectItem(item) && item.disabled,
																						value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																						onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																					}, {
																						default: withCtx((_, _push, _parent, _scopeId) => {
																							if (_push) ssrRenderSlot(_ctx.$slots, "item", {
																								item,
																								index,
																								ui: ui.value
																							}, () => {
																								ssrRenderSlot(_ctx.$slots, "item-leading", {
																									item,
																									index,
																									ui: ui.value
																								}, () => {
																									if (isSelectItem(item) && item.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
																										name: item.icon,
																										"data-slot": "itemLeadingIcon",
																										class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																									}, null, _parent, _scopeId));
																									else if (isSelectItem(item) && item.avatar) _push(ssrRenderComponent(_sfc_main$8, mergeProps({ size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, { ref_for: true }, item.avatar, {
																										"data-slot": "itemLeadingAvatar",
																										class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																									}), null, _parent, _scopeId));
																									else if (isSelectItem(item) && item.chip) _push(ssrRenderComponent(_sfc_main$1$2, mergeProps({
																										size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																										inset: "",
																										standalone: ""
																									}, { ref_for: true }, item.chip, {
																										"data-slot": "itemLeadingChip",
																										class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																									}), null, _parent, _scopeId));
																									else _push(`<!---->`);
																								}, _push, _parent, _scopeId);
																								_push(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId}>`);
																								_push(ssrRenderComponent(unref(SelectItemText_default), {
																									"data-slot": "itemLabel",
																									class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																								}, {
																									default: withCtx((_, _push, _parent, _scopeId) => {
																										if (_push) ssrRenderSlot(_ctx.$slots, "item-label", {
																											item,
																											index
																										}, () => {
																											_push(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item)}`);
																										}, _push, _parent, _scopeId);
																										else return [renderSlot(_ctx.$slots, "item-label", {
																											item,
																											index
																										}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])];
																									}),
																									_: 2
																								}, _parent, _scopeId));
																								if (isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"])) {
																									_push(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId}>`);
																									ssrRenderSlot(_ctx.$slots, "item-description", {
																										item,
																										index
																									}, () => {
																										_push(`${ssrInterpolate(unref(get)(item, unref(props).descriptionKey))}`);
																									}, _push, _parent, _scopeId);
																									_push(`</span>`);
																								} else _push(`<!---->`);
																								_push(`</span><span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId}>`);
																								ssrRenderSlot(_ctx.$slots, "item-trailing", {
																									item,
																									index,
																									ui: ui.value
																								}, null, _push, _parent, _scopeId);
																								_push(ssrRenderComponent(unref(SelectItemIndicator_default), { "as-child": "" }, {
																									default: withCtx((_, _push, _parent, _scopeId) => {
																										if (_push) _push(ssrRenderComponent(_sfc_main$2$1, {
																											name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																											"data-slot": "itemTrailingIcon",
																											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																										}, null, _parent, _scopeId));
																										else return [createVNode(_sfc_main$2$1, {
																											name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																											"data-slot": "itemTrailingIcon",
																											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																										}, null, 8, ["name", "class"])];
																									}),
																									_: 2
																								}, _parent, _scopeId));
																								_push(`</span>`);
																							}, _push, _parent, _scopeId);
																							else return [renderSlot(_ctx.$slots, "item", {
																								item,
																								index,
																								ui: ui.value
																							}, () => [
																								renderSlot(_ctx.$slots, "item-leading", {
																									item,
																									index,
																									ui: ui.value
																								}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																									key: 0,
																									name: item.icon,
																									"data-slot": "itemLeadingIcon",
																									class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																								}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																									key: 1,
																									size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																								}, { ref_for: true }, item.avatar, {
																									"data-slot": "itemLeadingAvatar",
																									class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																								}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																									key: 2,
																									size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																									inset: "",
																									standalone: ""
																								}, { ref_for: true }, item.chip, {
																									"data-slot": "itemLeadingChip",
																									class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																								}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																								createVNode("span", {
																									"data-slot": "itemWrapper",
																									class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																								}, [createVNode(unref(SelectItemText_default), {
																									"data-slot": "itemLabel",
																									class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																								}, {
																									default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																										item,
																										index
																									}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																									_: 2
																								}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																									key: 0,
																									"data-slot": "itemDescription",
																									class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																								}, [renderSlot(_ctx.$slots, "item-description", {
																									item,
																									index
																								}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																								createVNode("span", {
																									"data-slot": "itemTrailing",
																									class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																								}, [renderSlot(_ctx.$slots, "item-trailing", {
																									item,
																									index,
																									ui: ui.value
																								}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																									default: withCtx(() => [createVNode(_sfc_main$2$1, {
																										name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																										"data-slot": "itemTrailingIcon",
																										class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																									}, null, 8, ["name", "class"])]),
																									_: 2
																								}, 1024)], 2)
																							])];
																						}),
																						_: 2
																					}, _parent, _scopeId));
																					_push(`<!--]-->`);
																				});
																				_push(`<!--]-->`);
																			} else return [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																				return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
																					key: 0,
																					"data-slot": "label",
																					class: ui.value.label({ class: [
																						unref(props).ui?.label,
																						item.ui?.label,
																						item.class
																					] })
																				}, {
																					default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
																					_: 2
																				}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
																					key: 1,
																					"data-slot": "separator",
																					class: ui.value.separator({ class: [
																						unref(props).ui?.separator,
																						item.ui?.separator,
																						item.class
																					] })
																				}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
																					key: 2,
																					"data-slot": "item",
																					class: ui.value.item({ class: [
																						unref(props).ui?.item,
																						isSelectItem(item) && item.ui?.item,
																						isSelectItem(item) && item.class
																					] }),
																					disabled: isSelectItem(item) && item.disabled,
																					value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																					onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																				}, {
																					default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
																						item,
																						index,
																						ui: ui.value
																					}, () => [
																						renderSlot(_ctx.$slots, "item-leading", {
																							item,
																							index,
																							ui: ui.value
																						}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																							key: 0,
																							name: item.icon,
																							"data-slot": "itemLeadingIcon",
																							class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																						}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																							key: 1,
																							size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																						}, { ref_for: true }, item.avatar, {
																							"data-slot": "itemLeadingAvatar",
																							class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																						}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																							key: 2,
																							size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																							inset: "",
																							standalone: ""
																						}, { ref_for: true }, item.chip, {
																							"data-slot": "itemLeadingChip",
																							class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																						}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																						createVNode("span", {
																							"data-slot": "itemWrapper",
																							class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																						}, [createVNode(unref(SelectItemText_default), {
																							"data-slot": "itemLabel",
																							class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																						}, {
																							default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																								item,
																								index
																							}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																							_: 2
																						}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																							key: 0,
																							"data-slot": "itemDescription",
																							class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																						}, [renderSlot(_ctx.$slots, "item-description", {
																							item,
																							index
																						}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																						createVNode("span", {
																							"data-slot": "itemTrailing",
																							class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																						}, [renderSlot(_ctx.$slots, "item-trailing", {
																							item,
																							index,
																							ui: ui.value
																						}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																							default: withCtx(() => [createVNode(_sfc_main$2$1, {
																								name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																								"data-slot": "itemTrailingIcon",
																								class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																							}, null, 8, ["name", "class"])]),
																							_: 2
																						}, 1024)], 2)
																					])]),
																					_: 2
																				}, 1032, [
																					"class",
																					"disabled",
																					"value",
																					"onSelect"
																				]))], 64);
																			}), 128))];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																});
																_push(`<!--]-->`);
															} else return [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
																return openBlock(), createBlock(unref(SelectGroup_default), {
																	key: `group-${groupIndex}`,
																	"data-slot": "group",
																	class: ui.value.group({ class: unref(props).ui?.group })
																}, {
																	default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																		return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
																			key: 0,
																			"data-slot": "label",
																			class: ui.value.label({ class: [
																				unref(props).ui?.label,
																				item.ui?.label,
																				item.class
																			] })
																		}, {
																			default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
																			_: 2
																		}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
																			key: 1,
																			"data-slot": "separator",
																			class: ui.value.separator({ class: [
																				unref(props).ui?.separator,
																				item.ui?.separator,
																				item.class
																			] })
																		}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
																			key: 2,
																			"data-slot": "item",
																			class: ui.value.item({ class: [
																				unref(props).ui?.item,
																				isSelectItem(item) && item.ui?.item,
																				isSelectItem(item) && item.class
																			] }),
																			disabled: isSelectItem(item) && item.disabled,
																			value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																			onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																		}, {
																			default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
																				item,
																				index,
																				ui: ui.value
																			}, () => [
																				renderSlot(_ctx.$slots, "item-leading", {
																					item,
																					index,
																					ui: ui.value
																				}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																					key: 0,
																					name: item.icon,
																					"data-slot": "itemLeadingIcon",
																					class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																				}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																					key: 1,
																					size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																				}, { ref_for: true }, item.avatar, {
																					"data-slot": "itemLeadingAvatar",
																					class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																				}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																					key: 2,
																					size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																					inset: "",
																					standalone: ""
																				}, { ref_for: true }, item.chip, {
																					"data-slot": "itemLeadingChip",
																					class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																				}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																				createVNode("span", {
																					"data-slot": "itemWrapper",
																					class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																				}, [createVNode(unref(SelectItemText_default), {
																					"data-slot": "itemLabel",
																					class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																				}, {
																					default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																						item,
																						index
																					}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																					_: 2
																				}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																					key: 0,
																					"data-slot": "itemDescription",
																					class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																				}, [renderSlot(_ctx.$slots, "item-description", {
																					item,
																					index
																				}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																				createVNode("span", {
																					"data-slot": "itemTrailing",
																					class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																				}, [renderSlot(_ctx.$slots, "item-trailing", {
																					item,
																					index,
																					ui: ui.value
																				}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																					default: withCtx(() => [createVNode(_sfc_main$2$1, {
																						name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																						"data-slot": "itemTrailingIcon",
																						class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																					}, null, 8, ["name", "class"])]),
																					_: 2
																				}, 1024)], 2)
																			])]),
																			_: 2
																		}, 1032, [
																			"class",
																			"disabled",
																			"value",
																			"onSelect"
																		]))], 64);
																	}), 128))]),
																	_: 2
																}, 1032, ["class"]);
															}), 128))];
														}),
														_: 2
													}), _parent, _scopeId);
													ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent, _scopeId);
													if (!!unref(props).arrow) _push(ssrRenderComponent(unref(SelectArrow_default), mergeProps(arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: unref(props).ui?.arrow })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												} else return [
													renderSlot(_ctx.$slots, "content-top"),
													(openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
														ref_key: "viewportRef",
														ref: viewportRef,
														role: "presentation",
														"data-slot": "viewport",
														class: ui.value.viewport({ class: unref(props).ui?.viewport })
													}, {
														default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
															return openBlock(), createBlock(unref(SelectGroup_default), {
																key: `group-${groupIndex}`,
																"data-slot": "group",
																class: ui.value.group({ class: unref(props).ui?.group })
															}, {
																default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																	return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
																		key: 0,
																		"data-slot": "label",
																		class: ui.value.label({ class: [
																			unref(props).ui?.label,
																			item.ui?.label,
																			item.class
																		] })
																	}, {
																		default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
																		_: 2
																	}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
																		key: 1,
																		"data-slot": "separator",
																		class: ui.value.separator({ class: [
																			unref(props).ui?.separator,
																			item.ui?.separator,
																			item.class
																		] })
																	}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
																		key: 2,
																		"data-slot": "item",
																		class: ui.value.item({ class: [
																			unref(props).ui?.item,
																			isSelectItem(item) && item.ui?.item,
																			isSelectItem(item) && item.class
																		] }),
																		disabled: isSelectItem(item) && item.disabled,
																		value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																		onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																	}, {
																		default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
																			item,
																			index,
																			ui: ui.value
																		}, () => [
																			renderSlot(_ctx.$slots, "item-leading", {
																				item,
																				index,
																				ui: ui.value
																			}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																				key: 0,
																				name: item.icon,
																				"data-slot": "itemLeadingIcon",
																				class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																			}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																				key: 1,
																				size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																			}, { ref_for: true }, item.avatar, {
																				"data-slot": "itemLeadingAvatar",
																				class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																			}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																				key: 2,
																				size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																				inset: "",
																				standalone: ""
																			}, { ref_for: true }, item.chip, {
																				"data-slot": "itemLeadingChip",
																				class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																			}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																			createVNode("span", {
																				"data-slot": "itemWrapper",
																				class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																			}, [createVNode(unref(SelectItemText_default), {
																				"data-slot": "itemLabel",
																				class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																			}, {
																				default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																					item,
																					index
																				}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																				_: 2
																			}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																				key: 0,
																				"data-slot": "itemDescription",
																				class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																			}, [renderSlot(_ctx.$slots, "item-description", {
																				item,
																				index
																			}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																			createVNode("span", {
																				"data-slot": "itemTrailing",
																				class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																			}, [renderSlot(_ctx.$slots, "item-trailing", {
																				item,
																				index,
																				ui: ui.value
																			}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																				default: withCtx(() => [createVNode(_sfc_main$2$1, {
																					name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																					"data-slot": "itemTrailingIcon",
																					class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																				}, null, 8, ["name", "class"])]),
																				_: 2
																			}, 1024)], 2)
																		])]),
																		_: 2
																	}, 1032, [
																		"class",
																		"disabled",
																		"value",
																		"onSelect"
																	]))], 64);
																}), 128))]),
																_: 2
															}, 1032, ["class"]);
														}), 128))]),
														_: 3
													}, 8, ["class"])),
													renderSlot(_ctx.$slots, "content-bottom"),
													!!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: unref(props).ui?.arrow })
													}), null, 16, ["class"])) : createCommentVNode("", true)
												];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(SelectContent_default), mergeProps({
											"data-slot": "content",
											class: ui.value.content({ class: unref(props).ui?.content })
										}, contentProps.value), {
											default: withCtx(() => [
												renderSlot(_ctx.$slots, "content-top"),
												(openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
													ref_key: "viewportRef",
													ref: viewportRef,
													role: "presentation",
													"data-slot": "viewport",
													class: ui.value.viewport({ class: unref(props).ui?.viewport })
												}, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
														return openBlock(), createBlock(unref(SelectGroup_default), {
															key: `group-${groupIndex}`,
															"data-slot": "group",
															class: ui.value.group({ class: unref(props).ui?.group })
														}, {
															default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
																	key: 0,
																	"data-slot": "label",
																	class: ui.value.label({ class: [
																		unref(props).ui?.label,
																		item.ui?.label,
																		item.class
																	] })
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
																	_: 2
																}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
																	key: 1,
																	"data-slot": "separator",
																	class: ui.value.separator({ class: [
																		unref(props).ui?.separator,
																		item.ui?.separator,
																		item.class
																	] })
																}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
																	key: 2,
																	"data-slot": "item",
																	class: ui.value.item({ class: [
																		unref(props).ui?.item,
																		isSelectItem(item) && item.ui?.item,
																		isSelectItem(item) && item.class
																	] }),
																	disabled: isSelectItem(item) && item.disabled,
																	value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																	onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																}, {
																	default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
																		item,
																		index,
																		ui: ui.value
																	}, () => [
																		renderSlot(_ctx.$slots, "item-leading", {
																			item,
																			index,
																			ui: ui.value
																		}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																			key: 0,
																			name: item.icon,
																			"data-slot": "itemLeadingIcon",
																			class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																		}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																			key: 1,
																			size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																		}, { ref_for: true }, item.avatar, {
																			"data-slot": "itemLeadingAvatar",
																			class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																		}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																			key: 2,
																			size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																			inset: "",
																			standalone: ""
																		}, { ref_for: true }, item.chip, {
																			"data-slot": "itemLeadingChip",
																			class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																		}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																		createVNode("span", {
																			"data-slot": "itemWrapper",
																			class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																		}, [createVNode(unref(SelectItemText_default), {
																			"data-slot": "itemLabel",
																			class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																		}, {
																			default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																				item,
																				index
																			}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																			_: 2
																		}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																			key: 0,
																			"data-slot": "itemDescription",
																			class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																		}, [renderSlot(_ctx.$slots, "item-description", {
																			item,
																			index
																		}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																		createVNode("span", {
																			"data-slot": "itemTrailing",
																			class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																		}, [renderSlot(_ctx.$slots, "item-trailing", {
																			item,
																			index,
																			ui: ui.value
																		}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																			default: withCtx(() => [createVNode(_sfc_main$2$1, {
																				name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																				"data-slot": "itemTrailingIcon",
																				class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																			}, null, 8, ["name", "class"])]),
																			_: 2
																		}, 1024)], 2)
																	])]),
																	_: 2
																}, 1032, [
																	"class",
																	"disabled",
																	"value",
																	"onSelect"
																]))], 64);
															}), 128))]),
															_: 2
														}, 1032, ["class"]);
													}), 128))]),
													_: 3
												}, 8, ["class"])),
												renderSlot(_ctx.$slots, "content-bottom"),
												!!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
													"data-slot": "arrow",
													class: ui.value.arrow({ class: unref(props).ui?.arrow })
												}), null, 16, ["class"])) : createCommentVNode("", true)
											]),
											_: 3
										}, 16, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [createVNode(unref(SelectContent_default), mergeProps({
										"data-slot": "content",
										class: ui.value.content({ class: unref(props).ui?.content })
									}, contentProps.value), {
										default: withCtx(() => [
											renderSlot(_ctx.$slots, "content-top"),
											(openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
												ref_key: "viewportRef",
												ref: viewportRef,
												role: "presentation",
												"data-slot": "viewport",
												class: ui.value.viewport({ class: unref(props).ui?.viewport })
											}, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
													return openBlock(), createBlock(unref(SelectGroup_default), {
														key: `group-${groupIndex}`,
														"data-slot": "group",
														class: ui.value.group({ class: unref(props).ui?.group })
													}, {
														default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
															return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
																key: 0,
																"data-slot": "label",
																class: ui.value.label({ class: [
																	unref(props).ui?.label,
																	item.ui?.label,
																	item.class
																] })
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
																_: 2
															}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
																key: 1,
																"data-slot": "separator",
																class: ui.value.separator({ class: [
																	unref(props).ui?.separator,
																	item.ui?.separator,
																	item.class
																] })
															}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
																key: 2,
																"data-slot": "item",
																class: ui.value.item({ class: [
																	unref(props).ui?.item,
																	isSelectItem(item) && item.ui?.item,
																	isSelectItem(item) && item.class
																] }),
																disabled: isSelectItem(item) && item.disabled,
																value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
																onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
																	item,
																	index,
																	ui: ui.value
																}, () => [
																	renderSlot(_ctx.$slots, "item-leading", {
																		item,
																		index,
																		ui: ui.value
																	}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																		key: 0,
																		name: item.icon,
																		"data-slot": "itemLeadingIcon",
																		class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																	}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																		key: 1,
																		size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																	}, { ref_for: true }, item.avatar, {
																		"data-slot": "itemLeadingAvatar",
																		class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																	}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																		key: 2,
																		size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																		inset: "",
																		standalone: ""
																	}, { ref_for: true }, item.chip, {
																		"data-slot": "itemLeadingChip",
																		class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																	}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
																	createVNode("span", {
																		"data-slot": "itemWrapper",
																		class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																	}, [createVNode(unref(SelectItemText_default), {
																		"data-slot": "itemLabel",
																		class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																	}, {
																		default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																			item,
																			index
																		}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																		_: 2
																	}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																		key: 0,
																		"data-slot": "itemDescription",
																		class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																	}, [renderSlot(_ctx.$slots, "item-description", {
																		item,
																		index
																	}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
																	createVNode("span", {
																		"data-slot": "itemTrailing",
																		class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																	}, [renderSlot(_ctx.$slots, "item-trailing", {
																		item,
																		index,
																		ui: ui.value
																	}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																		default: withCtx(() => [createVNode(_sfc_main$2$1, {
																			name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																			"data-slot": "itemTrailingIcon",
																			class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																		}, null, 8, ["name", "class"])]),
																		_: 2
																	}, 1024)], 2)
																])]),
																_: 2
															}, 1032, [
																"class",
																"disabled",
																"value",
																"onSelect"
															]))], 64);
														}), 128))]),
														_: 2
													}, 1032, ["class"]);
												}), 128))]),
												_: 3
											}, 8, ["class"])),
											renderSlot(_ctx.$slots, "content-bottom"),
											!!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(props).ui?.arrow })
											}), null, 16, ["class"])) : createCommentVNode("", true)
										]),
										_: 3
									}, 16, ["class"])]),
									_: 3
								})];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [createVNode(unref(SelectTrigger_default), mergeProps({
						id: unref(id),
						ref_key: "triggerRef",
						ref: triggerRef,
						"data-slot": "base",
						class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] })
					}, {
						..._ctx.$attrs,
						...unref(ariaAttrs)
					}, { onClick: ($event) => onTriggerClick(open) }), {
						default: withCtx(() => [
							unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
								key: 0,
								"data-slot": "leading",
								class: ui.value.leading({ class: unref(props).ui?.leading })
							}, [renderSlot(_ctx.$slots, "leading", {
								modelValue,
								open,
								ui: ui.value
							}, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 0,
								name: unref(leadingIconName),
								"data-slot": "leadingIcon",
								class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
							}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
								key: 1,
								size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
							}, unref(props).avatar, {
								"data-slot": "itemLeadingAvatar",
								class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
							}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
							(openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
								return openBlock(), createBlock(unref(SelectValue_default), {
									key: displayedModelValue,
									"data-slot": displayedModelValue != null ? "value" : "placeholder",
									class: displayedModelValue != null ? ui.value.value({ class: unref(props).ui?.value }) : ui.value.placeholder({ class: unref(props).ui?.placeholder })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
										modelValue,
										open,
										ui: ui.value
									}, () => [createTextVNode(toDisplayString(displayedModelValue ?? unref(props).placeholder ?? "\xA0"), 1)])]),
									_: 2
								}, 1032, ["data-slot", "class"]);
							}), 128)),
							unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
								key: 1,
								"data-slot": "trailing",
								class: ui.value.trailing({ class: unref(props).ui?.trailing })
							}, [renderSlot(_ctx.$slots, "trailing", {
								modelValue,
								open,
								ui: ui.value
							}, () => [unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 0,
								name: unref(trailingIconName),
								"data-slot": "trailingIcon",
								class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
							}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
						]),
						_: 2
					}, 1040, [
						"id",
						"class",
						"onClick"
					]), createVNode(unref(SelectPortal_default), unref(portalProps), {
						default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
							default: withCtx(() => [createVNode(unref(SelectContent_default), mergeProps({
								"data-slot": "content",
								class: ui.value.content({ class: unref(props).ui?.content })
							}, contentProps.value), {
								default: withCtx(() => [
									renderSlot(_ctx.$slots, "content-top"),
									(openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
										ref_key: "viewportRef",
										ref: viewportRef,
										role: "presentation",
										"data-slot": "viewport",
										class: ui.value.viewport({ class: unref(props).ui?.viewport })
									}, {
										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
											return openBlock(), createBlock(unref(SelectGroup_default), {
												key: `group-${groupIndex}`,
												"data-slot": "group",
												class: ui.value.group({ class: unref(props).ui?.group })
											}, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
													return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
														key: 0,
														"data-slot": "label",
														class: ui.value.label({ class: [
															unref(props).ui?.label,
															item.ui?.label,
															item.class
														] })
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
														_: 2
													}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
														key: 1,
														"data-slot": "separator",
														class: ui.value.separator({ class: [
															unref(props).ui?.separator,
															item.ui?.separator,
															item.class
														] })
													}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
														key: 2,
														"data-slot": "item",
														class: ui.value.item({ class: [
															unref(props).ui?.item,
															isSelectItem(item) && item.ui?.item,
															isSelectItem(item) && item.class
														] }),
														disabled: isSelectItem(item) && item.disabled,
														value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
														onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
															item,
															index,
															ui: ui.value
														}, () => [
															renderSlot(_ctx.$slots, "item-leading", {
																item,
																index,
																ui: ui.value
															}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																key: 0,
																name: item.icon,
																"data-slot": "itemLeadingIcon",
																class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
															}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
																key: 1,
																size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
															}, { ref_for: true }, item.avatar, {
																"data-slot": "itemLeadingAvatar",
																class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
															}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
																key: 2,
																size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																inset: "",
																standalone: ""
															}, { ref_for: true }, item.chip, {
																"data-slot": "itemLeadingChip",
																class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
															}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
															createVNode("span", {
																"data-slot": "itemWrapper",
																class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
															}, [createVNode(unref(SelectItemText_default), {
																"data-slot": "itemLabel",
																class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "item-label", {
																	item,
																	index
																}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])]),
																_: 2
															}, 1032, ["class"]), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
																key: 0,
																"data-slot": "itemDescription",
																class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
															}, [renderSlot(_ctx.$slots, "item-description", {
																item,
																index
															}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
															createVNode("span", {
																"data-slot": "itemTrailing",
																class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
															}, [renderSlot(_ctx.$slots, "item-trailing", {
																item,
																index,
																ui: ui.value
															}), createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
																default: withCtx(() => [createVNode(_sfc_main$2$1, {
																	name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
																	"data-slot": "itemTrailingIcon",
																	class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																}, null, 8, ["name", "class"])]),
																_: 2
															}, 1024)], 2)
														])]),
														_: 2
													}, 1032, [
														"class",
														"disabled",
														"value",
														"onSelect"
													]))], 64);
												}), 128))]),
												_: 2
											}, 1032, ["class"]);
										}), 128))]),
										_: 3
									}, 8, ["class"])),
									renderSlot(_ctx.$slots, "content-bottom"),
									!!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(props).ui?.arrow })
									}), null, 16, ["class"])) : createCommentVNode("", true)
								]),
								_: 3
							}, 16, ["class"])]),
							_: 3
						})]),
						_: 3
					}, 16)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/essay/index.vue?vue&type=script&setup=true&lang.ts
var GOAL = 8;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: essaysData, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/essays", "$Tq4yxTNzc_")), __temp = await __temp, __restore(), __temp);
		const { data: projectsData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/projects", "$DiUvGNU5kO")), __temp = await __temp, __restore(), __temp);
		const essays = computed(() => essaysData.value?.data ?? []);
		const projects = computed(() => projectsData.value?.data ?? []);
		const doneCount = computed(() => essays.value.filter((e) => e.status === "done").length);
		const createOpen = ref(false);
		const creating = ref(false);
		const createError = ref("");
		const form = reactive({
			title: "",
			direction: void 0,
			projectBgId: void 0
		});
		const projectItems = computed(() => projects.value.map((p) => ({
			label: p.name,
			value: p.id
		})));
		async function submitCreate() {
			if (!form.title.trim()) {
				createError.value = "请填写标题";
				return;
			}
			creating.value = true;
			createError.value = "";
			try {
				await $fetch$2("/api/essays", {
					method: "POST",
					body: {
						title: form.title.trim(),
						direction: form.direction ?? null,
						projectBgId: form.projectBgId ?? null
					}
				});
				createOpen.value = false;
				form.title = "";
				form.direction = void 0;
				form.projectBgId = void 0;
				await refresh();
			} catch (e) {
				createError.value = e?.data?.message || e?.message || "创建失败";
			} finally {
				creating.value = false;
			}
		}
		const deleteOpen = ref(false);
		const deleting = ref(false);
		const pendingDelete = ref(null);
		function askDelete(item) {
			pendingDelete.value = item;
			deleteOpen.value = true;
		}
		async function confirmDelete() {
			if (!pendingDelete.value) return;
			deleting.value = true;
			try {
				await $fetch$2(`/api/essays/${pendingDelete.value.id}`, { method: "DELETE" });
				deleteOpen.value = false;
				pendingDelete.value = null;
				await refresh();
			} finally {
				deleting.value = false;
			}
		}
		function formatTime(v) {
			if (!v) return "—";
			const d = new Date(v);
			if (Number.isNaN(d.getTime())) return "—";
			return d.toLocaleString("zh-CN", { hour12: false });
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$1;
			const _component_UButton = _sfc_main$2;
			const _component_UFormField = _sfc_main$1$1;
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main;
			const _component_NuxtLink = NuxtLink;
			const _component_UAlert = _sfc_main$4;
			const _component_UCard = _sfc_main$5;
			const _component_UProgress = _sfc_main$7;
			const _component_UBadge = _sfc_main$6;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 max-w-5xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold"> 论文列表 </h1>`);
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(createOpen),
				"onUpdate:open": ($event) => isRef(createOpen) ? createOpen.value = $event : null,
				title: "新建论文"
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, {
							label: "标题",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).title,
									"onUpdate:modelValue": ($event) => unref(form).title = $event,
									placeholder: "论文标题",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).title,
									"onUpdate:modelValue": ($event) => unref(form).title = $event,
									placeholder: "论文标题",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "方向" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(form).direction,
									"onUpdate:modelValue": ($event) => unref(form).direction = $event,
									items: [...unref(ESSAY_DIRECTIONS)],
									placeholder: "选择方向",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(form).direction,
									"onUpdate:modelValue": ($event) => unref(form).direction = $event,
									items: [...unref(ESSAY_DIRECTIONS)],
									placeholder: "选择方向",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "关联项目背景" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(projectItems).length) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(form).projectBgId,
									"onUpdate:modelValue": ($event) => unref(form).projectBgId = $event,
									items: unref(projectItems),
									placeholder: "选择项目背景",
									class: "w-full"
								}, null, _parent, _scopeId));
								else {
									_push(`<div class="text-sm text-gray-500"${_scopeId}> 暂无项目背景， `);
									_push(ssrRenderComponent(_component_NuxtLink, {
										to: "/essay/bg",
										class: "text-primary underline"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` 先去背景库创建 `);
											else return [createTextVNode(" 先去背景库创建 ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div>`);
								}
								else return [unref(projectItems).length ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
									modelValue: unref(form).projectBgId,
									"onUpdate:modelValue": ($event) => unref(form).projectBgId = $event,
									items: unref(projectItems),
									placeholder: "选择项目背景",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "text-sm text-gray-500"
								}, [createTextVNode(" 暂无项目背景， "), createVNode(_component_NuxtLink, {
									to: "/essay/bg",
									class: "text-primary underline"
								}, {
									default: withCtx(() => [createTextVNode(" 先去背景库创建 ")]),
									_: 1
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(createError)) _push(ssrRenderComponent(_component_UAlert, {
							color: "error",
							variant: "subtle",
							title: unref(createError)
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col gap-4" }, [
						createVNode(_component_UFormField, {
							label: "标题",
							required: ""
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).title,
								"onUpdate:modelValue": ($event) => unref(form).title = $event,
								placeholder: "论文标题",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "方向" }, {
							default: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(form).direction,
								"onUpdate:modelValue": ($event) => unref(form).direction = $event,
								items: [...unref(ESSAY_DIRECTIONS)],
								placeholder: "选择方向",
								class: "w-full"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "关联项目背景" }, {
							default: withCtx(() => [unref(projectItems).length ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
								modelValue: unref(form).projectBgId,
								"onUpdate:modelValue": ($event) => unref(form).projectBgId = $event,
								items: unref(projectItems),
								placeholder: "选择项目背景",
								class: "w-full"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "text-sm text-gray-500"
							}, [createTextVNode(" 暂无项目背景， "), createVNode(_component_NuxtLink, {
								to: "/essay/bg",
								class: "text-primary underline"
							}, {
								default: withCtx(() => [createTextVNode(" 先去背景库创建 ")]),
								_: 1
							})]))]),
							_: 1
						}),
						unref(createError) ? (openBlock(), createBlock(_component_UAlert, {
							key: 0,
							color: "error",
							variant: "subtle",
							title: unref(createError)
						}, null, 8, ["title"])) : createCommentVNode("", true)
					])];
				}),
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							variant: "outline",
							color: "neutral",
							onClick: ($event) => createOpen.value = false
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 取消 `);
								else return [createTextVNode(" 取消 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							loading: unref(creating),
							onClick: submitCreate
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 创建 `);
								else return [createTextVNode(" 创建 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
						variant: "outline",
						color: "neutral",
						onClick: ($event) => createOpen.value = false
					}, {
						default: withCtx(() => [createTextVNode(" 取消 ")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_UButton, {
						loading: unref(creating),
						onClick: submitCreate
					}, {
						default: withCtx(() => [createTextVNode(" 创建 ")]),
						_: 1
					}, 8, ["loading"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, { icon: "i-lucide-plus" }, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` 新建论文 `);
							else return [createTextVNode(" 新建论文 ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UButton, { icon: "i-lucide-plus" }, {
						default: withCtx(() => [createTextVNode(" 新建论文 ")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_UCard, { class: "mb-6" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UProgress, {
							"model-value": unref(doneCount),
							max: GOAL,
							class: "flex-1"
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"${_scopeId}> 已完成 ${ssrInterpolate(unref(doneCount))} / ${ssrInterpolate(GOAL)} 篇目标 </span></div>`);
					} else return [createVNode("div", { class: "flex items-center gap-4" }, [createVNode(_component_UProgress, {
						"model-value": unref(doneCount),
						max: GOAL,
						class: "flex-1"
					}, null, 8, ["model-value"]), createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap" }, " 已完成 " + toDisplayString(unref(doneCount)) + " / " + toDisplayString(GOAL) + " 篇目标 ", 1)])];
				}),
				_: 1
			}, _parent));
			if (!unref(essays).length) _push(`<div class="text-center text-gray-400 py-16"> 还没有论文，点击右上角「新建论文」开始 </div>`);
			else _push(`<!---->`);
			_push(`<div class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(essays), (item) => {
				_push(ssrRenderComponent(_component_UCard, { key: item.id }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="flex items-center justify-between gap-4"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}><div class="flex items-center gap-2 flex-wrap"${_scopeId}><span class="font-medium truncate"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
							if (item.direction) _push(ssrRenderComponent(_component_UBadge, {
								color: "primary",
								variant: "subtle"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(item.direction)}`);
									else return [createTextVNode(toDisplayString(item.direction), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(ssrRenderComponent(_component_UBadge, {
								color: item.status === "done" ? "success" : "neutral",
								variant: item.status === "done" ? "solid" : "subtle"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(item.status === "done" ? "已完成" : "草稿")}`);
									else return [createTextVNode(toDisplayString(item.status === "done" ? "已完成" : "草稿"), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</div><div class="text-sm text-gray-500 mt-1 flex items-center gap-3 flex-wrap"${_scopeId}><span${_scopeId}>项目背景：${ssrInterpolate(item.projectBgName || "未关联")}</span><span${_scopeId}>最新字数：${ssrInterpolate(item.latestWordCount ?? "—")}</span><span${_scopeId}>更新时间：${ssrInterpolate(formatTime(item.latestAt))}</span></div></div><div class="flex items-center gap-2 shrink-0"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UButton, {
								to: `/essay/${item.id}`,
								size: "sm",
								variant: "outline",
								icon: "i-lucide-pen-line"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` 进入写作器 `);
									else return [createTextVNode(" 进入写作器 ")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UButton, {
								size: "sm",
								color: "error",
								variant: "ghost",
								icon: "i-lucide-trash-2",
								onClick: ($event) => askDelete(item)
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` 删除 `);
									else return [createTextVNode(" 删除 ")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "flex items-center justify-between gap-4" }, [createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
							createVNode("span", { class: "font-medium truncate" }, toDisplayString(item.title), 1),
							item.direction ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "primary",
								variant: "subtle"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(item.direction), 1)]),
								_: 2
							}, 1024)) : createCommentVNode("", true),
							createVNode(_component_UBadge, {
								color: item.status === "done" ? "success" : "neutral",
								variant: item.status === "done" ? "solid" : "subtle"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(item.status === "done" ? "已完成" : "草稿"), 1)]),
								_: 2
							}, 1032, ["color", "variant"])
						]), createVNode("div", { class: "text-sm text-gray-500 mt-1 flex items-center gap-3 flex-wrap" }, [
							createVNode("span", null, "项目背景：" + toDisplayString(item.projectBgName || "未关联"), 1),
							createVNode("span", null, "最新字数：" + toDisplayString(item.latestWordCount ?? "—"), 1),
							createVNode("span", null, "更新时间：" + toDisplayString(formatTime(item.latestAt)), 1)
						])]), createVNode("div", { class: "flex items-center gap-2 shrink-0" }, [createVNode(_component_UButton, {
							to: `/essay/${item.id}`,
							size: "sm",
							variant: "outline",
							icon: "i-lucide-pen-line"
						}, {
							default: withCtx(() => [createTextVNode(" 进入写作器 ")]),
							_: 1
						}, 8, ["to"]), createVNode(_component_UButton, {
							size: "sm",
							color: "error",
							variant: "ghost",
							icon: "i-lucide-trash-2",
							onClick: ($event) => askDelete(item)
						}, {
							default: withCtx(() => [createTextVNode(" 删除 ")]),
							_: 1
						}, 8, ["onClick"])])])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(deleteOpen),
				"onUpdate:open": ($event) => isRef(deleteOpen) ? deleteOpen.value = $event : null,
				title: "确认删除"
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<p${_scopeId}>确定删除论文「${ssrInterpolate(unref(pendingDelete)?.title)}」吗？其所有版本将一并删除，且不可恢复。</p>`);
					else return [createVNode("p", null, "确定删除论文「" + toDisplayString(unref(pendingDelete)?.title) + "」吗？其所有版本将一并删除，且不可恢复。", 1)];
				}),
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							variant: "outline",
							color: "neutral",
							onClick: ($event) => deleteOpen.value = false
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 取消 `);
								else return [createTextVNode(" 取消 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							color: "error",
							loading: unref(deleting),
							onClick: confirmDelete
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 确认删除 `);
								else return [createTextVNode(" 确认删除 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
						variant: "outline",
						color: "neutral",
						onClick: ($event) => deleteOpen.value = false
					}, {
						default: withCtx(() => [createTextVNode(" 取消 ")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_UButton, {
						color: "error",
						loading: unref(deleting),
						onClick: confirmDelete
					}, {
						default: withCtx(() => [createTextVNode(" 确认删除 ")]),
						_: 1
					}, 8, ["loading"])])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/essay/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/essay/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var essay_default = index_vue_vue_type_script_setup_true_lang_default;

export { essay_default as default };
//# sourceMappingURL=essay-zQdxXIhp.mjs.map
