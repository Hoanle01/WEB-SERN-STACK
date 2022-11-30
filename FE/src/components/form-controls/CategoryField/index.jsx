import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';





function CategoryField(props) {

const [categoryList, setCategoryList] = useState([]);

useEffect(() => {
  (async function () {
    try {
      const data = await categoryApi.getCategories();
      console.log(data)
      setCategoryList(data);
    } catch (error) {}
  })();
}, []);
  const { form, name, label, disable, value } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <div className={error ? 'input-field error' : 'input-field'}>
          <label>{label}</label>
          <select
            style={{
              padding: '5px 10px',
              borderRadius: '7px',
              cursor: 'pointer',
              outline: 'none',
            }}
            disabled={disable}
            name={name}
            onChange={onChange}
          >
            {categoryList.map((item) => (
              <option
                style={{
                  cursor: 'pointer',
                }}
                key={item.id}
                value={item.id}
                selected={value === item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
          {invalid && <span>{error?.message}</span>}
        </div>
      )}
    />
  );
}

export default CategoryField;
