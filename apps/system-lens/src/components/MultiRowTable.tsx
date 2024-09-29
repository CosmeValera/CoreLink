import React, { useState, useEffect, useMemo, ReactText, ReactNode, useRef } from 'react';

import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';

import { MRT_AggregationFn, MRT_ColumnDef, MRT_RowSelectionState, MRT_TablePagination, MaterialReactTable, getMRT_RowSelectionHandler, useMaterialReactTable } from 'material-react-table';
import { Box, Button, darken } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { fetchGetAllDomains } from '../service/fetchService';
import { useAdaptiveCardHeight } from '../helpers/useAdaptiveCardHeight';

interface ProcessSumary {
	starting: number;
	running: number;
	runningWithConnectionIssues: number;
	crashed: number;
	stopped: number;
};

interface Process {
	status: string;
	name: string;
	domain: string;
};

export default function MultiRowTable(props: { domains: string[] }) {
	const [processes, setProcesses] = useState<Process[]>([]);
	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const toast = useRef<Toast>(null);

	const cardRef = useRef<HTMLDivElement>(null);
	const cardContentHeight = useAdaptiveCardHeight(cardRef)

	const darkTheme = createTheme({ 
		palette: { mode: 'dark' },
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 9999,
					}
				}
			}, 
	    },  
	});
	
	useEffect(() => {
		makeFetchCall()
	}, []);

	const makeFetchCall = () => {
		fetchGetAllDomains(props.domains)
			.then(res => {
				setProcesses(res);
			}).catch(error => console.log(error))
	}

	const getStatusStyle = (status: string) => {
		switch (status) {
			case 'STARTING': // starting -> blue
				return 'bg-blue-500 text-black-alpha-80';
			case 'RUNNING': // ready -> green
				return 'bg-green-500 text-black-alpha-80';
			case 'RUNNING_WITH_CONNECTION_ISSUES': // not ready -> yellow
				return 'bg-yellow-500 text-black-alpha-80';
			case 'CRASHED': // died -> red
				return 'bg-red-500 text-white-alpha-80';
			case 'STOPPED': // stopped -> grey
				return 'surface-300 text-white-alpha-80';
			default: // unknown -> orange
				return 'bg-orange-500 text-black-alpha-80';
		}
	};

	const statusBodyTemplate = (status: ReactNode) => {
		return <Tag value={status} className={getStatusStyle((status as ReactText).toString())} />;
	};

	const badgeTemplate = (value: number, state: string) => {
		const capitalizedState  = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase().replace(/_/g, " ")
		return <>
				<Tooltip target={`.${state}`} content={{state}} position='bottom' className='tooltip'/>
				<Tag value={value} className={`${getStatusStyle(state)} ${state}`} data-pr-tooltip={capitalizedState}/>
			</>
	};

	const summaryBodyTemplate = (summary: ProcessSumary) => {
		return <div className='inline-flex gap-1'>
			{badgeTemplate(summary.starting, 'STARTING')}
			{badgeTemplate(summary.running, 'RUNNING')}
			{badgeTemplate(summary.runningWithConnectionIssues, 'RUNNING_WITH_CONNECTION_ISSUES')}
			{badgeTemplate(summary.crashed, 'CRASHED')}
			{badgeTemplate(summary.stopped, 'STOPPED')}
		</div>
	};

	const calculateSummary = (array: any) => {
		return {
			starting: array.filter((p: any) => p === "STARTING").length,
			running: array.filter((p: any) => p === "RUNNING").length,
			runningWithConnectionIssues: array.filter((p: any) => p === "RUNNING_WITH_CONNECTION_ISSUES").length,
			crashed: array.filter((p: any) => p === "CRASHED").length,
			stopped: array.filter((p: any) => p === "STOPPED").length,
		}
	};

	const statusAggregationFn: MRT_AggregationFn<Process> = (columnId, leafRows) => {
		return calculateSummary(leafRows.map(r => r.getValue(columnId)));
	};

	const columns = useMemo<MRT_ColumnDef<Process>[]>(
		() => [
			{
				header: 'Domain',
				accessorKey: 'domain',
				Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
			},
			{
				header: 'Process',
				accessorKey: 'name',
			},
			{
				header: 'Status',
				accessorKey: 'status',
				Cell: ({ cell }) => <> {statusBodyTemplate(cell.getValue<string>())} </>,
				aggregationFn: statusAggregationFn,
				AggregatedCell: ({ cell }) => <> {cell.row.groupingColumnId === 'domain' ?
					summaryBodyTemplate(cell.getValue<ProcessSumary>()) : undefined} </>,
				filterVariant: 'multi-select',
				filterSelectOptions: ['STARTING', 'RUNNING', 'RUNNING_WITH_CONNECTION_ISSUES', 'CRASHED', 'STOPPED'],
			},
		],
		[processes],
	);

	const table = useMaterialReactTable({
		columns,
		data: processes,
		enableGrouping: true,
		enablePagination: true,
		enableStickyHeader: true,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection, 
		state: { rowSelection },
		initialState: {
			expanded: props.domains.length === 1,
			grouping: ['domain'],
			pagination: { pageIndex: 0, pageSize: 50 },
			density: 'compact'
		},
		muiToolbarAlertBannerProps: { 
			sx: {
			  backgroundColor: '#191919',
			  color: '#F6F6F6',
			  '& .MuiButtonBase-root.MuiButton-root': {
				color: '#999999',
				fontWeight: 'bold',
			  },
			  '& .MuiButtonBase-root.MuiChip-root': {
				color: '#F6F6F6',
			  }
			}
		  }, // Grouped by row
		muiTableHeadRowProps: { sx: { backgroundColor: '#191919'}}, // header row
		muiTopToolbarProps: { sx: { backgroundColor: '#191919'}}, // empty toptoolbar
		muiTableContainerProps: { sx: { height: cardContentHeight }}, // table content
		muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
			onClick: (event) =>
				getMRT_RowSelectionHandler()({ event, row, staticRowIndex, table }),
			sx: { cursor: 'pointer' },
		}),
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		renderBottomToolbar: ({ table }) => {

			// const makePostCall = async (action: string, selectedRowsNamesAndDomains: {domain: string, name: string}[]) => {
			// 	const promises = selectedRowsNamesAndDomains.map(({ domain, name }) => {
			// 		return fetchPostAction(domain, name, action)
			// 			.catch(err => {
			// 				throw new Error(`Action failed. Status: ${err.status}. StatusText: ${err.statusText}`);
			// 			});
			// 	});

			// 	await Promise.all(promises);
			// };

			const checkStatusAndRefreshRecursively = async (status: string, selectedRowsNamesAndDomains: {domain: string, name: string}[]) => {
				// makeFetchCall();

				const areAllProcessesChanged = selectedRowsNamesAndDomains.every(({ domain, name }) => {
					const selectedRow = table.getSelectedRowModel().flatRows.find(row => row.original.domain === domain && row.original.name === name);
					return selectedRow && selectedRow.original.status === status;
				});

				if (areAllProcessesChanged) {
					const processesNames = selectedRowsNamesAndDomains.map(({ name }) => name).join(', ');
					toast.current?.show({severity:'info', summary: 'Info', detail:<p>{status}: <strong>{processesNames}</strong></p>, life: 3000});
				} else {
					await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before checking again
					await checkStatusAndRefreshRecursively(status, selectedRowsNamesAndDomains);
				}
			};

			const handleAction = async (action: string, status: string) => {
				const selectedRows = table.getSelectedRowModel().flatRows;
				const selectedRowsNamesAndDomains = selectedRows.map(row => ({ domain: row.original.domain, name: row.original.name,  }));
				const processesNames = selectedRowsNamesAndDomains.map(({ name }) => name).join(', ');
				
				toast.current?.show({severity:'info', summary: 'Info', detail:<p>{status}: <strong>{processesNames}</strong></p>, life: 3000});
				// try {
				// 	// await makePostCall(action, selectedRowsNamesAndDomains);
				// 	await checkStatusAndRefreshRecursively(status, selectedRowsNamesAndDomains);
				// } catch (error) {
				// 	const processesNames = selectedRowsNamesAndDomains.map(({ name }) => name).join(', ');
				// 	toast.current?.show({severity:'error', summary: 'Error', detail:<p>{action} failed: <strong>{processesNames}</strong></p>, life: 3000});
				// }
			};
			
			const handleStart = async () => {
				await handleAction('START', 'RUNNING');
			};
			
			const handleStop = async () => {
				await handleAction('STOP', 'STOPPED');
			};

			const handleRestart = async () => {
				await handleStop();
				await handleStart();
			};

			return (
				<Box
				sx={(theme) => ({
				  backgroundColor: darken(theme.palette.background.default, 0.05),
				  alignItems: 'center',
				  display: 'flex',
				  gap: '0.5rem',
				  p: '8px',
				  background: '#191919',
				  justifyContent: 'space-between',
				})}
			  >
				<Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
				  <MRT_TablePagination table={table} />
				</Box>
				<Box>
				  <Box sx={{ display: 'flex', gap: '0.5rem'}}>
					<Button
					  className={!table.getIsSomeRowsSelected() ? '': 'bg-red-500 hover:bg-red-600 text-white'}
					  disabled={!table.getIsSomeRowsSelected()}
					  onClick={handleStart}
					  variant="contained"
					>
					  Start
					</Button>
					<Button
					  className={!table.getIsSomeRowsSelected() ? '': 'bg-red-500 hover:bg-red-600 text-white'}
					  disabled={!table.getIsSomeRowsSelected()}
					  onClick={handleStop}
					  variant="contained"
					>
					  Stop
					</Button>
					<Button
					  className={!table.getIsSomeRowsSelected() ? '': 'bg-red-500 hover:bg-red-600 text-white'}
					  disabled={!table.getIsSomeRowsSelected()}
					  onClick={handleRestart}
					  variant="contained"
					>
					  Restart
					</Button>
				  </Box>
				</Box>
			  </Box>
			);
		}
	});

	return (
		<div className="card" ref={cardRef}>
			<ThemeProvider theme={darkTheme}>
				<Toast ref={toast} />
				<MaterialReactTable table={table} />
			</ThemeProvider>
		</div>
	);
};