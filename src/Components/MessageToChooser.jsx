import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, Stack } from "@mui/material";

export default function MessageToChooser({ users }) {
  const [to, setTo] = React.useState("");

  const handleChange = (event) => {
    setTo(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220, marginTop: 5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">To</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={to}
          label="To"
          onChange={handleChange}
        >
          {users
            ? users.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.userName}>
                    <Stack direction="row" gap={3} alignItems="center">
                      <Avatar src={user.avtar} sx={{ width: 40, height: 40 }} />
                      <span>{user.userName}</span>
                    </Stack>
                  </MenuItem>
                );
              })
            : ""}
        </Select>
      </FormControl>
    </Box>
  );
}
