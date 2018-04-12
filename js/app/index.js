(($) => {
  
  $(document).on('click', '.action-button', event => {
    
    $('html, body').animate({scrollTop: $('#hero').position().top}, 'slow')

  });

})(jQuery);