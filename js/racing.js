$(document).ready(function(){

  // $(".cheat").click(function(event){
  //   event.preventDefault();
  //   $("#cheat").slideToggle();
  // });
  $(".previewasphalt").click(function(event){
    event.preventDefault();
    $("#previewasphalt").slideToggle();
  })
  $(".previewneedforspeed").click(function(event){
    event.preventDefault();
    $("#previewneedforspeed").slideToggle();
  })
  $(".previewdirtrally").click(function(event){
    event.preventDefault();
    $("#previewdirtrally").slideToggle();
  })
  $(".previewtrackmania").click(function(event){
    event.preventDefault();
    $("#previewtrackmania").slideToggle();
  })
  $(".previewforza").click(function(event){
    event.preventDefault();
    $("#previewforza").slideToggle();
  })
  $(".previewmario").click(function(event){
    event.preventDefault();
    $("#previewmario").slideToggle();
  })
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
          document.getElementById("gotop").style.display = "block";
      } else {
          document.getElementById("gotop").style.display = "none";
      }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
$("#gotop").click(function(event){
  event.preventDefault();
  topFunction();
})
//
// $(".asphalt8").click(function() {
//   window.location = $(this).find("a").attr("href");
//   return false;
// });
});
