import styled from 'styled-components'
import { Button, Icon, Popover, TopBar } from '@equinor/eds-core-react'
import {
  account_circle,
  external_link,
  grid_on,
  info_circle,
} from '@equinor/eds-icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { AUTH_DISABLED } from '../constants'
import { VersionText } from './VersionText'

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
            <Button variant="ghost" href="https://github.com/equinor/mercury">
              Github <Icon data={external_link} />
            </Button>
            <Button
              variant="ghost_icon"
              onClick={() => {
                setUserInfoOpen(!isUserInfoOpen)
                setAboutOpen(false)
              }}
              id="account-anchor"
              ref={accountRefElement}
            >
              <Icon data={account_circle} title="user" />
            </Button>
            <Button
              variant="ghost_icon"
              onClick={() => {
                setUserInfoOpen(false)
                setAboutOpen(!isAboutOpen)
              }}
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
            onClick={() => {
              localStorage.removeItem('packages')
              window.location.reload()
            }}
            color={'secondary'}
            variant={'outlined'}
          >
            Reset application data
          </Button>
        </Popover.Actions>
      </Popover>
      <Popover open={isAboutOpen} anchorEl={infoRefElement.current}>
        <Popover.Header>
          <Popover.Title>About</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <VersionText />
          <p>Person of contact: Eleni Pantelli (elp@equinor.com)</p>
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </Popover.Actions>
      </Popover>
    </>
  )
}
