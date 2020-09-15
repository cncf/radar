# CNCF RADAR

[![Netlify Status](https://api.netlify.com/api/v1/badges/13db5650-29ee-47bd-92b3-b96025c85009/deploy-status)](https://app.netlify.com/sites/cncf-radar/deploys)

These are the instructions for people who want to run Radar locally. For development instructions visit 
[DEVELOPMENT.md](https://github.com/cncf/radar/blob/master/DEVELOPMENT.md) 

## Requirements

Install [Docker](https://www.docker.com/) and Docker Compose. Docker Desktop for Mac already includes Compose.

## Building image

Run `bin/install`. This is only required the first time you clone this repo or when you pull.

## Running app locally

Execute `bin/run dev` and visit [localhost:3000](http://localhost:3000)

## Generating a build

This step is not required for development or adding radar data, this is run on Netlify.

`bin/run build`

To see the generated build run:

`bin/run prod`

