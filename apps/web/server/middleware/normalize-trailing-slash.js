export default defineEventHandler(event => {
  if (event.node.req.method !== 'GET' && event.node.req.method !== 'HEAD') return

  const url = getRequestURL(event)
  if (url.pathname.length <= 1 || !url.pathname.endsWith('/')) return

  const destination = url.pathname.replace(/\/+$/, '') + url.search
  if (destination.startsWith('//')) return
  return sendRedirect(event, destination, 301)
})
