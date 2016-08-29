(function(){

  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu');
  menuToggle.addEventListener('click', function(){
    // console.log('#menu-toggle clicked');
    
    toggleClass(menu, 'hidden');
  })


  function toggleClass(el, className){
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  }

})()

