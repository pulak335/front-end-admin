import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { gridSpacing } from "store/constant";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { checkNullInfo } from "utils/Helpers";

// Props type
export type ColumnType = {
  header: string;
  accessor: string;
  content?: any;
};

type TableProps = {
  columns: ColumnType[];
  rows: any[];
  count: number;
  page: number;
  rowsPerPage: number;
  link?: string;
  linkID?: string;
  setPage: (value: number) => void;
  setRowsPerPage: (value: number) => void;
  idField?: string;
  statusField?: string;
  updateStatus?: (id: string) => void;

};

// ==============================|| TABLE - BASIC ||============================== //

export default function BasicDataTable({
  columns,
  rows,
  count,
  page,
  rowsPerPage,
  link,
  linkID,
  setPage,
  setRowsPerPage,
  idField,
  statusField,
  updateStatus,
}: TableProps) {
  const navigate = useNavigate();
  const classes = useStyle();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderCell = (item: any, column: any) => {
    if (column.content) {
      return column.content(item);
    }
    return (
      <Typography noWrap>{checkNullInfo(item[column.accessor])}</Typography>
    );
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard content={false}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any, index: number) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ border: "1px solid lightgray" }}
                    >
                      <Typography variant="subtitle1">
                        {column.header}
                      </Typography>
                    </TableCell>
                  ))}
                  {statusField && idField && updateStatus && (
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid lightgray" }}
                    >
                      <Typography variant="subtitle1" noWrap>
                        Update Status
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length ? (
                  rows.map((row: any, i: number) => (
                    <TableRow
                      key={i}
                      className={classes.rowsHover}
                      onClick={() =>
                        linkID ? navigate(`${link + row[linkID]}/`) : ""
                      }
                    >
                      {columns.map((column: ColumnType, k: number) => (
                        <TableCell
                          align="center"
                          key={k}
                          sx={{ border: "1px solid lightgray" }}
                        >
                          {renderCell(row, column)}
                        </TableCell>
                      ))}
                      {statusField && idField && updateStatus && (
                        <TableCell
                          align="center"
                          sx={{ border: "1px solid lightgray" }}
                        >
                          <Button
                            variant="contained"
                            color={row[statusField] ? "success" : "primary"}
                            size="small"
                            onClick={() => updateStatus(row[idField])}
                          >
                            {row[statusField] ? "Cancel Approval" : "Approve"}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className={classes.rowsHover}>
                    <TableCell align="center" colSpan={columns.length}>
                      <h3>No Data Found</h3>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles({
  rowsHover: {
    borderBottom: "1px solid #DDD",
    "&:hover": {
      backgroundColor: "#FFE",
    },
  },
});
