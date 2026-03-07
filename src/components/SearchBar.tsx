import Input from './ui/input';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <Input placeholder="Search with tags..." className="rounded-l-md"></Input>
      <button className="bg-midpurple from-midpurple to-lightpink rounded-r-md px-4 py-2 text-white hover:bg-gradient-to-r focus:outline-none">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
