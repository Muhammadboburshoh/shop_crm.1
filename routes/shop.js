const router = require('express').Router();

const shopController = require('../controllers/shop');
const is_auth = require('../middleware/is-auht');

router.get('/', is_auth, shopController.getProducts);
router.post('/orders', is_auth, shopController.postOrderProduct);

module.exports = router;
