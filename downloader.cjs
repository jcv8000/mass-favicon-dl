const fs = require('fs');
const https = require('https');

if (process.argv.length == 3) {
    const size = process.argv[2];

    var urls = fs.readFileSync('./urls.txt', "utf-8").toString().replaceAll("\r", "").split("\n");

    const domainRegex = /^(?:https?:\/\/)(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/i;

    if (!fs.existsSync("favicons")) {
        fs.mkdirSync("favicons");
    }

    urls.forEach(url => {
        const domain = url.match(domainRegex);
        if (domain != null && domain.length > 1) {
            const fileName = domain.at(1);

            https.get(`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=${size}`, (res) => {

                const path = `${__dirname}/favicons/${fileName}.png`;
                const stream = fs.createWriteStream(path);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    console.log('Download completed for ' + url);
                });

            })
        }
    });
}
else {
    console.error("Usage: node ./downloader.cjs [favicon size]");
}