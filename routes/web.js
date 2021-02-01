/// Imports
const express = require('express');
const wishesController = require('../controllers/wishesController');
const error404Controller = require('../controllers/error404Controller');
const router = express.Router();

/// Routes
// main page
router.get('/', wishesController.getMainPage);
// post new wish
router.post('/', wishesController.postNewWish);
// delete wish
router.post('/delete', wishesController.deleteWish);
// error 404
router.get('*', error404Controller.getErrorPage);

module.exports = router;