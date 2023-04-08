import Category from "../models/category.js";

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, allowedProperties } = req.body;
      const category = new Category({ name, allowedProperties });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
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

  async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);

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
      const { name, allowedProperties } = req.body;
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.name = name;
      category.allowedProperties = allowedProperties;
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);

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
