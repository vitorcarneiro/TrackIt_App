import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext.js";

import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';
import TodayPage from './components/TodayPage.js';
import HabitsPage from './components/HabitsPage.js';

export default function App() {

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <LoginPage /> }></Route>
                        <Route path="/cadastro" element={ <SignupPage /> }></Route>
                        <Route path="/hoje" element={ <TodayPage /> }></Route>
                        <Route path="/habitos" element={ <HabitsPage /> }></Route>
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    );
}