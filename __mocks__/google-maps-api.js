// __mocks__/google-maps-api.js
global.google = {
    maps: {
      places: {
        Autocomplete: function () {
          return {
            addListener: jest.fn(),
            getPlace: jest.fn().mockReturnValue({
              geometry: {
                location: {
                  lat: () => 6.5244,
                  lng: () => 3.3792,
                },
              },
            }),
          };
        },
      },
      LatLng: function (lat, lng) {
        return { lat, lng };
      },
      Marker: function () {},
      InfoWindow: function () {},
    },
  };
  