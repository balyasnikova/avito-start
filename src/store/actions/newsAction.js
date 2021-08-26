import {GET_NEWS, NEWS_ERROR} from '../types'
import axios from 'axios'

export const getNews = () => async dispatch => {

    try{
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json`)
        dispatch( {
            type: GET_NEWS,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: NEWS_ERROR,
            payload: error,
        })
    }

}