import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../constant';
import DownloadButton from './DownloadSheet';

export const HomePage = () => {
  const [dataArr, setDataArr] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('01');

  const monthMap = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12'
  };

  // State to store the selected month

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log('Selected Month:', event.target.value);
  };

  const handleDownloadPdf = () => {
    invoices.map((ele, i) => {
      console.log('hello', ele);
      axios({
        url: url,
        method: 'POST',
        responseType: 'blob', // Important: responseType as 'blob' to handle binary data
        data: ele,
      })
        .then(res => {
          // Create a blob object from the response data
          // console.log('res from post:', res)
          // return
          const blob = new Blob([res.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          let fileName = 'invoice_' + Date.now() + '.pdf';
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();

          // Cleanup: remove the link element and revoke the URL object
          document.body.removeChild(link);
          url.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading PDF:', error);
          // Handle error if needed
        });
      });
    };
    
    const fetchData = () => {
    axios.get(`${url}?month=${selectedMonth}`).then(res => {
      console.log('res:', res.data);
      setDataArr(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [selectedMonth]);


  const handleCheckboxChange = (event, valueObj, invoiceNum) => {
    if (event.target.checked) {
      setInvoices([...invoices, { ...valueObj, invoiceNum }]);
    } else {
      // Filter out the invoice to be removed based on a unique identifier like id
      setInvoices(invoices.filter(invoice => invoice.id !== valueObj.id));
    }
  };

  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const handleInvoiceNumberChange = event => {
    setInvoiceNumber(parseInt(event.target.value, 10));
  };

  const selectAllCheckboxes = () => {
    const allInvoices = dataArr.map((ele, i) => ({
      ...ele,
      invoiceNumber: invoiceNumber + i,
    }));
    setInvoices(allInvoices);
  };

  const deselectAllCheckboxes = () => {
    setInvoices([]);
  };

  return (
    <>
      <div className='mx-4'>
        <h1 className='text-center mb-4'>Invoice List</h1>
        <div className='input-group mb-3' >
          <div className='input-group-prepend'>
            <span className='input-group-text'>Invoice Number</span>
          </div>
          <input
            type='number'
            className='form-control'
            value={invoiceNumber}
            onChange={handleInvoiceNumberChange}
          />
        </div>

    <div className="d-flex flex-column align-items-start">
      <select 
        id="month-select" 
        value={selectedMonth} 
        onChange={handleMonthChange} 
        className="form-select form-select-sm" // Bootstrap class for smaller select
        style={{ maxWidth: '200px' }} // Limit the width
      >
        <option value="" disabled>Select a month</option>
        {Object.entries(monthMap).map(([month, value]) => (
          <option key={value} value={value}>
            {month}
          </option>
        ))}
      </select>
    </div>

        <div className='mb-3'>
          <div className='row justify-content-end'>
            <DownloadButton testData={dataArr} />
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-outline-success ml-2'
                onClick={handleDownloadPdf}>
                Download All
              </button>
            </div>
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-outline-info ml-2'
                onClick={selectAllCheckboxes}>
                Select All
              </button>
            </div>
            <div className='col-auto'>
              <button
                type='button'
                className='btn btn-outline-secondary ml-2'
                onClick={deselectAllCheckboxes}>
                Deselect All
              </button>
            </div>
          </div>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>State</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Product</th>
              <th>Date</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
          {dataArr && dataArr.length > 0 ? (
            dataArr?.map((ele, i) => (
              <tr key={i}>
                <td>{invoiceNumber + i}</td>
                <td>{ele.name}</td>
                <td>{ele.amount}</td>
                <td>{ele.address}</td>
                <td>{ele.pincode}</td>
                <td>{ele.state}</td>
                <td>{ele.mobile}</td>
                <td>{ele.email}</td>
                <td>{ele.product}</td>
                <td>{ele.created_at}</td>
                <td>
                  <input
                    type='checkbox'
                    //   checked={invoices.some((invoice) => invoice.id === ele.id)}
                    checked={
                      invoices.filter(invoice => invoice.id === ele.id).length >
                      0
                    }
                    onChange={event =>
                      handleCheckboxChange(event, ele, invoiceNumber + i)
                    }
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} style={{ textAlign: 'center' }}>No data present</td>
            </tr>
          )}
            
          </tbody>
        </table>
      </div>
    </>
  );
};
