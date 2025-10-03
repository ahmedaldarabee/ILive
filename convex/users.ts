import { mutation } from "./_generated/server";
import {v} from 'convex/values';

export const updateUser = mutation({
    args:{
        userId: v.string(),
        name: v.string(),
        email: v.string(),
    },
    handler: async(ctx,{userId,name,email}) => {
        // Handle that work with database that exist outside
        const isUserExist = await ctx.db.query("users")
        .withIndex("by_user_id",(check) => check.eq("userId",userId)).first();

        if(isUserExist){
            // if user exist, update own data
            await ctx.db.patch(isUserExist._id,{
                // data that i want to updated
                name,email
            });
            return isUserExist._id;
        }

        // create new user if isn't-Exist !
        const newUser = await ctx.db.insert("users",{
            userId,email,name
        });
        
        return newUser;
    }
})