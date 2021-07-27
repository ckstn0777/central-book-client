import { css } from '@emotion/react'
import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import PopularBooks from '../../components/PopularBooks'
import RecentBooks from '../../components/RecentBooks'
import SaseoBooks from '../../components/SaseoBooks'
import userStorage from '../../lib/storage/userStorage'

export type ExploreProps = {}

function Explore({}: ExploreProps) {
  const user = userStorage.get()
  const history = useHistory()

  if (!user) {
    history.replace('/')
  }

  return (
    <div css={wrapper}>
      <Helmet>
        <title>만남의 광장 – Central Book</title>
      </Helmet>
      <PopularBooks />
      <RecentBooks />
      <SaseoBooks />
    </div>
  )
}

const wrapper = css``

export default Explore
