const express = require('express');
const router = express.Router();
const {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
} = require('../controllers/summaryController');

router.route('/').get(getSummaries).post(createSummary);

router.route('/:id').put(updateSummary).delete(deleteSummary);

module.exports = router;
