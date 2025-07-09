import avatar from '../assets/avatar.png';
import { menuItems } from '../utils/menuItems';
import { signout } from '../utils/icons';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
const Navigation = ({ active, setActive }) => {
  const { logout, user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <nav className='w-[374px] h-full p-6 flex flex-col justify-between gap-8 bg-[rgba(252,246,249,0.78)] border-[3px] border-white rounded-[32px] backdrop-blur-md'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <img
            src={avatar}
            alt='avatar'
            className='w-20 h-20 rounded-full object-cover bg-[#fcf6f9] border-2 border-white p-1 shadow-md'
          />
          <div className='text-center'>
            <h2 className='text-[#222260] font-bold'>{user.username}</h2>
            <p className='text-[#22226099] text-sm text-light'>{user.email}</p>
          </div>
        </div>

        <ul className='flex flex-col mt-6'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActive(item.id);
                navigate(item.link);
              }}
              className={`grid grid-cols-[40px_auto] items-center px-4 py-2 cursor-pointer font-medium text-[#22226099] transition-all relative ${active === item.id
                  ? 'text-[#222260] font-semibold before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-[#222260] before:rounded-r-lg'
                  : ''
                }`}
            >
              <span className='text-xl'>{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='border-t border-white pt-4'>
        <li
          className='flex items-center gap-2 cursor-pointer text-[#222260] hover:text-[#ff0000] transition'
          onClick={logout}
        >
          {signout}
          Sign Out
        </li>
      </div>
    </nav>
  );
}

export default Navigation