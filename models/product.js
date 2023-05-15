import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";
// import mongoosePaginate from "mongoose-paginate-v2";
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
    // offer: {
    //   type: String,
    //   trim: true,
    // },
    category_id: {
      type: String,
      trim: true,
      ref: "CategorySchema",

    },
  },
  {
    collection: "Dishes",
  }
);

const Products = model("Dishs", ProductSchema);
export default Products;
