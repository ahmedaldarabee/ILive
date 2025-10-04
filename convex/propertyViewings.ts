import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createViewing = mutation({
    args:{
        propertyId:v.id("properties"),
        propertyTitle:v.string(),
        userEmail:v.string(),
        userName:v.optional(v.string()),
        viewingDate:v.string(),
        viewingTime:v.string(),
        message:v.optional(v.string()),
        createdAt:v.optional(v.number()),
        userId: v.optional(v.string()),
    },handler: async (ctx,args) => {
        
        const viewingId = await ctx.db.insert("propertyViewings",{
            ...args,
            createdAt:Date.now(),
        });

        return viewingId;
    }
})