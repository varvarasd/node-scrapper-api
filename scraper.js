const cheerio = require("cheerio");
const axios = require("axios");

const siteUrl = "https://www.totaljobs.com/jobs/";

let siteName = '';
const list = [];

const fetchData = async (role, city) => {
  const formatedCity = city.replace(/ /g,"-");
  const formatedUrl = `${siteUrl}${role}/in-${formatedCity}?radius=10`
  const result = await axios.get(formatedUrl).then((res) => res).catch((err) => console.log(err, '@@@ SERVER FETCH ERROR @@@'));
  return cheerio.load(result.data);
};

const scraper = async (role, city) => {
  const $ = await fetchData(role, city);

  siteName = $('head title').text();
  list.push(siteName);

  $(".col-xs-12.job-results.clearfix .job").each((index, element) => {
    const card = new Object();
    card.title = $(element).find('h2').text();
    card.city = $(element).find('.location span span:nth-child(2)').text();
    card.postCode = $(element).find('.location span span:nth-child(1)').text();
    card.salary = $(element).find('.salary').text();
    card.date = $(element).find('.date-posted span').text().trim();
    card.type = $(element).find('.job-type span').text();
    card.company = $(element).find('.company a').text();
    card.link = $(element).find('.job-title a').prop('href');
    list.push(card);
  });

  return { list };
};

module.exports = scraper;
