// CountryForm.js
import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// React component
const CountryForm = ({
  onSubmit,
  countryName,
  setCountryName,
  provinceState,
  setProvinceState,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(countryName, provinceState);
  };
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="countryName">Country Name:</Label>
        <Input
          type="text"
          required
          id="countryName"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <Label htmlFor="province">Province/State:</Label>
        <Input
          type="text"
          id="province-state"
          value={provinceState}
          onChange={(e) => setProvinceState(e.target.value)}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default CountryForm;
