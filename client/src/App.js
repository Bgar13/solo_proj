import './App.css';
import { Router } from '@reach/router';
import LogReg from './views/LogReg';
import Profile from './views/Profile';
import NewThought from './components/NewThought';
import EditThought from './components/EditThought';
import Links from './components/Links';


function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/" default />
        <Profile path = '/thoughts'/>
        <NewThought path = '/thoughts/new'/>
        <EditThought path='/thought/:id/edit' />
        <Links path='/thoughts/links'/>
      </Router>
    </div>
  );
}

export default App;
