import './App.css';

const Greeting = ({person}) => {
  return <h1>Hello, {person}!</h1>;
};

const App = () => {
  return (
    <>
      <h1>My empty app</h1>
      <Greeting person="Matti" />
      <Greeting person="Ile" />
    </>
  );
};

export default App;
