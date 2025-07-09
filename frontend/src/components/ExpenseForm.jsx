import { useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { plus } from '../utils/icons';

const ExpenseForm = () => {
    const { addExpense, error } = useGlobalContext();
    const categories = [
        'Education',
        'Groceries',
        'Games',
        'Health',
        'Subscriptions',
        'Takeaways',
        'Clothing',
        'Traveling',
        'Other',
    ];
    const [input, setInput] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: '',
    });

    const { title, amount, category, description, date } = input;

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense(input);
        setInput({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full'>
            {error && <p className='text-red-500 animate-pulse'>{error}</p>}

            <input
                required
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
                placeholder='Expense Title'
                className='w-full px-4 py-2 rounded border-2 border-white bg-transparent text-[#222260e6] shadow-md placeholder:text-[#22226066] outline-none'
            />

            <input
                required
                type='text'
                name='amount'
                value={amount}
                onChange={handleChange}
                placeholder='Expensed Amount'
                className='w-full px-4 py-2 rounded border-2 border-white bg-transparent text-[#222260e6] shadow-md placeholder:text-[#22226066] outline-none'
            />

            <div className='flex justify-between gap-4'>

                    <select
                        required
                        name='category'
                        value={category}
                        onChange={handleChange}
                        className='w-1/2 flex-1 px-4 py-2 rounded border-2 border-white bg-transparent text-[#22226066] shadow-md outline-none focus:text-[#222260]'
                    >
                        <option value='' disabled>Select Option</option>
                        {
                            categories.map((cat, index) => (
                                <option key={index} value={cat.toLowerCase().replace(/\s+/g, '')}>
                                    {cat}
                                </option>
                            ))
                        }
                    </select>
                <div className='w-1/2'>
                    <DatePicker
                        required
                        selected={date}
                        onChange={(date) => setInput({ ...input, date })}
                        placeholderText='Expense Date'
                        dateFormat='dd/MM/yyyy'
                        className='w-full h-full flex-1 px-4 py-2 rounded border-2 border-white bg-transparent text-[#222260e6] shadow-md placeholder:text-[#22226066] outline-none'
                    />
                </div>
            </div>

            <div>
                <input
                    type='text'
                    name='description'
                    value={description}
                    onChange={handleChange}
                    placeholder='Expense Description'
                    className='w-full p-3 rounded border-2 border-white bg-transparent text-[#222260e6] shadow-md placeholder:text-[#22226066] outline-none'
                />
            </div>

            <div>
                <button
                    type='submit'
                    className='flex items-center gap-2 px-4 py-2 rounded-full text-white bg-accent hover:bg-pink-600 transition duration-300'
                >
                    {plus}
                    Add Expense
                </button>
            </div>
        </form>
    );
}

export default ExpenseForm