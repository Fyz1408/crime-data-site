import React from 'react';
import './App.scss';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dashboard} from "./pages/Dashboard";
import Frontpage from "./pages/Frontpage";
import Navbar from "./components/navbar/Navbar";

interface IProps {
}

interface IState {
}

class App extends React.Component<IProps, IState> {

  render() {
    return (
      <ChakraProvider>
        <>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/*" element={<Frontpage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </BrowserRouter>
        </>
      </ChakraProvider>
    );
  }
}

export default App;
