import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Button } from 'antd';
import { getNewsDescription } from '../../store/actions/newsAction';
import styles from './styles.module.css';

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

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getNewsDescription(newsId)).finally(() => {
                setCurrentNews(newsDescriptions[newsId]);
            });
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch]);
    const history = useHistory();
    return (
        <div>
            <h1>
                News Item Page
            </h1>
            <Button onClick={() => { history.goBack(); }}>К списку новостей</Button>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading...' : error ? error.message : JSON.stringify(currentNews.kids || [])}
            </div>
            <div className={styles.itemInfo}>
                <div>{currentNews.title}</div>
                <Moment date={currentNews.time * 1000} format="DD.MM.YYYY HH:mm" />
                <div>{currentNews.by}</div>
                <Button
                    onClick={() => {
                        dispatch(getNewsDescription(newsId)).finally(() => {
                            setCurrentNews(newsDescriptions[newsId]);
                        });
                    }}
                    className={styles.updateComment}
                >
                    Обновить комментарии
                </Button>
            </div>
        </div>
    );
};

export default NewsItemPage;
