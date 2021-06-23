import './App.css';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {CssBaseline, Container} from '@material-ui/core';
import Home from './components/Home';
import StudentLogin from './components/student/StudentLogin';
import StudentPortal from './components/student/StudentPortal';
import TeacherLogin from './components/teacher/TeacherLogin';
import TeacherPortal from './components/teacher/TeacherPortal';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route exact path="/student" component={StudentLogin} />
          <Route path="/student/portal" component={StudentPortal} />
          <Route exact path="/teacher" component={TeacherLogin} />
          <Route path="/teacher/portal" component={TeacherPortal} />

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
