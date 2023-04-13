import { buildSchema } from "type-graphql";
import { FirstResolver } from "./resolvers/index";
import { ApolloServer } from "apollo-server";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  // ... Building schema here
  const schema = await buildSchema({ resolvers: [FirstResolver] });
  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
