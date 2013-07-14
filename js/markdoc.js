function setSideBars() {
  if($(window).width() > 800) {
    $('#mobile-header, #sidebar').addClass('desktop').removeAttr('style');
    $('#content').width(
      $(window).width() - $('#sidebar').outerWidth() - 56
    );
    if($('#content').outerHeight() > $(window).height()) {
      $('#sidebar').css({
        "min-height":$('#content').outerHeight() + 'px'
      });
    } else {
      $('#sidebar').css({
        "min-height":$(window).height() + 'px'
      });
    }
  } else {
    $('#content').width($(window).width() - 40);
    $('#mobile-header, #sidebar').removeClass('desktop').removeAttr('style');
    $('#sidebar').css({
      "min-height":"auto"
    });
  }
}

$(function() {
  setSideBars();
  $(window).on('resize orientationchange', function() { setSideBars() });
  $('body').on('click', '#mobile-header a, #sidebar a.close', function(e) {
    e.preventDefault();
    $('#sidebar, #mobile-header').slideToggle();
  }).on('click', '#toc a', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $('#content').fadeOut(function() {
      $.get(url, function(content) {
        $('#content').html(markdown.toHTML(content)).fadeIn();
        setSideBars();
      });
    });
  }).on('click', '#content a', function(e) {
    var url = $(this).attr('href');
    var url_parts = url.split('.');
    if(url_parts[url_parts.length -1] == ('md' || 'mdown' || 'markdown')) {
      e.preventDefault();
      $('#content').fadeOut(function() {
        $.get(url, function(content) {
          $('#content').html(markdown.toHTML(content)).fadeIn();
          setSideBars();
        });
      });
    }
  });

  $.getJSON("./docs/toc.json", function(toc) {
    $(toc.sections).each(function() {
      var link = $('<a>').attr({
        "href":this.page,
      }).html(this.title);
      if(this.contents.length > 0) {
        var pages = $('<ul>');
        $(this.contents).each(function() {
          var page_link = $('<li>').append($('<a>').attr({
            "href":this.page,
          }).html(this.title));
          pages.append(page_link);
        });
      }
      $('#toc').append($('<li>').html(link));
      if(typeof pages !== undefined) {
        $('#toc').append($('<li>').html(pages));
      }
    });
    $('#content').fadeOut(function() {
      $.get(toc.sections[0].page, function(content) {
        $('#content').html(markdown.toHTML(content)).fadeIn();
        setSideBars();
      });
    });
  });
});