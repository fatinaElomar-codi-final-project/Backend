import mongoose from "mongoose";

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
      dishes: {
        type: [String], 
        required: true,
        trim: true,
      },
      total_amount: {
        type: String,
        required: true,
        trim: true,
      },
    
  },
  {
    collection: "Orders",
  }
);

const Order = model("Order", OrderShema);
export default Order;
