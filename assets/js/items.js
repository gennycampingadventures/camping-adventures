$(document).ready(function() {

  // Get a reference to the database service
  var database = firebase.database();
  var utensilRef = database.ref('utensils');
  var foodRef = database.ref('food');
  var miscRef = database.ref('misc');

  function createDeleteButton(context, item, itemType, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Delete item";
    button.onclick = func;
    $(button).addClass("delete-"+itemType+"-item");
    $(button).attr("item-value", item);
    $(context).append(button);
  }

  var loadItemList = function(itemType) {
    var databaseRef = database.ref(itemType);
    var itemList = document.getElementById(itemType + "-list");
    databaseRef.on('value', function(snapshot) {
      $(itemList).empty()
      snapshot.forEach(function(childSnapshot) {
        var itemData = childSnapshot.val();
        var itemValue = document.createElement('li');
        itemValue.appendChild(document.createTextNode(itemData));
        itemList.appendChild(itemValue);
        createDeleteButton(itemValue, itemData, itemType);
      })
    })
  }

  // loadFoodList();
  loadItemList('utensils');
  loadItemList('food');
  loadItemList('misc');

  // able to dynamically add buttons, but needs help
  // need to know how to pass value of li for clicked button in order to grab item value
  // UPDATE: CURRENTLY we can add a button and then add an attribute with the value of the li item clicked
  //  NEXT: on button click, find the value,then delete from database
  //  THEN: remove the button as well

  // I DONT REMEMEBR WHAT THE BELOW IS FOR, IT SEEMS REDUNDANT FROM ABOVE
  // SOMETHING ABOUT ADDING THINGS DYNAMICALLY
  // OR RIGHT THIS IS FOR UPDATES / STRIKETHROUGHS
  // $("#food-list").click(function() {
  //   var itemValue = this.innerHTML;
  //   foodRef.on('value', function(snapshot) {
  //     var foodList = document.getElementById('food-list');
  //     $(foodList).empty();
  //     snapshot.forEach(function(childSnapshot) {
  //       var foodData = childSnapshot.val();
  //       var newItem = document.createElement('li');
  //       newItem.appendChild(document.createTextNode(foodData));
  //       foodList.appendChild(newItem);
  //       createDeleteButton(newItem)
  //     });
  //   });
  // });

  var elements = document.querySelectorAll("#add-utensil-button, #add-food-button, #add-misc-button");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
      var buttonId = this.id;
      if (buttonId=="add-utensil-button") {
        var inputId = document.getElementById('add-utensil-input');
        var itemValue = inputId.value;
        if (itemValue == "") {
          alert("Put something in fool");
        }
        else {
          var newUtensilKey = firebase.database().ref("utensils").push().key;
          var updates = {};
          updates[newUtensilKey] = itemValue;
          inputId.value = "";
          firebase.database().ref("utensils").update(updates);
        }
      } else if (buttonId=="add-food-button") {
        var inputId = document.getElementById('add-food-input');
        var itemValue = inputId.value;
        if (itemValue == "") {
          alert("Put something in fool");
        } else {
          var newFoodKey = firebase.database().ref("food").push().key;
          var updates = {};
          updates[newFoodKey] = itemValue;
          inputId.value = "";
          return firebase.database().ref("food").update(updates);
        }
      } else if (buttonId=="add-misc-button") {
        var inputId = document.getElementById('add-misc-input');
        var itemValue = inputId.value;
        if (itemValue == "") {

        } else {
          var newMiscKey = firebase.database().ref("misc").push().key;
          var updates = {};
          updates[newMiscKey] = itemValue;
          inputId.value = "";
          return firebase.database().ref("misc").update(updates);
        }
      }
    });
  }

  $(document).on('click', '.delete-food-item,.delete-utensils-item,.delete-misc-item', function() {
    var buttonClassName = this.className;
    if (buttonClassName == "delete-utensils-item") {
      var databaseRef = firebase.database().ref('utensils');
    } else if (buttonClassName == "delete-food-item") {
      var databaseRef = firebase.database().ref('food');
    } else if (buttonClassName == "delete-misc-item") {
      var databaseRef = firebase.database().ref('misc');
    }
    var item = this.getAttribute('item-value');
    databaseRef.orderByValue().equalTo(item).on('child_added', function(snapshot) {
      snapshot.ref.remove();
    })
    $(buttonClassName).each(function() {
      var button = $(this);
      var parent = button.parent();
      var itemValue = parent.text();
      button.attr("item-value", itemValue);
    })
  })

})