/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Add,
  ChevronDown,
  Download,
  Filter,
} from '@carbon/react/icons';
import {
  Button,
  ComposedModal,
  Dropdown,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
  TableToolbarContent,
  TableToolbarSearch,
} from '@carbon/react';
import React, { useLayoutEffect, useState } from 'react';

// import { action } from '@storybook/addon-actions';
// import { pkg } from '../../../settings';
import { useFilterContext } from '@carbon/ibm-products/es/components/Datagrid/Datagrid/addons/Filtering/hooks';
import Papa from 'papaparse';  
import axios from 'axios';



const blockClass = `cds--datagrid`;
export const DatagridActions = (datagridState) => {
  const { setPanelOpen } = useFilterContext();
  const {
    selectedFlatRows,
    setGlobalFilter,
    CustomizeColumnsButton,
    RowSizeDropdown,
    rowSizeDropdownProps,
    useDenseHeader,
    filterProps,
    getFilterFlyoutProps,
    FilterFlyout,
    data,
  } = datagridState;

  const handleDownloadData = () => {
    axios
      .get('http://localhost:5000/api/getEmployees')
      .then((response) => {
        const data = response.data;
  
        //   data to CSV using PapaParse
        const csvData = Papa.unparse(data);
  
        //   Blob with the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });
  
        //   download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'employees.csv');
  
         document.body.appendChild(link);
        link.click();
  
         document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading data:', error);
      });
  };



  const searchForAColumn = 'Search';
  const isNothingSelected = selectedFlatRows.length === 0;
  const style = {
    'button:nthChild(1) > span:nthChild(1)': {
      bottom: '-37px',
    },
  };

  const renderFilterFlyout = () =>
    filterProps?.variation === 'flyout' && (
      <FilterFlyout {...getFilterFlyoutProps()} />
    );

  const renderFilterPanelButton = () =>
    filterProps?.variation === 'panel' && (
      <IconButton
        kind="ghost"
        align="bottom"
        label={filterProps.panelIconDescription}
        className={`${blockClass}-filter-panel-open-button`}
        onClick={() => setPanelOpen((open) => !open)}
        disabled={data.length === 0}
      >
        <Filter />
      </IconButton>
    );

  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const mobileToolbar = size < 672 ? false : false;
  const items = ['Option 1', 'Option 2', 'Option 3'];
  return (
    isNothingSelected &&
    (useDenseHeader && useDenseHeader ? (
      <TableToolbarContent size="sm">
        {!mobileToolbar ? (
          <>
            {renderFilterPanelButton()}
            <div style={style}>
              <Button
                kind="ghost"
                hasIconOnly
                tooltipPosition="bottom"
                renderIcon={Download}
                iconDescription={'Download CSV'}
                onClick={handleDownloadData}
              />
            </div>
            {renderFilterFlyout()}
            {CustomizeColumnsButton && (
              <div style={style}>
                <CustomizeColumnsButton />
              </div>
            )}
            <RowSizeDropdown {...rowSizeDropdownProps} />
            <div style={style} className={`${blockClass}__toolbar-divider`}>
              <Button kind="ghost" renderIcon={Add} iconDescription={'Action'}>
                Ghost button
              </Button>
            </div>
          </>
        ) : (
          <OverflowMenu aria-label="Tools" size="md" flipped>
            <OverflowMenuItem
              itemText="Filter"
              hasDivider
              requireTitle
              onClick={() => setModalOpen(true)}
            />
            <OverflowMenuItem itemText="Export" hasDivider requireTitle />
            <OverflowMenuItem itemText="Settings" hasDivider requireTitle />
            <OverflowMenuItem itemText="Import items" hasDivider requireTitle />
            <OverflowMenuItem itemText="Create" hasDivider requireTitle />
          </OverflowMenu>
        )}
      </TableToolbarContent>
    ) : !mobileToolbar ? (
      <TableToolbarContent>
        {renderFilterPanelButton()}
        <TableToolbarSearch
          size="lg"
          id="columnSearch"
          persistent
          placeholder={searchForAColumn}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {renderFilterFlyout()}
        {/* <div style={style}>
          <Button
            kind="ghost"
            hasIconOnly
            tooltipPosition="bottom"
            renderIcon={Restart}
            iconDescription={'Refresh'}
            onClick={refreshColumns}
          />
        </div> */}
        <div style={style}>
          <Button
            kind="ghost"
            hasIconOnly
            tooltipPosition="bottom"
            renderIcon={Download}
            iconDescription={'Download CSV'}
            onClick={handleDownloadData}
          />
        </div>
        {CustomizeColumnsButton && (
          <div style={style}>
            <CustomizeColumnsButton />
          </div>
        )}
        <RowSizeDropdown {...rowSizeDropdownProps} />
      </TableToolbarContent>
    ) : (
      <TableToolbarContent>
        {renderFilterPanelButton()}
        <TableToolbarSearch
          size="xl"
          id="columnSearch"
          persistent
          placeholder={searchForAColumn}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {renderFilterFlyout()}
        <OverflowMenu
          aria-label="Tools"
          size="lg"
          flipped
          renderIcon={ChevronDown}
          className={`${blockClass}__toolbar-menu__trigger`}
          menuOptionsClass={`${blockClass}__toolbar-options`}
        >
          <OverflowMenuItem
            itemText="Filter"
            hasDivider
            requireTitle
            onClick={() => setModalOpen(true)}
          />
          <OverflowMenuItem itemText="Export" hasDivider requireTitle />
          <OverflowMenuItem itemText="Settings" hasDivider requireTitle />
          <OverflowMenuItem itemText="Import items" hasDivider requireTitle />
          <OverflowMenuItem itemText="Create" hasDivider requireTitle />
        </OverflowMenu>
        {modalOpen && (
          <ComposedModal
            size="lg"
            open={modalOpen && modalOpen}
            onClose={() => setModalOpen(false)}
            className={`${blockClass}__mobile-toolbar-modal`}
          >
            <ModalHeader>
              <h4>Filters</h4>
            </ModalHeader>
            <ModalBody>
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter1"
              />
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter2"
              />
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter3"
              />
            </ModalBody>
            <ModalFooter
              primaryButtonText="Apply"
              secondaryButtonText="Cancel"
            />
          </ComposedModal>
        )}
      </TableToolbarContent>
    ))
  );
};
