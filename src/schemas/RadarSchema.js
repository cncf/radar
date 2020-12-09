const Joi = require('joi')
// TODO: use markdown to html in attributes that contain markdown.
import markdownToHtml from '../helpers/markdownToHtml'

const sectionSchema = Joi.object({
  title: Joi.string()
    .required(),
  position: Joi.number()
    .integer()
    .min(1),
  content: Joi.string()
    .required()
})

const themeSchema = Joi.object({
  headline: Joi.string()
    .required(),
  content: Joi.string()
    .required()
})

const teamSchema = Joi.object({
  name: Joi.string()
    .required(),
  photo: Joi.string()
    .uri()
    .required(),
  bio: Joi.string()
    .required(),
  title: Joi.string()
    .required(),
  twitter: Joi.string(),
  linkedin: Joi.string(),
})

const votesSchema = Joi.object({
  adopt: Joi.number()
    .integer()
    .min(1),
  trial: Joi.number()
    .integer()
    .min(1),
  assess: Joi.number()
    .integer()
    .min(1),
  hold: Joi.number()
    .integer()
    .min(1),
})

const pointSchema = Joi.object({
  name: Joi.string()
    .required(),
  homepage: Joi.string()
    .uri(),
  repo: Joi.string(),
  level: Joi.string()
    .valid('adopt', 'trial', 'assess', 'hold')
    .required(),
  votes: votesSchema
    .required()
}).or('homepage', 'repo')

const schema = Joi.object({
  name: Joi.string()
    .required(),
  sections: Joi.array()
    .items(sectionSchema),
  themes: Joi.array()
    .items(themeSchema)
    .required(),
  video: Joi.string()
    .uri(),
  team: Joi.array()
    .items(teamSchema)
    .required(),
  points: Joi.array()
    .items(pointSchema)
    .required(),
  companies: Joi.array()
    .items(Joi.string())
})

const validate = data => {
  const { error } = schema.validate(data, { abortEarly: false, errors: { label: false } })
  const errors = error ? error.details : []
  return { errors }
}

export default { validate }
