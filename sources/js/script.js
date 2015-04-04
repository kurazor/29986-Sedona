(function() {
  
  (function() {
    var menu = document.querySelector('.page-menu');
    var collapseButton = document.querySelector('.page-menu__collapse-button');
    var expandButton = document.querySelector('.page-menu-panel__expand-button');
    
    menu.classList.add('page-menu--collapsed');
    menu.classList.add('page-menu--animated');
    
    expandButton.addEventListener('tap', function() {
      menu.classList.remove('page-menu--collapsed');
    });
    
    collapseButton.addEventListener('tap', function() {
      if (!menu.classList.contains('page-menu--collapsed'))
        menu.classList.add('page-menu--collapsed');
    });    
  })();
  
  (function() {
    var mapWrapper = document.querySelector('.page-footer__map');
    var mapOptions = {
      center: new google.maps.LatLng(34.5856169, -112.0083956),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(mapWrapper, mapOptions);
    mapWrapper.classList.add('page-footer__map--no-image');
  })();
  
})();
