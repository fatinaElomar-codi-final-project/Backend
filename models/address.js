
import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import Subscription from "./subscription_model.js";
const { Schema, model } = mongoose;

const AdressSchema = new Schema(
  {
   city: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
   
    Landmarks: {
      type: Number,
      required: true,
      trim: true,
    },
    UnitORApartment: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  {
    collection: "Addresses",
  }
);
AdressSchema.plugin(uniqueValidator, {message: 'is already taken.'});
AdressSchema.plugin(mongoosePaginate);
AdressSchema.pre('findOneAndUpdate', function() {
  this.$where = { isDeleted: false };
});
AdressSchema.post('findOneAndDelete', async function(next) {
  const subscription = await Subscription.findOneAndDelete(this.Subscription).exec();
  next();
});
const adress= model("adress", AdressSchema);
export default adress;


