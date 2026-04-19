import { Card, Form, Row, Col, Badge } from 'react-bootstrap'

function formatAdMultiplier(value) {
  return `${(value / 100).toFixed(2)}x`
}

export default function ScenarioControls({
  discountPercent,
  setDiscountPercent,
  freeShippingThreshold,
  setFreeShippingThreshold,
  creatorCommission,
  setCreatorCommission,
  adSpendMultiplier,
  setAdSpendMultiplier,
}) {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-5 mb-1">Scenario Controls</h2>
            <p className="text-muted small mb-0">
              Adjust core business levers.
            </p>
          </div>
          <Badge bg="dark">Live Model</Badge>
        </div>

        <Row className="g-2 mb-3">
          <Col xs={6} md={3}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Discount</div>
              <div className="fw-bold">{discountPercent}%</div>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Free Ship</div>
              <div className="fw-bold">${freeShippingThreshold}</div>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Commission</div>
              <div className="fw-bold">{creatorCommission}%</div>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <div className="p-2 bg-light rounded h-100">
              <div className="text-muted small">Ad Spend</div>
              <div className="fw-bold">{formatAdMultiplier(adSpendMultiplier)}</div>
            </div>
          </Col>
        </Row>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="discountPercent">
              <Form.Label className="fw-semibold small mb-1">Discount Percent</Form.Label>
              <Form.Range
                min={0}
                max={40}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
              />
              <div className="text-muted small">
                Boosts demand, usually lowers margin.
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="freeShippingThreshold">
              <Form.Label className="fw-semibold small mb-1">Free Shipping Threshold</Form.Label>
              <Form.Range
                min={25}
                max={100}
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              />
              <div className="text-muted small">
                Lower values can improve conversion.
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="creatorCommission">
              <Form.Label className="fw-semibold small mb-1">Creator Commission Percent</Form.Label>
              <Form.Range
                min={5}
                max={25}
                value={creatorCommission}
                onChange={(e) => setCreatorCommission(Number(e.target.value))}
              />
              <div className="text-muted small">
                Higher payout can improve creator output.
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="adSpendMultiplier">
              <Form.Label className="fw-semibold small mb-1">Ad Spend Multiplier</Form.Label>
              <Form.Range
                min={50}
                max={200}
                value={adSpendMultiplier}
                onChange={(e) => setAdSpendMultiplier(Number(e.target.value))}
              />
              <div className="text-muted small">
                Expands traffic if conversion stays healthy.
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}