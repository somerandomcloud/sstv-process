const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const { exec } = require('child_process');

// Get random Integer

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

// Download function

const download = async (fileUrl, downloadFolder) => {
	const fileName = getRandomInt(10000).toString() + '.jpg';
	// const fileName = path.basename(fileUrl);

	const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
	try {
		const response = await axios({
			method: 'GET',
			url: fileUrl,
			responseType: 'stream',
		});

		const w = response.data.pipe(fs.createWriteStream(localFilePath));
		w.on('finish', () => {
			console.log('Successfully downloaded file!');
		});
	}
	catch (err) {
		throw new Error(err);
	}

	return fileName;
};

// IMAGE ===> WAV

const toWAV = async (img, resultName, mode, resultsFolder) => {
	// const newName = resultName.slice(0, -4) + '.wav';

	const newName = resultName;

	let resultDir = '';

	if(/\/\w/g.test(resultsFolder)) resultDir = `${resultsFolder}${newName}`;
	else resultDir = `${resultsFolder}/${newName}`;

	exec(`python -m pysstv --mode ${mode} ${img} ${resultDir}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Successfully converted to SSTV (${mode})`);
	});

	return resultsFolder + newName;
};

// WAV ===> OGG

const toOGG = async (wav, resultName, resultsFolder) => {
	let resultDir = '';

	if(/\/\w/g.test(resultsFolder)) resultDir = `${resultsFolder}${resultName}`;
	else resultDir = `${resultsFolder}/${resultName}`;

	ffmpeg(wav).audioCodec('libvorbis').on('error', function(err) {
		console.log('An error occurred: ' + err.message);
	})
		.on('end', function() {
			console.log('Processing finished!');
		})
		.save(resultDir);
};

// Run IMG ===> OGG

const ito = async (link, mode, finalname, output, temp) => {
	const tempdir = temp + '/tmp/';
	if (await !fs.existsSync(tempdir)) {
		await fs.mkdirSync(tempdir);
	}

	const filename = await download(link, tempdir);

	const wavname = await toWAV(tempdir + filename, 'testing.wav', mode, tempdir);

	await new Promise(resolve => setTimeout(resolve, 3000));

	await toOGG('./tmp/testing.wav', finalname, output);

	console.log('Final result outputted');
};

// Delete tmp folder

// todo

module.exports = {
	download,
	toWAV,
	toOGG,
	ito,
};