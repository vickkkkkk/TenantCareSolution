// Real photos via LoremFlickr, keyed to property/room subject matter and
// locked to a seed so the same slot always resolves to the same image.
// NOTE: these are unlicensed-per-photo placeholders — swap for Unsplash/Pexels
// (with an API key) or client-supplied photography before any real launch.

export function propertyImage(seed: number, tags: string[], width = 1200, height = 900) {
  return `https://loremflickr.com/${width}/${height}/${tags.join(",")}?lock=${seed}`;
}

export const exteriorTags = ["house", "exterior", "uk"];
export const livingRoomTags = ["livingroom", "interior"];
export const bedroomTags = ["bedroom", "interior"];
export const kitchenTags = ["kitchen", "interior"];
export const bathroomTags = ["bathroom", "interior"];
export const streetTags = ["street", "uk", "town"];
export const apartmentTags = ["apartment", "interior"];

const roomRotation = [exteriorTags, livingRoomTags, bedroomTags, kitchenTags, bathroomTags];

/** Cycle through exterior/living/bedroom/kitchen/bathroom shots for a gallery of `count` images. */
export function propertyGallery(seed: number, count: number, width = 1200, height = 900) {
  return Array.from({ length: count }, (_, i) =>
    propertyImage(seed * 10 + i, roomRotation[i % roomRotation.length], width, height),
  );
}
