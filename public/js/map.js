$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(41.8884073, -87.6293817);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

    drawMarker('hotel', [41.8884073, -87.6293817]);
    drawMarker('restaurant', [41.9134555, -87.6503527]);
    drawMarker('activity', [41.8675766, -87.6162267])

});

// our code starts here!!!

hotels.forEach(hotel => {
  $('#hotel-choices').append('<option>' + hotel.name + '</option');
});

restaurants.forEach(restaurant => {
  $('#restaurant-choices').append('<option>' + restaurant.name + '</option');
});

activities.forEach(activity => {
  $('#activity-choices').append('<option>' + activity.name + '</option');
});

function hotelIndexFinder (hotelNameStr) {
  for (var i = 0; i < hotels.length; i++) {
    if (hotels[i].name === hotelNameStr) {
      return i;
    }
  }
}

function restaurantIndexFinder (restaurantNameStr) {
  for (var i = 0; i < restaurants.length; i++) {
    if (restaurants[i].name === restaurantNameStr) {
      return i;
    }
  }
}

function activityIndexFinder (activityNameStr) {
  for (var i = 0; i < activities.length; i++) {
    if (activities[i].name === activityNameStr) {
      return i;
    }
  }
}

var markerArr = [];
function initMap(lat, lng) {
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 13,
      center: {lat: lat, lng: lng}
    });

    setMarkers(map);
}

function setMarkers(map) {
  for (var i = 0; i < markerArr.length; i++) {
      var beach = markerArr[i];
      var marker = new google.maps.Marker({
        position: {lat: markerArr[0], lng: markerArr[1]},
        map: map,
      });
  }
}

$('#hotel-add-btn').on('click', function() {
  let selectedHotel = $('#hotel-choices').val();
  let hotelIndex = hotelIndexFinder(selectedHotel);
  var lat = hotels[hotelIndex].place.location[0];
  var lng = hotels[hotelIndex].place.location[1];
  markerArr.push(lat, lng);
  $('#chosen-hotels').append('<p>' + selectedHotel + '</p>');

  initMap(lat, lng);
});


$('#restaurant-add-btn').on('click', function() {
  let selectedRestaurant = $('#restaurant-choices').val();
  let restaurantIndex = restaurantIndexFinder(selectedRestaurant);
  var lat = restaurants[restaurantIndex].place.location[0];
  var lng = restaurants[restaurantIndex].place.location[1];
  markerArr.push(lat, lng);
  $('#chosen-restaurants').append('<p>' + selectedRestaurant + '</p>');
  initMap(lat, lng);
});

$('#activity-add-btn').on('click', function() {
  let selectedActivity = $('#activity-choices').val();
  let activityIndex = activityIndexFinder(selectedActivity);
  var lat = activities[activityIndex].place.location[0];
  var lng = activities[activityIndex].place.location[1];
  markerArr.push(lat, lng);
  $('#chosen-activities').append('<p>' + selectedActivity + '</p>');
  initMap(lat, lng);
});
