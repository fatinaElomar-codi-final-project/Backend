import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

// Add the `populate()` method to populate the `product_id` field
ReviewSchema.pre("findOne", function (next) {
  this.populate("product_id");
  next();
});

const Review = model("Review", ReviewSchema);
export default Review;
