import { useContext } from "react";
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

export default function HeaderBar() {
    
    const { user } = useContext(UserContext);
    console.log(user.image);

    return (
        <Header>
            <Logo>
                TrackIt
            </Logo>

            <UserPic>
                <img src={user.image} alt='profilePic' />
            </UserPic>
        </Header>
    );
}

const Header = styled.header`
    box-sizing: border-box;

    width: 100vw;
    height: 70px;

    background-color: #126BA5;

    padding: 0 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    font-family: Playball;
    font-size: 39px;
    font-style: normal;
    font-weight: 400;
    line-height: 49px;
    letter-spacing: 0em;
    text-align: left;

    color: #FFF;
`;

const UserPic = styled.div`
    height: 51px;
    width: 51px;

    border-radius: 50%;

    background-color: #FFF;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    img { 
        height: 100%
    }
`;