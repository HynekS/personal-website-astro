import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage?: {
    _type: "mainImage";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative text — `string`
     *
     * Important for SEO and accessiblity.
     */
    alt?: string;
  };

  /**
   * description — `string`
   *
   *
   */
  description?: string;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * About Me
 *
 *
 */
export interface About extends SanityDocument {
  _type: "about";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Code>
  | SanityKeyed<Figure>
  | SanityKeyed<Twitter>
  | SanityKeyed<Youtube>
  | SanityKeyed<Gotcha>
  | SanityKeyed<StyledList>
  | SanityKeyed<BlockQuote>
  | SanityKeyed<Gallery>
>;

export type Figure = {
  _type: "figure";
  asset: SanityAsset;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type Twitter = {
  _type: "twitter";
  /**
   * Twitter tweet id — `string`
   *
   *
   */
  id?: string;

  /**
   * Body — `string`
   *
   *
   */
  body?: string;
};

export type Youtube = {
  _type: "youtube";
  /**
   * url — `url`
   *
   *
   */
  url?: string;
};

export type Gotcha = {
  _type: "gotcha";
  /**
   * content — `simplePortableText`
   *
   *
   */
  body?: SimplePortableText;
};

export type StyledList = {
  _type: "styledList";
  /**
   * type — `string`
   *
   *
   */
  type?: "pros" | "cons" | "prerequisities";

  /**
   * Styled list items — `array`
   *
   *
   */
  styledListItems?: Array<
    SanityKeyed<{
      _type: "styledlistItem";
      /**
       * Body — `simplePortableText`
       *
       *
       */
      body?: SimplePortableText;
    }>
  >;
};

export type SimplePortableText = Array<SanityKeyed<SanityBlock>>;

export type BlockQuote = {
  _type: "blockQuote";
  /**
   * Simple Portable Text — `array`
   *
   *
   */
  simplePortableText?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Citation — `array`
   *
   *
   */
  citation?: Array<SanityKeyed<SanityBlock>>;
};

export type Gallery = {
  _type: "gallery";
  /**
   * images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<Figure>>;
};

export type Documents = Post | Author | Category | About;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;
