$(document).ready(function(){
  $(".btn").click(function(event){
    event.preventDefault();
    $(".video").slideToggle();
  });
});
