import { defineStore } from 'pinia';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const apiUrl = import.meta.env.VITE_API_URL;

interface AuthState {
    token: string | null;
    user: Record<string, any> | null;
    player: Record<string, any> | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: null,
        user: null,
        player: null,
    }),
    actions: {
        setToken(token: string): void {
            this.token = token;
            localStorage.setItem('authToken', token);
            this.fetchUser();
        },
        async fetchUser(): Promise<void> {
            if (this.token) {
                try {
                    const response = await axios.get(`${apiUrl}/auth/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    });
                    this.user = response.data;

                    if (this.user && this.user.userId) {
                        const playerResponse = await axios.get(`${apiUrl}/player/user/${this.user.userId}`, {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },
                        });
                        this.player = playerResponse.data;

                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des informations utilisateur ou joueur', error);
                }
            }
        },
        logout(): void {
            this.token = null;
            this.user = null;
            this.player = null;
            localStorage.removeItem('authToken');
        },
        loadTokenFromStorage(): void {
            const token = localStorage.getItem('authToken');
            if (token) {
                this.token = token;
                this.fetchUser();
            }
        },
        async refreshToken(): Promise<void> {
            try {
                const response = await axios.post(`${apiUrl}/auth/refresh-token`, {}, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.setToken(response.data.access_token);
            } catch (error) {
                console.error('Erreur lors du rafraîchissement du token', error);
                this.logout();
            }
        },
        isTokenExpired(token: string): boolean {
            const decoded: any = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        },
        async ensureTokenValidity(): Promise<void> {
            if (this.token && this.isTokenExpired(this.token)) {
                await this.refreshToken();
            }
        },
    },
});
