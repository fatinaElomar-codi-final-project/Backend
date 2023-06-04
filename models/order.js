import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ordertype: {
      type: String,
      enum: ["delivery", "local order", "takeaway"],
      default: "N/A",

      required: true,
    },
    
    address: {
        type: String,
        default: "N/A",

      },
      tablenumber: {
        type: String,
        default: "N/A",

      },
      timearrive: {
        type: String,
        default: "N/A",

      },
      phonenumber: {
        type: String,
        default: "N/A",

      },
      date: {
        type: String,
        required: true,
      },
      dishes: {
        type: String, 
        required: true,
      },
      total_amount: {
        type: String,
        required: true,
      },
    
  },
  {
    collection: "Orders",
  }
);

const Order = model("Order", OrderShema);
export default Order;
