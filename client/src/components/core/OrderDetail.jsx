import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const OrderDetail = (props) => {
  const { data, currency } = props;
  const columns = [
    {
      Header: 'Product',
      accessor: 'title',
      width: 300,
      Cell: row => (
        <div>
          <div className="row-title">{ row.value }</div>
          <div className="row-subtitle">{ row.original.code }</div>
        </div>
      ),
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      width: 100,
      Cell: row => (
        <div className="row-single-value">
          <span>{row.value}</span>
        </div>
      ),
    },
    {
      Header: 'Price',
      accessor: 'price',
      width: 100,
      Cell: row => (
        <div className="row-single-value">
          <span>{row.value} { currency }</span>
        </div>
      ),
    },
  ];

  return (
    <ReactTable
      data={data}
      columns={columns}
      showPagination={false}
      getTrGroupProps={(state, rowInfo) => (!rowInfo ? { className: 'hidden' } : {})}
    />
  );
};

OrderDetail.displayName = 'OrderDetail';

OrderDetail.propTypes = {
  data: PropTypes.shape.isRequired,
  currency: PropTypes.string.isRequired,
};

export default OrderDetail;
