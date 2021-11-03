import React from "react";
import './styles.scss';

import chat from '../../assets/images/chat.png';
import close from '../../assets/images/close.png';
import send from '../../assets/images/send.png';


interface IChatProps{
  mensagens: any[];
  isAluno: boolean;
}


export class ChatComponent extends React.Component<IChatProps>{

  constructor(props){
    super(props);
  }

  renderMensagem(mensagem: any){
    return (
      <div className={mensagem.isAluno ? 'client' : 'admin'}>
        <span className={mensagem.isAluno ? 'client message' : 'admin message'}>
          {mensagem.mensagem}
          <label className="date">{mensagem.dataMensagem}</label>
        </span>
      </div>
    );
  }

  render(){

    let mensagens: any[] = [];
    this.props.mensagens.forEach(msg =>{

      if(!this.props.isAluno){
        msg.isAluno = !msg.isAluno;
      }

      mensagens.push(msg);
    });

    return (
      <div className="chat chat_support" id="chat_in_support">
        <div className="in_support_header">
          <span>Em suporte ... </span>
          <div className="icon_close">
            <img src={close} />
          </div>
        </div>

        <div className="text_support">

        <div id="messages" className="chat__messages">
          {mensagens.map(this.renderMensagem)}
        </div>








          {/* <script id="message-user-template" type="text/template">
            <div className="client">
              <span className="name">{{email}}</span>
              <span className="client message">
                {{message}}
                <label className="date">{{date}}</label>
              </span>
            </div>
          </script>
          <script id="admin-template" type="text/template">
            <div className="admin">
              <span className="admin_name">Atendente</span>
              <span className="admin message"> {{message_admin}} </span>
              <label className="date">{{date}}</label>
            </div>
          </script> */}
          <div className="line"></div>
        </div>
        <div className="message_send">
          <input
            type="text"
            placeholder="Digite sua mensagem aqui"
            id="message_user"
          />
          <div className="send_message_button" id="send_message_button">
            <img src={send} />
          </div>
        </div>
      </div>
    );
  }
}

