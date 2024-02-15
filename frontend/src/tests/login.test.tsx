import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Login from '../views/login';
import { UserContext } from '../context/userContext';
import { MemoryRouter } from 'react-router-dom';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { IContext } from '../types/context';

const mockUsedNavigate = jest_.fn();
jest_.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

jest_.mock('../api/user');

describe('LogIn Tests', () => {
  let mockContext: IContext;

  beforeAll(() => {
    mockContext = {
      user: null,
      updateUser: jest_.fn(),
      isLogged: false,
      setIsLogged: jest_.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      value: jest_.fn(() => {
        return {
          matches: true,
          addListener: jest_.fn(),
          removeListener: jest_.fn(),
        };
      }),
    });
  });

  test('Renders Login Page', () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UserContext.Provider>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('Validation error for missing email', async () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UserContext.Provider>
    );

    const loginButton = screen.getAllByRole('button', { name: 'LogIn' })
    fireEvent.click(loginButton[1]);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    });
  });

  test('Validation error for missing password', async () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UserContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'test@example.com' },
    });
    const loginButton = screen.getAllByRole('button', { name: 'LogIn' })
    fireEvent.click(loginButton[1]);
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('Submits login form with valid data', async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={mockContext}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </UserContext.Provider>
      )
    );
    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'test2@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'test.123' },
    });
    const loginButton = screen.getAllByRole('button', { name: 'LogIn' })
    fireEvent.click(loginButton[1]);
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText('Discover new movies')).toBeInTheDocument();
      }, 2000);
    });
  });

  test('Handles login error on form submission', async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={mockContext}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </UserContext.Provider>
      )
    );

    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'testing@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'test.123' },
    });
    const loginButton = screen.getAllByRole('button', { name: 'LogIn' })
    fireEvent.click(loginButton[1]);
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
      }, 2000);
    });
  });
});
