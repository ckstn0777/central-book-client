import { css } from '@emotion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { noimage } from '../../assets/images'
import usePopularBookQuery from '../../hooks/query/usePopularBookQuery'
import Header from '../Header'
import { SaseoBook } from '../SaseoBooks/SaseoBook'
import PopularBookSkeleton from './PopularBookSkeleton'

export type PopularBooksProps = {}

function PopularBooks({}: PopularBooksProps) {
  const { data, hasNextPage, fetchNextPage } = usePopularBookQuery()
  // const options = useMemo(
  //   () => [
  //     { value: 0, label: '전체' },
  //     { value: 11, label: '문학' },
  //     { value: 6, label: '인문과학' },
  //     { value: 5, label: '사회과학' },
  //     { value: 4, label: '자연과학' },
  //   ],
  //   []
  // )
  // const [category, setCategory] = useState({ value: 0, label: '전체' })

  const items = useMemo(() => {
    if (!data) return null
    return data.pages.flat()
  }, [data])

  const ref = useRef<HTMLDivElement>(null)
  const observer = useMemo(
    () =>
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fetchNextPage()
          }
        })
      }),
    [fetchNextPage]
  )

  useEffect(() => {
    if (!items) return
    if (!ref.current) return
    const el = ref.current
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [observer, items])

  return (
    <div css={wrapper}>
      {/* <div className="header-wraper"> */}
      <Header text="주간 인기도서" />
      {/* <Select
          value={category}
          options={options}
          onChange={e => {
            setCategory({ value: e!.value, label: e!.label })
          }}
        /> */}

      <ScrollContainer
        className="scroll-container"
        horizontal={true}
        css={scorllWrapper}
        // nativeMobileScroll={true}
      >
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <PopularBookSkeleton key={i} />
        ))} */}
        {items
          ? items?.map((popularBook, idx) => (
              <Link
                css={popularWrapper}
                key={popularBook.book_id}
                to={`/explore/book/${popularBook.book_id}`}
              >
                <h3>{`${idx + 1}등`}</h3>
                <SaseoBook
                  title={popularBook.book_title}
                  image_url={popularBook.book_image_url || noimage}
                  count={popularBook.count}
                  popular={true}
                />
              </Link>
            ))
          : Array.from({ length: 10 }).map((_, i) => (
              <PopularBookSkeleton key={i} />
            ))}
        {/* <div ref={ref} /> */}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <PopularBookSkeleton key={i} ref={i === 0 ? ref : undefined} />
          ))}
      </ScrollContainer>
    </div>
  )
}

const wrapper = css`
  padding: 3rem 2rem;
  padding-bottom: 0;
  min-height: 30vh;

  /* .header-wraper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    & > div {
      width: 12rem;
    }
  } */
`

const scorllWrapper = css`
  display: flex;
  cursor: grab;
  padding: 1rem;
`

const popularWrapper = css`
  display: flex;
  & + & {
    margin-left: 2rem;
  }

  h3 {
    margin-right: 1rem;
    white-space: nowrap;
  }
`

export default PopularBooks
