var site = {

    bp: {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
    },

    preInit: function () {
		document.body.classList.remove('preload');
		site.init();
    },
    
    init: function() {
        site.cms.init();
        var blazy = new Blazy({
			successClass: 'loaded'
        });
        Cookies.set('JS-Detection', 'true', 0);
    },

    cms: {
		init: function () {
			site.cms.table();
			site.cms.embed();
		},

		table: function () {
			var query = document.querySelectorAll('.cms table');
			for (var i = 0; i < query.length; i++) {
				var div = document.createElement('div');
				div.classList.add('cms-table');
				wrapOuter(query[i], div);
			}
		},

		embed: function () {
			var query = document.querySelectorAll('.cms iframe');
			for (var i = 0; i < query.length; i++) {
				var div = document.createElement('div');
				div.classList.add('cms-embed');
				wrapOuter(query[i], div);
			}
		}
	},
    
};

window.addEventListener('load', function (e) {
	site.preInit();
});
