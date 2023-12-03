import React from 'react';
import './App.scss';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Frontpage from "./pages/frontpage/Frontpage";
import Navbar from "./components/navbar/Navbar";
import {Footer} from "./components/footer/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import {USMap} from "./pages/usmap/USMap";
import theme from "./theme";
import '@fontsource/poppins';
import '@fontsource/open-sans/700.css'
import Login from "./pages/administration/Login";

interface IProps {
}

interface IState {
}

class App extends React.Component<IProps, IState> {

  render() {
    return (
      <ChakraProvider theme={theme}>
        <>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/*" element={<Frontpage/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/map" element={<USMap/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer/>
          </BrowserRouter>
        </>
      </ChakraProvider>
    );
  }
}

export default App;
