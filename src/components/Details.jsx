import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  const handleCheckboxChange = (event, name, address, invoiceNumber) => {
    if (event.target.checked) {
      setInvoices([...invoices, { name, address, invoiceNumber }]);
    } else {
      setInvoices(invoices.filter(invoice => invoice.name !== name));
    }
  };

  const [invoiceNumber, setInvoiceNumber] = useState(123);

  const handleInvoiceNumberChange = (event) => {
    setInvoiceNumber(parseInt(event.target.value, 10));
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Invoice List</h1>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Invoice Number</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={invoiceNumber}
          onChange={handleInvoiceNumberChange}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Invoice Number</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {dataArr?.map((ele,i) =>{
            
          })}
          <tr>
            <td>John Doe</td>
            <td>123 Main St</td>
            <td>{invoiceNumber + 1}</td>
            <td>
              <input
                type="checkbox"
                onChange={event => handleCheckboxChange(event, 'John Doe', '123 Main St', (invoiceNumber + 1).toString())}
              />
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>456 Elm St</td>
            <td>{invoiceNumber + 2}</td>
            <td>
              <input
                type="checkbox"
                onChange={event => handleCheckboxChange(event, 'Jane Smith', '456 Elm St', (invoiceNumber + 2).toString())}
              />
            </td>
          </tr>
          
          <tr>
            <td>Jane Smith</td>
            <td>456 Elm St</td>
            <td>{invoiceNumber + 3}</td>
            <td>
              <input
                type="checkbox"
                onChange={event => handleCheckboxChange(event, 'kartik kapoor', 'jawalamukhi', (invoiceNumber + 3).toString())}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-center mb-4">Selected Invoices</h2>
      <ul className="list-group">
        {invoices.map(invoice => (
          <li key={invoice.name} className="list-group-item">
            {invoice.name} - {invoice.address} - {invoice.invoiceNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;