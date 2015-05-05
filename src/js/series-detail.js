var template = "";
var currentFilm = {};
(function($){
	filmsDetails_template = $('#films-detail').html();
	searchOthersFilms_template = $('#search-others-films').html();
})(jQuery);

films.showDetails = function(filmId){
	$('body').removeClass('menu-open');
	currentFilm = {};
	for (var film in films.list){
		if (films.list[film].id == filmId) {
			currentFilm = films.list[film];
			break;
		}
	}
	console.log(currentFilm);
	$('#films-detail').html(Mustache.render(filmsDetails_template, {'films-detail' : currentFilm}));
	for(var i = 1; i <= Math.round(currentFilm.vote_average / 2); i++){
		$('#films-detail .vote-average-stars').append('<i class="fa fa-star"></i>');
	}
	for(i; i <= 5; i++){
		$('#films-detail .vote-average-stars').append('<i class="fa fa-star-o"></i>');
	}
	$.each(currentFilm.genres, function(i, v){
		console.log(v.name);
		$('#films-detail .categories').append('<span class="category"><i class="fa fa-tag"></i>' + v.name + '</span>');
	});
	$('#films-detail').fadeIn();
};



/*
// Create an empty menu
var menu_rc = new gui.Menu();

// Add some items
menu_rc.append(new gui.MenuItem({
	label: 'Rechercher d\'autres films',
	click: function(){
		searchOthersFilms();
	}}
	));
menu_rc.append(new gui.MenuItem({ label: 'Item B' }));
menu_rc.append(new gui.MenuItem({ type: 'separator' }));
menu_rc.append(new gui.MenuItem({ label: 'Item C' }));

$('#films-detail').mousedown(function(event) {
	event.preventDefault();
	if (event.button == 2) {
		menu_rc.popup(event.clientX, event.clientY);
	}
});


function searchOthersFilms() {
	var othersFilmsList = [];
	tmdb.search('movie', {query: currentFilm.queryTitle, language: 'fr'}, function (err, results) {
		othersFilmsList = results.results;
		console.log(othersFilmsList);
		$('#search-others-films').html(Mustache.render(searchOthersFilms_template, {'searchOthersFilms': othersFilmsList, 'oldId': currentFilm.id})).fadeIn();
	});
}

function changeFilm(oldId, newId) {
	console.log("oldId: " + oldId + " newId: " + newId);
	$('#search-others-films').fadeOut();
	$('#films-detail').fadeOut();
	console.log("call: " + newId);
	tmdb.infos('movie', newId, {language: 'fr'}, function (err, results) {
		console.log(results);
		for(var i in films.list) {
			if (films.list[i].id == oldId) {
				var dir_path = films.list[i].dir_path;
				var queryTitle = films.list[i].queryTitle;
				films.list[i] = {};
				films.list[i] = results;
				films.list[i].dir_path = dir_path;
				films.list[i].queryTitle = queryTitle;
				showDetails(newId);
				var filmsList_str = JSON.stringify(films.list);
				fs.writeFileSync(path.join(filmsFolder, 'library.json'), filmsList_str, "UTF-8");
				win.reloadIgnoringCache();
			}
		}
	});
}
$('#search-others-films').blur(function(e){
	$(this).fadeOut();
});

$('#films-detail').on('click', '.play', function(e){
	fs.readdirSync(currentFilm.dir_path).filter(function(file) {
		var ext = path.extname(path.join(currentFilm.dir_path, file));
		if (ext == ".avi" || ext == ".mkv" || ext == ".mp4") {
			var command = '"' + playerPath + '" "' + path.join(currentFilm.dir_path, file) + '"';
			child = exec(command,  function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		}
		return true;
	});
});*/