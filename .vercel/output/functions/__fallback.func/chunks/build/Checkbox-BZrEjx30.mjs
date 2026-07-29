import { e as useComponentProps, f as useAppConfig, g as useForwardProps, r as reactivePick, m as useFormField, t as tv, P as Primitive, a as _sfc_main$2, i as useForwardExpose, h as useVModel, z as isNullish, k as Presence_default, l as createContext, A as useCollection, a7 as usePrimitiveElement, V as VisuallyHidden_default, I as getActiveElement } from '../virtual/entry.mjs';
import { L as Label_default, b as useFormControl, a as useId$1 } from './fetch-FeZ2-RLM.mjs';
import { useSlots, useId, useAttrs, computed, unref, mergeProps, withCtx, openBlock, createBlock, createVNode, resolveDynamicComponent, renderSlot, createTextVNode, toDisplayString, createCommentVNode, defineComponent, createElementBlock, Fragment, withKeys, withModifiers, getCurrentInstance, watch, renderList, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { Q as isEqual } from '../nitro/nitro.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
/**
* The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or
* array.
* @param {T | T[] | undefined} base - It represents the base value that you want to compare with the `current` value.
* @param {T | T[] | undefined} current - The `current` parameter represents the current value that you want to compare with the `base` value or values.
* @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value
* is equal to the `current` value or if the `current` value exists within the `base` value. The
* function handles cases where `base` can be a single value, an array of values, or undefined.
*/
function isValueEqualOrExist(base, current) {
	if (isNullish(base)) return false;
	if (Array.isArray(base)) return base.some((val) => isEqual(val, current));
	else return isEqual(base, current);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/shared/useForwardScopeId.js
/**
* Returns the parent component's `<style scoped>` id (e.g. `data-v-xxxxxxx`) as a
* bindable attribute object, so it can be manually forwarded onto the chosen root
* element of a multi-root component.
*
* Vue only auto-applies the parent's scope id to a **single-root** component's root.
* When a component renders multiple root nodes (e.g. an interactive control plus a
* sibling hidden form input), that fallthrough is dropped and the parent's scoped
* styles can no longer reach the component. Spread the returned object onto the
* element that should stay styleable by the parent.
*
* @example
* ```ts
* const scopeIdAttrs = useForwardScopeId()
* // <Primitive v-bind="{ ...$attrs, ...scopeIdAttrs }" />
* ```
*/
function useForwardScopeId() {
	const scopeId = (getCurrentInstance()?.vnode)?.scopeId;
	return scopeId ? { [scopeId]: "" } : {};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var VisuallyHiddenInputBubble_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const { primitiveElement, currentElement } = usePrimitiveElement();
		watch(computed(() => props.checked ?? props.value), (cur, prev) => {
			if (!currentElement.value) return;
			const input = currentElement.value;
			const inputProto = (void 0).HTMLInputElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(inputProto, "value").set;
			if (setValue && cur !== prev) {
				const inputEvent = new Event("input", { bubbles: true });
				const changeEvent = new Event("change", { bubbles: true });
				setValue.call(input, cur);
				input.dispatchEvent(inputEvent);
				input.dispatchEvent(changeEvent);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(VisuallyHidden_default, mergeProps({
				ref_key: "primitiveElement",
				ref: primitiveElement
			}, {
				...props,
				..._ctx.$attrs
			}, { as: "input" }), null, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInput.js
var VisuallyHiddenInput_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const isFormArrayEmptyAndRequired = computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
		const parsedValue = computed(() => {
			if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
				name: props.name,
				value: props.value
			}];
			else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
				if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
					name: `${props.name}[${index}][${key}]`,
					value
				}));
				else return {
					name: `${props.name}[${index}]`,
					value: obj
				};
			});
			else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
				name: `${props.name}[${key}]`,
				value
			}));
			return [];
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: _ctx.name }, {
				...props,
				..._ctx.$attrs
			}, {
				name: _ctx.name,
				value: _ctx.value
			}), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
				return openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: parsed.name }, { ref_for: true }, {
					...props,
					..._ctx.$attrs
				}, {
					name: parsed.name,
					value: parsed.value
				}), null, 16, ["name", "value"]);
			}), 128))], 2112);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/RovingFocus/utils.js
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [injectRovingFocusGroupContext] = /*#__PURE__*/ createContext("RovingFocusGroup");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/RovingFocus/RovingFocusItem.js
var RovingFocusItem_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: false
		},
		focusable: {
			type: Boolean,
			required: false,
			default: true
		},
		active: {
			type: Boolean,
			required: false
		},
		allowShiftKey: {
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
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const context = injectRovingFocusGroupContext();
		const randomId = useId$1();
		const id = computed(() => props.tabStopId || randomId);
		const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value);
		const { getItems, CollectionItem } = useCollection();
		watch(() => props.focusable, (newVal, oldVal) => {
			if (newVal === oldVal) return;
			if (newVal) context.onFocusableItemAdd();
			else context.onFocusableItemRemove();
		});
		function handleKeydown(event) {
			if (event.key === "Tab" && event.shiftKey) {
				context.onItemShiftTab();
				return;
			}
			if (event.target !== event.currentTarget) return;
			const focusIntent = getFocusIntent(event, context.orientation.value, context.dir.value);
			if (focusIntent !== void 0) {
				if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey)) return;
				event.preventDefault();
				let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
				if (focusIntent === "last") candidateNodes.reverse();
				else if (focusIntent === "prev" || focusIntent === "next") {
					if (focusIntent === "prev") candidateNodes.reverse();
					const currentIndex = candidateNodes.indexOf(event.currentTarget);
					candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
				}
				nextTick(() => focusFirst(candidateNodes));
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isCurrentTabStop.value ? 0 : -1,
					"data-orientation": unref(context).orientation.value,
					"data-active": _ctx.active ? "" : void 0,
					"data-disabled": !_ctx.focusable ? "" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onMousedown: _cache[0] || (_cache[0] = (event) => {
						if (!_ctx.focusable) event.preventDefault();
						else unref(context).onItemFocus(id.value);
					}),
					onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
					onKeydown: handleKeydown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"data-active",
					"data-disabled",
					"as",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Checkbox/CheckboxGroupRoot.js
