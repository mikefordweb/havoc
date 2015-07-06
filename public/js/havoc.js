$(document).ready(function() {

        Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
            switch (operator)
                {
                    case "==":
                        return (v1==v2)?options.fn(this):options.inverse(this);

                    case "!=":
                        return (v1!=v2)?options.fn(this):options.inverse(this);

                    case "===":
                        return (v1===v2)?options.fn(this):options.inverse(this);

                    case "!==":
                        return (v1!==v2)?options.fn(this):options.inverse(this);

                    case "&&":
                        return (v1&&v2)?options.fn(this):options.inverse(this);

                    case "||":
                        return (v1||v2)?options.fn(this):options.inverse(this);

                    case "<":
                        return (v1<v2)?options.fn(this):options.inverse(this);

                    case "<=":
                        return (v1<=v2)?options.fn(this):options.inverse(this);

                    case ">":
                        return (v1>v2)?options.fn(this):options.inverse(this);

                    case ">=":
                     return (v1>=v2)?options.fn(this):options.inverse(this);

                    default:
                        return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
                }
        });
        
        function craftAssetAction(data_item) {
            var preposition = "";
            var action = "";
            var asset = "";
            if (data_item.item_obj.action == "delete") {
                action = "removed";
                preposition = "from";
            } else if (data_item.item_obj.action == "update") {
                action = "updated";
                preposition = "in";
            } else if (data_item.item_obj.action == "insert") {
                action = "added";
                preposition = "to";
            }

            if (data_item.item_obj.table_changed == "players") {
                asset = "player";
            } else if (data_item.item_obj.table_changed == "media") {
                asset = "photo/video";
            } else if (data_item.item_obj.table_changed == "game_info") {
                asset = "game";
            }

            var action_on_asset = action + " a " + asset + " " + preposition;
            return action_on_asset;
        }

        $(document).on('click','.pc-playercard',function(e){
            console.log("$(this).attr('data-player-id'): " + $(this).attr('data-player-id'));
            $('.player-icon[data-player-id='+$(this).attr('data-player-id')+']').trigger('click');
        });

        $.get("/live_updates").done(
            function(data) {
                //console.log("live_updates: " + JSON.stringify(data));
                for (var i = 0; i < data.live_update_items.length; i++) {
                    //console.log("item_type: " + data.live_update_items[i].item_type);
                    if (data.live_update_items[i].item_type == "activity") {
                        var action_on_asset = craftAssetAction(data.live_update_items[i]);
                        //console.log("action_on_asset: " + JSON.stringify(data.live_update_items[i]));
                        var live_update_item = {};
                        live_update_item.user = data.live_update_items[i].item_obj.username;
                        live_update_item.first_name = data.live_update_items[i].item_obj.first_name;
                        live_update_item.last_name = data.live_update_items[i].item_obj.last_name;
                        live_update_item.action_on_asset = action_on_asset;
                        live_update_item.team_type = data.live_update_items[i].item_obj.team;
                        live_update_item.team_asset = data.live_update_items[i].item_obj.table_changed;
                        live_update_item.player_id = data.live_update_items[i].item_obj.player_id;
                        live_update_item.date_time = data.live_update_items[i].date_time;
                        if (data.live_update_items[i].item_obj.table_changed == "game_info") {
                            live_update_item.team_asset = "calendar";
                        } else if (data.live_update_items[i].item_obj.table_changed == "players") {
                            live_update_item.team_asset = "team";
                        }

                        if (live_update_item.team_asset == "media") {
                            var source1   = $("#live-update-media-item").html();
                        } else {
                            var source1   = $("#live-update-item").html();
                        }
                        var template1 = Handlebars.compile(source1);
                        
                        var html1    = template1(live_update_item);
                        //console.log("adding a db item");
                        //$('.live-updates-header').after(html1);
                        $('#live-updates-content > .viewport > .overview').append(html1);
                    } else if (data.live_update_items[i].item_type == "tweet") {
                        var tweet_type_item = {};
                        tweet_type_item.twitter_icon = data.twitter_icon_src;
                        tweet_type_item.twitter_screen_name = data.twitter_screen_name;
                        tweet_type_item.twitter_name = data.twitter_name;
                        tweet_type_item.twitter_text = data.live_update_items[i].item_obj.msg;
                        if (typeof data.live_update_items[i].item_obj.url == 'undefined') {
                            tweet_type_item.url = "none";
                            tweet_type_item.media_url = "none";
                        } else {
                            tweet_type_item.url = data.live_update_items[i].item_obj.url;
                            tweet_type_item.media_url = data.live_update_items[i].item_obj.media_url;
                        }
                        //console.log("tweet_type_item.url: " + tweet_type_item.url);
                        //console.log("tweet_type_item.media_url: " + tweet_type_item.media_url);
                        tweet_type_item.date_time = data.live_update_items[i].date_time;
                        var source1   = $("#live-update-tweet").html();
                        var template1 = Handlebars.compile(source1);
                        
                        var html1    = template1(tweet_type_item);
                        //console.log("adding a tweet item: " + html1);


                        $('#live-updates-content > .viewport > .overview').append(html1);

                    }
                }
                //game_data = data;
                //var source1   = $("#boxscore-template").html();
                //var template1 = Handlebars.compile(source1);
                
                //console.log("game_data: " + JSON.stringify(game_data));
                //var html1    = template1(game_data);
                //$('.havoc-modal-body').html("");
                //$('.havoc-modal-body').append(html1);
                $("#live-updates-content").tinyscrollbar();
                $('.live-updates-loading').css('display', 'none');
            }
        );

        $(document).on('click','.stats-link',function(e){
            e.preventDefault();
            $('.stats-link').removeClass('selected-stats-link');
            $(this).addClass('selected-stats-link');
            var newStatsRow = $(this).attr('data-stats-id');
            console.log("newStatsRow: " + newStatsRow);
            $('.player-stats-total-tr').css('display','none');
            $('.'+newStatsRow).css('display','table-row');
        });

        $('.calendar-menu > li').click(function(e){
            var current_team = $('.calendar-menu > li.selected').attr('data-team');
            $('.calendar-menu > li').removeClass('selected');
            $(this).addClass('selected');
            var selected_team = $(this).attr('data-team');
            //console.log("current_team: " + current_team);
            //console.log("selected_team: " + selected_team);
            $('#calendar').fullCalendar( 'removeEventSource', '/game_calendar?team=' + current_team );
            $('#calendar').fullCalendar( 'addEventSource', '/game_calendar?team=' + selected_team );
        });

            $('.modal-close').click(function(e){
                $('.box-score-modal').css('display','none');
                $('.modal-fs-bkg').css('display','none');
            });

            $(window).scroll(function() {
                $('.box-score-modal').css('top', ($(window).scrollTop()+120));
            });

            $( window ).resize(function() {
              $('.box-score-modal').css('left', (window.innerWidth - $('.box-score-modal').width()) / 2);
            });

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                aspectRatio: 1.60,
                editable: false,
                eventClick: function(calEvent, jsEvent, view) {

                    console.log('Event: ' + calEvent.title);
                    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    console.log('View: ' + view.name);

                    var game_data;

                    $.get("/game_and_box_data", { game_id: calEvent.data_id}).done(
                        function(data) {
                            console.log("box_score.length: " + data.box_score.length);
                            game_data = data;
                            var source1   = $("#boxscore-template").html();
                            var template1 = Handlebars.compile(source1);
                            
                            //console.log("game_data: " + JSON.stringify(game_data));
                            var html1    = template1(game_data);
                            $('.havoc-modal-body').html("");
                            $('.havoc-modal-body').append(html1);
                            if (parseInt($('.modal-game-score-left').html()) > parseInt($('.modal-game-score-right').html())) {
                                $('.modal-game-score-left').addClass('box-winner');
                                $('.modal-game-team-left').addClass('box-winner');
                            } else {
                                $('.modal-game-score-right').addClass('box-winner');
                                $('.modal-game-team-right').addClass('box-winner');
                            }
                        }
                    );

                    var modalLeft = (window.innerWidth - $('.box-score-modal').width()) / 2;
                    console.log("window.innerWidth: " + window.innerWidth);
                    console.log("$('.box-score-modal').width(): " + $('.box-score-modal').width());
                    console.log("modalLeft: " + modalLeft);
                    $('.box-score-modal').css('left', modalLeft);
                    $('.box-score-modal').css('top', ($(window).scrollTop()+120));
                    $('.box-score-modal').css('display','block');
                    $('.modal-fs-bkg').css('display','block');

                },
                eventLimit: true, // allow "more" link when too many events
                eventRender: function(event, element) {
                    //console.log("eventRender: events.length: " + $('#calendar').fullCalendar('clientEvents').length);
                    var allEvents = $('#calendar').fullCalendar('clientEvents');
                    var eventDay = moment(event.start);
                    var eventDayCount = 0;
                    for (var i = 0; i < allEvents.length; i++) {
                        //console.log("allEvents[i].start: " + allEvents[i].start);
                        //console.log("event.start: " + event.start);
                        if ((moment(allEvents[i].start).date() == moment(event.start).date()) && (moment(allEvents[i].start).month() == moment(event.start).month()) && (moment(allEvents[i].start).year() == moment(event.start).year())) {
                            eventDayCount++;
                        }
                    }
                    //console.log("event.start: " + event.start);
                    //console.log("eventDayCount: " + eventDayCount);
                    if (eventDayCount == 1) {
                        //console.log("setting single-event-day");
                        element.addClass('single-event-day');
                    }
                    element.attr('data-id', event.data_id);
                },
                events: '/game_calendar?team=sophomore'
            });
        

                $('.player-icon-last-name').each(function(e){
                    var name_size = $(this).html().length * 9;
                    $(this).css('width',name_size);

                    var right_spot = 70 - name_size;
                    if (right_spot < 0) {
                        right_spot = 0;
                    }
                    $(this).css('right',right_spot);

                });

                var playerListWidthPX = 0;
                $('.player-list > li').each(function(e){
                    playerListWidthPX += 120;
                });
                $('.player-list-wrapper-inner').css('width',playerListWidthPX+40);

                $('.player-list-right').hover(function(e){
                    $('.player-list-left').css('display','block');
                    var innerLeft = parseInt($('.player-list-wrapper-inner').css('left'));
                    var playerListWidth = parseInt($('.player-list-wrapper').css('width'));
                    var innerPlayerListWidth = parseInt($('.player-list-wrapper-inner').css('width'));

                    var leftAnim = innerPlayerListWidth - playerListWidth + innerLeft - 5;
                    $('.player-list-wrapper-inner').animate({
                        left: "-="+leftAnim
                      }, 1800, function() {
                        $('.player-list-right').css('display','none');
                        $('.player-list-left').css('display','block');
                      });
                }, function(e){
                    $('.player-list-wrapper-inner').stop();
                });

                $('.player-list-left').hover(function(e){
                    $('.player-list-right').css('display','block');
                    console.log("$('.player-list-wrapper-inner').css('left'): " + $('.player-list-wrapper-inner').css('left'));
                    var innerLeft = parseInt($('.player-list-wrapper-inner').css('left'));
                    
                    console.log("innerLeft: " + innerLeft);
                    $('.player-list-wrapper-inner').animate({
                        left: "-="+innerLeft
                      }, 1800, function() {
                        console.log("left hover done");
                        $('.player-list-right').css('display','block');
                        $('.player-list-left').css('display','none');
                      });
                }, function(e){
                    $('.player-list-wrapper-inner').stop();
                });

                var subMenuItems = [];
                $('#sub-menu > li').each(function(e){
                    subMenuItems.push($(this).attr('id'));
                });

                function isOverflowedY(element){
                    return element[0].scrollHeight > element[0].clientHeight;
                }

                function isOverflowedX(element){
                    return element.scrollWidth > element.clientWidth;
                }

                var lastScrollY = 0;
                var lastScrollX = 0;

                $(document).on('scroll', '.stats-table-window', function(e) {
                    //console.log("scroll y");
                    var tableScrollY = $(this).scrollTop();
                    var tableScrollX = $(this).scrollLeft();
                    if (lastScrollY != tableScrollY) {
                        //console.log("SHOW LOCKED HEADER");
                        $('#stats-header-locked').css('display','block');
                    }
                    if (lastScrollX != tableScrollX || (lastScrollX == 0 && tableScrollX == 0)) {
                        //console.log("HIDE LOCKED HEADER");
                        $('#stats-header-locked').css('left', -tableScrollX);
                        //$('#stats-header-locked').css('display','none');
                    }
                    if (tableScrollY == 0) {
                        $('#stats-header-locked').css('display','none');
                    }
                });

                $(document).on('click','.return-to-front',function(e){
                    e.preventDefault();
                    var playerId = $(this).attr("data-player-id");
                    $('.stats-table-header').css('visibility','hidden');
                    $('.stats-table-wrapper').css('visibility','hidden');
                    $('.basketball-card-front[data-player-id="'+playerId+'"]').toggleClass('flipped');
                    $('.basketball-card-back[data-player-id="'+playerId+'"]').toggleClass('flipped');
                });

                $(document).on('click','.flip-card',function(e){
                    e.preventDefault();
                    var playerId = $(this).attr("data-player-id");
                    $('.stats-table-header').css('visibility','hidden');
                    $('.stats-table-wrapper').css('visibility','hidden');
                    $('.basketball-card-front[data-player-id="'+playerId+'"]').toggleClass('flipped');
                    $('.basketball-card-back[data-player-id="'+playerId+'"]').toggleClass('flipped');
                });

                $(".basketball-card-back").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                    function() {
                        console.log("done flipping");
                        var playerId = $(this).attr("data-player-id");
                        $('.basketball-card-back[data-player-id="'+playerId+'"]').css('visibility','visible');
                        $('.stats-table-header').css('visibility','visible');
                        $('.stats-table-wrapper').css('visibility','visible');
                    }
                );

                $('#top-menu li#teams').hover(function(e){
                    //console.log("hover top menu on");
                }, function(e) {
                    //console.log("hover top menu off");
                    var playerSelected = false;
                    $('.player-icon').each(function(e){
                        if ($(this).hasClass('player-icon-selected')) {
                            playerSelected = true;
                        }
                    });
                    console.log("player selected == false");
                    if (playerSelected == false) {
                        $('.player-icon').removeClass('player-icon-selected');
                        $('.player-icon').removeClass('icon-player-hover');
                        $('.player-icon').removeClass('icon-player-hover-out');
                        $('.player-icon-wrapper-bkg').css('display','none');
                        $('.icon-photo-inner-inner-grow-circle').removeClass('player-grow-selected');
                        $('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-grow');
                        $('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-shrink');
                    }
                });
                
                

                $('#sub-menu > li').hover(function(e){
                    var currentItem = $(this).attr('id');
                    for (var k = 0; k < subMenuItems.length; k++) {
                        if (subMenuItems[k] != currentItem) {
                            $('#'+subMenuItems[k]).find('.player-icon').removeClass('icon-player-hover');
                            $('#'+subMenuItems[k]).find('.player-icon').removeClass("icon-player-hover-out");
                            $('#'+subMenuItems[k]).find('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-grow');
                            $('#'+subMenuItems[k]).find('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-shrink');
                        }
                    }
                }, function(e) {

                });

                $(".player-icon").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                    function() {
                        //console.log("transition end");
                        if ($(this).hasClass('icon-player-hover-out')) {
                            $(this).removeClass('icon-player-hover');
                            $(this).removeClass("icon-player-hover-out");
                            $(this).find('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-grow');
                            $(this).find('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-shrink');
                        }
                        //$(this).removeClass("icon-player-hover");
                        //$(this).removeClass("icon-player-hover-out");
                    });
                $('.player-icon').hover(function(e){
                    //console.log("player icon hover");
                    if (!$(this).hasClass('player-icon-selected')) {
                        console.log("player icon not selected");
                        $(this).addClass('icon-player-hover');
                        //$(this).find('.icon-photo-inner-inner-new-circle').addClass('icon-photo-inner-inner-move');
                        $(this).find('.icon-photo-inner-inner-grow-circle').addClass('icon-photo-inner-inner-grow');
                    }
                }, function(e){
                    if (!$(this).hasClass('player-icon-selected')) {
                        $(this).addClass('icon-player-hover-out');
                        $(this).find('.icon-photo-inner-inner-grow-circle').addClass('icon-photo-inner-inner-shrink');
                    }
                });

                $('#sub-menu > li').hover(function(e){
                    console.log("sub-menu li hover");
                    if (!$('.player-icon').hasClass('player-icon-selected')) {
                        $('.player-list-wrapper').css('display','block');
                        $('.team-list-bkg').css('display','block');
                    }
                }, function(){
                    //$('.player-list-wrapper').css('display','none');
                    $('.team-list-bkg').css('display','none');
                });

                $('.player-icon').click(function(e){
                    $('.page-main-content').css('display','none');
                    $('.basketball-card-wrapper').css('display','block');
                    
                    var jersey_num = $(this).attr('data-jersey');
                    console.log("jersey_num: " + jersey_num);

                    $('.player-icon').prev().prev().css('display','none');
                    $('.player-icon').removeClass('player-icon-selected');
                    $('.icon-photo-inner-inner-grow-circle').removeClass('player-grow-selected');

                    $(this).prev().prev().css('display','block');
                    $(this).removeClass('icon-player-hover');
                    $(this).find('.icon-photo-inner-inner-grow-circle').removeClass('icon-photo-inner-inner-grow');
                    $(this).addClass('player-icon-selected');
                    $(this).find('.icon-photo-inner-inner-grow-circle').addClass('player-grow-selected');

                    $('#sub-menu').css('display','block');
                    $('.player-list-wrapper').css('display','block');
                    $('.team-list-bkg').css('display','none');
                    $('#teams').addClass('selected');
                    $('#sophomore').addClass('selected');

                    $.get("/game_player_data", 
                    {
                        jersey_id: jersey_num
                    }).done(function(data){
                        //console.log("GAME DATA: " + JSON.stringify(data));
                        $('.basketball-inner').addClass('basketball-card-trans-out');
                        $('.basketball-inner').addClass('current-card');
                        for (var m = 0; m < data.game_player_data.length; m++) {
                            for (var n = 0; n < data.game_dates.length; n++) {
                                if (data.game_player_data[m].game_info_id == data.game_dates[n].game_info_id) {
                                    var newGameTime = moment(data.game_dates[n].date_time);
                                    data.game_player_data[m].date_time = newGameTime.format("MM/D/YY");
                                }
                            }
                        }

                        var source2   = $("#basketball-card-template").html();
                        var template2 = Handlebars.compile(source2);
                        
                        var html2    = template2(data);
                        //$('.basketball-card-wrapper').html("");
                        $('.basketball-card-wrapper').append(html2);

                        var source1   = $("#player-game-row").html();
                        var template1 = Handlebars.compile(source1);
                        
                        var html1    = template1(data);
                        //console.log("html1: " + html1);
                        $('.stats-table[data-jersey-number="'+jersey_num+'"]').html("");
                        $('.stats-table[data-jersey-number="'+jersey_num+'"]').html(html1);

                        var source3   = $("#player-games-totals").html();
                        var template3 = Handlebars.compile(source3);
                        
                        var html3    = template3(data.player_totals);
                        //console.log("html3: " + html3);

                        $('.stats-table[data-jersey-number="'+jersey_num+'"]').find('tr:last-of-type').after(html3);

                        var source4   = $("#player-games-avgs").html();
                        var template4 = Handlebars.compile(source4);
                        
                        var html4    = template4(data.player_avgs);
                        //console.log("html4: " + html4);

                        $('.stats-table[data-jersey-number="'+jersey_num+'"]').find('tr:last-of-type').after(html4);

                        //$('.basketball-inner').addClass('basketball-card-trans-out');
                        //if ($('.basketball-inner').hasClass('basketball-card-trans-in')) {
                            //$('.basketball-card-trans-in').addClass('basketball-card-trans-out');
                        var transOutEl = $('.basketball-card-trans-out');
                        //console.log("delayFlipIn 2000")
                        setTimeout(function(){ delayFlipIn(jersey_num, transOutEl) }, 300);
                        //} else {
                        //    setTimeout(function(){ delayFlipIn(jersey_num, transOutEl) }, 1000);
                        //}
                        $(".basketball-inner.basketball-card-trans-out").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                        function() {
                            console.log("done trans out");
                            $(this).find('.basketball-card').removeClass('flipped');
                        }
                    );
                      });
                });

                function delayFlipIn (jersey_num, transOutEl) {
                    console.log("delayFlipIn");
                    if (typeof transOutEl != 'undefined') {
                        transOutEl.removeClass('basketball-card-trans-in');
                        transOutEl.removeClass('basketball-card-trans-out');
                    }
                    $('.current-card').remove();
                    
                    $('.basketball-inner[data-jersey="'+jersey_num+'"]').addClass('basketball-card-trans-in');
                    $('.basketball-inner').find('.full-photo-item').first().css('display','block');
                    $('.basketball-inner').find('.card-media-item').first().addClass('selected');

                    var winWidth = $(window).width();

                    if (winWidth < 890) {
                        $('.full-photo-item').each(function(i){
                            if ($(this).hasClass('width-photo')) {
                                $(this).css('width','362px');
                            } else if ($(this).hasClass('height-photo')) {
                                $(this).css('height','205px');
                            }
                        });
                    }

                    console.log("winWidth: " + winWidth);
                    if (winWidth < 400) {
                        $('.full-photo-item').each(function(i){
                            if ($(this).hasClass('width-photo')) {
                                $(this).css('width','282px');
                            } else if ($(this).hasClass('height-photo')) {
                                $(this).css('height','182px');
                            }
                        });
                    } else if (winWidth > 400 && winWidth < 890) {
                        $('.full-photo-item').each(function(i){
                            if ($(this).hasClass('width-photo')) {
                                $(this).css('width','362px');
                            } else if ($(this).hasClass('height-photo')) {
                                $(this).css('height','205px');
                            }
                        });
                    }


                    $(".basketball-card-back").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                        function() {
                            console.log("done flipping");
                            var playerId = $(this).attr("data-player-id");
                            $('.basketball-card-back[data-player-id="'+playerId+'"]').css('visibility','visible');
                            $('.stats-table-header').css('visibility','visible');
                            $('.stats-table-wrapper').css('visibility','visible');
                            $('.player-stats-avgs').css('display','none');
                        }
                    );
                    //$('.basketball-inner').addClass('basketball-card-trans-in');
                }

                $(document).on('click','.card-media-item',function(e){
                    $('.card-media-item').removeClass('selected');
                    $(this).addClass('selected');
                    var playerId = $(this).attr("data-player-id");
                    var mediaId = $(this).attr("data-media-id");
                    console.log("playerId: " + playerId);
                    console.log("mediaId: " + mediaId);

                    if ($(this).attr("data-media-type") == "photo") {
                        $('.full-photo-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-photo-item[data-player-id="'+playerId+'"][data-media-id="'+mediaId+'"]').css('display','block');
                        $('.card-logo-bug').css('opacity','1');
                        $('.card-first-name').css('opacity','1');
                        $('.card-last-name').css('opacity','1');
                    } else {
                        $('.card-logo-bug').css('opacity','0');
                        $('.card-first-name').css('opacity','.4');
                        $('.card-last-name').css('opacity','.4');
                        $('.full-photo-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"][data-media-id="'+mediaId+'"]').css('display','block');
                    }
                });

                $('.card-media-items').each(function(e){
                    $(this).find('.card-media-item').first().addClass("selected");
                    var firstType = $(this).find('.card-media-item').first().attr("data-media-type");
                    var mediaId = $(this).find('.card-media-item').first().attr("data-media-id");
                    var playerId = $(this).find('.card-media-item').first().attr("data-player-id");

                    if (firstType == "photo") {
                        $('.full-photo-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-photo-item[data-player-id="'+playerId+'"][data-media-id="'+mediaId+'"]').css('display','block');
                    } else {
                        $('.full-photo-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"]').css('display','none');
                        $('.full-video-item[data-player-id="'+playerId+'"][data-media-id="'+mediaId+'"]').css('display','block');
                    }
                });

                var queryString = window.location.search;
                var queryData;
                console.log("queryString: " + queryString);
                if (queryString != "") {
                    queryData = queryString.split('=');
                    console.log("queryData[0]: " + queryData[0]);
                    if (queryData[0] == "?player") {
                        console.log("queryData[1]: " + queryData[1]);
                        $('.player-icon[data-player-id="'+queryData[1]+'"]').trigger('click');
                    }
                }

    /* Responsive code */

    $( window ).resize(function() {
      var windowWidth = $(window).width();
      console.log("window width: " + windowWidth);
      var diffWidth = 1101 - windowWidth;
      var newPlayerListWidth = 854 - diffWidth;
      var subMenuWidth = 841 - diffWidth;
      if (windowWidth < 1101) {
        console.log("player-list-wrapper width: " + newPlayerListWidth);
        $('.player-list-wrapper').css('width', newPlayerListWidth);
        $('#sub-menu').css('width', windowWidth);
        $('.basketball-card-main-content').css('width',windowWidth-246);
        $('.page-main-content').css('width', windowWidth-286);
      } else if (windowWidth > 1101) {
        console.log("player-list-wrapper width: " + newPlayerListWidth);
        $('.player-list-wrapper').css('width', '854px');
        $('#sub-menu').css('width', '841px');
        $('.basketball-card-main-content').css('width','77%');
        $('.page-main-content').css('width', '770px');
      }

      if (windowWidth < 890) {
            $('.full-photo-item').each(function(i){
                if ($(this).hasClass('width-photo')) {
                    $(this).css('width','362px');
                } else if ($(this).hasClass('height-photo')) {
                    $(this).css('height','205px');
                }
            });
        } else if (windowWidth > 890) {
            $('.full-photo-item').each(function(i){
                if ($(this).hasClass('width-photo')) {
                    $(this).css('width','464px');
                } else if ($(this).hasClass('height-photo')) {
                    $(this).css('height','327px');
                }
            });
        }

      if (windowWidth < 760) {
            $('.page-main-content').css('width', windowWidth-40);
            $('.player-list-wrapper').css('width', windowWidth);
            $('#live-updates-content').css('height', '300px');
            $('#live-updates-content  > .scrollbar').css('height', '300px');
            $('#live-updates-content  > .scrollbar > .track').css('height', '300px');
            $('#live-updates-content > .viewport').css('height', '300px');
            //$('#live-updates-content').update();
        } else if (windowWidth > 760 && windowWidth < 1101) {
            $('.player-list-wrapper').css('width', newPlayerListWidth);
            $('.page-main-content').css('width', windowWidth-286);
            $('#live-updates-content').css('height', '770px');
            $('#live-updates-content  > .scrollbar').css('height', '770px');
            $('#live-updates-content  > .scrollbar > .track').css('height', '770px');
            $('#live-updates-content > .viewport').css('height', '770px');
            //$('#live-updates-content').update();
        }
    });

      var winWidth = $(window).width();
      console.log("winWidth: " + winWidth);

        if (winWidth < 1101) {
            var diffWidth = 1101 - winWidth;
            var newPlayerListWidth = 854 - diffWidth;
            var subMenuWidth = 841 - diffWidth;

            $('.player-list-wrapper').css('width', newPlayerListWidth);
            $('#sub-menu').css('width', winWidth);
            $('.basketball-card-main-content').css('width',winWidth-246);
            console.log("$('.full-photo-item').length: " + $('.full-photo-item').length);
            $('.page-main-content').css('width', winWidth-286);
        }

        if (winWidth < 760) {
            $('.page-main-content').css('width', winWidth-40);
            $('.player-list-wrapper').css('width', winWidth);
            $('#live-updates-content').css('height', '300px');
            $('#live-updates-content  > .scrollbar').css('height', '300px');
            $('#live-updates-content > .viewport').css('height', '300px');
            //$('#live-updates-content').update();
        }


});