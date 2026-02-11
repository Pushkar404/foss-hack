const Expense = require('../models/Expense');
const { User } = require('../models/User');

// @desc    Get all expenses for current user with optional filters
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res, next) => {
  try {
    const { startDate, endDate, category, search } = req.query;

    const filter = { userId: req.user.id };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.description = { $regex: search, $options: 'i' };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    return res.json(expenses);
  } catch (error) {
    return next(error);
  }
};

// @desc    Create a new expense for current user
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date } = req.body;

    if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
      return res.status(400).json({ message: 'Valid amount is required' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      amount: Number(amount),
      category,
      description: description || '',
      date: date ? new Date(date) : new Date()
    });

    // Ensure category is present in user's categories
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { categories: category } },
      { new: true }
    );

    return res.status(201).json(expense);
  } catch (error) {
    return next(error);
  }
};

// @desc    Update an existing expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;

    const expense = await Expense.findOne({ _id: id, userId: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (amount !== undefined && !Number.isNaN(Number(amount))) {
      expense.amount = Number(amount);
    }
    if (category) {
      expense.category = category;
      await User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { categories: category } },
        { new: true }
      );
    }
    if (description !== undefined) {
      expense.description = description;
    }
    if (date) {
      expense.date = new Date(date);
    }

    const updated = await expense.save();

    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.json({ message: 'Expense removed' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
};

