import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <Typography component="h4" className="!mb-6 !text-2xl !font-bold">Welcome to the Form Builder App</Typography>
      <div className="flex gap-4">
        <Button variant="contained" color="primary" component={Link} to="/builder">
          Go to Form Builder
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/renderer">
          Render Form
        </Button>
      </div>
    </Container>
  );
};

export default Home;
