import { Row, Col, Card } from 'react-bootstrap'
import KPIStatCard from './KPIStatCard'

export default function KpiGrid({ items }) {
  const primaryItems = items.slice(0, 4)
  const secondaryItems = items.slice(4)

  return (
    <>
      <Row className="g-3 mb-3">
        {primaryItems.map((item) => (
          <Col md={6} xl={3} key={item.title}>
            <KPIStatCard
              title={item.title}
              value={item.value}
              description={item.description}
              emphasis="primary"
            />
          </Col>
        ))}
      </Row>

      {secondaryItems.length > 0 ? (
        <Row className="g-3 mb-4">
          {secondaryItems.map((item) => (
            <Col md={6} xl={3} key={item.title}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-3">
                  <div className="text-muted small mb-1">{item.title}</div>
                  <div className="fs-4 fw-bold mb-1">{item.value}</div>
                  <div className="small text-muted">{item.description}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}
    </>
  )
}