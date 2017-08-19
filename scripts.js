var numOfImages = 0;
var currentImage = 1;
var interval;

$(document).ready(function() {
  setup();
  autoChange();
  $(".container").on("click", "#left-arrow", moveLeft);
  $(".container").on("click", "#right-arrow", moveRight);
  $(".bullet").on("click", function() {
    imageChange($(this).data("bullet"));
  });
});

function setup() {
  numOfImages = $(".image").length
  for (var i = 1; i <= numOfImages; i++) {
    $(".image-selector").append(`<li class="bullet" data-bullet="${i}" id="bullet-${i}"></li>`);
  }
  $("#bullet-" + currentImage).addClass("selected");
}

function moveLeft() {
  currentImage -= 1;
  rollback();
  imageChange(currentImage);
  clearInterval(interval);
  autoChange();
}

function moveRight() {
  currentImage += 1;
  rollback();
  imageChange(currentImage);
  clearInterval(interval);
  autoChange();
}

function rollback() {
  if (currentImage > numOfImages) {
    currentImage = 1;
  } else if (currentImage === 0) {
    currentImage = numOfImages;
  }
}

function imageChange(index) {
  if (typeof index === 'string') {
    index = parseInt(index);
  }
  $(".image").addClass("disable");
  $("#image-" + index).removeClass("disable");
  $(".bullet").removeClass("selected");
  $("#bullet-" + index).addClass("selected");
}

function autoChange() {
  interval = setInterval(function() {
    currentImage += 1;
    rollback();
    imageChange(currentImage);
  }, 5000);
}
