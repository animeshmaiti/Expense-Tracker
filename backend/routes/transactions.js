const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const fetchUser = require('../middleware/fetchuser');

const router = require('express').Router();


router.post('/add-income', fetchUser, addIncome);
router.get('/get-incomes',fetchUser, getIncomes);
router.delete('/delete-income/:id',fetchUser, deleteIncome);


router.post('/add-expense',fetchUser, addExpense);
router.get('/get-expenses',fetchUser, getExpenses);
router.delete('/delete-expense/:id',fetchUser, deleteExpense);

module.exports = router;