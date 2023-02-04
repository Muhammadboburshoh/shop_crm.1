const router = require('express').Router();

const adminController = require('../controllers/admin');
const is_auth = require('../middleware/is-auht');

router.get('/products', is_auth, adminController.getProducts);
router.get('/add-product', is_auth, adminController.getAddProduct);
router.post('/add-product', is_auth, adminController.postAddProduct);
router.get('/edit-product', is_auth, adminController.getEditProduct);
router.post('/edit-product', is_auth, adminController.postEditProduct);
router.post('/delete-product', is_auth, adminController.postDeleteProduct);

module.exports = router;
