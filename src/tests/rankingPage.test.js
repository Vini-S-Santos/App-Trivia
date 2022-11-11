
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a pagina de Ranking', () => {
    it('Testa se a pagina retorna imagem, nome e pontuação das pessoas jogadoras e se esta armazenado no localStorage', () => {
    
        localStorage.setItem('ranking', JSON
        .stringify([{"name":"Cinthia","score":54,
        "picture":"/home/paim/projetogrupo/sd-025-a-project-trivia-react-redux/src/gravatar.jpg"},
        {"name":"Sancho","score":33,
        "picture":"https://upload.wikimedia.org/wikipedia/commons/5/5f/Gravatar-default-logo.jpg"}
      ]))

        const { history } = renderWithRouterAndRedux(<App />);

        act(() => history.push('/ranking'));

        screen.getByText(/cinthia/i)
        screen.getByText(/33/i)
        screen.getByText(/sancho/i)

        const userIMG = screen.getAllByRole('img', { name: /user/i});
        expect(userIMG).toHaveLength(2);

        const ranking = JSON.parse(localStorage.getItem('ranking'));
        expect(ranking).toHaveLength(2)
    })
    it('Testa se ao clicar em Voltar a pagina inical, a rota está correta', async () => {
      const { history } =renderWithRouterAndRedux(<App />);
  
      act(() => history.push('/ranking'));
  
      const btn = screen.getByTestId('btn-go-home')
      userEvent.click(btn)
      expect(history.location.pathname).toBe('/')
    });
});
