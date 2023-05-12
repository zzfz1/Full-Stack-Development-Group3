import Product from "../models/product.js";
import slugify from "slugify";

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, image, brand, category, description, properties, rating, numReviews, price, countInStock } = req.body;

      const product = new Product({
        name,
        image,
        brand,
        category,
        description,
        properties,
        rating,
        numReviews,
        price,
        countInStock,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find({}).populate([
        {
          path: "category",
          select: "name slug",
          options: { lean: true },
        },
        {
          path: "properties.categoryProperty",
          select: "key",
          options: { lean: true },
        },
      ]);

      res.json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProductBySlug(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug }).populate([
        {
          path: "category",
          select: "name slug",
          options: { lean: true },
        },
        {
          path: "properties.categoryProperty",
          select: "key",
          options: { lean: true },
        },
      ]);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, image, brand, category, description, properties, rating, numReviews, price, countInStock } = req.body;

      const product = await Product.findOne({ slug: req.params.slug });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const nameChanged = product.name !== name;

      product.name = name;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.properties = properties;
      product.rating = rating;
      product.numReviews = numReviews;
      product.price = price;
      product.countInStock = countInStock;

      if (nameChanged) {
        product.slug = slugify(name, { lower: true, strict: true });
      }

      await product.save();
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.remove();
      res.status(200).json({ message: "Product removed" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createProductReview(req, res) {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findOne({ slug: req.params.slug });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user.id.toString());

      if (alreadyReviewed) {
        return res.status(400).json({ message: "You have already reviewed this product" });
      }

      const review = {
        user: req.user.id,
        name: req.user.username,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, curr) => curr.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ProductController;
