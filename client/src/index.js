import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import backuppage from './backuppage';
import {HashRouter,Route,Switch,Link} from "react-router-dom";
//import {BrowserRouter as Router,Route,Switch,NavLink} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Testamentary from './Testamentary';
import beneficiary from './beneficiary';
import ManageTesta from './ManageTesta';

const Appa = () =>{
    return( 
        <HashRouter>
            <Switch>        
                    <Route exact={true} path="/" component={App}/> 
                    <Route exact path="/backuppage" component={backuppage}/>
                    <Route exact path="/testamentary" component={Testamentary}/>
                    <Route exact path="/beneficiary" component={beneficiary}/>
                    <Route exact path="/managetesta" component={ManageTesta}/>
           </Switch>
        </HashRouter>
    );
}
ReactDOM.render(<Appa />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
