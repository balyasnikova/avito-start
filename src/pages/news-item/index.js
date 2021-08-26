import React from 'react';
import { useParams } from 'react-router-dom';

const NewsItemPage = () => {
    const { newsId } = useParams();
    return (
        <div>
            <h1>
                News Item Page
                {' '}
                {newsId}
            </h1>
        </div>
    );
};

export default NewsItemPage;
