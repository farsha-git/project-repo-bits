// src/pages/ReportForm.tsx
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  title: string;
  description?: string;
  status: "lost" | "found";
  category?: string;
  location_text?: string;
  contact_info?: string;
  photos?: FileList | null;
};

const categories = ["Phone", "Wallet", "Keys", "Bag", "ID", "Other"];

export default function ReportForm() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: { status: "lost" },
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  const onFilesChange = (files: FileList | null) => {
    if (!files) return setPreviews([]);
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      // Simple flow: send item metadata to backend first; for images you should request presigned URLs
      const payload = {
        ...values,
        reported_at: new Date().toISOString(),
        photos: [], // implement presigned upload flow later
      };
      await api.post("/items", payload);
      navigate(values.status === "lost" ? "/lost" : "/found");
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Check console.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Report an Item
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Title" required fullWidth />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Description" multiline rows={4} fullWidth />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField select label="Status" {...field}>
                <MenuItem value="lost">Lost</MenuItem>
                <MenuItem value="found">Found</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField select label="Category" {...field}>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="location_text"
            control={control}
            render={({ field }) => <TextField {...field} label="Location (optional)" />}
          />

          <TextField
            label="Contact info (optional)"
            {...register("contact_info")}
            fullWidth
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFilesChange(e.target.files)}
          />

          <Stack direction="row" spacing={1}>
            {previews.map((p) => (
              <img key={p} src={p} alt="preview" style={{ height: 80, borderRadius: 8 }} />
            ))}
          </Stack>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
