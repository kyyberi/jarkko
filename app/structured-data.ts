import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  PROFILE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./seo";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_PAGE_ID = `${SITE_URL}/about/#profile`;
export const PROFILE_URL = absoluteUrl("/about/");
export const PERSON_IMAGE_ID = `${SITE_URL}/#primary-person-image`;
export const PERSON_IMAGE_URL = absoluteUrl(
  "/images/jarkko-hero-abudhabi-2026.webp",
);

const DGE_ID = "https://www.dge.gov.ae/#organization";
const DATA_MAESTRO_ID = `${SITE_URL}/#data-maestro-academy`;
const LFAI_ID = "https://lfaidata.foundation/#organization";
const ODPS_ID = "https://opendataproducts.org/#odps";
const MAYSANO_ID = "https://maysano.com/#software";

export const personEntity = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  alternateName: ["Dr. Jarkko Moilanen", "Jarkko Moilanen, PhD"],
  honorificSuffix: "PhD",
  url: PROFILE_URL,
  mainEntityOfPage: {
    "@id": PROFILE_PAGE_ID,
  },
  image: {
    "@id": PERSON_IMAGE_ID,
  },
  jobTitle: "Senior AI and Data Product Leader",
  description: PROFILE_DESCRIPTION,
  sameAs: [
    "https://www.linkedin.com/in/jarkkomoilanen/",
    "https://github.com/kyyberi",
    "https://www.udemy.com/user/jarkko-moilanen/",
    "https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM",
    "https://medium.com/@dr.jarkko.moilanen",
    "https://www.researchgate.net/profile/Jarkko-Moilanen",
  ],
  knowsAbout: [
    "AI strategy",
    "Data products",
    "AI product portfolios",
    "AI Centers of Excellence",
    "Digital transformation",
    "Operating models",
    "AI agents",
    "Model Context Protocol",
    "APIs",
    "Knowledge graphs",
    "Ontologies",
    "Data governance",
  ],
  worksFor: {
    "@id": DGE_ID,
  },
  affiliation: [
    {
      "@id": LFAI_ID,
    },
    {
      "@id": DATA_MAESTRO_ID,
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Tampere",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
};

const personImageEntity = {
  "@type": "ImageObject",
  "@id": PERSON_IMAGE_ID,
  url: PERSON_IMAGE_URL,
  contentUrl: PERSON_IMAGE_URL,
  width: 1122,
  height: 1402,
  caption: "Jarkko Moilanen",
};

const relatedEntities = [
  {
    "@type": "GovernmentOrganization",
    "@id": DGE_ID,
    name: "Department of Government Enablement - Abu Dhabi",
    url: "https://www.dge.gov.ae/en",
  },
  {
    "@type": "Organization",
    "@id": DATA_MAESTRO_ID,
    name: "Data Maestro Academy FZE LLC",
    url: SITE_URL,
  },
  {
    "@type": "Organization",
    "@id": LFAI_ID,
    name: "LF AI & Data Foundation",
    url: "https://lfaidata.foundation/",
    parentOrganization: {
      "@type": "Organization",
      name: "The Linux Foundation",
      url: "https://www.linuxfoundation.org/",
    },
  },
  {
    "@type": "CreativeWork",
    "@id": ODPS_ID,
    name: "Open Data Product Specification",
    url: "https://opendataproducts.org/",
    creator: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": LFAI_ID,
    },
  },
  {
    "@type": "SoftwareApplication",
    "@id": MAYSANO_ID,
    name: "Maysano",
    url: "https://maysano.com/",
    applicationCategory: "BusinessApplication",
    creator: {
      "@id": PERSON_ID,
    },
  },
];

export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        "@id": PERSON_ID,
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} | Senior AI & Data Product Leader`,
      description: DEFAULT_DESCRIPTION,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": PERSON_ID,
      },
      primaryImageOfPage: {
        "@id": PERSON_IMAGE_ID,
      },
      inLanguage: "en",
    },
    personEntity,
    personImageEntity,
    ...relatedEntities,
  ],
};

export const profilePageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": PROFILE_PAGE_ID,
      url: PROFILE_URL,
      name: `About ${SITE_NAME}`,
      description: PROFILE_DESCRIPTION,
      mainEntity: {
        "@id": PERSON_ID,
      },
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      primaryImageOfPage: {
        "@id": PERSON_IMAGE_ID,
      },
      inLanguage: "en",
    },
    personEntity,
    personImageEntity,
    ...relatedEntities,
  ],
};

type ArticleStructuredDataInput = {
  description: string;
  imageUrl: string;
  publishedAt: string;
  title: string;
  url: string;
};

export function articleStructuredData({
  description,
  imageUrl,
  publishedAt,
  title,
  url,
}: ArticleStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: title,
    description,
    image: imageUrl,
    datePublished: `${publishedAt}T00:00:00.000Z`,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: PROFILE_URL,
    },
    publisher: {
      "@id": PERSON_ID,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage: "en",
  };
}
