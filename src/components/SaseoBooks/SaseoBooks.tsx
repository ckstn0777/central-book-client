import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import useSaseoBook from '../../hooks/useSaseoBook'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Header from '../Header'
import Spinner from '../Spinner'
import { SaseoBook } from './SaseoBook'

export type SaseoBooksProps = {}

function SaseoBooks({}: SaseoBooksProps) {
  const [books, pageCnt, loading, loadSaesoRecoomendBook] = useSaseoBook()
  const options = useMemo(
    () => [
      { value: 0, label: '전체' },
      { value: 11, label: '문학' },
      { value: 6, label: '인문과학' },
      { value: 5, label: '사회과학' },
      { value: 4, label: '자연과학' },
    ],
    []
  )
  const [category, setCategory] = useState({ value: 0, label: '전체' })
  const [currentPage, setCurrentPage] = useState(0)

  const changePage = useCallback(
    ({ selected }) => {
      // console.log(selected)
      setCurrentPage(selected)
      loadSaesoRecoomendBook(category.value, selected + 1)
    },
    [loadSaesoRecoomendBook, category]
  )

  useEffect(() => {
    loadSaesoRecoomendBook(category.value, 1)
  }, [loadSaesoRecoomendBook, category])

  // if (!loading) {
  //   return (

  //   )
  // }

  return (
    <div css={SaseoBooksWrapper}>
      <div className="header-wraper">
        <Header text="국립 중앙 도서관 사서 추천도서" />
        <Select
          value={category}
          options={options}
          onChange={e => {
            setCategory({ value: e!.value, label: e!.label })
            setCurrentPage(0)
          }}
        />
      </div>

      {loading ? (
        <div css={fullPageSpinner}>
          <Spinner size="10rem" />
        </div>
      ) : (
        <div css={BookContainer}>
          <div css={GridBookWrapper}>
            {books?.map(book => (
              <SaseoBook
                key={book.title}
                title={book.title}
                image_url={book.image_url}
              />
            ))}
          </div>
        </div>
      )}

      <ReactPaginate
        pageCount={pageCnt}
        forcePage={currentPage}
        pageRangeDisplayed={9}
        marginPagesDisplayed={0}
        breakLabel={''}
        previousLabel={'이전'}
        nextLabel={'다음'}
        onPageChange={changePage}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'pageLabel-btn'}
        nextClassName={'pageLabel-btn'}
      />
    </div>
  )
}

const SaseoBooksWrapper = css`
  background-color: ${palette.amber[50]};
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .header-wraper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    & > div {
      width: 12rem;
    }
  }

  .pagination {
    margin: 0 auto;

    & > li {
      display: inline-block;
      padding-left: 0;
      list-style: none;
      cursor: pointer;
    }
    & > li > a,
    & > li > span {
      position: relative;
      float: left;
      padding: 6px 12px;
      line-height: 1.42857143;
      text-decoration: none;
      color: #2c689c;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;
    }

    & > li.active > a {
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }

    & > li > a:hover {
      background-color: #218838;
      color: white;
    }
  }
`

const BookContainer = css`
  position: relative;

  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 5vw;
`

const GridBookWrapper = css`
  /* display: flex;
  flex-wrap: wrap; */
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 3vw;
  grid-row-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;

  ${media.xxlarge} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  ${media.xlarge} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  ${media.large} {
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  ${media.medium} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  ${media.small} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const fullPageSpinner = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export default SaseoBooks
