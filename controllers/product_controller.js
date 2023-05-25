import fs from "fs";
import Product from "../models/product.js";

function getAll(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 116;
  const skipIndex = (page - 1) * limit;

  Product.find({})
    .sort({ _id: 1 })
    .skip(skipIndex)
    .limit(limit)
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

function getById(req, res, next) {
  let id = req.params.id;
  Product.findById(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: "Dish not found" });
      }
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const form = new Product({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      count: req.body.count,
      category_id: req.body.category_id,
      dishImage: req.body.image,
    });
    await form.save();
    res.status(200).send({
      status: 200,
      message: "Added Dish successfully",
      response: form,
    });
  } catch (err) {
    return next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const {
    name,
    price,
    count,
    description,
    dishImage,
    category_id,
    type,
  } = req.body;
  try {
    let Dish = await Product.findById(req.params.id);
    if (!Dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    if (Dish.dishImage && Dish.dishImage !== dishImage) {
      fs.unlinkSync(`${Dish.dishImage}`);
    }
    Dish.name = name;
    Dish.description = description;
    Dish.type = type;
    Dish.price = price;
    Dish.count = count;
    Dish.category_id = category_id;
    Dish.dishImage = dishImage;
    await Dish.save();
    res.json(Dish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, err: err.message });
  }
};

// delete category
// controller
export const deleteProduct = async (req, res) => {
  let { id } = req.params;
  try {
    const Dish = await Product.findByIdAndDelete({ _id: id });
    if (Dish !== null && Dish !== undefined) {
      deleteImage(Dish.dishImage);
    }

    res.status(200).json("Dish deleted successfully");
  } catch (error) {
    res.json({ error: error.message });
  }
};

const Product_controller = {
  getAll,
  addProduct,
  deleteProduct,
  updateProduct,
  getById,
};
export default Product_controller;
