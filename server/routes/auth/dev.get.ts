export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404 })
  }
  await setUserSession(event, {
    user: {
      login: 'dev-local',
      name: 'Dev Local',
    },
  })
  return sendRedirect(event, '/')
})
