// import express from "express";
import fs from "fs";
import Product from ".././models/product.js"

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
      categories: req.body.categories,
      dishImage: req.body.image,
    });
    form.dishImage = await form.save().then((response) => {
      if (response) {
        res.status(200).send({
          status: 200,
          message: "Added Dish successfuly",
          response,
        });
      }
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
    categories,
    type,
  } = req.body;
  try {
    let Dish = await Product.findById(req.params.id);
    if (!Dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    if (Dish.image) {
      fs.unlinkSync(`${Dish.image}`);
    }
    Dish.name = name;
    Dish.description = description;
    Dish.type = type;
    Dish.price = price;
    Dish.count = count;
    Dish.categories = categories;
    Dish.dishImage = dishImage;
    await Dish.save();
    res.json(Dish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, err: err.message });
  }
};

// delete category
export const deleteProduct = async (req, res) => {
  let { id } = req.params;
  try {
    const Dish = await Dishs.findByIdAndDelete({ _id: id });
    if (Dish !== null && Dish !== undefined) {
      fs.unlinkSync(`${Dish.image}`, (err) => {
        if (err) throw err;
        console.log(`Successfully deleted file ${Dish.image}`);
      });
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
