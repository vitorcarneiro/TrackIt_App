import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoginPage from './components/LoginPage.js';
import SignupPage from './components/SignupPage.js';

export default function App() {

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> }></Route>
                    <Route path="/cadastro" element={ <SignupPage /> }></Route>
                </Routes>
        </BrowserRouter>

    );
}