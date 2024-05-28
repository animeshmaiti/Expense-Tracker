const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const fetchUser = require('../middleware/fetchuser');

const router = require('express').Router();


router.post('/add-income', fetchUser, addIncome)
    .get('/get-incomes',fetchUser, getIncomes)
    .delete('/delete-income/:id',fetchUser, deleteIncome);


router.post('/add-expense',fetchUser, addExpense)
    .get('/get-expenses',fetchUser, getExpenses)
    .delete('/delete-expense/:id',fetchUser, deleteExpense);

module.exports = router;