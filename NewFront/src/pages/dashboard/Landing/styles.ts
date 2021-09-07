import styled from 'styled-components';

export const Container = styled.div`
  #page-landing {
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-in-primary);
    background: var(--color-text-title);

    .logo-container {
      text-align: center;
      margin-bottom: 3.2rem;

      img {
        height: 10rem;
      }

      h2 {
        width: auto;
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 4.6rem;
        margin-top: 0.8rem;
      }
    }

    .hero-image {
      width: 100%;
    }

    .buttons-container {
      display: flex;
      justify-content: center;
      margin: 3.2rem 0;

      a {
        width: 30rem;
        height: 10.4rem;
        border-radius: 0.8rem;
        font: 700 2rem Archivo;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--color-button-text);
        transition: 0.2s;

        &:first-child {
          margin-right: 1.6rem;
        }

        img {
          width: 4rem;
          margin-right: 2.4rem;
        }
      }

      a.btnAluno {
        background: var(--color-primary-lighter);

        &:hover {
          background: var(--color-primary-light);
        }
      }

      a.btnProfessor {
        background: var(--color-secundary);

        &:hover {
          background: var(--color-secundary-dark);
        }
      }
    }

    .total-connections {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin-left: 0.8rem;
      }
    }
  }

  @media (min-width: 900px) {
    #page-landing-content {
      max-width: 1100px;
      display: grid;
      grid-template-rows: 350px 1fr;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-areas: 'logo hero hero' 'buttons buttons total';

      .logo-container {
        grid-area: logo;
        align-self: center;
        text-align: left;
        margin: 0;

        h2 {
          text-align: initial;
          font-size: 3.6rem;
        }

        img {
          height: 100%;
        }
      }

      .hero-image {
        grid-area: hero;
        justify-self: end;
      }

      .buttons-container {
        grid-area: buttons;
        justify-self: flex-start;

        a {
          font-size: 2.4rem;
        }
      }

      .total-connections {
        grid-area: total;
        justify-self: end;
      }
    }
  }
`;
