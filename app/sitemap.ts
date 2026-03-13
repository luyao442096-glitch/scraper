import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 你的官方顶级域名
  const baseUrl = 'https://aiscraperpro.com'

  // 1. 核心基础页面 (首页、定价页等)
  const baseRoutes = [
    '',
    '/pricing',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8, // 首页权重最高为 1.0，其他 0.8
  }))

  // 2. 你的程序化 SEO 流量页面 (随时可以在这里增加新工具！)
  const seoTools = ['scrape-amazon', 'scrape-shopify', 'scrape-zillow']
  
  const toolRoutes = seoTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // 落地页权重设为 0.9，非常重要
  }))

  // 3. 把所有地图拼在一起交给谷歌
  return [...baseRoutes, ...toolRoutes]
}