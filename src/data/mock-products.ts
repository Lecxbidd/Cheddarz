import type { ProductCategory } from "@/types/product";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/constants";

export type MockCategory = ProductCategory;

export type MockProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  unitsSold?: number;
  officialStore?: boolean;
  payOnDelivery?: boolean;
  category: MockCategory;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
};

export { CATEGORY_LABELS };

export const CLOTHING_CATEGORIES: MockCategory[] = CATEGORY_ORDER;

type CsvApparelSeed = {
  handle: string;
  title: string;
  description: string;
  gender: "men" | "women";
  price: number;
};

const CSV_APPAREL_SEEDS: CsvApparelSeed[] = [
  {
    handle: "ocean-blue-shirt",
    title: "Ocean Blue Shirt",
    description:
      "Ocean blue cotton shirt with narrow collar, buttons down the front, and long sleeves.",
    gender: "men",
    price: 50,
  },
  {
    handle: "classic-varsity-top",
    title: "Classic Varsity Top",
    description:
      "Women's casual varsity top in grey and black with button closure and embroidered detail.",
    gender: "women",
    price: 60,
  },
  {
    handle: "yellow-wool-jumper",
    title: "Yellow Wool Jumper",
    description:
      "Knitted jumper in soft wool blend with dropped shoulders and wide sleeves for cool weather.",
    gender: "women",
    price: 80,
  },
  {
    handle: "floral-white-top",
    title: "Floral White Top",
    description: "Stylish sleeveless white top with floral pattern and clean silhouette.",
    gender: "women",
    price: 75,
  },
  {
    handle: "striped-silk-blouse",
    title: "Striped Silk Blouse",
    description: "Black and red striped silk blouse with buckle collar and tailored feel.",
    gender: "women",
    price: 50,
  },
  {
    handle: "classic-leather-jacket",
    title: "Classic Leather Jacket",
    description: "Women's zipped leather jacket with adjustable belt and structured shoulders.",
    gender: "women",
    price: 80,
  },
  {
    handle: "dark-denim-top",
    title: "Dark Denim Top",
    description: "Classic dark denim top with chest pockets and long sleeves.",
    gender: "women",
    price: 60,
  },
  {
    handle: "navy-sport-jacket",
    title: "Navy Sports Jacket",
    description:
      "Long-sleeved navy waterproof jacket in polyester with soft mesh lining.",
    gender: "men",
    price: 60,
  },
  {
    handle: "dark-winter-jacket",
    title: "Soft Winter Jacket",
    description: "Thick black winter jacket with soft fleece lining for cold weather days.",
    gender: "women",
    price: 50,
  },
  {
    handle: "black-leather-bag",
    title: "Black Leather Bag",
    description: "Women's black leather shoulder bag with spacious interior.",
    gender: "women",
    price: 30,
  },
  {
    handle: "zipped-jacket",
    title: "Zipped Jacket",
    description:
      "Dark navy and light blue men's zipped waterproof jacket with chest pocket.",
    gender: "men",
    price: 65,
  },
  {
    handle: "silk-summer-top",
    title: "Silk Summer Top",
    description: "Women's silk top with short sleeves and stylish pattern accents.",
    gender: "women",
    price: 70,
  },
  {
    handle: "longsleeve-cotton-top",
    title: "Long Sleeve Cotton Top",
    description: "Black cotton women's top with long sleeves and thick hem finish.",
    gender: "women",
    price: 50,
  },
  {
    handle: "chequered-red-shirt",
    title: "Chequered Red Shirt",
    description: "Men's plaid flannel shirt with long sleeves and dual chest pockets.",
    gender: "men",
    price: 50,
  },
  {
    handle: "white-cotton-shirt",
    title: "White Cotton Shirt",
    description: "Plain white cotton shirt with long sleeves, loose collar, and front pocket.",
    gender: "women",
    price: 30,
  },
  {
    handle: "olive-green-jacket",
    title: "Olive Green Jacket",
    description: "Loose-fit olive jacket with front buttons, large pockets, and shoulder pattern.",
    gender: "women",
    price: 65,
  },
  {
    handle: "blue-silk-tuxedo",
    title: "Blue Silk Tuxedo",
    description: "Blue silk tuxedo with marbled pattern, black buttons, and formal finish.",
    gender: "men",
    price: 70,
  },
  {
    handle: "red-sports-tee",
    title: "Red Sports Tee",
    description: "Women's red sporty t-shirt with sleeve accents and small white pocket.",
    gender: "women",
    price: 50,
  },
  {
    handle: "striped-skirt-and-top",
    title: "Striped Skirt and Top",
    description: "Black cotton top with matching striped skirt for coordinated styling.",
    gender: "women",
    price: 50,
  },
  {
    handle: "led-high-tops",
    title: "LED High Tops",
    description: "Black high top shoes with green LED sole lights and lace-up closure.",
    gender: "men",
    price: 80,
  },
];

