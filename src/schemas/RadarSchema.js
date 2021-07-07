import * as yup from 'yup'
import fetchUrl from '../helpers/fetchUrl'
import markdownToHtml from '../helpers/markdownToHtml'

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

const memberSchema = yup.object({
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

const companySchema = yup.object({
    landscapeId: yup.string()
      .required(),
    industry: yup.string()
      .required()
  })

const subradarSchema = yup.object({
  name: yup.string()
    .required(),
  votes: votesSchema
    .required()
})

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
    .of(memberSchema)
    .required(),
  points: yup.array()
    .of(pointSchema),
  subradars: yup.array()
    .of(subradarSchema),
  companies: yup.array()
    .of(companySchema)
    .required()
}).test('points-or-radars-set', 'points or radars must be set', value => value.points || value.subradars)

export default RadarSchema
