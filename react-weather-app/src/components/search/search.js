import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        if (!inputValue) {
            return { options: [] };
        }

        try {
            const response = await fetch(
                `${WEATHER_API_URL}/geo/1.0/direct?q=${inputValue}&limit=5&appid=${WEATHER_API_KEY}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Log the entire response to debug
            console.log('API response:', data);

            if (!Array.isArray(data)) {
                throw new Error('Invalid response format');
            }

            return {
                options: data.map((city) => ({
                    value: `${city.lat} ${city.lon}`,
                    label: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`,
                })),
            };
        } catch (err) {
            console.error('Error fetching data:', err);
            return { options: [] }; // Return an empty options array in case of error
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
