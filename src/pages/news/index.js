import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNews } from '../../store/actions/newsAction';

const NewsPage = () => {
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { loading, error, news } = newsList;
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);
    const history = useHistory();
    return (
        <div>
            <h1>News Page</h1>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading...' : error ? error.message : news.map((item) => (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                    <h3 onClick={() => { history.push(`/news/${item.id}`); }} key={item.id}>{item.time}</h3>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
