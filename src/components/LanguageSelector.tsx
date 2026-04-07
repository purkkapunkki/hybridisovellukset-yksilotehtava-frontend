import {useTranslation} from 'react-i18next';

const languages = [
  {value: 'fi', text: 'Suomi'},
  {value: 'se', text: 'Svenska'},
  {value: 'is', text: 'Íslenska'},
  {value: 'no', text: 'Norsk'},
  {value: 'da', text: 'Dansk'},
];

function App() {
  const {i18n, t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="App">
      <label>{t('language selection')}</label>
      <select value={i18n.language} onChange={handleChange}>
        {languages.map((item) => {
          return (
            <option className="text-black" key={item.value} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default App;
