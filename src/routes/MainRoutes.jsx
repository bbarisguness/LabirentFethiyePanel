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
import VillaAdd from 'pages/facilities/villa-add';
import VillaShow from 'pages/facilities/villa-show';
import VillaSummary from 'pages/facilities/tabs/villa-summary';
import VillaReservation from 'pages/facilities/tabs/villa-reservation';
import VillaPrice from 'pages/facilities/tabs/villa-price';
import VillaGallery from 'pages/facilities/tabs/villa-gallery';
import VillaFile from 'pages/facilities/tabs/villa-file';
import VillaContent from 'pages/facilities/tabs/villa-content';
import VillaAvailableDate from 'pages/facilities/tabs/villa-available-date';
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/Dashboard';
import VillaUpdate from 'pages/facilities/villa-update';
import ReservationsList from 'pages/reservations/reservation-list';
import ReservationAdd from 'pages/reservations/reservation-add';
import ReservationShow from 'pages/reservations/reservation-show';
import ReservationSummary from 'pages/reservations/tabs/reservation-summary';
import ReservationPriceDetail from 'pages/reservations/tabs/reservation-price-details';
import ReservationPayment from 'pages/reservations/tabs/reservation-payments';
import ReservationCustomer from 'pages/reservations/tabs/reservation-customers';


const ErrorPage = Loadable(lazy(() => import('pages/error-pages/404')));

const MainRoutes = {
  path: '/',
  children: [
    {
      element: <AuthGuard><MainLayout /></AuthGuard>,
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
              path: 'villas-add',
              element: <VillaAdd />
            },
            {
              path: 'villas-update/:id',
              element: <VillaUpdate />
            },
            {
              path: 'villas-show',
              element: <VillaShow />,
              children: [
                {
                  path: 'summary/:id',
                  element: <VillaSummary />
                },
                {
                  path: 'reservation/:id',
                  element: <VillaReservation />
                },
                {
                  path: 'price/:id',
                  //element: <VillaPrice />
                  element: <VillaPrice />
                },
                {
                  path: 'gallery/:id',
                  element: <VillaGallery />
                },
                {
                  path: 'file/:id',
                  element: <VillaFile />
                },
                {
                  path: 'content/:id',
                  element: <VillaContent />
                },
                {
                  path: 'available-date/:id',
                  element: <VillaAvailableDate />
                }
              ]
            },
            {
              path: 'aparts-list',
              element: <ApartsList />
            }
          ]
        },        
        {
          path: '/reservations',
          children: [
            {
              path: 'list',
              element: <ReservationsList />
            },
            {
              path: 'add',
              element: <ReservationAdd />
            },
            {
              path: 'show',
              element: <ReservationShow />,
              children: [
                {
                  path: 'summary/:id',
                  element: <ReservationSummary />
                },
                {
                  path: 'price-details/:id',
                  element: <ReservationPriceDetail />
                },
                {
                  path: 'payments/:id',
                  //element: <VillaPrice />
                  element: <ReservationPayment />
                },
                {
                  path: 'customers/:id',
                  element: <ReservationCustomer />
                }
              ]
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
