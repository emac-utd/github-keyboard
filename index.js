var baudio = require('baudio')
var GitHub = require('github')
var _ = require('underscore')
var DataPiano = require('data-piano')

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
    var piano = new DataPiano({ data: sizes });
    var speed = 10

    var b = baudio(piano.getSawtoothPlayFunc(speed));
    b.play()
  }
})
