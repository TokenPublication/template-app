const router = require('express').Router()

const initController = require('./controllers/init');
const eventHandler = require('./webhooks/eventHandler');
const productController = require('./controllers/productController');
const organizationController = require('./controllers/organizationController');
const orderController = require('./controllers/orderController');

router.post('/init', initController.init);
router.post('/webhook/event', eventHandler);
router.get('/products', productController.getProducts);
router.get('/products/count', productController.getCount);
router.get('/products/:id', productController.getProduct);
router.get('/categories', productController.getCategories);
router.get('/branches', organizationController.getBranches);
router.get('/terminals', organizationController.getTerminal);
router.get('/merchants', organizationController.getMerchant);
router.get('/sections', organizationController.getSections);
router.get('/tables', organizationController.getTables);
router.get('/orders/summary', orderController.getOrdersSummary);
router.get('/orders/:id', orderController.getOrder);
router.get('/test', (req, res) => {
    console.log('log test');
    console.log(req);
    res.send('Hello World!');
});
module.exports = router;