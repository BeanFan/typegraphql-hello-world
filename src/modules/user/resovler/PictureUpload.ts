import { createWriteStream } from "fs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Upload } from "../../../types/Upload";
const GraphQLUpload = require("graphql-upload-ts").GraphQLUpload;
@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
  }
}

// https://github.com/jaydenseric/graphql-multipart-request-spec
