import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productsController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct) ;


export default router;