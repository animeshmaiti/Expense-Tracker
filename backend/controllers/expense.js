const ExpenseSchema = require("../models/expenseModel");
const { validationResult} = require('express-validator');


// date format: mm/dd/yyyy
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, date, category, description } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const expense = ExpenseSchema({
            title,
            amount,
            date,
            category,
            description,
            user: req.user.id
        });
        if (!title || !date || !category) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        if (amount <= 0 || !amount === Number) {
            return res.status(400).json({ msg: "Amount should be a number and positive" });
        }
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error);
    }
    // res.json(req.body);
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        let expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).send('Not Found');
        }
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).send('not allowed')
        }
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: `id:${id} expense deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
}