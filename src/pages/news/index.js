import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../store/actions/newsAction';

const NewsPage = () => {
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { loading, error, news } = newsList;
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);
    return (
        <div>
            <h1>News Page</h1>
            {/* eslint-disable-next-line no-nested-ternary */}
            <div>{loading ? 'Loading...' : error ? error.message : news.map((u) => <h3>{u}</h3>)}</div>
        </div>
    );
};

export default NewsPage;
