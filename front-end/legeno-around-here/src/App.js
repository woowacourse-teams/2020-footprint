import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Join from './components/pages/JoinPage';
import Login from './components/pages/LoginPage';
import PostingPage from './components/pages/posting/PostingPage';
import SectorPage from './components/pages/sector/SectorPage';
import PostDetailPage from './components/pages/post/PostDetailPage';
import MyProfileEditPage from './components/pages/myProfileEdit/MyProfileEditPage';
import PostingUpdatePage from './components/pages/posting/PostingUpdatePage';
import MyProfilePage from './components/pages/myProfile/MyProfilePage';
import HomePage from './components/pages/HomePage';
import RankingPage from './components/pages/ranking/RankingPage';

function App() {
  const mainArea = localStorage.getItem('mainAreaName');

  if (!mainArea) {
    localStorage.setItem('mainAreaName', '서울특별시');
    localStorage.setItem('mainAreaId', 1);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/join' exact component={Join} />
        <Route path='/login' exact component={Login} />
        <Route path='/myProfile' exact component={MyProfilePage} />
        <Route path='/posting' exact component={PostingPage} />
        <Route path='/posts/:postId/update' exact component={PostingUpdatePage} />
        <Route path='/sector' exact component={SectorPage} />
        <Route path='/posts/:postId' exact component={PostDetailPage} />
        <Route path='/home' exact component={HomePage} />
        <Route path='/ranking' exact component={RankingPage} />
        <Route path='/myProfileEdit' exact component={MyProfileEditPage} />
        <Redirect path='*' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
