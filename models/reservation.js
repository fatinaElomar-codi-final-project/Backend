import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReserveShema = new Schema(
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
      ref: "UserSchema",
    },
  },
  {
    collection: "Reserves",
  }
);

const Reserve = model("Reserve", ReserveShema);
export default Reserve;
