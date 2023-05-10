import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const AdminSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: "password is required",
    },
    phone: {
      type: String,
      unique: [true, "already exist"],
      default: "not found",
    },
   
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
    },
    postion: {
      type: String,
      enum: ['Chef', 'Sous Chef', 'Bartender', 'waiter','General Manager','Cashier','Delivery man'],
    },
  },
  {
    timestamps: true,
    collection: "Admins",
  }
);

adminSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

const Admin = model("Admin", AdminSchema);
export default Admin;
