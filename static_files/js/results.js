//result.html scripts
$(document).ready(() =>{
    const database = firebase.database();
    const searchName = localStorage.getItem("searchName");
    const searchNear = localStorage.getItem('searchNear');
    
    
    
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
              //var profilepic = document.createElement("img");
              
              if(searchName == "" && searchNear == ""){ 
              $('#query').html('All users');
              $('#status').append(
                  '<br> Name: <a id ="'+username+'ProfLink" href="result_prof.html">'+firstname+ ' '+lastname+ '</a><br>'+
                  'User ID: '+username + '<br>' +
                  'Email: '+email+ '<br>'+
                  'Phone: '+phone +'<br>'+
                  'About: '+about +'<br>'+
                  'Experience: '+experience +'<br>'+
                  'Availability: '+availability +'<br>'+
                  'Price: '+price+'<br>' +
                  'Profile Pic:' +
                  '<img class="profilepic" src='+prof+"/>  <br>"
                );
                console.log($('#'+username+'ProfLink').html());
                console.log(document.getElementById(username+'ProfLink').id);
                $('#'+username+'ProfLink').click(()=>{
                  console.log(username +'clicked');
                  localStorage.setItem('keyName', username);
                });
              
            }
            if(searchName != ""){
              if(searchName == firstname){ 
                $('#query').html(
                  ' '+searchName
                );
                if($('#status').is(':empty') || $('#status').html() == '<br>No users found'){
                $('#status').html(
                  '<br> Name: <a id ="'+username+'ProfLink" href="result_prof.html">'+firstname+ ' '+lastname+ '</a><br>'+
                  'User ID: '+username + '<br>' +
                  'Email: '+email+ '<br>'+
                  'Phone: '+phone +'<br>'+
                  'About: '+about +'<br>'+
                  'Experience: '+experience +'<br>'+
                  'Availability: '+availability +'<br>'+
                  'Price: '+price+'<br>'+
                  'Profile Pic:' +
                  '<img class="profilepic" src='+prof+"/>  <br>"
                );
                console.log($('#'+username+'ProfLink').html());
                console.log(document.getElementById(username+'ProfLink').id);
                $('#'+username+'ProfLink').click(()=>{
                  console.log(username +'clicked');
                  localStorage.setItem('keyName', username);
                });
                }
                else{
                  $('#status').append(
                    '<br> Name: <a id ="'+username+'ProfLink" href="result_prof.html">'+firstname+ ' '+lastname+ '</a><br>'+
                    'User ID: '+username + '<br>' +
                    'Email: '+email+ '<br>'+
                    'Phone: '+phone +'<br>'+
                    'About: '+about +'<br>'+
                    'Experience: '+experience +'<br>'+
                    'Availability: '+availability +'<br>'+
                    'Price: '+price+'<br>'+
                    'Profile Pic:' +
                    '<img class="profilepic" src='+prof+"/>  <br>"
                  );
                  console.log($('#'+username+'ProfLink').html());
                console.log(document.getElementById(username+'ProfLink').id);
                $('#'+username+'ProfLink').click(()=>{
                  console.log(username +'clicked');
                  localStorage.setItem('keyName', username);
                });
                }
              }
              //console.log($('#status').html());
              if($('#status').is(':empty')){
                $('#status').html('<br>No users found')
                $('#query').html(searchName);
              }
             }
            });
        
        
        
        });
      //});
      

});