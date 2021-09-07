import styled from 'styled-components';

export const Container = styled.div`
  #page-disciplina {
    width: 100vw;
    height: 100vh;
    .page-header {
      .header-content {
        margin-bottom: 6.4rem;
      }
    }

    .profile-header {
      margin-top: 4rem;
      & > form {
        display: block;
        margin: 0 auto;
        width: 19rem;
      }
      h2,
      h3 {
        text-align: start;
      }

      h2 {
        color: var(--color-button-text);
        font-size: 4.2rem;
      }

      h3 {
        color: var(--color-line-in-white);
        font-weight: 400;
        font-size: 2rem;
      }
    }

    main {
      background: var(--color-box-base);
      width: 100%;
      max-width: 74rem;
      border-radius: 0.8rem;
      margin: -3.2rem auto 3.2rem;
      padding-top: 6.4rem;
      overflow: hidden;
      label {
        color: var(--color-text-complement);
      }
      fieldset {
        border: 0;
        padding: 0 2.4rem;

        + {
          fieldset {
            margin-top: 6.4rem;
          }
        }
        .input-block {
          + {
            .textarea-block {
              margin-top: 2.4rem;
            }
          }
        }
        .select-block {
          + {
            .input-block {
              margin-top: 2.4rem;
            }
          }
        }
        legend {
          font: 700 2.4rem Archivo;
          color: var(--color-text-title);
          margin-bottom: 2.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 1.6rem;
          border-bottom: 1px solid var(--color-line-in-white);
          button,
          a {
            background: none;
            border: 0;
            color: var(--color-primary);
            font: 700 1.6rem Archivo;
            cursor: pointer;
            transition: color 0.2s;
            outline: none;
            &:hover {
              color: var(--color-primary-dark);
            }
          }
        }
      }
      footer {
        padding: 4rem 2.4rem;
        background: var(--color-box-footer);
        border-top: 1px solid var(--color-line-in-white);
        border-bottom: 1px solid var(--color-line-in-white);
        margin-top: 6.4rem;
        //margin-bottom: 6.4rem;
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          line-height: 2.4rem;
          color: var(--color-text-complement);
          img {
            margin-right: 2rem;
          }
        }
        button {
          width: 100%;
          height: 5.6rem;
          background: var(--color-secundary);
          color: var(--color-button-text);
          border: 0;
          border-radius: 0.8rem;
          cursor: pointer;
          font: 700 1.6rem Archivo;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background-color 0.2s;
          margin-top: 3.2rem;
          &:hover {
            background: var(--color-secundary-dark);
          }
        }
      }
    }
  }

  @media (min-width: 700px) {
    #page-disciplina {
      max-width: 100vw;

      .profile-header {
        margin-top: 7rem;
      }

      .page-header {
        .header-content {
          margin-bottom: 0;
        }
      }

      main {
        fieldset {
          padding: 0 6.4rem;
        }
        .schedule-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          column-gap: 1.6rem;
          .input-block {
            margin-top: 0 !important;
          }
        }
        .schedule-item-delete {
          span {
            font-size: 1.4rem;
          }
        }
        footer {
          padding: 4rem 6.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            justify-content: space-between;
          }
          button {
            width: 26rem;
            margin-top: 0;
          }
        }
      }
    }

    #subject-info,
    #disciplina-content {
      display: grid;
      grid-column-gap: 1.6rem;
    }

    #disciplina-content {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-template-areas:
        'titulo titulo valor'
        'tag tag tag'
        'descricao descricao descricao'
        'descricao descricao descricao';
    }

    #titulo-info {
      grid-area: titulo;
    }

    #tag-info {
      grid-area: tag;
    }

    #descricao-info {
      grid-area: descricao;
    }

    #valor-info {
      grid-area: valor;
    }
  }
`;
