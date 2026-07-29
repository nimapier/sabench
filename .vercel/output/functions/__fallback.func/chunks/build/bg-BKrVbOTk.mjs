import { _ as _sfc_main, a as _sfc_main$2, $ as $fetch$2 } from '../virtual/entry.mjs';
import { u as useFetch, _ as _sfc_main$3 } from './fetch-FeZ2-RLM.mjs';
import { _ as _sfc_main$4, E as ESSAY_DIRECTIONS } from '../_/constants.mjs';
import { _ as _sfc_main$7 } from './Checkbox-BZrEjx30.mjs';
import { _ as _sfc_main$1 } from './Card-Cufg5vwz.mjs';
import { _ as _sfc_main$6 } from './Textarea-wILrOs_D.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$5 } from './Input-DmQXC8tz.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, watch, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

//#region app/pages/essay/bg.vue?vue&type=script&setup=true&lang.ts
var bg_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "bg",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/projects", "$ibpZx28gMX")), __temp = await __temp, __restore(), __temp);
		const projects = computed(() => data.value?.data ?? []);
		const formOpen = ref(false);
		const editingId = ref(null);
		const submitting = ref(false);
		const nameError = ref("");
		const emptyForm = () => ({
			name: "",
			scale: "",
			role: "",
			techStack: "",
			results: "",
			description: "",
			directions: []
		});
		const form = reactive(emptyForm());
		function resetForm() {
			Object.assign(form, emptyForm());
			nameError.value = "";
		}
		function openCreate() {
			editingId.value = null;
			resetForm();
			formOpen.value = true;
		}
		function openEdit(p) {
			editingId.value = p.id;
			resetForm();
			Object.assign(form, {
				name: p.name,
				scale: p.scale ?? "",
				role: p.role ?? "",
				techStack: p.techStack ?? "",
				results: p.results ?? "",
				description: p.description ?? "",
				directions: p.directions ? p.directions.split(",").filter(Boolean) : []
			});
			formOpen.value = true;
		}
		watch(() => form.name, () => {
			if (nameError.value && form.name.trim()) nameError.value = "";
		});
		async function submitForm() {
			if (!form.name.trim()) {
				nameError.value = "项目名称不能为空";
				return;
			}
			submitting.value = true;
			try {
				const payload = {
					name: form.name.trim(),
					scale: form.scale || null,
					role: form.role || null,
					techStack: form.techStack || null,
					results: form.results || null,
					description: form.description || null,
					directions: form.directions
				};
				if (editingId.value) await $fetch$2(`/api/projects/${editingId.value}`, {
					method: "PUT",
					body: payload
				});
				else await $fetch$2("/api/projects", {
					method: "POST",
					body: payload
				});
				formOpen.value = false;
				await refresh();
			} finally {
				submitting.value = false;
			}
		}
		const deleteOpen = ref(false);
		const deleting = ref(null);
		const deletingLoading = ref(false);
		function confirmDelete(p) {
			deleting.value = p;
			deleteOpen.value = true;
		}
		async function doDelete() {
			if (!deleting.value) return;
			deletingLoading.value = true;
			try {
				await $fetch$2(`/api/projects/${deleting.value.id}`, { method: "DELETE" });
				deleteOpen.value = false;
				deleting.value = null;
				await refresh();
			} finally {
				deletingLoading.value = false;
			}
		}
		function directionList(p) {
			return p.directions ? p.directions.split(",").filter(Boolean) : [];
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UCard = _sfc_main$1;
			const _component_UBadge = _sfc_main$3;
			const _component_UModal = _sfc_main$4;
			const _component_UFormField = _sfc_main$1$1;
			const _component_UInput = _sfc_main$5;
			const _component_UTextarea = _sfc_main$6;
			const _component_UCheckbox = _sfc_main$7;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 max-w-6xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl font-bold"> 项目背景库 </h1><p class="text-sm text-gray-500 mt-1"> 维护论文可复用的项目背景素材 </p></div>`);
			_push(ssrRenderComponent(_component_UButton, {
				icon: "i-lucide-plus",
				onClick: openCreate
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` 新建背景 `);
					else return [createTextVNode(" 新建背景 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (!unref(projects).length) {
				_push(`<div class="flex flex-col items-center justify-center py-24 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-folder-open",
					class: "text-4xl text-gray-400 mb-4"
				}, null, _parent));
				_push(`<p class="text-gray-500 mb-2"> 还没有项目背景 </p><p class="text-sm text-gray-400 mb-6"> 创建你的第一个项目背景，写论文时可以直接引用 </p>`);
				_push(ssrRenderComponent(_component_UButton, {
					icon: "i-lucide-plus",
					onClick: openCreate
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` 新建背景 `);
						else return [createTextVNode(" 新建背景 ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
				ssrRenderList(unref(projects), (p) => {
					_push(ssrRenderComponent(_component_UCard, { key: p.id }, {
						header: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex items-start justify-between gap-2"${_scopeId}><h3 class="font-semibold truncate"${_scopeId}>${ssrInterpolate(p.name)}</h3><div class="flex gap-1 shrink-0"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-pencil",
									size: "xs",
									color: "neutral",
									variant: "ghost",
									"aria-label": "编辑",
									onClick: ($event) => openEdit(p)
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-trash-2",
									size: "xs",
									color: "error",
									variant: "ghost",
									"aria-label": "删除",
									onClick: ($event) => confirmDelete(p)
								}, null, _parent, _scopeId));
								_push(`</div></div>`);
							} else return [createVNode("div", { class: "flex items-start justify-between gap-2" }, [createVNode("h3", { class: "font-semibold truncate" }, toDisplayString(p.name), 1), createVNode("div", { class: "flex gap-1 shrink-0" }, [createVNode(_component_UButton, {
								icon: "i-lucide-pencil",
								size: "xs",
								color: "neutral",
								variant: "ghost",
								"aria-label": "编辑",
								onClick: ($event) => openEdit(p)
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								icon: "i-lucide-trash-2",
								size: "xs",
								color: "error",
								variant: "ghost",
								"aria-label": "删除",
								onClick: ($event) => confirmDelete(p)
							}, null, 8, ["onClick"])])])];
						}),
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<dl class="space-y-2 text-sm"${_scopeId}>`);
								if (p.role) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-gray-500 shrink-0 w-16"${_scopeId}>担任角色</dt><dd${_scopeId}>${ssrInterpolate(p.role)}</dd></div>`);
								else _push(`<!---->`);
								if (p.scale) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-gray-500 shrink-0 w-16"${_scopeId}>项目规模</dt><dd${_scopeId}>${ssrInterpolate(p.scale)}</dd></div>`);
								else _push(`<!---->`);
								if (p.techStack) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-gray-500 shrink-0 w-16"${_scopeId}>技术栈</dt><dd${_scopeId}>${ssrInterpolate(p.techStack)}</dd></div>`);
								else _push(`<!---->`);
								if (p.results) _push(`<div class="flex gap-2"${_scopeId}><dt class="text-gray-500 shrink-0 w-16"${_scopeId}>项目成果</dt><dd${_scopeId}>${ssrInterpolate(p.results)}</dd></div>`);
								else _push(`<!---->`);
								if (directionList(p).length) {
									_push(`<div class="flex gap-2"${_scopeId}><dt class="text-gray-500 shrink-0 w-16"${_scopeId}>适用方向</dt><dd class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
									ssrRenderList(directionList(p), (d) => {
										_push(ssrRenderComponent(_component_UBadge, {
											key: d,
											color: "primary",
											variant: "subtle",
											size: "sm"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(d)}`);
												else return [createTextVNode(toDisplayString(d), 1)];
											}),
											_: 2
										}, _parent, _scopeId));
									});
									_push(`<!--]--></dd></div>`);
								} else _push(`<!---->`);
								_push(`</dl>`);
							} else return [createVNode("dl", { class: "space-y-2 text-sm" }, [
								p.role ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex gap-2"
								}, [createVNode("dt", { class: "text-gray-500 shrink-0 w-16" }, "担任角色"), createVNode("dd", null, toDisplayString(p.role), 1)])) : createCommentVNode("", true),
								p.scale ? (openBlock(), createBlock("div", {
									key: 1,
									class: "flex gap-2"
								}, [createVNode("dt", { class: "text-gray-500 shrink-0 w-16" }, "项目规模"), createVNode("dd", null, toDisplayString(p.scale), 1)])) : createCommentVNode("", true),
								p.techStack ? (openBlock(), createBlock("div", {
									key: 2,
									class: "flex gap-2"
								}, [createVNode("dt", { class: "text-gray-500 shrink-0 w-16" }, "技术栈"), createVNode("dd", null, toDisplayString(p.techStack), 1)])) : createCommentVNode("", true),
								p.results ? (openBlock(), createBlock("div", {
									key: 3,
									class: "flex gap-2"
								}, [createVNode("dt", { class: "text-gray-500 shrink-0 w-16" }, "项目成果"), createVNode("dd", null, toDisplayString(p.results), 1)])) : createCommentVNode("", true),
								directionList(p).length ? (openBlock(), createBlock("div", {
									key: 4,
									class: "flex gap-2"
								}, [createVNode("dt", { class: "text-gray-500 shrink-0 w-16" }, "适用方向"), createVNode("dd", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(directionList(p), (d) => {
									return openBlock(), createBlock(_component_UBadge, {
										key: d,
										color: "primary",
										variant: "subtle",
										size: "sm"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(d), 1)]),
										_: 2
									}, 1024);
								}), 128))])])) : createCommentVNode("", true)
							])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(formOpen),
				"onUpdate:open": ($event) => isRef(formOpen) ? formOpen.value = $event : null,
				title: unref(editingId) ? "编辑项目背景" : "新建项目背景",
				ui: { footer: "justify-end" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, {
							label: "项目名称",
							required: "",
							error: unref(nameError) || void 0
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).name,
									"onUpdate:modelValue": ($event) => unref(form).name = $event,
									placeholder: "例如：电商中台",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).name,
									"onUpdate:modelValue": ($event) => unref(form).name = $event,
									placeholder: "例如：电商中台",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "项目规模" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).scale,
									"onUpdate:modelValue": ($event) => unref(form).scale = $event,
									placeholder: "例如：日均订单 100w，50 人团队",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).scale,
									"onUpdate:modelValue": ($event) => unref(form).scale = $event,
									placeholder: "例如：日均订单 100w，50 人团队",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "担任角色" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).role,
									"onUpdate:modelValue": ($event) => unref(form).role = $event,
									placeholder: "例如：系统架构师",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).role,
									"onUpdate:modelValue": ($event) => unref(form).role = $event,
									placeholder: "例如：系统架构师",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "技术栈" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).techStack,
									"onUpdate:modelValue": ($event) => unref(form).techStack = $event,
									placeholder: "例如：Spring Cloud / MySQL / Redis",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).techStack,
									"onUpdate:modelValue": ($event) => unref(form).techStack = $event,
									placeholder: "例如：Spring Cloud / MySQL / Redis",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "项目成果" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(form).results,
									"onUpdate:modelValue": ($event) => unref(form).results = $event,
									placeholder: "例如：上线后下单耗时降低 40%",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(form).results,
									"onUpdate:modelValue": ($event) => unref(form).results = $event,
									placeholder: "例如：上线后下单耗时降低 40%",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "项目描述" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTextarea, {
									modelValue: unref(form).description,
									"onUpdate:modelValue": ($event) => unref(form).description = $event,
									rows: 3,
									placeholder: "项目背景、业务场景等补充说明",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTextarea, {
									modelValue: unref(form).description,
									"onUpdate:modelValue": ($event) => unref(form).description = $event,
									rows: 3,
									placeholder: "项目背景、业务场景等补充说明",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, { label: "适用方向" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="grid grid-cols-2 sm:grid-cols-3 gap-2"${_scopeId}><!--[-->`);
									ssrRenderList(unref(ESSAY_DIRECTIONS), (d) => {
										_push(ssrRenderComponent(_component_UCheckbox, {
											key: d,
											modelValue: unref(form).directions,
											"onUpdate:modelValue": ($event) => unref(form).directions = $event,
											value: d,
											label: d
										}, null, _parent, _scopeId));
									});
									_push(`<!--]--></div>`);
								} else return [createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(ESSAY_DIRECTIONS), (d) => {
									return openBlock(), createBlock(_component_UCheckbox, {
										key: d,
										modelValue: unref(form).directions,
										"onUpdate:modelValue": ($event) => unref(form).directions = $event,
										value: d,
										label: d
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"value",
										"label"
									]);
								}), 128))])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(submitForm, ["prevent"])
					}, [
						createVNode(_component_UFormField, {
							label: "项目名称",
							required: "",
							error: unref(nameError) || void 0
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).name,
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								placeholder: "例如：电商中台",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}, 8, ["error"]),
						createVNode(_component_UFormField, { label: "项目规模" }, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).scale,
								"onUpdate:modelValue": ($event) => unref(form).scale = $event,
								placeholder: "例如：日均订单 100w，50 人团队",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "担任角色" }, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).role,
								"onUpdate:modelValue": ($event) => unref(form).role = $event,
								placeholder: "例如：系统架构师",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "技术栈" }, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).techStack,
								"onUpdate:modelValue": ($event) => unref(form).techStack = $event,
								placeholder: "例如：Spring Cloud / MySQL / Redis",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "项目成果" }, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(form).results,
								"onUpdate:modelValue": ($event) => unref(form).results = $event,
								placeholder: "例如：上线后下单耗时降低 40%",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "项目描述" }, {
							default: withCtx(() => [createVNode(_component_UTextarea, {
								modelValue: unref(form).description,
								"onUpdate:modelValue": ($event) => unref(form).description = $event,
								rows: 3,
								placeholder: "项目背景、业务场景等补充说明",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_UFormField, { label: "适用方向" }, {
							default: withCtx(() => [createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(ESSAY_DIRECTIONS), (d) => {
								return openBlock(), createBlock(_component_UCheckbox, {
									key: d,
									modelValue: unref(form).directions,
									"onUpdate:modelValue": ($event) => unref(form).directions = $event,
									value: d,
									label: d
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"value",
									"label"
								]);
							}), 128))])]),
							_: 1
						})
					], 32)];
				}),
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UButton, {
							color: "neutral",
							variant: "ghost",
							onClick: ($event) => formOpen.value = false
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 取消 `);
								else return [createTextVNode(" 取消 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							loading: unref(submitting),
							onClick: submitForm
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 保存 `);
								else return [createTextVNode(" 保存 ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						onClick: ($event) => formOpen.value = false
					}, {
						default: withCtx(() => [createTextVNode(" 取消 ")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_UButton, {
						loading: unref(submitting),
						onClick: submitForm
					}, {
						default: withCtx(() => [createTextVNode(" 保存 ")]),
						_: 1
					}, 8, ["loading"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(deleteOpen),
				"onUpdate:open": ($event) => isRef(deleteOpen) ? deleteOpen.value = $event : null,
				title: "删除项目背景",
				ui: { footer: "justify-end" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<p class="text-sm"${_scopeId}> 确定删除「${ssrInterpolate(unref(deleting)?.name)}」吗？该背景被论文引用时论文保留但失去关联。此操作不可撤销。 </p>`);
					else return [createVNode("p", { class: "text-sm" }, " 确定删除「" + toDisplayString(unref(deleting)?.name) + "」吗？该背景被论文引用时论文保留但失去关联。此操作不可撤销。 ", 1)];
				}),
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UButton, {
							color: "neutral",
							variant: "ghost",
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
							loading: unref(deletingLoading),
							onClick: doDelete
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 确认删除 `);
								else return [createTextVNode(" 确认删除 ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						onClick: ($event) => deleteOpen.value = false
					}, {
						default: withCtx(() => [createTextVNode(" 取消 ")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_UButton, {
						color: "error",
						loading: unref(deletingLoading),
						onClick: doDelete
					}, {
						default: withCtx(() => [createTextVNode(" 确认删除 ")]),
						_: 1
					}, 8, ["loading"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/essay/bg.vue
var _sfc_setup = bg_vue_vue_type_script_setup_true_lang_default.setup;
bg_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/essay/bg.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bg_default = bg_vue_vue_type_script_setup_true_lang_default;

export { bg_default as default };
//# sourceMappingURL=bg-BKrVbOTk.mjs.map
