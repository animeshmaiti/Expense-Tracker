import { createContext, useState, useContext, useCallback,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BaseUrl = 'http://localhost:5000/api/';
const GlobalContext = createContext();

// const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NWVhNWE2ZDBlMDBkZTBjMmE2OGFjIn0sImlhdCI6MTcxNjk5NjEwNn0.s5s3gEevSH-Q5blf-aKIHxzqsgFhsd5_nPsI4X8Cots';

export const GlobalProvider = ({ children }) => {
    // const { token } = useAuth();
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    console.log(token);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     if (storedToken) {
    //       setToken(storedToken);
    //     }
    //   }, []);

    // login
    const login = async (credential) => {
        const authURL = "http://localhost:5000/api/auth/login";
        const response = await axios.post(
            authURL,
            {
                email: credential.email,
                password: credential.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.data;
        if (result.success) {
            localStorage.setItem("token", result.authToken);
            setToken(result.authToken);
            navigate('/');
            // console.log(result.authToken);
            // alert("success", "Successfully log in");
        } else {
            alert("danger", "invalid credentials");
        }
    };

    //logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    //sign up
    const signup = async (credential) => {
        const signupUrl = "http://localhost:5000/api/auth/createuser";
        const response = await axios.post(
            signupUrl,
            {
                username: credential.username,
                email: credential.email,
                password: credential.password,
                cPassword: credential.cPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await response.json();
        if (result.success) {
            localStorage.setItem("token", result.authToken);
            navigate("/login");
            // alert("success", "Successfully created");
        }
    };

    // Incomes 
    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-incomes`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, []);

    const addIncome = useCallback(async (income) => {
        console.log(token);
        try {
            await axios.post(`${BaseUrl}add-income`, income, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            getIncomes(); // Fetch the latest incomes after adding a new one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getIncomes]);

    const deleteIncome = useCallback(async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-income/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            getIncomes(); // Fetch the latest incomes after deleting one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getIncomes]);

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach(income => {
            totalIncome += income.amount;
        });
        return totalIncome;
    }

    // Expense
    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-expenses`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, []);

    const addExpense = useCallback(async (expense) => {
        try {
            await axios.post(`${BaseUrl}add-expense`, expense, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            getExpenses(); // Fetch the latest incomes after adding a new one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getExpenses]);

    const deleteExpense = useCallback(async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-expense/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            getExpenses(); // Fetch the latest incomes after deleting one
        } catch (err) {
            setError(err.response?.data?.message);
        }
    }, [getExpenses]);

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach(expense => {
            totalExpense += expense.amount;
        });
        return totalExpense;
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    }

    return (
        <GlobalContext.Provider value={{
            login,
            signup,
            token,
            logout,
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