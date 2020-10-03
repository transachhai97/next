import React from 'react';
import PropTypes from 'prop-types';

function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const errStatus = err ? err.statusCode : 404;
    const statusCode = res ? res.statusCode : errStatus;
    return { statusCode };
};

Error.propTypes = {
    statusCode: PropTypes.number,
};

Error.defaultProps = {
    statusCode: 404,
};

export default Error;
