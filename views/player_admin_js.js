        <script>
            $(document).ready(function() {

                $("#tabs").tabs({create: function( event, ui ) {
                    $("#tabs").removeClass('hide');
                   }
                });

                $('select[name=media_type]').change(function(e){
                    if ($(this).val() == "photo") {
                        $(this).parent().parent().find('.photo-items').css('display','block');
                        $(this).parent().parent().find('.video-items').css('display','none');
                    } else {
                        $(this).parent().parent().find('.photo-items').css('display','none');
                        $(this).parent().parent().find('.video-items').css('display','block');
                    }
                });

                $('.media-item-form').submit(function() {
                    e.preventDefault();
                    var add_media_row = $(this).parent().parent();
                    $(this).ajaxSubmit({
                        error: function(xhr) {
                                console.log('Error: ' + xhr.status);
                        },

                        success: function(data) {
                            //console.log("response: " + response.exists);
                            //if (response.upload == "success") {

                                console.log("uploaded box score!");
                                var source1   = $("#media-row-template").html();
                                var template1 = Handlebars.compile(source1);
                                
                                var html1    = template1(data);
                                add_media_row.before(html1);
                                $('input[name="media_photo"]').val('');
                                //document.location.assign("/admin?tab=game");
                            //}
                        }
                    });
                    return false;
                });

                $('.add-media-item').click(function(e){
                    e.preventDefault();
                    var add_media_row = $(this).parent().parent().parent().parent().parent().parent().parent();
                    $.post("/add_media_item", 
                        {
                            media_url: add_media_row.find("input[name=media_url]").val(),
                            media_type: add_media_row.find("select[name=media_type]").val(),
                            player_id: $(this).attr("data-id"),
                            user_type: "player",
                            team: $(this).attr('data-team')
                        }).done(function(data){
                            var source1   = $("#media-row-template").html();
                            var template1 = Handlebars.compile(source1);
                            
                            var html1    = template1(data);
                            add_media_row.before(html1);
                            $('input[name="media_url"]').val('');
                        });
                });

                $('.delete-media-item').click(function(e){
                    e.preventDefault();
                    var mediaId = $(this).attr('data-media-id');
                    var mediaTeamId = $(this).attr('data-team');
                    $.post("/delete_media_item", 
                        {
                            media_id: $(this).attr('data-media-id'),
                            team: mediaTeamId,
                            user_type: "player"
                        }).done(function(data){
                            $('.media-item-row[data-media-id="'+mediaId+'"]').remove();
                        });
                });

                $('.cancel-button').click(function(e){
                    console.log("");
                    $(this).parent().parent().dialog("close");
                });

                $('.player-media').click(function(e){
                    if (!$(this).hasClass("is-open")) {
                        var media_items = $(this).parent().parent().next();
                        media_items.find('.media-items-table').slideDown();
                        $(this).addClass("is-open");
                        $(this).html("HIDE");
                    } else {
                        var media_items = $(this).parent().parent().next();
                        media_items.find('.media-items-table').slideUp();
                        $(this).removeClass("is-open");
                        $(this).html("VIEW");
                    }
                });

                $('.box-upload').click(function(e){
                    $('.modal-background').css('display','block');
                    $( "#dialog" ).dialog({
                        close: function( event, ui ) { $('.modal-background').css('display','none'); }
                    });
                    $('input[name="game_upload_id"]').val($(this).attr('data-id'));
                });

                $('.box-delete').click(function(e){
                    $('.modal-background').css('display','block');
                    $( "#dialog-delete-box-score" ).dialog({
                        close: function( event, ui ) { $('.modal-background').css('display','none'); }
                    });
                    $('input[name="delete_box_game_id"]').val($(this).attr('data-id'));
                });

                $('.game-delete').click(function(e){
                    $('.modal-background').css('display','block');
                    $( "#dialog-delete-game" ).dialog({
                        close: function( event, ui ) { $('.modal-background').css('display','none'); }
                    });
                    $('input[name="delete_game_id"]').val($(this).attr('data-id'));
                    $('input[name="delete_game_id_team"]').val($(this).attr('data-team'));
                });

                $('.player-delete').click(function(e){
                    $('.modal-background').css('display','block');
                    $( "#dialog-delete-player" ).dialog({
                        close: function( event, ui ) { $('.modal-background').css('display','none'); }
                    });
                    $('input[name="delete_player_id"]').val($(this).attr('data-id'));
                    $('input[name="delete_player_id_team"]').val($(this).attr('data-team'));
                });

                $('#delete-box-score-button').click(function(e){
                    $.post("/delete_box_score", 
                        {
                            game_id: $('input[name="delete_box_game_id"]').val()
                        }).done(function(data){
                            document.location.assign("/admin?tab=game");
                        });
                });

                $('#delete-game-button').click(function(e){
                    $.post("/delete_game", 
                        {
                            game_id: $('input[name="delete_game_id"]').val(),
                            team: $('input[name="delete_game_id_team"]').val()
                        }).done(function(data){
                            //document.location.assign("/admin?tab=game");
                        });
                });

                $('#delete-player-button').click(function(e){
                    $.post("/delete_player", 
                        {
                            player_id: $('input[name="delete_player_id"]').val(),
                            team: $('input[name="delete_player_id_team"]').val()
                        }).done(function(data){
                            document.location.assign("/admin?tab=player");
                        });
                });

                $('#add-player-button').click(function(e){
                    $.post("/add_player", 
                        {
                            jersey_number: $('input[name="jersey_number"]').val(),
                            first_name: $('input[name="first_name"]').val(),
                            last_name: $('input[name="last_name"]').val(),
                            position: $('input[name="position"]').val(),
                            team: $('select[name="team"]').val(),
                            email: $('input[name="email"]').val()
                        }).done(function(data){
                            console.log("add player: " + data.player_insert);
                            document.location.assign("/admin?tab=player");
                        });
                });

                $('#upload-box-score-form').submit(function() {
                    $(this).ajaxSubmit({
                        error: function(xhr) {
                                console.log('Error: ' + xhr.status);
                        },

                        success: function(response) {
                            console.log("response: " + response.exists);
                            if (response.upload == "success") {
                                console.log("uploaded box score!");
                                document.location.assign("/admin?tab=game");
                            }
                        }
                    });
                    return false;
                });

                $('#uploadForm').submit(function() {
                    $('.game-exists-msg').css('display','none');
                    $(this).ajaxSubmit({
                        error: function(xhr) {
                                console.log('Error: ' + xhr.status);
                        },

                        success: function(response) {
                            console.log("response: " + response.exists);
                            if (response.exists == "true") {
                                $('.game-exists-msg').css('display','block');
                            } else {
                                document.location.assign("/admin?tab=game");
                            }
                        }
                    });
                    return false;
                });

                var queryString = window.location.search;
                var queryData;
                console.log("queryString: " + queryString);
                if (queryString != "") {
                    queryData = queryString.split('=');
                    if (queryData[1] == "game") {
                        $("#tabs").tabs("option", "active", 1);
                    } else if (queryData[1] == "player") {
                        $("#tabs").tabs("option", "active", 2);
                    }
                }

                $('.box-view').click(function(e){
                    var game_data;

                    $.get("/game_data", { game_id: $(this).attr('data-id')}).done(
                        function(data) {
                            console.log("box_score.length: " + data.box_score.length);
                            game_data = data;
                            var source1   = $("#boxscore-template").html();
                            var template1 = Handlebars.compile(source1);
                            
                            console.log("game_data: " + JSON.stringify(game_data));
                            var html1    = template1(game_data);
                            $('.box-score-wrapper').html("");
                            $('.box-score-wrapper').append(html1);
                        }
                    );
                    //var data = { gameDate: "5515", gameTime: "This is my first post!" };
                    
                });

                $("#datepicker").datepicker({
                    showOn: "both", 
                    buttonText: "<i class='fa fa-calendar'></i>"
                });
                $("#timepicker").timepicker({
                    timeFormat: 'h:mm p',
                    interval: 15, // 15 minutes
                    scrollbar: true
                });                

            });
        </script>