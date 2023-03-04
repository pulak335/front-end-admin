import { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axiosServices from 'utils/axiosServices';

type LocationsPropsType = {
    address: number;
    setAddress: (value: number) => void;
};
export default function Locations({ address, setAddress }: LocationsPropsType) {
    const [locations, setLocations] = useState<any[]>([]);
    const [definations, setDefinations] = useState<any[]>([]);

    const renderLocationItems = (defID: number) => {
        if (locations) {
            const filteredLocations = locations.filter(
                (item: any) =>
                    (item.relationships?.parent?.data && item.relationships?.parent?.data?.id === address) ||
                    item.relationships?.geo_definition?.data?.id === defID
            );

            return filteredLocations.map((loc: any) => (
                <MenuItem key={loc.id} value={loc.id}>
                    {loc.attributes?.name}
                </MenuItem>
            ));
        }
        return <MenuItem value={0}>None</MenuItem>;
    };

    useEffect(() => {
        axiosServices
            .post('settings/locations/')
            .then((res) => {
                if (res.status === 200) {
                    setLocations(res.data.data);
                    setDefinations(res.data.included);
                }
            })
            .catch((e: any) => {
                console.log(e);
            });
    }, []);
    return (
        <Grid container>
            {definations
                ? definations.map((def: any) => (
                      <Grid item key={def.id} xs={12} sm={3}>
                          <FormControl sx={{ width: '96%' }}>
                              <InputLabel id={`${def.id}-select-label`}>{def.attributes?.name}</InputLabel>
                              <Select
                                  labelId={`${def.id}-select-label`}
                                  id={`${def.id}-select`}
                                  label={def.attributes?.name}
                                  onChange={(event: any) => setAddress(event.target.value)}
                              >
                                  <MenuItem value={0}>All</MenuItem>
                                  {renderLocationItems(def.id)}
                              </Select>
                          </FormControl>
                      </Grid>
                  ))
                : 'No Location Found'}
        </Grid>
    );
}
