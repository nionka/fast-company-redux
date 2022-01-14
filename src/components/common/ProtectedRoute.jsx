import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getLoggetIn } from '../../store/users';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getLoggetIn());
  console.log(isLoggedIn);
  return (
    <Route { ...rest } render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }} />;
      }

      return Component ? <Component { ...props} /> : children;
    }} />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProtectedRoute;
