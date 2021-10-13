import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Splash from './pages/Splash'
import Search from './pages/Search'
import Weight from './pages/Weight'
import Results from './pages/Results'
import CustomerNew from './pages/CustomerNew'
import SearchOne from './pages/SearchOne'
import Test from './pages/Test'
import CustomerUpdate from './pages/CustomerUpdate'
import CustomerUpdateAll from './pages/CustomerUpdateAll'
import Routine from './pages/Routine'
import Diet from './pages/Diet'
import History from './pages/History'

function App() {
  return (

    <BrowserRouter>
      <Switch>
      <Route exact path="/" > <Redirect to="/splash" />  </Route>
        <Route exact path="/splash" component={Splash} />        
        <Route exact path="/search" component={Search} />        
        <Route exact path="/weight/:current" component={Weight} />        
        <Route exact path="/results" component={Results} />        
        <Route exact path="/new/" component={CustomerNew} /> 
        <Route exact path="/one/" component={SearchOne} /> 
        <Route exact path="/update/" component={CustomerUpdate} /> 
        <Route exact path="/test/" component={Test} /> 
        <Route exact path="/routine/" component={Routine} /> 
        <Route exact path="/diet/" component={Diet} /> 
        <Route exact path="/updateall/" component={CustomerUpdateAll} /> 
        <Route exact path="/history/" component={History} /> 
    
      </Switch>
    </BrowserRouter>


  );
}

export default App;