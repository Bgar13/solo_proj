import './App.css';
import { Router } from '@reach/router';
import LogReg from './views/LogReg';
import Profile from './views/Profile';
import NewThought from './components/NewThought';


function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/" default />
        <Profile path = '/thoughts'/>
        <NewThought path = '/thoughts/new'/>

      </Router>
    </div>
  );
}

export default App;
