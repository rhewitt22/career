$(function() {
  var $window = $(window),
      $intro = $('.intro'),
      $sections = $('section'),
      current = 1,
      locations;

  mapboxgl.accessToken = 'pk.eyJ1Ijoicmhld2l0dCIsImEiOiJHSDdveGJrIn0.ZnDLwMOPx2aaEgF5amrquA';

  $.getJSON('js/map/career.geojson', function(geojson) {
    locations = geojson.features;
  });

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'js/map/outdoors-v7.json',
    center: [37.8, -96],
    zoom: 3
  });

  function flyTo(index) {
    var coords,
        zoom;
    var location = $.grep(locations, function(object, i) {
      return current == object.properties.index;
    });
    if (index > 1) {
      coords = location[0].geometry.coordinates.slice(0),
      zoom = location[0].properties.zoom;
      coords.reverse();
    } else {
      coords = [37.8, -96];
      zoom = 3;
    }

    map.flyTo(coords, zoom, 0, {speed: 0.8});
  }

  // Scroll event handler to toggle the active story
  $window.scroll(function() {
    $sections.each(function() {
      var offset = $(this).offset();
      if ( $window.scrollTop() > offset.top ){
        $sections.removeClass('active');
        $(this).next('section').addClass('active');

      } else if ( $window.scrollTop() === 0 ) {
        $sections.removeClass('active');
        $intro.addClass('active');
      }
    });
    var index = $('.active').attr('data-index');
    if (index != current) {
      current = index;
      flyTo(index);
    }
  });

});
