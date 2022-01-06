import { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import bigLogo from '../assets/trackIt_BigLogo.png';

import { signUp } from '../services/API.js';

export default function SignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [picLink, setPicLinc] = useState('');

    const navigate = useNavigate();

    function validateClientData(email, password, name, picLink) {
        const errorsInfo = [];

        if (email.length === 0) errorsInfo.push("Preencha o campo email!");
        if (password.length === 0) errorsInfo.push("Preencha o campo mensagem!");
        
        function validateEmail(email) {
            return String(email).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        function checkURL(url) {
            return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
            
            if(!validateEmail(email)) errorsInfo.push("Verfifique o campo email!");
            if(password.length < 4) errorsInfo.push(" Digite uma senha com mais de 4 caracteres!");
            if (name.length === 0) errorsInfo.push(" Preencha o campo nome!");
            if(!checkURL(picLink)) errorsInfo.push(" Verfifique o campo foto!");;

        return errorsInfo;
    };

    function submitClientData(event) {
        event.preventDefault();

        const clientData = {
            email: email,
            name: name,
            image: picLink,
            password: password
        }

        const promise = signUp(clientData);

        promise.then(() => {
            navigate('/');
        });
        
        promise.catch(() => {
            alert(validateClientData(email, password, name, picLink));
        });
    }

    return (
        <Container>
            <BigLogo>
                <img src={bigLogo} alt="bigLogo"/>
            </BigLogo>

            <LoginForm onSubmit={submitClientData}>
                <Input type="email"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input type="password"
                    value={password}
                    placeholder="senha"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Input type="text"
                    id="name"
                    placeholder="nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Input type="text"
                    id="foto"
                    placeholder="foto"
                    value={picLink}
                    onChange={(e) => setPicLinc(e.target.value)}
                    required
                />

                <Button type="submit">
                    Cadastrar
                </Button>
            </LoginForm>

            <Link to={`/`}>
                <p>Já tem uma conta? Faça login!</p>
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
