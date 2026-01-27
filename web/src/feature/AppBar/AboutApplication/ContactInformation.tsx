import { Typography } from '@equinor/eds-core-react'

export function ContactInformation(props: {
  title: string
  email: string
  name: string
}) {
  return (
    <p>
      {`${props.title}: `}
      <Typography link href={`mailto:${props.email}`}>
        {props.name}
      </Typography>
    </p>
  )
}
