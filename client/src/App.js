import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import './datetime.css';
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbar.component"

function App() {
  return (
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
}

export default App;
