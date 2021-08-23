import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import HomeUtilisateur from './components/utilisateurs/HomeUtilisateur';
import HomeStatistique from './components/statistiques/HomeStatistique';
import HomeFourniture from './components/fournitures/HomeFourniture';
import HomeFournisseur from './components/fournisseurs/HomeFournisseur';
import HomeCommande from './components/commandes/HomeCommande';
import HomeDemande from './components/demandes/HomeDemande';
import LoginPage from './components/authentification/LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteSpectateur } from './ProtectedRouteSpectateur';
import { ProtectedRouteSpectateurOuAdmin } from './ProtectedRouteSpectateurOuAdmin';
import AfficherStatistique from './components/spectateur/AfficherStatistique';
import AfficherUtilisateur from './components/spectateur/AfficherUtilisateur';
import AfficherFourniture from './components/spectateur/AfficherFourniture';
import AfficherFournisseur from './components/spectateur/AfficherFournisseur';
import AfficherCommande from './components/spectateur/AfficherCommande';
import AfficherDemande from './components/spectateur/AfficherDemande';
import HomeProfile from './components/profile/HomeProfile';
import HomeCatégorie from './components/CatégorieAndSousCatégorie.js/HomaCatégorie';
import HomeService from './components/services/HomeService';

function App() {
  return (
    
    <div className="App">
  
      <Router>
        <Switch>
           <Route  path="/" exact component={LoginPage}></Route>  
          <ProtectedRouteAdmin  path="/homeStatistique" exact component={HomeStatistique}></ProtectedRouteAdmin>
          <ProtectedRouteAdmin  path="/homeUtilisateur" exact component={HomeUtilisateur}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin  path="/homeFourniture" exact component={HomeFourniture}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin  path="/homeFournisseur" exact component={HomeFournisseur}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin  path="/homeCommande" exact component={HomeCommande}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin path="/homeDemande" exact component={HomeDemande}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin   path="/homeCatégorie" exact component={HomeCatégorie}></ProtectedRouteAdmin >
          <ProtectedRouteAdmin   path="/homeService" exact component={HomeService}></ProtectedRouteAdmin >

          <Route path="/loginpage" exact component={LoginPage}></Route >
          {/************** */}
           <ProtectedRouteSpectateur path="/afficherStatistique" exact component={AfficherStatistique}></ProtectedRouteSpectateur>
           <ProtectedRouteSpectateur path="/afficherUtilisateur" exact component={AfficherUtilisateur}></ProtectedRouteSpectateur>
           <ProtectedRouteSpectateur path="/afficherFourniture" exact component={AfficherFourniture}></ProtectedRouteSpectateur>
          <ProtectedRouteSpectateur path="/afficherFournisseur" exact component={AfficherFournisseur}></ProtectedRouteSpectateur>
          <ProtectedRouteSpectateur path="/afficherCommande" exact component={AfficherCommande}></ProtectedRouteSpectateur>
          <ProtectedRouteSpectateur path="/afficherDemande" exact component={AfficherDemande}></ProtectedRouteSpectateur>
          {/************** */}
          <ProtectedRouteSpectateurOuAdmin path="/homeProfile" exact component={HomeProfile}></ProtectedRouteSpectateurOuAdmin>

        </Switch>
      
    </Router>
    </div>
    
  );
}

export default App;
