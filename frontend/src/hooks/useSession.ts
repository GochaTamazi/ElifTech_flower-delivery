// src/hooks/useSession.ts
import {useEffect, useState, useCallback} from 'react';

interface UseSessionReturn {
    userId: string | null;
    isLoading: boolean;
    setUserId: (id: string | null) => void;
    setIsLoading: (loading: boolean) => void;
}

export const useSession = (): UseSessionReturn => {
    const [userId, setUserIdState] = useState<string | null>(null);
    const [isLoading, setIsLoadingState] = useState<boolean>(true);

    // Function to generate a random user ID
    const generateUserId = useCallback((): string => {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }, []);

    // Get or create user ID
    const getOrCreateUserId = useCallback((): string => {
        let id = localStorage.getItem('userId');
        if (!id) {
            id = generateUserId();
            localStorage.setItem('userId', id);
        }
        return id;
    }, [generateUserId]);

    // Register session on the server
    const registerSession = useCallback(async (id: string) => {
        try {
            await fetch('/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: id }),
            });
        } catch (error) {
            console.error('Session registration error:', error);
        }
    }, []);

    // Set user ID with type safety
    const setUserId = useCallback((id: string | null) => {
        setUserIdState(id);
        if (id) {
            localStorage.setItem('userId', id);
        } else {
            localStorage.removeItem('userId');
        }
    }, []);

    // Set loading state
    const setIsLoading = useCallback((loading: boolean) => {
        setIsLoadingState(loading);
    }, []);

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const id = getOrCreateUserId();
                setUserId(id);
                await registerSession(id);
            } catch (error) {
                console.error('Error initializing session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeSession();
    }, [getOrCreateUserId, registerSession, setUserId, setIsLoading]);

    return {
        userId,
        isLoading,
        setUserId,
        setIsLoading
    };
};