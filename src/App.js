import logo from "./logo.svg";
import "./App.css";
import CountryForm from "./components/Forms/CountryFrom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import Uni from "./pages/Uni";

function App() {
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [uniList, setUniList] = useState(null);
  const [provinceState, setProvinceState] = useState("");

  const [currentUni, setCurrentUni] = useState(null);
  // const navigate = useNavigate();
  const onSubmit = async (value) => {
    try {
      setLoading(true);
      let existingData = await getUniData(countryName);
      if (existingData.length > 0) {
        setUniList(existingData);
        return;
      } else {
        const response = await axios.get(
          `http://universities.hipolabs.com/search?country=${value}`
        );
        if (response.status == 200) {
          const url = "http://localhost:5000/api/v1/uni";
          await axios.post(url, {
            uniData: response.data,
            country: countryName,
          });
          const data = await getUniData(countryName, provinceState);
          setUniList(data);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const redirectToWebPage = (webUrl) => {
    const extractedUrl = webUrl.slice(1, -1);
    window.open(extractedUrl, "_blank");
  };
  const getUniData = async (countryName, provinceState) => {
    try {
      setLoading(true);
      let params = {};
      let url = "http://localhost:5000/api/v1/uni/getByCountry";

      if (countryName) {
        params = {
          ...params,
          country: countryName,
        };
      }
      if (provinceState) {
        params = {
          ...params,
          provinceState,
        };
      }

      const result = await axios.get(url, {
        params: params,
      });

      return result.data.data;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  // const navigateToNewPage = () => {
  //   navigate("");
  // };
  return (
    <StyledApp>
      {/* <Uni /> */}
      <CountryForm
        setCountryName={setCountryName}
        countryName={countryName}
        onSubmit={onSubmit}
      />

      <div>
        <h1>List of Universities</h1>
        {!uniList && !countryName && (
          <p>
            Enter a country name above and a list of universities of that
            country
          </p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : !uniList?.length && countryName ? (
          "No universities found"
        ) : (
          uniList?.map((uni, key) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (currentUni?.name == uni?.name) {
                      setCurrentUni(null);
                    } else {
                      setCurrentUni(uni);
                    }
                  }}
                >
                  +{" "}
                </span>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => redirectToWebPage(uni.web_pages)}
                >
                  {uni?.name}
                </p>
              </div>
              {currentUni && currentUni?.name == uni?.name && (
                <div style={{ padding: "5px" }}>
                  <p>Domains: {currentUni?.domains}</p>
                  <p>Country Code: {currentUni?.alpha_two_code}</p>
                  <p>Web Sites: {currentUni?.web_pages}</p>
                  <p>State/Provice: {currentUni?.state_province}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  padding: 1rem;
`;
