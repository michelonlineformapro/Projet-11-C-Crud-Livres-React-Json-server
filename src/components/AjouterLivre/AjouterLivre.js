import axios from 'axios';
import React, { useState } from 'react';
import styles from './AjouterLivre.module.css';

function AjouterLivre(){

   //Initialiser un objet livres json vide
   //L'objet prend des propriétés clé : valeur
   const livreObjet = {
    id: null,
    nomLivre: "",
    descriptionLivre: "",
    prixLivre: "",
    imageLivre: ""
  }

  //2 hooks
  //1er pour creer un nouvel objet livre

  //le 2nd pour l'etat du formulaire (booleen soumis ou non)

  //ici let livre = livreObjet

  //et function setLivre(livre) {votre code}

  const [livre, setLivre] = useState(livreObjet);

  //Etat du formulaire

  //let soumis = false;

  //et function setSoumis(soumis){votre code}

  const [soumis, setSoumis] = useState(false);

    //fonction de tracking pour reperer les changements dans les inputs et les changements d'etats du DOM
    const handleInputChange = event => {
      //Recupération des attributs input name et value
      //Ceci est un affectation par decomposition soit :
      //const name = event.target 
      //const value = event.target
      const {name, value} = event.target;

      //spread Operator (extrait des données d'un tableau ou un objet et creer un nouveau tableau)
      //Appel du mutateur setLivre
      //On decompose (eclate) l'objet livre puis l'attribut name du champ <input> est egale a l'attribut value = event.target
      setLivre({...livre, [name]: value})
      console.log(setLivre)
  }

  //Lier les données du fromulaire avec les objets du tableau json + sauvegarde
  const sauverLivre = () => {
    //On creer un objet vide rempli avec les champ du formulaire
    let livreFormData = {
          nomLivre: livre.nomLivre,
          descriptionLivre: livre.descriptionLivre,
          prixLivre: livre.prixLivre,
          imageLivre: livre.imageLivre
    }

    //La requete HTTP (importer axios via webpack)
    //fetch = axios + methode + url + requete + reponse + objet livreFormData
    axios.post('http://localhost:3001/livres', livreFormData)
    //La promesse = reponse du serveur (json-server) a la requete fetch (soit axios)
    .then(reponse => {
      //A l'aide du hook : on lie les données du formulaire a notre objet vide livreFormData
      setLivre({
          id: reponse.data.id,
          nomLivre: reponse.data.nomLivre,
          descriptionLivre: reponse.data.descriptionLivre,
          prixLivre: reponse.data.prixLivre,
          imageLivre: reponse.data.imageLivre
      });
      //On change le status du booleen pour afficher 2 condition bloc dans le JSX
      //{soumis ?(bloc jsx 1 ):(bloc jsx 2)}
      setSoumis(true);
      //Debug
      console.log(reponse.data);
    })
    //Si la promesse n'est pas tenue : on affiche une erreur
    .catch(erreur => {
      console.error("Erreur lors de l'ajout du livre ! " + erreur);
    });
  }


return(
  <div className={styles.AjouterLivre}>
    AjouterLivre Component
  </div>
)}

export default AjouterLivre;
