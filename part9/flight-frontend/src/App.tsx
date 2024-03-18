import { getAllDiary, createDiary } from "./diaryService";
import { useEffect, useState } from "react";
import { Diary, NewDiary, Weather, Visibility } from "./types"; // Import Weather and Visibility enums from types file
import axios from "axios";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string>("");
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: Weather.Sunny, // Use Weather enum value directly
    visibility: Visibility.Great, // Use Visibility enum value directly
    comment: "",
  });

  useEffect(() => {
    getAllDiary()
      .then((data) => {
        setDiaries(data);
      })
      .catch((error) => {
        setError("Error fetching diary entries: " + error.message);
      });
  }, []);

  const diaryCreation = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const createdDiary = await createDiary(newDiary);
      setDiaries([...diaries, createdDiary]);
      setNewDiary({
        date: "",
        weather: Weather.Sunny, // Provide a valid Weather enum value
        visibility: Visibility.Great, // Provide a valid Visibility enum value
        comment: "",
      });
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }

      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Add new diary
        </Typography>
        {error && (
          <Typography variant="body1" sx={{ color: "red" }}>
            Error: {error}
          </Typography>
        )}
        <form onSubmit={diaryCreation}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={newDiary.date || null}
                onChange={(date) => setNewDiary({ ...newDiary, date: date })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Weather</FormLabel>
                <RadioGroup
                  aria-label="weather"
                  name="weather"
                  value={newDiary.weather}
                  onChange={(e) =>
                    setNewDiary({
                      ...newDiary,
                      weather: e.target.value as Weather,
                    })
                  }
                >
                  <FormControlLabel
                    value={Weather.Sunny}
                    control={<Radio />}
                    label="Sunny"
                  />
                  <FormControlLabel
                    value={Weather.Rainy}
                    control={<Radio />}
                    label="Rainy"
                  />
                  <FormControlLabel
                    value={Weather.Cloudy}
                    control={<Radio />}
                    label="Cloudy"
                  />
                  <FormControlLabel
                    value={Weather.Stormy}
                    control={<Radio />}
                    label="Stormy"
                  />
                  <FormControlLabel
                    value={Weather.Windy}
                    control={<Radio />}
                    label="Windy"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Visibility"
                type="text"
                value={newDiary.visibility}
                onChange={(e) =>
                  setNewDiary({ ...newDiary, visibility: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Comment"
                type="text"
                value={newDiary.comment}
                onChange={(e) =>
                  setNewDiary({ ...newDiary, comment: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Diary Entry
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="h4" align="center" gutterBottom>
          Diary Entries
        </Typography>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <p>Date: {diary.date}</p>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </div>
        ))}
      </Container>
    </LocalizationProvider>
  );
};

export default App;
