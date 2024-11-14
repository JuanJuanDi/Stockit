const exprees = require('express');
const Product = require('../models/Product');
const router = exprees.Router();

//crear un nuevo producto (POST /api/products)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  }catch (error){
    res.status(400).json({ message: error.message});
  }
});

//Obtener todos los productos (GET  /api/products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error){
    res.status(400).json({message: error.message});
  }
});

// Ruta para obtener producto por su ID  (GET  /api/products)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Actualizar un producto (PUT  /api/products)
router.put('/:id', async (req, res) => {
  try{
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updateProduct);
  } catch (error){
    res.status(400).json({message: error.message});
  }
});

//Eliminar un producto (DELETE  /api/products)
router.delete('/:id', async (req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({message: 'Prodcuto elminado'});
  }catch (error){
    res.status(400).json({message: error.message});
  }
});

module.exports = router;