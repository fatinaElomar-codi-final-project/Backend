import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "Burgers",
        "Chicken",
        "Pizza",
        "Fish and Seafood",
        "Salads",
        "Snacks & Sides",
        "Breakfast",
        "Desserts",
        "Drinks",
        "Coffee and Tea",
        "Smoothies and Shakes",
        "Wraps and Sandwiches",
        "Ice Cream ",
        "kids meals",
      ],
    },
    CategoryImage: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
