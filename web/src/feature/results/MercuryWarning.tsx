import { Banner, Icon } from '@equinor/eds-core-react'
import { warning_outlined } from '@equinor/eds-icons'

export const MercuryWarning = (): JSX.Element => {
  return (
    <Banner>
      <Banner.Icon variant="warning">
        <Icon data={warning_outlined} />
      </Banner.Icon>
      <Banner.Message>Liquid mercury has been formed</Banner.Message>
    </Banner>
  )
}
