// /* eslint-disable prettier/prettier */
// import { useMemo, useState, Fragment, useEffect } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Chip, Divider, Stack, Button, Table, TableCell, TableBody, TableHead, TableRow, TableContainer, Tooltip, Typography, Box } from '@mui/material';

// // third-party
// import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// // project-import
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// import Avatar from 'components/@extended/Avatar';
// import IconButton from 'components/@extended/IconButton';
// import { DebouncedInput, HeaderSort, TablePagination } from 'components/third-party/react-table';
// import { ImagePath, getImageUrl } from 'utils/getImageUrl';
// import VillaModalDelete from 'sections/facilities/VillaModalDelete';
// import Breadcrumbs from 'components/@extended/Breadcrumbs';

// // assets
// import { Add, Edit, Eye, Trash } from 'iconsax-react';

// // custom
// import { VillaServices } from 'services';
// import Loader from 'components/Loader';
// import { useNavigate } from 'react-router-dom';

// // ==============================|| REACT TABLE - LIST ||============================== //
// const fallbackData = [];
// function ReactTable({ data, columns, pagination, setPagination, setSorting, sorting, globalFilter, setGlobalFilter }) {

//     const navigate = useNavigate();

//     const table = useReactTable({
//         data: data?.data || fallbackData,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         onPaginationChange: setPagination,
//         onSortingChange: setSorting,
//         pageCount: data?.meta?.pagination?.pageCount || 1,
//         autoResetPageIndex: false,
//         state: {
//             sorting,
//             globalFilter,
//             pagination
//         },
//         debugTable: true
//     });

//     let headers = [];
//     columns.map(
//         (columns) =>
//             // @ts-ignore
//             columns.accessorKey &&
//             headers.push({
//                 label: typeof columns.header === 'string' ? columns.header : '#',
//                 // @ts-ignore
//                 key: columns.accessorKey
//             })
//     );

//     let breadcrumbLinks = [{ title: 'Villa Yönetimi' }, { title: 'Villa Listesi', to: `/facilities/villas-list` }];

//     return (
//         <>
//             <Breadcrumbs custom links={breadcrumbLinks} />
//             <MainCard content={false}>
//                 <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3 }}>
//                     <DebouncedInput
//                         value={globalFilter ?? ''}
//                         onFilterChange={(value) => setGlobalFilter(String(value))}
//                         placeholder={`Search ${data?.meta?.pagination?.total} records...`}
//                     />
//                     <Stack direction="row" alignItems="center" spacing={2}>
//                         <Button variant="contained" startIcon={<Add />} onClick={() => { navigate("/facilities/villas-add"); }} size="large">
//                             Villa Ekle
//                         </Button>
//                     </Stack>
//                 </Stack>
//                 <ScrollX>
//                     <Stack>

//                         <TableContainer>
//                             <Table>
//                                 <TableHead>
//                                     {table.getHeaderGroups().map((headerGroup) => (
//                                         <TableRow key={headerGroup.id}>
//                                             {headerGroup.headers.map((header) => {
//                                                 if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
//                                                     Object.assign(header.column.columnDef.meta, {
//                                                         className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
//                                                     });
//                                                 }
//                                                 return (
//                                                     <TableCell
//                                                         key={header.id}
//                                                         {...header.column.columnDef.meta}
//                                                         onClick={header.column.getToggleSortingHandler()}
//                                                         {...(header.column.getCanSort() &&
//                                                             header.column.columnDef.meta === undefined && {
//                                                             className: 'cursor-pointer prevent-select'
//                                                         })}
//                                                         style={{ cursor: 'pointer' }}
//                                                     >
//                                                         {header.isPlaceholder ? null : (
//                                                             <Stack direction="row" spacing={1} alignItems="center">
//                                                                 <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
//                                                                 {header.column.getCanSort() && <HeaderSort column={header.column} />}
//                                                             </Stack>
//                                                         )}
//                                                     </TableCell>
//                                                 );
//                                             })}
//                                         </TableRow>
//                                     ))}
//                                 </TableHead>
//                                 <TableBody>
//                                     {table.getRowModel().rows.map((row) => (
//                                         <TableRow
//                                             key={row.id}
//                                             onClick={() => {
//                                                 console.log("Kayıt Id => ", row.original.id);
//                                                 navigate(`/facilities/villas-show/${row.original.id}/summary`)
//                                             }}
//                                             style={{ cursor: 'pointer' }}
//                                         >
//                                             {row.getVisibleCells().map((cell) => (
//                                                 <TableCell key={cell.id} {...cell.column.columnDef.meta}>
//                                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                                 </TableCell>
//                                             ))}
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <>
//                             <Divider />
//                             <Box sx={{ p: 2 }}>
//                                 <TablePagination
//                                     {...{
//                                         setPageSize: table.setPageSize,
//                                         setPageIndex: table.setPageIndex,
//                                         getState: table.getState,
//                                         getPageCount: table.getPageCount,
//                                         initialPageSize: pagination.pageSize
//                                     }}
//                                 />
//                             </Box>
//                         </>
//                     </Stack>
//                 </ScrollX>
//             </MainCard>
//         </>
//     );
// }
// // ==============================|| CUSTOMER LIST ||============================== //

// export default function ApartsList() {
//     const theme = useTheme();

//     const [sorting, setSorting] = useState([{ id: 'id', desc: true }]);
//     const [globalFilter, setGlobalFilter] = useState('');

//     const [customerDeleteId, setCustomerDeleteId] = useState('');
//     const [isDeleted, setIsDeleted] = useState(false)
//     const [villaModalDelete, setVillaModalDelete] = useState(false);

