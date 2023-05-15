const asyncHandler = require('express-async-handler');
const { Summary, User } = require('../models/associations');

// Desc: Get summaries
// Route: GET /api/summaries
// Access: Private
const getSummaries = asyncHandler(async (req, res) => {
  const summaries = await Summary.findAll({
    where: {
      userId: req.user.id,
    },
  });

  res.status(200).json(summaries);
});

// Desc: Create summary
// Route: POST /api/summaries
// Access: Private
const createSummary = asyncHandler(async (req, res) => {
  if (!req.body.summary || !req.body.url) {
    res.status(400);
    throw new Error('Please enter a summary and a url.');
  }

  const summary = await Summary.create({
    summary: req.body.summary,
    url: req.body.url,
    userId: req.user.id,
  });

  res.status(200).json(summary);
});

// Desc: Update summary
// Route: PUT /api/summaries/:id
// Access: Private
const updateSummary = asyncHandler(async (req, res) => {
  const summary = await Summary.findByPk(req.params.id);

  if (!summary) {
    res.status(400);
    throw new Error('Summary not found in the DB with the specified ID.');
  }

  const user = await User.findByPk(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found in the DB with the specified ID.');
  }

  // Check if user owns summary
  if (summary.userId !== user.id) {
    res.status(403);
    throw new Error('User not authorized to update this summary.');
  }

  summary.summary = req.body.summary || summary.summary;
  summary.url = req.body.url || summary.url;

  await summary.save();

  res.status(200).json(summary);
});

// Desc: Delete summary
// Route: DELETE /api/summaries/:id
// Access: Private
const deleteSummary = asyncHandler(async (req, res) => {
  const summary = await Summary.findByPk(req.params.id);

  if (!summary) {
    res.status(400);
    throw new Error('Summary not found in the DB with the specified ID.');
  }

  const user = await User.findByPk(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found in the DB with the specified ID.');
  }

  // Check if user owns summary
  if (summary.userId !== user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this summary.');
  }

  await summary.destroy();

  res.status(200).json({
    message: `Summary ${req.params.id} has been deleted from the DB`,
    deleteSummary: summary,
    id: req.params.id,
  });
});

module.exports = {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
};
