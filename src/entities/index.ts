/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: coreservices
 * Interface for CoreServices
 */
export interface CoreServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  integrationPartner?: string;
  /** @wixFieldType image */
  serviceImage?: string;
}


/**
 * Collection ID: partners
 * Interface for Partners
 */
export interface Partners {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  partnerName?: string;
  /** @wixFieldType image */
  partnerLogo?: string;
  /** @wixFieldType text */
  partnerDescription?: string;
  /** @wixFieldType url */
  partnerWebsite?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: timeline
 * Interface for Timeline
 */
export interface Timeline {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  milestoneName?: string;
  /** @wixFieldType date */
  milestoneDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
