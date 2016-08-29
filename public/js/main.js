(function(){

  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu');

  // TODO use only ONE modal for all modal-type-page
  
  var aboutToggle = document.getElementById('about-toggle');
  var aboutModal = document.getElementById('about-modal');

  var nasihatBotToggle = document.getElementById('nasihat-bot-toggle');
  var nasihatBotModal = document.getElementById('nasihat-bot-modal');

  var modalNavClose = document.getElementsByClassName('modal-nav-close');

  menuToggle.addEventListener('click', function(){
    // console.log('#menu-toggle clicked');
    
    toggleClass(menu, 'hidden');
  })

  aboutToggle.addEventListener('click', function () {
    console.log('#about-toggle clicked');
    toggleClass(aboutModal, 'hidden');
  })

  nasihatBotToggle.addEventListener('click', function () {
    console.log('#nasihat-bot-toggle clicked');
    toggleClass(nasihatBotModal, 'hidden');
  })

  Array.prototype.forEach.call(modalNavClose, function(el){
    el.addEventListener('click', function(){
      el.parentNode.className += ' hidden';
    })
  })

  /**
   * Toggle class for element
   * @param  {DOM} el        DOM element
   * @param  {string} className name for toggle class         
   */
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

