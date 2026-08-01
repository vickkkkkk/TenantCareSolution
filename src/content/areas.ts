export type StaticAreaContent = {
  slug: string;
  areaName: string;
  region: string;
  heroImageSeed: number;
  intro: string[];
  stats: { value: string; label: string }[];
  whyUs: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  citySlugForListings: string | null;
};

export const staticAreas: Record<string, StaticAreaContent> = {
  london: {
    slug: "london",
    areaName: "London",
    region: "Greater London",
    heroImageSeed: 5001,
    intro: [
      "London's rental market covers more ground than any single description fits: Zone 1 studios a short walk from the City, family houses in the outer boroughs, and everything in between. What holds across all of it is that price and availability shift sharply from one postcode to the next, sometimes within the same borough — which is exactly why we tag every listing to its postcode district rather than leaving you to guess from a borough name.",
      "Transport is usually the first filter tenants apply, and London rewards that: proximity to a tube or Overground station changes both rent and demand more than almost any other factor. Typical one-bedroom rents range from the mid-£1,000s in outer zones to well over £2,000 in central boroughs, with shared rooms starting considerably lower.",
      "Tenant demographics vary by area too — young professionals cluster around commuter-friendly zones in the east and south, families favour the leafier outer boroughs, and students concentrate near the major university clusters in the centre and east. We manage lettings across all of these profiles, not just one segment of the market.",
    ],
    stats: [
      { value: "£1,850", label: "Typical 1-bed rent, inner London" },
      { value: "£1,150", label: "Typical 1-bed rent, outer London" },
      { value: "32", label: "London boroughs covered" },
      { value: "6", label: "Zones with active listings" },
    ],
    whyUs: [
      { title: "Postcode-level search", body: "Filter down to the actual district you want, not the whole borough." },
      { title: "Verified weekly", body: "Every London listing is re-checked for availability at least once a week." },
      { title: "Local agent coverage", body: "Agents assigned by borough, not spread thin across the whole city." },
    ],
    faqs: [
      { question: "Which London boroughs do you cover?", answer: "All 32, though listing density is naturally higher in boroughs with more rental stock, such as the inner east and southwest." },
      { question: "Are bills usually included in London rentals?", answer: "It varies — shared accommodation more often includes bills than whole-property lets, and each listing states this clearly." },
      { question: "How fast does a London listing usually let?", answer: "Well-priced properties in commuter-friendly areas often let within one to two weeks of listing." },
    ],
    citySlugForListings: "london",
  },

  birmingham: {
    slug: "birmingham",
    areaName: "Birmingham",
    region: "West Midlands",
    heroImageSeed: 5002,
    intro: [
      "Birmingham's rental market has grown quickly on the back of city-centre regeneration, with new-build apartments around the business district sitting alongside long-established suburban housing in areas like Moseley and Edgbaston. The two markets attract different tenants and behave differently on price.",
      "City-centre flats tend to draw young professionals and graduates staying in the city after university, with rents reflecting proximity to the business district and transport hubs. Suburban houses, meanwhile, are dominated by family and sharer demand, with larger properties in leafy areas commanding a premium over similarly-sized homes closer to the centre.",
      "Compared to London, typical rents are considerably lower across every property type, which has made Birmingham increasingly popular with investors as well as tenants relocating from the capital.",
    ],
    stats: [
      { value: "£950", label: "Typical 1-bed rent, city centre" },
      { value: "£1,250", label: "Typical 3-bed rent, suburbs" },
      { value: "12+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "City and suburb coverage", body: "Listings across both the regenerated centre and established suburban areas." },
      { title: "Fast-growing stock", body: "New-build city-centre apartments added as developments complete." },
      { title: "Local pricing knowledge", body: "Valuations that reflect actual street-level demand, not a city-wide average." },
    ],
    faqs: [
      { question: "Is Birmingham's city centre good value compared to London?", answer: "Considerably — a comparable city-centre flat typically rents for 40-50% less than an equivalent in inner London." },
      { question: "Which areas are popular with families?", answer: "Moseley, Edgbaston and Selly Oak all see strong family demand thanks to larger housing stock and good local schools." },
      { question: "Are new-build apartments common?", answer: "Yes, particularly around the business district, where several developments have completed in recent years." },
    ],
    citySlugForListings: "birmingham",
  },

  manchester: {
    slug: "manchester",
    areaName: "Manchester",
    region: "Greater Manchester",
    heroImageSeed: 5003,
    intro: [
      "Manchester's rental demand splits fairly cleanly between city-centre apartment living, concentrated around the Northern Quarter and the wider central core, and established residential areas like Chorlton and Didsbury that draw a more settled, family-oriented tenant base.",
      "The city centre has seen substantial new-build development over the past decade, and rents there have risen accordingly — often the fastest-moving segment of the local market. Further out, areas like Salford Quays combine waterside apartment developments with strong transport links back into the centre, appealing to tenants who want space without a long commute.",
      "Manchester's large student population also shapes demand near the universities, with a high concentration of shared housing and purpose-built student accommodation feeding into the wider rental market once term-time lets end.",
    ],
    stats: [
      { value: "£1,050", label: "Typical 1-bed rent, city centre" },
      { value: "£1,350", label: "Typical 2-bed rent, Chorlton/Didsbury" },
      { value: "9+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Centre and suburb split", body: "Coverage of both fast-moving city-centre stock and settled suburban housing." },
      { title: "Student-market awareness", body: "Listings flagged clearly where they suit student versus professional tenants." },
      { title: "Transport-led search", body: "Filter by proximity to Metrolink and rail links across Greater Manchester." },
    ],
    faqs: [
      { question: "Is the Northern Quarter mostly apartments?", answer: "Yes, predominantly new-build and converted apartments aimed at young professionals, with a fast-moving rental market." },
      { question: "Are Chorlton and Didsbury good for families?", answer: "Both are popular with families and sharers thanks to larger period housing stock and good transport links into the centre." },
      { question: "How does Salford Quays compare on price?", answer: "Generally a step below full city-centre rents, reflecting the slightly longer commute despite strong tram links." },
    ],
    citySlugForListings: "manchester",
  },

  glasgow: {
    slug: "glasgow",
    areaName: "Glasgow",
    region: "Scotland",
    heroImageSeed: 5004,
    intro: [
      "Glasgow's rental market runs on Scottish tenancy law, which works differently to England and Wales in a few important ways — most notably the private residential tenancy, which has no fixed end date and gives tenants more flexibility to leave with 28 days' notice. That difference shapes how both listings and management here are handled.",
      "The West End and city centre carry the highest density of flats aimed at young professionals and students, with the University of Glasgow and Strathclyde both drawing steady demand nearby. Southside neighbourhoods tend to attract families and sharers looking for more space at a lower price than the West End commands.",
      "Tenement flats — Glasgow's classic sandstone and red-brick stock — make up a large share of the rental market, alongside a growing number of new-build developments closer to the river.",
    ],
    stats: [
      { value: "£950", label: "Typical 1-bed rent, West End" },
      { value: "£800", label: "Typical 1-bed rent, Southside" },
      { value: "8+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Scottish tenancy expertise", body: "Private residential tenancies handled correctly under Scottish law, not an England-and-Wales template." },
      { title: "Tenement specialists", body: "Listings and inspections that account for shared-close maintenance and factoring arrangements." },
      { title: "West End and Southside coverage", body: "Both the student-heavy West End and family-oriented Southside covered directly." },
    ],
    faqs: [
      { question: "Are tenancies here the same as in England?", answer: "No — Scotland uses the private residential tenancy, which has no fixed end date and different notice periods for both landlords and tenants." },
      { question: "What's a factoring arrangement?", answer: "Many Glasgow tenement flats are managed under a factor who handles shared close and building maintenance — this is separate from your individual tenancy and worth understanding before signing." },
      { question: "Which area is best for students?", answer: "The West End, closest to the University of Glasgow, though Southside options tend to be more affordable for a similar commute." },
    ],
    citySlugForListings: null,
  },

  northampton: {
    slug: "northampton",
    areaName: "Northampton",
    region: "East Midlands",
    heroImageSeed: 5005,
    intro: [
      "Northampton's rental market benefits from a location roughly halfway between London and Birmingham on the mainline, which has drawn a steady stream of commuters priced out of both cities without giving up a reasonably fast route into either.",
      "Housing stock is dominated by Victorian and Edwardian terraces close to the town centre, with a substantial amount of newer estate housing on the outskirts built over the past two decades. Rents remain considerably lower than the commuter towns closer to London, which is a large part of the area's appeal.",
      "Demand splits between commuters using the mainline station and a strong local employment base, giving the market more stability than areas that rely on a single dominant tenant type.",
    ],
    stats: [
      { value: "£800", label: "Typical 1-bed rent" },
      { value: "60min", label: "Typical rail time to London Euston" },
      { value: "6+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Commuter-belt value", body: "London-commutable without London-commuter-belt pricing." },
      { title: "Mixed tenant base", body: "Local employment and commuter demand together, not reliant on one segment." },
      { title: "Established and new-build stock", body: "Victorian terraces near the centre alongside modern estates further out." },
    ],
    faqs: [
      { question: "Is Northampton a viable London commute?", answer: "Yes — mainline services to London Euston typically run around an hour, making it a realistic option for hybrid commuters." },
      { question: "Is Northampton good value compared to other commuter towns?", answer: "Generally yes — rents sit below many towns closer to London with a similar journey time." },
      { question: "What housing is most common near the centre?", answer: "Victorian and Edwardian terraces predominate close in, with new-build estates concentrated on the town's edges." },
    ],
    citySlugForListings: null,
  },

  belfast: {
    slug: "belfast",
    areaName: "Belfast",
    region: "Northern Ireland",
    heroImageSeed: 5006,
    intro: [
      "Belfast's rental market operates under its own private tenancies legislation, distinct from both England and Scotland, and has seen consistent demand growth as the city's tech and creative sectors have expanded around the Titanic Quarter and city centre.",
      "The Queen's Quarter, close to Queen's University Belfast, carries the heaviest concentration of shared and student housing, while South Belfast more broadly draws young professionals wanting proximity to the centre without student-heavy streets. Housing stock is a mix of Victorian terraces and a growing number of city-centre apartment developments.",
      "Rents remain notably lower than comparable UK cities of similar size, which has made Belfast increasingly attractive to both tenants relocating for work and landlords looking at yield.",
    ],
    stats: [
      { value: "£750", label: "Typical 1-bed rent, city centre" },
      { value: "£650", label: "Typical 1-bed rent, South Belfast" },
      { value: "7+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Local legislation handled correctly", body: "Tenancies administered under Northern Ireland's own private tenancies rules." },
      { title: "Queen's Quarter coverage", body: "Direct coverage of the city's largest student and shared-housing market." },
      { title: "Growing city-centre stock", body: "New apartment developments added as the Titanic Quarter and centre continue to expand." },
    ],
    faqs: [
      { question: "Does Northern Ireland use the same tenancy rules as England?", answer: "No — Belfast lettings are governed by Northern Ireland's own private tenancies legislation, with different deposit and notice requirements." },
      { question: "Is Belfast good value compared to other UK cities?", answer: "Yes — rents are generally lower than comparably sized cities elsewhere in the UK, for similar property standards." },
      { question: "Where's best for students?", answer: "The Queen's Quarter, directly around Queen's University Belfast, has the highest concentration of shared student housing." },
    ],
    citySlugForListings: null,
  },

  liverpool: {
    slug: "liverpool",
    areaName: "Liverpool",
    region: "North West England",
    heroImageSeed: 5007,
    intro: [
      "Liverpool's rental market has grown quickly around the waterfront and city-centre regeneration, with new-build apartments near the docks sitting alongside long-established terraced housing in inner suburbs like Aigburth and Wavertree.",
      "The city's large student population, split across the University of Liverpool, Liverpool John Moores and Liverpool Hope, sustains heavy demand for shared housing in areas close to each campus. Outside the student-heavy zones, family and professional demand concentrates in the more residential southern suburbs.",
      "Rental yields in Liverpool are consistently among the strongest of the regional cities we cover, driven by purchase prices that remain low relative to achievable rent.",
    ],
    stats: [
      { value: "£850", label: "Typical 1-bed rent, city centre" },
      { value: "£1,100", label: "Typical 3-bed rent, suburbs" },
      { value: "10+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Waterfront and suburb coverage", body: "New-build city-centre stock alongside established terraced suburbs." },
      { title: "Multi-university awareness", body: "Listings positioned clearly against all three of the city's universities." },
      { title: "Strong yield focus", body: "Valuations that reflect Liverpool's above-average rental yield profile." },
    ],
    faqs: [
      { question: "Which areas suit students best?", answer: "It depends on the university — Wavertree and Smithdown Road are popular for Liverpool and Liverpool Hope, with the city centre convenient for John Moores." },
      { question: "Is Liverpool a strong area for landlords?", answer: "Yields here are consistently among the strongest of the regional cities we cover, thanks to purchase prices remaining low relative to rent." },
      { question: "Is the waterfront mostly new-build?", answer: "Yes, the majority of waterfront and docks-area stock is new-build apartments, distinct from the older terraced housing further from the centre." },
    ],
    citySlugForListings: null,
  },

  oxford: {
    slug: "oxford",
    areaName: "Oxford",
    region: "South East England",
    heroImageSeed: 5008,
    intro: [
      "Oxford's rental market is shaped by two forces that push in the same direction: a world-renowned university drawing constant demand, and a tightly constrained green belt that limits how much new housing can be built. Together they keep rents among the highest outside London for a city of Oxford's size.",
      "University-linked shared housing dominates areas close to the colleges and East Oxford, while the science and technology employers around the city's edges support a separate, steadier demand for professional lets. Housing stock is a mix of period terraces close in and 20th-century suburban housing further out.",
      "Because supply is so constrained, well-priced properties in Oxford typically let faster than in most other cities we cover, and void periods tend to be shorter as a result.",
    ],
    stats: [
      { value: "£1,400", label: "Typical 1-bed rent, central" },
      { value: "£1,050", label: "Typical 1-bed rent, outer suburbs" },
      { value: "5+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "University and professional coverage", body: "Listings positioned for both student-linked and professional-employer demand." },
      { title: "Fast-letting market knowledge", body: "Pricing informed by Oxford's consistently short void periods." },
      { title: "Constrained-supply expertise", body: "Valuations that reflect a genuinely limited local housing stock, not a generic city average." },
    ],
    faqs: [
      { question: "Why are Oxford rents so high?", answer: "A combination of constant university-driven demand and a tightly constrained green belt limiting new housing supply keeps rents elevated relative to the city's size." },
      { question: "How fast do Oxford properties usually let?", answer: "Faster than most cities we cover — constrained supply means well-priced properties routinely generate viewings within days." },
      { question: "Is demand only from the university?", answer: "No — the science and technology employers around Oxford's edges support a significant, separate professional rental market." },
    ],
    citySlugForListings: null,
  },

  leeds: {
    slug: "leeds",
    areaName: "Leeds",
    region: "West Yorkshire",
    heroImageSeed: 5009,
    intro: [
      "Leeds has one of the fastest-growing city-centre rental markets in the north of England, driven by a large financial and legal services sector alongside a substantial student population split mainly between the University of Leeds and Leeds Beckett.",
      "City-centre apartments, many in converted mills and newer developments around the waterfront, draw young professionals working in the financial district. Headingley and Hyde Park carry the highest concentration of student and shared housing, while suburbs further out attract more settled family and professional demand.",
      "Rents have risen steadily over recent years as the city-centre employment base has grown, though Leeds remains meaningfully cheaper than comparable cities further south.",
    ],
    stats: [
      { value: "£1,000", label: "Typical 1-bed rent, city centre" },
      { value: "£750", label: "Typical room rent, Headingley" },
      { value: "9+", label: "Neighbourhoods with active listings" },
    ],
    whyUs: [
      { title: "Financial-district awareness", body: "Listings positioned against Leeds' growing professional employment base." },
      { title: "Headingley and Hyde Park coverage", body: "Direct coverage of the city's largest student and shared-housing market." },
      { title: "Converted and new-build mix", body: "Both mill conversions and newer waterfront developments covered in the city centre." },
    ],
    faqs: [
      { question: "Is Leeds good for young professionals?", answer: "Yes — the city-centre financial and legal sector has driven strong demand for professional apartment lets in recent years." },
      { question: "Where's best for students?", answer: "Headingley and Hyde Park carry the highest concentration of shared student housing, both within easy reach of the University of Leeds." },
      { question: "How does Leeds compare to cities further south?", answer: "Rents remain meaningfully lower than comparable cities in the south of England, despite steady recent growth." },
    ],
    citySlugForListings: null,
  },
};
