export interface ISidebarRouteItem {
    path: string;
    name: string;
    icon?: string;
}

const routes: ISidebarRouteItem[] = [
    { path: '/', name: 'Dashboard', icon: 'design_app' },
    { path: '/report', name: 'Report', icon: 'business_chart-bar-32' },
    { path: '/notification', name: 'Notification', icon: 'ui-1_bell-53' },
    { path: '/profile', name: 'User Profile', icon: 'users_single-02' },
];

export default routes;
