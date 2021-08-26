import {
    BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import React from 'react';
import NewsPage from './pages/news';
import NewsItemPage from './pages/news-item';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/news">
                        <NewsPage />
                    </Route>
                    <Route exact path="/news/:newsId">
                        <NewsItemPage />
                    </Route>
                    <Redirect to="/news" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
