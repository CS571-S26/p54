import { Card, Form, Row, Col } from 'react-bootstrap'

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
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title as="h2" className="fs-4 mb-3">
          Scenario Controls
        </Card.Title>

        <Row className="g-4">
          <Col md={6}>
            <Form.Group controlId="discountPercent">
              <Form.Label>Discount Percent</Form.Label>
              <Form.Range
                min={0}
                max={40}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
              />
              <div>{discountPercent}%</div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="freeShippingThreshold">
              <Form.Label>Free Shipping Threshold</Form.Label>
              <Form.Range
                min={25}
                max={100}
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              />
              <div>${freeShippingThreshold}</div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="creatorCommission">
              <Form.Label>Creator Commission</Form.Label>
              <Form.Range
                min={5}
                max={25}
                value={creatorCommission}
                onChange={(e) => setCreatorCommission(Number(e.target.value))}
              />
              <div>{creatorCommission}%</div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="adSpendMultiplier">
              <Form.Label>Ad Spend Multiplier</Form.Label>
              <Form.Range
                min={50}
                max={200}
                value={adSpendMultiplier}
                onChange={(e) => setAdSpendMultiplier(Number(e.target.value))}
              />
              <div>{(adSpendMultiplier / 100).toFixed(2)}x</div>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}