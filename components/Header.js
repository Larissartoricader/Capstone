import styled from "styled-components"
import Login from "./Login"


const HeaderWrapper = styled.article`display: flex;
justify-content: space-evenly;
align-items: center;
gap: 65%;
width: 100%; color: white; background-color: var(--primary-button-and-header-color);`

const AppName = styled.p`font-family: var(--herbie-font); font-size: 130%;`

const LoginWrapper = styled.p`

`

export function Header(){
    return (<HeaderWrapper>
            <LoginWrapper>
                <Login/>
            </LoginWrapper>
            <AppName>herbie</AppName>
            </HeaderWrapper>)
}