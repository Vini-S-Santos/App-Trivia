import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('Testa a pagina de login', () => {
    it('Verifica se renderisa corretamente o componente ', () => {
        const { history: { location } } = renderWithRouterAndRedux(<App />);
        expect(location.pathname).toBe('/');
    })

    it('Verifica se renderisa corretamente o botão de configuração ', () => {
        renderWithRouterAndRedux(<App />);
        const settingsButton = screen.getByRole('button', { name: 'Configurações' })
        expect(settingsButton).toBeDefined();
    })

    it('Verifica se existe um label de text', () => {
        renderWithRouterAndRedux(<App />);

        const name = screen.getByText(/email:/i)
        const email = screen.getByText(/usuário:/i)

        expect(name).toBeDefined();
        expect(email).toBeDefined();
    })

    it('Verifica se o botão play está desabilitado inicialmente, mas habilitado quando o usuário digita corretamente em ambas as entradas', () => {
        renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name')
        const emailInput = screen.getByTestId('input-gravatar-email')
        const playButton = screen.getByRole('button', { name: /play/i })

        expect(playButton).toBeDisabled();

        userEvent.type(nameInput, 'test name');
        userEvent.type(emailInput, 'test@email.com');

        expect(playButton).not.toBeDisabled();
    })

    it('Testa se a página muda após o usuário clicar no botão de configurações', () => {
        const { history } = renderWithRouterAndRedux(<App />);
    
        const settingsButton = screen.getByRole('button', { name: /configurações/i });
    
        expect(history.location.pathname).toBe('/');
        userEvent.click(settingsButton);
        expect(history.location.pathname).toBe('/config');
      });

      it('Testa se a página muda após o usuário clicar no botão de Play', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
    
        const nameInput = screen.getByTestId('input-player-name')
        const emailInput = screen.getByTestId('input-gravatar-email')
        const playButton = screen.getByRole('button', { name: 'Play' });
    
        expect(history.location.pathname).toBe('/');
        userEvent.type(nameInput, 'testing name');
        userEvent.type(emailInput, 'testing@email.com');
    
        userEvent.click(playButton);
        const TIME = 2000;
        await new Promise((r) => setTimeout(r, TIME));
        expect(history.location.pathname).toBe('/play');
      });
})