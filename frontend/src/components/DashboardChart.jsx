import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardChart = () => {
 const { incomes, expenses } = useGlobalContext();

  const aggregateByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = dateFormat(item.date);
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.amount;
      return acc;
    }, {});
  };

  const incomeAggregated = aggregateByDate(incomes);
  const expenseAggregated = aggregateByDate(expenses);

  const allDates = [...new Set([
    ...Object.keys(incomeAggregated),
    ...Object.keys(expenseAggregated),
  ])].sort((a, b) => new Date(a) - new Date(b));

  const incomeData = allDates.map((date) => incomeAggregated[date] || 0);
  const expenseData = allDates.map((date) => expenseAggregated[date] || 0);

  const data = {
    labels: allDates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.2,
      },
      {
        label: 'Expense',
        data: expenseData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className='bg-[#FCF6F9] border-2 border-white shadow-md p-4 rounded-[20px]'>
      <Line data={data} />
    </div>
  );
}

export default DashboardChart