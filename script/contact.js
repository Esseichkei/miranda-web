// Initialize and add the map
let map, infoWindow;

function initMap() {
    // The location of Spain
    const spain = { lat: 40.416626636251564, lng: -3.703795052385254 }; // 40.416626636251564, -3.703795052385254
    const hotels = [
        {lat: 40.44891664939684, lng: -3.6954345862572517},
        {lat: 40.44639016873945, lng: -3.6488648552540366},
        {lat: 40.42700076683588, lng: -3.6878261925003404},
        {lat: 40.63230987659772, lng: -3.16527800427381},
        {lat: 40.063979700524634, lng: -2.133436888325901},
        {lat: 40.07589578620976, lng: -2.139456428821126},
        {lat: 39.46770734077239, lng: -0.36592036236318565},
        {lat: 38.92070511887894, lng: -0.1167992736632775},
        {lat: 38.91794394820414, lng: 1.468836405717335},
        {lat: 39.571855253344346, lng: 2.628119064812861},
        {lat: 41.391419916550355, lng: 2.1633065825785156},
        {lat: 41.4596054571811, lng: 2.2483446659641495},
        {lat: 41.64243604596679, lng: -0.8752060167072768},
        {lat: 43.25230567967444, lng: -2.923933546151072},
        {lat: 42.05470902873366, lng: -6.625333099193817},
        {lat: 42.225165067517075, lng: -8.722499245176158},
        {lat: 42.87398106359358, lng: -8.545147766529606},
        {lat: 37.38003158032987, lng: -5.973486435367381},
        {lat: 36.719037961833315, lng: -4.421827166853013},
        {lat: 37.16413956694116, lng: -3.5954549202503583},
        {lat: 43.537815598641814, lng: -5.65240095073395},
        {lat: 28.142736069506633, lng: -16.441781872862002}
    ]

    const markers = hotels.map((position, i) => {
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
          position,
          label,
        });
    
        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
        });
    
        return marker;
      });

    // The map, centered at Spain
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: spain,
    });
    infoWindow = new google.maps.InfoWindow();
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  }
  
  window.initMap = initMap;

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }