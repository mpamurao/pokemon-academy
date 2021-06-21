import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {CssBaseline, Container} from '@material-ui/core';
import Home from './components/Home';
import StudentLogin from './components/student/StudentLogin';
import StudentPortal from './components/student/StudentPortal';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        {/* <Header /> */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route exact path="/student" component={StudentLogin} />
          {/* <Route path="/employee" component={EmployeeLogin} /> */}
          <Route path="/student/portal" component={StudentPortal} />


          <Route path="*" render={() => <Container 
                                          style={{
                                            fontSize:"2rem",
                                            fontWeight:"bold",
                                            display:"flex",
                                            justifyContent:"center",
                                            marginTop:"3rem",
                                          }}>
                                            Page Not Found
                                          </Container>
                                  }>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
