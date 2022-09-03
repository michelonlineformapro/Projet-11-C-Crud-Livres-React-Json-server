
import './App.css';
import Menu from './components/Menu/Menu';
import Livres from './components/Livres/Livres';

function App() {

  //Exemple de base de JSX

  return (
    <div className="container shadow mt-5">
      <Menu/>
      <Livres />
    </div>
  );
}

export default App;
