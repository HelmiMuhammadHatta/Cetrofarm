import { createAPIFileRoute } from '@tanstack/react-start/api'
import { getArticles } from '../../server/articles'

export const APIRoute = createAPIFileRoute('/api/sitemap.xml')({
  GET: async ({ request }) => {
    const baseUrl = process.env.VITE_SITE_URL || 'https://cetrofarm.com'
    const staticRoutes = [
      '',
      '/tentang',
      '/manajemen',
      '/legalitas',
      '/ekosistem',
      '/produk',
      '/penawaran',
      '/investor',
      '/artikel',
      '/testimoni',
      '/faq',
      '/kontak',
      '/kebijakan-privasi',
      '/syarat-ketentuan',
      '/keberlanjutan'
    ]
    
    let articles: any[] = []
    try {
      articles = await getArticles()
    } catch (e) {
      console.error('Failed to load articles for sitemap', e)
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map((route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
  ${articles
    .map((article) => `
    <url>
      <loc>${baseUrl}/artikel/${article.slug}</loc>
      <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `).join('')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  },
})
