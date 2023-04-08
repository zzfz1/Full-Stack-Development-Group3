import Product from "../models/product.js";

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, image, brand, category, description, properties, rating, numReviews, price, countInStock } = req.body;

      const product = new Product({
        // use the Product Schema to interact with mongo DB
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
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

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

      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

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

      await product.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.remove();
      res.status(200).json({ message: "Product removed" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ProductController;
