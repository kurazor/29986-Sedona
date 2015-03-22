(function() {
  
  var each = function(collection, handler) {
    for (var index = 0; index < collection.length; index++) 
      handler(collection[index]);
    return collection.length;
  };
  
  var eachDocumentElement = function(selector, handler) {
    return each (document.querySelectorAll(selector), handler);
  };
  
  var eachChildElement = function(element, selector, handler) {
    return each (element.querySelectorAll(selector), handler);
  };
  
  var singleChildElement = function(element, selector) {
    return element.querySelectorAll(selector)[0];
  };
  
  document.addEventListener('DOMContentLoaded', function() { 
    
    eachDocumentElement(".counter", function(counter) {
      var counterInput = singleChildElement(counter, ".counter-input");
      
      var getMinCounterValue = function() {
        var attribute = counterInput.getAttribute("data-minValue");
        if (attribute)
          return parseInt(attribute, 10);
        else
          return undefined;
      };
      
      var getMaxCounterValue = function() {
        var attribute = counterInput.getAttribute("data-maxValue");
        if (attribute)
          return parseInt(attribute, 10);
        else
          return undefined;
      };
      
      var setCounterValue = function(currentValue) {
        var minValue = getMinCounterValue();
        var maxValue = getMaxCounterValue();
        if (isNaN(currentValue))
          currentValue = minValue;
        if (minValue != undefined && currentValue < minValue)
          currentValue = minValue;
        if (maxValue != undefined && currentValue > maxValue)
          currentValue = maxValue;
        if (counterInput.value != currentValue)
          counterInput.value = currentValue;
      };
      
      counterInput.addEventListener("change", function() {
        var currentValue = parseInt(counterInput.value, 10);
        setCounterValue(currentValue);
      });
      
      eachChildElement(counter, ".counter-action.minus", function(button) {
        button.addEventListener("click", function() {
          event.preventDefault();
          var currentValue = parseInt(counterInput.value, 10);
          setCounterValue(currentValue - 1);
        });
      });
      
      eachChildElement(counter, ".counter-action.plus", function(button) {
        button.addEventListener("click", function() {
          event.preventDefault();
          var currentValue = parseInt(counterInput.value, 10);
          setCounterValue(currentValue + 1);
        });
      });      
      
    });
                                           
  });

})();