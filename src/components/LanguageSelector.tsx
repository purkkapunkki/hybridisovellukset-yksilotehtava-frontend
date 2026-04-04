import {useTranslation} from 'react-i18next';

const languages = [
  {value: 'fi', text: 'suomi'},
  {value: 'se', text: 'svenska'},
  {value: 'is', text: 'íslenska'},
  {value: 'no', text: 'norsk'},
  {value: 'da', text: 'dansk'},
];

function App() {
  const {i18n, t} = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="App">
      <label>{t('kielivalinta')}</label>
      <select value={i18n.language} onChange={handleChange}>
        {languages.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default App;
