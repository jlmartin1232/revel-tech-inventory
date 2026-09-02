import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { flexRender } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useLegacyTable as useReactTable,
} from '@tanstack/react-table/legacy'

const columns = [
  { accessorKey: 'gadgetName', header: 'Gadget Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'manufacturer', header: 'Manufacturer' },
  {
    accessorKey: 'healthRating',
    header: 'Health Rating',
    cell: (info) => info.getValue() + ' / 100',
  },
  { accessorKey: 'techBrand', header: 'Tech Brand' },
  {
    accessorKey: 'role',
    header: 'User Role',
    cell: (info) => (
      <Chip
        label={info.getValue()}
        size={'small'}
        variant={'outlined'}
        sx={{
          bgcolor: '#fafafa',
          borderColor: 'divider',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      />
    ),
  },
]

function GadgetTable({ gadgets, selectedGadget, onSelect, onRegister }) {
  const table = useReactTable({
    data: gadgets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  })

  if (gadgets.length === 0) {
    return (
      <Box
        sx={{
          mt: 4,
          minHeight: 190,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          bgcolor: '#fafafa',
          border: '1px dashed',
          borderColor: '#d7d7da',
          borderRadius: 3,
        }}
      >
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color={'text.secondary'}>
            No gadgets registered yet.
          </Typography>
          <Button variant={'outlined'} onClick={onRegister}>
            Register a Gadget
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer
        component={Paper}
        variant={'outlined'}
        sx={{ borderColor: 'divider', borderRadius: 3, boxShadow: 'none' }}
      >
        <Table sx={{ minWidth: 860 }}>
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      py: 2,
                      color: 'text.secondary',
                      fontSize: 13,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      borderColor: 'divider',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = selectedGadget?.id === row.original.id

              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => onSelect(row.original)}
                  aria-selected={isSelected}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: isSelected ? '#eef6ff' : 'background.paper',
                    '&:hover': {
                      bgcolor: isSelected ? '#e7f2ff' : '#f7fbff',
                    },
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        py: 2.25,
                        color: 'text.primary',
                        borderColor: 'divider',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction={'row'}
        spacing={2}
        sx={{
          mt: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant={'outlined'}
          size={'small'}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Typography
          color={'text.secondary'}
          sx={{ minWidth: 92, textAlign: 'center', fontSize: 14 }}
        >
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </Typography>
        <Button
          variant={'outlined'}
          size={'small'}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Stack>
    </Box>
  )
}

export default GadgetTable
