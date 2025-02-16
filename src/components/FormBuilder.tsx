import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "select";
  required: boolean;
  min?: number;
  max?: number;
  options?: string[];
}

const FormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [isInitialised, setInialized] = useState(false);

  useEffect(() => {
    const savedFields = localStorage.getItem("formFields");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
    setInialized(true);
  }, []);

  useEffect(() => {
    if(isInitialised) {
        localStorage.setItem("formFields", JSON.stringify(fields));
    }
  }, [fields, isInitialised]);

  const addField = (type: "text" | "number" | "select") => {
    const newField: FormField = {
      id: uuidv4(),
      label: "",
      type,
      required: false,
      min: undefined,
      max: undefined,
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="flex items-center flex-col p-4">
        <div className="mt-4">
            <Button component={Link} to="/" className="!text-xs !capitalize">Home</Button>
            <Button component={Link} to="/renderer" className="!text-xs !capitalize">Preview</Button>
        </div>
      <div className="flex gap-2 mb-4">
        <Button variant="contained" onClick={() => addField("text")}>Add Text</Button>
        <Button variant="contained" onClick={() => addField("number")}>Add Number</Button>
        <Button variant="contained" onClick={() => addField("select")}>Add Select</Button>
      </div>
      {
        fields?.length > 0 ? (
            <>
      {fields.map((field, index) => (
        <Card key={field.id} className="mb-4 w-full max-w-md relative">

          <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="capitalize mb-4">
          {field.type}
        </Typography>
            <div className="flex justify-between items-center">
              <TextField
                label="Field Label"
                variant="outlined"
                required
                fullWidth
                value={field.label}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].label = e.target.value;
                  setFields(newFields);
                }}
                className="mb-2"
              />
              
            </div>
            {field.type === "number" && (
              <div className="flex gap-2 mt-4">
                <TextField
                  label="Min Value"
                  type="number"
                  fullWidth
                  value={field.min}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].min = Number(e.target.value);
                    setFields(newFields);
                  }}
                  className="mb-2"
                />
                <TextField
                  label="Max Value"
                  type="number"
                  fullWidth
                  value={field.max}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].max = Number(e.target.value);
                    setFields(newFields);
                  }}
                  className="mb-2"
                />
              </div>
            )}
            {field.type === "select" && (
            <div className="mt-4">  
              <TextField
                label="Options (comma-separated)"
                variant="outlined"
                fullWidth
                value={field.options?.join(",") || ""}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].options = e.target.value.split(",").map((opt) => opt.trim());
                  setFields(newFields);
                }}
              />
              </div>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.required}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].required = e.target.checked;
                    setFields(newFields);
                  }}
                />
              }
              label="Required"
            />
          </CardContent>
          <div>
            <div className="absolute -right-0 -top-1 cursor-pointer">
                <CancelIcon onClick={() => removeField(field.id)} className="!text-[18px]" />
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-center">
            <Button component={Link} to="/renderer">Go to form renderer<ArrowForwardIcon /> </Button>
      </div>
            </>
        ) : (
            <div className="flex justify-center items-center h-screen">
                No fields added. Click a button above to add a new field.
            </div>
        ) 
      }
    </div>
  );
};

export default FormBuilder;
