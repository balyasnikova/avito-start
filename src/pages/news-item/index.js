import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsDescription } from '../../store/actions/newsAction';

const NewsItemPage = () => {
    const [currentNews, setCurrentNews] = useState({});
    const { newsId } = useParams();
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { loading, error, newsDescriptions } = newsList;
    useEffect(() => {
        if (!newsDescriptions[newsId]) {
            dispatch(getNewsDescription(newsId)).finally(() => {
                setCurrentNews(newsDescriptions[newsId]);
            });
        } else {
            setCurrentNews(newsDescriptions[newsId]);
        }
    }, [dispatch]);
    return (
        <div>
            <h1>
                News Item Page
            </h1>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading...' : error ? error.message : JSON.stringify(currentNews)}
            </div>
        </div>
    );
};

export default NewsItemPage;
