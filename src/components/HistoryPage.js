import React from 'react'
import styled from 'styled-components';

import HeaderBar from './HeaderBar.js';
import FooterBar from './FooterBar.js';

export default function HistoryPage() {
    return (
        <>
            <HeaderBar />
            <Container>
                <HistoryTitle>
                    <h1>Histórico</h1>
                </HistoryTitle>

                <HistoryIsComing>
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </HistoryIsComing> 
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

const HistoryIsComing = styled.div`
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
