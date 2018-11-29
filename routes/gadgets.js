var express = require('express');
var router = express.Router();
var varausController = require('../controllers/varausController');

router.route('/myreservations_all').get(varausController.fetchAllReservations);
router.route('/myreservations_fromto').get(varausController.fetchFromToReservations);

module.exports = router;
