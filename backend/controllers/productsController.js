import mongoose from 'mongoose';
import Product from '../models/Product.js';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("Error in fetching products: ", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body //esta info la envia el usuario (gralmente en un formulario de creacion)

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields!"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params; //lo q pone el usuario en el parametro http://localhost/api/procuts/:loquevaAca

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted!" })
    } catch (error) {
        console.log("Error in deleting products: ", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }

}

export const updateProduct = async (req, res) => {  //si actualizamos todos los campos usamos put, sino patch
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"})
    }
}