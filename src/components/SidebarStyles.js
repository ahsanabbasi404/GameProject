import styled, { keyframes } from 'styled-components';

const twinkling = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 1000px 500px; }
`;

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('https://i.pinimg.com/originals/17/2d/3c/172d3ca203948062edffc03aa5c412a3.gif');
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: -1;
    animation: ${twinkling} 20s linear infinite;
  }
`;

const SidebarContent = styled.div`
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: 'Bangers', cursive;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const MenuLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;
const GameSelectionContainer = styled.div`
  color: #fff;
  padding: 10px;

  p {
    margin-bottom: 10px;
  }

  button {
    background-color: #f39c12;
    color: #fff;
    border: none;
    padding: 8px 16px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e67e22;
    }
  }
`;
