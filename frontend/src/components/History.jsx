import { useGlobalContext } from '../context/globalContext';
const History = () => {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory();

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold'>Recent History</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        const colorClass =
          type === 'income' ? 'text-green' : 'text-red-500';

        return (
          <div
            key={_id}
            className='flex justify-between items-center bg-[#FCF6F9] border-2 border-white shadow-md p-4 rounded-[20px]'
          >
            <p className={`font-medium ${colorClass}`}>{title}</p>
            <p className={`font-medium ${colorClass}`}>
              {type === 'income' ? `+${amount}` : `-${amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default History;
