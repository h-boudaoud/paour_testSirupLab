import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import BookList from "./book/BookList"
import {
    BrowserRouter as Router,
    Link as Link,
    Switch,
    Route,
} from "react-router-dom";

import './App.css';
import ChapterList from "./Chapter/ChapterList";

export default  function App() {
    const levels = {
        "lycée": [
            {
                "id": 287,
                "name": "Terminale"
            },
            {
                "id": 286,
                "name": "1re"
            },
            {
                "id": 285,
                "name": "2de"
            }
        ],
        "collège": [
            {
                "id": 284,
                "name": "3ème"
            },
            {
                "id": 282,
                "name": "4ème"
            },
            {
                "id": 281,
                "name": "5ème"
            },
            {
                "id": 283,
                "name": "6ème"
            }
        ]
    }

    return (
        <Router>
            <header className="App App-header">
                <Link to="/livres" className="btn btn-basic">Accueil</Link>
                {Object.keys(levels).map(key=>{
                    console.log('App levels.map :', key)
                    return (
                        <Dropdown key={`dropdown-${key}`}>
                            <Dropdown.Toggle id={`dropdown-${key}`} variant="basic">
                                {key}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/livres/${key}/`}>Tous les niveaux</Dropdown.Item>
                                {levels[key].map(
                                    level=>(
                                        <Dropdown.Item key={level.id} as={Link} to={`/livres/${key}/${level.name}`}>
                                            {level.name}
                                        </Dropdown.Item>
                                    )
                                )}
                            </Dropdown.Menu>
                        </Dropdown>)
                })}
            </header>
            <section id="content">
                    <Switch>
                        <Route path={`/livres/:school/:level`}>
                            <BookList levels={levels}/>
                        </Route>
                        <Route path="/livres/:school">
                            <BookList levels={levels}/>
                        </Route>
                        <Route path="/livres">
                            <BookList levels={levels}/>
                        </Route>
                        <Route path="/livre/:id/chapters">
                            <ChapterList/>
                        </Route>
                        <Route path="/">
                            <div>Accueil</div>
                        </Route>
                    </Switch>
            </section>
        </Router>
    );
}