//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 10
//     });

//     const [data, setData] = useState(() => []);

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true)
//         VillaServices.Villas(pagination.pageIndex + 1, pagination.pageSize, sorting[0]?.desc, sorting[0]?.id.replace('attributes_', ''), globalFilter).then((res) => { setData(res); setLoading(false); });
//     }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter]);

//     useEffect(() => {
//         setPagination({ ...pagination, pageIndex: 0 })
//     }, [globalFilter])

//     useEffect(() => {
//         if (isDeleted) {
//             setIsDeleted(false)
//             setLoading(true)
//             VillaServices.Villas(pagination.pageIndex + 1, pagination.pageSize, sorting[0]?.desc, sorting[0]?.id.replace('attributes_', ''), globalFilter).then((res) => { setData(res); setLoading(false); });
//         }
//     }, [isDeleted])

//     const handleClose = () => {
//         setVillaModalDelete(!villaModalDelete);
//     };

//     const columns = useMemo(
//         () => [
//             {
//                 header: '#',
//                 cell: ({ row }) => { return row.original.id }
//             },
//             {
//                 header: 'Villa Adı',
//                 accessorKey: 'attributes.name',
//                 cell: ({ row, getValue }) => (
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Avatar
//                             alt="Avatar"
//                             size="sm"
//                             src={getImageUrl(`avatar-${!row.original.avatar ? 1 : row.original.avatar}.png`, ImagePath.USERS)}
//                         />
//                         <Stack spacing={0}>
//                             <Typography variant="subtitle1">{getValue()}</Typography>
//                         </Stack>
//                     </Stack>
//                 )
//             },
//             {
//                 header: 'Bölge',
//                 cell: ({ row }) => { return row.original.attributes.region }
//             },
//             {
//                 header: 'Kapasite',
//                 cell: ({ row }) => { return row.original.attributes.person }
//             },
//             {
//                 header: 'Oda Sayısı',
//                 cell: ({ row }) => { return row.original.attributes.room }
//             },
//             {
//                 header: 'Online Rez.',
//                 accessorKey: 'attributes.onlineReservation',
//                 cell: (cell) => {
//                     if (cell.getValue()) return <Chip color="success" label="Aktif" size="small" variant="light" />;
//                     else return <Chip color="error" label="Pasif" size="small" variant="light" />;
//                     // switch (cell.getValue()) {
//                     //     case 3:
//                     //         return <Chip color="error" label="Rejected" size="small" variant="light" />;
//                     //     case 1:
//                     //         return <Chip color="success" label="Verified" size="small" variant="light" />;
//                     //     case 2:
//                     //     default:
//                     //         return <Chip color="info" label="Pending" size="small" variant="light" />;
//                     // }
//                 }
//             },
//             {
//                 header: 'Actions',
//                 meta: {
//                     className: 'cell-center'
//                 },
//                 disableSortBy: true,
//                 cell: ({ row }) => {
//                     const collapseIcon =
//                         row.getCanExpand() && row.getIsExpanded() ? (
//                             <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} />
//                         ) : (
//                             <Eye />
//                         );
//                     return (
//                         <Stack direction="row" spacing={0}>
//                             <Tooltip title="View">
//                                 <IconButton color="secondary" onClick={row.getToggleExpandedHandler()}>
//                                     {collapseIcon}
//                                 </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Edit">
//                                 <IconButton
//                                     color="primary"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                     }}
//                                 >
//                                     <Edit />
//                                 </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete">
//                                 <IconButton
//                                     color="error"
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleClose();
//                                         setCustomerDeleteId(Number(row.original.id));
//                                     }}
//                                 >
//                                     <Trash />
//                                 </IconButton>
//                             </Tooltip>
//                         </Stack>
//                     );
//                 }
//             }
//         ], // eslint-disable-next-line
//         [theme]
//     );

//     if (loading) return (<Loader open={loading} />)

//     return (
//         <>
//             <ReactTable
//                 {...{
//                     data,
//                     columns,
//                     pagination,
//                     setPagination,
//                     setSorting,
//                     sorting,
//                     globalFilter,
//                     setGlobalFilter
//                 }}
//             />
//             <VillaModalDelete setIsDeleted={setIsDeleted} setLoading={setLoading} id={Number(customerDeleteId)} title={customerDeleteId} open={villaModalDelete} handleClose={handleClose} />
//         </>
//     );
// }


import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  flexRender,
  useReactTable
} from '@tanstack/react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, DebouncedInput, EmptyTable, Filter } from 'components/third-party/react-table';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <MainCard content={false}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />
        <CSVExport data={data} filename={'empty-table.csv'} />
      </Stack>

      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id} {...footer.column.columnDef.meta}>
                      {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - EMPTY ||============================== //

export default function ApartsList() {
  const data = useMemo(() => makeData(0), []);

  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        footer: 'First Name',
        accessorKey: 'firstName'
      },
      {
        header: 'Last Name',
        footer: 'Last Name',
        accessorKey: 'lastName'
      },
      {
        header: 'Email',
        footer: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Role',
        footer: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Age',
        footer: 'Age',
        accessorKey: 'age',
        meta: { className: 'cell-right' }
      },
      {
        header: 'Visits',
        footer: 'Visits',
        accessorKey: 'visits',
        meta: { className: 'cell-right' }
      },
      {
        header: 'Status',
        footer: 'Status',
        accessorKey: 'status'
      },
      {
        header: 'Profile Progress',
        footer: 'Profile Progress',
        accessorKey: 'progress'
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
