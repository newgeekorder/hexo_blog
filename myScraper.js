var scraperjs = require('scraperjs');
var fs = require('fs');
var toMarkdown = require('to-markdown');


var options = {};

var programmingTags = ['scala', 'java', 'c#'
    //'php',
    //'javascript',
    //'jquery',
    //'.net',
    //'asp.net',
    //'c++',
    //'python',
    //'ruby-on-rails',
    //'c',
    //'objective-c',
    //'ruby',
];

var database = [
    //'mysql',
    //'sql',
    //'database',
    //'sql-server',
];

var os = [
    //'windows',
    //'linux'
]

var mobile = [
    //'iphone',
    //'android',
    //'html',
    //'css',
    //'xml',
    //'ajax',
    ];

var wiki = [
    //'regex',
    //'django',
    //'vb.net',
    //'silverlight',
    //'visual-studio',
    //'winforms',
    //'arrays',
    //'visual-studio-2010',
    //'linux',
    //'performance',
    //'eclipse',
    //'osx',
    //'web-services',
    //'ipad',
    //'sql-server-2005',
    //'oop',
    //'visual-studio-2008',
    //'json',
    //'unit-testing',
    //'perl',
    //'hibernate',
    //'oracle',
    //'facebook',
    //'tsql',
    //'nhibernate',
    //'validation',
    //'sql-server-2008',
    //'entity-framework',
    //'git',
    //'google-app-engine',
    //'svn',
    //'wordpress',
    //'spring',
    //'drupal',
    //'apache',
    //'swing',
    //'events',
    //'debugging',
    //'templates',
    //'sqlite',
    //'parsing',
    //'api',
    //'jquery-ui',
    //'matlab',
    //'design-patterns',
    //'caching',
    //'http',
    //'email',
    //'visual-c++',
    //'ms-access',
    //'postgresql',
    //'list',
    //'generics',
    //'xslt',
    //'design',
    //'database-design',
    //'sharepoint',
    //'bash',
    //'angularjs',
    //'twitter-bootstrap',
    //'mongodb',
    //'cordova',
    //'docker',
    //'oracle',
    //'postgresql',
    //'r',
    //'julia-lang',
    //'redhat',
    //'centos',
    //'coreos',
    //'node.js',
    //'lua',
    //'maven',
    //'groovy',
    //'gradle',
    //'salesforce',
    //'google-compute-engine', 'nginx', 'grails', 'magento', 'soapui', 'automated-tests', 'activemq', 'agile'
    //'typescript', 'coffeescript', 'reactjs', 'google-maps', 'google-datastore', 'google-analytics', 'microservices',
    //'machine-learning', 'amazon-web-services', 'amazon-ec2', 'amazon-s4', 'amazon-dynamodb', 'amazon-cloudfront',
    //'amazon-rds', 'amazon-redshift', 'amazon-sqs', 'amazon-simpledb', 'amazon-ses', 'amazon-emr', 'amazon-sns'
    //'amazon-elb', 'amazon-cloudformation', 'amazon-ebs', 'amazon-vpc', 'amazon-data-pipeline',
    //'amazon-elasticcache', 'amazon-swf', 'amazon-cloudsearch', 'web-scraping', 'clocker',
    //'apache-spark', 'apache-camel', 'apache-pig', 'apache-kafka'
    //'heroku', 'selenium', 'solr', 'AWS'
    'hadoop'
];


var myReplace = {
    filter: ['div', 'span'],
    replacement: function (innerHTML, node) {
        return innerHTML;
    }
}

var removeScript = {
    filter: ['script', 'noscript'],
    replacement: function (innerHTML, node) {
        return "";
    }
}

var removeFooter = {
    filter: ['.post-menu'],
    replacement: function (innerHTML, node) {
        console.log("matched " + innerHTML);
        return "";
    }
}

// remove the old data
try {
    fs.unlinkSync('wiki/' + page + '.md');
} catch(exception ){}
generateIndex();
// loop over the tags and scrape
for (var i = 0; i < tags.length; i++) {
    var page = tags[i];
    parsePage(page);
}

function parsePage(page) {
    console.log('Processing ' + tags[i]);
    scraperjs.StaticScraper.create('http://stackoverflow.com/tags/' + page + '/info')
        .scrape(function ($) {
            return $('#questions').map(function () {
                $(this).find('.post-menu').empty();
                $(this).find('p').last().empty();
                var title = page.substr(0,1).toUpperCase();
                title += page.substr(1).toLowerCase();
                $(this).find('h2 a').replaceWith(title);
                //$(this).find('h2 a').remove();
                $(this).find('a').each(function() {
                    if ( $(this).attr("href").indexOf("/questions") == 0  ){
                        $(this).attr("href", "http://stackoverflow.com" + $(this).attr("href") );
                        console.log("modifying url to " + $(this).attr("href"));
                    }

                });
                return $(this).html();
            }).get();
        }, function (news) {
            console.log('got page for ' + page);

            fs.writeFileSync('source/tech/' + page + '.md',
                 toMarkdown(news.toString(), {converters: [removeScript, removeFooter, myReplace]}));


        })
}

function pageHeader(page){
    var title =  page;
    var date = "";
    var tags = "";
    return "";

}

function generateIndex(){
    var listPages = '';
    for (var i = 0; i < tags.length; i++) {
        listPages += '[' + tags[i] + '](/tech/' + tags[i] + '.html) - ';
    }
    console.log(listPages);
}