const CATEGORY_KEYWORDS: Record<MockCategory, string[]> = {
  kids_wear: ["Playtime", "Cozy", "School Day", "Weekend", "Soft Touch"],
  boys_wears: ["Athletic", "Explorer", "Urban", "Classic", "Motion"],
  girls_wear: ["Twirl", "Sparkle", "Garden", "Blossom", "Storybook"],
  ladies_wear: ["Elegant", "Chic", "Refined", "Grace", "Signature"],
  men_wear: ["Tailored", "Modern", "Executive", "Essential", "Premium"],
  adult_wear: ["Everyday", "Comfort", "Smart", "Versatile", "Relaxed"],
  street_wear: ["Drop", "City", "Hype", "Oversized", "Tech"],
  professional_wear: ["Boardroom", "Client-ready", "Structured", "Polished", "Refined"],
};

const CATEGORY_ITEMS: Record<MockCategory, string[]> = {
  kids_wear: ["Fleece Set", "Puffer Vest", "Rain Jacket", "Knit Set", "Cotton Hoodie"],
  boys_wears: ["Denim Shirt", "Bomber Jacket", "Polo Shirt", "Cargo Pants", "Training Set"],
  girls_wear: ["Pleated Dress", "Cardigan Set", "Legging Pack", "Ruffle Top", "Skirt Combo"],
  ladies_wear: ["Satin Blouse", "Midi Dress", "Cropped Jacket", "Pleated Skirt", "Tote Bag"],
  men_wear: ["Oxford Shirt", "Merino Sweater", "Chino", "Straight Jeans", "Knit Polo"],
  adult_wear: ["Relaxed Chinos", "Everyday Tee", "Zip Sweatshirt", "Structured Coat", "Jogger"],
  street_wear: ["Graphic Hoodie", "Nylon Jacket", "Tech Cargo", "Oversized Tee", "Tracker Pant"],
  professional_wear: ["Suit Pant", "Dress Shirt", "Pencil Skirt", "Blazer", "Shift Dress"],
};

/** Local assets under `public/assets/kid-wear` — Kids wear catalogue imagery */
const KID_WEAR_IMAGES = [
  "/assets/kid-wear/0d779a33-7562-442e-b689-a4956faf7695.jpg",
  "/assets/kid-wear/34c40f8a-5351-4800-b232-bcb5917a43e7.jpg",
  "/assets/kid-wear/5faa2d5e-9e51-4184-9a27-b66b2a7b8e7f.jpg",
  "/assets/kid-wear/63a9a593-a8fa-4a47-97fa-f8280feb38a6.jpg",
  "/assets/kid-wear/8ff87a53-94ab-433a-95da-bdeecfedc7ee.jpg",
  "/assets/kid-wear/b5b6d276-938d-4aa4-ba97-d7ee10ac5365.jpg",
  "/assets/kid-wear/c1571eb5-39e8-4741-811f-72c03013316c.jpg",
  "/assets/kid-wear/c54fa15d-5968-45a3-b909-f26b1286b530.jpg",
  "/assets/kid-wear/d1bd6be0-0b4f-4728-bc3e-2ccd18261263.jpg",
  "/assets/kid-wear/ecff41da-81f5-4805-9af5-c703ae5c4f3d.jpg",
  "/assets/kid-wear/f2c9b85d-e976-46c4-802c-5d06cda06305.jpg",
];

