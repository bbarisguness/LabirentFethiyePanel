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

const GetAvailibleDate = (villaId) => {
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth().toString().length === 1 ? '0' + (newDate.getMonth() + 1).toString() : (newDate.getMonth() + 1).toString();
    let day = newDate.getDate().toString().length === 1 ? '0' + newDate.getDate().toString() : newDate.getDate().toString();

    return get(`/api/reservations?filters[$or][0][checkOut][$gte]=${year}-${month}-${day}&filters[$or][1][checkIn][$eq]=${year}-${month}-${day}&filters[reservationStatus][$ne]=110&filters[villa][id][$eq]=${villaId}&sort[0]=checkIn:asc&fields[0]=checkIn&fields[1]=checkOut&pagination[pageSize]=100&pagination[page]=1`)
}
export { GetReservations, GetReservation, AddReservation, AddReservationInfo, GetAvailibleDate }