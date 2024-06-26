import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const getStates = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const getCities = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <p classname="result">
          You selected <span classname="highlight">{selectedCity},</span>
          <span classname="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </p>
      )}
    </div>
  );
}
