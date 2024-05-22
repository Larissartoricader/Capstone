import styled from "styled-components"
import Login from "./Login"


const HeaderWrapper = styled.article`display: flex;
justify-content: space-evenly;
align-items: center;
gap: 50%;
width: 100%; color: white; background-color: var(--primary-button-and-header-color);`

const AppName = styled.p`font-family: var(--herbie-font); font-size: 130%;`


export function Header(){
    return (<HeaderWrapper>
                <Login/>
            <AppName>herbie</AppName>
            </HeaderWrapper>)
}