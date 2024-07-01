
import { defineStore } from 'pinia';

interface RouteInfo {
    bossId: number;
    name: string;
    difficulty: number;
    nbLetter: number;
}

export const useRouteStore = defineStore('route', {
    state: () => ({
        selectedRoute: null as RouteInfo | null,
    }),
    actions: {
        setRoute(routeInfo: RouteInfo) {
            this.selectedRoute = routeInfo;
        },
        clearRoute() {
            this.selectedRoute = null;
        },
    },
});
