
var XML        = require('xml');

function GoogleNewsSitemap (items) {
    this.items                 = items || [];
        return '<?xml version="1.0" encoding="UTF-8"?>\n'
                + XML(generateXML(this));

}

function generateXML (data){

    var urlset = [
        { _attr: {
            'xmlns':         'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:news':    'http://www.google.com/schemas/sitemap-news/0.9'
             } }
		];

    function formatDate(date) {
      var fmt = date.toISOString();
      fmt = fmt.slice(0, fmt.indexOf('T')+1);
      fmt = fmt + date.toTimeString().replace(' GMT', '');
      fmt = fmt.slice(0, 22) + ':00';
      return fmt;
    }
		
    data.items.forEach(function(item) {
          var news_values = [
            { 'news:publication': [
              { 'news:name': item.publication_name },
              { 'news:language': item.publication_language }
            ] }
          ];
          if (item.access) news_values.push( { 'news:access': item.access } );
          if (item.genres) news_values.push( { 'news:genres': item.genres } );
          if (item.publication_date) news_values.push( { 'news:publication_date': formatDate(item.publication_date) } );
          if (item.title) news_values.push( { 'news:title': item.title } );
          if (item.geo_locations) news_values.push( { 'news:geo_locations': item.geo_locations } );
          if (item.keywords) news_values.push( { 'news:keywords': item.keywords } );
          if (item.stock_tickers) news_values.push( { 'news:stock_tickers': item.stock_tickers } );

          var url_values = [
            { _attr: {} },
            { 'loc': item.location },
            { 'news:news': news_values }
          ];

          urlset.push({ url: url_values });
    });
		
	return { urlset : urlset };
}

module.exports = GoogleNewsSitemap;
