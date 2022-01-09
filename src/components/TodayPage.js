import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import dayjs from "dayjs";
import { Checkbox } from 'react-ionicons';
import Loader from "react-loader-spinner";

import { getTodayHabits, checkHabit, uncheckHabit } from '../services/API.js';
import UserContext from "../contexts/UserContext";

import HeaderBar from './HeaderBar.js'
import FooterBar from './FooterBar.js';

export default function TodayPage() {

    const { user, setUser } = useContext(UserContext);

    const [todayTasks, setTodayTasks] = useState(null);
    const [habitsChecked, setHabitsChecked] = useState(0);
    const [percentegeHabitsChecked, setPercentegeHabitsChecked] = useState(0);
    

    const todayDate = dayjs().locale("pt-br").format("dddd, DD/MM");

    useEffect(() => {
        const promise = getTodayHabits(user.token);

        promise.then((todayTasks) => {
            console.log(todayTasks);
            console.log(todayTasks.data);
            console.log(todayTasks.data.length);
            setTodayTasks(todayTasks.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [user, habitsChecked]);

    function toggleCheck(task) {
        if(task.done) {
            const checkPromise = uncheckHabit(user.token, task);

            checkPromise.then((reponse) => {
                console.log(reponse);
                setHabitsChecked(habitsChecked - 1);
                setPercentegeHabitsChecked((habitsChecked)/todayTasks.length);
            });

            checkPromise.catch((error) => {
                console.log(error.response);
            });

        } else {
            const uncheckPromise = checkHabit(user.token, task)

            uncheckPromise.then((reponse) => {
                console.log(reponse);
                setHabitsChecked(habitsChecked + 1);
                setPercentegeHabitsChecked((habitsChecked * 100)/todayTasks.length);
            });

            uncheckPromise.catch((error) => {
                console.log(error.response);
            });
        }
    }

    return (
        <>
            <HeaderBar />
            <Container>
                <DateAndHabitsPercentage>
                    <h1>{todayDate}</h1>
                    { habitsChecked === 0 ? (
                        <h2>Nenhum hábito concluído ainda</h2>
                        ) : (
                        <h2>{percentegeHabitsChecked}% dos hábitos concluídos</h2>
                        )
                    }
                </DateAndHabitsPercentage>

                {todayTasks === null ? 
                    <Loader type="ThreeDots" color="#FFF"/>
                    : 
                    todayTasks.map((task) => {
                        return (
                            <Task onClick={() => toggleCheck(task)}>
                                <div>
                                    <h1>{task.name}</h1>
                                    <h2>Sequência atual: {task.currentSequence} {task.currentSequence > 1 ? 'dias' : 'dia'}</h2>
                                    <h2>Seu recorde: {task.highestSequence} {task.highestSequence > 1 ? 'dias' : 'dia'}</h2>
                                </div>

                                <Checkbox
                                    color={task.done ? '#8FC549' : '#EBEBEB'}
                                    height="69px"
                                    width="69px"
                                    />
                            </Task>
                        );
                    })
                }
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
    padding: 100px 18px 115px 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    background-color: #E5E5E5;

    a {
        margin-top: 25px;

        font-family: Lexend Deca;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: center;

        color: #52B6FF;
    }
`;

const DateAndHabitsPercentage = styled.div`

    width: 100%;
    height: 70px;

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

    h2 {
        font-family: Lexend Deca;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color: #BABABA;
        margin: 0;
    }

`;

const Task = styled.div`
    box-sizing: border-box;

    width: 100%;
    height: 94px;
    background-color: #FFF;

    padding: 13px 15px;

    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    h1 {
        font-family: Lexend Deca;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0em;
        text-align: left;
        
        color: #666666;
        margin: 0;
        margin-bottom: 7px;
    }

    h2 {
        font-family: Lexend Deca;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;

        color: #BABABA;
        margin: 0;
    }
`;
