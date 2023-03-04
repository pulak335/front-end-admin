import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import Required from "components/common/Required";
import useAuth from "hooks/useAuth";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData, validateFormFields } from "utils/Helpers";
import langString from "utils/langString";

export default function AddPayment() {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [supplier, setSupplier] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [cheque, setCheque] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const [hub, setHub] = useState("0");
  const [hubs, setHubs] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const savePayment = async () => {
    setLoading(true);
    setIsSubmitting(true);
    const allErrors = validateFormFields(
      ["supplier", "paymentDate", "paymentAmount"],
      [supplier, paymentDate, paymentAmount]
    );
    if (allErrors.valid) {
      try {
        const postData = serializeValidData("Payments", {
          supplierInfo: {
            id: supplier,
          },
          paymentDate,
          paymentAmount,
          voucher,
          cheque,
          hubId: hub,
        });
        const response = await axiosServices.post(
          `payment/supplier/add/`,
          postData
        );
        if (response.status === 200) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Payment Created Successfully",
            variant: "alert",
            alertSeverity: "success",
          });
          navigate("/payments", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(allErrors);
    }
    setLoading(false);
    setIsSubmitting(false);
  };

  const changeSupplier = async (value: number) => {
    setSupplier(value);
    try {
      const postData = serializeValidData("Stocks", { id: value });
      const response = await axiosServices.post(
        `payment/supplier/credit-info/`,
        postData
      );
      if (response.status === 200) {
        const respData = await new Deserializer({
          keyForAttribute: "camelCase",
        }).deserialize(response.data);
        setCreditLimit(respData?.creditLimit - respData?.creditDue || 0);
        setDueAmount(respData?.creditDue || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axiosServices.post(
        "core/hub-representative/list/"
      );
      if (response.status === 200) {
        const divData = await new Deserializer({
          keyForAttribute: "camelCase",
        }).deserialize(response.data);
        setHubs(divData);
      }
    })();
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
          setSuppliers(respData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <Wrapper
      title={`${langString("add")} ${langString("payment")}`}
      backLink="/payments"
    >
      {loading && <Loader />}
      <Box sx={{ border: "1px solid #EEE", padding: 3 }}>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Supplier <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.supplier?.required)}
            >
              <InputLabel id="supplier-select-label">Supplier</InputLabel>
              <Select
                name="supplier"
                id="supplier-select"
                fullWidth
                label="Supplier"
                value={supplier}
                onChange={(event: any) => changeSupplier(event.target.value)}
              >
                <MenuItem value={0}>{langString("selectone")}</MenuItem>
                {suppliers &&
                  suppliers.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </Select>
              {Boolean(errors && errors.supplier?.required) && (
                <FormHelperText error>
                  {errors.supplier?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        {typeof user?.accountTypes !== "undefined" &&
        user?.accountTypes[0] !== null &&
        user?.accountTypes[0] === 1 ? (
          <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
            <Grid item xs={6} md={3}>
              <Typography
                variant="h5"
                sx={{ marginTop: 2, textAlign: "right" }}
              >
                {langString("hub")} <Required />
              </Typography>
            </Grid>
            <Grid item xs={6} md={7}>
              <TextField
                id="outlined-select-hub"
                select
                fullWidth
                label={langString("hub")}
                value={hub}
                onChange={(e) => setHub(e.target.value)}
              >
                <MenuItem value={0}>{langString("selectone")}</MenuItem>
                {hubs.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Credit Limit <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.creditLimit?.required)}
            >
              <InputLabel htmlFor="creditLimit"></InputLabel>
              <OutlinedInput
                id="creditLimit"
                type="number"
                value={creditLimit}
                name="creditLimit"
              />
              {Boolean(errors && errors.creditLimit?.required) && (
                <FormHelperText error>
                  {errors.creditLimit?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Due Amount <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.dueAmount?.required)}
            >
              <InputLabel htmlFor="dueAmount"></InputLabel>
              <OutlinedInput
                id="dueAmount"
                type="number"
                value={dueAmount}
                name="dueAmount"
              />
              {Boolean(errors && errors.dueAmount?.required) && (
                <FormHelperText error>
                  {errors.dueAmount?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Date <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.purchaseDate?.required)}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="dd/MMM/yy"
                    value={paymentDate}
                    onChange={(newValue: Date | null) =>
                      setPaymentDate(newValue)
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              {Boolean(errors && errors.purchaseDate?.required) && (
                <FormHelperText error>
                  {errors.purchaseDate?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Payment Amount <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.paymentAmount?.required)}
            >
              <InputLabel htmlFor="paymentAmount"></InputLabel>
              <OutlinedInput
                id="paymentAmount"
                type="number"
                value={paymentAmount}
                name="paymentAmount"
                onChange={(event: any) => {
                  setPaymentAmount(event.target.value);
                }}
              />
              {Boolean(errors && errors.paymentAmount?.required) && (
                <FormHelperText error>
                  {errors.paymentAmount?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Voucher <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.voucher?.required)}
            >
              <InputLabel htmlFor="voucher"></InputLabel>
              <OutlinedInput
                id="voucher"
                type="text"
                value={voucher}
                name="voucher"
                onChange={(event: any) => setVoucher(event.target.value)}
              />
              {Boolean(errors && errors.voucher?.required) && (
                <FormHelperText error>{errors.voucher?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
              Cheque <Required />
            </Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <FormControl
              fullWidth
              error={Boolean(errors && errors.cheque?.required)}
            >
              <InputLabel htmlFor="cheque"></InputLabel>
              <OutlinedInput
                id="cheque"
                type="text"
                value={cheque}
                name="cheque"
                onChange={(event: any) => setCheque(event.target.value)}
              />
              {Boolean(errors && errors.cheque?.required) && (
                <FormHelperText error>{errors.cheque?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: "right", paddingTop: 3 }}>
              <Button
                color="warning"
                disabled={isSubmitting}
                size="large"
                type="button"
                onClick={() =>
                  navigate("/payments", {
                    replace: true,
                  })
                }
                variant="contained"
                sx={{ marginRight: 2 }}
              >
                {langString("cancel")}
              </Button>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                variant="contained"
                onClick={() => savePayment()}
              >
                {langString("save")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
}
