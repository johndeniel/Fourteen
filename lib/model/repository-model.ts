import { RepositoryTypedef } from '../typedef/repository-typedef'

export class RepositoryModel {
  repository_name: string
  repository_description: string
  commit_message: string[]
  author_name: string
  author_avatar_url: string
  last_updated: string

  constructor(data: RepositoryTypedef) {
    this.repository_name = data.repository_name
    this.repository_description = data.repository_description
    this.commit_message = data.commit_message
    this.author_name = data.author_name
    this.author_avatar_url = data.author_avatar_url
    this.last_updated = data.last_updated
  }

  getRepositoryName(): string {
    return this.repository_name
  }

  getRepositoryDescription(): string {
    return this.repository_description
  }

  getCommitMessage(): string[] {
    return this.commit_message
  }

  getAuthorName(): string {
    return this.author_name
  }

  getAuthorAvatarUrl(): string {
    return this.author_avatar_url
  }

  getLastUpdated(): string {
    return this.last_updated
  }
}
