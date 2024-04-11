import React from "react";
import './Header.css'
import { NavLink } from "react-router-dom";

const Header = () =>{
    return (
        <div className="navbar">
            <NavLink to='/' className="logo">Crypto Tracer</NavLink>

            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li className="sec_li"><NavLink to='/coins'>Coins</NavLink></li>
            </ul>
            
            <NavLink to='/signin' ><button>Login</button></NavLink>
        </div>
    )
}

export default Header;