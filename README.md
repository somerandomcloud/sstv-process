# sstv-process

Library(ish) to automatically process images to SSTV OGG files. With a few edits its possible to change the output format to any other audio formats, like .wav or .mp3.

Make sure you have ffmpeg installed and pysstv installed.

Tested on Void Linux x86_64. Create an issue if tested on other systems and works correctly.

## Installation

### pysstv

pysstv is available here: https://pypi.org/project/PySSTV/

To put it simply, just run `pip install PySSTV`, and that should do (if no errors are found)

### ffmpeg

ffmpeg is available here: https://www.ffmpeg.org/

### sstv-process

No npm version available just yet. For now, just copy and paste `lib.js` into a labeled file, and import it as you would a regular package with the name you gave it.

Requires `axios@0.26.0` and `fluent-ffmpeg@2.1.2` to be installed (these are the versions I have personally tested. Newer versions might work, but if they dont, install these versions)

## Docs

TODO (just look at index.js and lib.js, it isnt THAT hard to understand)

## Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to test as much as possible, as to not let bugs go about!

## License
[MIT](https://choosealicense.com/licenses/mit/)