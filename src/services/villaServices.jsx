import { get, post } from './request'

export const Villas = () => get('/api/villas')

export const VillaAdd = (payload) => post('/villas', payload)

