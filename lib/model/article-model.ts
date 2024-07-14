import { ArticleTypedef } from '../typedef/article-typedef'

export class ArticleModel {
  private header: string
  private image: string
  private paragraph1: string
  private paragraph2: string
  private paragraph3: string

  constructor(data: ArticleTypedef) {
    this.header = data.header
    this.image = data.image
    this.paragraph1 = data.paragraph1
    this.paragraph2 = data.paragraph2
    this.paragraph3 = data.paragraph3
  }

  getHeader(): string {
    return this.header
  }
  getImage(): string {
    return this.image
  }
  getParagraph1(): string {
    return this.paragraph1
  }
  getParagraph2(): string {
    return this.paragraph2
  }
  getParagraph3(): string {
    return this.paragraph3
  }
}
