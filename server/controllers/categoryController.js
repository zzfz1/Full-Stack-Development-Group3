import Category from "../models/category.js";
import slugify from "slugify";

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, allowedProperties } = req.body;
      const slug = slugify(name, { lower: true, strict: true });
      const category = new Category({ name, slug, allowedProperties });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCategoryBySlug(req, res) {
    try {
      const category = await Category.findOne({ slug: req.params.slug });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateCategory(req, res) {
    try {
      const oldslug = req.params.slug;
      const { name, allowedProperties } = req.body;
      const category = await Category.findOne({ slug: oldslug });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.name = name;
      category.allowedProperties = allowedProperties;
      category.slug = slugify(name, { lower: true, strict: true });
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const slug = req.params.slug;
      const category = await Category.findOne({ slug });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.remove();
      res.status(200).json({ message: "Category removed" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CategoryController;
