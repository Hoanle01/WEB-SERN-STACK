import React from 'react';

function ProductFilter({ onChange, params }) {
  const handleSaleClick = () => {
    if (!onChange) return;
    if (params['sortbysale'] === 'true') {
      const newParams = { ...params };
      delete newParams['sortbysale'];
      onChange(newParams);
    } else onChange({ ...params, 'sortbysale': true });
  };

  const handleNewProductClick = () => {
    if (!onChange) return;
    if (params['dateupdate'] === 'true') {
      const newParams = { ...params };
      delete newParams['dateupdate'];
      onChange(newParams);
    } else onChange({ ...params, 'dateupdate': true });
  };

  const handleSortASCClick = () => {
    if (!onChange) return;
    if (params.asc === 'true') {
      const newParams = { ...params };
      delete newParams.asc;
      onChange(newParams);
    } else {
      const newParams = { ...params };
      delete newParams.desc;
      onChange({ ...newParams, asc: true });
    }
  };

  const handleSortDESCClick = () => {
    if (!onChange) return;
    if (params.desc === 'true') {
      const newParams = { ...params };
      delete newParams.desc;
      onChange(newParams);
    } else {
      const newParams = { ...params };
      delete newParams.asc;
      onChange({ ...newParams, desc: true });
    }
  };

  return (
    <div className='product-filter'>
      <span>Ưu tiên xem: &nbsp;</span>
      <ul>
        <li
          className={params['sortbysale'] === 'true' ? 'active' : ''}
          onClick={handleSaleClick}
        >
          Khuyến Mãi
        </li>
        <li
          className={params['dateupdate'] === 'true' ? 'active' : ''}
          onClick={handleNewProductClick}
        >
          Hàng mới
        </li>
        <li
          className={params.asc === 'true' ? 'active' : ''}
          onClick={handleSortASCClick}
        >
          Giá Thấp
        </li>
        <li
          className={params.desc === 'true' ? 'active' : ''}
          onClick={handleSortDESCClick}
        >
          Giá Cao
        </li>
      </ul>
    </div>
  );
}

export default ProductFilter;
