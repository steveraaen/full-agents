import React, { useState, useEffect, lazy, Fragment, Suspense} from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import './components.css'

export default function BattingGrid(props) {
  if(props.data) {
    // console.log(props)
	const rows = props.data.map((row, idx) => {
		 return {id: idx,
           col1: row.agent,
           col2: row.batters,
           col3: row.ann_val,
           col4: row.yrs,
           col5: row.ab,
           col6: row.avg,
           col7: row.tb,
           col8: row.ops}
			})
	const columns = [
		{field: 'col1' , headerName: 'Agent', minWidth: 160, flex: 1 ,headerClassName: 'hdrs'},
		{field: 'col2' , headerName: 'Batters' , type: 'number', minWidth: 80, flex: 1},
		{field: 'col3' , headerName:  'AAV' , type: 'number', minWidth: 80, flex: 1},
		{field: 'col4' , headerName: 'Avg Length' , type: 'number', minWidth: 80, flex: 1 },
    {field: 'col5' , headerName: 'At Bats' , type: 'number', minWidth: 80, flex: 1 },
		{field: 'col6' , headerName: 'Batting Avg.'  , type: 'number', minWidth: 80, flex: 1},
		{field: 'col7' , headerName: 'Total Bases'  , type: 'number', minWidth: 80, flex: 1},
		{field: 'col8' , headerName: 'OPS' , type: 'number', minWidth: 80, flex: 1 }
		]
		return (
			<div style={{ height: '45vh', width: '90vw',paddingLeft: '5vw'  }}>
			<DataGrid 
        rows={rows} 
        columns={columns}
        onRowClick = {(rowData) => props.getBatDetail(rowData.row.col1)}
        pageSize={25}
        rowHeight = {30}
        sx={{m: -2, "& .MuiDataGrid-columnHeaders": {
            fontWeight: 'bold',
            fontSize: '1.2em'
          } }} />

			</div>
			)
		}
}
