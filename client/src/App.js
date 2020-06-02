import React from 'react';
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList"
import ItemModal from "./components/ItemModal"
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';



function App() {
  console.log('App function');
  return (
    <Provider store = {store}>
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
    </Provider>
  );
}

export default App;
