
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const ProductDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.ProductID}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.ProductName}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.Description}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.Price}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="ProductID" header="ProductID" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="ProductName" header="Name" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="Description" header="Description" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="Price" header="Price" body={pTemplate3} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ProductDataTable;