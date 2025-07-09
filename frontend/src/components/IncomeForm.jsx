import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../context/globalContext';
import { plus } from '../utils/icons';

const IncomeForm = () => {
    const { addIncome, error } = useGlobalContext();
    const categories = [
        'Salary',
        'Freelancing',
        'Investments',
        'Stocks',
        'Bitcoin',
        'Bank Transfer',
        'Youtube',
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
        addIncome(input);
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
            {error && <p className='text-red-500 font-medium'>{error}</p>}

                <input
                    required
                    type='text'
                    value={title}
                    name='title'
                    placeholder='Income Title'
                    onChange={handleChange}
                    className='w-full px-4 py-2 border-2 border-white rounded shadow-md text-gray-800 placeholder:text-gray-400 bg-transparent outline-none'
                />

                <input
                    required
                    type='text'
                    value={amount}
                    name='amount'
                    placeholder='Earned Amount'
                    onChange={handleChange}
                    className='w-full px-4 py-2 border-2 border-white rounded shadow-md text-gray-800 placeholder:text-gray-400 bg-transparent outline-none'
                />

            <div className='flex justify-between gap-4'>
                <div className='w-1/2'>
                    <select
                        required
                        value={category}
                        name='category'
                        id='category'
                        onChange={handleChange}
                        className='w-full px-4 py-2 border-2 border-white rounded shadow-md text-gray-400 bg-transparent outline-none'
                    >
                        <option value='' disabled>Select Option</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '')}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='w-1/2'>
                    <DatePicker
                        required
                        id='date'
                        selected={date}
                        placeholderText='Income Date'
                        dateFormat='dd/MM/yyyy'
                        onChange={(date) => setInput({ ...input, date })}
                        className='w-full h-full px-4 py-2 border-2 border-white rounded shadow-md text-gray-800 placeholder:text-gray-400 bg-transparent outline-none'
                    />
                </div>
            </div>

            <div className='w-full'>
                <input
                    type='text'
                    value={description}
                    name='description'
                    placeholder='Income Description'
                    onChange={handleChange}
                    className='w-full px-4 py-2 border-2 border-white rounded shadow text-gray-800 placeholder:text-gray-400 bg-transparent outline-none'
                />
            </div>

            <div className='w-full'>
                <button
                    type='submit'
                    className='flex items-center gap-2 px-4 py-2 rounded-full text-white bg-accent hover:bg-pink-600 transition duration-300'
                >
                    {plus}
                    Add Income
                </button>
            </div>
        </form>
    );
}

export default IncomeForm