import { useMemo, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import ForecastControls from '../components/ForecastControls'
import ForecastSummaryCard from '../components/ForecastSummaryCard'
import ForecastTrendCard from '../components/ForecastTrendCard'
import { useCommerceData } from '../context/CommerceDataContext'

export default function ForecastPage() {
  const { dashboardData } = useCommerceData()
  const availableSkus = dashboardData.availableSkus
  const fallbackSku = availableSkus[0] || ''

  const [selectedSku, setSelectedSku] = useState(fallbackSku)
  const [method, setMethod] = useState('rolling-average')

  useEffect(() => {
    if (!availableSkus.includes(selectedSku)) {
      setSelectedSku(fallbackSku)
    }
  }, [availableSkus, selectedSku, fallbackSku])

  const baseForecast = dashboardData.forecastData[selectedSku]

  const adjustedForecast = useMemo(() => {
    if (!baseForecast) {
      return {
        currentInventory: 0,
        salesVelocity: 0,
        forecastedDemand: 0,
        stockoutDate: 'No data',
        reorderRecommendation: 'Upload orders and inventory data',
        forecastTrend: [],
      }
    }

    const multiplier = method === 'rolling-average' ? 1 : 1.08

    return {
      currentInventory: baseForecast.currentInventory,
      salesVelocity:
        method === 'rolling-average'
          ? baseForecast.salesVelocity
          : Number((baseForecast.salesVelocity * 1.1).toFixed(1)),
      forecastedDemand: Math.round(baseForecast.forecastedDemand * multiplier),
      stockoutDate:
        method === 'rolling-average'
          ? baseForecast.stockoutDate
          : 'Slightly sooner than rolling average estimate',
      reorderRecommendation:
        method === 'rolling-average'
          ? baseForecast.reorderRecommendation
          : `${baseForecast.reorderRecommendation} with higher urgency`,
      forecastTrend: baseForecast.forecastTrend.map((item) => ({
        ...item,
        demand: Math.round(item.demand * multiplier),
      })),
    }
  }, [baseForecast, method])

  return (
    <div>
      <PageHeader
        title="Forecast Lab"
        subtitle="Compare forecasting assumptions and monitor inventory risk by SKU."
      />

      <Container>
        <ForecastControls
          selectedSku={selectedSku}
          setSelectedSku={setSelectedSku}
          method={method}
          setMethod={setMethod}
          availableSkus={availableSkus}
        />

        <ForecastSummaryCard
          currentInventory={adjustedForecast.currentInventory}
          salesVelocity={adjustedForecast.salesVelocity}
          forecastedDemand={adjustedForecast.forecastedDemand}
          stockoutDate={adjustedForecast.stockoutDate}
          reorderRecommendation={adjustedForecast.reorderRecommendation}
          method={method}
        />

        <ForecastTrendCard data={adjustedForecast.forecastTrend} />
      </Container>
    </div>
  )
}