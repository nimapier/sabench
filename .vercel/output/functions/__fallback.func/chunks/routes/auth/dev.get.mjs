import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
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

const dev_get = defineEventHandler(async (event) => {
  {
    throw createError({ statusCode: 404 });
  }
});

export { dev_get as default };
//# sourceMappingURL=dev.get.mjs.map
