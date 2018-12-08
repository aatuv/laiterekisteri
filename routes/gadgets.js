var express = require('express');
var router = express.Router();
var varausController = require('../controllers/varausController');
var laiteController = require('../controllers/laiteController');
var othersController = require('../controllers/othersController');

router.route('/myreservations_all').get(varausController.fetchAllReservations);
router.route('/myreservations_fromto').get(varausController.fetchFromToReservations);
router.route('/admin_gadgets').get(laiteController.fetchGadgets);
router.route('/add_gadget').post(laiteController.insertAGadget);
router.route('/fetch_owners').get(othersController.fetchOwners);
router.route('/fetch_categories').get(othersController.fetchCategories);
router.route('/delete_gadget/:id').delete(laiteController.deleteAGadget);
router.route('/thisgadget').get(laiteController.fetchThisGadget);
router.route('/update_gadget').put(laiteController.updateThisGadget);
module.exports = router;
