const cheerio = require("cheerio");
const request = require("request");

const API_URL = "https://www.beatport.com/search?q=";
const title = process.argv[2];
const artist = process.argv[3];
const query = title + " " + artist;

request(API_URL + query.split(" ").join("+"), (err, res, body) => {
	const $ = cheerio.load(body);

	const tracks = $('.bucket-items.ec-bucket').get(1);
	const track = $(tracks).find('li').filter((_, track) => {
		const trackTitle = $(track).find('.buk-track-primary-title').html();
		const trackRemix = $(track).find('.buk-track-remixed').html();
		const trackArtist = $($(track).find('.buk-track-artists').find('a').get(0)).html();

		return String(trackTitle + " " + trackRemix + " " + trackArtist).toLowerCase().includes(title.toLowerCase());
	});

	console.log($($(track).find('.buk-track-genre').find('a').get(0)).html());
});