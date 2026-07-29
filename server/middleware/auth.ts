export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  if (!pathname.startsWith('/api/') || pathname.startsWith('/api/_auth')) {
    return
  }
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
