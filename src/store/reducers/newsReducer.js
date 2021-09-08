import {
    GET_NEWS,
    NEWS_ERROR,
    GET_NEWS_DESCRIPTION,
    NEWS_DESCRIPTION_ERROR,
    GET_COMMENTS,
    COMMENTS_ERROR,
} from '../types';

const initialState = {
    news: [],
    newsDescriptions: {},
    comments: {},
    loading: true,
};

export default function f(state = initialState, action) {
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
    case GET_COMMENTS:
        const { comments } = state;
        const { kids, newsId } = action.payload;
        const ids = Object.keys(kids);
        for (let i = 0; i < ids.length; i += 1) {
            comments[newsId] = comments[newsId] || {};
            comments[newsId][ids[i]] = kids[ids[i]];
        }
        return {
            ...state,
            comments,
            loading: false,

        };
    case COMMENTS_ERROR:
        return {
            loading: false,
            error: action.payload,

        };
    default: return state;
    }
}
