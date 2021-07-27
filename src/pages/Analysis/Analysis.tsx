import { css } from '@emotion/react'
import userStorage from '../../lib/storage/userStorage'
import { useHistory } from 'react-router-dom'
import PublisherSection from '../../components/AnalysisSection/PublisherSection'
import AuthorSection from '../../components/AnalysisSection/AuthorSection'
import CategorySection from '../../components/AnalysisSection/CategorySection'
import useChartDataQuery from '../../hooks/query/useChartDataQuery'
import media from '../../lib/styles/media'
import { Helmet } from 'react-helmet-async'
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useRef, useState } from 'react'
import getCalendar from '../../lib/api/me/getCalendarDate'

export type Calendar = {
  start: string
  end: string
  overlap: boolean
  display: string
  backgroundColor: string
}

export type AnalysisProps = {}

function Analysis({}: AnalysisProps) {
  const [eventCalendar, setEventCalendar] = useState<Calendar[] | null>(null)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const user = userStorage.get()
  const history = useHistory()

  useChartDataQuery(`@${user?.username!}`)
  const calendarRef = useRef(null)

  useEffect(() => {
    getCalendar(`@${user?.username!}`, year, month).then(data => {
      const event = []
      for (const [key, value] of Object.entries(data)) {
        event.push({
          start: '20' + key,
          end: '20' + key,
          overlap: false,
          display: 'background',
          backgroundColor:
            value === 1 ? '#9BE9A8' : value === 2 ? '#3EBA5F' : '#216E39',
        })
      }
      setEventCalendar(event)
    })
  }, [month, setEventCalendar])

  if (!user) {
    history.replace('/')
  }

  return (
    <div css={wrapper}>
      <Helmet>
        <title>통계 분석 – Central Book</title>
      </Helmet>

      <CategorySection />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ right: 'today,customPrevButton,customNextButton' }}
        events={eventCalendar as EventSourceInput}
        customButtons={{
          customPrevButton: {
            text: '이전달',
            click: () => {
              setMonth(prev => {
                if (prev === 1) {
                  setYear(prev => prev - 1)
                  return 12
                }
                return prev - 1
              })
              setEventCalendar(null)
              const calendarApi = (calendarRef.current as any).getApi()
              calendarApi.prev()
            },
          },
          customNextButton: {
            text: '다음달',
            click: () => {
              setMonth(prev => {
                if (prev === 12) {
                  setYear(prev => prev + 1)
                  return 1
                }
                return prev + 1
              })
              setEventCalendar(null)
              const calendarApi = (calendarRef.current as any).getApi()
              calendarApi.next()
            },
          },
        }}
        // eventChange={() => console.log('wefewqf')}
        locale="ko"
        // viewDidMount={() => console.log('ewfwef')}

        eventBackgroundColor="#378006"
      />
      <PublisherSection />
      <AuthorSection />
    </div>
  )
}

const wrapper = css`
  /* display: flex;
  flex-direction: column;
  padding: 3rem 2rem 1rem; */

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 1rem;

  padding: 1rem 2rem;

  .fc {
    width: 35rem;
    height: 35rem;

    .fc-scroller fc-scroller-liquid-absolute {
      overflow: none;
    }

    .fc-toolbar-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.4rem;
    }
    /* td {
      width: 8rem;
    } */

    .fc-daygrid-day.fc-day-today {
      background: none;
      color: blue;
    }
  }

  ${media.medium} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    .fc {
      order: -1;
      width: 100%;
    }
  }
`

// const columnWrapper = css`
//   display: flex;

//   ${media.large} {
//     flex-direction: column;
//   }
// `

// const calendarStyle = css`
//   .fc {
//     width: 100%;
//     height: 100%;
//     padding: 1rem;
//   }
// `

export default Analysis
