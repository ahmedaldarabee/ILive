import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name:v.string(),
        email:v.string(),
        userId:v.string(),
    })

    // filter section
    // index in database that be smart and fast way to get data

    .index("by_user_id",["userId"]) // this way to get user by id from userId column
    .index("by_email",["email"]), // this way to get user by email from email column

    properties: defineTable({
        title:v.string(),
        description:v.string(),
        price:v.number(),
        bedrooms:v.number(),
        bathrooms:v.number(),
        area:v.number(),
        address:v.string(),
        city:v.string(),
        state:v.string(),
        zipCode:v.string(),
        propertyType:v.union(
            v.literal("house"),
            v.literal("apartment"),
            v.literal("condo"),
            v.literal("townhouse"),
        ),
        status: v.union(
            v.literal("for-sale"),
            v.literal("for-rent"),
            v.literal("sold"),
            v.literal("rented"),
        ),
        images: v.array(v.string()),
        featured: v.optional(v.boolean())
    })
})