/* eslint-disable prettier/prettier */
import { get, post, remove,put } from './request'
import * as qs from 'qs'


const GetPhotos = (villaId) => {
    const query = qs.stringify({
        sort: ['line:asc'],
        fields: ['line'],
        populate: ['photo'],
        filters: {
            villa: {
                id: {
                    $eq: villaId
                }
            }
        },
        pagination: {
            pageSize: 100,
            page: 1,
        },
        publicationState: 'live',
    });
    return get(`/api/photos?${query}`);
}


const PhotoPut = (id, payload) => put(`/api/photos/${id}`, payload, true);
const PhotoPost = ( payload) => post(`/api/photos`, payload, true);

export { GetPhotos,PhotoPut,PhotoPost }