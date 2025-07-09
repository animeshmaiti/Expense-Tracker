import { useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import ExpenseForm from '../components/ExpenseForm';
import TransactionItem from '../components/TransactionItem';
import { InnerLayout } from '../styles/Layouts';

const Expenses = () => {
   const { getExpenses, expenses, deleteExpense, totalExpense } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className='flex overflow-auto'>
      <InnerLayout>
        <h1 className='text-3xl font-bold mb-4'>Expenses</h1>

        <h2 className='flex justify-center items-center bg-[#fcf6f9] border-2 border-white shadow-md rounded-[20px] p-4 my-4 text-2xl gap-2'>
          Total Expense:{' '}
          <span className='text-[2.5rem] font-extrabold text-green-600'>
            $ {totalExpense()}
          </span>
        </h2>

        <div className='flex gap-8 w-full'>
          <div className='w-[400px] max-w-full'>
            <ExpenseForm />
          </div>
          <div className='flex-1'>
            {expenses.map((expense) => {
              const { _id, title, amount, type, date, category, description } =
                expense;
              return (
                <TransactionItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  category={category}
                  deleteItem={deleteExpense}
                  type={type}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Expenses