var express = require('express');
var lbl = require('line-by-line');
var moment = require('moment');
var Twitter = require('twitter');
var generatePassword = require('password-generator');
var bCrypt = require('bcrypt-nodejs');
var sizeOf = require('image-size');
var nodemailer = require('nodemailer');
var router = express.Router();

String.prototype.capitalize = function(){
            return this.toLowerCase().replace( /\b\w/g, function (m) {
                return m.toUpperCase();
            });
        };

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
		console.log("isAuth:req.body: " + JSON.stringify(req.body));
		return next();
	} else {
		if (req.xhr) {
			res.status(401).json({ error: 'Not Authorized' })
		} else {
			res.redirect('/login');	
		}
	}
}

var isNotAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (!req.isAuthenticated())
		return next();
	else
		res.redirect('/admin');
}

var beautifyDatetime = function (date_time) {
	return moment(date_time).format("MM/D/YYYY h:mm a");
}

module.exports = function(passport) {
	/*router.get('/login', function(req, res, next) {
		res.render('login');
	});*/

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register');
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/admin',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	router.get('/login', isNotAuthenticated, function(req, res) {
    	// Display the Login page with any flash message, if any
    	//console.log("render /login");
		res.render('login');
	});

	/* GET Home Page */
	/*router.get('/admin', isAuthenticated, function(req, res){
		res.render('admin', { user: req.user });
	});*/

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	/* GET home page. */
	router.get('/', function(req, res, next) {
		console.log("in get /");
		console.log("req.xhr: " + req.xhr);
		var db = req.connection;
		var games_list, players_list;
		console.log("in get /: " + db);

		db.query("SELECT * FROM game_info", function(err, results){
			console.log("1res render index");
	          console.log("game_info:result: " + JSON.stringify(results));
	          for (var j = 0; j < results.length; j++) {
	          	var gameDateTime = moment(results[j].date_time);
	          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
	          	results[j].game_time = gameDateTime.format("h:mm a");
	          	console.log("results[j].has_box: " + results[j].has_box);
	          	if (results[j].has_box) {
	          		results[j].box_exists = "true";
	          	} else {
	          		results[j].box_exists = "false";
	          	}
	          }
	          games_list = results;
	          db.query("SELECT * FROM players ORDER BY jersey_number ASC", function(err, results1){
	          	db.query("SELECT * FROM media", function(err2, results2){
	          		console.log("res render index");
	          		res.render('index', {games: games_list, players: results1, media_items: results2});
	          	});
	          });
	    });
	});

	router.get('/schedule', function(req, res, next) {
		console.log("in get /");
		console.log("req.xhr: " + req.xhr);
		var db = req.connection;
		var games_list, players_list;
		console.log("in get /: " + db);

		db.query("SELECT * FROM game_info", function(err, results){
			console.log("1res render index");
	          console.log("game_info:result: " + JSON.stringify(results));
	          for (var j = 0; j < results.length; j++) {
	          	var gameDateTime = moment(results[j].date_time);
	          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
	          	results[j].game_time = gameDateTime.format("h:mm a");
	          	console.log("results[j].has_box: " + results[j].has_box);
	          	if (results[j].has_box) {
	          		results[j].box_exists = "true";
	          	} else {
	          		results[j].box_exists = "false";
	          	}
	          }
	          games_list = results;
	          db.query("SELECT * FROM players ORDER BY jersey_number ASC", function(err, results1){
	          	db.query("SELECT * FROM media", function(err2, results2){
	          		console.log("res render index");
	          		res.render('schedule', {games: games_list, players: results1, media_items: results2});
	          	});
	          });
	    });
	});

	router.get('/contactus', function(req, res, next) {
		console.log("in get /");
		console.log("req.xhr: " + req.xhr);
		var db = req.connection;
		var games_list, players_list;
		console.log("in get /: " + db);

		db.query("SELECT * FROM game_info", function(err, results){
			console.log("1res render index");
	          console.log("game_info:result: " + JSON.stringify(results));
	          for (var j = 0; j < results.length; j++) {
	          	var gameDateTime = moment(results[j].date_time);
	          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
	          	results[j].game_time = gameDateTime.format("h:mm a");
	          	console.log("results[j].has_box: " + results[j].has_box);
	          	if (results[j].has_box) {
	          		results[j].box_exists = "true";
	          	} else {
	          		results[j].box_exists = "false";
	          	}
	          }
	          games_list = results;
	          db.query("SELECT * FROM players ORDER BY jersey_number ASC", function(err, results1){
	          	db.query("SELECT * FROM media", function(err2, results2){
	          		console.log("res render index");
	          		res.render('contactus', {games: games_list, players: results1, media_items: results2});
	          	});
	          });
	    });
	});

	router.get('/tryouts', function(req, res, next) {
		console.log("in get /");
		console.log("req.xhr: " + req.xhr);
		var db = req.connection;
		var games_list, players_list;
		console.log("in get /: " + db);

		db.query("SELECT * FROM game_info", function(err, results){
			console.log("1res render index");
	          console.log("game_info:result: " + JSON.stringify(results));
	          for (var j = 0; j < results.length; j++) {
	          	var gameDateTime = moment(results[j].date_time);
	          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
	          	results[j].game_time = gameDateTime.format("h:mm a");
	          	console.log("results[j].has_box: " + results[j].has_box);
	          	if (results[j].has_box) {
	          		results[j].box_exists = "true";
	          	} else {
	          		results[j].box_exists = "false";
	          	}
	          }
	          games_list = results;
	          db.query("SELECT * FROM players ORDER BY jersey_number ASC", function(err, results1){
	          	db.query("SELECT * FROM media", function(err2, results2){
	          		console.log("res render index");
	          		res.render('tryouts', {games: games_list, players: results1, media_items: results2});
	          	});
	          });
	    });
	});

	router.get('/blog', function(req, res, next) {
		console.log("in get /");
		console.log("req.xhr: " + req.xhr);
		var db = req.connection;
		var games_list, players_list;
		console.log("in get /: " + db);

		db.query("SELECT * FROM game_info", function(err, results){
			console.log("1res render index");
	          console.log("game_info:result: " + JSON.stringify(results));
	          for (var j = 0; j < results.length; j++) {
	          	var gameDateTime = moment(results[j].date_time);
	          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
	          	results[j].game_time = gameDateTime.format("h:mm a");
	          	console.log("results[j].has_box: " + results[j].has_box);
	          	if (results[j].has_box) {
	          		results[j].box_exists = "true";
	          	} else {
	          		results[j].box_exists = "false";
	          	}
	          }
	          games_list = results;
	          db.query("SELECT * FROM players ORDER BY jersey_number ASC", function(err, results1){
	          	db.query("SELECT * FROM media", function(err2, results2){
	          		db.query("SELECT * FROM blog", function(err3, results3){
		        		res.render('blog', {games: games_list, players: results1, media_items: results2, blog: results3});
	          		});
	          	});
	          });
	    });
	});

	router.post('/get_blog', isAuthenticated, function(req, res, next) {
		if (req.body.blog_id) {var blog_id = req.body.blog_id;} else {var blog_id = 0;}
		var db = req.connection;

		db.query("SELECT * FROM blog WHERE blog_entry_id = '"+blog_id+"'", function(err, results){
			res.json({blog: results});
	    });
	});

	router.get('/admin', isAuthenticated, function(req, res, next) {
		var db = req.connection;
		var games_list, players_list;

		console.log("req.user.role: " + req.user.role);

		if (req.user.role == "player") {
			console.log("in role is player");
			db.query("SELECT * FROM game_info", function(err, results){
		          console.log("game_info:result: " + JSON.stringify(results));
		          for (var j = 0; j < results.length; j++) {
		          	var gameDateTime = moment(results[j].date_time);
		          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
		          	results[j].game_time = gameDateTime.format("h:mm a");
		          	console.log("results[j].has_box: " + results[j].has_box);
		          	if (results[j].has_box) {
		          		results[j].box_exists = "true";
		          	} else {
		          		results[j].box_exists = "false";
		          	}
		          }
		          games_list = results;
		          db.query("SELECT * FROM players WHERE player_id = '" + req.user.player_id + "'", function(err, results1){
		          	db.query("SELECT * FROM media WHERE player_id = '" + req.user.player_id + "'", function(err2, results2){
		          		res.render('player_admin', {players: results1, media_items: results2});
		          	});
		          });
		    });
		} else {
			console.log("coaches admin");
			db.query("SELECT * FROM game_info", function(err, results){
		          //console.log("game_info:result: " + JSON.stringify(results));
		          for (var j = 0; j < results.length; j++) {
		          	var gameDateTime = moment(results[j].date_time);
		          	results[j].game_date = gameDateTime.format("MM/D/YYYY");
		          	results[j].game_time = gameDateTime.format("h:mm a");
		          	console.log("results[j].has_box: " + results[j].has_box);
		          	if (results[j].has_box) {
		          		results[j].box_exists = "true";
		          	} else {
		          		results[j].box_exists = "false";
		          	}
		          }
		          games_list = results;
		          db.query("SELECT * FROM players ORDER BY last_name DESC", function(err, results1){
		          	db.query("SELECT * FROM media", function(err2, results2){
		          		db.query("SELECT * FROM blog", function(err3, results3){
		          			res.render('admin', {games: games_list, players: results1, media_items: results2, blog: results3});
		          		});
		          	});
		          });
		    });
		}
		
	});

	router.get('/live_updates', function(req, res, next) {

		//console.log("req.xhr: " + req.xhr);
		
		var tweets_json;

		var client = new Twitter({
		  consumer_key: 'dEbgTZsTk2CUXILiKOZOMD0n3',
		  consumer_secret: 'mEwyVo8lCp6wHXCxD7iPqoYt3qWeonAlBXezC2sMxqEqdbeYp1',
		  access_token_key: '3231235800-t0EkIc2Xr4suTKAKtSnG8ks2Wiz79NHvJLkpBEM',
		  access_token_secret: 'NZgVxv6UZ49knsdt98BD4KUg583gRkg1waxq6baTPZDLC'
		});
		 
		var params = {screen_name: 'wisconsinhavoc', count: '5'};
		var live_updates_items = [];
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  //console.log("Get tweets:error: " + error);
		  if (!error) {
		    //console.log("Tweets: " + JSON.stringify(tweets));
		    tweets_json = tweets;

		    //console.log("tweets_json.length: " + tweets_json.length);

		    var twitter_screen_name = tweets_json[0].user.name;
		    var twitter_name = tweets_json[0].user.screen_name;
		    var twitter_icon_src = tweets_json[0].user.profile_image_url;

		    for (var i = 0; i < tweets_json.length; i++) {
		    	//console.log("tweets_json[i].text: " + tweets_json[i].text);
		    	var live_update_item = {};
		    	live_update_item.date_time = beautifyDatetime(tweets_json[i].created_at);
		    	live_update_item.item_type = "tweet";

				//console.log("1.tweets_json[i].text: " + tweets_json[i].text);
		    	tweets_json[i].text = tweets_json[i].text.replace("&amp;", "&");
				    	
		    	var tweet_obj = {};
		    	//console.log("tweet media: " + tweets_json[i].entities.media);
		    	if (typeof tweets_json[i].entities.media != 'undefined') {
			    	for (var j = 0; j < tweets_json[i].entities.media.length; j++) {
				    	var url = tweets_json[i].entities.media[j].url;
				    	var media_url = tweets_json[i].entities.media[j].media_url;

				    	//tweets_json[i].text = tweets_json[i].text.replace("&amp;amp;", "");
				    	tweets_json[i].text = tweets_json[i].text.replace(url, "");
				    	tweet_obj.url = url;
				    	tweet_obj.media_url = media_url;
				    }
				}

		    	tweet_obj.msg = tweets_json[i].text;

		    	live_update_item.item_obj = tweet_obj;
		    	
		    	live_updates_items.push(live_update_item);
		    }

		    console.log("in live_updates");

		    var db = req.connection;
			db.query("SELECT * FROM activity_log ORDER BY date_time DESC LIMIT 5", function(err, results1){
				for (var i = 0; i < results1.length; i++) {
			    	var live_update_item = {};
			    	live_update_item.date_time = beautifyDatetime(results1[i].date_time);
			    	live_update_item.item_type = "activity";
			    	var activity_obj = {};
			    	activity_obj.username = results1[i].user;
			    	activity_obj.first_name = results1[i].first_name;
			    	activity_obj.last_name = results1[i].last_name;
			    	activity_obj.team = results1[i].team;
			    	activity_obj.action = results1[i].action;
			    	activity_obj.table_changed = results1[i].table_changed;
			    	activity_obj.player_id = results1[i].player_id;
			    	activity_obj.record_id = results1[i].record_id;
			    	live_update_item.item_obj = activity_obj;
			    	live_updates_items.push(live_update_item);
			    }

			    live_updates_items.sort(function (a, b) {
				  if (moment(a.date_time) > moment(b.date_time)) {
				    return -1;
				  }
				  if (moment(a.date_time) < moment(b.date_time)) {
				    return 1;
				  }
				  // a must be equal to b
				  return 0;
				});

				res.json({live_update_items: live_updates_items, twitter_name: twitter_name, twitter_screen_name: twitter_screen_name, twitter_icon_src: twitter_icon_src});
			});
		  }
		});
	});

	router.get('/game_calendar', function(req, res, next) {
		
		if (req.query.team) {var team = req.query.team;} else {var team = 0;}
		var db = req.connection;
		db.query("SELECT * FROM game_info WHERE team = '" + team + "'", function(err, results1){
			var game_calendar = [];
			for (var g = 0; g < results1.length; g++) {
				game_calendar_item = {};
				if (results1[g].has_box == 1) {
					game_calendar_item.title = results1[g].opponent + ' ' + results1[g].havoc_score + '-' + results1[g].opponent_score + ' ' + results1[g].game_result;
				} else {
					game_calendar_item.title = results1[g].opponent;
				}
				game_calendar_item.start = moment(results1[g].date_time).format();
				game_calendar_item.data_id = results1[g].game_info_id;
				game_calendar.push(game_calendar_item);
			}
			console.log(game_calendar);
			res.json(game_calendar);
		});

	});

	router.get('/game_data', function(req, res, next) {
		var box_score = [];
		
		if (req.query.game_id) {var game_id = req.query.game_id;} else {var game_id = 0;}
		var db = req.connection;
		db.query("SELECT * FROM players", function(err, results){
			db.query("SELECT * FROM game_lines WHERE game_info_id = '" + game_id + "'", function(err, results1){

		          for (var j = 0; j < results.length; j++) {
		          	for (var k = 0; k < results1.length; k++) {
		          		if (results[j].jersey_number == results1[k].Jersey) {
		          			results1[k].first_name = results[j].first_name;
		          			results1[k].last_name = results[j].last_name;
		          		}
		          	}
		          }
		          res.json({box_score: results1});
		    });
		});
	});

	router.get('/game_and_box_data', function(req, res, next) {
		var box_score = [];
		
		if (req.query.game_id) {var game_id = req.query.game_id;} else {var game_id = 0;}
		if (req.query.team) {var team = req.query.team;} else {var team = 0;}
		var db = req.connection;
		db.query("SELECT * FROM players WHERE team = '"+team+"'", function(err, results){
			db.query("SELECT * FROM game_lines WHERE game_info_id = '" + game_id + "'", function(err, results1){

		          for (var j = 0; j < results.length; j++) {
		          	for (var k = 0; k < results1.length; k++) {
		          		if (results[j].jersey_number == results1[k].Jersey) {
		          			results1[k].first_name = results[j].first_name;
		          			results1[k].last_name = results[j].last_name;
		          		}
		          	}
		          }
		          db.query("SELECT * FROM game_info WHERE game_info_id = '" + game_id + "'", function(err, results2){
		          	var formattedDate = moment(results2[0].date_time).format('M/D/YYYY h:mm a');
		          	results2[0].date_time = formattedDate;
		          	console.log("has_box: " + results2[0].has_box);
		          	res.json({box_score: results1, game_info: results2, has_box: results2[0].has_box});
		          });
		          
		    });
		});
	});

	function roundToTwo(num) {    
	    return +(Math.round(num + "e+2")  + "e-2");
	}

	router.get('/game_player_data', function(req, res, next) {

		if (req.query.jersey_id) {var jersey_id = req.query.jersey_id;} else {var jersey_id = 0;}
		if (req.query.team) {var team = req.query.team;} else {var team = "";}
		var db = req.connection;
		var team_games = [];

		db.query("SELECT * FROM game_info WHERE team = '" + team + "'", function(err, results10){
			console.log("team: " + team);
			console.log("results10.length: " + results10.length);
			for (var j = 0; j < results10.length; j++) {
				team_games[j] = results10[j].game_info_id;
			}

			console.log("team_games: " + JSON.stringify(team_games));

			db.query("SELECT * FROM game_lines WHERE jersey = '" + jersey_id + "'", function(err, results1){
				  
					  var teamFilteredResults = [];

					  for (var k = 0; k < team_games.length; k++) {
					  	for (var m = 0; m < results1.length; m++) {
					  		console.log("team_games1: " + team_games[m]);
					  		console.log("results1[m].game_info_id: " + results1[m].game_info_id);
					  		if (team_games[k] == results1[m].game_info_id) {
					  			teamFilteredResults.push(results1[m]);
					  		}
					  	}
					  }

					  console.log("game_lines: " + JSON.stringify(teamFilteredResults));
					  player_totals = {};
					  player_totals.Points = 0;
					  player_totals.TwoPointsMade = 0;
					  player_totals.TwoPointAttempts = 0;
					  player_totals.ThreePointsMade = 0;
					  player_totals.ThreePointAttempts = 0;
					  player_totals.FreeThrowsMade = 0;
					  player_totals.FreeThrowAttempts = 0;
					  player_totals.Assists = 0;
					  player_totals.OffensiveRebounds = 0;
					  player_totals.DefensiveRebounds = 0;
					  player_totals.Rebounds = 0;
					  player_totals.BlockedShots = 0;
					  player_totals.Steals = 0;
					  player_totals.Turnovers = 0;
					  player_totals.Charges = 0;
					  player_totals.PersonalFouls = 0;

					  var game_info_id_str = "";

				      for (var j = 0; j < teamFilteredResults.length; j++) {
				      	//game_info_id_array.push(results1[j]);
				      	  player_totals.Points += teamFilteredResults[j].Points;
				      	  player_totals.TwoPointsMade += teamFilteredResults[j].TwoPointsMade;
						  player_totals.TwoPointAttempts += teamFilteredResults[j].TwoPointAttempts;
						  player_totals.ThreePointsMade += teamFilteredResults[j].ThreePointsMade;
						  player_totals.ThreePointAttempts += teamFilteredResults[j].ThreePointAttempts;
						  player_totals.FreeThrowsMade += teamFilteredResults[j].FreeThrowsMade;
						  player_totals.FreeThrowAttempts += teamFilteredResults[j].FreeThrowAttempts;
						  player_totals.Assists += teamFilteredResults[j].Assists;
						  player_totals.OffensiveRebounds += teamFilteredResults[j].OffensiveRebounds;
						  player_totals.DefensiveRebounds += teamFilteredResults[j].DefensiveRebounds;
						  player_totals.Rebounds += teamFilteredResults[j].Rebounds;
						  player_totals.BlockedShots += teamFilteredResults[j].BlockedShots;
						  player_totals.Steals += teamFilteredResults[j].Steals;
						  player_totals.Turnovers += teamFilteredResults[j].Turnovers;
						  player_totals.Charges += teamFilteredResults[j].Charges;
						  player_totals.PersonalFouls += teamFilteredResults[j].PersonalFouls;
				      	if (j<(teamFilteredResults.length-1)) {
				      		game_info_id_str += "'"+teamFilteredResults[j].game_info_id+"',";
				      	} else {
				      		game_info_id_str += "'"+teamFilteredResults[j].game_info_id+"'";
				      	}
				      }

				      var num_games = teamFilteredResults.length;

					  player_avgs = {};
					  player_avgs.Points = roundToTwo(player_totals.Points / num_games);
					  player_avgs.TwoPointsMade = roundToTwo(player_totals.TwoPointsMade / num_games);
					  player_avgs.TwoPointAttempts = roundToTwo(player_totals.TwoPointAttempts / num_games);
					  player_avgs.ThreePointsMade = roundToTwo(player_totals.ThreePointsMade / num_games);
					  player_avgs.ThreePointAttempts = roundToTwo(player_totals.ThreePointAttempts / num_games);
					  player_avgs.FreeThrowsMade = roundToTwo(player_totals.FreeThrowsMade / num_games);
					  player_avgs.FreeThrowAttempts = roundToTwo(player_totals.FreeThrowAttempts / num_games);
					  player_avgs.Assists = roundToTwo(player_totals.Assists / num_games);
					  player_avgs.OffensiveRebounds = roundToTwo(player_totals.OffensiveRebounds / num_games);
					  player_avgs.DefensiveRebounds = roundToTwo(player_totals.DefensiveRebounds / num_games);
					  player_avgs.Rebounds = roundToTwo(player_totals.Rebounds / num_games);
					  player_avgs.BlockedShots = roundToTwo(player_totals.BlockedShots / num_games);
					  player_avgs.Steals = roundToTwo(player_totals.Steals / num_games);
					  player_avgs.Turnovers = roundToTwo(player_totals.Turnovers / num_games);
					  player_avgs.Charges = roundToTwo(player_totals.Charges / num_games);
					  player_avgs.PersonalFouls = roundToTwo(player_totals.PersonalFouls / num_games);


			      db.query("SELECT * FROM game_info WHERE game_info_id IN (" + game_info_id_str
			      	+ ")", function(err, results2){
			      	db.query("SELECT * FROM players WHERE jersey_number = '" + jersey_id + "' and team = '"+team+"'", function(err, results3){
			      		db.query("SELECT * FROM media WHERE player_id = '" + results3[0].player_id + "'", function(err, results4){
			      			for (var k = 0; k < results4.length; k++) {
			      				if (results4[k].media_type == "photo") {
				      				var dimensions = sizeOf('./public/'+results4[k].url);
				      				console.log("image size: w: " + dimensions.width + " h: " + dimensions.height);
				      				if (dimensions.width > dimensions.height) {
				      					results4[k].photo_dim = 'width';
				      					if (dimensions.width > 464) {
				      						results4[k].width = '464';
				      						results4[k].natHeight = dimensions.height;
				      					} else {
				      						results4[k].width = dimensions.width;
				      						results4[k].natHeight = dimensions.height;
				      					}
				      					var heightPercentage = dimensions.width / dimensions.height;
				      					var photoHeight = Math.ceil(464 / heightPercentage);
				      					results4[k].marginTop= Math.round((327 - photoHeight)/2);
				      				} else {
				      					results4[k].photo_dim = 'height';
				      					if (dimensions.height > 327) {
				      						results4[k].height = '327';
				      						results4[k].natWidth = dimensions.width;
				      					} else {
				      						results4[k].height = dimensions.height;
				      						results4[k].natWidth = dimensions.width;
				      					}
				      					var widthPercentage = dimensions.height / dimensions.width;
				      					var photoWidth = Math.ceil(327 / widthPercentage);
				      					console.log("photoWidth: " + photoWidth);
				      					results4[k].marginLeft = Math.round((464 - photoWidth)/2);
				      				}

				      				if (dimensions.width <= '464' && dimensions.height <= '327') {
				      					results4[k].photo_dim = 'none';
				      					console.log("sm:image size: w: " + dimensions.width + " h: " + dimensions.height);
				      					results4[k].width = dimensions.width;
				      					results4[k].height = dimensions.height;
				      					console.log("dimensions.height: " + dimensions.height);
				      					console.log("marginTop: " + (327 - dimensions.height)/2);
				      					results4[k].marginTop= Math.round((327 - dimensions.height)/2);
				      					results4[k].marginLeft = Math.round((464 - dimensions.width)/2);
				      				}
				      			}

			      			}

			      			res.json({game_player_data: teamFilteredResults, game_dates: results2, player_info: results3, media_items: results4, player_totals: player_totals, player_avgs: player_avgs});
			      		});
			      	});
			      });
			});

		});
		
	});

	router.post('/update_blog', isAuthenticated, function(req, res, next) {
		if (req.body.blog_id) {var blog_id = req.body.blog_id;} else {var blog_id = 0;}
		if (req.body.blog_title) {var blog_title = req.body.blog_title;} else {var blog_title = "";}
		if (req.body.blog_content) {var blog_content = req.body.blog_content;} else {var blog_content = "";}

		var db = req.connection;
		var rightNow = moment().format('YYYY-MM-DD HH:mm:ss');

		console.log("blog_id: " + blog_id);
		console.log("rightNow: " + rightNow);

		if (blog_id == 0) {
			db.query("INSERT INTO blog (blog_title, blog_media, blog_text, creation_date, edit_date) VALUES ('" 
				+ blog_title + "', '', '"+blog_content+"', '"+rightNow+"', '"+rightNow+"')", function(err, result){
				log_activity("admin", "insert", "blog", '0', 'none', result.insertId, req);
				res.json({update_blog:"success"});
		    });
		} else {
			db.query("UPDATE blog SET blog_title = '"+blog_title+"', blog_text = '"+blog_content+
				"', blog_media = '', edit_date = '"+rightNow+"' WHERE blog_entry_id = '" + blog_id + "'", function(err, result){
				log_activity("admin", "update", "blog", '0', 'none', result.insertId, req);
				res.json({update_blog:"success"});
		    });
		}
		
	});

	router.post('/blogs', isAuthenticated, function(req, res, next) {
		if (req.body.blog_id) {var blog_id = req.body.blog_id;} else {var blog_id = 0;}

		db.query("SELECT * FROM blog", function(err, result){
			res.json({blogs:result});
	    });
	});

	router.post('/delete_box_score', isAuthenticated, function(req, res, next) {
		if (req.body.game_id) {var game_id = req.body.game_id;} else {var game_id = 0;}

		var db = req.connection;
		db.query("DELETE FROM game_lines WHERE game_info_id = '" + game_id + "'", function(err, result){
	          console.log("err: " + err);
	          db.query("UPDATE game_info SET has_box = '0' WHERE game_info_id = '" + game_id + "'", function(err, result){
	          	//log_activity("none", "delete", "game_lines", "", game_id, req);
				res.json({box_score_delete:"success"});
	          });
	    });
	});

	router.post('/delete_game', isAuthenticated, function(req, res, next) {
		if (req.body.game_id) {var game_id = req.body.game_id;} else {var game_id = 0;}
		if (req.body.team) {var team = req.body.team;} else {var team = 0;}

		var db = req.connection;
		db.query("DELETE FROM game_lines WHERE game_info_id = '" + game_id + "'", function(err, result){
	          console.log("err: " + err);
	          db.query("DELETE FROM game_info WHERE game_info_id = '" + game_id + "'", function(err, result){
	          	log_activity("admin", "delete", "game_info", '0', team, game_id, req);
				res.json({game_delete:"success"});
	          });
	    });
	});

	router.post('/delete_player', isAuthenticated, function(req, res, next) {
		if (req.body.player_id) {var player_id = req.body.player_id;} else {var player_id = 0;}
		if (req.body.team) {var team = req.body.team;} else {var team = 0;}

		var db = req.connection;
		db.query("DELETE FROM players WHERE player_id = '" + player_id + "'", function(err, result){
			db.query("DELETE FROM users WHERE player_id = '" + player_id + "'", function(err, result){
	          res.json({player_delete:"success"});
	    	});
	    });
	});

	router.post('/add_player', isAuthenticated, function(req, res, next) {
		if (req.body.jersey_number) {var jersey_number = req.body.jersey_number;} else {var jersey_number = 0;}
		if (req.body.first_name) {var first_name = req.body.first_name;} else {var first_name = "";}
		if (req.body.last_name) {var last_name = req.body.last_name;} else {var last_name = "";}
		if (req.body.position) {var position = req.body.position;} else {var position = "";}
		if (req.body.team) {var team = req.body.team;} else {var team = "";}
		if (req.body.email) {var email = req.body.email;} else {var email = "";}
		if (req.body.school) {var school = req.body.school;} else {var school = "";}
		if (req.body.grad_year) {var grad_year = req.body.grad_year;} else {var grad_year = "";}
		if (req.body.youtube) {var youtube = req.body.youtube;} else {var youtube = "";}
		if (req.body.instagram) {var instagram = req.body.instagram;} else {var instagram = "";}
		if (req.body.twitter) {var twitter = req.body.twitter;} else {var twitter ="";}

		console.log("PLAYER TEAM: " + team);

		var db = req.connection;
		db.query("INSERT INTO players (jersey_number, first_name, last_name, email, high_school, grad_year, position, team, youtube, instagram, twitter) VALUES ('" + jersey_number + "','" + first_name + "', '" + last_name + "', '" + email + "', '" + school + "', '" + grad_year + "', '" + position + "', '" + team + "', '" + youtube + "', '" + instagram + "', '" + twitter + "')", function(err, result){
	          console.log("err: " + err);
	          console.log("insert success: " + result.insertId);
	          log_activity("admin", "insert", "players", '0', team, result.insertId, req);
	          // create account
	          createAccount(result.insertId, first_name, last_name, email, db, res);
	          //res.json({player_insert:"success"});
	    });
	});

	function createAccount (playerID, first_name, last_name, email, db, res) {
		var newPassword = generatePassword(12, false);
		var pwd = createHash(newPassword);
		var username = first_name.toLowerCase()+"_"+last_name.toLowerCase();
		db.query("INSERT INTO users (username, password, email, first_name, last_name, role, player_id) VALUES ('" + username + "','" + pwd + "', '" + email + "', '" + first_name.toLowerCase() + "', '" + last_name.toLowerCase() + "', 'player', '"+playerID+"')", function(err, result){
	          // console.log("err: " + err);
	          // send email with credentials to user
	          console.log("NEW PLAYER ACCOUNT: username: " + username + " - password: " + newPassword);
	        var email_content = "<h2>WisconsinHavoc.com Account Login Information</h2>";
	        email_content += "<h3>Hi " + first_name.capitalize() + ", </h3>";
			email_content += "<p>An account has been created for you on WisconsinHavoc.com!</p>";
			email_content += "<p>Go here <a href='http://localhost:3000/admin'>http://localhost:3000/admin</a> and log in using the credentials below to start managing your PlayerCard.</p>";
			email_content += "<p><strong>Username: </strong> " + username + "</p>";
			email_content += "<p><strong>Password: </strong> " + newPassword + "</p>";

			var text_content = "WisconsinHavoc.com Account Login Information\r\n\r\n";
			text_content += "Hi " + first_name.capitalize() + "\r\n\r\n";
			text_content += "An account has been created for you on WisconsinHavoc.com!\r\n\r\n";
			text_content += "Go here http://104.131.83.40:3000/admin and log in using the credentials below to start managing your PlayerCard.\r\n\r\n";
			text_content += "Username: " + username + "\r\n";
			text_content += "Password: " + newPassword + "\r\n\r\n";

			var transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			        user: 'wisconsinhavoc@gmail.com',
			        pass: '#Havoc2016'
			    }
			});

			var mailOptions = {
			    from: 'Contact Us <bryan.nolasco@wisconsinhavoc.com>', // sender address
			    to: email, // list of receivers
			    subject: 'Wisconsin Havoc New Account Information', // Subject line
			    text: text_content, // plaintext body
			    html: email_content // html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);

			});
	        res.json({player_insert:"success"});
	    });
	}

	// Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

	router.post('/add_media_item', isAuthenticated, function(req, res, next) {
		//if (req.body.media_order) {var media_order = req.body.media_order;} else {var media_order = 0;}
		if (req.body.media_url) {var media_url = req.body.media_url;} else {var media_url = 0;}
		if (req.body.media_type) {var media_type = req.body.media_type;} else {var media_type = 0;}
		if (req.body.player_id) {var player_id = req.body.player_id;} else {var player_id = 0;}
		if (req.body.user_type) {var user_type = req.body.user_type;} else {var user_type = "none";}
		if (req.body.team) {var team = req.body.team;} else {var team = 0;}

		var db = req.connection;
		db.query("INSERT INTO media (player_id, url, media_type) VALUES ('" + player_id + "','" + media_url + "', '" + media_type+ "')", function(err, result){
	          console.log("err: " + err);
	          console.log("insert success: " + result.insertId);
	          log_activity(user_type, "insert", "media", player_id, team, result.insertId, req);
	          res.json({media_url:media_url, media_type:media_type, media_id: result.insertId});
	    });
	});

	router.post('/save_player_data', isAuthenticated, function(req, res, next) {
		//if (req.body.media_order) {var media_order = req.body.media_order;} else {var media_order = 0;}
		if (req.body.youtube_url) {var youtube_url = req.body.youtube_url;} else {var youtube_url = "";}
		if (req.body.twitter_url) {var twitter_url = req.body.twitter_url;} else {var twitter_url = "";}
		if (req.body.instagram_url) {var instagram_url = req.body.instagram_url;} else {var instagram_url = "";}
		if (req.body.player_id) {var player_id = req.body.player_id;} else {var player_id = 0;}
		var db = req.connection;
		db.query("UPDATE players SET youtube='"+youtube_url+"', instagram='"+instagram_url+"', twitter='"+twitter_url+"' WHERE player_id = '" + player_id + "'", function(err, result){
	          console.log("err: " + err);
	          console.log("insert success: " + result.insertId);
	          //log_activity(user_type, "insert", "media", player_id, team, result.insertId, req);
	          res.json({update: "success"});
	    });
	});

	router.post('/delete_media_item', isAuthenticated, function(req, res, next) {
		if (req.body.media_id) {var media_id = req.body.media_id;} else {var media_id = 0;}
		if (req.body.team) {var team = req.body.team;} else {var team = 0;}
		if (req.body.user_type) {var user_type = req.body.user_type;} else {var user_type = "none";}
		if (req.body.player_id) {var player_id = req.body.player_id;} else {var player_id = 0;}

		var db = req.connection;
		db.query("DELETE FROM media WHERE media_id = '" + media_id + "'", function(err, result){
			if (user_type != "admin") {
				log_activity(user_type, "delete", "media", player_id, team, media_id, req);
			}
	        res.json({media_delete: "success"});
	    });
	});

	router.post('/upload_photo', isAuthenticated, function(req, res, next) {
		if (req.body.media_type) {var media_type = req.body.media_type;} else {var media_type = 0;}
		if (req.body.player_id) {var player_id = req.body.player_id;} else {var player_id = 0;}
		if (req.body.team) {var team = req.body.team;} else {var team = 0;}
		if (req.body.user_type) {var user_type = req.body.user_type;} else {var user_type = "none";}

		if (typeof req.files.media_photo != "undefined") {
			var db = req.connection;
			var photo_url = "/img/uploads/"+req.files.media_photo.name;
			db.query("INSERT INTO media (player_id, url, media_type) VALUES ('" + player_id + "','/img/uploads/"+req.files.media_photo.name + "', 'photo')", function(err, result){
		          console.log("err: " + err);
		          console.log("PHOTO insert success: " + result.insertId);
		          console.log("user_type: " + user_type);
		          if (user_type != "admin") {
			          log_activity(user_type, "insert", "media", player_id, team, result.insertId, req);
			      }
		          res.json({media_url:photo_url, media_type:"photo", media_id: result.insertId});
		    });
		}
	});

	router.post('/add_box_score', isAuthenticated, function(req, res, next) {
		if (req.body.game_upload_id) {var game_id = req.body.game_upload_id;} else {var game_upload_id = 0;}
		if (typeof req.files.gameStats != "undefined") {
			var db = req.connection;
		    var LineByLineReader = require('line-by-line');
		    var count = 0;
		    lr = new LineByLineReader('./public/img/uploads/'+req.files.gameStats.name);

		  	lr.on('error', function (err) {
			    // 'err' contains error object
			    console.log("err: " + err);
			});

			lr.on('line', function (line) {

				console.log("count: " + count);
				if (count == 1) {
					columnNames = line.split('|');
					console.log("columnNames.length: " + columnNames.length);
					colNameForInsert = "";
					for (var i = 0; i < columnNames.length; i++) {
						if (i == columnNames.length-1) {
							colNameForInsert += columnNames[i];
						} else {
							colNameForInsert += columnNames[i]+",";
						}
					}
				} else if (count >= 2) {
					lr.pause();
					//var jersey_line = {};
					var gameLine = line.split('|');
					console.log("gameLine.length: " + gameLine.length);
					var gameLineForInsert = "";
					for (var i = 0; i < gameLine.length; i++) {
						if (i == gameLine.length-1) {
							gameLineForInsert += "'"+gameLine[i]+"'";
						} else {
							gameLineForInsert += "'"+gameLine[i]+"',";
						}
					}
				    
				    console.log("INSERT INTO game_lines (game_info_id, " + colNameForInsert + ") VALUES ('" + game_id + "'," + gameLineForInsert + ")");
				    db.query("INSERT INTO game_lines (game_info_id, " + colNameForInsert + ") VALUES ('" + game_id + "'," + gameLineForInsert + ")", function(err, result){
				          console.log("err: " + err);
				          console.log("insert success: " + result.insertId);
				          lr.resume();
				    });
				}
			    console.log("line: " + line);
			    count++;
			});

			lr.on('end', function () {
			    // All lines are read, file is closed now.
			    //
			    db.query("UPDATE game_info SET has_box = true WHERE game_info_id = '" + game_id + "'", function(err, result){
				          console.log("err: " + err);
				          console.log("insert success: " + result.insertId);
				          //log_activity("none", "insert", "game_lines", "", game_id, req);
				          res.json({upload: "success"});
				    });
			});
		}
	});

	function log_activity (username, action, table, player_id, team, record_id, req) {
		var db = req.connection;
		var rightNow = moment().format('YYYY-MM-DD HH:mm:ss');
		console.log("INSERT INTO activity_log (date_time, user, first_name, last_name, team, action, table_changed, record_id, player_id) VALUES ("
			+ "'" + rightNow + "','" + username + "','" + req.user.first_name + "','" + req.user.last_name + "', '" + team + "', '" + action + "','" + table + "','" + record_id + "', '"+player_id+"')");
		db.query("INSERT INTO activity_log (date_time, user, first_name, last_name, team, action, table_changed, record_id, player_id) VALUES ("
			+ "'" + rightNow + "','" + username + "','" + req.user.first_name + "','" + req.user.last_name + "','" + team + "', '" + action + "','" + table + "','" + record_id + "', '"+player_id+"')", function(err, results1){
			if (err) {
				throw err;
				return false;
			}
			return true;
		});
	}

	router.post('/contact_us', function(req, res, next) {
		console.log("in contact_us");
		if (req.body.first_name) {var first_name = req.body.first_name;} else {var first_name = "";}
		if (req.body.last_name) {var last_name = req.body.last_name;} else {var last_name = "";}
		if (req.body.email_address) {var email_address = req.body.email_address;} else {var email_address = "";}
		if (req.body.user_message) {var user_message = req.body.user_message;} else {var user_message = "";}

		console.log("first_name: " + first_name);
		console.log("last_name: " + last_name);

		var email_content = "<h2>WisconsinHavoc.com Contact Us Form</h2>";
		email_content += "<p><strong>First Name: </strong> " + first_name + "</p>";
		email_content += "<p><strong>Last Name: </strong> " + last_name + "</p>";
		email_content += "<p><strong>Email: </strong> " + email_address + "</p>";
		email_content += "<p><strong>Message: </strong> " + user_message + "</p>";

		var text_content = "WisconsinHavoc.com Contact Us Form\r\n";
		text_content += "First Name: " + first_name + "\r\n";
		text_content += "Last Name: " + last_name + "\r\n";
		text_content += "Email: " + email_address + "\r\n";
		text_content += "Message: " + user_message + "\r\n";

		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'wisconsinhavoc@gmail.com',
		        pass: '#havoc4110'
		    }
		});

		var mailOptions = {
		    from: 'Contact Us <bryan.nolasco@wisconsinhavoc.com>', // sender address
		    to: 'bnolasco@wi.rr.com', // list of receivers
		    subject: 'Wisconsin Havoc Contact Us Form', // Subject line
		    text: text_content, // plaintext body
		    html: email_content // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);

		});

		res.json({submit: "success"});
	});

	router.post('/upload_game', isAuthenticated, function(req, res, next) {
		console.log("1:upload_game: " + JSON.stringify(req.files));
		console.log("upload_game:req.body: " + JSON.stringify(req.body));
		if (req.body.game_date) {var game_date = req.body.game_date;} else {var game_date = "";}
		if (req.body.game_time) {var game_time = req.body.game_time;} else {var game_time = "";}
		if (req.body.havoc_score) {var havoc_score = req.body.havoc_score;} else {var havoc_score = 0;}
		if (req.body.opponent) {var opponent = req.body.opponent;} else {var opponent = "";}
		if (req.body.opponent_score) {var opponent_score = req.body.opponent_score;} else {var opponent_score = 0;}
		if (req.body.game_result) {var game_result = req.body.game_result;} else {var game_result = "";}
		if (req.body.venue) {var venue = req.body.venue;} else {var venue = "";}
		if (req.body.address) {var address = req.body.address;} else {var address = "";}
		if (req.body.state) {var state = req.body.state;} else {var state = "";}
		if (req.body.city) {var city = req.body.city;} else {var city = "";}
		if (req.body.zip) {var zip = req.body.zip;} else {var zip = "";}
		if (req.body.team) {var team = req.body.team;} else {var team = "";}

		console.log("game_date: " + game_date);
		console.log("game_time: " + game_time);
		var game_date_time = moment(game_date + " " + game_time).format('YYYY-MM-DD HH:mm:ss');
		//console.log("game_date_time: " + game_date_time);
		//res.json('upload success');
	    //res.render('admin', { title: 'Wisconsin Havoc Admin' });
	    //console.log("req.file.path: " + req.file.path);

	    //var LineByLineReader = require('line-by-line');
	    //var count = 0;
	    //lr = new LineByLineReader('uploads/'+req.files.gameStats.name);
	    var maxPrepsId = '';
	    var columnNames = [];
	    var colNameForInsert = '';
	    var gameInfoId;

	    var db = req.connection;

	    console.log("SELECT * FROM game_info WHERE date_time = '" + game_date_time + "'");

	    db.query("SELECT * FROM game_info WHERE date_time = '" + game_date_time + "'", function(err, results1){
		          //console.log("game_info:result: " + results1.length);
		          if (results1.length > 0) {
		          	res.json({exists: "true"});
		          } else {
		          		//console.log("INSERT INTO game_info (date_time, city, state, venue, address1, address2, zip, opponent)"
						//	+ " VALUES ('" + game_date_time + "', '" + city + "', '" + state + "', '"
						//	 + venue + "', '" + address + "', '', '" + zip + "', '" + opponent + "')");
						var has_box = false;
						if (typeof req.files.gameStats != "undefined") {
							has_box = true;
						}

						console.log("INSERT INTO game_info (date_time, city, state, venue, address1, address2, zip, havoc_score, opponent, opponent_score, game_result, team, has_box)"
							+ " VALUES ('" + game_date_time + "', '" + city + "', '" + state + "', '"
							 + venue + "', '" + address + "', '', '" + zip + "', '" + havoc_score + "','" + opponent + "', '" + opponent_score + "','" + game_result + "', '" + team + "', "+has_box+")");

						db.query("INSERT INTO game_info (date_time, city, state, venue, address1, address2, zip, havoc_score, opponent, opponent_score, game_result, team, has_box)"
							+ " VALUES ('" + game_date_time + "', '" + city + "', '" + state + "', '"
							 + venue + "', '" + address + "', '', '" + zip + "', '" + havoc_score + "','" + opponent + "', '" + opponent_score + "','" + game_result + "', '" + team + "', "+has_box+")", 
							function(err, result){
					          //console.log("err: " + err);
					          //console.log("insert success: " + result.insertId); 
					          gameInfoId = result.insertId;
					          console.log("inserted new game: " + gameInfoId);
					          console.log("req.files.gameStats: " + req.files.gameStats);

					          if (typeof req.files.gameStats != "undefined") {
						            var LineByLineReader = require('line-by-line');
								    var count = 0;
								    lr = new LineByLineReader('./public/img/uploads/'+req.files.gameStats.name);

						          	lr.on('error', function (err) {
									    // 'err' contains error object
									    console.log("err: " + err);
									});

									lr.on('line', function (line) {

										console.log("count: " + count);
										if (count == 1) {
											columnNames = line.split('|');
											console.log("columnNames.length: " + columnNames.length);
											colNameForInsert = "";
											for (var i = 0; i < columnNames.length; i++) {
												if (i == columnNames.length-1) {
													colNameForInsert += columnNames[i];
												} else {
													colNameForInsert += columnNames[i]+",";
												}
											}
										} else if (count >= 2) {
											lr.pause();
											//var jersey_line = {};
											var gameLine = line.split('|');
											console.log("gameLine.length: " + gameLine.length);
											var gameLineForInsert = "";
											for (var i = 0; i < gameLine.length; i++) {
												if (i == gameLine.length-1) {
													gameLineForInsert += "'"+gameLine[i]+"'";
												} else {
													gameLineForInsert += "'"+gameLine[i]+"',";
												}
											}
										    
										    console.log("INSERT INTO game_lines (game_info_id, " + colNameForInsert + ") VALUES ('" + gameInfoId + "'," + gameLineForInsert + ")");
										    db.query("INSERT INTO game_lines (game_info_id, " + colNameForInsert + ") VALUES ('" + gameInfoId + "'," + gameLineForInsert + ")", function(err, result){
										          console.log("err: " + err);
										          console.log("insert success: " + result.insertId);
										          lr.resume();
										    });
										}
									    console.log("line: " + line);
									    count++;
									});

									lr.on('end', function () {
									    // All lines are read, file is closed now.
									    console.log("responding with json");
									    log_activity("admin", "insert", "game_info", '0', team, gameInfoId, req);
									    //log_activity("admin", "insert", "game_info_lines", '0', team, gameInfoId, req);
									    res.json({exists: "false"});		
									});
								} else {
									log_activity("admin", "insert", "game_info", '0', team, gameInfoId, req);
									res.json({exists: "false"});
								}
						});
		          }
		    });

	  //}
	});
	
	return router;
}
//module.exports = router;
