const router = require('express').Router();
const BookController = require('../controllers/book')

router.post('/registerBook', BookController.registerBook);
router.get('/listBook/:name?/', BookController.listBook);
router.put('/updateBook', BookController.updateBook);
router.put('/deleteBook', BookController.deleteBook);

module.exports = router;