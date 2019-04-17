    //var myObject = new Object();
	ymaps.ready(init);
    function init(){    
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
			controls: ['fullscreenControl'],
            zoom: 10,
        });
		
		var zoomControl = new ymaps.control.ZoomControl(
		{ options: {
			layout: 'round#zoomLayout' 
			} 
		}); 
		myMap.controls.add(zoomControl);
		var geolocationControl = new ymaps.control.GeolocationControl({
			options: {
				layout: 'round#buttonLayout'
			}
		});
		myMap.controls.add(geolocationControl);	

		var objectManager = new ymaps.ObjectManager();
		var objectManager2 = new ymaps.ObjectManager();
		var objectManager3 = new ymaps.ObjectManager();
		var objectManager4 = new ymaps.ObjectManager();
		var objectManager5 = new ymaps.ObjectManager();
		
		$.getJSON('https://apidata.mos.ru/v1/datasets/861/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key;
			 });
			 objectManager.add(json);
			 //console.log(json);
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/2756/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key;
			 });
			 objectManager2.add(json);
			 //console.log(json);
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/60788/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key;
			 });
			 objectManager3.add(json);
			 //console.log(json);
		});
		$.getJSON('https://apidata.mos.ru/v1/datasets/60789/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key;
			 });
			 objectManager4.add(json);
			 //console.log(json);
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/60790/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key;
			 });
			 objectManager5.add(json);
			 //console.log(json);
		});
	
		
		
	/*$.getJSON('https://apidata.mos.ru/v1/datasets/861/rows?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
		myObject.type = "FeatureCollection";
		myObject.features = [];
		$.each(json, function(key, val){
			myObject["features"][key]={
      "type": "Feature",
      "id": key,
      "geometry": {
        "type": "Point",
	  "coordinates": [val["Cells"]["geoData"]["coordinates"][1], val["Cells"]["geoData"]["coordinates"][0]]
      },
      "properties": {
        "balloonContent": "Аптека",
         "data": {
          "organization": "pharmacy",
          "open": "8am - 10pm"
        }
      }
    };
			
		 });
		console.log(myObject);
		 
		 objectManager.add(myObject);
	});
	*/
	
		myMap.geoObjects.add(objectManager); 
		myMap.geoObjects.add(objectManager2);
		myMap.geoObjects.add(objectManager3);
		myMap.geoObjects.add(objectManager4);
		myMap.geoObjects.add(objectManager5);
		setTimeout(function(){
		myMap.geoObjects.remove(objectManager); 
		myMap.geoObjects.remove(objectManager2);
		myMap.geoObjects.remove(objectManager3);
		myMap.geoObjects.remove(objectManager4);
		myMap.geoObjects.remove(objectManager5);
		}, 1200000);
		
		

		
    }