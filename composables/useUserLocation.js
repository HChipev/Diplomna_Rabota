export default async function useUserLocation() {
  let userLocation;
  await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      await $fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          useRuntimeConfig().public.googleMaps
        }`
      )
        .then((res) => {
          res.results[0].address_components.forEach((component) => {
            if (component.types.includes("administrative_area_level_1")) {
              userLocation = component.long_name;
              resolve();
            }
          });
        })
        .catch(() => {
          userLocation = null;
          resolve();
        });
    }
    function error() {
      console.log("Unable to retrieve your location");
      userLocation = null;
      resolve();
    }
  });
  console.log(userLocation);
  return userLocation;
}
