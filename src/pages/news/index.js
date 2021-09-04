import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { getNews } from '../../store/actions/newsAction';
import styles from './styles.module.css';

const NewsPage = () => {
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { loading, error, news } = newsList;
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getNews());
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch]);
    const history = useHistory();
    return (
        <div className={styles.wrap}>
            <h1>Hacker News</h1>
            <Button onClick={() => { dispatch(getNews()); }} variant="outline-secondary">Обновить список новостей</Button>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading...' : error ? error.message : news.map((item) => (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div className={styles.wrapItem} key={item.id} onClick={() => { history.push(`/news/${item.id}`); }}>
                        <h5 className={styles.newsTitle}>{item.title}</h5>
                        <div className={styles.itemInfoWrap}>
                            <div className={styles.itemInfo}>
                                by
                                {' '}
                                {item.by}
                            </div>
                            <div className={styles.itemInfo}>
                                score
                                {' '}
                                {item.score}
                            </div>
                            <Moment className={styles.itemInfo} date={item.time * 1000} format="DD.MM.YYYY HH:mm" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
