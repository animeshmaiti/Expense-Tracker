const ExpenseSchema = require("../models/expenseModel");


// date format: mm/dd/yyyy
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, date, category, description } = req.body;

        const expense = ExpenseSchema({
            title,
            amount,
            date,
            category,
            description
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
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: `id:${id} expense deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
}