//result.html scripts
const database = firebase.database();
const searchName = localStorage.getItem("searchName");
const searchNear = localStorage.getItem('searchNear').toLowerCase();
var searchLat;
var searchLng;
var playtoggle;
const DISTANCETHRESHOLD = 0.5; // in terms of lat-long,


var scriptkey = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWsb3UJbBCnDwp2vM8cYsEKfBG2jtvyoY";
var geocoder;

function getcurrentLocation() {
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			return ({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});

		}, function() {
			console.log('optained user address using HTML5 Geolocation');
		});
	} else {
		// Browser doesn't support Geolocation
		console.log('HTML5 Geolocation not supported');
	}
}

// enclose everything in here in order to be able to use google maps geocoder
$.getScript(scriptkey, function() {

	//Show all users
	database.ref('users/').once('value', function(snapshot){
				
		snapshot.forEach(function(childSnapshot){
			const username = childSnapshot.key;
			const about = childSnapshot.child('about').val();
			const availability = childSnapshot.child('availability').val();
			const email = childSnapshot.child('email').val();
			const experience = childSnapshot.child('experience').val();
			const firstname = childSnapshot.child('firstname').val();
			const lastname = childSnapshot.child('lastname').val();
			const phone = childSnapshot.child('phone').val();
			const price = childSnapshot.child('price').val();
			let prof = childSnapshot.child('prof').val();
			let port = childSnapshot.child('port').val();
            const audioid = childSnapshot.child('audioid').val();
			// const address = childSnapshot.child('address').val();
			const lat = childSnapshot.child('coordinates/lat').val();
			const lng = childSnapshot.child('coordinates/lng').val();
			//var profilepic = document.createElement("img");


			if(searchName == "" && searchNear == ""){ 
				$('#query').html('Search Results: All users');
				$('#status').append(
								'<div class="card">' +
                  '<img class="card-img-bottom profilepic" alt="Profile Picture" src='+prof+'/>' +
                    '<div class="card-body">'+                      
                        '<h5 class="card-title text-centered">'+'<a id ="'+username+'ProfLink" href = result_prof.html>'+firstname+' '+lastname+'</a></h5>'+                   
                        '<p class = "card-text">'+about+'</p>'+
                        '</div>'+
                        '<div class = "card-body">'+
                        '<b>User ID:</b> '+username + '<br>' +
                  		  '<b>Email:</b> '+email+ '<br>'+
               	 	      '<b>Phone:</b> '+phone +'<br>'+
                	      //'About: '+about +'<br>'+
                	      '<b>Experience:</b> '+experience +'<br>'+
                	      '<b>Availability:</b> '+availability +'<br>'+
												'<b>Price:</b> '+price+'<br>' +
												'<b>Portfolio</b>: ' +
              	        '<audio id= "' + audioid + '\" src=' + port +'" controls></audio>'+ '<br>'+
                    '</div>'+
                    
                  '</div>'
				);
				console.log($('#'+username+'ProfLink').html());
				console.log(document.getElementById(username+'ProfLink').id);
				$('#'+username+'ProfLink').click(()=>{
					console.log(username +'clicked');
					localStorage.setItem('keyName', username);
				});
			}
			if(searchName != "" && searchNear == ""){
				if(searchName == firstname){ 
					$('#query').html(
						'Search Results: '+searchName
					);
					if($('#status').is(':empty') || $('#status').html() == '<br>No users found'){
						$('#status').empty();
					}
					$('#status').append(
						'<div class="card">' +
                  '<img class="card-img-bottom profilepic" alt="Profile Picture" src='+prof+'/>' +
                    '<div class="card-body">'+                      
                        '<h5 class="card-title text-centered">'+'<a id ="'+username+'ProfLink" href = result_prof.html>'+firstname+' '+lastname+'</a></h5>'+                   
                        '<p class = "card-text">'+about+'</p>'+
                        '</div>'+
                        '<div class = "card-body">'+
                        '<b>User ID:</b> '+username + '<br>' +
												'<b>Email:</b> '+email+ '<br>'+
												'<b>Phone:</b> '+phone +'<br>'+
												//'About: '+about +'<br>'+
												'<b>Experience:</b> '+experience +'<br>'+
												'<b>Availability:</b> '+availability +'<br>'+
												'<b>Price:</b> '+price+'<br>' +
												'<b>Portfolio:</b> ' +
												'<audio id= "' + audioid + '\" src=' + port +'" controls></audio>'+ '<br>'+

							'</div>'+
						'</div>'
					);
					console.log($('#'+username+'ProfLink').html());
					console.log(document.getElementById(username+'ProfLink').id);
					$('#'+username+'ProfLink').click(()=>{
						console.log(username +'clicked');
						localStorage.setItem('keyName', username);
					});
				}
				//console.log($('#status').html());
				if($('#status').is(':empty')){
					$('#status').html('<br>No users found')
					$('#query').html('Search Results: '+searchName);
				}
			}
			else if(searchNear != "" && searchName == ""){
				// Find distances
				var distance;
				geocoder= new google.maps.Geocoder();
				geocoder.geocode({'address': searchNear}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						searchLat = results[0].geometry.location.lat();
						searchLng = results[0].geometry.location.lng();
						distance = calculateDistance(searchLat, searchLng, lat, lng);
						console.log("searchLat: " + searchLat);
						console.log("searchLng: " + searchLng);
						console.log("lat: " + lat);
						console.log("ln: " + lng);
						console.log("Distance: " + distance);
					} else {
						window.alert('Geocoder failed due to: ' + status);
					}
					console.log("Distance Checked: " + distance);
					// Check distance
					if(distance <= DISTANCETHRESHOLD){
						console.log("within distance threshold");
						$('#query').html(
							'Search Results: '+searchNear
						);
						$('#status').append(
							'<div class="card">' +
                  '<img class="card-img-bottom profilepic" alt="Profile Picture" src='+prof+'/>' +
                    '<div class="card-body">'+                      
                        '<h5 class="card-title text-centered">'+'<a id ="'+username+'ProfLink" href = result_prof.html>'+firstname+' '+lastname+'</a></h5>'+                   
                        '<p class = "card-text">'+about+'</p>'+
                        '</div>'+
                        '<div class = "card-body">'+
                        '<b>User ID:</b> '+username + '<br>' +
												'<b>Email:</b> '+email+ '<br>'+
												'<b>Phone:</b> '+phone +'<br>'+
												//'About: '+about +'<br>'+
												'<b>Experience:</b> '+experience +'<br>'+
												'<b>Availability:</b> '+availability +'<br>'+
												'<b>Price:</b> '+price+'<br>' +
												'<b>Portfolio:</b> ' +
												'<audio id= "' + audioid + '\" src=' + port +'" controls></audio>'+ '<br>'+

								'</div>'+
							'</div>'
						);
						console.log($('#'+username+'ProfLink').html());
						console.log(document.getElementById(username+'ProfLink').id);
						$('#'+username+'ProfLink').click(()=>{
							console.log(username +'clicked');
							localStorage.setItem('keyName', username);
						});
					}
					//console.log($('#status').html());
					if($('#status').is(':empty')){
						$('#status').html('<br>No users found')
						$('#query').html('Search Results: '+searchName);
					}
				});	// end geocoder braces (here cuz needs to be distance)
			}
			else {

			}
		});
	});

	function calculateDistance(x1, y1, x2, y2) {
		return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
	}

	// function PlaySound(audioid) {
	// 	console.log(audioid);
	// 	var audioinputstring = '"' +audioid +'\"';
	// 	console.log(audioinputstring);
	// 	var a = document.getElementById(audioid);
	// 	console.log(a);
	// 	if (a.playing) {
	// 		console.log( "MADE IT INTO A.PLAYING, paused");
	// 		a.pause();    

	// 	} else {
	// 		console.log("MADE IT INTO A.ELSE, playing");
	// 		a.play();
	// 	}
		
	// };
});
      
