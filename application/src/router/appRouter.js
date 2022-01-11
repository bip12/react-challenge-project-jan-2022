import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import RegisterForm from '../components/register/registerForm';

// fake authentication 
export let fakeAuth = {
  signedIn: false
};

const RequireAuth = ({ children }) => {
  if (!fakeAuth.signedIn) {
    return <Redirect to="/login" />;
  }
  return children;
};

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <RequireAuth>
          <Route path="/order" exact component={OrderForm} />
          <Route path="/view-orders" exact component={ViewOrders} />
        </RequireAuth>
      </Switch>
    </Router>
  );
}

export default AppRouter;
