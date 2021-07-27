import { css } from '@emotion/react'
import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'
import { useAuthorChart } from '../../atoms/chartState'
import { randomColors } from '../../lib/chartColors'
import Header from '../Header'

export type AuthorSectionProps = {}

function AuthorSection({}: AuthorSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const author = useAuthorChart()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    if (!chartRef.current) {
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: author.map(author => author.author),
          datasets: [
            {
              data: author.map(author => author.count),
              backgroundColor: randomColors(6),
            },
          ],
        },
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          // scales: {
          //   x: {
          //     ticks: {
          //       font: {
          //         size: 18,
          //       },
          //     },
          //   },
          //   y: {
          //     ticks: {
          //       font: {
          //         size: 18,
          //       },
          //     },
          //   },
          // },
          // aspectRatio: 1.5,
          responsive: true,

          // maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
      chartRef.current = chart
    } else {
      const chart = chartRef.current
      chart.data.labels = author.map(author => author.author)
      chart.data.datasets[0].data = author.map(author => author.count)
      chart.update()
    }
  }, [author])

  return (
    <div css={wrapper}>
      <Header text="선호하는 저자" />
      <div className="chart-box">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

const wrapper = css`
  width: 100%;
  height: 100%;
  padding: 1rem;

  .chart-box {
    max-width: 50rem;
    max-height: 50rem;
    //height: 50rem;
  }
  /* & > canvas {
    padding: 1rem;
    width: 80% !important;
    height: 80% !important;
  } */
`

export default AuthorSection
