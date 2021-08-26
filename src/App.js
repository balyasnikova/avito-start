import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {NewsPage} from './pages/news';
import {NewsItemPage} from './pages/news-item';
import React from 'react';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/news'>
            <NewsPage/>
          </Route>
          <Route exact path='/news/:newsId'>
            <NewsItemPage/>
          </Route>
          <Redirect to='/news' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
