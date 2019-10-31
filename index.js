const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => 'hello'
}


module.exports = function(query) {
  return graphql(schema, query, root).then((response) => {
    return response
  })
}