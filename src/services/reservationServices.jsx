/* eslint-disable prettier/prettier */
import { get, post, remove } from './request';


const GetReservations = (page, size, sort = true, fieldName = 'id', filter, id) =>
    get(
        `/api/reservations?sort=${fieldName}:${sort ? 'desc' : 'asc'}&pagination[page]=${page}&pagination[pageSize]=${size}&populate[reservation_infos][fields][0]=name&populate[reservation_infos][fields][1]=surname&filters[$and][0][villa][id][$eq]=${id}&filters[$and][1][reservation_infos][name][$containsi]=${filter}`
    );

const GetReservation = (id) =>
    get(
        `/api/reservations/${id}?populate[photos][populate][0]=photo&populate[reservations][populate][reservation_infos][filters][owner]=true`
    );


const AddReservation = (payload) =>
    post(
        `/api/reservations`, payload, true
    );

    const AddReservationInfo = (payload) =>
        post(
            `/api/reservation-infos`, payload, true
        );
export { GetReservations, GetReservation, AddReservation,AddReservationInfo }