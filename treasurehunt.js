// Aarteen sijainti (Veturitallinkatu 5 as. 626, 40100 Jyväskylä)
var treasureLat = 62.2433; //62.2432626  &&  62.2435172 tarpeeksi lähekkäin
var treasureLon = 25.7579;  // 25.7580648  &&  25.7577094 tarpeeksi lähekkäin

var watchID = null;
var treasureDistance = 999;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//
function onDeviceReady() {
    $( document ).delegate("#campaign01treasurehunt01", "pageinit", function() {
        findLocation();
    });
}


// Funktio, joka tarkkaillee käyttäjän sijaintia ja päivittää käyttäjän sijainnin longituden ja latituden tarvittaessa
function findLocation() {
     document.getElementById('geolocation').innerHTML = 'Etsitään sijaintia...';

    // Throw an error if no update is received every 2 seconds
    var options = {maximumAge: 0, timeout: 2000, enableHighAccuracy:true};
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}



// onSuccess Geolocation
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    var coldWarm = document.getElementById('checkedLocation');
    var displat = document.getElementById('latval');
    var displon = document.getElementById('lonval');
    var currentTreasureDistance = 999;

    displat.innerHTML = position.coords.latitude;
    displon.innerHTML = position.coords.longitude;


    // The user's current Lat and Long
    var userLat = position.coords.latitude;
    var userLon = position.coords.longitude;

    // The current distance to the treasure from user's current location [(treasure long + lat) - (current long + lat)]
    if ( ( (treasureLat + treasureLon) - (userLat + userLon) ) < 0 ) {
        currentTreasureDistance = ( (treasureLat + treasureLon) - (userLat + userLon) ) * (-1);
    }
    else {
        currentTreasureDistance = (treasureLat + treasureLon) - (userLat + userLon);
    }

    console.log(treasureDistance + " current: "  + currentTreasureDistance);

    if ( ( (treasureLat - userLat <= 0.0009 ) && (treasureLat - userLat >= -0.0009) ) &&
        ( (treasureLon - userLon <= 0.0009 ) && (treasureLon - userLon >= -0.0009) ) ) {
            element.innerHTML = 'Olet lähellä aarretta!';
            //showAlert();
            //navigator.geolocation.clearWatch(watchID);
    }
    else if ( ( (treasureLat - userLat <= 0.002 ) && (treasureLat - userLat >= -0.002) ) &&
        ( (treasureLon - userLon <= 0.002 ) && (treasureLon - userLon >= -0.002) ) ) {
            element.innerHTML = 'Olet melko lähellä aarretta';
    }
    else if ( ( (treasureLat - userLat <= 0.005 ) && (treasureLat - userLat >= -0.005) ) &&
        ( (treasureLon - userLon <= 0.005 ) && (treasureLon - userLon >= -0.005) ) ) {
            element.innerHTML = 'Olet vielä melko kaukana aarteesta';
    }
    else {
        element.innerHTML = 'Et ole lähellä aarretta, etsiskelehän vielä';
    }


    if ( (treasureDistance >= currentTreasureDistance) && ( (currentTreasureDistance <= 0.0009) ) ) {
        coldWarm.innerHTML = 'Polttaa';
    }        
    else if (treasureDistance >= currentTreasureDistance) {
        coldWarm.innerHTML = 'Lämpenee';
    }
    else if (treasureDistance < currentTreasureDistance) {
        coldWarm.innerHTML = 'Kylmenee';
    }

    treasureDistance = currentTreasureDistance;

}



// onError Callback receives a PositionError object
function onError(error) {
    alert('Tapahtui virhe.' + '\n' + 'Koodi: '    + error.code    + '\n' +
          'Viesti: ' + error.message + '\n');
}

// Jos käyttäjä on aarteen lähellä, näytetään notifikaatio
function showAlert() {
    navigator.notification.alert(
        'Olet aivan aarteen lähellä!',  // message
        'Polttaa polttaa!',            // title
        'OK'                  // buttonName
    );
}