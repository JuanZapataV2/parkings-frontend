import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'user-outline',
    link: '/pages/users/list',
    children: [
      {
        title: 'Create',
        link: '/pages/users/create',
      },
      {
        title: 'List',
        link: '/pages/users/list',
      }
    ],
  },
  // {
  //   title: 'Roles',
  //   icon: 'user-outline',
  //   link: '/pages/roles/list',
  //   children: [
  //     {
  //       title: 'Create',
  //       link: '/pages/roles/create',
  //     },
  //     {
  //       title: 'List',
  //       link: '/pages/roles/list',
  //     }
  //   ],
  // },
  {
    title: 'Parkings',
    icon: 'user-outline',
    link: '/pages/parkings/list',
    children: [
      {
        title: 'Create',
        link: '/pages/parkings/create',
      },
      {
        title: 'List',
        link: '/pages/parkings/list',
      }
    ],
  },
  {
    title: 'Vehicles',
    icon: 'user-outline',
    link: '/pages/vehicles/list',
    children: [
      {
        title: 'Create',
        link: '/pages/vehicles/create',
      },
      {
        title: 'List',
        link: '/pages/vehicles/list',
      }
    ],
  },
  // {
  //   title: 'Extra Components',
  //   icon: 'message-circle-outline',
  //   children: [
  //     {
  //       title: 'Calendar',
  //       link: '/pages/extra-components/calendar',
  //     },
  //     {
  //       title: 'Progress Bar',
  //       link: '/pages/extra-components/progress-bar',
  //     },
  //     {
  //       title: 'Spinner',
  //       link: '/pages/extra-components/spinner',
  //     },
  //     {
  //       title: 'Alert',
  //       link: '/pages/extra-components/alert',
  //     },
  //     {
  //       title: 'Calendar Kit',
  //       link: '/pages/extra-components/calendar-kit',
  //     },
  //     {
  //       title: 'Chat',
  //       link: '/pages/extra-components/chat',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
