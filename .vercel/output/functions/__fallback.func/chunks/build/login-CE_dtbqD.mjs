import { u as useRoute$1, _ as _sfc_main$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Card-Cufg5vwz.mjs';
import { _ as _sfc_main$1 } from './Alert-Cv2_53fX.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

//#region app/pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const hasError = computed(() => route.query.error === "1");
		const isDev = false;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UAlert = _sfc_main$1;
			const _component_UButton = _sfc_main$2;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_UCard, { class: "w-full max-w-sm" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col items-center gap-6 py-4"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}> SABench </h1>`);
						if (unref(hasError)) _push(ssrRenderComponent(_component_UAlert, {
							color: "error",
							variant: "subtle",
							title: "登录失败或账号未授权",
							class: "w-full"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UButton, {
							href: "/auth/github",
							external: "",
							size: "lg",
							block: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 使用 GitHub 登录 `);
								else return [createTextVNode(" 使用 GitHub 登录 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(isDev)) _push(ssrRenderComponent(_component_UButton, {
							href: "/auth/dev",
							external: "",
							variant: "outline",
							color: "neutral",
							block: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` 开发模式进入 `);
								else return [createTextVNode(" 开发模式进入 ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col items-center gap-6 py-4" }, [
						createVNode("h1", { class: "text-2xl font-bold" }, " SABench "),
						unref(hasError) ? (openBlock(), createBlock(_component_UAlert, {
							key: 0,
							color: "error",
							variant: "subtle",
							title: "登录失败或账号未授权",
							class: "w-full"
						})) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							href: "/auth/github",
							external: "",
							size: "lg",
							block: ""
						}, {
							default: withCtx(() => [createTextVNode(" 使用 GitHub 登录 ")]),
							_: 1
						}),
						unref(isDev) ? (openBlock(), createBlock(_component_UButton, {
							key: 1,
							href: "/auth/dev",
							external: "",
							variant: "outline",
							color: "neutral",
							block: ""
						}, {
							default: withCtx(() => [createTextVNode(" 开发模式进入 ")]),
							_: 1
						})) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = login_vue_vue_type_script_setup_true_lang_default;

export { login_default as default };
//# sourceMappingURL=login-CE_dtbqD.mjs.map
