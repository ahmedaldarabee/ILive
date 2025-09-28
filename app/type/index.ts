import { Doc } from "@/convex/_generated/dataModel";

export type Property = Doc<"properties">;
export type PropertyType = "house" | "apartment" | "condo" | "townhouse"
export type PropertyStatus = "for-sale" | "for-rent" | "sold" | "rented"

export interface PropertyFilters {
    propertyType?:string,
    status?:string,
    minPrice?:number,
    maxPrice?:number,
    bedrooms?:number,
    bathrooms?:number,
}