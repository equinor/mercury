import { Button, Icon } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import { useRef, useState } from 'react'
import {
  APP_NAME,
  CONTACT_PERSON_EMAIL,
  CONTACT_PERSON_NAME,
  TECHNICAL_SUPPORT_EMAIL,
} from '../../../common/constants'
import { Popover } from '../../../components'
import { AppVersion } from './AppVersion'
import { ContactInformation } from './ContactInformation'

export function AboutApplication() {
  const [isOpen, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLButtonElement>(null)

  function handleTogglePopover() {
    setOpen(!isOpen)
  }

  return (
    <>
      <Button variant="ghost_icon" onClick={handleTogglePopover} ref={ref}>
        <Icon data={info_circle} size={24} />
      </Button>
      <Popover
        content={
          <>
            <AppVersion />
            <ContactInformation
              title="Person of Contact"
              email={CONTACT_PERSON_EMAIL}
              name={CONTACT_PERSON_NAME}
            />
            <ContactInformation
              title="Technical Support"
              email={TECHNICAL_SUPPORT_EMAIL}
              name="Team Hermes"
            />
          </>
        }
        title={`About ${APP_NAME}`}
        isOpen={isOpen}
        toggle={handleTogglePopover}
        anchor={ref.current}
      />
    </>
  )
}
