import { css } from '@emotion/react'
import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'
import { useCategoryChart } from '../../atoms/chartState'
import { randomColors } from '../../lib/chartColors'
import media from '../../lib/styles/media'
import Header from '../Header'

export type CategorySectionProps = {}

function CategorySection({}: CategorySectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const category = useCategoryChart()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    if (!chartRef.current) {
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: category.map(category => category.category),
          datasets: [
            {
              data: category.map(category => category.count),
              backgroundColor: randomColors(6),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: 'x',
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
        },
      })
      chartRef.current = chart
    } else {
      const chart = chartRef.current
      chart.data.labels = category.map(category => category.category)
      chart.data.datasets[0].data = category.map(category => category.count)
      chart.update()
    }
  }, [category])

  return (
    <div css={wrapper}>
      <Header text="선호하는 도서 카테고리" />
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

export default CategorySection
