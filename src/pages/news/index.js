import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
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
            <Row justify="center" align="middle">
                <Col span={12} offset={6}>
                    <h1>Hacker News</h1>
                </Col>
                <Col span={6}>
                    <Button
                        onClick={() => { dispatch(getNews()); }}
                    >
                        update news list
                    </Button>
                </Col>
            </Row>
            <div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading...' : error ? error.message : news.map((item) => (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div className={styles.wrapItem} key={item.id} onClick={() => { history.push(`/news/${item.id}`); }}>
                        <h4 className={styles.newsTitle}>{item.title}</h4>
                        <Row justify="start" className={styles.itemInfoWrap}>
                            <Col span={4} className={styles.itemInfo}>
                                by
                                {' '}
                                {item.by}
                            </Col>
                            <Col span={3} className={styles.itemInfo}>
                                score
                                {' '}
                                {item.score}
                            </Col>
                            <Col span={5}>
                                <Moment className={styles.itemInfo} date={item.time * 1000} format="DD.MM.YYYY HH:mm" />
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
