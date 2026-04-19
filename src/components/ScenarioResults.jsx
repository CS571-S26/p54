import { Card, Row, Col, Badge } from 'react-bootstrap'

function getRiskVariant(stockoutRisk) {
  if (stockoutRisk === 'High') return 'danger'
  if (stockoutRisk === 'Medium') return 'warning'
  return 'success'
}

function getScenarioNarrative({
  projectedConversionRate,
  projectedRevenue,
  projectedMargin,
  projectedDemand,
  stockoutRisk,
}) {
  const growthSignal =
    projectedRevenue > 12000
      ? 'aggressive growth'
      : projectedRevenue > 9500
      ? 'moderate growth'
      : 'more conservative performance'

  const riskSignal =
    stockoutRisk === 'High'
      ? 'inventory risk is elevated'
      : stockoutRisk === 'Medium'
      ? 'inventory pressure is increasing'
      : 'inventory risk remains manageable'

  const marginSignal =
    projectedMargin < 25
      ? 'Margin is compressed and should be monitored closely.'
      : projectedMargin < 30
      ? 'Margin remains acceptable but is trending lower.'
      : 'Margin remains relatively healthy in this scenario.'

  return `This scenario suggests ${growthSignal} with projected demand of ${projectedDemand.toFixed(
    0
  )} units and a conversion rate of ${projectedConversionRate.toFixed(
    2
  )}%. At the same time, ${riskSignal}. ${marginSignal}`
}

function MiniMetricCard({ label, value, subtext, tone = 'dark' }) {
  const toneClass =
    tone === 'success'
      ? 'text-success'
      : tone === 'danger'
      ? 'text-danger'
      : 'text-dark'

  return (
    <div className="p-2 bg-light rounded h-100">
      <div className="text-muted small">{label}</div>
      <div className={`fw-bold ${toneClass}`}>{value}</div>
      {subtext ? <div className="small text-muted">{subtext}</div> : null}
    </div>
  )
}

export default function ScenarioResults({
  projectedConversionRate,
  projectedRevenue,
  projectedMargin,
  projectedDemand,
  stockoutRisk,
  baselineRevenue,
  baselineDemand,
  baselineConversionRate,
  baselineMargin,
}) {
  const revenueDelta = projectedRevenue - baselineRevenue
  const demandDelta = projectedDemand - baselineDemand
  const conversionDelta = projectedConversionRate - baselineConversionRate
  const marginDelta = projectedMargin - baselineMargin

  const narrative = getScenarioNarrative({
    projectedConversionRate,
    projectedRevenue,
    projectedMargin,
    projectedDemand,
    stockoutRisk,
  })

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-5 mb-1">Scenario Results</h2>
            <p className="text-muted small mb-0">Live modeled outcomes.</p>
          </div>
          <Badge bg={getRiskVariant(stockoutRisk)}>Risk: {stockoutRisk}</Badge>
        </div>

        <Row className="g-2 mb-3">
          <Col xs={6} md={3}>
            <MiniMetricCard
              label="Revenue Δ"
              value={`${revenueDelta >= 0 ? '+' : ''}$${Math.round(revenueDelta).toLocaleString()}`}
              tone={revenueDelta >= 0 ? 'success' : 'danger'}
            />
          </Col>

          <Col xs={6} md={3}>
            <MiniMetricCard
              label="Demand Δ"
              value={`${demandDelta >= 0 ? '+' : ''}${Math.round(demandDelta).toLocaleString()} units`}
              tone={demandDelta >= 0 ? 'success' : 'danger'}
            />
          </Col>

          <Col xs={6} md={3}>
            <MiniMetricCard
              label="Conv. Δ"
              value={`${conversionDelta >= 0 ? '+' : ''}${conversionDelta.toFixed(2)} pts`}
              tone={conversionDelta >= 0 ? 'success' : 'danger'}
            />
          </Col>

          <Col xs={6} md={3}>
            <MiniMetricCard
              label="Margin Δ"
              value={`${marginDelta >= 0 ? '+' : ''}${marginDelta.toFixed(2)} pts`}
              tone={marginDelta >= 0 ? 'success' : 'danger'}
            />
          </Col>
        </Row>

        <Row className="g-2 mb-3">
          <Col xs={6} md={6}>
            <MiniMetricCard
              label="Projected Revenue"
              value={`$${Math.round(projectedRevenue).toLocaleString()}`}
              subtext="Top-line estimate"
            />
          </Col>

          <Col xs={6} md={6}>
            <MiniMetricCard
              label="Projected Demand"
              value={`${Math.round(projectedDemand).toLocaleString()} units`}
              subtext="Expected volume"
            />
          </Col>

          <Col xs={6} md={6}>
            <MiniMetricCard
              label="Projected Conversion"
              value={`${projectedConversionRate.toFixed(2)}%`}
              subtext="Checkout response"
            />
          </Col>

          <Col xs={6} md={6}>
            <MiniMetricCard
              label="Projected Margin"
              value={`${projectedMargin.toFixed(1)}%`}
              subtext="Post-incentive estimate"
            />
          </Col>
        </Row>

        <div className="p-3 bg-light rounded">
          <h2 className="fs-6 mb-2">Strategy Insight</h2>
          <p className="small mb-0">{narrative}</p>
        </div>
      </Card.Body>
    </Card>
  )
}