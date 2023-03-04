import { useEffect, useState } from 'react';
import _ from 'lodash';

import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type DatePickerPropsType = {
    setYearMonthDay: (ymd: string) => void;
};
export default function DatePicker({ setYearMonthDay }: DatePickerPropsType) {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2000);
    const [days, setDays] = useState<number[]>(_.range(1, 32, 1));

    const changeMonth = (value: number) => {
        setMonth(value);
        if (value === 2) {
            setDays(_.range(1, 30, 1));
        } else if ([9, 4, 6, 11].includes(value)) {
            setDays(_.range(1, 31, 1));
        } else {
            setDays(_.range(1, 32, 1));
        }
    };
    const months = _.range(1, 13, 1);
    const years = _.range(1950, 2040, 1);

    const getMonthName = (mon: number) => {
        const d = new Date();
        d.setMonth(mon - 1);
        const monName = d.toLocaleString('default', { month: 'long' });
        return monName;
    };

    useEffect(() => {
        setYearMonthDay(`${year}-${month}-${day}`);
    }, [year, month, day, setYearMonthDay]);

    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ width: '96%' }}>
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={year}
                        label="Year"
                        onChange={(event: any) => setYear(event.target.value)}
                    >
                        {years.map((item: number) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ width: '96%' }}>
                    <InputLabel id="month-select-label">Month</InputLabel>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={month}
                        label="Month"
                        onChange={(event: any) => changeMonth(event.target.value)}
                    >
                        {months.map((item: number) => (
                            <MenuItem key={item} value={item}>
                                {getMonthName(item)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ width: '96%' }}>
                    <InputLabel id="day-select-label">Day</InputLabel>
                    <Select
                        labelId="day-select-label"
                        id="day-select"
                        value={day}
                        label="Day"
                        onChange={(event: any) => setDay(event.target.value)}
                    >
                        {days.length &&
                            days.map((item: number) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}
