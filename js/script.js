(function() {

  /*grunticon(["css/sprites/icons-svg.css", "css/sprites/icons-png.css", "css/sprites/icons-fallback.css"]);*/
  
  (function() {
    var menu = document.querySelector('.page-menu');
    var collapseButton = document.querySelector('.page-menu__collapse-button');
    var expandButton = document.querySelector('.page-menu-panel__expand-button');
    
    menu.classList.add('page-menu--collapsed');
    
    expandButton.addEventListener('tap', function() {
      menu.classList.remove('page-menu--collapsed');
    });
    
    collapseButton.addEventListener('tap', function() {
      if (!menu.classList.contains('page-menu--collapsed'))
        menu.classList.add('page-menu--collapsed');
    });    
  })();
  
})();
