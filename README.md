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

## Creating a new radar

Create a YAML file under [content/radars](content/radars), the file name must be formatted `YYYY-MM-${radarName}.yml`, `YYYY-MM` should be set to the radar's publish year/month and `radarName` should only contain lower case characters and dashes. Copy the content of the template radar [content/radars/1999-01-radar-template.yml](content/radars/1999-01-radar-template.yml) into the new radar and modify as needed. Once the radar is ready to be published remove `draft: true`.

## Radar Schema

| Attribute | Type | Required | Notes | 
| --- | --- | --- | --- | 
| name  | String | Yes | |
| draft  | Boolean | No | Default: false |
| themes | Array of [Themes](#theme-schema) | Yes | |
| video | URL | No | Youtube URL of the video |
| team | Array of [Teams](#team-schema) | Yes | |
| points | Array of [Points](#point-schema) | Yes (if subradars not set) | |
| subradars | Array of [Subradars](#subradar-schema) | Yes (if points not set) | Use this instead of points if two subradars should be shown like [this](https://radar.cncf.io/2021-06-multicluster-management) |
| companies | Array of [Companies](#company-schema) | Yes | |

#### Theme schema

| Attribute | Type | Required | 
| --- | --- | --- |
| headline  | String | Yes |
| content | String | Yes |

#### Team schema

| Attribute | Type | Required | Notes |
| --- | --- | --- | --- |
| name  | String | Yes | | 
| photo | URL | Yes | | 
| bio | String | Yes | |
| twitter | String | No | Twitter handle  |
| linkedin | String | No | LinkedIn handle | 

#### Point schema

| Attribute | Type | Required | Notes |
| --- | --- | --- | --- |
| name  | String | Yes | | 
| homepage | URL | Yes (if repo not set) | |
| repo | String | Yes (if homepage not set) | github repo (eg kubernetes/kubernetes or facebook/react) |
| level | String | Yes | One of adopt, trial, assess or hold |
| votes | [Votes](#votes-schema) | Yes | |

#### Votes schema

| Attribute | Type | Required | 
| --- | --- | --- |
| adopt  | integer | No |
| trial  | integer | No |
| assess  | integer | No |
| hold  | integer | No |

_These are not required, leave out those that are 0_

#### Subradar schema

| Attribute | Type | Required |
| --- | --- | --- |
| name  | String | Yes |
| votes | [Votes](#votes) | Yes |

#### Company schema

| Attribute | Type | Required | Notes | 
| --- | --- | --- | --- |
| landscapeId  | String | Yes | ID of the company on the CNCF Landscape, eg [v-vmware-member](https://landscape.cncf.io/members?selected=v-mware-member) | 
| industry  | String | Yes | | 

## Draft radars

Setting `draft: true` to a radar will make it a draft and therefore it won't be visible on the homepage. Drafts will be viewable from `/drafts`, eg [radar.cncf.io/drafts](https://radar.cncf.io/drafts) or [localhost:3000/drafts](http://localhost:3000/drafts)
