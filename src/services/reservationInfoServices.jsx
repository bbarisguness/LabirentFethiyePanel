/* eslint-disable prettier/prettier */
import { get, post, remove } from './request';


const GetAllReservationInfos = (reservationId) => {

    return get(`/api/reservation-infos?sort=name:asc&pagination[page]=1&pagination[pageSize]=100&filters[reservation][id][$eq]=${reservationId}`);

}
const AddReservationInfo = (payload) =>
    post(
        `/api/reservation-infos`, payload, true
    );

const ReservationInfoRemove = (id) => remove('/api/reservation-infos/' + id)


export { GetAllReservationInfos, AddReservationInfo, ReservationInfoRemove }