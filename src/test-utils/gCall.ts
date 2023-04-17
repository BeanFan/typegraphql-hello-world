import { graphql } from "graphql";
import { createSchema } from "../../src/modules/utils/createSchema";

interface Options {
  source: string;
  variableValues?: any;
}

export const gCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await createSchema(),
    source: source,
    variableValues,
  });
};
