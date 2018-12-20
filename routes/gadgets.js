var express = require('express');
var router = express.Router();
var varausController = require('../controllers/varausController');
var laiteController = require('../controllers/laiteController');
var othersController = require('../controllers/othersController');

router.route('/myreservations').get(varausController.fetchReservations);
router.route('/admin_gadgets').get(laiteController.adminFetchGadgets);
router.route('/gadgets').get(laiteController.fetchGadgets);
router.route('/add_gadget').post(laiteController.insertAGadget);
router.route('/fetch_owners').get(othersController.fetchOwners);
router.route('/fetch_categories').get(othersController.fetchCategories);
router.route('/delete_gadget/:id').delete(laiteController.deleteAGadget);
router.route('/thisgadget').get(laiteController.fetchThisGadget);
router.route('/update_gadget').put(laiteController.updateThisGadget);
router.route('/reserve_a_gadget').post(varausController.reserveAGadget);
router.route('/delete_reservation').delete(varausController.deleteReservation);
module.exports = router;
