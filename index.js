const { existsSync, readFileSync, writeFileSync } = require('fs');
const { getRandomWallPaperDetails, downloadImage } = require('./unsplash.js');
const { configPath } = require('./config.json');

const dotenv = require('dotenv');
dotenv.config();

const date = new Date();
const lastUpdatedConfigFile = require('os').homedir() + configPath;


const readConfig = () => {

    if (!existsSync(lastUpdatedConfigFile)) {
        createDefaultConfigFile();
    }

    const content = readFileSync(lastUpdatedConfigFile, { encoding: "utf-8" });
    return JSON.parse(content);
}

const createDefaultConfigFile = () => {

    const defaultConfig = {
        updatedDate: "",
        updatedTimeStamp: new Date().toISOString()
    }

    writeFileSync(lastUpdatedConfigFile, JSON.stringify(defaultConfig, null, 4));
}

const updateLastUpdatedFile = () => {
    const defaultConfig = {
        updatedDate: date.toLocaleDateString(),
        updatedTimeStamp: new Date().toISOString()
    }

    writeFileSync(lastUpdatedConfigFile, JSON.stringify(defaultConfig, null, 4));
}

const wallpaperTask = () => {

    const fileName = date.toLocaleDateString().replaceAll('/', "_") + ".jpeg";

    lastUpdatedConfig = readConfig()
    if (lastUpdatedConfig.updatedDate == date.toLocaleDateString()) {
        console.info("Wallpaper already downloaded for the day");
    } else {
        getRandomWallPaperDetails()
            .then(url => downloadImage(url))
            .then(res => Buffer.from(res))
            .then(data => writeFileSync(fileName, data))
            .then(updateLastUpdatedFile)
            .catch(console.error);
    }
}


wallpaperTask();


