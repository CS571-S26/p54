import { Container, Card, Form, Row, Col, ListGroup } from 'react-bootstrap'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'

export default function ForecastPage() {
  const [selectedSku, setSelectedSku] = useState('SKU-101')

  let currentInventory = 120
  let salesVelocity = 9
  let forecastedDemand = 63
  let stockoutDate = 'In about 13 days'
  let reorderRecommendation = 'Reorder 80 units soon'

  if (selectedSku === 'SKU-205') {
    currentInventory = 75
    salesVelocity = 6
    forecastedDemand = 42
    stockoutDate = 'In about 12 days'
    reorderRecommendation = 'Reorder 60 units'
  }

  if (selectedSku === 'SKU-309') {
    currentInventory = 40
    salesVelocity = 5
    forecastedDemand = 35
    stockoutDate = 'In about 8 days'
    reorderRecommendation = 'Urgent reorder: 90 units'
  }

  return (
    <div>
      <PageHeader
        title="Forecast Lab"
        subtitle="A simple prototype for demand forecasting and inventory planning."
      />

      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <Form>
              <Form.Group controlId="skuSelect">
                <Form.Label>Select a SKU</Form.Label>
                <Form.Select
                  value={selectedSku}
                  onChange={(event) => setSelectedSku(event.target.value)}
                >
                  <option value="SKU-101">SKU-101</option>
                  <option value="SKU-205">SKU-205</option>
                  <option value="SKU-309">SKU-309</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Forecast Summary</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Current Inventory:</strong> {currentInventory} units
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Sales Velocity:</strong> {salesVelocity} units/day
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Forecasted Demand (7 days):</strong> {forecastedDemand} units
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Estimated Stockout Date:</strong> {stockoutDate}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Reorder Recommendation:</strong> {reorderRecommendation}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}