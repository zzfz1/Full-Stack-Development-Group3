import Category from "../models/category.js";
import CategoryProperty from "../models/categoryProperty.js";
import slugify from "slugify";

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, categoryProperties } = req.body;
      const category = new Category({ name, categoryProperties });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({}).populate("categoryProperties");
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCategoryBySlug(req, res) {
    try {
      const category = await Category.findOne({ slug: req.params.slug }).populate("categoryProperties");

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
      const { name, categoryProperties } = req.body;
      const category = await Category.findOne({ slug: oldslug });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      category.name = name;
      category.categoryProperties = categoryProperties;
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

  async deleteProperty(req, res) {
    try {
      const id = req.params.id;
      const property = await CategoryProperty.findById(id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      await property.remove();
      res.status(200).json({ message: "Property removed" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCategoryProperties(req, res) {
    try {
      const categories = await CategoryProperty.find({});
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createProperty(req, res) {
    try {
      const { key } = req.body;
      const existingCategoryProperty = await CategoryProperty.findOne({ key });

      if (existingCategoryProperty) {
        return res.status(400).json({ message: "Category Property already exists!" });
      }

      const categoryProperty = new CategoryProperty({ key });
      await categoryProperty.save();
      res.status(201).json(categoryProperty);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default CategoryController;
