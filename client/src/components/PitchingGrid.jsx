import React, { useState, useEffect, lazy, Fragment, Suspense} from 'react';
import { DataGrid  } from '@mui/x-data-grid';
// import './components.css'

export default function PitchingGrid(props) {
  if(props.data) {
	const rows = props.data.map((row, idx) => {
		 return {id: idx,
           col1: row.agent,
           col2: row.pitchers,
           col3: row.ann_val,
           col4: row.yrs,
           col5: row.ip,
           col6: row.era,
           col7: row.w,
           col8: row.sv
      			 }
			})
	const columns = [
		{field: 'col1' , headerName: 'Agent', minWidth: 160, flex: 1 },
		{field: 'col2' , headerName: 'Pitchers' , type: 'number', minWidth: 80, flex: 1},
		{field: 'col3' , headerName:  'AAV' , type: 'number', minWidth: 80, flex: 1},
		{field: 'col4' , headerName: 'Avg Length', type: 'number', minWidth: 80, flex: 1},
		{field: 'col5' , headerName: 'Innings.' , type: 'number', minWidth: 80, flex: 1 },
		{field: 'col6' , headerName: 'ERA', type: 'number', minWidth: 80, flex: 1 },
		{field: 'col7' , headerName: 'Wins', type: 'number', minWidth: 80, flex: 1 },
		{field: 'col8' , headerName: 'Saves', type: 'number', minWidth: 80, flex: 1 }
		]
		return (
			<div }>
			<DataGrid 
		        rows={rows} 
		        columns={columns}
		        onRowClick = {(rowData) => props.getPitchDetail(rowData.row.col1)}
		        pageSize={25}
		        rowHeight = {30}
                sx={{m: -2, "& .MuiDataGrid-columnHeaders": {
		            fontWeight: 'bold',
		            fontSize: '1.2em'
		          }}} />
			</div>
		)
	}
}
