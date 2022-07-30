import { DataGrid  } from '@mui/x-data-grid';

export default function BattingDetail(props) {

	function handleRowClick(ev){
		console.log(ev)
	}

	if(props.data) {
		    // console.log(props)
		const rows = props.data.map((row, idx) => {
			 return {id: idx,
	           col1: row.playerName,
	           col2: row.tm,
	           col3: row.k_ann_val,
	           col4: row.k_yrs,
}
				})
		const columns = [
			{field: 'col1' , headerName: 'Batter', minWidth: 160, flex: 1 },
			{field: 'col2' , headerName: 'Team', minWidth: 80, flex: 1 },
			{field: 'col3' , headerName:  'AAV' , type: 'number', minWidth: 80, flex: 1},
			{field: 'col4' , headerName: 'Length' , type: 'number', minWidth: 80, flex: 1 },
			]
		return (
			<div style={{ display: 'flex', flex: '1',height: '35vh',paddingLeft: '5vw'   }}>
			<DataGrid 
				rowClick = {(() => handleRowClick)}
		        rows={rows} 
		        columns={columns}
		        pageSize={25}
		        rowHeight = {30}
		        density = 'compact'
                sx={{m: -2, "& .MuiDataGrid-columnHeaders": {
		            fontWeight: 'bold',
		            fontSize: '1.2em'
		          }}} />
			</div>
			)
	}
}