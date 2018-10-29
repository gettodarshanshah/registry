import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from "./../App";
import Appbar from "./../components/Appbar"
import Register from "./../components/Register";
import Registery from "./../components/Registery";
import UserView from "../components/UserView";
import AppView from "./../components/ApplicationView";
import PrivateRouter from "./../components/PrivateComonent";




class AppRouter extends React.Component {



    render() {


        return (
            <div>

                <BrowserRouter>
                    <div>
                        <Appbar />


                        <Switch>

                            <Route path="/" component={App} exact={true} />
                            <Route path="/register" component={Register} />
                            <PrivateRouter path="/registery" component={Registery} />
                            <PrivateRouter path="/user-view/:id" component={UserView} />
                            <PrivateRouter path="/app-view/:id" component={AppView} />


                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
export default AppRouter;
