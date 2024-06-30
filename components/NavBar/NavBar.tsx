import SearchBar from '../SearchBar/SearchBar';

type NavBarProps = {
  children?: React.ReactNode;
};
const NavBar = ({ children }: NavBarProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-red-600 mb-40 w-screen">
      <h1 className="text-3xl font-bold">TV SHOWS</h1>

      <div>{children}</div>
    </div>
  );
};

export default NavBar;
