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

const CheckMarkUnorderedListElement = styled.li`
  &:before {
    content: '\\2713';
    margin-left: -20px;
    margin-right: 10px;
  }
`

const NoBulletUnorderedList = styled.ul`
  list-style: none;
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
              variant="ghost"
              target="_blank"
              href="https://github.com/equinor/mercury"
            >
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
          <Popover.Title>
            About
            <VersionText />
            <p>Person of contact: Eleni Pantelli (elp@equinor.com)</p>
            <p>Technical Support: fg_team_hermes@equinor.com</p>
          </Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <p>
            This calculator performs phase equilibrium calculations for mercury.
            It can be used to provide mercury distribution results for
            hydrocarbon mixtures at different temperatures and pressures.
            Depending on the corresponding conditions used, the calculator can
            provide results up to 4 separate phases: Hydrocarbon Gas/Hydrocarbon
            Liquid/Aqueous/Pure Mercury (liquid or solid).
          </p>

          <p>
            The core of the calculator is the UMR model (1-4). This model has
            been qualified for mercury calculations through the research
            activity “Mercury distribution in the oil & gas value chain”{' '}
            <a
              target="_blank"
              href={
                'https://colab.equinor.com/technologies/75C06E9B-49E4-4746-940E-EE6E33ED7F3E/summary'
              }
              rel="noreferrer"
            >
              colab link
            </a>
            .
          </p>

          <p>
            The model was tested and qualified for gas/condensate systems for
            the following conditions:
          </p>

          <p>
            <b>Offshore applications:</b> -30 to 110°C, 1 to 160 bara.
          </p>
          <NoBulletUnorderedList>
            <CheckMarkUnorderedListElement>
              The model can be used for hydrocarbon systems with an overall
              uncertainty of 50% for gas systems and an order of magnitude for
              liquid systems. For the gas systems, the model tends to
              underpredict mercury concentration, while for condensate systems
              the model tends to overpredict with values up to appr. 10 times
              higher (non-stabilized).
            </CheckMarkUnorderedListElement>

            <CheckMarkUnorderedListElement>
              The model can be used for produced water calculations, with
              estimated uncertainty an order of magnitude (overestimation).
            </CheckMarkUnorderedListElement>
          </NoBulletUnorderedList>

          <p>
            <b>Onshore applications:</b> -50 to 150°C, 1 to 90 bara.
          </p>

          <NoBulletUnorderedList>
            <CheckMarkUnorderedListElement>
              The model can be used for hydrocarbon/Hg calculations, and it will
              provide realistic and representative Hg concentrations and
              distribution. For gas systems, the model tends to predict higher
              concentrations but in the same order of magnitude as the
              measurements. For hydrocarbon liquid systems, the model tends to
              predict higher Hg concentrations, which can be up to an order of
              magnitude higher.
            </CheckMarkUnorderedListElement>
          </NoBulletUnorderedList>
          <p>
            It is also possible to use the model for glycol systems (MEG and
            TEG) but the uncertainty of the model is not defined for such
            calculations.
          </p>

          <ul>
            <li>
              The architecture contract for the calculator can be found{' '}
              <a
                target="_blank"
                href={
                  'https://github.com/equinor/architecturecontract/blob/master/contracts/Mercury.md'
                }
                rel="noreferrer"
              >
                here
              </a>
              (requires sign in)
            </li>

            <li>
              Test fluids for calculations are available as{' '}
              <a
                target="_blank"
                href={
                  'https://github.com/equinor/mercury/blob/main/api/src/tests/test_data/multiflash_data.py'
                }
                rel="noreferrer"
              >
                python code{' '}
              </a>
              and as a{' '}
              <a
                target="_blank"
                href={
                  'https://statoilsrm.sharepoint.com/:x:/r/sites/ts-96446/Shared%20Documents/Web%20tool%20for%20Hg%20calculations/Test%20fluids%20for%20mercury%20calculator.xlsx?d=wb4db1e09572d470e926fb53444beaa21&csf=1&web=1&e=YUhpF9'
                }
                rel="noreferrer"
              >
                excel sheet
              </a>
            </li>

            <li>
              For technical support and improvement suggestions please contact:
              fg_team_hermes@equinor.com
            </li>
          </ul>

          <p>
            <b>References</b>
          </p>
          <ol>
            <li>
              Voutsas E, Magoulas K, Tassios D. Universal mixing rule for cubic
              equations of state applicable to symmetric and asymmetric systems:
              results with the Peng−Robinson equation of state. Ind Eng Chem Res
              2004; 43(19):6238–46.
            </li>
            <li>
              Novak N, Louli V, Skouras S, Voutsas E. Prediction of dew points
              and liquid dropouts of gas condensate mixtures. Fluid Phase
              Equilibria 2018; 457:62–73.
            </li>
            <li>
              Koulocheris V, Louli V, Panteli E, Skouras S, Voutsas E, Modelling
              of elemental mercury solubility in natural gas components, Fuel
              233 (2018) 558-564.
            </li>
            <li>
              Koulocheris V, Plakia A, Louli V, Panteli E, Voutsas E,
              Calculating the chemical and phase equilibria of mercury in
              natural gas, Fluid Phase Equilibria, 544-545 (2021) 113089.{' '}
            </li>
          </ol>
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </Popover.Actions>
      </Popover>
    </>
  )
}
