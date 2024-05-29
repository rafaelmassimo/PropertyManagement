'use client';

import pin from '@/assets/images/pin.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fromAddress, setDefaults } from 'react-geocode';
import { Map, Marker } from 'react-map-gl';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [viewPort, setViewPort] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 12,
		width: '100%',
		height: '500px',
	});

	const [loading, setLoading] = useState(true);
	const [geoCodeError, setGeoCodeError] = useState(false);

	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
		language: 'en', // Default language for responses.
		region: 'ca', // Default region for responses.
	});

	useEffect(() => {
		const fetchCoordinates = async () => {
			try {
				const res = await fromAddress(
					`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
				);

				// Check if the response is valid
				if (res.results.length === 0) {
					// No results found
					setGeoCodeError(true);
					setLoading(false);
					return;
				}

				const { lat, lng } = res.results[0].geometry.location;
				setLat(lat);
				setLong(lng);
				setViewPort({
					...viewPort,
					latitude: lat,
					longitude: lng,
				});
				setLoading(false);
			} catch (error) {
				console.log(error);
				setGeoCodeError(true);
				setLoading(false);
			}
		};

		fetchCoordinates();
	}, []);


if (loading) return <Spinner loading={loading} />;

// Handle case geocoding error
if (geoCodeError) {
	return <div className="text-xl">No Location Data found</div>;
}

return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude: long,
                    latitude: lat,
                    zoom: 15,
                }}
                style={{ width: '100%', height: '500px' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={long} latitude={lat} anchor="bottom">
                    <Image src={pin} alt="pin" width={40} height={40} />
                </Marker>
            </Map>
        )
    );
};

export default PropertyMap;
