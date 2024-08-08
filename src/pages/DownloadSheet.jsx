import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const DownloadButton = ({ testData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(testData);
  }, [testData]);
  


  const handleDownload = () => {
    if (data?.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const fileName = `invoice_${new Date().toISOString().replace(/[-:.]/g, '')}.xlsx`;
      
      XLSX.writeFile(workbook, fileName);
    }
  };

  return (
    <div className="col-auto">
      <button type="button" className="btn btn-outline-primary ml-2" onClick={handleDownload}>Download Sheet</button>
    </div>
  );
};

export default DownloadButton;
