const Lead = require('../models/Lead');

exports.listLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({ owner: req.user.id }).populate('owner', 'name email');
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user.id });
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (!lead.owner.equals(req.user.id)) return res.status(403).json({ message: 'Not authorized' });

    Object.assign(lead, req.body);
    await lead.save();
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (!lead.owner.equals(req.user.id)) return res.status(403).json({ message: 'Not authorized' });

    await lead.remove();
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};
