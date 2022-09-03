import React from 'react';
import styles from './Menu.module.css';

//Import des module de react-router-dom
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

//Import des composants <Livres/> et <AjouterLivre/>
import Livres from '../Livres/Livres';
import AjouterLivre from '../AjouterLivre/AjouterLivre';

//Fonction a exporter et importer dans App.js
const Menu = () => (
  <div className={styles.Menu}>
    {/* Les liens = <a href=''>Liens</a> */}
    <BrowserRouter>
    <nav class="navbar navbar-light bg-warning rounded shadow mt-3 p-3">
        <div class="container-fluid">
            <Link to='/'>NOS LIVRES</Link>
            <Link to='/ajouter-livre'>AJOUTER UN LIVRE</Link>
        </div>
      </nav>
      {/* chaque route to appel un chemin (path) => appel un composant importer */}
      <Routes>
        <Route path='/' element={<Livres/>}/>
        <Route path='/ajouter-livre' element={<AjouterLivre/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);

export default Menu;
