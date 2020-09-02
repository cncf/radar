import Ajv from 'ajv'
import markdownToHtml from '../helpers/markdownToHtml'

const ajv = new Ajv()

ajv.addKeyword('markdown', {
  compile: _ => {
    return (data, path, parent, key) => {
      parent[key] = markdownToHtml(data)
      return true
    }
  }
})

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
        }
      }
    },
    points: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          repo: { type: 'string' },
          level: { type: 'string' },
          votes: {
            type: 'object',
            properties: {
              adopt: { type: 'integer' },
              trial: { type: 'integer' },
              assess: { type: 'integer' },
              hold: { type: 'integer' }
            }
          }
        }
      }
    },
    companies: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}

const _validate = ajv.compile(schema)
const validate = data => {
  const valid = _validate(data)
  const errors = _validate.errors
  return { valid, errors }
}

export default { validate }
