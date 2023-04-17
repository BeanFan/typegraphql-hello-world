import { GraphQLSchema, graphql } from "graphql";
import { createSchema } from "../../src/modules/utils/createSchema";

interface Options {
  source: string;
  variableValues?: any;
  userId?: string;
}

let schema: GraphQLSchema;
export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema: await createSchema(),
    source: source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId: userId,
        },
      },
    },
  });
};
