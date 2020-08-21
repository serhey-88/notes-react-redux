import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { Notes } from './features/notes/NotesList';
import { Note } from './features/notes/Note';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route exact path="/archive">
          <Notes archive={true}/>
        </Route>
        <Route exact path="/edit/:id"
          render={(props) => (
            <Note {...props} disabled={false}/>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
