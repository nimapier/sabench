import { d as _sfc_main$7, $ as $fetch$2 } from '../virtual/entry.mjs';
import { u as useFetch, _ as _sfc_main$2 } from './fetch-FeZ2-RLM.mjs';
import { _ as _sfc_main$1 } from './Checkbox-BZrEjx30.mjs';
import { _ as _sfc_main } from './Card-Cufg5vwz.mjs';
import { defineComponent, withAsyncContext, computed, reactive, watch, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, Fragment, renderList, vShow, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { R as PLAN_START_DATE } from '../nitro/nitro.mjs';
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

//#region app/pages/plan.vue?vue&type=script&setup=true&lang.ts
var DAY_MS = 1440 * 60 * 1e3;
var plan_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "plan",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/plan", "$KYLGewXokf")), __temp = await __temp, __restore(), __temp);
		const { data: stats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/stats", "$YmlCguSl-l")), __temp = await __temp, __restore(), __temp);
		const currentWeek = computed(() => stats.value?.data.currentWeek ?? 1);
		const doneMap = reactive({});
		watch(data, (d) => {
			for (const g of d?.data ?? []) for (const t of g.tasks) doneMap[t.id] = t.done;
		}, { immediate: true });
		const openWeeks = ref(/* @__PURE__ */ new Set());
		watch(currentWeek, (w) => {
			if (openWeeks.value.size === 0) openWeeks.value = /* @__PURE__ */ new Set([w]);
		}, { immediate: true });
		function isOpen(week) {
			return openWeeks.value.has(week);
		}
		function toggleOpen(week) {
			const next = new Set(openWeeks.value);
			if (next.has(week)) next.delete(week);
			else next.add(week);
			openWeeks.value = next;
		}
		const startMonday = (() => {
			const d = /* @__PURE__ */ new Date(`${PLAN_START_DATE}T00:00:00Z`);
			d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
			return d;
		})();
		function fmt(d) {
			return `${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
		}
		function weekRange(week) {
			const s = new Date(startMonday.getTime() + (week - 1) * 7 * DAY_MS);
			const e = new Date(s.getTime() + 6 * DAY_MS);
			return `${fmt(s)} ~ ${fmt(e)}`;
		}
		function stage(week) {
			if (week <= 6) return {
				label: "基础夯实",
				color: "primary"
			};
			if (week <= 9) return {
				label: "真题专项",
				color: "warning"
			};
			return {
				label: "全真冲刺",
				color: "error"
			};
		}
		function milestoneOf(content) {
			return content.match(/里程碑\s*(M\d)/)?.[1] ?? null;
		}
		const orderedGroups = computed(() => {
			return [...data.value?.data ?? []].sort((a, b) => {
				if (a.week === currentWeek.value) return -1;
				if (b.week === currentWeek.value) return 1;
				return a.week - b.week;
			});
		});
		function doneCount(group) {
			return group.tasks.filter((t) => doneMap[t.id]).length;
		}
		async function toggle(task, done) {
			const prev = doneMap[task.id] ?? false;
			doneMap[task.id] = done;
			try {
				await $fetch$2("/api/plan/toggle", {
					method: "POST",
					body: {
						id: task.id,
						done
					}
				});
			} catch {
				doneMap[task.id] = prev;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UBadge = _sfc_main$2;
			const _component_UProgress = _sfc_main$7;
			const _component_UCheckbox = _sfc_main$1;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 max-w-3xl mx-auto space-y-4" }, _attrs))}><h1 class="text-2xl font-bold"> 12 周备考计划 </h1>`);
			if (unref(status) === "pending") _push(`<div class="text-sm text-muted"> 加载中… </div>`);
			else {
				_push(`<!--[-->`);
				ssrRenderList(unref(orderedGroups), (group) => {
					_push(`<div${ssrRenderAttr("data-week", group.week)}>`);
					_push(ssrRenderComponent(_component_UCard, { class: group.week === unref(currentWeek) ? "ring-2 ring-primary" : "" }, {
						header: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<button type="button" class="flex w-full items-center gap-2 cursor-pointer text-left"${_scopeId}><span class="text-muted text-xs w-4"${_scopeId}>${ssrInterpolate(isOpen(group.week) ? "▼" : "▶")}</span><span class="font-semibold"${_scopeId}> W${ssrInterpolate(group.week)}（${ssrInterpolate(weekRange(group.week))}） </span>`);
								_push(ssrRenderComponent(_component_UBadge, {
									color: stage(group.week).color,
									variant: "subtle"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`${ssrInterpolate(stage(group.week).label)}`);
										else return [createTextVNode(toDisplayString(stage(group.week).label), 1)];
									}),
									_: 2
								}, _parent, _scopeId));
								if (group.week === unref(currentWeek)) _push(ssrRenderComponent(_component_UBadge, { color: "primary" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` 当前周 `);
										else return [createTextVNode(" 当前周 ")];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<span class="ml-auto text-sm text-muted"${_scopeId}>${ssrInterpolate(doneCount(group))}/${ssrInterpolate(group.tasks.length)}</span></button>`);
							} else return [createVNode("button", {
								type: "button",
								class: "flex w-full items-center gap-2 cursor-pointer text-left",
								onClick: ($event) => toggleOpen(group.week)
							}, [
								createVNode("span", { class: "text-muted text-xs w-4" }, toDisplayString(isOpen(group.week) ? "▼" : "▶"), 1),
								createVNode("span", { class: "font-semibold" }, " W" + toDisplayString(group.week) + "（" + toDisplayString(weekRange(group.week)) + "） ", 1),
								createVNode(_component_UBadge, {
									color: stage(group.week).color,
									variant: "subtle"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(stage(group.week).label), 1)]),
									_: 2
								}, 1032, ["color"]),
								group.week === unref(currentWeek) ? (openBlock(), createBlock(_component_UBadge, {
									key: 0,
									color: "primary"
								}, {
									default: withCtx(() => [createTextVNode(" 当前周 ")]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode("span", { class: "ml-auto text-sm text-muted" }, toDisplayString(doneCount(group)) + "/" + toDisplayString(group.tasks.length), 1)
							], 8, ["onClick"])];
						}),
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="space-y-3" style="${ssrRenderStyle(isOpen(group.week) ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UProgress, {
									"model-value": doneCount(group),
									max: group.tasks.length,
									size: "sm"
								}, null, _parent, _scopeId));
								_push(`<!--[-->`);
								ssrRenderList(group.tasks, (task) => {
									_push(`<div class="flex items-start gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UCheckbox, {
										"model-value": unref(doneMap)[task.id] ?? false,
										"onUpdate:modelValue": ($event) => toggle(task, $event)
									}, {
										label: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<span class="${ssrRenderClass(unref(doneMap)[task.id] ? "line-through text-muted" : "")}"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UBadge, {
													variant: "subtle",
													color: "neutral",
													class: "mr-1"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(`${ssrInterpolate(task.category)}`);
														else return [createTextVNode(toDisplayString(task.category), 1)];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(` ${ssrInterpolate(task.content)}</span>`);
												if (milestoneOf(task.content)) _push(ssrRenderComponent(_component_UBadge, {
													color: "error",
													class: "ml-1"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(`${ssrInterpolate(milestoneOf(task.content))}`);
														else return [createTextVNode(toDisplayString(milestoneOf(task.content)), 1)];
													}),
													_: 2
												}, _parent, _scopeId));
												else _push(`<!---->`);
											} else return [createVNode("span", { class: unref(doneMap)[task.id] ? "line-through text-muted" : "" }, [createVNode(_component_UBadge, {
												variant: "subtle",
												color: "neutral",
												class: "mr-1"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(task.category), 1)]),
												_: 2
											}, 1024), createTextVNode(" " + toDisplayString(task.content), 1)], 2), milestoneOf(task.content) ? (openBlock(), createBlock(_component_UBadge, {
												key: 0,
												color: "error",
												class: "ml-1"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(milestoneOf(task.content)), 1)]),
												_: 2
											}, 1024)) : createCommentVNode("", true)];
										}),
										_: 2
									}, _parent, _scopeId));
									_push(`</div>`);
								});
								_push(`<!--]--></div>`);
							} else return [withDirectives(createVNode("div", { class: "space-y-3" }, [createVNode(_component_UProgress, {
								"model-value": doneCount(group),
								max: group.tasks.length,
								size: "sm"
							}, null, 8, ["model-value", "max"]), (openBlock(true), createBlock(Fragment, null, renderList(group.tasks, (task) => {
								return openBlock(), createBlock("div", {
									key: task.id,
									class: "flex items-start gap-2"
								}, [createVNode(_component_UCheckbox, {
									"model-value": unref(doneMap)[task.id] ?? false,
									"onUpdate:modelValue": ($event) => toggle(task, $event)
								}, {
									label: withCtx(() => [createVNode("span", { class: unref(doneMap)[task.id] ? "line-through text-muted" : "" }, [createVNode(_component_UBadge, {
										variant: "subtle",
										color: "neutral",
										class: "mr-1"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(task.category), 1)]),
										_: 2
									}, 1024), createTextVNode(" " + toDisplayString(task.content), 1)], 2), milestoneOf(task.content) ? (openBlock(), createBlock(_component_UBadge, {
										key: 0,
										color: "error",
										class: "ml-1"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(milestoneOf(task.content)), 1)]),
										_: 2
									}, 1024)) : createCommentVNode("", true)]),
									_: 2
								}, 1032, ["model-value", "onUpdate:modelValue"])]);
							}), 128))], 512), [[vShow, isOpen(group.week)]])];
						}),
						_: 2
					}, _parent));
					_push(`</div>`);
				});
				_push(`<!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/plan.vue
var _sfc_setup = plan_vue_vue_type_script_setup_true_lang_default.setup;
plan_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/plan.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var plan_default = plan_vue_vue_type_script_setup_true_lang_default;

export { plan_default as default };
//# sourceMappingURL=plan-CeOxe_HN.mjs.map
