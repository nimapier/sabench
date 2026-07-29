import { u as useRoute$1, b as useToast, c as createError$1, a as _sfc_main$2$1, _ as _sfc_main$3, d as _sfc_main$7, $ as $fetch$2, e as useComponentProps, f as useAppConfig, g as useForwardProps, r as reactivePick, t as tv, n as navigateTo, h as useVModel, i as useForwardExpose, P as Primitive, j as useEventListener, k as Presence_default, l as createContext } from '../virtual/entry.mjs';
import { u as useFetch, _ as _sfc_main$1, a as useId$1 } from './fetch-FeZ2-RLM.mjs';
import { a as ESSAY_SECTION_BUDGET, _ as _sfc_main$5 } from '../_/constants.mjs';
import { _ as _sfc_main$6 } from './Checkbox-BZrEjx30.mjs';
import { _ as _sfc_main$2 } from './Card-Cufg5vwz.mjs';
import { _ as _sfc_main$4 } from './Textarea-wILrOs_D.mjs';
import { defineComponent, withAsyncContext, computed, ref, watch, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, isRef, useSlots, renderSlot, toRefs, nextTick, useSSRContext } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
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
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'fnv1a-64';
import 'object-identity';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Collapsible/CollapsibleRoot.js
var [injectCollapsibleRootContext, provideCollapsibleRootContext] = /*#__PURE__*/ createContext("CollapsibleRoot");
var CollapsibleRoot_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
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
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const { disabled, unmountOnHide } = toRefs(props);
		provideCollapsibleRootContext({
			contentId: "",
			disabled,
			open,
			unmountOnHide,
			onOpenToggle: () => {
				if (disabled.value) return;
				open.value = !open.value;
			}
		});
		__expose({ open });
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": props.asChild,
				"data-state": unref(open) ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Collapsible/CollapsibleContent.js
var CollapsibleContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CollapsibleContent",
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
			required: false
		}
	},
	emits: ["contentFound"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectCollapsibleRootContext();
		rootContext.contentId ||= useId$1(void 0, "reka-collapsible-content");
		const presentRef = ref();
		const { forwardRef, currentElement } = useForwardExpose();
		const width = ref(0);
		const height = ref(0);
		const isOpen = computed(() => rootContext.open.value);
		const isMountAnimationPrevented = ref(isOpen.value);
		const currentStyle = ref();
		watch(() => [isOpen.value, presentRef.value?.present], async () => {
			await nextTick();
			const node = currentElement.value;
			if (!node) return;
			currentStyle.value = currentStyle.value || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			height.value = rect.height;
			width.value = rect.width;
			if (!isMountAnimationPrevented.value) {
				node.style.transitionDuration = currentStyle.value.transitionDuration;
				node.style.animationName = currentStyle.value.animationName;
			}
		}, { immediate: true });
		const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
		useEventListener(currentElement, "beforematch", (ev) => {
			requestAnimationFrame(() => {
				rootContext.onOpenToggle();
				emits("contentFound");
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				ref_key: "presentRef",
				ref: presentRef,
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": true
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					"as-child": props.asChild,
					as: _ctx.as,
					hidden: !present ? unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
					"data-state": skipAnimation.value ? void 0 : unref(rootContext).open.value ? "open" : "closed",
					"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
					style: {
						[`--reka-collapsible-content-height`]: `${height.value}px`,
						[`--reka-collapsible-content-width`]: `${width.value}px`
					}
				}), {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1040, [
					"id",
					"as-child",
					"as",
					"hidden",
					"data-state",
					"data-disabled",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@7.0.2_/node_modules/reka-ui/dist/Collapsible/CollapsibleTrigger.js
var CollapsibleTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleTrigger",
	props: {
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
		useForwardExpose();
		const rootContext = injectCollapsibleRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				"aria-controls": unref(rootContext).contentId,
				"aria-expanded": unref(rootContext).open.value,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
				disabled: unref(rootContext).disabled?.value,
				onClick: unref(rootContext).onOpenToggle
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child",
				"aria-controls",
				"aria-expanded",
				"data-state",
				"data-disabled",
				"disabled",
				"onClick"
			]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcollapsible.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcollapsible_default = { "slots": {
	"root": "",
	"content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=closed]:overflow-hidden"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Collapsible.vue
var _sfc_main = {
	__name: "UCollapsible",
	__ssrInlineRender: true,
	props: {
		as: {
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
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("collapsible", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "defaultOpen", "open", "disabled", "unmountOnHide"), emits);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcollapsible_default,
			...appConfig.ui?.collapsible || {}
		})());
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(CollapsibleRoot_default), mergeProps(unref(rootProps), {
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(CollapsibleTrigger_default), { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(CollapsibleContent_default), {
							"data-slot": "content",
							class: ui.value.content({ class: unref(props).ui?.content })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "content")];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(CollapsibleTrigger_default), {
						key: 0,
						"as-child": ""
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1024)) : createCommentVNode("", true), createVNode(unref(CollapsibleContent_default), {
						"data-slot": "content",
						class: ui.value.content({ class: unref(props).ui?.content })
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "content")]),
						_: 3
					}, 8, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_54b4fffac2eea3f90b0cd0fc299526f8/node_modules/@nuxt/ui/dist/runtime/components/Collapsible.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/essay/[id].vue?vue&type=script&setup=true&lang.ts
var TOTAL_SEC = 7200;
var WORD_GOAL = 3e3;
var WORD_PASS = 2500;
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute$1();
		const toast = useToast();
		const id = route.params.id;
		const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/essays/${id}`, "$t3bGjdo5o0")), __temp = await __temp, __restore(), __temp);
		if (error.value || !data.value?.data) throw createError$1({
			statusCode: 404,
			statusMessage: "论文不存在",
			fatal: true
		});
		const essay = computed(() => data.value?.data);
		const { data: projectsData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/projects", "$Xy7Q9RlrLA")), __temp = await __temp, __restore(), __temp);
		const projectBg = computed(() => {
			const pid = essay.value?.projectBgId;
			if (!pid) return null;
			return projectsData.value?.data.find((p) => p.id === pid) ?? null;
		});
		const isDone = computed(() => essay.value?.status === "done");
		const finalVersion = computed(() => essay.value?.versions.find((v) => !v.isDraft) ?? null);
		const REVIEW_LABELS = {
			roleEffect: "摘要包含担任角色与项目效果",
			realProject: "结合了真实项目细节",
			quantified: "包含量化数字",
			structure: "结构完整覆盖六段",
			wordRange: "字数在 2500-3000 区间"
		};
		const finalReview = computed(() => {
			const raw = finalVersion.value?.selfReview;
			if (!raw) return {};
			try {
				const parsed = JSON.parse(raw);
				return typeof parsed === "object" && parsed !== null ? parsed : {};
			} catch {
				return {};
			}
		});
		const finalMinutes = computed(() => Math.round((finalVersion.value?.durationSec ?? 0) / 60));
		const content = ref(essay.value?.latestDraft?.content ?? "");
		const baseDurationSec = essay.value?.latestDraft?.durationSec ?? 0;
		const remaining = ref(Math.max(0, TOTAL_SEC - baseDurationSec));
		const sessionSec = ref(0);
		const timeText = computed(() => {
			return `${String(Math.floor(remaining.value / 60)).padStart(2, "0")}:${String(remaining.value % 60).padStart(2, "0")}`;
		});
		const timerClass = computed(() => {
			if (remaining.value <= 900) return "text-red-500";
			if (remaining.value <= 1800) return "text-amber-500";
			return "text-highlighted";
		});
		const wordCount = computed(() => content.value.replace(/\s/g, "").length);
		const wordBarColor = computed(() => wordCount.value >= WORD_PASS ? "success" : "primary");
		const dirty = ref(false);
		const saving = ref(false);
		const lastSavedAt = ref(null);
		const durationSec = computed(() => baseDurationSec + sessionSec.value);
		let debounceTimer;
		async function saveDraft() {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
				debounceTimer = void 0;
			}
			if (saving.value || isDone.value) return;
			const snapshot = content.value;
			saving.value = true;
			try {
				await $fetch$2(`/api/essays/${id}/versions`, {
					method: "POST",
					body: {
						content: snapshot,
						wordCount: snapshot.replace(/\s/g, "").length,
						durationSec: durationSec.value,
						isDraft: true
					}
				});
				lastSavedAt.value = /* @__PURE__ */ new Date();
				if (content.value === snapshot) dirty.value = false;
			} catch {
				toast.add({
					title: "保存失败，请重试",
					color: "error"
				});
			} finally {
				saving.value = false;
			}
		}
		watch(content, () => {
			if (isDone.value) return;
			dirty.value = true;
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => saveDraft(), 1e4);
		});
		const saveStatusText = computed(() => {
			if (saving.value) return "保存中…";
			if (lastSavedAt.value) {
				const d = lastSavedAt.value;
				return `已保存 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
			}
			return dirty.value ? "有未保存修改" : "尚未保存";
		});
		watch(dirty, (v) => {});
		onBeforeRouteLeave(() => {
			if (!dirty.value) return true;
			return (void 0).confirm("有未保存的修改，确定要离开吗？");
		});
		const finishOpen = ref(false);
		const finishing = ref(false);
		const review = reactive({
			roleEffect: false,
			realProject: false,
			quantified: false,
			structure: false,
			wordRange: false
		});
		const reviewKeys = Object.keys(REVIEW_LABELS);
		const allChecked = computed(() => reviewKeys.every((k) => review[k]));
		async function submitFinish() {
			if (!allChecked.value || finishing.value) return;
			finishing.value = true;
			try {
				await $fetch$2(`/api/essays/${id}/versions`, {
					method: "POST",
					body: {
						content: content.value,
						wordCount: wordCount.value,
						durationSec: durationSec.value,
						isDraft: false,
						selfReview: { ...review }
					}
				});
				dirty.value = false;
				finishOpen.value = false;
				toast.add({
					title: "论文已完成，继续加油",
					color: "success"
				});
				await navigateTo("/essay");
			} catch {
				toast.add({
					title: "提交失败，请重试",
					color: "error"
				});
			} finally {
				finishing.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UBadge = _sfc_main$1;
			const _component_UCard = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UButton = _sfc_main$3;
			const _component_UProgress = _sfc_main$7;
			const _component_UCollapsible = _sfc_main;
			const _component_UTextarea = _sfc_main$4;
			const _component_UModal = _sfc_main$5;
			const _component_UCheckbox = _sfc_main$6;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl p-4 py-6" }, _attrs))}>`);
			if (unref(isDone)) {
				_push(`<div class="space-y-6"><div class="flex items-center gap-3 flex-wrap"><h1 class="text-2xl font-bold text-highlighted">${ssrInterpolate(unref(essay)?.title)}</h1>`);
				if (unref(essay)?.direction) _push(ssrRenderComponent(_component_UBadge, {
					color: "primary",
					variant: "subtle"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(essay).direction)}`);
						else return [createTextVNode(toDisplayString(unref(essay).direction), 1)];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_UBadge, { color: "success" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` 已完成 `);
						else return [createTextVNode(" 已完成 ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				_push(ssrRenderComponent(_component_UCard, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="flex items-center gap-6 flex-wrap text-sm"${_scopeId}><span${_scopeId}>字数：<b${_scopeId}>${ssrInterpolate(unref(finalVersion)?.wordCount ?? "—")}</b></span><span${_scopeId}>用时：<b${_scopeId}>${ssrInterpolate(unref(finalMinutes))} 分钟</b></span></div>`);
						else return [createVNode("div", { class: "flex items-center gap-6 flex-wrap text-sm" }, [createVNode("span", null, [createTextVNode("字数："), createVNode("b", null, toDisplayString(unref(finalVersion)?.wordCount ?? "—"), 1)]), createVNode("span", null, [createTextVNode("用时："), createVNode("b", null, toDisplayString(unref(finalMinutes)) + " 分钟", 1)])])];
					}),
					_: 1
				}, _parent));
				if (Object.keys(unref(finalReview)).length) _push(ssrRenderComponent(_component_UCard, null, {
					header: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<h2 class="font-semibold text-highlighted"${_scopeId}> 完成自评 </h2>`);
						else return [createVNode("h2", { class: "font-semibold text-highlighted" }, " 完成自评 ")];
					}),
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<ul class="space-y-2"${_scopeId}><!--[-->`);
							ssrRenderList(unref(reviewKeys), (key) => {
								_push(`<li class="flex items-center gap-2 text-sm"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: unref(finalReview)[key] ? "i-lucide-check-circle-2" : "i-lucide-circle",
									class: unref(finalReview)[key] ? "text-success" : "text-muted"
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(REVIEW_LABELS[key])}</li>`);
							});
							_push(`<!--]--></ul>`);
						} else return [createVNode("ul", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(reviewKeys), (key) => {
							return openBlock(), createBlock("li", {
								key,
								class: "flex items-center gap-2 text-sm"
							}, [createVNode(_component_UIcon, {
								name: unref(finalReview)[key] ? "i-lucide-check-circle-2" : "i-lucide-circle",
								class: unref(finalReview)[key] ? "text-success" : "text-muted"
							}, null, 8, ["name", "class"]), createTextVNode(" " + toDisplayString(REVIEW_LABELS[key]), 1)]);
						}), 128))])];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_UCard, null, {
					header: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<h2 class="font-semibold text-highlighted"${_scopeId}> 最终版本 </h2>`);
						else return [createVNode("h2", { class: "font-semibold text-highlighted" }, " 最终版本 ")];
					}),
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="whitespace-pre-wrap text-sm leading-7" data-final-content${_scopeId}>${ssrInterpolate(unref(finalVersion)?.content ?? "")}</div>`);
						else return [createVNode("div", {
							class: "whitespace-pre-wrap text-sm leading-7",
							"data-final-content": ""
						}, toDisplayString(unref(finalVersion)?.content ?? ""), 1)];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_UButton, {
					to: "/essay",
					variant: "outline",
					color: "neutral",
					icon: "i-lucide-arrow-left"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` 返回论文列表 `);
						else return [createTextVNode(" 返回论文列表 ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="space-y-4"><div class="flex items-center gap-3 flex-wrap"><h1 class="text-xl font-bold text-highlighted">${ssrInterpolate(unref(essay)?.title)}</h1>`);
				if (unref(essay)?.direction) _push(ssrRenderComponent(_component_UBadge, {
					color: "primary",
					variant: "subtle"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(essay).direction)}`);
						else return [createTextVNode(toDisplayString(unref(essay).direction), 1)];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(`</div>`);
				_push(ssrRenderComponent(_component_UCard, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="flex items-center gap-6 flex-wrap"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-timer",
								class: "size-5 text-muted"
							}, null, _parent, _scopeId));
							_push(`<span class="${ssrRenderClass([unref(timerClass), "text-2xl font-mono font-bold tabular-nums"])}" data-timer${_scopeId}>${ssrInterpolate(unref(timeText))}</span></div><div class="flex items-center gap-3 min-w-64 flex-1"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UProgress, {
								"model-value": unref(wordCount),
								max: WORD_GOAL,
								color: unref(wordBarColor),
								class: "flex-1",
								"data-word-progress": ""
							}, null, _parent, _scopeId));
							_push(`<span class="text-sm text-muted whitespace-nowrap" data-word-count${_scopeId}>${ssrInterpolate(unref(wordCount))} 字 · 2500 合格 / 3000 目标 </span></div><div class="flex items-center gap-3"${_scopeId}><span class="text-sm text-muted" data-save-status${_scopeId}>${ssrInterpolate(unref(saveStatusText))}</span>`);
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-save",
								variant: "outline",
								color: "neutral",
								loading: unref(saving),
								onClick: saveDraft
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` 保存草稿 `);
									else return [createTextVNode(" 保存草稿 ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-check",
								color: "primary",
								onClick: ($event) => finishOpen.value = true
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` 完成 `);
									else return [createTextVNode(" 完成 ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "flex items-center gap-6 flex-wrap" }, [
							createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-timer",
								class: "size-5 text-muted"
							}), createVNode("span", {
								class: ["text-2xl font-mono font-bold tabular-nums", unref(timerClass)],
								"data-timer": ""
							}, toDisplayString(unref(timeText)), 3)]),
							createVNode("div", { class: "flex items-center gap-3 min-w-64 flex-1" }, [createVNode(_component_UProgress, {
								"model-value": unref(wordCount),
								max: WORD_GOAL,
								color: unref(wordBarColor),
								class: "flex-1",
								"data-word-progress": ""
							}, null, 8, ["model-value", "color"]), createVNode("span", {
								class: "text-sm text-muted whitespace-nowrap",
								"data-word-count": ""
							}, toDisplayString(unref(wordCount)) + " 字 · 2500 合格 / 3000 目标 ", 1)]),
							createVNode("div", { class: "flex items-center gap-3" }, [
								createVNode("span", {
									class: "text-sm text-muted",
									"data-save-status": ""
								}, toDisplayString(unref(saveStatusText)), 1),
								createVNode(_component_UButton, {
									icon: "i-lucide-save",
									variant: "outline",
									color: "neutral",
									loading: unref(saving),
									onClick: saveDraft
								}, {
									default: withCtx(() => [createTextVNode(" 保存草稿 ")]),
									_: 1
								}, 8, ["loading"]),
								createVNode(_component_UButton, {
									icon: "i-lucide-check",
									color: "primary",
									onClick: ($event) => finishOpen.value = true
								}, {
									default: withCtx(() => [createTextVNode(" 完成 ")]),
									_: 1
								}, 8, ["onClick"])
							])
						])];
					}),
					_: 1
				}, _parent));
				_push(`<div class="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">`);
				_push(ssrRenderComponent(_component_UCollapsible, { class: "lg:sticky lg:top-20 self-start w-full" }, {
					content: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_UCard, { class: "mt-2" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<ul class="space-y-2 text-sm"${_scopeId}><!--[-->`);
									ssrRenderList(unref(ESSAY_SECTION_BUDGET), (section, i) => {
										_push(`<li class="flex items-center justify-between gap-2"${_scopeId}><span class="text-default"${_scopeId}>${ssrInterpolate(i + 1)}. ${ssrInterpolate(section.name)}</span>`);
										_push(ssrRenderComponent(_component_UBadge, {
											color: "neutral",
											variant: "subtle",
											size: "sm"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(section.budget)} 字 `);
												else return [createTextVNode(toDisplayString(section.budget) + " 字 ", 1)];
											}),
											_: 2
										}, _parent, _scopeId));
										_push(`</li>`);
									});
									_push(`<!--]--></ul>`);
									if (unref(projectBg)) {
										_push(`<div class="mt-4 border-t border-default pt-3" data-project-bg${_scopeId}><p class="text-xs text-muted mb-2"${_scopeId}> 关联项目背景 </p><p class="font-medium text-sm mb-2"${_scopeId}>${ssrInterpolate(unref(projectBg).name)}</p><dl class="space-y-1.5 text-xs"${_scopeId}>`);
										if (unref(projectBg).scale) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-muted shrink-0 w-14"${_scopeId}>规模</dt><dd${_scopeId}>${ssrInterpolate(unref(projectBg).scale)}</dd></div>`);
										else _push(`<!---->`);
										if (unref(projectBg).role) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-muted shrink-0 w-14"${_scopeId}>角色</dt><dd${_scopeId}>${ssrInterpolate(unref(projectBg).role)}</dd></div>`);
										else _push(`<!---->`);
										if (unref(projectBg).techStack) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-muted shrink-0 w-14"${_scopeId}>技术栈</dt><dd${_scopeId}>${ssrInterpolate(unref(projectBg).techStack)}</dd></div>`);
										else _push(`<!---->`);
										if (unref(projectBg).results) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-muted shrink-0 w-14"${_scopeId}>成果</dt><dd${_scopeId}>${ssrInterpolate(unref(projectBg).results)}</dd></div>`);
										else _push(`<!---->`);
										_push(`</dl></div>`);
									} else _push(`<!---->`);
								} else return [createVNode("ul", { class: "space-y-2 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(ESSAY_SECTION_BUDGET), (section, i) => {
									return openBlock(), createBlock("li", {
										key: section.name,
										class: "flex items-center justify-between gap-2"
									}, [createVNode("span", { class: "text-default" }, toDisplayString(i + 1) + ". " + toDisplayString(section.name), 1), createVNode(_component_UBadge, {
										color: "neutral",
										variant: "subtle",
										size: "sm"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(section.budget) + " 字 ", 1)]),
										_: 2
									}, 1024)]);
								}), 128))]), unref(projectBg) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-4 border-t border-default pt-3",
									"data-project-bg": ""
								}, [
									createVNode("p", { class: "text-xs text-muted mb-2" }, " 关联项目背景 "),
									createVNode("p", { class: "font-medium text-sm mb-2" }, toDisplayString(unref(projectBg).name), 1),
									createVNode("dl", { class: "space-y-1.5 text-xs" }, [
										unref(projectBg).scale ? (openBlock(), createBlock("div", {
											key: 0,
											class: "flex gap-2"
										}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "规模"), createVNode("dd", null, toDisplayString(unref(projectBg).scale), 1)])) : createCommentVNode("", true),
										unref(projectBg).role ? (openBlock(), createBlock("div", {
											key: 1,
											class: "flex gap-2"
										}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "角色"), createVNode("dd", null, toDisplayString(unref(projectBg).role), 1)])) : createCommentVNode("", true),
										unref(projectBg).techStack ? (openBlock(), createBlock("div", {
											key: 2,
											class: "flex gap-2"
										}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "技术栈"), createVNode("dd", null, toDisplayString(unref(projectBg).techStack), 1)])) : createCommentVNode("", true),
										unref(projectBg).results ? (openBlock(), createBlock("div", {
											key: 3,
											class: "flex gap-2"
										}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "成果"), createVNode("dd", null, toDisplayString(unref(projectBg).results), 1)])) : createCommentVNode("", true)
									])
								])) : createCommentVNode("", true)];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_UCard, { class: "mt-2" }, {
							default: withCtx(() => [createVNode("ul", { class: "space-y-2 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(ESSAY_SECTION_BUDGET), (section, i) => {
								return openBlock(), createBlock("li", {
									key: section.name,
									class: "flex items-center justify-between gap-2"
								}, [createVNode("span", { class: "text-default" }, toDisplayString(i + 1) + ". " + toDisplayString(section.name), 1), createVNode(_component_UBadge, {
									color: "neutral",
									variant: "subtle",
									size: "sm"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(section.budget) + " 字 ", 1)]),
									_: 2
								}, 1024)]);
							}), 128))]), unref(projectBg) ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-4 border-t border-default pt-3",
								"data-project-bg": ""
							}, [
								createVNode("p", { class: "text-xs text-muted mb-2" }, " 关联项目背景 "),
								createVNode("p", { class: "font-medium text-sm mb-2" }, toDisplayString(unref(projectBg).name), 1),
								createVNode("dl", { class: "space-y-1.5 text-xs" }, [
									unref(projectBg).scale ? (openBlock(), createBlock("div", {
										key: 0,
										class: "flex gap-2"
									}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "规模"), createVNode("dd", null, toDisplayString(unref(projectBg).scale), 1)])) : createCommentVNode("", true),
									unref(projectBg).role ? (openBlock(), createBlock("div", {
										key: 1,
										class: "flex gap-2"
									}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "角色"), createVNode("dd", null, toDisplayString(unref(projectBg).role), 1)])) : createCommentVNode("", true),
									unref(projectBg).techStack ? (openBlock(), createBlock("div", {
										key: 2,
										class: "flex gap-2"
									}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "技术栈"), createVNode("dd", null, toDisplayString(unref(projectBg).techStack), 1)])) : createCommentVNode("", true),
									unref(projectBg).results ? (openBlock(), createBlock("div", {
										key: 3,
										class: "flex gap-2"
									}, [createVNode("dt", { class: "text-muted shrink-0 w-14" }, "成果"), createVNode("dd", null, toDisplayString(unref(projectBg).results), 1)])) : createCommentVNode("", true)
								])
							])) : createCommentVNode("", true)]),
							_: 1
						})];
					}),
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_UButton, {
							block: "",
							color: "neutral",
							variant: "outline",
							icon: "i-lucide-list-checks",
							"trailing-icon": "i-lucide-chevron-down",
							class: "group [&>span:last-child]:group-data-[state=open]:rotate-180"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 写作提纲（六段结构） `);
								else return [createTextVNode(" 写作提纲（六段结构） ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_UButton, {
							block: "",
							color: "neutral",
							variant: "outline",
							icon: "i-lucide-list-checks",
							"trailing-icon": "i-lucide-chevron-down",
							class: "group [&>span:last-child]:group-data-[state=open]:rotate-180"
						}, {
							default: withCtx(() => [createTextVNode(" 写作提纲（六段结构） ")]),
							_: 1
						})];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_UTextarea, {
					modelValue: unref(content),
					"onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
					rows: 20,
					autoresize: "",
					class: "w-full font-mono",
					ui: { base: "min-h-[50vh]" },
					placeholder: "按提纲六段结构开始写作，草稿每 10 秒自动保存…",
					"data-editor": ""
				}, null, _parent));
				_push(`</div></div>`);
			}
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(finishOpen),
				"onUpdate:open": ($event) => isRef(finishOpen) ? finishOpen.value = $event : null,
				title: "完成自评",
				ui: { footer: "justify-end" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-3"${_scopeId}><p class="text-sm text-muted"${_scopeId}> 提交前请确认以下各项均已满足（当前 ${ssrInterpolate(unref(wordCount))} 字，用时 ${ssrInterpolate(Math.round(unref(durationSec) / 60))} 分钟）： </p><!--[-->`);
						ssrRenderList(unref(reviewKeys), (key) => {
							_push(ssrRenderComponent(_component_UCheckbox, {
								key,
								modelValue: unref(review)[key],
								"onUpdate:modelValue": ($event) => unref(review)[key] = $event,
								label: REVIEW_LABELS[key]
							}, null, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
					} else return [createVNode("div", { class: "space-y-3" }, [createVNode("p", { class: "text-sm text-muted" }, " 提交前请确认以下各项均已满足（当前 " + toDisplayString(unref(wordCount)) + " 字，用时 " + toDisplayString(Math.round(unref(durationSec) / 60)) + " 分钟）： ", 1), (openBlock(true), createBlock(Fragment, null, renderList(unref(reviewKeys), (key) => {
						return openBlock(), createBlock(_component_UCheckbox, {
							key,
							modelValue: unref(review)[key],
							"onUpdate:modelValue": ($event) => unref(review)[key] = $event,
							label: REVIEW_LABELS[key]
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"label"
						]);
					}), 128))])];
				}),
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UButton, {
							color: "neutral",
							variant: "ghost",
							onClick: ($event) => finishOpen.value = false
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 继续写作 `);
								else return [createTextVNode(" 继续写作 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							color: "primary",
							disabled: !unref(allChecked),
							loading: unref(finishing),
							"data-submit-finish": "",
							onClick: submitFinish
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 提交完成 `);
								else return [createTextVNode(" 提交完成 ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						onClick: ($event) => finishOpen.value = false
					}, {
						default: withCtx(() => [createTextVNode(" 继续写作 ")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_UButton, {
						color: "primary",
						disabled: !unref(allChecked),
						loading: unref(finishing),
						"data-submit-finish": "",
						onClick: submitFinish
					}, {
						default: withCtx(() => [createTextVNode(" 提交完成 ")]),
						_: 1
					}, 8, ["disabled", "loading"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/essay/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/essay/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-CsEAN9jA.mjs.map
