const {ApolloServer , gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools')
const courses = require('./courses')

const typeDefs = gql`
type Course{
    id:ID!
    titulo: String!
    vistas: Int
}
input CourseInput{
    titulo: String!
    vistas: Int
}

type Query{
    getCourses: [Course]
   }

   type Mutation{
    addCourse(input: CourseInput): Course
   }
`;

const resolvers= {
    Query:{
        getCourses(){
            return courses;
        }
    },
    Mutation: {
        addCourse(obj,{input}){
            const {titulo , vistas} = input;
            const id = String(courses.length + 1);
            const curso = {id ,titulo, vistas}
            courses.push(curso);
            return curso;
        },
    }

};


//settings
//app.set('port',3000)

const server = new ApolloServer({ typeDefs,resolvers});



// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${ url }`);
  });