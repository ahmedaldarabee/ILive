import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// all properties
export const getProperties = query({
    args:{
        propertyType: v.optional(v.string()),
        status: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        bedrooms: v.optional(v.number()),
        bathrooms: v.optional(v.number()),
    },
    // Handling to args to data
    handler: async (ctx,args) => {
        let properties = await ctx.db.query("properties").collect();
        
        // Apply filters
        // These conditions are works as :
            // Firstly, if user select data
                // Then i will check if selected option not be all!
        // Then i will show result based on selected option!

        if(args.propertyType && args.propertyType !== "all"){
            properties = properties.filter(p => p.propertyType === args.propertyType)
        }
        
        if(args.status && args.status !== "all"){
            properties = properties.filter(p => p.status === args.status)
        }
        
        if(args.minPrice !== undefined){
            // Non-null Assertion Operator.
            // ! that will do typescript override where this value not be undefine or null! 
            properties = properties.filter(p => p.price >= args.minPrice!)
        }
        
        if(args.maxPrice !== undefined){
            properties = properties.filter(p => p.price <= args.maxPrice!)
        }
        
        if(args.bedrooms !== undefined){
            properties = properties.filter(p => p.bedrooms >= args.bedrooms!)
        }

        if(args.bathrooms !== undefined){
            properties = properties.filter(p => p.bathrooms >= args.bathrooms!)
        }

        // sort values based on creation time: newest first
        return properties.sort((prevValue,newValue) => newValue._creationTime - prevValue._creationTime);
    }
})

// get single property by id
export const getProperty = query({
    args:{
        id:v.id("properties")
    },
    // ctx: context
    handler: async(ctx,args) => {
        return await ctx.db.get(args.id);
    }
})

// create a new property
// mutation rather than query - to fix insert problem
// query reader to the data, can't do new changes like CRUD, where CRUD Operations needed mutation keyword

export const createProperty = mutation({
    args:{
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
    },
    handler: async(ctx,args) => {
        const propertyId = await ctx.db.insert("properties",{
            title: args.title,
            description: args.description,
            price: args.price,
            bedrooms: args.bedrooms,
            bathrooms: args.bathrooms,
            area: args.area,
            address: args.address,
            city: args.city,
            state: args.state,
            zipCode: args.zipCode,
            propertyType: args.propertyType,
            status: args.status,
            images: args.images,
            featured: args.featured || false,
        })
        return propertyId;
    }
})

// updates to the property
export const updatesProperty = mutation({
    args:{
        id:v.id("properties"),
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
            // union be as an array of values
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
        images: v.array(v.string()), //From - Cloudinary URLs
        featured: v.optional(v.boolean())
    },
    handler: async(ctx,args) => {
        // updates that be as new values
        const {id,...updates} = args;
        const propertyId = await ctx.db.patch(id,updates)
        return propertyId;
    }
})

export const deleteProperty = mutation({
    args: {
        id: v.id("properties")
    },
    handler: async(ctx,args) => {
        const {id} = args;
        await ctx.db.delete(id)
    }
})

// get featured properties

export const getFeaturedProperties = query({
    args: {},
    handler: async(ctx) => {
        return await ctx.db.query("properties").filter((q) => q.eq(q.field("featured"),true)).collect();
    }
})