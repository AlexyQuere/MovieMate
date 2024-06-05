import React, { useState } from 'react';

const CheckboxExample = ({ setCheckedValue }) => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckbox1(name === 'checkbox1' ? checked : false);
    setCheckbox2(name === 'checkbox2' ? checked : false);
    setCheckbox3(name === 'checkbox3' ? checked : false);

    if (checked) {
      setCheckedValue(
        name === 'checkbox1'
          ? 'Action'
          : name === 'checkbox2'
          ? 'Comedy'
          : 'Thriller'
      );
    } else {
      setCheckedValue(null);
    }
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          name="checkbox1"
          checked={checkbox1}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox1">Action</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox2"
          checked={checkbox2}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox2">Comedy</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox3"
          checked={checkbox3}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox3">Thriller</label>
      </div>
    </div>
  );
};

export default CheckboxExample;
