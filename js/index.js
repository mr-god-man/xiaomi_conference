(function () {
    var $wrapper = $('.slider-wrapper'),
        $slider_item = $('.slider-item'),
        slider_item_len = $slider_item.length,
        radius_html = '',
        active_num = 0,
        prev_num,
        slider_timer,
        key = true,
        $description = $('.description'),
        $images = $('img');

    
    if(slider_item_len > 1) {
         $slider_item.each(function (index) {
            if(index == 0) {
                var radius_str = '<li class="active-radius"></li>';
            }else{
                var radius_str = '<li></li>';
            }
            radius_html += radius_str;
         });
         radius_html = '<div class="slider-radius"><div class="slider-box"><ul>' + radius_html + '</ul></div></div>';
         btn_html = '<div class="slider-btn"><div class="prev"></div><div class="next"></div></div>';
         $wrapper.append(radius_html).append(btn_html);
    }
    var $prev = $('.prev'),
        $next = $('.next'),
        $li = $('ul li');

    $prev.on('click', function () {
        $.slider_change('prev');
    });
    $next.on('click', function () {
        $.slider_change('next');
    });
    $li.on('click', function () {
        $.slider_change($(this).index());
    });

    $.extend({
        slider_change: function (direction) {
            if(key) {
                key = false;
                prev_num = active_num;
                var $slider_prev = $slider_item.eq(prev_num);

                if(direction == 'prev' || direction == 'next') {
                    if(direction == 'next') {
                        
                        active_num = active_num + 1 > slider_item_len - 1 ? 0 : active_num + 1;
                    }else {
                        active_num = active_num - 1 < 0 ? slider_item_len - 1 : active_num - 1;
                    }
                }else {
                    if(active_num == direction) return;
                    active_num = direction;
                }
                $li.eq(prev_num).removeClass('active-radius').end().eq(active_num).addClass('active-radius');
                $description.eq(prev_num).css({marginTop: '200px'});
                $images.eq(prev_num).css({width: '0%'});
                $slider_prev.animate({opacity: 0}, function () {
                    $slider_item.eq(active_num).css({display: 'block'}).animate({
                        opacity: 1
                    }, $.description_show);
                }).css({display : 'none'});
                if((typeof slider_timer) != undefined) {
                    clearTimeout(slider_timer);
                    $.slider_auto();
                }
            }

        },
        slider_auto: function() {
            if(slider_item_len > 1) {
                slider_timer = setTimeout(function () {
                    $.slider_change('next');
                }, 10000);
            }
        },
        description_show: function () {
            $description.eq(active_num).animate({marginTop: 0}, $.img_show);
        },
        img_show: function () {
            $images.eq(active_num).animate({width: '100%'}, function () {
                key = true;
            })
        }
    });
    $.slider_auto();
    $.description_show();



})()