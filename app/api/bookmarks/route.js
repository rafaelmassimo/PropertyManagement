import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSession } from "next-auth/client";

export const dynamic = "force-dynamic";

export const POST = async(request) => {
    try {
        await connectDB();
        const {propertyId} = await request.json();
        const session = await getSession();

        if(!session || !session.user) {
            return new Response("User ID is required", {status:401});
        }

        const {userId} = session.user;

        // Find User in DB
        const user = await User.findOne({_id:userId});
        if(!user) {
            new Response("User not found", {status:404});
            return;
        }

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);
        let message;

        if(isBookmarked) {
            // If is already bookmarked, remove it
            user.bookmarks= user.bookmarks.pull(propertyId);
            message = "Property removed from bookmarks";
            isBookmarked = false;
        } else {
            // If not bookmarked, do it
            user.bookmarks.push(propertyId);
            message = "Property added successfully to bookmarks";
            isBookmarked = true;
        }
        await user.save();

        return new Response(JSON.stringify({message, isBookmarked}), {status:200});

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {status: 500})
    }
}