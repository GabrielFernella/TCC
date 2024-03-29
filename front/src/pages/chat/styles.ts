import React from 'react';
import styled, { css } from 'styled-components';

export const Component = styled.div`
  padding: 0;
  //position: fixed;
  width: 100%;
  //max-width: 330px;
  //max-height: 460px;
  right: 10px;
  margin-top: 1rem;
  bottom: 10px;
  animation: up 1s;

  .chat_support {
    width: 100%;
  }

  .client {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .client .name {
    text-align: end;
  }

  .client_message {
    background: #f2ecfa;
    padding: 20px 10px;
    margin: 10px 0;
    width: 250px;
    margin-left: 30px;
    border-radius: 4px;
    line-height: 20px;
  }

  .client .message {
    background: #f2ecfa;
    /* background: #cecad4; */
    padding: 20px 10px;
    margin: 10px 0;
    width: 250px;
    margin-right: 30px;
    border-radius: 4px;
    line-height: 20px;
  }

  .text_support {
    border: 1px solid #cec9c9;
    width: 100%;
    height: 260px;
    max-height: 500px;
    overflow-y: scroll;

    //overflow-y: auto;
    /* border-bottom: 0px; */
  }

  .admin {
    display: flex;
    flex-direction: column;
  }

  .admin .message {
    width: 230px;
    background: #b8ffe2;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    margin-left: 30px;
  }

  .message_send {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem;
    padding-left: 16px;
    padding-right: 16px;

    border-radius: 0px 0px 10px 10px;

    border: 1px solid #cec9c9;
    align-items: center;
  }

  .message_send input {
    outline: none;
    height: 34px;
    align-items: center;
    //width: 252px;
    width: 80%;
    border: none;
  }

  .send_message_button {
    display: flex;
    cursor: pointer;
  }

  .line {
    border: 1px solid #e9e9e9;
    padding: 0;
    margin: 0;
  }

  .date {
    text-align: right;
    font-size: 15px;
  }

  .chat_support {
    //position: fixed;
    width: 100%;
    right: 10px;
    animation: up 1s;
    padding: 0;
  }

  .chat_support_hide {
    animation: down 1s;
    animation-fill-mode: forwards;
  }

  .in_support_header {
    float: right;
    width: 100%;
    height: 56px;

    background: #8257e6;
    border-radius: 10px 10px 0px 0px;
    padding-left: 2rem;
    padding-right: 2rem;

    display: flex;
    justify-content: space-between;
  }

  .in_support_header span {
    color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .icon_close {
    align-items: center;
    display: flex;
    cursor: pointer;
  }
`;

/*

export const Chat = styled.div`
  width: 330px;
  height: 460px;
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Send = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
*/