/** Girls wear — paths mirror `public/assets/girls-wear` (append new filenames when you add files). */
const GIRLS_WEAR_IMAGES = [
  "/assets/girls-wear/04ce930c02c37cdf99610f36f5ab4518.jpg",
  "/assets/girls-wear/0f4f54f3-a81e-4181-8059-390b3da06912.jpg",
  "/assets/girls-wear/102f1135-9375-499c-b23b-ae7eada2c8d1.jpg",
  "/assets/girls-wear/103381ba7cdcc7498ae95a4f2d9fb3d4.jpg",
  "/assets/girls-wear/127da0ad-7d6e-4b66-be39-85a2706a3da8.jpg",
  "/assets/girls-wear/1e3c6e71-5c03-43a4-9c1e-b0a345e8735e.jpg",
  "/assets/girls-wear/23c8440c-df69-4c1c-b083-f8479542b380.jpg",
  "/assets/girls-wear/41064944-ff1a-4387-b263-216069abdf5f.jpg",
  "/assets/girls-wear/48fd36eb-d2dc-4005-a67b-1345b60001e2.jpg",
  "/assets/girls-wear/614eWOYlj6L._AC_SY741_.jpg",
  "/assets/girls-wear/6accc1e2-6836-4d43-9b71-6b5dbedeb4eb.jpg",
  "/assets/girls-wear/b5a68fb5-5c55-4bbb-9b97-a622062dfe09.jpg",
];

/** Local assets under `public/assets/boy-wear` — Boys wears catalogue imagery */
const BOYS_WEAR_IMAGES = [
  "/assets/boy-wear/0912a368-b7db-4b26-ac4a-1649a37eb260.jpg",
  "/assets/boy-wear/285422cb-63f6-4756-a19c-91499aa00367.jpg",
  "/assets/boy-wear/2e039e8d-a714-4aa8-991b-5d512e4fcd1a.jpg",
  "/assets/boy-wear/419418ff-20d5-447a-a4aa-4888e6be724d.jpg",
  "/assets/boy-wear/75d18373-7988-45d6-966d-ed17d8ad8487.jpg",
  "/assets/boy-wear/ad1973e6-f814-4503-8844-0579e2830e59.jpg",
  "/assets/boy-wear/ce8e84e3-f7e8-4b6a-b208-8a6d9b97e7f7.jpg",
  "/assets/boy-wear/d1dce9fb-42eb-425d-be50-9c7adc64f0f2.jpg",
  "/assets/boy-wear/dc0d103a-3e15-432b-af1c-9ef4ac70d784.jpg",
  "/assets/boy-wear/e84cd9d0-7322-4b47-98b8-a080df9b605e.jpg",
  "/assets/boy-wear/ed32eb40-6395-4c1b-b9eb-770e0832d8b4.jpg",
  "/assets/boy-wear/fbd85221-d915-4be9-a36e-2a983c18a204.jpg",
];

/** Local assets under `public/assets/ladies-wear` — Ladies wear catalogue imagery */
const LADIES_WEAR_IMAGES = [
  "/assets/ladies-wear/18815828-6b49-4ca8-b50e-38b8f458a3ad.jpg",
  "/assets/ladies-wear/1d301f6f-390e-49b3-811a-b17f8f7e239a.jpg",
  "/assets/ladies-wear/1e1114f7-0a5d-481d-b34e-dfa70ff330b5.jpg",
  "/assets/ladies-wear/3b29c57b-7f42-4269-aec6-5bff57cefcec.jpg",
  "/assets/ladies-wear/3f78a1d5-f067-4f70-9fb7-c1149d993e56.jpg",
  "/assets/ladies-wear/448e4a48-1a17-40af-9c11-7c1ceefe694f.jpg",
  "/assets/ladies-wear/59eab061-e977-481f-8d8e-f22615ced07d.jpg",
  "/assets/ladies-wear/5df3888b-a8ed-4ec7-b00a-62205d4686af.jpg",
  "/assets/ladies-wear/6d9d4749-2dc1-487f-8c75-e375a4745368.jpg",
  "/assets/ladies-wear/6fe32c42-4dd2-4de6-bd6a-feb2c61c501c.jpg",
  "/assets/ladies-wear/7f0e855d-9062-45bb-9dbf-30d31c83e692.jpg",
  "/assets/ladies-wear/8fef3f33-3ee4-417d-9d99-3262f1f85f89.jpg",
  "/assets/ladies-wear/98e25bcf-3401-42d8-b371-a71417088215.jpg",
  "/assets/ladies-wear/a4558707-9431-4d7f-9f1c-a4f45845362d.jpg",
  "/assets/ladies-wear/a4d58407-1438-4cf2-881d-bfe7e899da14.jpg",
  "/assets/ladies-wear/abb0ecdf-891d-4c7f-a98b-55eb50390554.jpg",
  "/assets/ladies-wear/b3aa2483-a62a-4038-9f3c-f2d563f56087.jpg",
  "/assets/ladies-wear/bc49b679-8b0a-4ac6-bc33-a00c35d7034e.jpg",
  "/assets/ladies-wear/c1717ef6-7dc1-4e66-822f-584e8108b585.jpg",
  "/assets/ladies-wear/d3a73fc8-5cf8-45be-90c5-e4d613eb2ea5.jpg",
  "/assets/ladies-wear/f93ef0c6-b548-4586-8f66-ec3a2bc7d758.jpg",
];

