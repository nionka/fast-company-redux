import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggetIn } from '../../store/users';
import NavProfile from './NavProfile';

const NavBar = () => {
  const isLoggedIn = useSelector(getLoggetIn());

  return (
    <nav className="navbar bg-light mb-2">
      <div className="container-fluid">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/'>Main</Link>
        </li>
        {isLoggedIn && (
          <li className="nav-item">
            <Link className="nav-link" to='/users'>Users</Link>
          </li>
        )}
      </ul>
      <div className="d-flex">
        {isLoggedIn ? <NavProfile /> : <Link className="nav-link" to='/login'>Login</Link>}
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
