import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import React from 'react'

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
          {/* <h1>Welcome To ProShop</h1> */}
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
};

export default App;