import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import Subscription from "./subscription_model.js";
const { Schema, model } = mongoose;

const DishSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
     
      ingredient: {
        type: Number,
        required: true,
        trim: true,
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
      offer: {
        type: String,
        trim: true,
      },
      categories: {
        type: String,
        trim: true,
      },
  
  },
  {
    collection: "Dishes",
  }
);
DishSchema.plugin(uniqueValidator, {message: 'is already taken.'});
DishSchema.plugin(mongoosePaginate);
DishSchema.pre('findOneAndUpdate', function() {
  this.$where = { isDeleted: false };
});
DishSchema.post('findOneAndDelete', async function(next) {
  const subscription = await Subscription.findOneAndDelete(this.Subscription).exec();
  next();
});
const User = model("User", UserSchema);
export default User;
