import React from "react";
import {useParams} from "react-router-dom";

export const NewsItemPage = () => {
    const {newsId} = useParams();
    return (
        <div>
            <h1>
                News Item Page {newsId}
            </h1>
        </div>
    )
}