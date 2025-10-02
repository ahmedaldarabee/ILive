// upload named based next js app routing criteria
import {v2 as cloudinary} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest){
    try {
        // HOW THIS LINE WORK?
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if(!file){
            return NextResponse.json(
                {error:"Error, There are no files"},
                {status:401},
            )
        }

        // convert file into buffer to enable accepted it in cloudinary
        const bytes  = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // WHY HERE WE USING PROMISE NOT ANOTHER WAY?
        // When i want to upload multi image, i want to use promise?

        const result = await new Promise((resolve,reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type:"auto",
                    folder:"real-estate",
                    transformation:[{
                        width:800,
                        hight:600,
                        crop:"fill",
                        quality:"auto"
                    }]
                },

                // WHAT THIS shape called [ using resolve and reject in difference way ]?

                (error,result) => {
                    if(error) 
                        reject(error);
                    else 
                        resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            url:(result as any).secure_url
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"Error, Files wrongs uploading"},
            {status:500},
        )
    }
}