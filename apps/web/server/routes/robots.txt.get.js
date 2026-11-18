export default defineEventHandler(event => {
  const config = useRuntimeConfig()
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return config.public.siteLive === true || config.public.siteLive === 'true'
    ? `User-agent: *\nAllow: /\nSitemap: ${config.public.siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
})
