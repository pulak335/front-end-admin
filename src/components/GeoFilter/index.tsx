import { Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import langString from "utils/langString";
import { Deserializer, Serializer } from "jsonapi-serializer";
import axiosServices from "utils/axiosServices";
import Loader from "ui-component/Loader";

type OptionType = {
  value: number;
  label: string;
};
type GeoFilterPropsType = {
  gridWidth: 1 | 2 | 3 | 4 | 5 | 6;
  district: number;
  upazilla: number;
  union: number;
  setDistrict: (value: number) => void;
  setUpazilla: (value: number) => void;
  setUnion: (value: number) => void;
};
export default function GeoFilter({
  gridWidth,
  district,
  upazilla,
  union,
  setDistrict,
  setUpazilla,
  setUnion,
}: GeoFilterPropsType) {
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [upazillas, setUpazillas] = useState<OptionType[]>([]);
  const [unions, setUnions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  const changeDistrict = async (value: number) => {
    setLoading(true);
    setDistrict(value);
    const postData = new Serializer("upazillas", {
      keyForAttribute: "camelCase",
      attributes: ["districtCode"],
    }).serialize({ districtCode: value });
    const resp = await axiosServices.post(
      "web/routers/geoRoute/getAllGeoUpazilla/",
      postData
    );
    if (resp.status === 200) {
      const serData = await new Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(resp.data);
      const dataList: OptionType[] = [];
      serData.forEach((element: any) => {
        dataList.push({ value: element.id, label: element.fieldName });
      });
      setUpazillas(dataList);
      setLoading(false);
    }
  };

  const changeUpazilla = async (value: number) => {
    setLoading(true);
    setUpazilla(value);
    const postData = new Serializer("upazillas", {
      keyForAttribute: "camelCase",
      attributes: ["upazillaCode"],
    }).serialize({ upazillaCode: value });
    const resp = await axiosServices.post(
      "web/routers/geoRoute/getAllGeoUnion/",
      postData
    );
    if (resp.status === 200) {
      const serData = await new Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(resp.data);
      const dataList: OptionType[] = [];
      serData.forEach((element: any) => {
        dataList.push({ value: element.id, label: element.fieldName });
      });
      setUnions(dataList);
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const response = await axiosServices.post(
        "web/routers/geoRoute/getAllGeoDistrict/"
      );
      if (response.status === 200) {
        const distData = await new Deserializer({
          keyForAttribute: "camelCase",
        }).deserialize(response.data);
        const distList: OptionType[] = [];
        distData.forEach((element: any) => {
          distList.push({ value: element.id, label: element.fieldName });
        });
        setDistricts(distList);
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Grid item xs={12} md={gridWidth}>
        <TextField
          id="outlined-select-district"
          select
          fullWidth
          label={langString("district")}
          value={district}
          onChange={(event: any) => changeDistrict(event.target.value)}
        >
          {districts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={gridWidth}>
        <TextField
          id="outlined-select-upazilla"
          select
          fullWidth
          label={langString("upazilla")}
          value={upazilla}
          onChange={(event: any) => changeUpazilla(event.target.value)}
        >
          {upazillas.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={gridWidth}>
        <TextField
          id="outlined-select-union"
          select
          fullWidth
          label={langString("union")}
          value={union}
          onChange={(event: any) => setUnion(event.target.value)}
        >
          {unions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
}
