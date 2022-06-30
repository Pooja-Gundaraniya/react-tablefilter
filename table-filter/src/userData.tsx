import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 110,
    editable: true,
  },
];
const rows = [
  { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: "active" },
  { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: "active" },
  { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: "cancel" },
  { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: "active" },
  { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 17, status: "cancel" },
  { _id: 6, lastName: 'Melisandre', firstName: 'temp', age: 50, status: "active" },
  { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status: "cancel" },
  { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status: "active" },
  { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status: "active" },
];

const UserData = () => {

  const [filter, setFilter] = useState(['all']);
  const [filterData, setFilterData] = useState(rows);

  
  const handleChange = (event: any) => {
    setFilter(event.target.value);
    getData()
  };
  
  const getConditions = () => {
    const conditions: any = {}
    filter.forEach((item) => {
      if (item === "active") {
        conditions.checkActive = true
      }
      if (item === "cancel") {
        conditions.checkCancel = true
      }
      if (item === "belowEighteen") {
        conditions.checkBelowEighteen = true
      }
      if (item === "aboveEighteen") {
        conditions.checkaboveEighteen = true
      }
      if (item === "all") {
        conditions.checkall = true
      }
    })
    return conditions;
  }
  const conditions = getConditions();
  
  // console.log(conditions)
  
  const active = rows.filter(item=>item.status==='active')
  console.log(" active", active)
  const cancel = rows.filter(item=>item.status==='cancel')
  console.log(" cancel", cancel)
  const belowActive = active.filter(item=>item.age<18)
  console.log(" belowActive", belowActive)
  const aboveActive = active.filter(item=>item.age>18)
  console.log(" aboveActive", aboveActive)
  const belowCancel = cancel.filter(item=>item.age<18)
  console.log(" belowCancel", belowCancel)
  const aboveCancel = cancel.filter(item=>item.age>18)
  console.log(" aboveCancel", aboveCancel)
  
const getData= () =>{
if (conditions.checkall){
  setFilterData(rows)
}
if (conditions.checkActive){
  setFilterData(active)
}
if (conditions.checkCancel){
  setFilterData(cancel)
}
if (conditions.checkActive && conditions.checkaboveEighteen){
  setFilterData(aboveActive)
}
if (conditions.checkActive && conditions.checkBelowEighteen){
  setFilterData(belowActive)
}
if (conditions.checkCancel && conditions.checkaboveEighteen){
  setFilterData(aboveCancel)
}
if(conditions.checkCancel && conditions.checkBelowEighteen){
  setFilterData(belowCancel)
}
}

console.log(filterData,'ilwelhgileegheiwlg')

  useEffect(() => {

// getData()

  }, [filter])
  
  // const activeData = conditions.checkActive ? active : cancel;

// const ActiveBelow = conditions.checkActive && conditions.checkaboveEighteen ? aboveActive : belowActive;

// const cancelBelow = conditions.checkCancel && conditions.checkaboveEighteen ? aboveCancel : belowCancel



  return (
    <Box sx={{ height: '100vh', width: '100%'}}>
      <Box sx={{ width: '30%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">filter by status</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'all'}>all</MenuItem>
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'cancel'}>Cancel</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '30%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">filter by age</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'all'}>all</MenuItem>
            <MenuItem value={'belowEighteen'}>Below 18</MenuItem>
            <MenuItem value={'aboveEighteen'}>Above 18</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataGrid
        rows={rows.map((item,index)=>{
          return{
            ...item,id:index
          }
        })}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </Box>
  );
}
export default UserData