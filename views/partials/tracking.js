/* global document */
/* eslint no-use-before-define: [0, { "variables": false }] */

var _paq = _paq || []
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView'])
_paq.push(['enableLinkTracking']);

(function () {
  /* eslint one-var: [0, "never"] */
  var u = '//stats.fajarhac.com/'
  _paq.push(['setTrackerUrl', u + 'piwik.php'])
  _paq.push(['setSiteId', '2'])
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0]
  g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'piwik.js'; s.parentNode.insertBefore(g, s)
})()
