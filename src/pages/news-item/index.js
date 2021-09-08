import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import {
    Button, Col, Row, Divider,
} from 'antd';
import { getNewsDescription } from '../../store/actions/newsAction';
import styles from './styles.module.css';

const NewsItemPage = () => {
    const [currentNews, setCurrentNews] = useState({});
    const { newsId } = useParams();
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { newsDescriptions } = newsList;
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
        <div className={styles.wrap}>
            <h1>
                News Item Page
            </h1>
            <Row justify="end">
                <Col span={4}>
                    <Button
                        onClick={() => { history.goBack(); }}
                    >
                        to news list
                    </Button>
                </Col>
            </Row>
            <div>
                <Divider className={styles.newsTitle}>{currentNews.title}</Divider>
                <Row justify="space-around">
                    <Col span={4}>
                        <Moment date={currentNews.time * 1000} format="DD.MM.YYYY HH:mm" />
                    </Col>
                    <Col span={4}>
                        <div>
                            by
                            {' '}
                            {currentNews.by}
                        </div>
                    </Col>
                </Row>
                <Row className={styles.countCommentsWrap} justify="space-between" align="middle">
                    <Col span={4} offset={4}>Comments</Col>
                    <Col span={3}>{currentNews.descendants}</Col>
                    <Col span={5} offset={8}>
                        <Button
                            size="small"
                            onClick={() => {
                                dispatch(getNewsDescription(newsId)).finally(() => {
                                    setCurrentNews(newsDescriptions[newsId]);
                                });
                            }}
                        >
                            update comments
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default NewsItemPage;
