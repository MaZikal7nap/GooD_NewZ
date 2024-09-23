import React, { useState, useEffect } from 'react';
import Newzitem from './Newzitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'; 

const Newz = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.title = `${props.category} - GooD_NewZ`;
        updateNews();
        // eslint-disable-next-line
    }, []);

    const updateNews = async () => {
        setProgress(10); 
        const url = `httpshttps://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pagesize=${props.pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        setProgress(50);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        setProgress(100);
    }

    const fetchMoreData = async () => {
        setPage(prevPage => prevPage + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(prevArticles => prevArticles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <div className='container my-3'>
            <LoadingBar
                height='5px'
                color='#f11946'
                progress={progress} 
            />
            <h2 className="text-center underline">____GooD NewZ - Top Headlines____</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row my-4">
                        {Array.isArray(articles) && articles.length > 0 ? (
                            articles
                                .filter((element) => element.urlToImage)
                                .map((element) => (
                                    <div className="col-md-4" key={element.url}>
                                        <Newzitem
                                            title={element.title}
                                            description={element.description}
                                            imgUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                ))
                        ) : (
                            <p>No articles available.</p>
                        )}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}

Newz.defaultProps = {
    country: 'in',
    pageSize: 7,
    category: 'general',
};

Newz.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
};

export default Newz;
