import {
  bitcoin, book, calender, card, circle, clothing, comment,
  dollar, food, freelance, game, medical, money, piggy, stocks,
  takeaway, trash, tv, users, yt
} from '../utils/icons';
import { dateFormat } from '../utils/dateFormat';

const TransactionItem = ({
  id, title, amount, date, category, description,
  deleteItem, type
}) => {
  const getCategoryIcon = () => {
    if (type === 'expense') {
      switch (category) {
        case 'education': return book;
        case 'groceries': return food;
        case 'games': return game;
        case 'health': return medical;
        case 'subscriptions': return tv;
        case 'takeaways': return takeaway;
        case 'clothing': return clothing;
        case 'traveling': return freelance;
        case 'other': return circle;
        default: return '';
      }
    } else {
      switch (category) {
        case 'salary': return money;
        case 'freelancing': return freelance;
        case 'investments': return stocks;
        case 'stocks': return users;
        case 'bitcoin': return bitcoin;
        case 'bank': return card;
        case 'youtube': return yt;
        case 'other': return piggy;
        default: return '';
      }
    }
  };

  return (
    <div className='bg-pink-50 border-2 border-white shadow-md rounded-2xl p-4 mb-4 flex items-center gap-4 text-primary w-full'>
      <div className='w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center border-2 border-white text-4xl'>
        {getCategoryIcon()}
      </div>
      <div className='flex-1 flex flex-col gap-1'>
        <h5 className={`text-lg font-semibold pl-8 relative before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full ${type==='expense'?'before:bg-accent':'before:bg-green'}`}>
          {title}
        </h5>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-6 text-primary opacity-80'>
            <p className='flex items-center gap-2'>{dollar} {amount}</p>
            <p className='flex items-center gap-2'>{calender} {dateFormat(date)}</p>
          </div>
          <button
            className='bg-primary flex items-center text-white p-4 rounded-full hover:bg-accent transition'
            onClick={() => deleteItem(id)}
          >
            {trash}
          </button>
        </div>
        {description && (
          <p className='flex items-center gap-2 mt-1 text-primary opacity-80'>
            {comment} {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
