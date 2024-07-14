import { SectionModel } from './section-model'
import { ArticlesTypedef } from '../typedef/article-typedef'

export class ArticlesModel {
  section1: SectionModel
  section2: SectionModel
  section3: SectionModel

  constructor(data: ArticlesTypedef) {
    this.section1 = new SectionModel(data.section1)
    this.section2 = new SectionModel(data.section2)
    this.section3 = new SectionModel(data.section3)
  }

  getSection1(): SectionModel {
    return this.section1
  }

  getSection2(): SectionModel {
    return this.section2
  }

  getSection3(): SectionModel {
    return this.section3
  }
}
