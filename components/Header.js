import styled from "styled-components"
import Login from "./Login"


const HeaderWrapper = styled.article`display: flex;
justify-content: space-between;
align-items: center;
width: 100%; color: white; background-color: var(--primary-button-and-header-color);`

const AppName = styled.p`font-family: var(--herbie-font); font-size: 130%;
padding-right: 3%;`


export function Header(){
    return (<HeaderWrapper>
                <Login/>
            <AppName>herbie</AppName>
            </HeaderWrapper>)
}