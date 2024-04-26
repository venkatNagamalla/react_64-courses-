import {Route, Switch, Redirect} from 'react-router-dom'
import Headers from './components/Headers'
import CourseDetails from './components/CourseDetails'
import Home from './components/Home'
import './App.css'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <>
    <Headers />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
