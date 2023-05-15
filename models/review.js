import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    Feedback: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductSchema",
    },
  },
  {
    timestamps: true,
  }
);
const Review = model("Review", ReviewSchema);
export default Review;
