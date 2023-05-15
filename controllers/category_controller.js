// import express from "express";
import fs from "fs";
import Category from ".././models/category.js";
function getAll(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = 116;
  const skipIndex = (page - 1) * limit;

  Category.find({})
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
  Category.findById(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: "Category not found" });
      }
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      next(err);
    });
}

export const addCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const form = new Category({
      name: req.body.name,

      CategoryImage: req.body.image,
    });
    form.CategoryImage = await form.save().then((response) => {
      if (response) {
        res.status(200).send({
          status: 200,
          message: "Added Category successfuly",
          response,
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};

export const updateCategorys = async (req, res, next) => {
  const {
    name,
    CategoryImage,
   
  } = req.body;
  try {
    let Category = await Category.findById(req.params.id);
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (Category.image) {
      fs.unlinkSync(`${Category.image}`);
    }
    Category.name = name;
   
    Category.CategoryImage = CategoryImage;
    await Category.save();
    res.json(Category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, err: err.message });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  let { id } = req.params;
  try {
    const Category = await Categorys.findByIdAndDelete({ _id: id });
    if (Category !== null && Category !== undefined) {
      fs.unlinkSync(`${Category.image}`, (err) => {
        if (err) throw err;
        console.log(`Successfully deleted file ${Category.image}`);
      });
    }

    res.status(200).json("Category deleted successfully");
  } catch (error) {
    res.json({ error: error.message });
  }
};

const Category_controller = {
  getAll,
  addCategory,
  deleteCategory,
  updateCategorys,
  getById,
};
export default Category_controller;