var [injectCheckboxGroupRootContext] = /*#__PURE__*/ createContext("CheckboxGroupRoot");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Checkbox/utils.js
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [injectCheckboxRootContext, provideCheckboxRootContext] = /*#__PURE__*/ createContext("CheckboxRoot");
var CheckboxRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CheckboxRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		value: {
			type: null,
			required: false,
			default: "on"
		},
		id: {
			type: String,
			required: false
		},
		trueValue: {
			type: null,
			required: false,
			default: () => true
		},
		falseValue: {
			type: null,
			required: false,
			default: () => false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const checkboxGroupContext = injectCheckboxGroupRootContext(null);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? props.falseValue,
			passive: props.modelValue === void 0
		});
		const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);
		const isChecked = computed(() => isEqual(modelValue.value, props.trueValue));
		const checkboxState = computed(() => {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
			else {
				if (modelValue.value === "indeterminate") return "indeterminate";
				return isChecked.value;
			}
		});
		function handleClick() {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) {
				const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
				if (isValueEqualOrExist(modelValueArray, props.value)) {
					const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
					modelValueArray.splice(index, 1);
				} else modelValueArray.push(props.value);
				checkboxGroupContext.modelValue.value = modelValueArray;
			} else if (modelValue.value === "indeterminate") modelValue.value = props.trueValue;
			else modelValue.value = isChecked.value ? props.falseValue : props.trueValue;
		}
		const isFormControl = useFormControl(currentElement);
		const scopeIdAttrs = useForwardScopeId();
		const attrs = useAttrs();
		const ariaLabel = computed(() => {
			if (attrs["aria-label"]) return void 0;
			return props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0;
		});
		provideCheckboxRootContext({
			disabled,
			state: checkboxState
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [(openBlock(), createBlock(resolveDynamicComponent(unref(checkboxGroupContext)?.rovingFocus.value ? unref(RovingFocusItem_default) : unref(Primitive)), mergeProps({
				..._ctx.$attrs,
				...unref(scopeIdAttrs)
			}, {
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "checkbox",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-checked": unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
				"aria-required": _ctx.required,
				"aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
				"data-state": unref(getState)(checkboxState.value),
				"data-disabled": disabled.value ? "" : void 0,
				disabled: disabled.value,
				focusable: unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
				onKeydown: withKeys(withModifiers(() => {}, ["prevent"]), ["enter"]),
				onClick: handleClick
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					state: checkboxState.value
				})]),
				_: 3
			}, 16, [
				"id",
				"as-child",
				"as",
				"type",
				"aria-checked",
				"aria-required",
				"aria-label",
				"data-state",
				"data-disabled",
				"disabled",
				"focusable",
				"onKeydown"
			])), unref(isFormControl) && _ctx.name && !unref(checkboxGroupContext) ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), mergeProps({
				key: 0,
				type: "checkbox",
				checked: !!checkboxState.value,
				name: _ctx.name,
				value: _ctx.value,
				disabled: disabled.value,
				required: _ctx.required
			}, unref(scopeIdAttrs)), null, 16, [
				"checked",
				"name",
				"value",
				"disabled",
				"required"
			])) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Checkbox/CheckboxIndicator.js
var CheckboxIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "CheckboxIndicator",
	props: {
		forceMount: {
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
			default: "span"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const rootContext = injectCheckboxRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(rootContext).state.value) || unref(rootContext).state.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(getState)(unref(rootContext).state.value),
					"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
					style: { pointerEvents: "none" },
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-disabled",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcheckbox.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcheckbox_default = {
	"slots": {
		"root": "relative flex items-start",
		"container": "flex items-center",
		"base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-3",
		"indicator": "flex items-center justify-center size-full text-inverted",
		"icon": "shrink-0 size-full",
		"wrapper": "w-full",
		"label": "block font-medium text-default",
		"description": "text-muted"
	},
	"variants": {
		"color": {
			"primary": {
				"base": "outline-primary/25 focus-visible:ring-primary",
				"indicator": "bg-primary"
			},
			"secondary": {
				"base": "outline-secondary/25 focus-visible:ring-secondary",
				"indicator": "bg-secondary"
			},
			"success": {
				"base": "outline-success/25 focus-visible:ring-success",
				"indicator": "bg-success"
			},
			"info": {
				"base": "outline-info/25 focus-visible:ring-info",
				"indicator": "bg-info"
			},
			"warning": {
				"base": "outline-warning/25 focus-visible:ring-warning",
				"indicator": "bg-warning"
			},
			"error": {
				"base": "outline-error/25 focus-visible:ring-error",
				"indicator": "bg-error"
			},
			"neutral": {
				"base": "outline-inverted/25 focus-visible:ring-inverted",
				"indicator": "bg-inverted"
			}
		},
		"variant": {
			"list": { "root": "" },
			"card": { "root": "border border-muted rounded-lg" }
		},
		"indicator": {
			"start": {
				"root": "flex-row",
				"wrapper": "ms-2"
			},
			"end": {
				"root": "flex-row-reverse",
				"wrapper": "me-2"
			},
			"hidden": {
				"base": "sr-only",
				"wrapper": "text-center"
			}
		},
		"size": {
			"xs": {
				"base": "size-3",
				"container": "h-4",
				"wrapper": "text-xs"
			},
			"sm": {
				"base": "size-3.5",
				"container": "h-4",
				"wrapper": "text-xs"
			},
			"md": {
				"base": "size-4",
				"container": "h-5",
				"wrapper": "text-sm"
			},
			"lg": {
				"base": "size-4.5",
				"container": "h-5",
				"wrapper": "text-sm"
			},
			"xl": {
				"base": "size-5",
				"container": "h-6",
				"wrapper": "text-base"
			}
		},
		"required": { "true": { "label": "after:content-['*'] after:ms-0.5 after:text-error" } },
		"disabled": { "true": {
			"root": "opacity-75",
			"base": "cursor-not-allowed",
			"label": "cursor-not-allowed",
			"description": "cursor-not-allowed"
		} },
		"highlight": { "true": "" },
		"checked": { "true": "" }
	},
	"compoundVariants": [
		{
			"size": "xs",
			"variant": "card",
			"class": { "root": "p-2.5" }
		},
		{
			"size": "sm",
			"variant": "card",
			"class": { "root": "p-3" }
		},
		{
			"size": "md",
			"variant": "card",
			"class": { "root": "p-3.5" }
		},
		{
			"size": "lg",
			"variant": "card",
			"class": { "root": "p-4" }
		},
		{
			"size": "xl",
			"variant": "card",
			"class": { "root": "p-4.5" }
		},
		{
			"color": "primary",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-primary" }
		},
		{
			"color": "secondary",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-secondary" }
		},
		{
			"color": "success",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-success" }
		},
		{
			"color": "info",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-info" }
		},
		{
			"color": "warning",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-warning" }
		},
		{
			"color": "error",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-error" }
		},
		{
			"color": "neutral",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-inverted" }
		},
		{
			"variant": "card",
			"disabled": true,
			"class": { "root": "cursor-not-allowed" }
		},
		{
			"color": "primary",
			"highlight": true,
			"class": { "base": "ring-primary" }
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": { "base": "ring-secondary" }
		},
		{
			"color": "success",
			"highlight": true,
			"class": { "base": "ring-success" }
		},
		{
			"color": "info",
			"highlight": true,
			"class": { "base": "ring-info" }
		},
		{
			"color": "warning",
			"highlight": true,
			"class": { "base": "ring-warning" }
		},
		{
			"color": "error",
			"highlight": true,
			"class": { "base": "ring-error" }
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": { "base": "ring-inverted" }
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "list",
		"indicator": "start"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UCheckbox",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		description: {
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
		indicator: {
			type: null,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		indeterminateIcon: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		id: {
			type: String,
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
		trueValue: {
			type: null,
			required: false
		},
		falseValue: {
			type: null,
			required: false
		}
	},
	emits: ["change", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const slots = useSlots();
		const emits = __emit;
		const props = useComponentProps("checkbox", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
		const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField(_props);
		const id = _id.value ?? useId();
		const attrs = useAttrs();
		const forwardedAttrs = computed(() => {
			const { "data-state": _, ...rest } = attrs;
			return rest;
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcheckbox_default,
			...appConfig.ui?.checkbox || {}
		})({
			size: size.value ?? props.size,
			color: color.value ?? props.color,
			variant: props.variant,
			indicator: props.indicator,
			highlight: highlight.value ?? props.highlight,
			required: props.required,
			disabled: disabled.value
		}));
		function onUpdate(value) {
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: !unref(props).variant || unref(props).variant === "list" ? unref(props).as : unref(Label_default),
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(CheckboxRoot_default), mergeProps({ id: unref(id) }, {
							...unref(rootProps),
							...forwardedAttrs.value,
							...unref(ariaAttrs)
						}, {
							name: unref(name),
							disabled: unref(disabled),
							"data-slot": "base",
							class: ui.value.base({ class: unref(props).ui?.base }),
							"onUpdate:modelValue": onUpdate
						}), {
							default: withCtx(({ state }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(CheckboxIndicator_default), {
									"data-slot": "indicator",
									class: ui.value.indicator({ class: unref(props).ui?.indicator })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) if (state === "indeterminate") _push(ssrRenderComponent(_sfc_main$2, {
											name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, _parent, _scopeId));
										else _push(ssrRenderComponent(_sfc_main$2, {
											name: unref(props).icon || unref(appConfig).ui.icons.check,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, _parent, _scopeId));
										else return [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
											key: 0,
											name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
											key: 1,
											name: unref(props).icon || unref(appConfig).ui.icons.check,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, 8, ["name", "class"]))];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(CheckboxIndicator_default), {
									"data-slot": "indicator",
									class: ui.value.indicator({ class: unref(props).ui?.indicator })
								}, {
									default: withCtx(() => [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
										key: 0,
										name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
										"data-slot": "icon",
										class: ui.value.icon({ class: unref(props).ui?.icon })
									}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
										key: 1,
										name: unref(props).icon || unref(appConfig).ui.icons.check,
										"data-slot": "icon",
										class: ui.value.icon({ class: unref(props).ui?.icon })
									}, null, 8, ["name", "class"]))]),
									_: 2
								}, 1032, ["class"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						if (unref(props).label || !!slots.label || unref(props).description || !!slots.description) {
							_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
							if (unref(props).label || !!slots.label) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
								for: unref(id),
								"data-slot": "label",
								class: ui.value.label({ class: unref(props).ui?.label })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => {
										_push(`${ssrInterpolate(unref(props).label)}`);
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => [createTextVNode(toDisplayString(unref(props).label), 1)])];
								}),
								_: 3
							}), _parent, _scopeId);
							else _push(`<!---->`);
							if (unref(props).description || !!slots.description) {
								_push(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "description", { description: unref(props).description }, () => {
									_push(`${ssrInterpolate(unref(props).description)}`);
								}, _push, _parent, _scopeId);
								_push(`</p>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [createVNode("div", {
						"data-slot": "container",
						class: ui.value.container({ class: unref(props).ui?.container })
					}, [createVNode(unref(CheckboxRoot_default), mergeProps({ id: unref(id) }, {
						...unref(rootProps),
						...forwardedAttrs.value,
						...unref(ariaAttrs)
					}, {
						name: unref(name),
						disabled: unref(disabled),
						"data-slot": "base",
						class: ui.value.base({ class: unref(props).ui?.base }),
						"onUpdate:modelValue": onUpdate
					}), {
						default: withCtx(({ state }) => [createVNode(unref(CheckboxIndicator_default), {
							"data-slot": "indicator",
							class: ui.value.indicator({ class: unref(props).ui?.indicator })
						}, {
							default: withCtx(() => [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
								key: 0,
								name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
								key: 1,
								name: unref(props).icon || unref(appConfig).ui.icons.check,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, 8, ["name", "class"]))]),
							_: 2
						}, 1032, ["class"])]),
						_: 1
					}, 16, [
						"id",
						"name",
						"disabled",
						"class"
					])], 2), unref(props).label || !!slots.label || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
						key: 0,
						"data-slot": "wrapper",
						class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
					}, [unref(props).label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
						key: 0,
						for: unref(id),
						"data-slot": "label",
						class: ui.value.label({ class: unref(props).ui?.label })
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => [createTextVNode(toDisplayString(unref(props).label), 1)])]),
						_: 3
					}, 8, ["for", "class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock("p", {
						key: 1,
						"data-slot": "description",
						class: ui.value.description({ class: unref(props).ui?.description })
					}, [renderSlot(_ctx.$slots, "description", { description: unref(props).description }, () => [createTextVNode(toDisplayString(unref(props).description), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Checkbox-BZrEjx30.mjs.map
