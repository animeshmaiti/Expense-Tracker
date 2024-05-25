import { createContext,useState,useContext} from "react";
import axios from "axios";

const BaseUrl = 'http://localhost:5000/api/';

const GlobalContext = createContext();

export const GlobalProvider = ({children})=>{

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income)=>{
        try {
            const response = await axios.post(`${BaseUrl}add-income`,income);
            // setIncomes([...incomes,data]);
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <GlobalContext.Provider value={{
            addIncome
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = ()=>{
    return useContext(GlobalContext);
}