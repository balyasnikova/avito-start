import axios from 'axios';
import {
    GET_NEWS,
    GET_NEWS_DESCRIPTION,
    NEWS_DESCRIPTION_ERROR,
    NEWS_ERROR,
    GET_COMMENTS,
    COMMENTS_ERROR,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getNews = () => async (dispatch) => {
    try {
        const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        const requests = [];
        for (let i = 0; i < 100; i += 1) {
            requests.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`));
        }
        const responses = await axios.all(requests);
        const newsDescriptions = responses.reduce((acc, { data: item }) => {
            const res = acc;
            res[item.id] = item;
            return res;
        }, {});
        const newsList = responses.map(({ data: item }) => item).sort((a, b) => {
            if (a.time > b.time) {
                return -1;
            }
            if (a.time < b.time) {
                return 1;
            }
            return 0;
        });
        dispatch({
            type: GET_NEWS,
            payload: {
                newsList,
                newsDescriptions,
            },
        });
    } catch (error) {
        dispatch({
            type: NEWS_ERROR,
            payload: error,
        });
    }
};

export const getComments = (kids = [], newsId) => async (dispatch) => {
    try {
        const requests = [];
        for (let i = 0; i < kids.length; i += 1) {
            requests.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${kids[i]}.json`));
        }
        const responses = await axios.all(requests);
        dispatch({
            type: GET_COMMENTS,
            payload: {
                kids: responses.reduce((acc, { data: item }) => {
                    const r = acc;
                    r[item.id] = {
                        ...item,
                        loaded: false,
                    };
                    return r;
                }, {}),
                newsId,
            },
        });
    } catch (error) {
        dispatch({
            type: COMMENTS_ERROR,
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
