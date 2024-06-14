/* eslint-disable prettier/prettier */
import { get } from './request';


const GetAllReservationItems = (reservationId) => {

    return get(`/api/reservation-items?sort=day:asc&pagination[page]=1&pagination[pageSize]=100&filters[reservation][id][$eq]=${reservationId}`);

}



export { GetAllReservationItems }