'use client';

import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { requestPermission } from '../../components/notification';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import SearchButton from '../../../public/_assets/icons/search_button.svg';
import SearchIcon from '../../../public/_assets/icons/search_icon.svg';
import Vendors from '../../../public/_assets/icons/vendors.svg';
import Close from '../../../public/_assets/icons/close-x.svg';

// Validation schema
const configureSchema = Yup.object().shape({
  city: Yup.string().required("Location Required!"),
});

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const fetchLocations = async () => {
  try {
    const response = await fetch('https://qtg9k1vhp3.execute-api.us-west-2.amazonaws.com/Stage/');
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    console.log('Fetched data:', data); 
    return data.data;
  } catch (error) {
    console.error('Error fetching locations', error);
    return [];
  }
};

const getLatLonForCity = async (city) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const geocodeResponse = await fetch(geocodeUrl);
  if (!geocodeResponse.ok) {
    throw new Error('Failed to fetch geocoding data');
  }
  const geocodeData = await geocodeResponse.json();
  if (!geocodeData.results.length) {
    throw new Error('No results found for the specified city');
  }
  const { lat, lng } = geocodeData.results[0].geometry.location;
  return { lat, lng };
};

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [close, setClose] = useState(true);
  const [newPlaces, setNewPlaces] = useState([]); // State to store new markers
  const cityRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [position, setPosition] = useState({ lat: 6.552706, lng: 3.390368 });
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchLocations();
        console.log('Loaded locations:', data);
        const validPlaces = data.filter(place => 
          typeof place.lat === 'number' && typeof place.long === 'number'
        );
        setPlaces(validPlaces);
        if (validPlaces.length > 0) {
          setPosition({ lat: validPlaces[0].lat, lng: validPlaces[0].long });
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    loadLocations();
  }, []);

  useEffect(() => {
    if (!cityRef.current || !isLoaded) return;

    const autocomplete = new google.maps.places.Autocomplete(cityRef.current, {
      types: ['(cities)'], // Restricting search to cities
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        console.log('Selected place:', place);
        console.log('Latitude:', lat(), 'Longitude:', lng());
        setPosition({ lat: lat(), lng: lng() });
      }
    });
  }, [isLoaded]);

  const handleFormSubmit = async (formData) => {
    try {
      const { lat, lng } = await getLatLonForCity(formData.city);
      const newPlace = {
        id: new Date().getTime(), // Using timestamp as unique ID
        name: formData.city,
        latitude: lat,
        longitude: lng,
      };
      setNewPlaces([...newPlaces, newPlace]);
      setPosition({ lat, lng });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };
  
  const handleSubscribe = async () => {
    await requestPermission();
  }

  const CustomMarker = {
    url: "/_assets/images/Marker.png",
    scaledSize: {width: 50, height: 50},
  };

  const handleClick = () => {
    setClose(false);
  };

  const Vendor = () => {
    let a = newPlaces?.length;
    let b = places?.length;
    let c = a + b;
    return (
      <>
            <div className="flex items-center absolute top-16 left-1/3 bg-[#fff] p-4 rounded-2xl shadow-xl">
              <div><Vendors /></div>
              <div className="mx-5">
                <p className="text-[#302F2C] text-lg">
                  We found {c} Vendor(s) for you😀
                </p> 
                <p className="mt-3 text-[#302F2C]">
                  Tap on any of them to connect with them
                </p> 
              </div>
              <div className="cursor-pointer" onClick={handleClick}><Close /></div>
            </div>
          </>
    );
  }
  

  return (
    <div>
       <div className="mx-auto my-10">
        <div className="flex flex-col sm:flex-row md:items-center justify-between">
          <button onClick={handleSubscribe} className="bg-base-color-1 hover:bg-base-color-2 text-[#ECECEC] py-5 px-20 mx-10 md:me-10 rounded text-sm transition ease-in-out delay-150 duration-300">
            NOTIFY ME
          </button>
          <Formik
            initialValues={{ city: "Lagos City" }}
            validationSchema={configureSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors }) => (
              <Form className="md:w-[300px] relative mx-10 mt-4 sm:mt-0 md:me-10 border-2 border-[#C8C8C8] rounded-md">
                <div className="relative">
                  <Field
                    innerRef={cityRef}
                    className="w-full py-5 ps-16 pe-20 outline-none placeholder-[#302F2C] focus:placeholder-[#302F2C80] rounded bg-base-input-background-color"
                    placeholder="Type in your location"
                    id="city"
                    name="city"
                    type="text"
                  />
                  <button type="submit" className="absolute -right-2 top-1/2 -translate-y-1/2 p-4">
                    <SearchButton />
                  </button>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 p-4">
                    <SearchIcon />
                  </div>
                </div>
                {errors.city && <div className="text-[#34A853] text-center">{errors.city}</div>}
              </Form>
            )}
          </Formik>
        </div>
        <div className="maps mt-10 m-10 relative">
          {isLoaded ? (
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: position.lat, lng: position.lng }}
            zoom={16}
          >
            {places.map((place) => (
              <MarkerF
                key={place?.id}
                onClick={() => setSelectedPlace(place === selectedPlace ? null : place)}
                position={{ lat: place.lat, lng: place.long }}
                icon={CustomMarker}
                />
            ))}
            {newPlaces.map((place) => (
              <MarkerF
                key={place.id}
                onClick={() => setSelectedPlace(place === selectedPlace ? null : place)}
                position={{ lat: place.latitude, lng: place.longitude }}
                icon={CustomMarker}
              />
            ))}
           
            {selectedPlace && (
              <InfoWindowF
                position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                anchor={selectedPlace && <MarkerF position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }} />}
                zIndex={1}
                options={{ pixelOffset: { width: 0, height: -40 } }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h3>City:<b>{selectedPlace.name}</b></h3>
                  <p>Latitude:<b>{selectedPlace.latitude}</b></p>
                  <p>Longitude:<b>{selectedPlace.longitude}</b></p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
          ): (
          <p>it is loading...</p>
          )}
          {
            close &&
            <Vendor />  
          }
        </div>
      </div>
    </div>
  );
}
