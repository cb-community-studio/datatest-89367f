
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const OrderDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.OrderID}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.ItemID}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.total}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.Name}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="OrderID" header="Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="ItemID" header="ItemID" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="total" header="total" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="Name" header="Name" body={pTemplate3} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default OrderDataTable;