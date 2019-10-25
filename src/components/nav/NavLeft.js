import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import logo from 'assets/logo192.png'
import jersey from 'assets/jersey.png'
const NavLeft = props => {
  const { location } = props

  return (
    <StyledNavLeft>
      <ul>
        <li>
          <NavLink to='/home'>
            <img src={logo} style={{ width: '25px' }} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/groups'>
            <img src={jersey} style={{ width: '25px' }} />
            <span>Discover</span>
          </NavLink>
        </li>
      </ul>
    </StyledNavLeft>
  )
}
export default withRouter(NavLeft)

const StyledNavLeft = styled.div`
  border: 2px solid green;
  width: 100%;
  display: flex;
  height: 45px;
  ul {
    display: flex;
    color: white;
    margin: 0;
    border: 2px solid;
    padding: 0;
    height: %100;
    justify-content: space-evenly;
    width: 225px;
    list-style-type: none;
    li {
      display: block;
      list-style-type: none;
      a {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      span {
        color: white;
        margin-left: 5px;
        font-size: 20px;
      }
    }
  }
  .tab {
    display: flex;
  }
`