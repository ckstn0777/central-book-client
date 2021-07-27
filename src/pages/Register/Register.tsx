import { css } from '@emotion/react'
import Button from '../../components/Button'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'
import { useCallback, useEffect, useState } from 'react'
import useGoogleSignup from '../../hooks/useGoogleSignup'
import { main_background } from '../../assets/images'
import GridButton from '../../components/GridButton/GridButton'
import { Helmet } from 'react-helmet-async'

export type RegisterProps = {}

function Register({}: RegisterProps) {
  const [gender, setGender] = useState<string | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [disabled, setDisabled] = useState<boolean>(true)
  const { loading, signup } = useGoogleSignup()

  const onSetAgeClick = useCallback((age: number) => {
    setAge(age)
  }, [])

  useEffect(() => {
    if (gender && age) {
      setDisabled(false)
    }
  }, [gender, age])

  const onSubmit = useCallback(
    async e => {
      e.preventDefault()
      const userData = {
        age,
        gender,
      }
      await signup(userData)
    },
    [age, gender, signup]
  )

  return (
    <div css={AuthStyle}>
      <Helmet>
        <title>Central Book – 회원가입</title>
      </Helmet>
      <div css={LogoStyle}>📖Central Book</div>
      <div css={RegisterStyle}>
        <h2>Welcom to Central Book🎉</h2>
        <Header text="당신은 어떤 사람입니까?" css={HeaderStyle} />
        <div css={CircleButtonStyle}>
          <CircleButton
            icon="female"
            text="여자"
            gender={gender}
            onClick={() => setGender('female')}
          />
          <CircleButton
            icon="man"
            text="남자"
            gender={gender}
            onClick={() => setGender('man')}
          />
          <CircleButton
            icon="question"
            text="기타"
            gender={gender}
            onClick={() => setGender('question')}
          />
        </div>
        <GridButton age={age} onSetAgeClick={onSetAgeClick} />
        <Button text="Register" onClick={onSubmit} disabled={disabled} />
      </div>
    </div>
  )
}

const AuthStyle = css`
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 4rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-image: url(${main_background});
`

const LogoStyle = css`
  font-size: 2rem;
  font-weight: bold;
  color: white;
`

const RegisterStyle = css`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  width: 50%;
  padding: 3rem;
  background-color: white;

  display: flex;
  flex-direction: column;
`

const HeaderStyle = css`
  font-size: 1.15rem;
`

const CircleButtonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`

export default Register
