export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://farm2global.com/#organization',
        name: 'Farm2Global',
        url: 'https://farm2global.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://farm2global.com/logo.png',
          width: 512,
          height: 512,
        },
        description:
          'AI-powered platform connecting farmers to global markets with value-added processing solutions',
        sameAs: [
          'https://twitter.com/farm2global',
          'https://facebook.com/farm2global',
          'https://linkedin.com/company/farm2global',
          'https://instagram.com/farm2global',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://farm2global.com/#website',
        url: 'https://farm2global.com',
        name: 'Farm2Global',
        description:
          "World's first all-in-one platform for agricultural transformation",
        publisher: {
          '@id': 'https://farm2global.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://farm2global.com/marketplace?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://farm2global.com/#webpage',
        url: 'https://farm2global.com',
        name: 'Farm2Global - Transform Your Farm into a Global Brand',
        isPartOf: {
          '@id': 'https://farm2global.com/#website',
        },
        description:
          'Increase your farm income by 3-5x with AI-powered consultation, value-added processing, and global marketplace access',
        breadcrumb: {
          '@id': 'https://farm2global.com/#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://farm2global.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://farm2global.com',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'AI Farming Consultation',
        description:
          'Get personalized crop recommendations and farming guidance powered by AI',
        provider: {
          '@id': 'https://farm2global.com/#organization',
        },
        areaServed: 'Worldwide',
        serviceType: 'Agricultural Consultation',
      },
      {
        '@type': 'Service',
        name: 'Value-Added Processing',
        description:
          'Transform raw crops into premium products with AI-powered suggestions',
        provider: {
          '@id': 'https://farm2global.com/#organization',
        },
        areaServed: 'Worldwide',
        serviceType: 'Agricultural Processing',
      },
      {
        '@type': 'Service',
        name: 'Global Marketplace',
        description: 'Sell your farm products to buyers worldwide',
        provider: {
          '@id': 'https://farm2global.com/#organization',
        },
        areaServed: 'Worldwide',
        serviceType: 'E-commerce Platform',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
