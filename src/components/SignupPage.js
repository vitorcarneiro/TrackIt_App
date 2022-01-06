import { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";

import bigLogo from '../assets/trackIt_BigLogo.png';

import { signUp } from '../services/API.js';

export default function SignupPage() {

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [picLink, setPicLinc] = useState('');

    const navigate = useNavigate();

    function submitClientData(event) {
        event.preventDefault();

        const clientData = {
            email: email,
            name: name,
            image: picLink,
            password: password
        }

        setIsLoading(true);
        
        const promise = signUp(clientData);
        
        promise.then(() => {
            navigate('/');
        });
        
        promise.catch((error) => {
            console.log(error.response);
            alert(`STATUS: ${error.response.status}
            
                ${error.response.data.message}
                ${error.response.data.details}
            `);
            setIsLoading(false);
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
                    isLoading={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input type="password"
                    id="password"
                    placeholder="senha"
                    isLoading={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Input type="text"
                    id="name"
                    placeholder="nome"
                    isLoading={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Input type="text"
                    id="foto"
                    placeholder="foto"
                    isLoading={isLoading}
                    value={picLink}
                    onChange={(e) => setPicLinc(e.target.value)}
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    {isLoading ? (
                        <Loader type="ThreeDots" color="#FFF" height={13} width={51} />
                    ) : (
                        "Cadastrar"
                    )}
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

    ${({ isLoading }) =>
        (isLoading && `
            background: #F2F2F2;
            color: #AFAFAF;
            opacity: 0.7;
            pointer-events: none;
        `)
    };
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

    ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7;
            pointer-events: none;
        `)
    };
`;
