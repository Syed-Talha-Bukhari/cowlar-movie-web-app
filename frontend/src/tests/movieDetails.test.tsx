import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { IContext } from '../types/context';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import MovieDetails from '../views/movieDetails';

jest_.mock('../api/movies', () => ({
    getMovie: jest_.fn(),
}));

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

    test('Renders Movie Page', async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <MovieDetails />
                    </MemoryRouter>
                </UserContext.Provider>
            );
        });
    
        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText('You need to Log In to view User Feedback')).toBeInTheDocument();
            }, 2000);
        });
    });

});