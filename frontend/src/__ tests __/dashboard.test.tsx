import store from '@/store';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '..';

describe('Tela de criacao de desconto', () => {
  const jsdomAlert = window.alert; // remember the jsdom alert
  window.alert = () => {}; // provide an empty implementation for window.alert
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Nenhum campo pode ficar vazio', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const inputDescription = screen.getByRole('search');
    fireEvent.change(inputDescription, { target: { value: 'teste1' } });
    await waitFor(() => expect(inputDescription.value).toBe('teste1'));
  });
});
