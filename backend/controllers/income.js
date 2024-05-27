const IncomeSchema = require("../models/incomeModel");

// date format: mm/dd/yyyy
exports.addIncome = async (req, res) => {
    try {
        const { title, amount, date, category, description } = req.body;

        const income = IncomeSchema({
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
        await income.save();
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
    // res.json(req.body);
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: `id:${id} Income deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
}