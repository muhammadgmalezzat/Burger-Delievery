import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Cheackout/Cheackout';
import { Route, Switch ,withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import { Redirect } from 'react-router-dom';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth"  component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
      
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth"  component={Auth} />
          <Route path="/logout"  component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Redirect to='/'/>
        </Switch>
      )
    }
      return (
      <div >
        <Layout>
            <Switch>
              {routes}
            </Switch>
        </Layout>
      </div>
  );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default withRouter( connect(mapStateToProps,mapDispatchToProps)( App));
