$(function(){
  init();

  // set the listener on the first two circles
  function init(){
    var $nodes = $('.circle');
    listen($nodes);
  }

  // Replace the circle with 4 smaller circles
  function create($node){

    // reset the parent container / circle
    $node.removeClass('circle').addClass('parent').css({'background': 'none'}).off('mouseenter');
    var color = 0;
    var height = $node.height() / 2;
    var $children;

    // add 4 child circles
    while($node.children().length < 4){
      color = Math.floor(Math.random() * 360);
      $node.append('<div class="circle" style="height: ' + height + 'px; background: hsl(' + color + ', 50%, 50%)"></div>');
    }

    // animate the new circles
    $node.children('.circle').animate({
        'border-radius': '50%',
      }, 250);
  }

  // add the mouse event listeners to circles
  // pass in the nodes to add listeners to so not to query the entire DOM every time
  function listen($nodes){
    $nodes.each(function(){

      // create circles when hovering
      $(this).on('mouseenter', function(){
        if($(this)){ // make sure we have something to perform action on
          create($(this));
        }
      });

      // to prevent firing too frequently, watch for mouseleave on parent
      $(this).on('mouseleave', function(){
        $nodes = $(this).children('.circle');
        listen($nodes);
      });
    });
  }

});