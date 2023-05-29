import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dishImage: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      type: String,
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "Dishes",
    timestamps: true,
  }
);

// Add the `populate()` method to populate the `category_id` field with the category name
ProductSchema.pre(["findOne", "find"], function (next) {
  this.populate({
    path: "category_id",
    select: "name",
  });
  next();
});

const Product = model("Product", ProductSchema);
export default Product;

// Retrieve all categories based on category_id
export const getCategoriesByProductId = async (productId) => {
  try {
    const product = await Product.findById(productId).populate({
      path: "category_id",
      select: "name",
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const category = product.category_id;
    if (!category) {
      throw new Error("Category not found");
    }
    return category.name;
  } catch (error) {
    throw new Error(error.message);
  }































































































































  
};
