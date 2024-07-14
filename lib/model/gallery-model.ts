import { GalleryTypedef } from '../typedef/gallery-typedef'

export class GalleryModel {
  category: string
  description: string
  fork: string
  icon1: string
  icon2: string
  icon3: string
  icon4: string
  id: number
  idate1: string
  idate2: string
  idate3: string
  idate4: string
  img: string
  info1: string
  info2: string
  info3: string
  info4: string
  itech1: string
  itech2: string
  itech3: string
  itech4: string
  live: string
  star: number
  title: string
  view: number

  constructor(data: GalleryTypedef) {
    this.category = data.category
    this.description = data.description
    this.fork = data.fork
    this.icon1 = data.icon1
    this.icon2 = data.icon2
    this.icon3 = data.icon3
    this.icon4 = data.icon4
    this.id = data.id
    this.idate1 = data.idate1
    this.idate2 = data.idate2
    this.idate3 = data.idate3
    this.idate4 = data.idate4
    this.img = data.img
    this.info1 = data.info1
    this.info2 = data.info2
    this.info3 = data.info3
    this.info4 = data.info4
    this.itech1 = data.itech1
    this.itech2 = data.itech2
    this.itech3 = data.itech3
    this.itech4 = data.itech4
    this.live = data.live
    this.star = data.star
    this.title = data.title
    this.view = data.view
  }

  getCategory(): string {
    return this.category
  }

  getDescription(): string {
    return this.description
  }

  getFork(): string {
    return this.fork
  }

  getIcon1(): string {
    return this.icon1
  }

  getIcon2(): string {
    return this.icon2
  }

  getIcon3(): string {
    return this.icon3
  }

  getIcon4(): string {
    return this.icon4
  }

  getId(): number {
    return this.id
  }

  getIdate1(): string {
    return this.idate1
  }

  getIdate2(): string {
    return this.idate2
  }

  getIdate3(): string {
    return this.idate3
  }

  getIdate4(): string {
    return this.idate4
  }

  getImg(): string {
    return this.img
  }

  getInfo1(): string {
    return this.info1
  }

  getInfo2(): string {
    return this.info2
  }

  getInfo3(): string {
    return this.info3
  }

  getInfo4(): string {
    return this.info4
  }

  getItech1(): string {
    return this.itech1
  }

  getItech2(): string {
    return this.itech2
  }

  getItech3(): string {
    return this.itech3
  }

  getItech4(): string {
    return this.itech4
  }

  getLive(): string {
    return this.live
  }

  getStar(): number {
    return this.star
  }

  getTitle(): string {
    return this.title
  }

  getView(): number {
    return this.view
  }
}
