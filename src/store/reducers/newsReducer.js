import {
    GET_NEWS,
    NEWS_ERROR,
    GET_NEWS_DESCRIPTION,
    NEWS_DESCRIPTION_ERROR,
} from '../types';

const initialState = {
    news: [],
    newsDescriptions: {},
    loading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_NEWS:
        return {
            ...state,
            news: action.payload.newsList,
            newsDescriptions: action.payload.newsDescriptions,
            loading: false,

        };
    case NEWS_ERROR:
        return {
            loading: false,
            error: action.payload,
        };
    case GET_NEWS_DESCRIPTION:
        // eslint-disable-next-line no-case-declarations
        const { newsDescriptions } = state;
        newsDescriptions[action.payload.id] = action.payload;
        return {
            ...state,
            newsDescriptions,
            loading: false,

        };
    case NEWS_DESCRIPTION_ERROR:
        return {
            loading: false,
            error: action.payload,

        };
    default: return state;
    }
}
