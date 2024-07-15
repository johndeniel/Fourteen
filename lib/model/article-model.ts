import { ArticleTypedef } from '../typedef/article-typedef'

export class ArticleModel {
  private header: string
  private image: string
  private paragraphs: string[]

  constructor(data: ArticleTypedef) {
    this.header = data.header
    this.image = data.image
    this.paragraphs = data.paragraphs
  }

  getHeader(): string {
    return this.header
  }

  getImage(): string {
    return this.image
  }

  getParagraphs(): string[] {
    return this.paragraphs
  }
}
