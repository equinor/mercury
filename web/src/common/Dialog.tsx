import styled from 'styled-components'
import { Dialog as EdsDialog, Typography } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'

const WideEdsDialog = styled(EdsDialog)`
  width: auto;
  @media (min-width: 900px) {
    min-width: 800px;
  }
`

const FluidPackageForm = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  justify-content: space-between;
`

const FirstColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  width: 40%;
`

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  padding-top: 16px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 420px;
`

export const Dialog = (props: {
  close: () => void
  header: string
  columns: JSX.Element[][]
  leftButtons: JSX.Element[]
  rightButtons: JSX.Element[]
}) => {
  return (
    <WideEdsDialog open onClose={props.close} isDismissable>
      <EdsDialog.Header>
        <Typography
          variant="h6"
          color={tokens.colors.infographic.primary__moss_green_100.hex}
        >
          {props.header}
        </Typography>
      </EdsDialog.Header>
      <EdsDialog.CustomContent>
        <FluidPackageForm>
          <FirstColumn>{props.columns[0]}</FirstColumn>
          <SecondColumn>{props.columns[1]}</SecondColumn>
        </FluidPackageForm>
        <ButtonRow>
          <ButtonGroup>{props.rightButtons}</ButtonGroup>
          <ButtonGroup>{props.leftButtons}</ButtonGroup>
        </ButtonRow>
      </EdsDialog.CustomContent>
    </WideEdsDialog>
  )
}
