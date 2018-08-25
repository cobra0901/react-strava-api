import React from 'react';
import PropTypes from 'prop-types';
import PaginationButtons from './PaginationButtons';

const Pagination = ({pageLeftonClick, pageRightonClick, pageOnClick, currentPage}) => {
  return (
      <div className="flex-container">
        <button type="button"
                className="btn btn-default btn-sm"
                onClick={pageLeftonClick}
                disabled={currentPage === 1}>
                <span className="glyphicon glyphicon-triangle-left"></span>
        </button>
        <PaginationButtons
            currentPage={currentPage}
            pageOnClick={pageOnClick}
        />
        <button type="button"
                className="btn btn-default btn-sm"
                onClick={pageRightonClick}
                disabled={currentPage === 5}>
                <span className="glyphicon glyphicon-triangle-right"></span>
        </button>
      </div>
  );
};

Pagination.propTypes = {
  pageLeftonClick: PropTypes.func.isRequired,
  pageRightonClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageOnClick: PropTypes.func.isRequired
};

export default Pagination;