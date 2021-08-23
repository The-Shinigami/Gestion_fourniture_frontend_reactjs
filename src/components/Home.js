import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import auth from "../components/authentification/auth";
class Home extends Component{
   constructor(props) {
     super(props)
      var oldWidth = "";
       const nav = document.getElementById('full-screen-example');
       if ( nav !== null) {
           oldWidth = nav.style.width;
      }
     if (window.innerWidth >1000) {
      this.state = {
        show: true,
        hide: false,
        width: window.innerWidth,
        oldWidth:oldWidth
       
       }  
     } else {
       this.state = {
        show: false,
        hide: true,
         width: window.innerWidth,
        oldWidth:oldWidth
       }
     }
      
     
  }
 
  componentDidMount() {
    if (document.getElementById('full-screen-example') !== null && document.getElementById('content') !== null) {
     window.addEventListener('resize', this.handelResize);
    this.resize();
      }
    
  }
   componentWillUnmount() {
     window.removeEventListener('resize', this.handleResize);
        }
 
  resize() {
     if(window.innerWidth !== undefined && window !== undefined)
      { this.setState({
       width: window.innerWidth
   })}
     else {
       this.setState({
       width: 1000
   })
    }
     
     if (this.state.width < 1000 || this.state.oldWidth === "50px")
     {
      
       this.hide();
     }
     else {
       this.show();
     }  
  }
  handelResize = () => {
       if (document.getElementById('full-screen-example') !== undefined && document.getElementById('full-screen-example') !== null) {
         this.resize();
   } 
   
    }
   
  hide() {
     this.setState({
       show: false,
       hide:true
     }) 
     const sidenav = document.getElementById('full-screen-example');
    sidenav.style.width = "50px"; 
    const content = document.getElementById('content');
    content.style.marginLeft = "50px";
  }
   show() {
     this.setState({
       show: true,
       hide:false
     })
     const sidenav = document.getElementById('full-screen-example');
     sidenav.style.width = "240px";
     const content = document.getElementById('content');
    content.style.marginLeft = "240px";
    }
  render() {
    return (
      <div>
        {/*   Sidenav */}
         
            <div
            id="full-screen-example"
            className="sidenav"
            data-color="dark"
            data-mode="side"
            data-hidden="false"
            data-scroll-container="#scrollContainer"
          style={{ backgroundColor: "#F2F2F2",borderRight:"solid 4px rgba(88, 66, 255, 0.2) " }}          
          
        >
          {
            this.state.show ?
            <div>
          <div id="disapear"  style={{position:"relative",top:"5px",left:"80px",cursor:"pointer"}} onClick = {() => this.hide()}>
              <i className="bi bi-x-lg fa-2x"></i>
          </div>
          
            <div id="scrollContainer">
              <ul className="sidenav-menu">
          
  
                    <li className="sidenav-item mt-5">
                      <Link to={{ pathname: '/homeProfile'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-person-circle pr-3 fa-2x"></i><strong>Profil</strong></Link>
                    </li>
                 <li className="sidenav-item mt-5">
                      <Link to={{ pathname: '/homeStatistique'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-house pr-3 fa-2x"></i><strong>Home</strong></Link>
                    </li>
                <li className="sidenav-item ">
                      <Link to={{ pathname: '/homeUtilisateur'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}> <i className="bi bi-person-plus pr-3 fa-2x"></i><strong>Utilisateurs</strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/homeFourniture'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-laptop pr-3 fa-2x"></i><strong>Fournitures</strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/homeFournisseur'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-shop pr-3 fa-2x"></i><strong>Fournisseurs</strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/homeCommande'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-truck pr-3 fa-2x"></i><strong>Commandes</strong></Link>
                    </li>
                     <li className="sidenav-item">
                      <Link to={{ pathname: '/homeDemande'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className=" bi bi-cart-plus pr-3 fa-2x"></i><strong>Demandes</strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/homeCatégorie'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-tags pr-3 fa-2x"></i><strong ><div>Catégorie/</div> <div>Sous Catégorie</div></strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/homeService'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i className="bi bi-menu-button-wide pr-3 fa-2x"></i><strong >Services</strong></Link>
                    </li>
                    <li className="sidenav-item">
                      <Link to={{ pathname: '/'}} onClick={() => auth.logout()} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{marginLeft:"5px"}} className="bi bi-box-arrow-right  pr-3 fa-2x"></i><strong>Logout</strong></Link>
                    </li>
                    
                    
              </ul>
     
        </div>
        </div>
              : null}
          {/*  small Sidenav */}
          {
          this.state.hide?  
              <div >
           <div className="btn btn-dark mt-5" style={{position:"relative",bottom:"45px",cursor:"pointer"}} onClick = {() => this.show()}>
              <i className="fas fa-bars"></i>
          </div>
          
            <div id="scrollContainer">                                                     
                  <ul className="sidenav-menu">
                     <Link to='/homeProfile' className="sidenav-link mt-4" data-target="#main"><i style={{ position:"relative",right:"17px"}} className="bi bi-person-circle pr-3 fa-2x"></i></Link>
                     <Link to='/homeStatistique' className="sidenav-link mt-4" data-target="#main"><i style={{ position:"relative",right:"17px"}} className="bi bi-house pr-3 fa-2x"></i></Link>
                    <Link to='/homeUtilisateur' className="sidenav-link" data-target="#main"><i style={{ position:"relative",right:"17px"}} className="bi bi-person-plus pr-3 fa-2x"></i></Link>
                    <Link to={{ pathname: '/homeFourniture'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{ position:"relative",right:"20px"}}  className="bi bi-laptop pr-3 fa-2x"></i></Link>
                    <Link to={{ pathname: '/homeFournisseur' }} className="sidenav-link" data-target="#main" style={{ fontSize: "16px" }}><i style={{ position: "relative", right: "20px" }} className="bi bi-shop pr-3 fa-2x"></i></Link>
                    <Link to={{ pathname: '/homeCommande'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{ position: "relative", right: "20px" }} className="bi bi-truck pr-3 fa-2x"></i></Link>
                     <Link to={{ pathname: '/homeDemande'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{ position: "relative", right: "20px" }} className="bi bi-cart-plus pr-3 fa-2x"></i></Link>
                     <Link to={{ pathname: '/homeCatégorie'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{ position: "relative", right: "20px" }} className=" bi bi-tags pr-3 fa-2x"></i></Link>
                     <Link to={{ pathname: '/homeService'}} className="sidenav-link" data-target="#main" style={{fontSize:"16px"}}><i style={{ position: "relative", right: "20px" }} className=" bi bi-menu-button-wide pr-3 fa-2x"></i></Link>
                    <Link to={{ pathname: '/' }} onClick={() => auth.logout()} className="sidenav-link " style={{ fontSize: "16px" }} data-target="#main" ><i style={{ position: "relative", right: "15px" }} className="bi bi-box-arrow-right pr-3 fa-2x"></i></Link>

                    <li className="sidenav-item">
                     
                 
                </li>
          
                
              </ul>
     
            </div>
             
          </div>
         :null}  
        </div>
      </div>
      
        
          
      
    )
   }
 }

export default Home;
