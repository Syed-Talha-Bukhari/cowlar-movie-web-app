import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { IContext } from '../types/context';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import FallbackPage from '../views/fallback';


describe('Fallback Page Renders', () => {

    beforeAll(() => {
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

    let mockContext: IContext;

    beforeEach(() => {
        mockContext = {
            user: null,
            updateUser: jest_.fn(),
            isLogged: false,
            setIsLogged: jest_.fn(),
        };
    });

    test('Renders Home Page', async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <FallbackPage />
                    </MemoryRouter>
                </UserContext.Provider>
            );
        });
        expect(screen.getByText("404")).toBeInTheDocument();
    });

});