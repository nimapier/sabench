import { f as defineOAuthGitHubEventHandler, h as useRuntimeConfig, c as createError, i as setUserSession, j as sendRedirect } from '../../nitro/nitro.mjs';
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

const github_get = defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    const allowed = useRuntimeConfig().githubAllowedUser;
    if (!allowed || user.login !== allowed) {
      throw createError({ statusCode: 403, message: "\u8BE5\u8D26\u53F7\u672A\u88AB\u6388\u6743\u8BBF\u95EE" });
    }
    await setUserSession(event, {
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url
      }
    });
    return sendRedirect(event, "/");
  },
  async onError(event) {
    return sendRedirect(event, "/login?error=1");
  }
});

export { github_get as default };
//# sourceMappingURL=github.get.mjs.map
