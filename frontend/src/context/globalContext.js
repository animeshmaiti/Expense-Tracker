import { createContext, useState, useContext,useCallback } from "react";
import axios from "axios";

const BaseUrl = 'http://localhost:5000/api/';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    
    // Incomes 
    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, []);

    const addIncome = useCallback(async (income) => {
        try {
            await axios.post(`${BaseUrl}add-income`, income);
            getIncomes(); // Fetch the latest incomes after adding a new one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getIncomes]);

    const deleteIncome = useCallback(async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-income/${id}`);
            getIncomes(); // Fetch the latest incomes after deleting one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getIncomes]);

    const totalIncome = ()=>{
        let totalIncome = 0;
        incomes.forEach(income => {
            totalIncome += income.amount;
        });
        return totalIncome;
    }

    // Expense
    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, []);

    const addExpense = useCallback(async (expense) => {
        try {
            await axios.post(`${BaseUrl}add-expense`, expense);
            getExpenses(); // Fetch the latest incomes after adding a new one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getExpenses]);

    const deleteExpense = useCallback(async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-expense/${id}`);
            getExpenses(); // Fetch the latest incomes after deleting one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getExpenses]);

    const totalExpense = ()=>{
        let totalExpense = 0;
        expenses.forEach(expense => {
            totalExpense += expense.amount;
        });
        return totalExpense;
    }

    const transactionHistory = ()=>{
        const history = [...incomes,...expenses];
        history.sort((a,b)=> {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0,3);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpense,
            transactionHistory,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}