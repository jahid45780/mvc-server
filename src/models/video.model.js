import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
           videoFile:{
              type:String,
              required:true
           }

           
  },{timestamps:true}
)

export const video = mongoose.model("Video", videoSchema)