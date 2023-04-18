import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../../../entity/Author";
import { AuthorBook } from "../../../entity/AuthorBook";
import { Book } from "../../../entity/Book";
import { BookRepo } from "../../../repo/BookRepo";
import { getCustomRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Resolver()
export class AuthorBookResolver {
  @InjectRepository()
  private bookRepo: BookRepo;

  @Query(() => Book)
  async findOrCreate2(@Arg("name") name: string): Promise<Book> {
    const bookRepo = getCustomRepository(BookRepo);
    let book = await this.bookRepo.findOrCreate({ name });
    console.log(book);
    return book;
  }
}
