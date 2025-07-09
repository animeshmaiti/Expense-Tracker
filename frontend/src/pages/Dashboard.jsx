import { useEffect } from 'react';
import { InnerLayout } from '../styles/Layouts';
import DashboardChart from '../components/DashboardChart';
import { dollar } from '../utils/icons';
import { useGlobalContext } from '../context/globalContext';
import History from '../components/History';

const Dashboard = () => {
  const {
    totalIncome,
    totalExpense,
    getExpenses,
    getIncomes,
    incomes,
    expenses
  } = useGlobalContext();

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);

  return (
    <div className='w-full'>
      <InnerLayout>
        <h1 className='text-4xl font-bold mb-4'>All Transaction</h1>
        <div className='grid grid-cols-5 gap-8'>
          {/* Chart and Totals */}
          <div className='col-span-3 h-[400px]'>
            <DashboardChart />
            <div className='grid grid-cols-4 gap-8 mt-8'>
              {/* Income */}
              <div className='col-span-2 bg-[#FCF6F9] border-2 border-white shadow-md rounded-[20px] p-4'>
                <h2 className='text-xl font-semibold mb-2'>Total Income</h2>
                <p className='text-4xl font-bold'>{dollar} {totalIncome()}</p>
              </div>

              {/* Expense */}
              <div className='col-span-2 bg-[#FCF6F9] border-2 border-white shadow-md rounded-[20px] p-4'>
                <h2 className='text-xl font-semibold mb-2'>Total Expense</h2>
                <p className='text-4xl font-bold'>{dollar} {totalExpense()}</p>
              </div>

              {/* Balance */}
              <div className='col-start-2 col-span-2 flex flex-col justify-center items-center bg-[#FCF6F9] border-2 border-white shadow-md rounded-[20px] p-4 w-max mx-auto'>
                <h2 className='text-xl font-semibold mb-2'>Total Balance</h2>
                <p className='text-4xl font-bold text-green opacity-60'>
                  {dollar} {totalIncome() - totalExpense()}
                </p>
              </div>
            </div>
          </div>

          {/* History + Stats */}
          <div className='col-span-2'>
            <History />
            <h2 className='flex justify-between items-center text-lg font-semibold mt-4 mb-2'>
              Min <span className='text-xl'>Salary</span> Max
            </h2>
            <div className='bg-[#FCF6F9] border-2 border-white shadow-md rounded-[20px] p-4 flex justify-between items-center'>
              <p className='text-lg font-semibold'>
                {incomes.length > 0 ? Math.min(...incomes.map(i => i.amount)) : 'No income'}
              </p>
              <p className='text-lg font-semibold'>
                {incomes.length > 0 ? Math.max(...incomes.map(i => i.amount)) : 'No income'}
              </p>
            </div>

            <h2 className='flex justify-between items-center text-lg font-semibold mt-6 mb-2'>
              Min <span className='text-xl'>Expense</span> Max
            </h2>
            <div className='bg-[#FCF6F9] border-2 border-white shadow-md rounded-[20px] p-4 flex justify-between items-center'>
              <p className='text-lg font-semibold'>
                {expenses.length > 0 ? Math.min(...expenses.map(e => e.amount)) : 'No expenses'}
              </p>
              <p className='text-lg font-semibold'>
                {expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 'No expenses'}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Dashboard