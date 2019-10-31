const { buildSchema } = require('graphql')

const mockDatabase = {
  1: {
    id: 1,
    avatar: 'String',
    name: 'String',
    isTop: true,
    content: 'String',
    publishDate: 'String',
    commentNum: 3,
    praiseNum: 4
  },
  2: {
    id: 2,
    avatar: 'String',
    name: 'String',
    isTop: true,
    content: 'String',
    publishDate: 'String',
    commentNum: 3,
    praiseNum: 4
  }
}

const schema = buildSchema(`
  type Comment {
    id: Int
    avatar: String
    name: String
    isTop: Boolean
    content: String
    publishDate: String
    commentNum: Int
    praiseNum: Int
  }

  type Query {
    comment: [Comment]
  }

  type Mutation {
    praise(id: Int): Int
  }

`)

schema.getQueryType().getFields().comment.resolve = () => {
  return Object.keys(mockDatabase).map(key => mockDatabase[key])
}

schema.getMutationType().getFields().praise.resolve = (_, { id }) => {
  mockDatabase[id].praiseNum++
  return mockDatabase[id].praiseNum
}

module.exports = schema