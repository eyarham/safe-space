
  const confirmAddress = async (inputValue) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&polygon_geojson=1&addressdetails=1&limit=1`
    const responseString = await fetch(nominatimUrl);
    const response = await responseString.json();
    if (response && response.length > 0) {
      const address = response[0];
      return address;
    }
  }

  export {confirmAddress}