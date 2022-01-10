import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

import { getHistoryDailyHabits } from '../services/API.js';
import UserContext from "../contexts/UserContext";

import HeaderBar from './HeaderBar.js';
import FooterBar from './FooterBar.js';

export default function HistoryPage() {

    const { user } = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [daysWithHabits, setDaysWithHabits] = useState([]);


    useEffect(() => {
        const promise = getHistoryDailyHabits(user.token);
       
        promise.then((historyApi) => {
            setHistory(historyApi.data);
            
            let habitDays = [];
            historyApi.data.forEach(day => {
                habitDays.push(day.day);
            });
    
            setDaysWithHabits(habitDays);
        });

        promise.catch((error) => {
            console.log(error.response);
            alert(`STATUS: ${error.response.status}
            
                ${error.response.data.message}
                ${(error.response.data.details) ? error.response.data.details : ""}
            `);
        });

    }, [user.token])
    
    function checkDay(date) {
        const day = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;

        //console.log(day);
        //console.log(daysWithHabits.includes(day));
        
        return daysWithHabits.includes(day);    
    }
    
    function checkDayCompleted(date) {
        const day = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        
        let isDayCompleted = 'day-completed';

        history.forEach(date => {
            if(date.day === day){
                date.habits.forEach(habit => {
                    
                    if(!habit.done) {
                        isDayCompleted = 'day-uncompleted';
                    }
                });   
            }
        });

        return isDayCompleted;
    }
    return (
        <>
            <HeaderBar />
            <Container>
                <HistoryTitle>
                    <h1>Histórico</h1>
                </HistoryTitle>

                <Calendar
                    locale={'pt-br'}
                    calendarType={'US'}
                    formatDay={(locale, date) => dayjs(date).format('DD')}


                    tileClassName={({ activeStartDate, date, view }) => view === 'month' &&
                        checkDay(date) ?
                        checkDayCompleted(date) :
                        null}                    
                />
            </Container>
            <FooterBar />
        </>
    );
}

const Container = styled.main`
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    min-height: 100%;
    padding: 70px 18px 115px 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    background-color: #E5E5E5;

    .react-calendar {
        width: 335px;
        height: 402px;
        
        font-family: Lexend Deca;
        background: white;
        border: 1px solid #FFF;
        border-radius: 10px;

    }

    .react-calendar__tile {
        width: 25px;
        height: 45px;
    }

    .day-completed {
        background-color: #8FC549;
        border-radius: 50%;
        width: 15px;
        height: 40px;
    }

    .day-uncompleted {
        background-color: #E75766;
        border-radius: 50%;
        width: 15px;
        height: 40px;
    }
`;

const HistoryTitle = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-family: Lexend Deca;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        color: #126BA5;
        margin: 0;
    }
`;
