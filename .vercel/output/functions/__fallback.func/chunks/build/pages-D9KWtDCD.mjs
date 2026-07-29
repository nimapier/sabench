import { a as _sfc_main$2, _ as _sfc_main$5, $ as $fetch$2 } from '../virtual/entry.mjs';
import { u as useFetch, _ as _sfc_main$4 } from './fetch-FeZ2-RLM.mjs';
import { _ as _sfc_main$3 } from './Checkbox-BZrEjx30.mjs';
import { _ as _sfc_main$1 } from './Card-Cufg5vwz.mjs';
import { _ as _sfc_main } from './Alert-Cv2_53fX.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import 'vue-router';
import 'fnv1a-64';
import 'object-identity';

//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var DAY_MS = 1440 * 60 * 1e3;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const EXAM_DATE = /* @__PURE__ */ new Date("2026-10-24T00:00:00+08:00");
		const { data: stats, refresh: refreshStats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/stats", "$QLDiuVnDZu")), __temp = await __temp, __restore(), __temp);
		const { data: plan } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/plan", "$-PAjSTj1cU")), __temp = await __temp, __restore(), __temp);
		const daysLeft = computed(() => Math.max(0, Math.ceil((EXAM_DATE.getTime() - Date.now()) / DAY_MS)));
		const studyTime = computed(() => {
			const minutes = stats.value?.data.minutesWeek ?? 0;
			return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
		});
		const essayProgress = computed(() => `${stats.value?.data.essaysDone ?? 0}/8`);
		const projectCount = computed(() => `${stats.value?.data.projects ?? 0}`);
		const taskRate = computed(() => {
			const total = stats.value?.data.tasksTotal ?? 0;
			if (total === 0) return "0%";
			return `${Math.round((stats.value?.data.tasksDone ?? 0) / total * 100)}%`;
		});
		const statCards = computed(() => [
			{
				label: "本周学习时长",
				value: studyTime.value,
				icon: "i-lucide-clock"
			},
			{
				label: "论文进度",
				value: essayProgress.value,
				icon: "i-lucide-file-text"
			},
			{
				label: "项目背景数",
				value: projectCount.value,
				icon: "i-lucide-folder"
			},
			{
				label: "本周任务完成率",
				value: taskRate.value,
				icon: "i-lucide-check-circle"
			}
		]);
		function milestoneOf(content) {
			return content.match(/里程碑\s*(M\d)/)?.[1] ?? null;
		}
		const currentWeek = computed(() => stats.value?.data.currentWeek ?? 1);
		const currentTasks = computed(() => {
			return (plan.value?.data.find((w) => w.week === currentWeek.value))?.tasks ?? [];
		});
		async function toggleTask(task, done) {
			const next = done === true;
			const prev = task.done;
			task.done = next;
			try {
				await $fetch$2("/api/plan/toggle", {
					method: "POST",
					body: {
						id: task.id,
						done: next
					}
				});
				await refreshStats();
			} catch {
				task.done = prev;
			}
		}
		const quickLinks = [
			{
				label: "去写论文",
				to: "/essay",
				icon: "i-lucide-pen-line"
			},
			{
				label: "维护项目背景",
				to: "/essay/bg",
				icon: "i-lucide-folder-cog"
			},
			{
				label: "看完整计划",
				to: "/plan",
				icon: "i-lucide-calendar"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UAlert = _sfc_main;
			const _component_UCard = _sfc_main$1;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$4;
			const _component_UCheckbox = _sfc_main$3;
			const _component_UButton = _sfc_main$5;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-6xl space-y-6 p-4 py-8" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_UAlert, {
				color: "primary",
				variant: "subtle",
				icon: "i-lucide-calendar-clock",
				title: `距 2026-10-24 考试还剩 ${unref(daysLeft)} 天`,
				description: `当前第 ${unref(currentWeek)} 周 / 共 12 周，保持节奏。`
			}, null, _parent));
			_push(`<div class="grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(unref(statCards), (card) => {
				_push(ssrRenderComponent(_component_UCard, {
					key: card.label,
					"data-stat-card": ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="flex items-center gap-3"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: card.icon,
								class: "size-8 text-primary"
							}, null, _parent, _scopeId));
							_push(`<div${_scopeId}><p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(card.label)}</p><p class="text-2xl font-bold text-highlighted" data-stat-value${_scopeId}>${ssrInterpolate(card.value)}</p></div></div>`);
						} else return [createVNode("div", { class: "flex items-center gap-3" }, [createVNode(_component_UIcon, {
							name: card.icon,
							class: "size-8 text-primary"
						}, null, 8, ["name"]), createVNode("div", null, [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(card.label), 1), createVNode("p", {
							class: "text-2xl font-bold text-highlighted",
							"data-stat-value": ""
						}, toDisplayString(card.value), 1)])])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(_component_UCard, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-center justify-between"${_scopeId}><h2 class="font-semibold text-highlighted"${_scopeId}> 本周任务（第 ${ssrInterpolate(unref(currentWeek))} 周） </h2>`);
						_push(ssrRenderComponent(_component_UBadge, {
							color: "neutral",
							variant: "subtle"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(currentTasks).filter((t) => t.done).length)}/${ssrInterpolate(unref(currentTasks).length)} 已完成 `);
								else return [createTextVNode(toDisplayString(unref(currentTasks).filter((t) => t.done).length) + "/" + toDisplayString(unref(currentTasks).length) + " 已完成 ", 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h2", { class: "font-semibold text-highlighted" }, " 本周任务（第 " + toDisplayString(unref(currentWeek)) + " 周） ", 1), createVNode(_component_UBadge, {
						color: "neutral",
						variant: "subtle"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(currentTasks).filter((t) => t.done).length) + "/" + toDisplayString(unref(currentTasks).length) + " 已完成 ", 1)]),
						_: 1
					})])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(currentTasks).length) {
						_push(`<ul class="divide-y divide-default"${_scopeId}><!--[-->`);
						ssrRenderList(unref(currentTasks), (task) => {
							_push(`<li class="flex items-start gap-3 py-3"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UCheckbox, {
								"model-value": task.done,
								class: "mt-0.5",
								"onUpdate:modelValue": ($event) => toggleTask(task, $event)
							}, null, _parent, _scopeId));
							_push(`<div class="min-w-0"${_scopeId}><p class="${ssrRenderClass([task.done ? "text-muted line-through" : "text-default", "text-sm"])}"${_scopeId}>${ssrInterpolate(task.content)}</p><div class="mt-1 flex items-center gap-2"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UBadge, {
								size: "sm",
								color: "neutral",
								variant: "outline"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(task.category)}`);
									else return [createTextVNode(toDisplayString(task.category), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							if (milestoneOf(task.content)) _push(ssrRenderComponent(_component_UBadge, {
								size: "sm",
								color: "error",
								variant: "subtle"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(milestoneOf(task.content))}`);
									else return [createTextVNode(toDisplayString(milestoneOf(task.content)), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div></div></li>`);
						});
						_push(`<!--]--></ul>`);
					} else _push(`<p class="py-4 text-center text-sm text-muted"${_scopeId}> 本周暂无任务 </p>`);
					else return [unref(currentTasks).length ? (openBlock(), createBlock("ul", {
						key: 0,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(currentTasks), (task) => {
						return openBlock(), createBlock("li", {
							key: task.id,
							class: "flex items-start gap-3 py-3"
						}, [createVNode(_component_UCheckbox, {
							"model-value": task.done,
							class: "mt-0.5",
							"onUpdate:modelValue": ($event) => toggleTask(task, $event)
						}, null, 8, ["model-value", "onUpdate:modelValue"]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: ["text-sm", task.done ? "text-muted line-through" : "text-default"] }, toDisplayString(task.content), 3), createVNode("div", { class: "mt-1 flex items-center gap-2" }, [createVNode(_component_UBadge, {
							size: "sm",
							color: "neutral",
							variant: "outline"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(task.category), 1)]),
							_: 2
						}, 1024), milestoneOf(task.content) ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							size: "sm",
							color: "error",
							variant: "subtle"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(milestoneOf(task.content)), 1)]),
							_: 2
						}, 1024)) : createCommentVNode("", true)])])]);
					}), 128))])) : (openBlock(), createBlock("p", {
						key: 1,
						class: "py-4 text-center text-sm text-muted"
					}, " 本周暂无任务 "))];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex flex-wrap gap-3"><!--[-->`);
			ssrRenderList(quickLinks, (link) => {
				_push(ssrRenderComponent(_component_UButton, {
					key: link.to,
					to: link.to,
					icon: link.icon,
					size: "lg",
					variant: "outline",
					color: "neutral"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-D9KWtDCD.mjs.map
