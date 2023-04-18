import { EntityRepository, Repository } from "typeorm";
import { Book } from "../entity/Book";

@EntityRepository(Book)
export class BookRepo extends Repository<Book> {
  async findOrCreate({ name }: Partial<Book>) {
    console.log(name);
    let book = null;
    let books = await this.find({
      where: {
        name: name,
      },
    });
    if (books.length > 0) {
      book = books[0];
    }
    if (!book) {
      book = await this.create({
        name,
      }).save();
    }
    return book;
  }
}
