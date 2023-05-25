import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReserveSchema = new Schema(
  {
    table_nb: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "Reserves",
  }
);

// Add the `populate()` method to populate the `client_id` field
ReserveSchema.pre("findOne", function (next) {
  this.populate("client_id");
  next();
});

const Reserve = model("Reserve", ReserveSchema);
export default Reserve;
