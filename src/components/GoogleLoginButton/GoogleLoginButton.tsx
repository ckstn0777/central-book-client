import { css } from '@emotion/react'
import { useCallback } from 'react'
import GoogleLogin from 'react-google-login'
import useGoogleSignin from '../../hooks/useGoogleSignin'

export type GoogleLoginButtonProps = {}

function GoogleLoginButton({}: GoogleLoginButtonProps) {
  // const buttonRef = useRef<HTMLButtonElement>(null)
  const { signin, isLoading, setIsLoading } = useGoogleSignin()

  const onSuccess = useCallback(
    googleUser => {
      console.log('success')
      setIsLoading(true)
      signin(googleUser.getAuthResponse(true).access_token)
    },
    [signin, setIsLoading]
  )

  const onFailure = useCallback(error => {
    console.log(error)
  }, [])

  return (
    <GoogleLogin
      clientId="1038856616662-2u26cq72g75ug01c9jjs1jbu6pdhqkni.apps.googleusercontent.com"
      render={renderProps => (
        <button
          css={ButtonStyle}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google"
          />
          Google Login
        </button>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      uxMode="redirect"
      isSignedIn={true}
    />
  )
}

const ButtonStyle = css`
  height: 3.5rem;
  padding: 1rem 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.15rem;

  img {
    margin-right: 0.5rem;
  }
`

export default GoogleLoginButton
