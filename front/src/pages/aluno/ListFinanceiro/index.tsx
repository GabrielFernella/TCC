import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Button from '../../../components/Button';

interface IResponse {
  id: string;
  statusPagamento: 1 | 2 | 3 | 4 | 0;
  title: string;
  emailPagador: string;
  valor: number;
  pixDestinatario: string;
  aluno_id: string;
}

interface IFilter {
  typeFilter: 'pendente' | 'cancelado' | 'concluido';
}

const ListFinanceiro: React.FC = () => {
  const [load, setLoad] = useState(false);

  const [pagamentos, setPagamentos] = useState<IResponse[]>([
    {
      id: '',
      statusPagamento: 0,
      title: '',
      emailPagador: '',
      valor: 0,
      pixDestinatario: '',
      aluno_id: '',
    },
  ]);

  const [newArray, setNewArray] = useState<IResponse[]>([]);

  useEffect(() => {
    getPagamentos();
    filterPagamentos({ typeFilter: 'pendente' });
  }, []);

  async function filterPagamentos(value: IFilter) {
    console.log(newArray);
    if (value.typeFilter === 'pendente') {
      setNewArray(
        pagamentos.filter(item => item.statusPagamento === 0 || 1 || 2),
      );
    }

    if (value.typeFilter === 'concluido') {
      setNewArray(pagamentos.filter(item => item.statusPagamento === 4));
    }

    if (value.typeFilter === 'cancelado') {
      setNewArray(pagamentos.filter(item => item.statusPagamento === 3));
    }
    await setLoad(true);
  }

  async function getPagamentos() {
    await api
      .get('pagamento/list')
      .then(async response => {
        setPagamentos(await response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar as pendências');
      });
  }

  function alterColor(value: number) {
    if (value === 3) {
      return { color: 'red' };
    }
    if (value === 4) {
      return { color: 'green' };
    }
    return { color: '#6C3CDD' };
  }

  return (
    <div id="list-aluno-financeiro" className="container">
      <Toaster />
      <PageHeader
        page="Agendamentos"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Essas são todas as suas pendencias</h2>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div className="filterContent">
            <h2>Efetuar pagamentos</h2>

            <div className="buttonsContent">
              <Button
                id="alterar"
                name="handleFilter"
                onClick={() => filterPagamentos({ typeFilter: 'pendente' })}
              >
                Pendente
              </Button>
              <Button
                id="deletar"
                name="handleFilter"
                onClick={() => filterPagamentos({ typeFilter: 'cancelado' })}
              >
                Cancelados
              </Button>
              <Button
                id="aceitar"
                name="handleFilter"
                onClick={() => filterPagamentos({ typeFilter: 'concluido' })}
              >
                Concluídos
              </Button>
            </div>
          </div>
          <br />
          <hr />

          {load ? (
            <div id="list-info">
              {newArray.map(item => {
                return (
                  <div key={item.id} id="card">
                    <div className="states">
                      <h2>
                        Titulo:
                        {item.title}
                      </h2>
                      &ensp;&ensp;
                    </div>
                    <h2>
                      Status do pagamento:
                      <span style={alterColor(item.statusPagamento)}>
                        {item.statusPagamento === 0 && <span> Em espera</span>}
                        {item.statusPagamento === 1 && (
                          <span> Processando </span>
                        )}
                        {item.statusPagamento === 2 && <span> Negado </span>}
                        {item.statusPagamento === 3 && <span> Cancelado </span>}
                        {item.statusPagamento === 4 && <span> Concluido </span>}
                      </span>
                    </h2>

                    <h3>Valor: R$ {item.valor}</h3>

                    <div className="buttons">
                      {item.statusPagamento !== 4 &&
                      item.statusPagamento !== 3 ? (
                        <Link
                          className="btnVisualizar"
                          to={{
                            // pathname: '/aluno/agenda/info', // API do arthur
                            state: {
                              pagamento: item,
                            },
                          }}
                        >
                          <button type="button" id="alterar">
                            <span className="visualizar">
                              Efetuar Pagamento
                            </span>
                          </button>
                        </Link>
                      ) : null}

                      {item.statusPagamento === 3 && (
                        <button type="button" id="deletar" disabled>
                          <span className="visualizar">Cancelado</span>
                        </button>
                      )}

                      {item.statusPagamento === 4 && (
                        <button type="button" id="aceitar" disabled>
                          <span className="visualizar">Concluído</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </fieldset>

        <footer>
          <p>Efetue os pagamentos pendentes para agendar novas aulas</p>
        </footer>
      </main>
    </div>
  );
};

export default ListFinanceiro;
