import { get, post, remove } from './request'

export const Villas = (page, size, sort = true, fieldName = 'id', filter) => get(`/api/villas?sort=${fieldName}:${sort ? 'desc' : 'asc'}&filters[name][$containsi]=${filter}&pagination[page]=${page}&pagination[pageSize]=${size}`)

export const VillaAdd = (payload) => post('/villas', payload)
export const VillaRemove = (id) => remove('/api/villas/' + id)

