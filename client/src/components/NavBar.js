import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = ()=>{
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHendler=()=>{
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper blue darken-1 nav-bar">
            <span href="/" className="brand-logo">Logo</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Make new Links</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHendler}>Exit</a></li>
            </ul>
            </div>
        </nav>
        
    )
}