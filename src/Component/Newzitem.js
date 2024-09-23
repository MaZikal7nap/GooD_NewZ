import React from 'react';
const Newzitem = (props) => {

  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-4 mx-1'>
      <div className="card news-card">
        <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger source-badge}">
          {source}
        </div>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );

}

export default Newzitem;
