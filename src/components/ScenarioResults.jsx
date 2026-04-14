import { Card, Row, Col } from 'react-bootstrap'
import KPIStatCard from './KPIStatCard'

export default function ScenarioResults({
  projectedConversionRate,
  projectedRevenue,
  projectedMargin,
  projectedDemand,
  stockoutRisk,
}) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h2" className="fs-4 mb-3">
          Scenario Results
        </Card.Title>

        <Row className="g-4">
          <Col md={6} lg={4}>
            <KPIStatCard
              title="Projected Conversion Rate"
              value={`${projectedConversionRate.toFixed(2)}%`}
              description="Estimated impact of pricing and marketing."
            />
          </Col>

          <Col md={6} lg={4}>
            <KPIStatCard
              title="Projected Revenue"
              value={`$${projectedRevenue.toFixed(0)}`}
              description="Estimated revenue after changes."
            />
          </Col>

          <Col md={6} lg={4}>
            <KPIStatCard
              title="Projected Margin"
              value={`${projectedMargin.toFixed(1)}%`}
              description="Estimated profit margin."
            />
          </Col>

          <Col md={6} lg={6}>
            <KPIStatCard
              title="Projected Demand"
              value={`${projectedDemand.toFixed(0)} units`}
              description="Expected demand under scenario."
            />
          </Col>

          <Col md={6} lg={6}>
            <KPIStatCard
              title="Stockout Risk"
              value={stockoutRisk}
              description="Qualitative risk level."
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}