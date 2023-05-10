import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
  {
    total: {
      type: String,
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
    id_dish: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DishSchema",
    },
  },
  {
    timestamps: true,
  }
);

const Bill = model("Bill", BillSchema);
export default Bill;
