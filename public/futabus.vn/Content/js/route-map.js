jQuery.fn.getMapDirection = function (param) {
    var stepDisplay;
    var icon = new window.google.maps.MarkerImage("//futabus.vn/Content/img/maker.png");
    var markers = [];
    var map;

    function attachInstructionText(marker, text) {
        window.google.maps.event.addListener(marker, 'mouseover', function () {
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
        window.google.maps.event.addListener(marker, 'mouseout', function () {
            stepDisplay.close();
        });
    }
    
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: { strokeColor: '#ef4529' } });
    // Instantiate an info window to hold step text.
    stepDisplay = new window.google.maps.InfoWindow();

    var hochiminh = new window.google.maps.LatLng(10.881859, 106.630096);
    var myOptions = {
        zoom: 14,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        center: hochiminh
    }
    map = new window.google.maps.Map(jQuery(this)[0], myOptions);
    directionsDisplay.setMap(map);

    var start = param[0];
    var end = param[param.length - 1];

    var waypoints = [];

    for (var i = 1; i < param.length - 1; i++) {
        waypoints.push({ location: param[i], stopover: true });
    }

    var request = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);

            var routeLegs = response.routes[0].legs;
            var len = routeLegs.length;
            var firstLegs = routeLegs[0];

            var marker1 = new window.google.maps.Marker({
                position: firstLegs.start_location,
                map: map,
                icon: icon
            });

            attachInstructionText(marker1, '<div class="infowindow">' + firstLegs.start_address.substring(0, firstLegs.start_address.length - 10) + '</div>');
            markers.push(marker1);

            for (var i = 0; i < len; i++) {

                var marker2 = new window.google.maps.Marker({
                    position: routeLegs[i].end_location,
                    map: map,
                    icon: icon
                });
                attachInstructionText(marker2, '<div class="infowindow">' + routeLegs[i].end_address.substring(0, routeLegs[i].end_address.length - 10) + '</div>');

                markers.push(marker2);
            }

        }
    });
};