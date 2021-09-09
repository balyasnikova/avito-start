import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { getComments } from '../../../../store/actions/newsAction';
import styles from './styles.module.css';

// eslint-disable-next-line react/prop-types
const Comments = ({ ids = [], newsId }) => {
    const [newsComments, setNewsComments] = useState([]);
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.newsList);
    const { comments } = newsList;
    useEffect(() => {
        dispatch(getComments(ids, newsId)).finally(() => {
            const commentsMap = comments[newsId];
            const keys = Object.keys(commentsMap);
            const result = [];
            for (let i = 0; i < keys.length; i += 1) {
                result.push(commentsMap[keys[i]]);
            }
            setNewsComments(result.filter(({ deleted }) => !deleted));
        });
    }, [dispatch]);

    return (
        <div>
            {
                newsComments.map((comment, index) => (
                    <div className={styles.commentWrap} key={comment.id}>
                        <div className={styles.wrapAuthor}>
                            <div className={styles.author}>{comment.by}</div>
                            { !comment.loaded && comment.kids && (
                                <Button
                                    role="button"
                                    type="link"
                                    icon={<CaretDownOutlined />}
                                    onClick={() => {
                                        dispatch(getComments(comment.kids, comment.id))
                                            .finally(() => {
                                                const newNewsComments = [...newsComments];
                                                newNewsComments[index].loaded = true;
                                                setNewsComments(newNewsComments);
                                            });
                                    }}
                                />
                            )}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                        <div className={styles.nestedComment}>
                            { comment.loaded && <Comments ids={comment.kids} newsId={comment.id} />}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Comments;
