import styled from "styled-components"
import Login from "./Login"


const HeaderContainer = styled.article`display: flex;
justify-content: space-evenly;
gap: 65%;
width: 100%; color: white; background-color: var(--primary-button-and-header-color);`
const Name = styled.p`font-family: var(--herbie-font); font-size: 130%;`
const LoginButton = styled.button`
color: white; background-color: var(--primary-button-and-header-color);
border: none;
`

export function Header(){
    return (<HeaderContainer>
            <LoginButton type="button"><Login/></LoginButton>
            <Name>herbie</Name>
            </HeaderContainer>)
}