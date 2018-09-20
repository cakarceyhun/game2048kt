var display = function(tiles) {
  for (i = 0; i<4; i++) {
    for (j = 0; j<4; j++) {
      const selector = `.table > .row:nth-child(${i+1}) > .cell:nth-child(${j+1})`
      document.querySelector(selector).innerHTML = tiles[i*4+j] != 0 ? tiles[i*4+j] : ''
      var colors = {0:     "#CCC",   2: "#ABABFF",    4: "#0000FF",   8: "#00007F",
                    16:  "#00BFBF", 32: "#006666",   64: "#40FF40", 128: "#007F00",
                    256: "#FF9F40", 512: "#BF6000", 512: "#CC0000",   2048: "#000"};
      document.querySelector(selector).style.backgroundColor = colors[tiles[i*4+j]]

    }
  }
}

var placeTile = function(tiles) {
  var index = 0

  return tiles.map(function(x) {
    if (x == 0 && position == index) {
      index++
      return tile
    } else if (x == 0) {
      index++
    return x
    } else {
      return x
    }
  })
}

refresh = function(tiles) {
  numberOfZero = tiles.filter(x => x == 0).length
  tile = (Math.floor(Math.random() * 2) + 1) * 2
  position = Math.floor(Math.random() * numberOfZero)
  tiles = placeTile(tiles)
  display(tiles)

  return tiles
}

var alignHorizontally = function(xs) {
  var xss = []
  while (xs.length >= 4) {
    xss.push(xs.slice(0, 4))
    xs = xs.slice(4)
  }

  return xss
}

var flattenHorizontally = function(xss) {
  return xss.reduce((acc, xs) => acc.concat(xs), [])
}

var alignVertically = function(tiles) {
  var xss = [[], [], [], []]
  for (i = 0; i < 4; i++) {
    xss = xss.map(function(xs, j) {
      xs.push(tiles[4 * i + j])
      return xs
    })
  }
  return xss
}

var flattenVertically = function(xss) {
  var tiles = []
  for (i=0; i<4; i++) {
    tiles = tiles.concat(xss.map(xs => xs[i]))
  }
  return tiles
}

var fuse = function(xs) {
  if (xs.length == 0 || xs.length == 1) {
    return xs
  } else if (xs[0] == xs[1]) {
    return [xs[0] + xs[1]].concat(fuse(xs.slice(2)))
  } else {
    return [xs[0]].concat(fuse(xs.slice(1)))
  }
}

var deflate = function(xs) {
  return xs.filter(x => x != 0)
}

var inflate = function(xs) {
  if (xs.length < 4) {
    return xs.concat([...Array(4 - xs.length)].map(x => 0))
  } else {
    return xs.slice(0, 4)
  }
}

var slideLine = function(xs) {
  return inflate(fuse(deflate(xs)))
}

var slide = function(xss) {
  return xss.map(slideLine)
}

var eventToLeft = function(tiles) {
  return flattenHorizontally(slide(alignHorizontally(tiles)))
}

var eventToRight = function(tiles) {
  return eventToLeft(tiles.reverse()).reverse()
}

var eventToUp = function(tiles) {
  return flattenVertically(slide(alignVertically(tiles)))
}

var eventToDown = function(tiles) {
  return eventToUp(tiles.reverse()).reverse()
}

function init(tiles) {
    console.log(tiles)
    return refresh(tiles)
}

function left(tiles) {
    console.log(tiles)
    var new_tiles = eventToLeft(tiles);
    if (JSON.stringify(tiles) != JSON.stringify(new_tiles)) {
      tiles = refresh(new_tiles)
    }
    return tiles
}

function up(tiles) {
    var new_tiles = eventToUp(tiles);
    if (JSON.stringify(tiles) != JSON.stringify(new_tiles)) {
      tiles = refresh(new_tiles)
    }
    return tiles
}

function right(tiles) {
    var new_tiles = eventToRight(tiles);
    if (JSON.stringify(tiles) != JSON.stringify(new_tiles)) {
      tiles = refresh(new_tiles)
    }
    return tiles
}

function down(tiles) {
    var new_tiles = eventToDown(tiles);
    if (JSON.stringify(tiles) != JSON.stringify(new_tiles)) {
      tiles = refresh(new_tiles)
    }
    return tiles
}
