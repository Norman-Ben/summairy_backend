// Desc: Get summaries
// Route: GET /api/summaries
// Access: Private
const getSummaries = (req, res) => {
  res.status(200).json({ message: 'Get summaries' });
};

// Desc: Create summary
// Route: POST /api/summaries
// Access: Private
const createSummary = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please enter a summary');
  }

  res.status(200).json({ message: 'Create summary' });
};

// Desc: Update summary
// Route: PUT /api/summaries/:id
// Access: Private
const updateSummary = (req, res) => {
  res.status(200).json({ message: `Update summary ${req.params.id}` });
};

// Desc: Delete summary
// Route: DELETE /api/summaries/:id
// Access: Private
const deleteSummary = (req, res) => {
  res.status(200).json({ message: `Delete summary ${req.params.id}` });
};

module.exports = {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
};
