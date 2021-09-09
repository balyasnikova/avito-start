import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import {
    Button, Col, Row, Divider,
} from 'antd';
import { ArrowLeftOutlined, RedoOutlined } from '@ant-design/icons';
import { getNewsDescription } from '../../store/actions/newsAction';
import styles from './styles.module.css';
import Comments from './components/comments';

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
            <Row justify="start">
                <Col span={4}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => { history.goBack(); }}
                    >
                        back to news list
                    </Button>
                </Col>
            </Row>
            <div>
                <Divider className={styles.newsTitle}>{currentNews.title}</Divider>
                <div className={styles.urlNews}>
                    <a href={currentNews.url} target="_blank" rel="noreferrer">
                        - go to news source -
                    </a>
                </div>
                <Row className={styles.commentsInfo} justify="space-around">
                    <Col span={4}>
                        <div>
                            by
                            {' '}
                            {currentNews.by}
                        </div>
                    </Col>
                    <Col span={4}>
                        <Moment date={currentNews.time * 1000} format="DD.MM.YYYY HH:mm" />
                    </Col>
                </Row>
                <Row className={styles.countCommentsWrap} justify="space-between" align="middle">
                    <Col span={4} offset={1}>Comments</Col>
                    <Col span={3}>{currentNews.descendants}</Col>
                    <Col
                        className={styles.btnUpdateComments}
                        span={5}
                        offset={8}
                    >
                        <Button
                            size="small"
                            icon={<RedoOutlined />}
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
                {
                    currentNews.kids && currentNews.kids.length
                    && <Comments ids={currentNews.kids} newsId={currentNews.id} />
                }
            </div>
        </div>
    );
};

export default NewsItemPage;
