const ActivityLog = require('../models/ActivityLog');

exports.listActivities = async (req, res, next) => {
  try {
    const activities = await ActivityLog.find({ user: req.user.id }).sort('-createdAt');
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const activity = await ActivityLog.create({ user: req.user.id, ...req.body });
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};
