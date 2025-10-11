import './navBar.css'
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <nav>
            <div className="brand">
                <img src="/src/assets/logo.jpg" alt="logo" />
                <span>FoodPicker</span>
            </div>
            <div className="separator"></div>
            <div className="tab-links">
                <Link to="/">Inicio</Link>
                <Link to="/foods">Catálogo</Link>
                <Link to="/foods/add">Añadir</Link>
                <Link to="/">Algo</Link>
            </div>
        </nav>
    )    
}

export default NavBar;