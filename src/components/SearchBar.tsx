const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search tags..."
        className="rounded-l-md border border-violet-300 px-4 py-2 focus:border-pink-500 focus:outline-none"
      />
      <button className="rounded-r-md bg-violet-500 from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-white hover:bg-gradient-to-r focus:outline-none">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
