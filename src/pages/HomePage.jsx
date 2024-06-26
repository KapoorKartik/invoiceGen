import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../constant'

export const HomePage = () => {
    const [dataArr,setDataArr] = useState([])
    const handleDownloadPdf = () => {
        invoices.map((ele,i)=>{
            console.log("hello",ele)
            axios({
                url: url,
                method: 'POST',
                responseType: 'blob', // Important: responseType as 'blob' to handle binary data
                data: ele 
            })
            .then((res) => {
                // Create a blob object from the response data
                // console.log('res from post:', res)
                // return 
                const blob = new Blob([res.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
        // Create a new tab with the PDF URL
        window.open(url, '_blank');

        // Cleanup: revoke the URL object
        URL.revokeObjectURL(url);
        return
                // Create a link element, set its href and download attributes, then trigger a click on it
                const link = document.createElement('a');
                link.href = url;
                let fileName = "kartik_" + Date.now() + ".pdf"
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
    
                // Cleanup: remove the link element and revoke the URL object
                document.body.removeChild(link);
                url.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading PDF:', error);
                // Handle error if needed
            });
        })
    };

    const fetchData = () =>{
        axios.get(url).then((res =>{
            console.log('res:',res.data)
            setDataArr(res.data)
        }))
    }
    useEffect(() => {fetchData()}, [])

    
  const [invoices, setInvoices] = useState([]);
  console.log('invoices:', invoices)

  const handleCheckboxChange = (event, valueObj, invoiceNum) => {
    if (event.target.checked) {
      setInvoices([...invoices, { ...valueObj, invoiceNum }]);
    } else {
      // Filter out the invoice to be removed based on a unique identifier like id
      setInvoices(invoices.filter(invoice => invoice.id !== valueObj.id));
    }
  };

  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const handleInvoiceNumberChange = (event) => {
    setInvoiceNumber(parseInt(event.target.value, 10));
  };

  const selectAllCheckboxes = () => {
    const allInvoices = dataArr.map((ele, i) => ({ ...ele, invoiceNumber: invoiceNumber + i }));
    setInvoices(allInvoices);
  };
  
  const deselectAllCheckboxes = () => {
    setInvoices([]);
  };
  

  return (
    <>
    <div>HomePage</div>
    <div className="mx-4">
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
      <div className="mb-3">
        <div className="row justify-content-end">
            <div className="col-auto">
                <button type="button" className="btn btn-outline-primary ml-2" onClick={handleDownloadPdf}>Download All</button>
            </div>
          <div className="col-auto">
            <button type="button" className="btn btn-outline-primary ml-2"   onClick={selectAllCheckboxes}>Select All</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-outline-secondary ml-2" onClick={deselectAllCheckboxes}>Deselect All</button>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {dataArr?.map((ele, i) => (
            <tr key={i}>
              <td>{invoiceNumber + i}</td>
              <td>{ele.name}</td>
              <td>{ele.address}</td>
              <td>
                <input
                  type="checkbox"
                //   checked={invoices.some((invoice) => invoice.id === ele.id)}
                  checked={invoices.filter((invoice) => invoice.id === ele.id).length > 0}
                  onChange={(event) => handleCheckboxChange(event, ele, invoiceNumber + i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
