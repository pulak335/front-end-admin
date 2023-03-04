import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { gridSpacing } from "store/constant";
import axiosServices from "utils/axiosServices";
import langString from "utils/langString";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import useAuth from "hooks/useAuth";

type PaymentsFilterPropsType = {
  hub: number;
  setHub: (value: number) => void;
  purchaseDateRange: DateRange<Date>;
  setPurchaseDateRange: (value: DateRange<Date>) => void;
  paymentDateRange: DateRange<Date>;
  setPaymentDateRange: (value: DateRange<Date>) => void;
};
export default function PaymentsFilter({
  hub,
  setHub,
  purchaseDateRange,
  setPurchaseDateRange,
  paymentDateRange,
  setPaymentDateRange,
}: PaymentsFilterPropsType) {
  const [hubs, setHubs] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axiosServices.post(
          `core/hub-representative/list/`
        );
        if (response.status === 200) {
          const respData = await new Deserializer({
            keyForAttribute: "camelCase",
          }).deserialize(response.data);
          setHubs([{
            id:1,
            name:"Injury Emergency",
            value:"Injury Emergency"
          },
          {
            id:2,
            name:"Medical Emergency",
            value:"Medical Emergency"
          }
        ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axiosServices.post(
          `products/supplier/list/dropdown/`
        );
        if (response.status === 200) {
          const respData = await new Deserializer({
            keyForAttribute: "camelCase",
          }).deserialize(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6} sx={{ marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Report Date From"
              endText="Report Date To"
              value={purchaseDateRange}
              // eslint-disable-next-line @typescript-eslint/no-implied-eval
              onChange={(newValue) => setPurchaseDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField size="small" {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField size="small" {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={5} sx={{ marginBottom: 2 }}>
        {user?.accountTypes?.includes(1) && (
          <Grid item xs={12} sm={3} sx={{ marginBottom: 2 }}>
            <TextField
              size="small"
              id="outlined-select-hub"
              select
              fullWidth
              label={langString("Find by Injury")}
              value={hub}
              onChange={(event: any) => setHub(event.target.value)}
            >
              <MenuItem value={0}>{langString("selectone")}</MenuItem>
              {hubs &&
                hubs.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12} sm={4} sx={{ marginBottom: 2 }}>
          <TextField
            size="small"
            id="outlined-select-paymentStatus"
            select
            fullWidth
            label={langString("Emergency")}
            // value={paymentStatus}
            // onChange={(event: any) => setPaymentStatus(event.target.value)}
          >
            <MenuItem value={0}>Injury Emergency</MenuItem>
            <MenuItem value={1}>Medical Emergency</MenuItem>
          </TextField>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
}
