import React from 'react';
import PropTypes from 'prop-types';

const PaginationButtons = ({currentPage, pageOnClick}) => {

  return (
      <div className="flex-container-paginationNumbers">
        <button className="btn btn-default btn-sm" value="1" style={currentPage === 1 ? {backgroundColor: "#ccc"} : {}} onClick={pageOnClick}>1</button>
        <button className="btn btn-default btn-sm" value="2" style={currentPage === 2 ? {backgroundColor: "#ccc"} : {}} onClick={pageOnClick}>2</button>
        <button className="btn btn-default btn-sm" value="3" style={currentPage === 3 ? {backgroundColor: "#ccc"} : {}} onClick={pageOnClick}>3</button>
        <button className="btn btn-default btn-sm" value="4" style={currentPage === 4 ? {backgroundColor: "#ccc"} : {}} onClick={pageOnClick}>4</button>
        <button className="btn btn-default btn-sm" value="5" style={currentPage === 5 ? {backgroundColor: "#ccc"} : {}} onClick={pageOnClick}>5</button>
      </div>
  );
};

PaginationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageOnClick: PropTypes.func.isRequired
};

export default PaginationButtons;