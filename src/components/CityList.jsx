import React from "react";

function CityList({ provinces, cities }) {
  console.log({ provinces, cities });
  return (
    <div>
      <div>
        <ul className="h-40 overflow-y-scroll">
          {provinces?.data.map((province) => (
            <li key={province.id}>{province.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CityList;
