import { Card, Form, Row, Col } from 'react-bootstrap'

export default function ForecastControls({
  selectedSku,
  setSelectedSku,
  method,
  setMethod,
  availableSkus,
}) {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <h2 className="fs-4 mb-3">Forecast Inputs</h2>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="skuSelector">
              <Form.Label>Select SKU</Form.Label>
              <Form.Select
                value={selectedSku}
                onChange={(event) => setSelectedSku(event.target.value)}
              >
                {availableSkus.length === 0 ? (
                  <option value="">No SKU data available</option>
                ) : (
                  availableSkus.map((sku) => (
                    <option key={sku} value={sku}>
                      {sku}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="forecastMethod">
              <Form.Label>Select Forecast Method</Form.Label>
              <Form.Select
                value={method}
                onChange={(event) => setMethod(event.target.value)}
              >
                <option value="rolling-average">Rolling Average</option>
                <option value="exponential-smoothing">Exponential Smoothing</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}