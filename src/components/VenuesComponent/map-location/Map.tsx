"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Venue = {
    latitude: number;
    longitude: number;
    name: string;
};

const Map = ({ venue }: { venue: Venue }) => {
    if (!venue.latitude || !venue.longitude) return <p>Координати відсутні</p>;

    return (
        <MapContainer center={[venue.latitude, venue.longitude]} zoom={15} className="leaflet-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[venue.latitude, venue.longitude]}>
                <Popup>
                    <h3>{venue.name}</h3>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;