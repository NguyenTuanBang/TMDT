import ProductModel from "../Model/ProductModel.js";
import "../Model/StoreModel.js";
import "../Model/TagModel.js";
import TagModel from "../Model/TagModel.js";
import "../Model/AreaModel.js"

const productController = {
  getAll: async (req, res) => {
    try {
      const curPage = parseInt(req.query.curPage) || 1;
      const tagId = req.query.type; // FE gọi /products?curPage=1&type=xxx
      const name = req.query.name || ""; // FE gọi /products?curPage=1&name=abc
      const query = {};

      if (tagId) {
        // nếu tags là array ObjectId -> phải dùng $in
        query.tags = { $in: [tagId] };
      }
      if (name) {
        query.productName = { $regex: name, $options: "i" }; // tìm tên gần đúng, không phân biệt hoa thường
      }

      const itemQuantity = await ProductModel.countDocuments(query);
      const numberOfPages = Math.ceil(itemQuantity / 20);

      if (curPage > numberOfPages && numberOfPages > 0) {
        return res.status(400).send({ message: "Invalid page number" });
      }

      const data = await ProductModel.find(query)
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags")
        .limit(20)
        .skip((curPage - 1) * 20);

      res.status(200).send({
        message: "Success",
        data,
        numberOfPages,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error",
        error: error.message,
      });
    }
  },


  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ProductModel.findById(id)
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags");
      if (!data) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send({ message: "Success", data });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  },

  getMostFavourite: async (req, res) => {
    try {
      const data = await ProductModel.find()
        .sort({ traded_count: -1 })
        .limit(10)
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags");

      res.status(200).send({ message: "Success", data });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  },

  getTopRating: async (req, res) => {
    try {
      const data = await ProductModel.find()
        .sort({ curRating: -1 })   // Sắp xếp trực tiếp trong MongoDB
        .limit(20)                 // Lấy top 20
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags");
      res.status(200).send({ message: "Success", data });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  },
  searchByName: async (req, res) => {
    try {
      const { keyword } = req.query;
      if (!keyword) return res.status(400).send({ message: "Keyword required" });

      const totalResults = await ProductModel.countDocuments({
        productName: { $regex: keyword, $options: "i" },
      });

      const data = await ProductModel.find({
        productName: { $regex: keyword, $options: "i" }, // tìm gần đúng, không phân biệt hoa thường
      })
        .limit(5) // giới hạn số kết quả dropdown
        .select("productName img"); // chỉ lấy tên + hình ảnh

      if (data.length === 0) {
        return res.status(200).send({ message: "Not Found", data: [] });
      }

      res.status(200).send({ message: "Success", data, totalResults });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  },


  getByPriceRange: async (req, res) => {
    try {
      const { min, max } = req.query;
      const curPage = parseInt(req.query.curPage) || 1;
      const itemQuantity = await ProductModel.countDocuments({
        price: { $gte: min || 0, $lte: max || Number.MAX_SAFE_INTEGER },
      });
      const numberOfPages = Math.ceil(itemQuantity / 20);
      const data = await ProductModel.find({
        price: { $gte: min || 0, $lte: max || Number.MAX_SAFE_INTEGER },
      })
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags")
        .limit(20)
        .skip((curPage - 1) * 20);

      res.status(200).send({
        message: "Success",
        data,
        numberOfPages,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error",
        error: error.message,
      });
    }
  },
  getByStore: async (req, res) => {
    try {
      const { storeId } = req.params;
      const curPage = parseInt(req.query.curPage) || 1;
      const itemQuantity = await ProductModel.countDocuments({ store: storeId });
      const numberOfPages = Math.ceil(itemQuantity / 20);
      const data = await ProductModel.find({ store: storeId })
        .populate({ path: "store", populate: { path: "area", model: "Area" } })
        .populate("tags")
        .limit(20)
        .skip((curPage - 1) * 20);
      res.status(200).send({
        message: "Success",
        data,
        numberOfPages,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error",
        error: error.message,
      });
    }
  },
};

export default productController;
