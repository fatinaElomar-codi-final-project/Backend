import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
// import multer from "multer";
// import cookieParser from "cookie-parser";
// import cors from "cors";
import connectDB from "./config/db.js";
// import resource_Routes from "./routes/resources_route.js";
// import adminRoutes from "./routes/admin_route.js";
// import ContactUsMailerRoutes from "./routes/contactUsMailer_route.js";
import Product_routes from "./routes/product_routes.js"
import CategoryRoutes from "./routes/category_routes.js"
import cors from "cors"
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(multer().array());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use("/dish",Product_routes);
app.use("/category",CategoryRoutes);


app.get("/", (req, res) => {
  res.send("api is running");
});
await connectDB();

app.use('/uploads', express.static("./uploads"))
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
