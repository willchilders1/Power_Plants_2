(function(){
      // map options
    var map = L.map('map', {
      center: [36, -94],
      zoom: 4,
    });
    // console.log(plants);
    // L.geoJson(plants).addTo(map);
    var commonStyles = {
      weight: 1,
      stroke: 1,
      fillOpacity: .8
    }

    var hydroLayer = L.geoJson(plants, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, commonStyles);
      },
      filter: function (feature) {
        if (feature.properties.fuel_source.Hydro) {
          return feature;

        }
      },
      style: function (feature) {
        return {
          color: '#1f78b4',
          fillColor: '#1f78b4',
          radius: getRadius(feature.properties.fuel_source.Hydro)
        }
      },
      onEachFeature: function (feature, layer) {

        var popup = `<h3>${feature.properties.plant_name}</h3>
             <h4>Total Output: </h4><p>${feature.properties.capacity_mw} MW</p>`
          for (var fuel in feature.properties.fuel_source) {
            var fuelObject = feature.properties.fuel_source
            console.log(feature.properties.fuel_source, fuel, fuelObject[fuel])
            popup += `<br>Source: ${fuel}, ${fuelObject[fuel]} MW`
          };
          layer.bindTooltip(popup);
          layer.bindPopup(popup);

        layer.on('mouseover', function () {
          layer.setStyle({
            color: '#00ced1',
            fillColor: '#00ced1'
          });
        });
        layer.on('mouseout', function () {
          // layer.closePopup(popup);
          layer.setStyle({
            color: '#1f78b4',
            fillColor: '#1f78b4'
          });
        });
      }
    }).addTo(map);

    var ngLayer = L.geoJson(plants, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, commonStyles);
      },
      filter: function (feature) {
        if (feature.properties.fuel_source['Natural Gas']) {
          return feature;
        }
      },
      style: function (feature) {
        return {
          color: '#918151',
          fillColor: '#918151',
          radius: getRadius(feature.properties.fuel_source['Natural Gas'])
        }
      },
      onEachFeature: function (feature, layer) {

        layer.on('mouseover', function () {
          var popup = `<h3>${feature.properties.plant_name}</h3>
             <h4>Total Output: </h4><p>${feature.properties.capacity_mw} MW</p>
             <h4>Natural Gas: </h4><p> ${feature.properties.fuel_source['Natural Gas']} MW </p>`;
          layer.bindTooltip(popup);
          layer.bindPopup(popup);
          // layer.bindTooltip(layer.feature.properties.plant_name);
          layer.setStyle({
            color: '#79443b',
            fillColor: '#79443b'
          });
        });
        layer.on('mouseout', function () {
          layer.setStyle({
            color: '#918151',
            fillColor: '#918151'
          });
        });
      }
    }).addTo(map);

    var solarLayer = L.geoJson(plants, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, commonStyles);
      },
      filter: function (feature) {
        if (feature.properties.fuel_source.Solar) {
          return feature;
        }
      },
      style: function (feature) {
        return {
          color: '#ffff99',
          // fillColor: '#e97451',
          radius: getRadius(feature.properties.fuel_source.Solar)
        }
      },
      onEachFeature: function (feature, layer) {


        layer.on('mouseover', function () {
          var popup = `<h3>${feature.properties.plant_name}</h3>
             <h4>Total Output: </h4><p>${feature.properties.capacity_mw} MW</p>
             <h4>Solar: </h4><p> ${feature.properties.fuel_source.Solar} MW </p>`;
          layer.bindPopup(popup);
          layer.bindTooltip(popup);
          layer.setStyle({
            color: '#e97451',
            fillColor: '#e97451'
          });
        });
        layer.on('mouseout', function () {
          layer.setStyle({
            color: '#ffff99',
            fillColor: '#ffff99'
          });
        });
      }
    }).addTo(map);

    // Leaflet providers base map URL
    var tiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    function getRadius(area) {
      var radius = Math.sqrt(area / Math.PI);
      return radius * .6;
    }
    tiles.addTo(map);
})();