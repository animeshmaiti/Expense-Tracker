import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const BaseUrl = 'http://localhost:5000/api/';
const BaseAuthUrl = 'http://localhost:5000/api/auth/';
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [user, setUser] = useState({
        username: '',
        email: ''
    });
    const [error, setError] = useState(null);
    useEffect(() => {
        setError(null);
    }, [location.pathname]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUser();
        }
    }, [token]);

    // login
    const login = async (credential) => {
        const authURL = `${BaseAuthUrl}login`;
        try {
            const response = await axios.post(
                authURL,
                {
                    email: credential.email,
                    password: credential.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const result = await response.data;
            localStorage.setItem('token', result.authToken);
            setToken(result.authToken);
            window.location.href = '/';
        } catch (err) {
            console.log(err.response.data.errors);
            setError(err.response?.data?.errors);
        }


    };

    //get user data
    const getUser = async () => {
        const userUrl = `${BaseAuthUrl}getuser`;
        try {
            const response = await axios.get(userUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            const result = response.data;
            setUser({ username: result.username, email: result.email });
        }
        catch (err) {
            console.log(err);
            setError(err.response?.data?.errors);
        }
    };

    //logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    //sign up
    const signup = async (credential) => {
        const signupUrl = `${BaseAuthUrl}createuser`;
        try {
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
                        'Content-Type': 'application/json',
                    },
                }
            );
            const result = await response.data;
            localStorage.setItem('token', result.authToken);
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.errors);
        }
    };

    // Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-incomes`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            setIncomes(response.data);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };

    const addIncome = async (income) => {
        try {
            await axios.post(`${BaseUrl}add-income`, income, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            getIncomes();
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-income/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            getIncomes();
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };

    // Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BaseUrl}get-expenses`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            setExpenses(response.data);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BaseUrl}add-expense`, expense, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            getExpenses();
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BaseUrl}delete-expense/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            getExpenses();
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message);
        }
    };
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach(income => {
            totalIncome += income.amount;
        });
        return totalIncome;
    }
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
            login,signup,token,logout,getUser,user,
            addIncome,getIncomes,incomes,deleteIncome,totalIncome,
            addExpense,getExpenses,expenses,deleteExpense,totalExpense,
            transactionHistory,error
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}