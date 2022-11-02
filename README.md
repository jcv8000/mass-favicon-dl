# Mass Favicon Downloader
Downloads favicons from a list of specified URLs

## Setup:

Edit `urls.txt` and add all of the URLs you want to download the favicons from.

The URLs have to have the `http://` or `https://` prefix.

## Usage:

`node ./downloader.cjs [favicon size]`

It will try to download the favicon at that size, but if the website doesn't have that size it might download a smaller one.

Example: `node ./downloader.cjs 16`

Outputs files into `./favicons/`