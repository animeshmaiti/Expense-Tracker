import { createContext, useState, useContext,useCallback } from "react";
import axios from "axios";

const BaseUrl = 'http://localhost:5000/api/';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}