$(document).ready(function() {
  // Get a reference to the database service
  var database = firebase.database();

  var utensilRef = database.ref('utensils');
  utensilRef.on('value', function(snapshot) {
      var utensilList = document.getElementById('utensils-list');
      $(utensilList).empty();
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
        var utensilData = childSnapshot.val();
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(utensilData));
        utensilList.appendChild(newItem);
      });
  });


  var foodRef = database.ref('food');
  foodRef.on('value', function(snapshot) {
      var foodList = document.getElementById('food-list');
      $(foodList).empty();
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
        var foodData = childSnapshot.val();
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(foodData));
        foodList.appendChild(newItem);
      });
  });

  var miscRef = database.ref('misc');
  miscRef.on('value', function(snapshot) {
      var miscList = document.getElementById('misc-list');
      $(miscList).empty();
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
        var miscData = childSnapshot.val();
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(miscData));
        miscList.appendChild(newItem);
      });
  });

  var elements = document.querySelectorAll("#add-item-list-one, #add-item-list-two, #add-item-list-three");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      var inputId = this.id;
      if (inputId=="add-item-list-one") {
        var itemId = document.getElementById('item-list-one');
        var itemValue = itemId.value;
        var newUtensilKey = firebase.database().ref("utensils").push().key;
        var updates = {};
        updates[newUtensilKey] = itemValue;
        itemId.value = "";
        firebase.database().ref("utensils").update(updates);
      } else if (inputId=="add-item-list-two") {
        var itemId = document.getElementById('item-list-two');
        var itemValue = itemId.value;
        var newFoodKey = firebase.database().ref("food").push().key;
        var updates = {};
        updates[newFoodKey] = itemValue;
        itemId.value = "";
        return firebase.database().ref("food").update(updates);
      } else if (inputId=="add-item-list-three") {
        var itemId = document.getElementById('item-list-three');
        var itemValue = itemId.value;
        var newMiscKey = firebase.database().ref("misc").push().key;
        var updates = {};
        updates[newMiscKey] = itemValue;
        itemId.value = "";
        return firebase.database().ref("misc").update(updates);
      }
    });
  }
})
