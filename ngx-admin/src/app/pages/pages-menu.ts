import { NbMenuItem } from '@nebular/theme';
import { AdministratorGuard } from '../guards/administrator.guard';
import { CanActivate } from '@angular/router';

export const MENU_ITEMS: NbMenuItem[] = [
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
  {
    title: 'Reservations',
    icon: 'user-outline',
    link: '/pages/reservations/list',
    children: [
      {
        title: 'Create',
        link: '/pages/reservations/create',
      },
      {
        title: 'List',
        link: '/pages/reservations/list',
      },
      {
        title: 'My reservations',
        link: '/pages/reservations/myReservations',
      }
    ],
  },
  {
    title: 'Ratings',
    icon: 'user-outline',
    link: '/pages/ratings/list',
    children: [
      {
        title: 'Create',
        link: '/pages/ratings/create',
      },
      {
        title: 'List',
        link: '/pages/ratings/list',
      }
    ],
  },
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
      },
      {
        title: 'My vehicles',
        link: '/pages/vehicles/getVehicles',
      }
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/security/login',
      },
      {
        title: 'Register',
        link: '/pages/security/create',
      }
    ],
  },
];
