import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

type SearchBoxPropsType = {
  placeholder: string;
  properties: string[];
  itemList: any[];
  setItemList: (values: any[]) => void;
  refreshList: () => void;
};
export default function SearchBox({
  properties,
  placeholder,
  itemList,
  setItemList,
  refreshList,
}: SearchBoxPropsType) {
  const [search, setSearch] = useState("");
  const handleSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    const newString = event?.target.value;
    setSearch(newString || "");

    if (newString) {
      const newRows = itemList.filter((row: any) => {
        let matches = true;
        let containsQuery = false;
        properties.forEach((property) => {
          if (
            row[property]
              ?.toString()
              .toLowerCase()
              .includes(newString.toString().toLowerCase())
          ) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setItemList(newRows);
    } else {
      refreshList();
    }
  };
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      onChange={handleSearch}
      placeholder={placeholder}
      value={search}
      size="small"
    />
  );
}
