$(document).ready(function() {
  // Get a reference to the database service
  var database = firebase.database();
  var elements = document.querySelectorAll("#add-item-list-one, #add-item-list-two, #add-item-list-three");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      var inputId = this.id;
      if (inputId=="add-item-list-one") {
        var itemId = document.getElementById('item-list-one');
        var itemValue = itemId.value;
        var utensilsList = document.getElementById('utensils-list');
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(itemValue));
        utensilsList.appendChild(newItem);
        itemId.value = "";
      } else if (inputId=="add-item-list-two") {
        var itemId = document.getElementById('item-list-two');
        var itemValue = itemId.value;
        var utensilsList = document.getElementById('food-list');
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(itemValue));
        utensilsList.appendChild(newItem);
        itemId.value = "";
      } else if (inputId=="add-item-list-three") {
        var itemId = document.getElementById('item-list-three');
        var itemValue = itemId.value;
        var utensilsList = document.getElementById('misc-list');
        var newItem = document.createElement('li');
        newItem.appendChild(document.createTextNode(itemValue));
        utensilsList.appendChild(newItem);
        itemId.value = "";
      }
    });
  }
})
