import {useState} from 'react';
import Input from './ui/input';
import {useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';

const SearchBar = () => {
  const {t} = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const navigate = useNavigate();

  function search(formData: FormData): void {
    const query = formData.get('query')?.toString() || '';
    if (!query) {
      return;
    }
    navigate(`/tag/${query}`);
    setSearchInput('');
  }
  return (
    <div className="flex items-center justify-center">
      <form action={search} className="whitespace-nowrap">
        <Input
          placeholder={t('search term')}
          className="rounded-l-md"
          onChange={handleChange}
          value={searchInput}
          name="query"
        ></Input>

        <button
          type="submit"
          className="bg-midgreen from-midgreen to-lightgreen cursor-pointer rounded-r-md px-4 py-2 text-white hover:bg-gradient-to-r focus:outline-none"
        >
          {t('search')}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
