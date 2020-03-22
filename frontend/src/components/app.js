import React from 'react';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
// import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container.js';
// import ProfileContainer from './profile/profile_container';
import GameShowContainer from './gameShow/game_show_container';
import SplashPage from './splash/splash';
import CourtsContainer from './index/courts_container';

const App = () => {
    return (<div>
        <NavBarContainer />
        <Switch>
            <Route path="/games/:gameId" component={GameShowContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <ProtectedRoute exact path="/courts" component={CourtsContainer} />
            <AuthRoute path="/" component={SplashPage} />
        </Switch>
    </div>)
};

export default App;