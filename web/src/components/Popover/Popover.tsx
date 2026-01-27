import { Button, Popover as EDSPopover, Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'

interface PopoverProps {
  content: React.ReactNode
  actions?: React.ReactNode
  title: string
  toggle: () => void
  isOpen: boolean
  anchor?: HTMLElement | null
}

export const Popover = ({
  content,
  actions,
  title,
  toggle,
  isOpen,
  anchor,
}: PopoverProps) => {
  return (
    <EDSPopover open={isOpen} anchorEl={anchor} onClose={toggle} trapFocus>
      <EDSPopover.Header>
        <EDSPopover.Title>{title}</EDSPopover.Title>
        <Button
          style={{ height: '32px', width: '32px' }}
          variant="ghost_icon"
          aria-label="Close popover"
          onClick={toggle}
        >
          <Icon data={close} size={24} />
        </Button>
      </EDSPopover.Header>
      <EDSPopover.Content>{content}</EDSPopover.Content>
      {actions !== null && <EDSPopover.Actions>{actions}</EDSPopover.Actions>}
    </EDSPopover>
  )
}
