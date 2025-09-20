import StoreModel from "../Model/StoreModel";
import ProductModel from "../Model/ProductModel.js";
import UserModel from "../Model/UserModel.js";
import AreaModel from "../Model/AreaModel.js";

const storeController = {
    getStoreInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const {page} = req.query;
            const productCount = await ProductModel.countDocuments({ store: id });
            const numberOfPages = Math.ceil(productCount / 10);
            const product = await ProductModel.find({ store: id }).limit(10).skip((page - 1) * 10);
            const data = await StoreModel.findById(id).populate('owner', '-password -role -__v -createdAt -updatedAt').populate('area');
            if (!data) {
                return res.status(404).send({ message: "Store not found" });
            }
            res.status(200).send({ message: "Success", data, product, numberOfPages });
        } catch (error) {
            res.status(500).send({ message: "Error", error: error.message });
        }
    },
}