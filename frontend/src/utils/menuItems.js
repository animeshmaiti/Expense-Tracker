import {dashboard, expenses, trend} from '../utils/icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/'
    },
    {
        id: 2,
        title: "Incomes",
        icon: trend,
        link: "/incomes",
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
]