import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../../../entity/Author";
import { AuthorBook } from "../../../entity/AuthorBook";
import { Book } from "../../../entity/Book";
import { BookRepo } from "../../../repo/BookRepo";
import { getCustomRepository } from "typeorm";


@Resolver()
export class AuthorBookResolver {
  @Mutation(() => Book)
  async createBook(@Arg("name") name: string) {
    return Book.create({ name }).save();
  }

  @Mutation(() => Author)
  async createAuthor(@Arg("name") name: string) {
    return Author.create({ name }).save();
  }

  @Mutation(() => Boolean)
  async addAuthorBook(
    @Arg("authorId", () => Int) authorId: number,
    @Arg("bookId", () => Int) bookId: number
  ) {
    await AuthorBook.create({ authorId, bookId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("bookId", () => Int) bookId: number) {
    await AuthorBook.delete({ bookId });
    await Book.delete({ id: bookId });
    return true;
  }

  @Query(() => [Book])
  async books() {
    return Book.find();
  }

  @Query(() => Book)
  async findOrCreate(@Arg("name") name: string): Promise<Book> {
    const bookRepo = getCustomRepository(BookRepo);
    let book = await bookRepo.findOrCreate({ name });
    console.log(book);
    return book;
  }
}
