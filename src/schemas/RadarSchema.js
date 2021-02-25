import * as yup from 'yup'
import loadYaml from '../helpers/loadYaml'
import fetchUrl from '../helpers/fetchUrl'
import markdownToHtml from '../helpers/markdownToHtml'

const industries = loadYaml('industries.yml').data

const sectionSchema = yup.object({
  title: yup.string()
    .required(),
  position: yup.number()
    .integer()
    .min(1),
  content: yup.string()
    .required()
    .transform(markdownToHtml)
})

const themeSchema = yup.object({
  headline: yup.string()
    .required(),
  content: yup.string()
    .required()
    .transform(markdownToHtml)
})

const downloadPhoto = async value => {
  try {
    await fetchUrl(value)
  } catch(e) {
    return false
  }
  return true
}

const teamSchema = yup.object({
  name: yup.string()
    .required(),
  photo: yup.string()
    .url()
    .required()
    .test('download-photo', 'cannot download photo from "${value}"', downloadPhoto),
  bio: yup.string()
    .transform(markdownToHtml)
  ,
  title: yup.string(),
  twitter: yup.string(),
  linkedin: yup.string(),
})

const votesSchema = yup.object({
  adopt: yup.number()
    .integer()
    .min(1),
  trial: yup.number()
    .integer()
    .min(1),
  assess: yup.number()
    .integer()
    .min(1),
  hold: yup.number()
    .integer()
    .min(1),
})

const pointSchema = yup.object({
  name: yup.string()
    .required(),
  homepage: yup.string()
    .url(),
  repo: yup.string(),
  level: yup.string()
    .oneOf(['adopt', 'trial', 'assess', 'hold'])
    .required(),
  votes: votesSchema
    .required()
}).test('homepage-or-repo', `homepage or repo must be set`, value => value.homepage || value.repo)

const companySchema = yup.string()
  .test('industry-set', '${value} does not have required industry in industries.yml', value => industries[value])

const RadarSchema = yup.object({
  name: yup.string()
    .required(),
  sections: yup.array()
    .of(sectionSchema),
  themes: yup.array()
    .of(themeSchema)
    .required(),
  video: yup.string()
    .url(),
  team: yup.array()
    .of(teamSchema)
    .required(),
  points: yup.array()
    .of(pointSchema)
    .required(),
  companies: yup.array()
    .of(companySchema)
    .required()
})

export default RadarSchema
