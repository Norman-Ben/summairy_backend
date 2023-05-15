const express = require('express');
const router = express.Router();
const {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
} = require('../controllers/summaryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSummaries).post(protect, createSummary);

router.route('/:id').put(protect, updateSummary).delete(protect, deleteSummary);

module.exports = router;