/** Local assets under `public/assets/guy-wear` — Men wear catalogue imagery (`men_wear`) */
const MEN_WEAR_IMAGES = [
  "/assets/guy-wear/0dac8ddf-d448-4442-b0b3-3351aaa95f57.jpg",
  "/assets/guy-wear/19283558-d04e-4aaa-b03d-e32cb2da0923.jpg",
  "/assets/guy-wear/262cce42-8f16-4360-bca8-16e332b775fe.jpg",
  "/assets/guy-wear/32fc35e1-5ee8-4aed-afe5-08e79e4e6db4.jpg",
  "/assets/guy-wear/4ac95874-ddf4-4448-aa4b-0e62ced80ffb.jpg",
  "/assets/guy-wear/4d5ef14d-3456-4524-8ae5-22032372988e.jpg",
  "/assets/guy-wear/5e20af64-ef5e-47f0-851d-d3938a892c77.jpg",
  "/assets/guy-wear/73e994a4-303e-4fcb-8c37-29a73e7c06a4.jpg",
  "/assets/guy-wear/91394e5b-ea6f-4de6-a9d2-d90607e9b240.jpg",
  "/assets/guy-wear/96e79b15-ff6f-4e46-8e21-c5ebb22dc36d.jpg",
  "/assets/guy-wear/a63f3572-b333-40ec-a90d-f953cd2ff30c.jpg",
  "/assets/guy-wear/bc54de1b-3f8d-49e8-babc-fb9e30fb28a1.jpg",
  "/assets/guy-wear/be647b78-607c-4730-9af7-70795853ac9c.jpg",
  "/assets/guy-wear/d833bdf2-ae26-4595-9247-1e926e80386b.jpg",
  "/assets/guy-wear/f8201da6-4d52-48c5-8da1-80766bc0453f.jpg",
];

/** Local assets under `public/assets/adult-wear` — Adult wear (`adult_wear`) */
const ADULT_WEAR_IMAGES = [
  "/assets/adult-wear/2acffef9-9793-48fc-8caf-55d1828c3f03.jpg",
  "/assets/adult-wear/2b1a5b48-afb7-456a-a945-40fee85d3da7.jpg",
  "/assets/adult-wear/38a2e65b-b15f-45ba-9d69-f02778a0a386.jpg",
  "/assets/adult-wear/3ee11c42-120b-4985-adcc-b49a28874275.jpg",
  "/assets/adult-wear/61a63c38-93e4-4dca-a0fc-b7169c6f6543.jpg",
  "/assets/adult-wear/755905ef-0d69-4dfc-a9fb-49f9c2cf8843.jpg",
  "/assets/adult-wear/84038b4b-ef5a-4363-b3d6-97314363b886.jpg",
  "/assets/adult-wear/96a9590f-4e7c-48b5-8562-4159ffda6585.jpg",
  "/assets/adult-wear/99756314-8e0c-4417-b490-3f0023e66bd9.jpg",
  "/assets/adult-wear/bdcd6f4d-78a0-4ac6-a4b4-28d9bb7ac9fd.jpg",
  "/assets/adult-wear/c4a4ac7e-d50c-4f4e-ae49-b0156dee6d1f.jpg",
  "/assets/adult-wear/d1ce726f-8630-4a8d-af08-735a8810bace.jpg",
];

