import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import bigLogo from '../assets/trackIt_BigLogo.png'

export default function SignupPage() {

    

    return (
        <Container>
            <BigLogo>
                <img src={bigLogo} alt="bigLogo"/>
            </BigLogo>

            <LoginForm onSubmit={console.log("submitted")}>
                <Input type="email"
                    id="email"
                    placeholder="email"
                    required
                />

                <Input type="password"
                    id="password"
                    placeholder="senha"
                    required
                />

                <Input type="text"
                    id="name"
                    placeholder="nome"
                    required
                />

                <Input type="text"
                    id="foto"
                    placeholder="foto"
                    required
                />

                <Button>
                    Cadastrar
                </Button>
            </LoginForm>

            <Link to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se</p>
            </Link>

        </Container>
    );
}

const Container = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    background-color: white;

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

const BigLogo = styled.div`
    margin-top: 68px;
`;

const LoginForm = styled.form`
    margin-top: 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 6px;
`;

const Input = styled.input`
    width: 303px;
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
`;

const Button = styled.button`
    height: 45px;
    width: 303px;

    border: 0px solid transparent;
    border-radius: 5px;
    background: #52B6FF;

    font-family: Lexend Deca;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;

    cursor: pointer;
`;
