import { useEffect } from 'react';
import { InnerLayout } from '../styles/Layouts';
import { useGlobalContext } from '../context/globalContext';
import IncomeForm from '../components/IncomeForm';
import TransactionItem from '../components/TransactionItem';

const Incomes = () => {
  const { getIncomes, incomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className='flex overflow-auto w-full'>
      <InnerLayout>
        <h1 className='text-3xl font-semibold mb-4'>Incomes</h1>

        <h2 className='flex justify-center items-center bg-[#fcf6f9] border-2 border-white shadow-md rounded-[20px] p-4 my-4 text-2xl gap-2'>
          Total Income: 
          <span className='text-[2.5rem] font-extrabold text-green-500'>${totalIncome()}</span>
        </h2>

        <div className='flex gap-8 w-full'>
          <div className='w-[400px] max-w-full'>
            <IncomeForm />
          </div>

          <div className='flex-1'>
            {incomes.map((income) => {
              const { _id, title, amount, type, date, category, description } = income;
              return (
                <TransactionItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  category={category}
                  deleteItem={deleteIncome}
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

export default Incomes