import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import Header from '../Header'
import { randomColors } from '../../lib/chartColors'
import { usePublisherChart } from '../../atoms/chartState'

export type PublisherSectionProps = {}

function PublisherSection({}: PublisherSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const publisher = usePublisherChart()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    if (!chartRef.current) {
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: publisher.map(pub => pub.publisher),
          datasets: [
            {
              label: 'Dataset 1',
              data: publisher.map(pub => pub.count),
              backgroundColor: randomColors(6),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            // legend: {
            //   labels: {
            //     font: {
            //       size: 16,
            //     },
            //   },
            // },
          },
        },
      })
      chartRef.current = chart
    } else {
      const chart = chartRef.current
      chart.data.labels = publisher.map(publisher => publisher.publisher)
      chart.data.datasets[0].data = publisher.map(publisher => publisher.count)
      chart.update()
    }
  }, [publisher])

  return (
    <div css={wrapper}>
      <Header text="선호하는 출판사" />
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
    max-width: 30rem;
    max-height: 30rem;
    //height: 50rem;
  }
`

export default PublisherSection