/** Local assets under `public/assets/casual-wear` — Professional wear (`professional_wear`) */
const PROFESSIONAL_WEAR_IMAGES = [
  "/assets/casual-wear/2acffef9-9793-48fc-8caf-55d1828c3f03.jpg",
  "/assets/casual-wear/2b1a5b48-afb7-456a-a945-40fee85d3da7.jpg",
  "/assets/casual-wear/38a2e65b-b15f-45ba-9d69-f02778a0a386.jpg",
  "/assets/casual-wear/3ee11c42-120b-4985-adcc-b49a28874275.jpg",
  "/assets/casual-wear/61a63c38-93e4-4dca-a0fc-b7169c6f6543.jpg",
  "/assets/casual-wear/755905ef-0d69-4dfc-a9fb-49f9c2cf8843.jpg",
  "/assets/casual-wear/84038b4b-ef5a-4363-b3d6-97314363b886.jpg",
  "/assets/casual-wear/96a9590f-4e7c-48b5-8562-4159ffda6585.jpg",
  "/assets/casual-wear/99756314-8e0c-4417-b490-3f0023e66bd9.jpg",
  "/assets/casual-wear/bdcd6f4d-78a0-4ac6-a4b4-28d9bb7ac9fd.jpg",
  "/assets/casual-wear/c4a4ac7e-d50c-4f4e-ae49-b0156dee6d1f.jpg",
  "/assets/casual-wear/d1ce726f-8630-4a8d-af08-735a8810bace.jpg",
];

