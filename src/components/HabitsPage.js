import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import dayjs from "dayjs";
import { TrashOutline } from 'react-ionicons';
import Loader from "react-loader-spinner";

import { createHabit, getAllHabits } from '../services/API.js';
import UserContext from "../contexts/UserContext";

import HeaderBar from './HeaderBar.js';
import FooterBar from './FooterBar.js';

export default function HabitPage() {

    const { user, setUser } = useContext(UserContext);

    const [allHabits, setAllHabits] = useState(null);


    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [newHabitName, setNewHabitName] = useState('');

    let newHabitWeekdays = [];

    useEffect(() => {
        const promise = getAllHabits(user);

        promise.then((allHabits) => {
            console.log(allHabits.data);
            setAllHabits(allHabits.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [user]);

    function handleHabitsDay(weekdayNumber) {
        if (!newHabitWeekdays.includes(weekdayNumber)) {
            newHabitWeekdays.push(weekdayNumber)
        } else {
            const index = newHabitWeekdays.indexOf(weekdayNumber);
            if (index > -1) {
                newHabitWeekdays.splice(index, 1);
            }
        }

        newHabitWeekdays.sort((a, b) => a - b);
        console.log(newHabitWeekdays);
    };

    function handleCreateHabit(event) {
        event.preventDefault();

        const clientHabit = {
            name: newHabitName,
            days: newHabitWeekdays
        }

        setIsLoading(true);
        
        const promise = createHabit(user.token, clientHabit);

        promise.then((habitInfo) => {
            console.log(habitInfo.data);
            setIsLoading(false);
        });
        
        promise.catch((error) => {
            console.log(error.response);
            
            setIsLoading(false);
        });

    }

    return (
        <>
            <HeaderBar />
            <Container>
                <MyHabitsTitle>
                    <h1>Meus hábitos</h1>
                    <AddButton onClick={() => setIsCreatingTask(true)}>+</AddButton>
                </MyHabitsTitle>

                {isCreatingTask &&
                    <TaskCreationForm onSubmit={handleCreateHabit}>
                        <HabitNameInput type="text"
                            id="habitName"
                            placeholder="nome do hábito"
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            required
                        />
                        
                        <WeekdaysSelector>
                            <input type="checkbox"
                                id="weekday-sun"
                                className="weekday"
                                onClick={() => handleHabitsDay(1)}
                            />
                            <label for="weekday-sun">D</label>
                            
                            <input type="checkbox"
                                id="weekday-mon"
                                className="weekday"
                                onClick={() => handleHabitsDay(2)}
                            />
                            <label for="weekday-mon">S</label>
                            
                            <input type="checkbox"
                                id="weekday-tue"
                                className="weekday"
                                onClick={() => handleHabitsDay(3)}
                            />
                            <label for="weekday-tue">T</label>
                            
                            <input type="checkbox"
                                id="weekday-wed"
                                className="weekday"
                                onClick={() => handleHabitsDay(4)}
                            />
                            <label for="weekday-wed">Q</label>
                            
                            <input type="checkbox"
                                id="weekday-thu"
                                className="weekday"
                                onClick={() => handleHabitsDay(5)}
                            />
                            <label for="weekday-thu">Q</label>
                            
                            <input type="checkbox"
                                id="weekday-fri"
                                className="weekday"
                                onClick={() => handleHabitsDay(6)}
                            />
                            <label for="weekday-fri">S</label>
                            
                            <input type="checkbox"
                                id="weekday-sat"
                                className="weekday"
                                onClick={() => handleHabitsDay(7)}
                            />
                            <label for="weekday-sat">S</label>
                        </WeekdaysSelector>

                        <CancelCreationTask onClick={() => setIsCreatingTask(false)}>
                            Cancelar
                        </CancelCreationTask>
                        
                        <Button type="submit" isLoading={isLoading}>
                            {isLoading ? (
                                <Loader type="ThreeDots" color="#FFF" height={13} width={51} />
                            ) : (
                                "Salvar"
                            )}
                        </Button>
                    </TaskCreationForm>
                }

                {allHabits === null ?
                <NoHabitsCreated>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </NoHabitsCreated> 
                :
                ''
                }

                {allHabits === null ? 
                    <Loader type="ThreeDots" color="#FFF"/>
                    : 
                    allHabits.map((habit) => {
                        return (
                            <Habit onClick={() => console.log(habit)}>
                                <h1>{habit.name}</h1>

                                <CreatedHabitWeekdays>
                                    <div className={habit.days.includes(1) && 'checked'}>
                                        D
                                    </div>
                                    <div className={habit.days.includes(2) && 'checked'}>
                                        S
                                    </div>
                                    <div className={habit.days.includes(3) && 'checked'}>
                                        T
                                    </div>
                                    <div className={habit.days.includes(4) && 'checked'}>
                                        Q
                                    </div>
                                    <div className={habit.days.includes(5) && 'checked'}>
                                        Q
                                    </div>
                                    <div className={habit.days.includes(6) && 'checked'}>
                                        S
                                    </div>
                                    <div className={habit.days.includes(7) && 'checked'}>
                                        S
                                    </div>
                                </CreatedHabitWeekdays>

                                <RemoveHabit>
                                    <TrashOutline
                                        color={'#666666'} 
                                        height="15px"
                                        width="13px"
                                    />
                                </RemoveHabit>
                            </Habit>
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

const MyHabitsTitle = styled.div`
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

const AddButton = styled.button`
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    border: none;
    font-size: 27px;
    line-height: 35px;
    color: #FFF;

    cursor: pointer;
`;

const NoHabitsCreated = styled.div`
    width: 100%;

    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
`;

const TaskCreationForm = styled.form`
    box-sizing: border-box;

    position: relative;

    width: 100%;
    height: 180px;
    background-color: #FFF;

    padding: 18px;

    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HabitNameInput = styled.input`
    width: 100%;
    height: 45px;

    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;

    padding: 11px;

    font-family: Lexend Deca;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: black;

    ::-webkit-input-placeholder {
        color: #D5D5D5;
    }
    :-moz-placeholder {
        color: #D5D5D5;
        opacity:  1;
    }
    ::-moz-placeholder {
        color: #D5D5D5;
        opacity:  1;
    }
    :-ms-input-placeholder {
        color: #D5D5D5;
    }
    ::-ms-input-placeholder {
        color: #D5D5D5;
    }

    ::placeholder {
        color: #D5D5D5;
    }

    ${({ isLoading }) =>
        (isLoading && `
            background: #F2F2F2;
            color: #AFAFAF;
            opacity: 0.7;
            pointer-events: none;
        `)
    };
`;

const WeekdaysSelector = styled.div`
    margin-top: 8px;

    input {
      display: none !important;
    }

    input[type=checkbox] + label {
        display: inline-block;

        border: 1px solid #D4D4D4;
        border-radius: 5px;
        background: #FFF;
        
        height: 30px;
        width: 30px;
        margin-right: 3px;
        line-height: 30px;

        font-family: Lexend Deca;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;

        text-align: center;
        color: #DBDBDB;
        cursor: pointer;

        ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7;
            pointer-events: none;
        `)
        };
    }

    input[type=checkbox]:checked + label {
        background: #CFCFCF;
        color: #FFF;
        border: 1px solid #CFCFCF;

        ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7;
            pointer-events: none;
        `)
        };
    }
`;

const Button = styled.button`
    position: absolute;

    bottom: 15px;
    right: 18px;

    height: 35px;
    width: 84px;

    border: 0px solid transparent;
    border-radius: 5px;
    background: #52B6FF;

    font-family: Lexend Deca;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFF;

    cursor: pointer;

    ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7;
            pointer-events: none;
        `)
    };
`;

const CancelCreationTask = styled.p`
    position: absolute;

    bottom: 23px;
    right: 123px;

    font-family: Lexend Deca;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    color: #52B6FF;

    margin: 0 !important;

    cursor: pointer;
`;

const Habit = styled.div`
    box-sizing: border-box;

    position: relative;

    width: 100%;
    height: 91px;
    background-color: #FFF;

    padding: 14px;

    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

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
        margin-bottom: 8px;
    }
`;

const CreatedHabitWeekdays = styled.div`
    display: flex;
    gap: 4px;

    div {
        box-sizing: border-box;
        display: inline-block;

        border: 1px solid #D4D4D4;
        border-radius: 5px;
        background: #FFF;
        
        height: 30px;
        width: 30px;
        margin-right: 3px;
        line-height: 30px;

        font-family: Lexend Deca;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        text-align: center;
        color: #DBDBDB;
    }

    .checked {
            background: #CFCFCF;
            color: #FFF;
            border: 1px solid #CFCFCF;
        }
`;

const RemoveHabit = styled.div`
    position: absolute;

    top: 11px;
    right: 10px;

    cursor: pointer;
`;