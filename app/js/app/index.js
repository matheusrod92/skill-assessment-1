(($) => {
  
  $(document).on('click', '.action-button', event => {
    
    $('html, body').animate({scrollTop: $('#form').position().top}, 'slow')

  });

})(jQuery);