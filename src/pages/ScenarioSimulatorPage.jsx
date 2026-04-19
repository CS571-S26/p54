import { useMemo, useState } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import ScenarioControls from '../components/ScenarioControls'
import ScenarioResults from '../components/ScenarioResults'
import { useCommerceData } from '../context/CommerceDataContext'

function BaselineCard({ results }) {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        <h2 className="fs-5 mb-3">Current Baseline</h2>

        <Row className="g-2">
          <Col xs={6}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Revenue</div>
              <div className="fw-bold">
                ${Math.round(results.baselineRevenue).toLocaleString()}
              </div>
            </div>
          </Col>

          <Col xs={6}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Demand</div>
              <div className="fw-bold">
                {Math.round(results.baselineDemand).toLocaleString()} units
              </div>
            </div>
          </Col>

          <Col xs={6}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Conversion</div>
              <div className="fw-bold">{results.baselineConversionRate.toFixed(2)}%</div>
            </div>
          </Col>

          <Col xs={6}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Margin</div>
              <div className="fw-bold">{results.baselineMargin.toFixed(1)}%</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default function ScenarioSimulatorPage() {
  const { dashboardData } = useCommerceData()

  const [discountPercent, setDiscountPercent] = useState(10)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50)
  const [creatorCommission, setCreatorCommission] = useState(12)
  const [adSpendMultiplier, setAdSpendMultiplier] = useState(100)

  const results = useMemo(() => {
    const baseConversionRate = Number(dashboardData.scenarioBaseline.conversionRate) || 4.8
    const baseRevenue = Number(dashboardData.scenarioBaseline.revenue) || 128400
    const baseMargin = Number(dashboardData.scenarioBaseline.margin) || 34
    const baseDemand = Number(dashboardData.scenarioBaseline.demand) || 3200

    const commissionLift = creatorCommission - 12
    const discountLift = discountPercent - 10
    const shippingLift = 50 - freeShippingThreshold
    const adLift = adSpendMultiplier - 100

    const projectedConversionRate =
      baseConversionRate +
      discountLift * 0.05 +
      shippingLift * 0.01 +
      adLift * 0.01 +
      commissionLift * 0.02

    const projectedDemand =
      baseDemand +
      discountLift * 35 +
      adLift * 8 +
      shippingLift * 3 +
      commissionLift * 18

    const projectedRevenue =
      baseRevenue +
      discountLift * 900 +
      adLift * 350 +
      commissionLift * 220 +
      shippingLift * 60

    const projectedMargin =
      baseMargin -
      discountLift * 0.4 -
      commissionLift * 0.25 -
      shippingLift * 0.05

    let stockoutRisk = 'Low'
    if (projectedDemand > baseDemand * 1.12) stockoutRisk = 'Medium'
    if (projectedDemand > baseDemand * 1.22) stockoutRisk = 'High'

    return {
      projectedConversionRate,
      projectedRevenue,
      projectedMargin,
      projectedDemand,
      stockoutRisk,
      baselineRevenue: baseRevenue,
      baselineDemand: baseDemand,
      baselineConversionRate: baseConversionRate,
      baselineMargin: baseMargin,
    }
  }, [
    dashboardData,
    discountPercent,
    freeShippingThreshold,
    creatorCommission,
    adSpendMultiplier,
  ])

  return (
    <div>
      <PageHeader
        title="Scenario Simulator"
        subtitle="Model pricing, commission, shipping, and paid-media tradeoffs using uploaded business data."
      />

      <Container fluid="lg">
        <Row className="g-3 mb-3">
          <Col xl={7}>
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
          </Col>

          <Col xl={5}>
            <BaselineCard results={results} />
          </Col>
        </Row>

        <Row className="g-3">
          <Col xl={12}>
            <ScenarioResults
              projectedConversionRate={results.projectedConversionRate}
              projectedRevenue={results.projectedRevenue}
              projectedMargin={results.projectedMargin}
              projectedDemand={results.projectedDemand}
              stockoutRisk={results.stockoutRisk}
              baselineRevenue={results.baselineRevenue}
              baselineDemand={results.baselineDemand}
              baselineConversionRate={results.baselineConversionRate}
              baselineMargin={results.baselineMargin}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}