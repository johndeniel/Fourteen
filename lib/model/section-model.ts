import { SectionTypedef } from '../typedef/section-typedef'

export class SectionModel {
  header: string
  image: string
  paragraph1: string
  paragraph2: string
  paragraph3: string

  constructor(data: SectionTypedef) {
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
