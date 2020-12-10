import * as yup from 'yup'
import markdownToHtml from '../helpers/markdownToHtml'

const schema = yup.array()
    .of(yup.object({
      title: yup.string().required(),
      content: yup.string().required().transform(markdownToHtml),
    }))

export default schema
