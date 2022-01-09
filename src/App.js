import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext.js";

import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';
import TodayPage from './components/TodayPage.js';
import HabitsPage from './components/HabitsPage.js';
import HistoryPage from './components/HistoryPage.js';

export default function App() {

    const [user, setUser] = useState(null);
    const [allTodayTasks, setAllTodayTasks] = useState(0);
    const [tasksDoneToday, setTasksDoneToday] = useState(0);

    return (
        <UserContext.Provider value={{ user, setUser, allTodayTasks, setAllTodayTasks, tasksDoneToday, setTasksDoneToday }}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <LoginPage /> }></Route>
                        <Route path="/cadastro" element={ <SignupPage /> }></Route>
                        <Route path="/hoje" element={ <TodayPage /> }></Route>
                        <Route path="/habitos" element={ <HabitsPage /> }></Route>
                        <Route path="/historico" element={ <HistoryPage /> }></Route>
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    );
}