import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    console.log('===>', newsComments);
    return (
        <div>
            {
                newsComments.map((comment) => (
                    <div className={styles.commentWrap} key={comment.id}>
                        <div className={styles.author}>{comment.by}</div>
                        <div>{comment.text}</div>
                        { comment.kids && <div>Загрузить вложенные</div>}
                    </div>
                ))
            }
        </div>
    );
};

export default Comments;
