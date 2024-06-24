import axios from 'axios'
import React from 'react'
import { url } from '../constant'

export const HomePage = () => {
    const handleDownloadPdf = () => {
        [1,2].map((ele,i)=>{
            console.log("hello",ele)
            axios({
                url: `${url}generatePdf.php`,
                method: 'GET',
                responseType: 'blob', // Important: responseType as 'blob' to handle binary data
            })
            .then((response) => {
                // Create a blob object from the response data
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
    
                // Create a link element, set its href and download attributes, then trigger a click on it
                const link = document.createElement('a');
                link.href = url;
                let fileName = "kartik_" + Date.now() + ".pdf"
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
    
                // Cleanup: remove the link element and revoke the URL object
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading PDF:', error);
                // Handle error if needed
            });
        })
    };

    const fetchData = () =>{
        
    }
  return (
    <>
    <div>HomePage</div>
    <button onClick={handleDownloadPdf}> click to download sample pdf</button>
    </>
  )
}
