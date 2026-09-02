import { useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
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
  {
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <Tooltip title={'Delete'}>
        <IconButton
          size={'small'}
          aria-label={'Delete ' + info.row.original.gadgetName}
          onClick={(event) => {
            event.stopPropagation()
            info.table.options.meta.onDeleteRequest(info.row.original)
          }}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'error.main', bgcolor: '#fff2f2' },
          }}
        >
          <DeleteOutlineRoundedIcon fontSize={'small'} />
        </IconButton>
      </Tooltip>
    ),
  },
]

const filterOptions = ['All', 'Smartphone', 'Laptop', 'Wearable', 'Audio']

function DetailField({ label, children }) {
  return (
    <Box>
      <Typography
        color={'text.secondary'}
        sx={{ mb: 0.75, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  )
}

function ActiveGadgetCard({ gadget }) {
  return (
    <Paper
      component={'section'}
      aria-label={'Active Gadget'}
      variant={'outlined'}
      sx={{
        mt: 4,
        p: { xs: 3, sm: 4 },
        borderColor: 'divider',
        borderRadius: 3,
        boxShadow: 'none',
      }}
    >
      <Typography
        color={'primary.main'}
        sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em' }}
      >
        ACTIVE GADGET
      </Typography>

      {!gadget ? (
        <Typography color={'text.secondary'} sx={{ mt: 3 }}>
          Select a gadget from the table to view its details.
        </Typography>
      ) : (
        <>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 2, alignItems: { sm: 'center' } }}
          >
            <Typography
              component={'h3'}
              sx={{ fontSize: { xs: 24, sm: 28 }, fontWeight: 700 }}
            >
              {gadget.gadgetName}
            </Typography>
            <Chip
              label={gadget.category}
              size={'small'}
              sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
            />
          </Stack>

          <Box
            sx={{
              mt: 4,
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 3,
            }}
          >
            <DetailField label={'Health Rating'}>
              <Typography sx={{ mb: 1, fontWeight: 700 }}>
                {gadget.healthRating} / 100
              </Typography>
              <LinearProgress
                variant={'determinate'}
                value={gadget.healthRating}
                sx={{
                  height: 7,
                  maxWidth: 280,
                  borderRadius: 4,
                  bgcolor: '#e9eef4',
                }}
              />
            </DetailField>
            <DetailField label={'Manufacturer'}>
              <Typography>{gadget.manufacturer}</Typography>
            </DetailField>
            <DetailField label={'Tech Brand Name'}>
              <Typography>{gadget.techBrand}</Typography>
            </DetailField>
            <DetailField label={'User Role'}>
              <Chip
                label={gadget.role}
                size={'small'}
                variant={'outlined'}
                sx={{
                  bgcolor: '#fafafa',
                  borderColor: 'divider',
                  color: 'text.secondary',
                  fontWeight: 600,
                }}
              />
            </DetailField>
          </Box>
        </>
      )}
    </Paper>
  )
}

function GadgetTable({
  gadgets,
  hasInventory,
  selectedGadget,
  activeGadget,
  categoryFilter,
  onSelect,
  onDelete,
  onCategoryFilterChange,
  onRegister,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null)

  const table = useReactTable({
    data: gadgets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      onDeleteRequest: setDeleteTarget,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  })

  const handleFilterChange = (event, newFilter) => {
    if (newFilter) {
      table.setPageIndex(0)
      onCategoryFilterChange(newFilter)
    }
  }

  const handleCloseDeleteDialog = () => {
    setDeleteTarget(null)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return

    const { pageIndex, pageSize } = table.getState().pagination
    const lastPageIndex = Math.max(
      0,
      Math.ceil((gadgets.length - 1) / pageSize) - 1,
    )

    onDelete(deleteTarget.id)

    if (pageIndex > lastPageIndex) {
      table.setPageIndex(lastPageIndex)
    }

    setDeleteTarget(null)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        color={'text.secondary'}
        sx={{ mb: 1.25, fontSize: 13, fontWeight: 700 }}
      >
        Filter by category
      </Typography>
      <Box sx={{ mb: 3, overflowX: 'auto', pb: 0.5 }}>
        <ToggleButtonGroup
          value={categoryFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label={'Filter gadgets by category'}
          size={'small'}
          sx={{
            minWidth: 'max-content',
            '& .MuiToggleButton-root': {
              px: { xs: 1.5, sm: 2.25 },
              textTransform: 'none',
              borderColor: 'divider',
            },
          }}
        >
          {filterOptions.map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {gadgets.length === 0 ? (
        <Box
          sx={{
            minHeight: 170,
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
              {hasInventory
                ? 'No gadgets found in this category.'
                : 'No gadgets registered yet.'}
            </Typography>
            {!hasInventory && (
              <Button variant={'outlined'} onClick={onRegister}>
                Register a Gadget
              </Button>
            )}
          </Stack>
        </Box>
      ) : (
        <>
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
        </>
      )}
      <ActiveGadgetCard gadget={activeGadget} />
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={handleCloseDeleteDialog}
        maxWidth={'xs'}
        fullWidth
      >
        <DialogTitle>Delete Gadget?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{' '}
            <Box
              component={'span'}
              sx={{ color: 'text.primary', fontWeight: 700 }}
            >
              {deleteTarget?.gadgetName}
            </Box>
            ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            variant={'contained'}
            color={'error'}
            disableElevation
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default GadgetTable
