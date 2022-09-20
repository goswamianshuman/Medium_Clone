import { createClient, createCurrentUserHook } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
export const config = {
  /* *
   * Find your project Id and dataset in 'sanity.json' in your studio project.
   * These are considered "public", but you can use environment vairables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   */
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-03-25",

  /*
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and bit more expensive),
   * Authenticated request (like greview) will always bypass the CDN
   */
  useCdn: process.env.NODE_ENV === "production",
};

//set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

const client = require("@sanity/client");
const scClient = client({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-03-25",
  useCdn: true,
});

const builder = imageUrlBuilder(scClient);
export function urlFor(src) {
  return builder.image(src);
}

/**
 * Set up a helper function for generating Images URLs with only the assest refresnce data in your documents.
 * Docs: https://www.sanity.io/docs/image-url
 */

export const useCurrentUser = createCurrentUserHook(config);
