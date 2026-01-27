import { TopBar } from '@equinor/eds-core-react'
import { EquinorLogo } from '../../common/assets/EquinorLogo'
import { APP_NAME } from '../../common/constants'
import { VersionInfoProvider } from '../../contexts/VersionInfoContext'
import { AboutApplication } from './AboutApplication/AboutApplication'
import { AccountInformation } from './AccountInformation/AccountInformation'
import { ApplicationHelp } from './ApplicationHelp/ApplicationHelp'
import { GithubRepositoryLink } from './GithubRepositoryLink/GithubRepositoryLink'

export const AppBar = () => {
  return (
    <VersionInfoProvider>
      <TopBar>
        <TopBar.Header>
          <EquinorLogo />
          {APP_NAME}
        </TopBar.Header>
        <TopBar.Actions style={{ gap: 8 }}>
          <AccountInformation />
          <AboutApplication />
          <ApplicationHelp />
          <GithubRepositoryLink />
        </TopBar.Actions>
      </TopBar>
    </VersionInfoProvider>
  )
}
