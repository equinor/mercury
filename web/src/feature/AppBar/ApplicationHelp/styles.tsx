import styled from 'styled-components'

export const Icons = styled.div`
  display: flex;
  align-items: center;
`

export const CheckMarkUnorderedListElement = styled.li`
  &:before {
    content: '\\2713';
    margin-left: -20px;
    margin-right: 10px;
  }
`

export const NoBulletUnorderedList = styled.ul`
  list-style: none;
`
