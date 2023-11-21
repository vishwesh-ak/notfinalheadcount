import React, { useState, useEffect } from 'react';
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
  useFiltering,  
} from '@carbon/ibm-products';
import DatagridPagination from './datagridPagination';
import { pkg } from '@carbon/ibm-products/lib/settings';
import axios from 'axios';
import './emppage.scss';
import {DatagridActions} from './DatagridActions';

 const defaultHeader = [
  {
    Header: 'EmployeeSerial',
    accessor: 'EmployeeSerial#',
    filter: 'number',
  },
  {
    Header: 'Emp Name',
    accessor: 'Emp Name',
    filter: 'dropdown',
   },
  {
    Header: 'Dept Code',
    accessor: 'DeptCode',
   },
  {
    Header: ' Dept Name',
    accessor: 'Dept Name',
  },
  {
    Header: 'IsManager',
    accessor: 'IsManager?',
  },
  {
    Header: 'Emp Type',
    accessor: 'Emp Type',
  },
  {
    Header: 'Location Blue pages',
    accessor: 'Location Blue pages',
  },
  {
    Header: 'Mgr Name',
    accessor: 'Mgr Name',
  },
  {
    Header: ' Leader Name',
    accessor: 'Leader Name',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: ' Diversity',
    accessor: 'Diversity',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Work Location',
    accessor: 'Work location',
  },
  {
    Header: 'Date of Joining',
    accessor: 'Date of Joining',
   
  },
  {
    Header: 'Date of Leaving',
    accessor: 'Date of Leaving',
   
  },
  {
    Header: ' Remarks',
    accessor: 'Remarks',
    inlineEdit: {
      type: 'text',
       validator: (n) => n.length >= 40,
       inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Employee Status',
    accessor: 'Employee Status',

  },
];

 export const EmpPage = () => {

  var columns = React.useMemo(function () {
     
    return defaultHeader;
    }, []);

  pkg.feature['Datagrid.useInlineEdit'] = true;

  const [data, setData] = useState([]);
  const [filteredData] = useState([]);
  const [error] = useState(null); 
  const [httpError, setHttpError] = useState(null);
 
//datagridState//
  const datagridState = useDatagrid({
    columns: columns,
    data: filteredData.length > 0 ? filteredData : data,
    initialState: {
      pageSize: 50,
      pageSizes: [5, 10, 25, 50],
    },
    onDataUpdate: setData,
    DatagridPagination: DatagridPagination,
    filterProps: {
      variation: 'panel',  
      updateMethod: 'instant',  
      primaryActionLabel: 'Apply',  
      secondaryActionLabel: 'Cancel',  
      panelIconDescription: 'Open filters', 
      closeIconDescription: 'Close Panel',
      sections: [
        {categoryTitle : 'Employee Serial',
      hasAccordion: true,
    filters: [
      { filterLabel:'Date of Joining',
      filter:{
        type: 'number',
        column: 'Date of Joining',
        props: {
          NumberInput: {
            min: 0,
            id: 'Date-Serial-input',
            invalidText: 'A valid value is required',
            label: 'Date of Joining',
            placeholder: 'Type Date of Joining',
           },
        },
      },
      },
      {filterLabel:'Employee Name',
      filter:{
        type: 'dropdown',
        column: 'Emp Name',
        props: {
          Dropdown: {
            id: 'Employee Name-dropdown',
            ariaLabel: 'Employee Name dropdown',
            items: ['Alice Johnson', 'John Doe', ],
            label: 'Employee Name',
            titleText: 'Employee Name'
          },
        },
      },
    },
    ]} 
      ],
      shouldClickOutsideToClose: false,  
     },
    DatagridActions,
      batchActions: true,
   }, useInlineEdit, useFiltering);
   useEffect(() => {
    axios.get('http://localhost:5000/api/getEmployees')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setHttpError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  
 

  const handleSaveEdits = () => {
    axios
      .post('http://localhost:5000/api/updateEmployees', { employees: data })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating employees:', error);
      });
  };

 

  return (
    <div className="EmpPageWrap">
      <h1 className="home__heading">Blue Page SyncUp</h1>
 
      

      <div>
        {httpError ? (
          <p>HTTP Error: {httpError.message}</p>
        ) : error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <Datagrid datagridState={{ ...datagridState }} 
          onBlur={handleSaveEdits}
          />

        )}
        {error && <p>Error fetching data: {error}</p>}
    {/* <Button 
      kind="secondary"
      onClick={handleSaveEdits}>Save Edits</Button> */}
      </div>

    </div>
  );
};

export default EmpPage;


