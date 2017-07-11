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

    var randomButton = document.getElementsByClassName('random')
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

                $('.main-content').fadeOut(300, () => {
                    // replace current nasihat quote and source with new one
                    nasihatQuote.innerHTML = nextQuote
                    nasihatQuoteSource.innerHTML = nextQuoteSource
                    // show back nasihat quote and source that contains new one
                    $('.main-content').fadeIn(300)

                    nasihatQuote.dataset.quoteid = dataId
                })

            })
    })

    prevButton.addEventListener('click', function () {
        // console.log('prev button clicked')

        var currentId = nasihatQuote.dataset.quoteid
        console.log('get nasihat previous to id ' + currentId)
        // get prev nasihat word
        getJSON('/nasihat/prev/' + currentId)
            .then(function (data) {
                var dataId = data.id
                var prevQuote = data.text
                var prevQuoteSource = data.source

                // hide current nasihat quote and it source
                $('.main-content').fadeOut(300,() => {
                        // replace current nasihat quote and source with new one
                        nasihatQuote.innerHTML = prevQuote
                        nasihatQuoteSource.innerHTML = prevQuoteSource
                        // show back nasihat quote and source that contains new one
                        $('.main-content').fadeIn(300)


                        nasihatQuote.dataset.quoteid = dataId
                    }
                )

            })
    })
})()

// ------------- global functions ----------------
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

function httpPOST (url, data) {
    return new Promise(function (resolve, reject) {
        // eslint-disable-next-line
        var xhr = new XMLHttpRequest()

        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

        xhr.onload = function () {
            var status = xhr.status
            // console.log(status)
            if (status === 200) {
                resolve(xhr.response)
            } else {
                reject(status)
            }
        }
        xhr.send(data)
    })
}

// eslint-disable-next-line
function approveUpdate(nasihatId, revisionId, element) {
    console.log('update nasihat#' + nasihatId + ' revision#' + revisionId)

    var uUsername = document.querySelector('#adminDetailForm #username').value
    var uPassword = document.querySelector('#adminDetailForm #password').value
    var _method = '_method=put'
    var submitData = 'status=approve&username=' + uUsername + '&password=' + uPassword + '&' + _method

    // console.log(submitData)
    var url = '/nasihat/' + nasihatId + '/revisions/' + revisionId
    httpPOST(url, submitData)
        .then(function (data) {
            element.parentNode.style.display = 'none'
        })
        .catch(function (err) {
            console.log(err)
        })
}

// eslint-disable-next-line
function deleteUpdate(nasihatId, revisionId, element) {
    console.log('delete nasihat#' + nasihatId + ' revision#' + revisionId)

    var overlay = document.createElement('div')
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.transition = 'ease-in 500ms all'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)'
    overlay.style.position = 'absolute'

    var parent = element.parentNode
    parent.style.position = 'relative'
    parent.insertBefore(overlay, parent.firstChild)

    var uUsername = document.querySelector('#adminDetailForm #username').value
    var uPassword = document.querySelector('#adminDetailForm #password').value
    var _method = '_method=delete'
    var submitData = 'username=' + uUsername + '&password=' + uPassword + '&' + _method

    // console.log(submitData)
    var url = '/nasihat/' + nasihatId + '/revisions/' + revisionId
    httpPOST(url, submitData)
        .then(function (data) {
            element.parentNode.style.display = 'none'
        })
        .catch(function (err) {
            console.log(err)
            setTimeout(function () { parent.removeChild(overlay) }, 1000)
        })
}
