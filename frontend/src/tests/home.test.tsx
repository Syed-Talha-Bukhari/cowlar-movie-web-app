import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { IContext } from '../types/context';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import Home from '../views/home';

describe('Movie Details Page Renders', () => {

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
                        <Home />
                    </MemoryRouter>
                </UserContext.Provider>
            );
        });
        expect(screen.getByText("Discover new movies from our collection of movies, view top rated movies, add new movies on platform and provide feedback on watched movies.")).toBeInTheDocument();
    });

});