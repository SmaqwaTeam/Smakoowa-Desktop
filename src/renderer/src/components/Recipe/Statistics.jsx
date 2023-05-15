import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

const columns = [
  { id: 'controllerName', label: 'Controller', minWidth: 170 },
  { id: 'actionName', label: 'Action', minWidth: 170 },
  { id: 'parameters', label: 'Parameters', minWidth: 170 },
  { id: 'requestCount', label: 'Request Count', minWidth: 170 }
]
const url = 'https://smakoowaapi.azurewebsites.net'

const Statistics = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    const tokenData = localStorage.getItem('user')
    const parsedTokenData = JSON.parse(tokenData)
    const token = parsedTokenData?.content?.token
    fetch(`${url}/api/Statistics/GetAll`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data.content)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statistics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.actionName} // lub inny unikalny identyfikator
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align="center">
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={statistics.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Statistics
