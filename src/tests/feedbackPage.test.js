import React from 'react';
import { screen, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a pagina de Feedback', () => {
  test('Teste se ao clicar em Ranking a rota está correta', async () => {
    const { history } =renderWithRouterAndRedux(<App />);

    act(() => 
      { history.push('/feedback'); });

    const btn = screen.getByTestId('btn-ranking')
    userEvent.click(btn)
    expect(history.location.pathname).toBe('/ranking')
  });

  test('Testa a rota do Play Again', async () => {
    const { history } =renderWithRouterAndRedux(<App />);

    act(() => 
      { history.push('/feedback'); });

    const btn = screen.getByTestId('btn-play-again')
    userEvent.click(btn)
    expect(history.location.pathname).toBe('/')
  });
});