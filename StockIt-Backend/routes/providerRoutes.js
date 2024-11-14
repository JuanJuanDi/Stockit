const express = require('express');
const router = express.router();
const providerController = require('../controllers/providerController');

//CRUD Proveedores

router.post('/', providerController.createProvider);
router.get('/', providerController.getProviders);
router.get('/:id', providerController.getProviderById);
router.put('/:id', providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;