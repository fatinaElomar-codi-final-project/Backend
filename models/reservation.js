import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoosePaginate from "mongoose-paginate-v2";
import Subscription from "./subscription_model.js";
const { Schema, model } = mongoose;

const ReserveShema = new Schema(
  {
  
    numberOfPeople: {
      type: Number,
      required: true,
    },

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
  },
  {
    collection: "Reserves",
  }
);
ReserveShema.plugin(uniqueValidator, { message: "is already taken." });
ReserveShema.plugin(mongoosePaginate);
ReserveShema.pre("findOneAndUpdate", function () {
  this.$where = { isDeleted: false };
});
ReserveShema.post("findOneAndDelete", async function (next) {
  const subscription = await Subscription.findOneAndDelete(
    this.Subscription
  ).exec();
  next();
});
const Reserve = model("Reserve", ReserveShema);
export default Reserve;
