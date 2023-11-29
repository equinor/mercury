import { Typography } from '@equinor/eds-core-react'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const VersionText = (): JSX.Element => {
  const [versionFile, setVersionFile] = useState<{ [key: string]: string }>({
    hash: '',
    date: '',
    refs: '',
  })

  useEffect(() => {
    axios
      .get('version.txt')
      .then((response: AxiosResponse<string>) => {
        const versionFile: { [key: string]: string } = Object.fromEntries(
          response.data.split('\n').map((line) => {
            return line.split(': ')
          })
        )
        setVersionFile(versionFile)
      })
      .catch(() => null)
  }, [])

  if (versionFile.hash === '' || versionFile.date === '') {
    return <p>Version: Null</p>
  }
  return (
    <p>
      Version:{' '}
      <Typography
        link
        href={`https://github.com/equinor/mercury/commit/${versionFile.hash}`}
      >
        {versionFile.refs === '' ? versionFile.hash : versionFile.refs}
      </Typography>{' '}
      ({versionFile.date})
    </p>
  )
}
