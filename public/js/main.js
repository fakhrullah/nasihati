(function () {
  var menuToggle = document.getElementById('menu-toggle')
  var menu = document.getElementById('menu')

  var nasihatQuote = document.getElementById('nasihatQuote')
  var nasihatQuoteSource = document.getElementById('nasihatQuoteSource')

  // TODO use only ONE modal for all modal-type-page

  var aboutToggle = document.getElementById('about-toggle')
  var aboutModal = document.getElementById('about-modal')

  var nasihatBotToggle = document.getElementById('nasihat-bot-toggle')
  var nasihatBotModal = document.getElementById('nasihat-bot-modal')

  var modalNavClose = document.getElementsByClassName('modal-nav-close')

  var nextButton = document.getElementById('next')
  var prevButton = document.getElementById('prev')

  menuToggle.addEventListener('click', function () {
    // console.log('#menu-toggle clicked')

    toggleClass(menu, 'hidden')
  })

  aboutToggle.addEventListener('click', function () {
    console.log('#about-toggle clicked')
    toggleClass(aboutModal, 'hidden')
  })

  nasihatBotToggle.addEventListener('click', function () {
    console.log('#nasihat-bot-toggle clicked')
    toggleClass(nasihatBotModal, 'hidden')
  })

  Array.prototype.forEach.call(modalNavClose, function (el) {
    el.addEventListener('click', function () {
      el.parentNode.className += ' hidden'
    })
  })

  nextButton.addEventListener('click', function () {
    // console.log('next button clicked')

    var currentId = nasihatQuote.dataset.quoteid
    console.log('get nasihat next to ' + currentId + ' id')
    // get next nasihat word
    getJSON('/nasihat/next/' + currentId)
    .then(function (data) {
      var dataId = data.id
      var nextQuote = data.text
      var nextQuoteSource = data.source

      // hide current nasihat quote and it source
      nasihatQuote.style.visibility = 'hidden'
      nasihatQuoteSource.style.visibility = 'hidden'

      setTimeout(function setNewNasihatQuote () {
        // replace current nasihat quote and source with new one
        nasihatQuote.innerHTML = nextQuote
        nasihatQuoteSource.innerHTML = nextQuoteSource
        // show back nasihat quote and source that contains new one
        nasihatQuote.style.visibility = 'visible'
        nasihatQuoteSource.style.visibility = 'visible'

        nasihatQuote.dataset.quoteid = dataId
      }, 1000)
    })
  })

  prevButton.addEventListener('click', function () {
    console.log('prev button clicked')
  })

  /**
   * Toggle class for element
   * @param  {DOM} el        DOM element
   * @param  {string} className name for toggle class
   */
  function toggleClass (el, className) {
    if (el.classList) {
      el.classList.toggle(className)
    } else {
      var classes = el.className.split(' ')
      var existingIndex = classes.indexOf(className)

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      } else {
        classes.push(className)
      }

      el.className = classes.join(' ')
    }
  }

  function getJSON (url) {
    return new Promise(function (resolve, reject) {
      // eslint-disable-next-line
      var xhr = new XMLHttpRequest()

      xhr.open('get', url, true)
      xhr.responseType = 'json'

      xhr.onload = function () {
        var status = xhr.status
        if (status === 200) {
          resolve(xhr.response)
        } else {
          reject(status)
        }
      }

      xhr.send()
    })
  }
})()
