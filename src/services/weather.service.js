import { storageService } from './local-storage.service.js'
const axios = require('axios')
const KEY = 'weatherDB'
const API_KEY = 'OXGZWJJ3iMSbkYY7BwQjwlGHaednFCPn'

export const weatherService = {
    query,
    getLocationKey,
    post,
    put,
    remove,
    postMany
}

async function query(searchBy) {
    let db = JSON.parse(localStorage.getItem(KEY)) || {}
    if (db && db[searchBy]) {
        return db[searchBy]
    }
    try {
        const locationKey = await getLocationKey(searchBy);
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
        db[searchBy] = {
            key: locationKey,
            dailyForecasts: res.data.DailyForecasts,
            headline: res.data.Headline
        }
        _save(KEY, db)
        return db[searchBy]
    } catch (err) {
        console.log('Error in query service!', err)
    }
}

async function getLocationKey(searchBy) {
    let db = JSON.parse(localStorage.getItem(KEY)) || {}
    if (db && db[searchBy]) return db[searchBy].key
    else {
        const query = searchBy.split(' ').join('%20')
        try {
            const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`)
            db[searchBy] = { 'key': res.data[0].Key };
            _save(KEY, db)
            return res.data[0].Key;
        } catch (err) {
            console.log('Error!', err)
        }
    }
}

async function post(entityType, newEntity) {
    newEntity._id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function postMany(entityType, newEntities) {
    const entities = await query(entityType)
    newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType, entityId) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
    return entities
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}