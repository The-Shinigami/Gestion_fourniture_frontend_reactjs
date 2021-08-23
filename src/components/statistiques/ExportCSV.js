import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData,file}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    if (file === null || file === undefined) { file = "stock ";}
    const exportToCSV = (csvData,file) => {
        var today = new Date();
        var fileName = file +today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(csvData,file)}>Export</Button>
    )
}