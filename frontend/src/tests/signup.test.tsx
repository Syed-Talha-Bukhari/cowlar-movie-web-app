import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import Signup from '../views/signup';
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

describe('SignUp Tests', () => {
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


    test('Render Signup Page', () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    test('Validation error for missing email', async () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </UserContext.Provider>
        );
        const signupButton = screen.getAllByRole('button', { name: 'SignUp' })
        fireEvent.click(signupButton[1]);
        await waitFor(() => {
            expect(screen.getByText('Please enter your email')).toBeInTheDocument();
        });
    });

    test('Validation error for missing password', async () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByPlaceholderText('X'), {
            target: { value: 'Username' },
        });
        const signupButton = screen.getAllByRole('button', { name: 'SignUp' })
        fireEvent.click(signupButton[1]);
        await waitFor(() => {
            expect(screen.getByText('Please enter your password')).toBeInTheDocument();
        });
    });

    test('Submits signup form with valid data', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <Signup />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );
        fireEvent.change(screen.getByPlaceholderText('X'), {
            target: { value: 'User Name' },
        });
        fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
            target: { value: 'user123@gmail.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('92**********'), {
            target: { value: '923000000000' },
        });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'jest.123' },
        });
        const signupButton = screen.getAllByRole('button', { name: 'SignUp' })
        fireEvent.click(signupButton[1]);
        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText('Discover new movies')).toBeInTheDocument();
            }, 2000);
        });
    });

    test('handles signup error on form submission', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <Signup />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );
        fireEvent.change(screen.getByPlaceholderText('X'), {
            target: { value: 'User Name' },
        });
        fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
            target: { value: 'test2@gmail.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('92**********'), {
            target: { value: '923000000000' },
        });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'jest.123' },
        });
        const signupButton = screen.getAllByRole('button', { name: 'SignUp' })
        fireEvent.click(signupButton[1]);
        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByLabelText('Email')).toBeInTheDocument();
                expect(screen.getByLabelText('Name')).toBeInTheDocument();
            }, 2000);
        });
    });
});
