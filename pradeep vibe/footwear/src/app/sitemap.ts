import { MetadataRoute } from 'next';
import { ProductService } from '@/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  try {
    // Dynamically fetch products
    const products = await ProductService.getProducts(100);

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
