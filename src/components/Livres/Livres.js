import React, { useEffect, useState } from 'react';
import styles from './Livres.module.css';

//import du middleware axios
import axios from 'axios';

function Livres(){
    //Un hook pour nos livres
    const [livre, setLivre] = useState([]);
    //ici une affectation par decomposition
    //let livre = []
    //function setLivre(livre){Votre code ici}

    //Recuperer un seul livre
    const [livreConcerner, setLivreConcerner] = useState(null);
    //L'index d'un objet dans le tableau json
    const [livreIndex, setLivreIndex] = useState(-1);


    //la fonction pour afficher les livres
    const afficherLivres = () => {
      //La requète HTTP avec axios + methode GET
      axios.get('http://localhost:3001/livres')
      //la promesse = reponse de json-server
      .then(reponse => {
        //On utilise le mutateur du hook (setter) et on passe l'objet reponse en paramètre
        setLivre(reponse.data);
        console.log(reponse.data);
      })
      //Si la promesse n'est pas tenue = on affiche une erreur
      .catch(erreur => {
        console.error('Erreur de requète HTTP ' + erreur)
      })
    }

    //afficher un seul livre : on passe en paramètre les livres du hook + index
    const livreParId = (livre, index) => {
      //On utilise le mutateur du hook livre concercerner et on assigne les livres du hook livre
      setLivreConcerner(livre);
      //idem pour l'index
      setLivreIndex(index);
      //Debug
      console.log(livre);
      console.log(index);
    }

    //Supprimer un livre
    const supprimerLivre = () => {
      //La requete fetch http (axios) + methodes DELETE + url + id dynamique + 
      axios.delete(`http://localhost:3001/livres/${livreConcerner.id}`)
      //La promesse = reponse du serveur (json-server) a la requete
      .then(reponse => {
        //On declenche une confirmation
        window.confirm('Valider le supression de ce livre ?');
        //le debug
        console.log(reponse.data);
        //On rafraichis la page
        window.location.reload();
      })
      //Si la promesse n'est pas tenue on retourne une erreur
      .catch(erreur => {
        console.error('Erreur lors de la supression du livre !' + erreur)
      })
    }

    useEffect(() => {
      afficherLivres()
    }, [])

    return (
      <div className={styles.Livres}>
        {/* si livre concerner retourne une valeur */}
        {livreConcerner ?(
          <div className='container w-50 shadow p-3'>
            <h2 className='text-center text-danger bg-warning p-3 rounded'>Détails du livre : {livreConcerner.nomLivre}</h2>
                <div id='carte' className='card'>
                <img className='p-3' src={livreConcerner.imageLivre} alt={livreConcerner.nomLivre} title={livreConcerner.nomLivre}/>
                  <div className='card-body'>
                    <h3 className='text-danger'>{livreConcerner.nomLivre}</h3>
                    <p className='card-text'>{livreConcerner.descriptionLivre}</p>
                    <p>PRIX: {livreConcerner.prixLivre}</p>
                    <p>{livreConcerner.categoriesLivre}</p>
                    <button className='btn btn-info'>EDITER</button>
                    <button className='btn btn-danger mx-3' onClick={supprimerLivre}>SUPPRIMER</button>
                    <button className='btn btn-success' onClick={() => window.location.reload()}>RETOUR</button>
                  </div>
                </div>
          </div>
        ):(
          <div className='row'>
             
              {/* Sinon on afficher tous les livres */}
          {livre.map((book, index) =>
              <div className='col-md-4 col-sm-12 mt-5' key={index}>
                <div id='carte' className='card'>
                <img className='p-3' src={book.imageLivre} alt={book.nomLivre} title={book.nomLivre}/>
                  <div className='card-body'>
                    <h3 className='text-danger'>{book.nomLivre}</h3>
                    <p className='card-text'>{book.descriptionLivre}</p>
                    <p>PRIX: {book.prixLivre}</p>
                    <p>{book.categoriesLivre}</p>
                    <button className='btn btn-warning' onClick={() => livreParId(book, index)}>Plus d'infos</button>
                  </div>
                </div>
              </div>
          )}
        </div>
        )}
      </div>
    )
}



export default Livres;




