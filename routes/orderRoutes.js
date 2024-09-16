const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const handleInputErrors = require('../middlewares/order')

router.post('/',
    body('product')
    .notEmpty().withMessage('El nombre del producto es Obligatorio'),
    body('quantity')
    .notEmpty().withMessage('La cantidad del producto es Obligatoria'),
    body('customerName')
    .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    handleInputErrors,
    orderController.createOrder
);
router.get('/', orderController.getAllOrders);

module.exports = router;
