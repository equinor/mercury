import { Typography } from '@equinor/eds-core-react'
import { GITHUB_REPO_URL } from '../../../common/constants'
import { useVersionInfoContext } from '../../../contexts/VersionInfoContext'

export function AppVersion() {
  const { commitInfo } = useVersionInfoContext()

  const githubUrl = commitInfo.hash
    ? `${GITHUB_REPO_URL}/commit/${commitInfo.hash}`
    : GITHUB_REPO_URL

  return (
    <p>
      Version:{' '}
      <Typography link href={githubUrl}>
        {commitInfo.refs === '' ? commitInfo.hash : commitInfo.refs}
      </Typography>{' '}
      {`(${commitInfo.date})`}
    </p>
  )
}
