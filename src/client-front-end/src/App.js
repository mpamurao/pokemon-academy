import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {CssBaseline, Container} from '@material-ui/core';
import Home from './components/Home';
import StudentLogin from './components/student/StudentLogin';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        {/* <Header /> */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/student-login" component={StudentLogin} />
          {/* <Route path="/employee-login" component={EmployeeLogin} /> */}
          {/* <Route path="/register" component={Register} /> */}
          {/* <Route path="/home" component={Home}/> */}
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
