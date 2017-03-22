////BUG TO FIX: SOMETIMES MARKER DOES NOT GO AWAY AFTER REMOVE




 var markerArr = [];

function initializeMap (){

  var mapCenter;

  if (markerArr.length === 0) {
    mapCenter = new google.maps.LatLng(41.8884073, -87.6293817); 
  } else {
    mapCenter = {lat: markerArr[markerArr.length - 1][1][0], lng:markerArr[markerArr.length - 1][1][1]};
  }



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
    center: mapCenter,
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

  markerArr.forEach(marker => {
    drawMarker(marker[0], marker[1]);
  })

}

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



$('#day-add').on('click', function(){
  var numOfDay = +$(this).prev().text() + 1;
  $(this).before('<span><button class="btn btn-circle day-btn current-day">'+numOfDay+'</button></span>');
})



$('#itinerary').on('click', 'button', function(){
  var indexToRemove = +$(this).data('markerindex');
  $(this).closest('p').remove();
  markerArr.splice(indexToRemove, 1);
  console.log("MARKER ARR: ", markerArr);
  initializeMap();
})



$('#hotel-add-btn').on('click', function() {
  let selectedHotel = $('#hotel-choices').val();
  let hotelIndex = hotelIndexFinder(selectedHotel);
  var lat = hotels[hotelIndex].place.location[0];
  var lng = hotels[hotelIndex].place.location[1];
  var markerIndex = markerArr.length;
  var newButton = '<button class="btn btn-xs btn-danger remove btn-circle" data-markerindex=' + markerIndex + '>x</button>';
  markerArr.push(['hotel', [lat, lng]]);
  $('#chosen-hotels').append('<p>' + selectedHotel + '<span>' + newButton + '</span></p>');
  initializeMap();
});


$('#restaurant-add-btn').on('click', function() {
  let selectedRestaurant = $('#restaurant-choices').val();
  let restaurantIndex = restaurantIndexFinder(selectedRestaurant);
  var lat = restaurants[restaurantIndex].place.location[0];
  var lng = restaurants[restaurantIndex].place.location[1];
  var markerIndex = markerArr.length;
  var newButton = '<button class="btn btn-xs btn-danger remove btn-circle" data-markerIndex=' + markerIndex + '>x</button>';

  markerArr.push(['restaurant', [lat, lng]]);
  $('#chosen-restaurants').append('<p>' + selectedRestaurant + '<span>' + newButton + '</span></p>');
  initializeMap();
});

$('#activity-add-btn').on('click', function() {
  let selectedActivity = $('#activity-choices').val();
  let activityIndex = activityIndexFinder(selectedActivity);
  var lat = activities[activityIndex].place.location[0];
  var lng = activities[activityIndex].place.location[1];
  var markerIndex = markerArr.length;
  var newButton = '<button class="btn btn-xs btn-danger remove btn-circle" data-markerIndex=' + markerIndex + '>x</button>';


  markerArr.push(['activity', [lat, lng]]);
  $('#chosen-activities').append('<p>' + selectedActivity + '<span>' + newButton + '</span></p>');
  initializeMap();
});
