import { Button, Icon } from '@equinor/eds-core-react'
import { account_circle, log_out } from '@equinor/eds-icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { Popover } from '../../../components'

export function AccountInformation() {
  const { tokenData, logOut } = useContext(AuthContext)

  const [isOpen, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const togglePopover = () => setOpen(!isOpen)

  // unique_name might be azure-specific, different tokenData-fields might
  // be available if another OAuth-provider is used.
  const username = tokenData?.name ?? 'Anonymous'

  const resetApplicationData = () => {
    localStorage.removeItem('packages')
    window.location.reload()
  }

  return (
    <>
      <Button variant="ghost_icon" onClick={togglePopover} ref={ref}>
        <Icon data={account_circle} size={24} />
      </Button>
      <Popover
        content={
          <p>
            Signed in as {username} <br />
          </p>
        }
        actions={
          <>
            <SignOutButton onClick={() => logOut()} />
            <ResetApplicationButton onClick={() => resetApplicationData()} />
          </>
        }
        title="Account information"
        isOpen={isOpen}
        toggle={togglePopover}
        anchor={ref.current}
      />
    </>
  )
}

function SignOutButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outlined" color="danger" onClick={onClick}>
      Sign out <Icon data={log_out} />
    </Button>
  )
}

function ResetApplicationButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} color={'secondary'} variant={'outlined'}>
      Reset application data
    </Button>
  )
}
