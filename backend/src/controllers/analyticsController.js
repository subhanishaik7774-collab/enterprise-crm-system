const Lead = require('../models/Lead');
const Customer = require('../models/Customer');

exports.dashboard = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments({ owner: req.user.id });
    const totalCustomers = await Customer.countDocuments({ owner: req.user.id });
    const stageCounts = await Lead.aggregate([
      { $match: { owner: req.user.id } },
      { $group: { _id: '$stage', count: { $sum: 1 } } }
    ]);

    res.json({ totalLeads, totalCustomers, stageCounts });
  } catch (error) {
    next(error);
  }
};
