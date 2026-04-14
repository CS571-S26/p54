import { useState } from 'react'
import { Container } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import ScenarioControls from '../components/ScenarioControls'
import ScenarioResults from '../components/ScenarioResults'

export default function ScenarioSimulatorPage() {
  const [discountPercent, setDiscountPercent] = useState(10)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50)
  const [creatorCommission, setCreatorCommission] = useState(12)
  const [adSpendMultiplier, setAdSpendMultiplier] = useState(100)

  const baseConversionRate = 4.8
  const baseRevenue = 128400
  const baseMargin = 34
  const baseDemand = 3200

  const projectedConversionRate =
    baseConversionRate +
    discountPercent * 0.05 +
    (100 - freeShippingThreshold) * 0.01 +
    (adSpendMultiplier - 100) * 0.01

  const projectedRevenue =
    baseRevenue +
    discountPercent * 900 +
    (adSpendMultiplier - 100) * 350 -
    creatorCommission * 120 -
    (freeShippingThreshold - 50) * 80

  const projectedMargin =
    baseMargin -
    discountPercent * 0.4 -
    creatorCommission * 0.2 -
    (100 - freeShippingThreshold) * 0.05

  const projectedDemand =
    baseDemand +
    discountPercent * 35 +
    (adSpendMultiplier - 100) * 8 -
    (freeShippingThreshold - 50) * 3

  let stockoutRisk = 'Low'

  if (projectedDemand > 3600) {
    stockoutRisk = 'Medium'
  }

  if (projectedDemand > 4200) {
    stockoutRisk = 'High'
  }

  return (
    <div>
      <PageHeader
        title="Scenario Simulator"
        subtitle="Interactive pricing, marketing, and fulfillment tradeoff prototype."
      />

      <Container>
        <ScenarioControls
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          freeShippingThreshold={freeShippingThreshold}
          setFreeShippingThreshold={setFreeShippingThreshold}
          creatorCommission={creatorCommission}
          setCreatorCommission={setCreatorCommission}
          adSpendMultiplier={adSpendMultiplier}
          setAdSpendMultiplier={setAdSpendMultiplier}
        />

        <ScenarioResults
          projectedConversionRate={projectedConversionRate}
          projectedRevenue={projectedRevenue}
          projectedMargin={projectedMargin}
          projectedDemand={projectedDemand}
          stockoutRisk={stockoutRisk}
        />
      </Container>
    </div>
  )
}