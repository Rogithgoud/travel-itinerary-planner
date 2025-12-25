const express = require('express');
const router = express.Router();
const { createItinerary } = require('../controllers/itineraryController');

//Generate and save itinerary
router.post('/generate', createItinerary);

module.exports = router;
