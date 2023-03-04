import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import langString from "utils/langString";
import { Deserializer, Serializer } from "jsonapi-serializer";
import axiosServices from "utils/axiosServices";
import { gridSpacing } from "store/constant";

type OptionType = {
  value: number;
  label: string;
};
type GeoFilterFormPropsType = {
  division: number;
  district: number;
  upazilla: number;
  union: number;
  setDivision: (value: number) => void;
  setDistrict: (value: number) => void;
  setUpazilla: (value: number) => void;
  setUnion: (value: number) => void;
};
export default function GeoFilterForm({
  division,
  district,
  upazilla,
  union,
  setDivision,
  setDistrict,
  setUpazilla,
  setUnion,
}: GeoFilterFormPropsType) {
  const [divisions, setDivisions] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [upazillas, setUpazillas] = useState<OptionType[]>([]);
  const [unions, setUnions] = useState<OptionType[]>([]);

  const changeDivision = async (value: number) => {
    setDivision(value);
    const postData = new Serializer("upazillas", {
      keyForAttribute: "camelCase",
      attributes: ["id"],
    }).serialize({ id: value });
    const resp = await axiosServices.post("core/geo/districts/list/", postData);
    if (resp.status === 200) {
      const serData = await new Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(resp.data);
      const dataList: OptionType[] = [];
      serData.forEach((element: any) => {
        dataList.push({ value: element.id, label: element.geoName });
      });
      setDistricts(dataList);
      setDistrict(0);
      setUpazilla(0);
      setUnion(0);
      setUpazillas([]);
      setUnions([]);
    }
  };

  const changeDistrict = async (value: number) => {
    setDistrict(value);
    const postData = new Serializer("upazillas", {
      keyForAttribute: "camelCase",
      attributes: ["id"],
    }).serialize({ id: value });
    const resp = await axiosServices.post("core/geo/upazillas/list/", postData);
    if (resp.status === 200) {
      const serData = await new Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(resp.data);
      const dataList: OptionType[] = [];
      serData.forEach((element: any) => {
        dataList.push({ value: element.id, label: element.geoName });
      });
      setUpazillas(dataList);
      setUnion(0);
      setUnions([]);
    }
  };

  const changeUpazilla = async (value: number) => {
    setUpazilla(value);
    const postData = new Serializer("upazillas", {
      keyForAttribute: "camelCase",
      attributes: ["id"],
    }).serialize({ id: value });
    const resp = await axiosServices.post("core/geo/upazillas/list/", postData);
    if (resp.status === 200) {
      const serData = await new Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(resp.data);
      const dataList: OptionType[] = [];
      serData.forEach((element: any) => {
        dataList.push({ value: element.id, label: element.geoName });
      });
      setUnions(dataList);
    }
  };

  useEffect(() => {
    const init = async () => {
      const response = await axiosServices.post("core/geo/divisions/list/");
      if (response.status === 200) {
        const divData = await new Deserializer({
          keyForAttribute: "camelCase",
        }).deserialize(response.data);
        const divList: OptionType[] = [];
        divData.forEach((element: any) => {
          divList.push({ value: element.id, label: element.geoName });
        });
        setDivisions(divList);
        if (division) {
          const disReq = new Serializer("upazillas", {
            keyForAttribute: "camelCase",
            attributes: ["id"],
          }).serialize({ id: division });
          const disResp = await axiosServices.post(
            "core/geo/districts/list/",
            disReq
          );
          if (disResp.status === 200) {
            const serData = await new Deserializer({
              keyForAttribute: "camelCase",
            }).deserialize(disResp.data);
            const dataList: OptionType[] = [];
            serData.forEach((element: any) => {
              dataList.push({ value: element.id, label: element.geoName });
            });
            setDistricts(dataList);
            if (district) {
              const postData = new Serializer("upazillas", {
                keyForAttribute: "camelCase",
                attributes: ["id"],
              }).serialize({ id: district });
              const resp = await axiosServices.post(
                "core/geo/upazillas/list/",
                postData
              );
              if (resp.status === 200) {
                const serData = await new Deserializer({
                  keyForAttribute: "camelCase",
                }).deserialize(resp.data);
                const dataList: OptionType[] = [];
                serData.forEach((element: any) => {
                  dataList.push({ value: element.id, label: element.geoName });
                });
                setUpazillas(dataList);
                if (upazilla) {
                  const postData = new Serializer("upazillas", {
                    keyForAttribute: "camelCase",
                    attributes: ["id"],
                  }).serialize({ id: upazilla });
                  const resp = await axiosServices.post(
                    "core/geo/upazillas/list/",
                    postData
                  );
                  if (resp.status === 200) {
                    const serData = await new Deserializer({
                      keyForAttribute: "camelCase",
                    }).deserialize(resp.data);
                    const dataList: OptionType[] = [];
                    serData.forEach((element: any) => {
                      dataList.push({
                        value: element.id,
                        label: element.geoName,
                      });
                    });
                    setUnions(dataList);
                  }
                }
              }
            }
          }
        }
      }
    };
    init();
  }, [district, division, upazilla]);

  return (
    <>
      <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
        <Grid item xs={6} md={3}>
          <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
            {langString("division")}
          </Typography>
        </Grid>
        <Grid item xs={6} md={7}>
          <TextField
            id="outlined-select-division"
            select
            fullWidth
            label={langString("division")}
            value={division}
            onChange={(event: any) => changeDivision(event.target.value)}
          >
            <MenuItem value={0}>{langString("selectone")}</MenuItem>
            {divisions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
        <Grid item xs={6} md={3}>
          <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
            {langString("district")}
          </Typography>
        </Grid>
        <Grid item xs={6} md={7}>
          <TextField
            id="outlined-select-district"
            select
            fullWidth
            label={langString("district")}
            value={district}
            onChange={(event: any) => changeDistrict(event.target.value)}
          >
            <MenuItem value={0}>{langString("selectone")}</MenuItem>
            {districts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
        <Grid item xs={6} md={3}>
          <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
            {langString("upazilla")}
          </Typography>
        </Grid>
        <Grid item xs={6} md={7}>
          <TextField
            id="outlined-select-upazilla"
            select
            fullWidth
            label={langString("upazilla")}
            value={upazilla}
            onChange={(event: any) => changeUpazilla(event.target.value)}
          >
            <MenuItem value={0}>{langString("selectone")}</MenuItem>
            {upazillas.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
        <Grid item xs={6} md={3}>
          <Typography variant="h5" sx={{ marginTop: 2, textAlign: "right" }}>
            {langString("union")}
          </Typography>
        </Grid>
        <Grid item xs={6} md={7}>
          <TextField
            id="outlined-select-union"
            select
            fullWidth
            label={langString("union")}
            value={union}
            onChange={(event: any) => setUnion(event.target.value)}
          >
            <MenuItem value={0}>{langString("selectone")}</MenuItem>
            {unions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}
