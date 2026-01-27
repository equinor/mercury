import { Button, Icon } from '@equinor/eds-core-react'
import { github } from '@equinor/eds-icons'
import { GITHUB_REPO_URL } from '../../../common/constants'

export function GithubRepositoryLink() {
  return (
    <Button variant="ghost_icon" href={GITHUB_REPO_URL}>
      <Icon data={github} />
    </Button>
  )
}
