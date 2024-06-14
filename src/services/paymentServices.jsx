/* eslint-disable prettier/prettier */
import { get, post,remove } from './request';


const GetAllPaymentsByReservation = (reservationId) => {
    return get(`/api/reservations/${reservationId}?populate[villa][fields][0]=id&populate[villa][fields][1]=name&populate[payments][fields][0]=amount&populate[payments][fields][1]=id&populate[payments][fields][2]=description&populate[payments][fields][3]=createdAt&populate[payments][populate][0]=payment_type&pagination[pageSize]=10&pagination[page]=1`);
}

const AddPayment = (payload) =>
    post(
        `/api/payments`, payload, true
    );

const PaymentRemove = (id) => remove('/api/payments/' + id)


export { GetAllPaymentsByReservation, AddPayment, PaymentRemove }