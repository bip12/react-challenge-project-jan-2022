import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders, EditForm, RegisterForm} from '../components';
import { useSelector } from 'react-redux';


const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const userToken = auth.token;
  console.log('token: '+userToken);
  if (!userToken) {
    return <Redirect to="/login" />;
  }
  return children;
};

const AppRouter = (props) => {
  const auth = useSelector((state) => state.auth);
  const userToken = auth.token;
  console.log('token: '+userToken);
  return (
    <Router>
       <Switch>
         <Route path="/" exact component={Main} />
         <Route path="/login" exact component={Login} />
         <Route path="/register" exact component={RegisterForm} />

         <RequireAuth>
           <Route path="/order" exact component={OrderForm} />
           <Route path="/view-orders" exact component={ViewOrders} />
           <Route path="/edit-order/:id" exact component={EditForm} />
         </RequireAuth>
       </Switch>
     </Router>
  );
}

export default AppRouter;
