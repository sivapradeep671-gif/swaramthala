import { Metadata } from 'next';
import { ProductService } from '@/lib/services';
import ProductClientPage from './ClientPage';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await ProductService.getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.media?.find(m => m.type === 'hero')?.url || product.media?.[0]?.url || '/og-image.jpg';


  return {
    title: product.name,
    description: product.description?.substring(0, 160) || `Buy the new ${product.name} at SOLEVA.`,
    openGraph: {
      title: `${product.name} | SOLEVA`,
      description: product.description?.substring(0, 160) || `Buy the new ${product.name} at SOLEVA.`,
      url: `/product/${product.slug}`,
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | SOLEVA`,
      description: product.description?.substring(0, 160) || `Buy the new ${product.name} at SOLEVA.`,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await ProductService.getProductBySlug(params.slug);
  
  if (!product) {
    return <ProductClientPage />;
  }

  // Generate Structured Data (JSON-LD) for SEO
  const primaryImage = product.media?.find(m => m.type === 'hero')?.url || product.media?.[0]?.url || '';
  const price = product.discount_price || product.price;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: primaryImage,
    description: product.description,
    sku: product.variants?.[0]?.id || product.id,
    brand: {
      '@type': 'Brand',
      name: 'SOLEVA',
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: price,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientPage />
    </>
  );
}
