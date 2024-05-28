import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import GeneralSettings from 'pages/settings/general-settings';
import UserList from 'pages/settings/user-settings/user-list';
import RoleList from 'pages/settings/user-settings/role-list';
import Default from 'pages/default';
import VillasList from 'pages/facilities/villas-list';
import ApartsList from 'pages/facilities/apars-list';

const ErrorPage = Loadable(lazy(() => import('pages/error-pages/404')));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/default',
          url: '/default',
          index: true,
          element: <Default />
        },
        {
          path: '/facilities',
          children: [
            {
              path: 'villas-list',
              element: <VillasList />
            },
            {
              path: 'aparts-list',
              element: <ApartsList />
            }
          ]
        },
        {
          path: '/settings',
          children: [
            {
              path: 'general-settings',
              element: <GeneralSettings />
            },
            {
              children: [
                {
                  path: 'user-list',
                  element: <UserList />
                },
                {
                  path: 'role-list',
                  element: <RoleList />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]
};

export default MainRoutes;
