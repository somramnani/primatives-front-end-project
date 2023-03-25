import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Searchbar({
  input,
  handleOnChange,
  handleOnSubmit,
  clear,
}) {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <TextField
          value={input}
          onChange={handleOnChange}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleOnSubmit}
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button onClick={clear} variant="outlined">
          Clear
        </Button>
      </Stack>
    </div>
  );
}
