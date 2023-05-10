import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import Subscription from "./subscription_model.js";
const { Schema, model } = mongoose;

const OrderShema = new Schema(
  {
    type: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: String,
        required: true,
        trim: true,
      },
      User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
      },
      dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DishSchema",
      },
  },
  {
    collection: "Orders",
  }
);
OrderShema.plugin(uniqueValidator, {message: 'is already taken.'});
OrderShema.plugin(mongoosePaginate);
OrderShema.pre('findOneAndUpdate', function() {
  this.$where = { isDeleted: false };
});
OrderShema.post('findOneAndDelete', async function(next) {
  const subscription = await Subscription.findOneAndDelete(this.Subscription).exec();
  next();
});
const Order = model("Order", OrderShema);
export default Order;
