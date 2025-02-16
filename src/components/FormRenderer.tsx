import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Card, CardContent, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchFormFields, submitForm } from "../utils/api";
import { Link } from "react-router-dom";
import useNotify from "./hooks/useNotify";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  required: boolean;
  min?: number;
  max?: number;
  options?: string[];
}

const FormRenderer = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const NotificationBar = useNotify();

  const handleChange = (id: string, value: string | number) => {
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    setLoading(true);
    fetchFormFields().then((res) => {
        setFields(res);
    }).catch((err) => NotificationBar(err, 'error')).finally(() => {
        setLoading(false);
    })
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitForm(formData)
      .then((message) => {
        NotificationBar(message);
      })
      .catch((err) => {
        NotificationBar(err, "error")
      }).finally(() => setIsSubmitting(false))
  };

  if(loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    )
  }

  return (
    <div className="p-6">
        <Button component={Link} to="/builder"><ArrowBackIcon /> Back to form builder</Button>
    <form onSubmit={handleSubmit} className="p-4">
        {fields?.length > 0 ? (
            <>
      {fields.map((field) => (
        <Card key={field.id} className="mb-4">
          <CardContent>
            <label className="block font-bold mb-2">{field.label}</label>
            {field.type === "text" || field.type === "number" ? (
              <TextField
                type={field.type}
                fullWidth
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="mb-2"
                inputProps={field.type === "number" ? { min: field.min, max: field.max } : {}}
              />
            ) : field.type === "select" && field.options ? (
              <TextField
                select
                fullWidth
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </CardContent>
        </Card>
      ))}
      <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
        Submit
      </LoadingButton>
            </>
        ) : (
            <div className="flex justify-center items-center h-screen flex-col">
                <Typography className="!mb-4 !disabled-text">No fields available to render. Please add fields in the form builder.</Typography>
                <Button variant="contained" component={Link} to="/builder" >Go to Form Builder</Button> 
            </div>
        )}
    </form>
    </div>
  );
};

export default FormRenderer;
