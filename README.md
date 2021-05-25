[![Build Status](https://travis-ci.com/arsalanc-v2/RemoveAllSavedGoogleSearches.svg?token=uQU2TE2LydPhxKjosPjN&branch=master)](https://travis-ci.com/arsalanc-v2/clear)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![DeepScan grade](https://deepscan.io/api/teams/4974/projects/6771/branches/58345/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=4974&pid=6771&bid=58345)

# clear
> Buttonifies the removal of all of one's Google searches stored by Google, as a Chrome extension for convenience.

![](demo.gif)

## Performance
Takes < 2 seconds.

## Behaviour
* Returns to the tab that was active prior to clicking
* Displays an alert box at the end indicating whether the deletion was successful or not
* Stops execution if a Google account is not signed-in (a requirement)

## Usage
1. Clone this repository: `git clone https://github.com/arsalanc-v2/clear`
2. Navigate to `chrome://extensions`
3. Click on `Load unpacked`
4. Select the cloned folder

## Running Tests
1. ```npm install```
2. ```npm run citest```