/** Local assets under `public/assets/street-wear` — Street wear (`street_wear`) */
const STREET_WEAR_IMAGES = [
  "/assets/street-wear/02aff8ba-5362-4f0a-9061-2e8909b9c1ce.jpg",
  "/assets/street-wear/14844154-f98c-47ea-9891-61babb980e05.jpg",
  "/assets/street-wear/1ee27324-3788-4e3a-8c49-30358b3a4dee.jpg",
  "/assets/street-wear/368bed23-5439-4ea3-9ba1-2239fcf1a760.jpg",
  "/assets/street-wear/6f5b24ea-3553-485b-a6cf-b0a38a266cf6.jpg",
  "/assets/street-wear/74f644bb-f858-431f-a47e-84f1e686b1ab.gif",
  "/assets/street-wear/86ebaae1-e98a-4bde-a7ed-68d6513e4099.jpg",
  "/assets/street-wear/8b13a187-bda6-4044-8074-90facdd9094c.jpg",
  "/assets/street-wear/93573ba9-7c38-4534-99dd-45c42048bd00.jpg",
  "/assets/street-wear/95ab309f-f4a1-4dd3-ac5d-b32c750a6368.jpg",
  "/assets/street-wear/c19c3bec-dffc-46d6-8ba1-710de4271d5e.jpg",
  "/assets/street-wear/e88e2cba-1494-4ee2-bece-2a3b55f1d53c.jpg",
  "/assets/street-wear/f48a9e83-0afd-475b-b622-1783c589fffb.jpg",
  "/assets/street-wear/fa1936b0-8a48-452d-87d7-2215c5dfe782.jpg",
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imageForCategory(
  category: MockCategory,
  index: number,
  keyword: string,
  item: string
) {
  if (category === "boys_wears") {
    return BOYS_WEAR_IMAGES[index % BOYS_WEAR_IMAGES.length];
  }

  if (category === "kids_wear") {
    return KID_WEAR_IMAGES[index % KID_WEAR_IMAGES.length];
  }

  if (category === "girls_wear") {
    return GIRLS_WEAR_IMAGES[index % GIRLS_WEAR_IMAGES.length];
  }

  if (category === "ladies_wear") {
    return LADIES_WEAR_IMAGES[index % LADIES_WEAR_IMAGES.length];
  }

  if (category === "men_wear") {
    return MEN_WEAR_IMAGES[index % MEN_WEAR_IMAGES.length];
  }

  if (category === "adult_wear") {
    return ADULT_WEAR_IMAGES[index % ADULT_WEAR_IMAGES.length];
  }

  if (category === "professional_wear") {
    return PROFESSIONAL_WEAR_IMAGES[index % PROFESSIONAL_WEAR_IMAGES.length];
  }

  if (category === "street_wear") {
    return STREET_WEAR_IMAGES[index % STREET_WEAR_IMAGES.length];
  }

  return KID_WEAR_IMAGES[index % KID_WEAR_IMAGES.length];
}

function catalogImageForCategory(category: MockCategory, index: number): string {
  return imageForCategory(category, index, "", "");
}

const categories = Object.keys(CATEGORY_LABELS) as MockCategory[];
const productsPerCategory = 15;
let sequence = 1;

function mapSeedToCategory(seed: CsvApparelSeed): MockCategory {
  const text = `${seed.title} ${seed.description}`.toLowerCase();
  if (
    text.includes("tuxedo") ||
    text.includes("blazer") ||
    text.includes("formal") ||
    text.includes("oxford") ||
    text.includes("silk blouse") ||
    text.includes("striped silk")
  ) {
    return "professional_wear";
  }
  if (text.includes("bag") || text.includes("shoes") || text.includes("high top")) {
    return seed.gender === "men" ? "men_wear" : "ladies_wear";
  }
  if (
    seed.handle === "led-high-tops" ||
    seed.handle === "olive-green-jacket" ||
    seed.handle === "silk-summer-top" ||
    text.includes("sporty")
  ) {
    return "street_wear";
  }
  if (
    text.includes("jacket") ||
    text.includes("varsity") ||
    text.includes("sport") ||
    text.includes("winter jacket")
  ) {
    return "adult_wear";
  }
  return seed.gender === "men" ? "men_wear" : "ladies_wear";
}

const csvProducts: MockProduct[] = CSV_APPAREL_SEEDS.map((seed, index) => {
  const category = mapSeedToCategory(seed);
  return {
    id: `csv-${String(index + 1).padStart(3, "0")}`,
    slug: slugify(seed.handle),
    name: seed.title,
    price: seed.price,
    oldPrice: Number((seed.price * 1.2).toFixed(2)),
    rating: Number((4.4 + (index % 5) * 0.1).toFixed(1)),
    unitsSold: 120 + index * 11,
    officialStore: true,
    payOnDelivery: index % 2 === 0,
    category,
    imageUrl: catalogImageForCategory(category, index),
    description: seed.description,
    isFeatured: index < 8,
  };
});

const generatedProducts: MockProduct[] = categories.flatMap((category) => {
  const keywords = CATEGORY_KEYWORDS[category];
  const items = CATEGORY_ITEMS[category];

  return Array.from({ length: productsPerCategory }, (_, index) => {
    const keyword = keywords[index % keywords.length];
    const item = items[index % items.length];
    const name = `${keyword} ${CATEGORY_LABELS[category]} ${item}`;
    const id = `p-${String(sequence++).padStart(3, "0")}`;
    const slug = `${slugify(name)}-${id}`;
    const basePrice = 28 + (index % 5) * 14 + categories.indexOf(category) * 6;
    const price = Number((basePrice + (index % 3) * 2.5).toFixed(2));
    const oldPrice = Number((price * 1.22).toFixed(2));

    return {
      id,
      slug,
      name,
      price,
      oldPrice,
      rating: Number((4.2 + ((index + 2) % 7) * 0.1).toFixed(1)),
      unitsSold: 45 + index * 17 + categories.indexOf(category) * 23,
      officialStore: index % 3 === 0,
      payOnDelivery: index % 2 === 0,
      category,
      imageUrl: imageForCategory(category, index, keyword, item),
      description: `${name} is crafted for ${CATEGORY_LABELS[
        category
      ].toLowerCase()} shoppers, with durable fabric, comfortable fit, and premium finishing details.`,
      isFeatured: index < 3,
    };
  });
});

export const MOCK_PRODUCTS: MockProduct[] = [...csvProducts, ...generatedProducts];

const repeatedImages = (() => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const product of MOCK_PRODUCTS) {
    if (seen.has(product.imageUrl)) {
      duplicates.add(product.imageUrl);
    } else {
      seen.add(product.imageUrl);
    }
  }
  return Array.from(duplicates);
})();

if (repeatedImages.length > 0) {
  // Keep dev server alive; warn loudly instead of crashing runtime.
  console.warn(
    `[mock-products] Duplicate product image URL(s): ${repeatedImages.join(", ")}`
  );
}

