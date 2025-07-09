export const MainLayout = ({ children }) => {
  return (
    <div className='p-8 h-full flex gap-8'>
      {children}
    </div>
  );
};

export const InnerLayout = ({ children }) => {
  return (
    <div className='p-8 w-full px-6'>
      {children}
    </div>
  );
}
