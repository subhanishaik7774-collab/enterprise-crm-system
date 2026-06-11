const Customer = require('../models/Customer');

exports.listCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ owner: req.user.id }).populate('owner', 'name email');
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create({ ...req.body, owner: req.user.id });
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (!customer.owner.equals(req.user.id)) return res.status(403).json({ message: 'Not authorized' });

    Object.assign(customer, req.body);
    await customer.save();
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (!customer.owner.equals(req.user.id)) return res.status(403).json({ message: 'Not authorized' });

    await customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    next(error);
  }
};
