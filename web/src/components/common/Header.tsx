import styled from 'styled-components'
import { TopBar, Icon, Popover, Button } from '@equinor/eds-core-react'
import { account_circle, grid_on, info_circle } from '@equinor/eds-icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { AUTH_DISABLED } from '../../constants'

const Icons = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: 40px;
  }
`

export const Header = (): JSX.Element => {
  const [isUserInfoOpen, setUserInfoOpen] = useState(false)
  const [isAboutOpen, setAboutOpen] = useState(false)
  const { tokenData, logOut } = useContext(AuthContext)

  const accountRefElement = useRef<HTMLButtonElement>(null)
  const infoRefElement = useRef<HTMLButtonElement>(null)

  return (
    <>
      <TopBar>
        <TopBar.Header>
          <Icon data={grid_on} />
          Mercury - Calculator
        </TopBar.Header>
        <TopBar.Actions>
          <Icons>
            <Button
              variant="ghost_icon"
              onClick={() => setUserInfoOpen(!isUserInfoOpen)}
              id="account-anchor"
              ref={accountRefElement}
            >
              <Icon data={account_circle} title="user" />
            </Button>
            <Button
              variant="ghost_icon"
              onClick={() => setAboutOpen(!isAboutOpen)}
              id="info-anchor"
              ref={infoRefElement}
            >
              <Icon data={info_circle} />
            </Button>
          </Icons>
        </TopBar.Actions>
      </TopBar>
      <Popover open={isUserInfoOpen} anchorEl={accountRefElement.current}>
        <Popover.Header>
          <Popover.Title>Logged in user</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          {AUTH_DISABLED ? (
            <p>Not logged in</p>
          ) : (
            <>
              <p>{tokenData?.name}</p>
              <p>{tokenData?.upn}</p>
            </>
          )}
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={() => setUserInfoOpen(false)}>Close</Button>
          <Button
            onClick={() => logOut()}
            color={'secondary'}
            variant={'outlined'}
          >
            Logout
          </Button>
          <Button
            onClick={() => localStorage.removeItem('packages')}
            color={'secondary'}
            variant={'outlined'}
          >
            Reset application
          </Button>
        </Popover.Actions>
      </Popover>
      <Popover open={isAboutOpen} anchorEl={infoRefElement.current}>
        <Popover.Header>
          <Popover.Title>About</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          {/*TODO: Read from public 'version.txt' file*/}
          <p>Version: 0.0.1-rc1</p>
          <p>Person of contact: Eleni Pantelli (elp@equinor.com)</p>
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </Popover.Actions>
      </Popover>
    </>
  )
}
