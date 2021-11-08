import React from 'react';
// import './styles.scss';

import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import chat from '../../assets/images/chat.png';
import close from '../../assets/images/close.png';
import send from '../../assets/images/send.png';

import { Component } from './styles';

interface IChatProps {
  mensagens: any[];
  isAluno: boolean;
  chatId: string;
  socket: any;
}

interface IChatState {
  mensagem: string;
  closed: boolean;
}

export class ChatComponent extends React.Component<IChatProps, IChatState> {
  public socket: any;

  constructor(props) {
    super(props);

    this.state = { mensagem: '', closed: false };
    console.log(this.state);

    this.socket = this.props.socket;

    this.socket.on('receber_mensagem', mensagem => {
      if (mensagem.chatId === this.props.chatId) {
        if (!this.props.isAluno) {
          if (!mensagem.isAluno) {
            mensagem.isAluno = true;
          } else {
            mensagem.isAluno = false;
          }
        }

        this.props.mensagens.push({
          isAluno: mensagem.isAluno,
          mensagem: mensagem.mensagem,
        });

        this.forceUpdate();
      }
    });
  }

  handleMensagem(event) {
    this.setState({ mensagem: event });
  }

  closeChat() {
    this.socket.disconnect();

    this.setState({ closed: true });
    this.forceUpdate();
  }

  renderMensagem(mensagem: any) {
    return (
      <div className={mensagem.isAluno ? 'client' : 'admin'}>
        <span className={mensagem.isAluno ? 'client message' : 'admin message'}>
          {' '}
          {mensagem.mensagem}{' '}
        </span>
      </div>
    );
  }

  async enviarMensagem() {
    const text = this.state.mensagem;

    const params = {
      mensagem: text,
      chatId: this.props.chatId,
      isAluno: this.props.isAluno,
    };

    this.socket.emit('enviar_mensagem', params);
    this.setState({ mensagem: '' });
  }

  componentDidMount() {
    const objDiv = document.getElementById('messagebox');
    objDiv!.scrollTop = objDiv!.scrollHeight - objDiv!.clientHeight;
  }

  render() {
    const mensagens: any[] = [];
    this.props.mensagens.forEach(msg => {
      mensagens.push(msg);
    });

    if (this.state.closed) {
      return null;
    }

    return (
      <Component>
        <div className="chat chat_support" id="chat_in_support">
          <div className="in_support_header">
            <span>Chat</span>
            <div className="icon_close" onClick={() => this.closeChat()}>
              <img src={close} />
            </div>
          </div>

          <div className="text_support" id="messagebox">
            <div id="messages" className="chat__messages">
              {mensagens.map(this.renderMensagem)}
            </div>
            <div className="line" />
          </div>

          <div className="message_send">
            <input
              type="text"
              placeholder="Digite sua mensagem aqui"
              id="message_user"
              value={this.state.mensagem}
              onChange={e => this.handleMensagem(e.target.value)}
            />
            <div
              className="send_message_button"
              id="send_message_button"
              onClick={() => this.enviarMensagem()}
            >
              <img src={send} />
            </div>
          </div>
        </div>
      </Component>
    );
  }
}
