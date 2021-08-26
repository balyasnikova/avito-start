import axios from 'axios';
import {
    GET_NEWS,
    NEWS_ERROR,
    GET_NEWS_DESCRIPTION,
    NEWS_DESCRIPTION_ERROR,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getNews = () => async (dispatch) => {
    try {
        const res = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        dispatch({
            type: GET_NEWS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: NEWS_ERROR,
            payload: error,
        });
    }
};

export const getNewsDescription = (newsId) => async (dispatch) => {
    try {
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`);
        dispatch({
            type: GET_NEWS_DESCRIPTION,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: NEWS_DESCRIPTION_ERROR,
            payload: error,
        });
    }
};
