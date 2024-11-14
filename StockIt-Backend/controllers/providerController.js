const Provider = require('../models/Provider');

// Crear un nuevo proveedor
const createProvider = async (req, res) => {
  try {
    const newProvider = new Provider(req.body);
    await newProvider.save();
    res.status(201).json({ message: 'Proveedor creado exitosamente', provider: newProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el proveedor' });
  }
};

// Obtener todos los proveedores
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los proveedores' });
  }
};

// Obtener un proveedor por ID
const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.status(200).json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el proveedor' });
  }
};

// Actualizar un proveedor
const updateProvider = async (req, res) => {
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProvider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.status(200).json({ message: 'Proveedor actualizado', provider: updatedProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el proveedor' });
  }
};

// Eliminar un proveedor
const deleteProvider = async (req, res) => {
  try {
    const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.status(200).json({ message: 'Proveedor eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el proveedor' });
  }
};

module.exports = { createProvider, getProviders, getProviderById, updateProvider, deleteProvider };
