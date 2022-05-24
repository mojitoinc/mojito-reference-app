import styled from "styled-components";

export const InfoLabel = styled.h3`
  position: relative;
  background: transparent;
  border: none;
  text-decoration: none;
  padding: 3px;
  text-align: center;
  padding: 1em;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4em;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4em;
  box-shadow: 0 4px 8px 0 rgba(51, 102, 255,0.2);
  transition: 0.3s;
  border-radius: 6px;
`;

export const TokenContainer = styled.div`
  padding: 0.5em;
  box-shadow: 0 4px 8px 0 rgba(51, 102, 255,0.2);
  transition: 0.3s;
  border-radius: 6px;
`;

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: #fff;
  span{
    margin-right: 10;
  }
  svg {
    margin-top:20;
    padding-top:20;
    background-color: #29a329;
    width: 90px;
    height: 90px;
    border-radius: 45px;
  }
`;


export const FailureContainer = styled.svg`
  background-color: #ff3333;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  padding: 10px;
  color: #fff;
`;
