const express = require('express');
const router = express.Router();
const { getAllResources, getResourceById } = require('../controllers/resourceController');

router.get('/', getAllResources);
router.get('/:id', getResourceById);

module.exports = router;
