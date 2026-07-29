export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    const allowed = useRuntimeConfig().githubAllowedUser
    if (!allowed || user.login !== allowed) {
      throw createError({ statusCode: 403, message: '该账号未被授权访问' })
    }
    await setUserSession(event, {
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
      },
    })
    return sendRedirect(event, '/')
  },
  async onError(event) {
    return sendRedirect(event, '/login?error=1')
  },
})
