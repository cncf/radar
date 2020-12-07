import Ajv from 'ajv'
import markdownToHtml from '../helpers/markdownToHtml'

const ajv = new Ajv({ useDefaults: true })

ajv.addKeyword('markdown', {
  compile: _ => {
    return (data, path, parent, key) => {
      parent[key] = markdownToHtml(data)
      return true
    }
  }
})

// https://github.com/sideway/joi

const schema = {
  properties: {
    name: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          position: { type: 'integer' },
          content: { type: 'string', markdown: true }
        },
        required: ['title', 'content']
      }
    },
    themes: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          headline: { type: 'string' },
          content: { type: 'string' }
        },
        required: ['headline', 'content']
      }
    },
    video: { type: 'string', format: 'uri' },
    team: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          photo: { type: 'string', format: 'uri' },
          bio: { type: 'string', markdown: true },
          twitter: { type: 'string' },
          linkedin: { type: 'string' },
          title: { type: 'string' }
        },
        required: ['name', 'photo', 'bio', 'title']
      }
    },
    points: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          homepage: { type: 'string', format: 'uri' },
          repo: { type: 'string' },
          level: { type: 'string', enum: ['adopt', 'trial', 'assess', 'hold'] },
          votes: {
            type: 'object',
            properties: {
              adopt: { type: 'integer', minimum: 1 },
              trial: { type: 'integer', minimum: 1 },
              assess: { type: 'integer', minimum: 1 },
              hold: { type: 'integer', minimum: 1 }
            }
          },
        },
        required: ['name', 'level', 'votes'],
        oneOf: [
          { required: ['homepage'] },
          { required: ['repo'] }
        ]
      }
    },
    companies: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['name', 'themes', 'team', 'points', 'companies']
}

const _validate = ajv.compile(schema)
const validate = data => {
  const valid = _validate(data)
  const errors = _validate.errors
  return { valid, errors }
}

export default { validate }
