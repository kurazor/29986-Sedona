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
  
  var singleDocumentElement = function(selector) {
    return document.querySelectorAll(selector)[0];
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
            
      var tuneAdditionalFields = function() {
        var stepWrapper = singleDocumentElement(".step2");
        
        var collectionWrapper = '';
        var elementClass = '';
        var templateId = '';
        if (counterInput.classList.contains('people-count')) {
          collectionWrapper = singleChildElement(stepWrapper, ".row-adults");
          elementClass = 'adult-fields';
          templateId = 'template-adult';
        } else if (counterInput.classList.contains('children-count')) {
          collectionWrapper = singleChildElement(stepWrapper, ".row-children");
          elementClass = 'child-fields';
          templateId = 'template-child';
        }
        
        if (!collectionWrapper)
          return;
        
        var currentValue = counterInput.value;
        var existValue = collectionWrapper.querySelectorAll('.' + elementClass).length;
        
        if (currentValue == existValue) {
          return;
        } else if (currentValue > existValue ) {
          var template = singleDocumentElement('#' + templateId).innerHTML;
          while (currentValue > existValue) {
            var fieldsWrapper = document.createElement('div');
            fieldsWrapper.classList.add(elementClass);
            
            var counter = existValue + 1;
            fieldsWrapper.innerHTML = Mustache.render(template, { 
              "id1": 'lastName-' + counter,
              "id2":'firstName-' + counter,
              "id3": 'patrynomic-' + counter,
              "counter": counter
            });
            
            collectionWrapper.appendChild(fieldsWrapper);
            existValue = existValue + 1;
          }          
        } else {
          while (currentValue < existValue) {
            var removeElement = collectionWrapper.querySelectorAll('.' + elementClass)[existValue - 1];
            collectionWrapper.removeChild(removeElement);
            existValue = existValue - 1;
          }
        }
          
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
        
        tuneAdditionalFields();
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
      
      tuneAdditionalFields();
    });
                                           
  });

})();