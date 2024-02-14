  // tab slider js

  $(document).ready(function () {
    var width = $("body").width();
    var offset = 0;
    if (width <= 992) {
      offset = 200;
    } else {
      offset = 200;
    }
    var final_scroll_to = '';

    // Scroll event to scroll to the clicked menu link. 
    $(".scrolling_tabs").click(function (e) {
      e.preventDefault();
      var width = $("body").width();
      var offset = 0;
      if (width <= 992) {
        offset = 200;
      } else {
        offset = 200;
      }

      var tab_name = $(this).html().replace(/\s/g, '');
      tab_name = tab_name.toLowerCase();

      final_scroll_to = "" + tab_name;
      var target = $("#" + tab_name);
      $('html, body').stop();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - offset
      }, 50);
      $(".scrolling_tabs").each(function () {
        $(this).removeClass("active");
      });
      if ($(this).hasClass("active")) {
      } else {
        $(this).addClass("active");
      }
    });

    // Bind scroll end event to scroll to the active tab
    (function () {
      var timer;
      $(window).bind('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(refresh, 500);
      });
      var refresh = function () {
        // Get the current scroll position
        var scrollPosition = $(window).scrollTop();

        // check the last scrolled position for active tab

        $('.shop_product_list_parent > div').each(function () {
          // Get the ID and position of the section
          var sectionID = $(this).attr('id');

          var sectionTop = $(this).offset().top - (offset + 100);
          var sectionBottom = sectionTop + $(this).outerHeight();

          // Check if the section is visible within the viewport
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (final_scroll_to != 'All') {
              console.log(sectionID);
              // Remove active class from all tab links
              $('.scrolling_tabs').removeClass('active');

              // Add active class to the corresponding tab link
              $('.scrolling_tabs[href="#' + sectionID + '"]').addClass('active');
            }
          }
        });
        // make the final tab active
        $('.scrolling_tabs[href="#' + final_scroll_to + '"]').addClass('active');
        final_scroll_to = '';
        var activeTab = document.querySelector('.scrolling_tabs.active');

        // Calculate the scroll offset based on the active tab's position
        var containerWidth = document.querySelector('.cat_tab_slider').offsetWidth;
        var scrollOffset;
        if (activeTab.offsetLeft < containerWidth / 2) {
          // Scroll to the left if the active tab is positioned before the middle
          scrollOffset = 0;
        } else if (activeTab.offsetLeft > containerWidth / 2) {
          // Scroll to the right if the active tab is positioned after the middle
          scrollOffset = activeTab.offsetLeft - (containerWidth / 2) + (activeTab.offsetWidth / 2);
        }
        // Scroll the tab container to the calculated offset
        //document.querySelector('.cat_tab_slider').scrollLeft = scrollOffset;

        // Calculate the maximum scroll offset to prevent getting stuck at the window end
        var maxScrollOffset = document.querySelector('.cat_tab_slider').scrollWidth - containerWidth;
        scrollOffset = Math.min(scrollOffset, maxScrollOffset);

        // Scroll the tab container to the calculated offset with respect to active tab
        document.querySelector('.cat_tab_slider').scroll({
          duration: 100,
          left: scrollOffset,
          behavior: 'smooth'
        });

      };

    })();



    $('.plus_item_qty').on('click', function(){
       $('.minus_item_btn').addClass('active qty_increased');
      
       $('.total_qty').addClass('active'); 
       $('.plus_item_qty').addClass('qty_increased');
       
      });

     

  });

  function updateSliderPosition() {
    var header = window.innerWidth <= 992 ? document.querySelector('.mobile_header') : document.querySelector('.desk_header');
    var categorySlider = document.querySelector('.cat_tab_slider_main');
    if (header && categorySlider) {
      // Get the height of the header
      var headerHeight = header.offsetHeight;
  
      // Set the top style of the category slider
      categorySlider.style.top = `${headerHeight}px`;
    }
  }
  // Run the function on load and resize events
  window.addEventListener('load', updateSliderPosition);
  window.addEventListener('resize', updateSliderPosition);

   function leftScroll() {
     const left = document.querySelector(".cat_tab_slider");
     left.scrollBy(200, 0);
   }
   function rightScroll() {
     const right = document.querySelector(".cat_tab_slider");
     right.scrollBy(-200, 0);
   }

 
