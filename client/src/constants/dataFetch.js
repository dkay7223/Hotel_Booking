/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'http://localhost:5000/api' });


// file call from >>>
// ../page/Hotel 
//../page/Login 
// ../page/HotelList 
// ../components/Reserve 
// ../components/Featured 
// ../components/PropertyList 
// ../components/FeaturedProperties 
const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(endPoint);
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [endPoint]);


    const reFetchData = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(endPoint);
            setData(data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { data, loading, error, reFetchData };
}



// REST api Section...
export const singleHotel = (id) => useFetch(`/hotels/${id}`);
export const featuredProperties = () => useFetch('/hotels?featured=true&limit=4&min=100&max=400');
export const featuredCity = () => useFetch('/hotels/countByCity?cities=Tokio,France,London');
export const propertyList = () => useFetch('/hotels/countByType');
export const showBooking = (hotelID) => useFetch(`/hotels/rooms/${hotelID}`);
export const hotelList = (destination, minPrice, maxPrice) =>
    useFetch(`/hotels?city=${destination}&min=${minPrice || 0}&max=${maxPrice || 999}`);

export const sign_up = (credentials) => api.post('/auth/sign-up', credentials);
export const sign_in = (credentials) => api.post('/auth/sign-in', credentials);

export const roomBooking = (roomId, selectedDate) => api.put(`/rooms/availability/${roomId}`, { dates: selectedDate });