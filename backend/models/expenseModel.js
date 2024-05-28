const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxlength: 20,
        trim: true
    },
    type: {
        type: String,
        default: 'expense'
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    description: {
        type: String,
        maxlength: 100,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);