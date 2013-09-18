var baudio = require('baudio')
var GitHub = require('github')
var _ = require('underscore')

var gh = new GitHub({
  version: "3.0.0"
});

function keyToFreq(key) {
  return Math.pow(2, (key-49)/12) * 440
}

gh.repos.getFromUser({user: "substack",
                      sort: "created",
                      direction: "asc",
                      per_page: 100
}, function(err, data) {
  if(err) console.log("Failed: " + err)
  else {
    var nonForks = _.filter(data, function(repo) { return !repo.fork })
    var sizes = _.map(data, function(repo) { return repo.size })
    var maxSize = _.max(sizes)
    var normalizedSizes = _.map(sizes, function(size) { return keyToFreq(Math.round(size/maxSize * 23) + 49) })
    console.log(normalizedSizes)
    var speed = 10

    var b = baudio(function(t) {
      return Math.sin(t * normalizedSizes[Math.floor(t * speed) % normalizedSizes.length]) * 0.5
    })
    b.play()
  }
})
