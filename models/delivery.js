import mongoose from "mongoose";

const DeliverySchema = mongoose.Schema(
  {
    Date: {
      type: Date,
      required: true,
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserSchema",
    },
    id_admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AdminSchema",
    },
    id_order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "OrderShema",
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = model("BDelivery", DeliverySchema);
export default Delivery;
