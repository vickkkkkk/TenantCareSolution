import { PrismaClient, PricePeriod, Furnishing, Role, type City, type Area } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { propertyImage, propertyGallery, streetTags, exteriorTags } from "../src/lib/property-image";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// A believable (not real) UK postcode for a given district prefix, e.g. "E1" -> "E1 7QB"
function fakePostcode(district: string) {
  const sector = Math.floor(Math.random() * 9) + 1;
  const letters = "ABDEFGHJLNPQRSTUWXYZ";
  const l1 = letters[Math.floor(Math.random() * letters.length)];
  const l2 = letters[Math.floor(Math.random() * letters.length)];
  return `${district} ${sector}${l1}${l2}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.auditLogEntry.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.favourite.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.media.deleteMany();
  await prisma.property.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.post.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.page.deleteMany();
  await prisma.valuationRequest.deleteMany();
  await prisma.tenantRegistration.deleteMany();
  await prisma.user.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.category.deleteMany();
  await prisma.status.deleteMany();
  await prisma.area.deleteMany();
  await prisma.city.deleteMany();
  await prisma.state.deleteMany();

  console.log("Seeding states...");
  const [england, greaterLondon, scotland, wales] = await Promise.all(
    ["England", "Greater London", "Scotland", "Wales"].map((name) =>
      prisma.state.create({ data: { name, slug: slugify(name) } }),
    ),
  );

  console.log("Seeding cities and areas...");
  const cityDefs = [
    {
      name: "London",
      state: greaterLondon,
      districts: ["E1", "SE12", "NW3", "W5", "SW11", "N4", "E14"],
      areas: ["Poplar", "Uxbridge", "Wembley", "Northolt", "Clapham", "Hackney"],
      seoBlurb:
        "London rentals span everything from Zone 1 studios to family houses in the outer boroughs. Our listings cover the full spread of postcodes, so filtering by borough and postcode district actually narrows things down.",
    },
    {
      name: "Manchester",
      state: england,
      districts: ["M1", "M4", "M14", "M20", "M32"],
      areas: ["Northern Quarter", "Chorlton", "Didsbury", "Salford Quays"],
      seoBlurb:
        "Manchester's rental market runs from city-centre apartments near Piccadilly to family homes in Chorlton and Didsbury. Prices and stock differ a lot street by street, which is why we list at postcode level.",
    },
    {
      name: "Birmingham",
      state: england,
      districts: ["B1", "B13", "B29", "B31"],
      areas: ["Digbeth", "Moseley", "Selly Oak", "Edgbaston"],
      seoBlurb:
        "Birmingham combines a fast-growing city-centre rental scene with established suburbs like Moseley and Edgbaston. Both routes show up in this list, filtered by the same postcode-first system.",
    },
    {
      name: "Nottingham",
      state: england,
      districts: ["NG1", "NG7", "NG9"],
      areas: ["Lenton", "Beeston", "The Park"],
      seoBlurb:
        "Nottingham's rental demand is split between student housing near the universities and family lets further out. We tag both clearly so you're not wading through the wrong category.",
    },
    {
      name: "Bradford",
      state: england,
      districts: ["BD1", "BD9", "BD14"],
      areas: ["Heaton", "Shipley Fringe", "Great Horton"],
      seoBlurb:
        "Bradford offers some of the most affordable rental stock in the north of England, from terraced houses to renovated mill conversions. Listings here are checked and re-verified every week.",
    },
  ];

  const cities: { city: City; areas: Area[]; districts: string[]; stateId: string }[] = [];
  for (const def of cityDefs) {
    const city = await prisma.city.create({
      data: {
        name: def.name,
        slug: slugify(def.name),
        stateId: def.state.id,
        seoBlurb: def.seoBlurb,
        heroImage: propertyImage(1000 + cities.length, streetTags, 1600, 450),
      },
    });
    const areas = await Promise.all(
      def.areas.map((areaName) =>
        prisma.area.create({
          data: { name: areaName, slug: slugify(`${def.name}-${areaName}`), cityId: city.id },
        }),
      ),
    );
    cities.push({ city, areas, districts: def.districts, stateId: def.state.id });
  }

  console.log("Seeding categories...");
  const houses = await prisma.category.create({ data: { name: "Houses", slug: "houses" } });
  const flats = await prisma.category.create({ data: { name: "Flats & Apartments", slug: "flats-apartments" } });
  const shared = await prisma.category.create({ data: { name: "Shared Accommodation", slug: "shared-accommodation" } });

  const categoryChildren = await Promise.all([
    prisma.category.create({ data: { name: "Detached House", slug: "detached-house", parentId: houses.id } }),
    prisma.category.create({ data: { name: "Semi-Detached House", slug: "semi-detached-house", parentId: houses.id } }),
    prisma.category.create({ data: { name: "Terraced House", slug: "terraced-house", parentId: houses.id } }),
    prisma.category.create({ data: { name: "Studio Flat", slug: "studio-flat", parentId: flats.id } }),
    prisma.category.create({ data: { name: "1 Bed Flat", slug: "1-bed-flat", parentId: flats.id } }),
    prisma.category.create({ data: { name: "2 Bed Flat", slug: "2-bed-flat", parentId: flats.id } }),
    prisma.category.create({ data: { name: "Room in a Shared Flat", slug: "room-in-a-shared-flat", parentId: shared.id } }),
    prisma.category.create({ data: { name: "Room in a Shared House", slug: "room-in-a-shared-house", parentId: shared.id } }),
  ]);

  console.log("Seeding statuses...");
  const [available, letAgreed, underOffer] = await Promise.all(
    ["Available", "Let Agreed", "Under Offer"].map((name) =>
      prisma.status.create({ data: { name, slug: slugify(name) } }),
    ),
  );

  console.log("Seeding features...");
  const featureNames = [
    "CCTV",
    "Washer & Dryer",
    "WiFi",
    "Parking",
    "Garden",
    "Bills Included",
    "Furnished",
    "Pets Allowed",
    "Balcony",
    "Dishwasher",
    "En-suite",
    "Concierge",
  ];
  const features = await Promise.all(
    featureNames.map((name) => prisma.feature.create({ data: { name, slug: slugify(name) } })),
  );

  console.log("Seeding users and agents...");
  const admin = await prisma.user.create({
    data: { email: "admin@tenant-care-solution.test", name: "Portal Admin", role: Role.ADMIN },
  });

  const landlords = await Promise.all(
    ["Priya Anand", "Tom Whitfield"].map((name) =>
      prisma.user.create({
        data: { email: `${slugify(name)}@tenant-care-solution.test`, name, role: Role.LANDLORD },
      }),
    ),
  );

  const teamMembers = [
    {
      name: "Waqar Hafeez",
      jobTitle: "Director",
      bio: "Sets the standard the rest of the team is held to — response times, inspection frequency, how fast a maintenance job gets triaged. Oversees the whole letting and management operation across every city we cover.",
    },
    {
      name: "Faraz Hafeez",
      jobTitle: "Operations Manager",
      bio: "Runs the day-to-day: compliance deadlines, agent workload, and making sure nothing falls through the gap between a landlord's expectation and what actually happens on the ground.",
    },
    {
      name: "Hassan Khan",
      jobTitle: "Senior Lettings Negotiator",
      bio: "Handles the highest-volume patch on the team — viewings, applications and referencing, mostly across London and the South East. Usually the first person a new tenant speaks to.",
    },
    {
      name: "Asad Khan",
      jobTitle: "Property Manager",
      bio: "Coordinates maintenance and inspections on managed properties, and is the point of contact landlords hear from when something needs a decision.",
    },
    {
      name: "Idrees Khan",
      jobTitle: "Lettings Negotiator",
      bio: "Runs viewings and processes applications for tenants searching across our regional cities, from first enquiry through to signed tenancy.",
    },
    {
      name: "Muhammad Ashraf",
      jobTitle: "Compliance & Maintenance Coordinator",
      bio: "Tracks gas safety, EICR and EPC renewal dates across every managed property, and books in the contractor network before a certificate has the chance to lapse.",
    },
  ];

  const agentUsers = await Promise.all(
    teamMembers.map((member) =>
      prisma.user.create({
        data: { email: `${slugify(member.name)}@tenant-care-solution.test`, name: member.name, role: Role.AGENT },
      }),
    ),
  );
  const agents = await Promise.all(
    agentUsers.map((user, i) =>
      prisma.agent.create({
        data: {
          userId: user.id,
          slug: slugify(teamMembers[i].name),
          name: teamMembers[i].name,
          jobTitle: teamMembers[i].jobTitle,
          photo: `/agents/${slugify(teamMembers[i].name)}.jpg`,
          phone: `020 7946 01${String(i).padStart(2, "0")}`,
          email: user.email,
          bio: teamMembers[i].bio,
          licence: `PRS-${10000 + i}`,
        },
      }),
    ),
  );

  console.log("Seeding properties...");
  const titleTemplates = [
    (beds: number, area: string) => `${beds}-bedroom home near ${area}`,
    (beds: number, area: string) => `Bright ${beds}-bed let in ${area}`,
    (beds: number, area: string) => `Well-kept ${beds}-bedroom property, ${area}`,
    (beds: number, area: string) => `Modern ${beds}-bed rental close to ${area}`,
  ];

  const descriptionTemplates = [
    (beds: number, city: string) =>
      `A ${beds}-bedroom property in ${city}, recently redecorated throughout. Close to local transport links, shops and schools. Available to view by appointment.`,
    (beds: number, city: string) =>
      `This ${beds}-bedroom rental in ${city} offers good-sized rooms and a practical layout. The area has strong transport connections and everyday amenities within easy reach.`,
    (beds: number, city: string) =>
      `A well-presented ${beds}-bedroom home in ${city}, suited to professionals or a small family. Neutral decor throughout and ready for immediate move-in.`,
  ];

  let seed = 1;
  const properties: { id: string }[] = [];

  for (let i = 0; i < 30; i++) {
    const cityGroup = cities[i % cities.length];
    const area = pick(cityGroup.areas);
    const district = pick(cityGroup.districts);
    const category = pick(categoryChildren);
    const isRoom = category.slug.startsWith("room-in");
    const beds = isRoom ? 1 : Math.floor(Math.random() * 4) + 1;
    const baths = isRoom ? 1 : Math.min(beds, Math.floor(Math.random() * 2) + 1);
    const basePrice = isRoom ? 450 + Math.floor(Math.random() * 300) : 700 + beds * 250 + Math.floor(Math.random() * 300);
    const status = i % 9 === 0 ? letAgreed : i % 13 === 0 ? underOffer : available;
    const furnishing = pick([Furnishing.FURNISHED, Furnishing.PART_FURNISHED, Furnishing.UNFURNISHED]);
    const owner = pick(landlords);
    const agent = pick(agents);
    const chosenFeatures = [...features].sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 4));

    const title = pick(titleTemplates)(beds, area.name);
    const slug = slugify(`${title}-${district}-${i}`);

    const property = await prisma.property.create({
      data: {
        slug,
        title,
        description: pick(descriptionTemplates)(beds, cityGroup.city.name),
        excerpt: `${beds} bed · ${area.name}, ${cityGroup.city.name}`,
        price: basePrice,
        pricePeriod: PricePeriod.PCM,
        deposit: basePrice * 1.5,
        billsIncluded: chosenFeatures.some((f) => f.slug === "bills-included"),
        bedrooms: beds,
        bathrooms: baths,
        receptions: isRoom ? 0 : Math.floor(Math.random() * 2),
        sizeSqft: 350 + beds * 150 + Math.floor(Math.random() * 200),
        furnishing,
        epcRating: pick(["B", "C", "D"]),
        councilTaxBand: pick(["A", "B", "C", "D"]),
        availableFrom: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
        addressLine1: `${10 + i} ${area.name} Road`,
        postcode: fakePostcode(district),
        latitude: 51.5 + (Math.random() - 0.5) * 3,
        longitude: -0.1 + (Math.random() - 0.5) * 3,
        cityId: cityGroup.city.id,
        areaId: area.id,
        stateId: cityGroup.stateId,
        categoryId: category.id,
        statusId: status.id,
        agentId: agent.id,
        ownerId: owner.id,
        published: true,
        featured: i % 6 === 0,
        features: { connect: chosenFeatures.map((f) => ({ id: f.id })) },
        images: {
          create: propertyGallery(seed, 3).map((url, n) => ({
            url,
            alt: `${category.name} at ${area.name}, ${cityGroup.city.name}`,
            order: n,
            isPrimary: n === 0,
          })),
        },
      },
    });

    properties.push(property);
    seed++;
  }

  console.log("Seeding blog...");
  const guidesCategory = await prisma.postCategory.create({ data: { name: "Guides", slug: "guides" } });
  const marketCategory = await prisma.postCategory.create({ data: { name: "Market updates", slug: "market-updates" } });
  const landlordCategory = await prisma.postCategory.create({ data: { name: "Landlord tips", slug: "landlord-tips" } });

  const posts = [
    {
      title: "What actually changes when a fixed-term tenancy rolls into a periodic one",
      slug: "fixed-term-to-periodic-tenancy",
      categoryId: landlordCategory.id,
      excerpt: "The rules don't reset when a tenancy goes periodic — here's what stays the same and what doesn't.",
      content:
        "When a fixed-term assured shorthold tenancy ends without a new agreement being signed, it doesn't simply expire — it rolls into what's called a statutory periodic tenancy, continuing on largely the same terms as before.\n\nThe rent stays the same, the deposit remains protected under the same scheme, and the notice periods a landlord must give don't shrink just because the tenancy is no longer fixed. What does change is flexibility: a periodic tenancy can be ended by a tenant giving a full rental period's notice, rather than being locked in until a fixed end date.\n\nMany landlords assume they need to draw up a new contract every year to keep things enforceable. In practice, letting a tenancy roll periodic is often simpler and cheaper, provided the original agreement was drafted with that in mind. Where it causes problems is when landlords haven't kept track of which regime a tenancy is under, and serve the wrong type of notice as a result.",
      coverSeed: 6001,
    },
    {
      title: "Reading a rental yield number without fooling yourself",
      slug: "reading-rental-yield-numbers",
      categoryId: marketCategory.id,
      excerpt: "Gross yield looks good on a spreadsheet. Net yield is what actually pays your mortgage.",
      content:
        "Gross rental yield is the easiest number to calculate and the easiest one to be misled by. Divide annual rent by purchase price, and a property in a lower-cost city can look dramatically more attractive than one in London — right up until maintenance, management fees, insurance and void periods get factored in.\n\nNet yield strips those costs out, and it's the number that actually reflects what lands in your account. A property advertised at an 8% gross yield can easily come down to 5% net once realistic costs are applied, and that gap tends to be wider on older housing stock with higher maintenance needs.\n\nThe other figure worth tracking is void period risk — how long a property typically sits empty between tenancies in that specific area. A slightly lower yield in a fast-letting location often outperforms a higher one where properties regularly sit vacant for six or eight weeks.",
      coverSeed: 6002,
    },
    {
      title: "The HMO licensing thresholds landlords get wrong most often",
      slug: "hmo-licensing-thresholds-explained",
      categoryId: guidesCategory.id,
      excerpt: "Five occupants isn't always the trigger — additional and selective licensing catch smaller properties too.",
      content:
        "Mandatory HMO licensing kicks in for any property let to five or more people from two or more households who share facilities, regardless of the number of storeys. That much is fairly well known. What trips landlords up is assuming that's the only threshold that matters.\n\nMany councils run additional licensing schemes covering smaller HMOs in their area — sometimes as few as three occupants from two households — and selective licensing schemes that apply to any rental property at all within a designated zone, HMO or not. Both are set locally, which means a property that needs no licence in one borough might need one just a few streets over in the next.\n\nThe practical fix is simple but often skipped: check directly with the local council for the specific property address before assuming a licence isn't required, rather than relying on the mandatory national threshold alone.",
      coverSeed: 6003,
    },
    {
      title: "Why identical flats in the same building rent for different prices",
      slug: "why-identical-flats-rent-differently",
      categoryId: marketCategory.id,
      excerpt: "Floor, aspect and even which side of the corridor a flat sits on move the achievable rent more than people expect.",
      content:
        "Two flats with the same floor plan in the same building routinely rent for meaningfully different amounts, and it isn't random. Floor level matters — higher floors with a view or better light command a premium, while ground floor units near communal entrances or bin stores often rent for less.\n\nAspect plays a bigger role than most landlords expect. A south-facing flat with natural light through the afternoon consistently lets faster and for slightly more than a north-facing equivalent, even when every other spec is identical on paper.\n\nNoise sources — a lift shaft, a main road, a bar below street level — also show up in how long a property takes to let, even if the eventual achieved rent doesn't move much. When valuing a property, it's worth comparing it against the closest possible match in the same building, not just the same postcode, before settling on an asking price.",
      coverSeed: 6004,
    },
  ];

  const admin2 = admin;
  for (const post of posts) {
    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: propertyImage(post.coverSeed, exteriorTags, 1200, 630),
        authorId: admin2.id,
        categoryId: post.categoryId,
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  console.log("Updating city listing counts...");
  for (const group of cities) {
    const count = await prisma.property.count({ where: { cityId: group.city.id, published: true } });
    await prisma.city.update({ where: { id: group.city.id }, data: { listingCount: count } });
  }

  console.log("Seeding testimonials...");
  await prisma.testimonial.createMany({
    data: [
      { authorName: "Aisha R., landlord", quote: "Rent lands on the same day every month, no chasing needed.", rating: 5 },
      { authorName: "Daniel K., tenant", quote: "Reported a leak on a Sunday, someone was out by Tuesday morning.", rating: 5 },
      { authorName: "Grace O., landlord", quote: "Switched agencies after years of vague updates. This is the first one that actually calls back.", rating: 4 },
    ],
  });

  console.log(`Seeded ${properties.length} properties across ${cities.length} cities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
