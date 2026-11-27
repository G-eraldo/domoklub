import { newsletterConfig } from '../../utils/newsletter.js'

export default defineEventHandler(() => ({ enabled: newsletterConfig().enabled }))
