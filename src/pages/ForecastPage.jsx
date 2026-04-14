import { useState } from 'react'
import { Container, Form, Row, Col, Card } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import ForecastSummaryCard from '../components/ForecastSummaryCard'

const forecastData = {
  'SKU-101': {
    currentInventory: 120,
    salesVelocity: 9,
    forecastedDemand: 63,
    stockoutDate: 'About 13 days',
    reorderRecommendation: 'Reorder 80 units soon',
  },
  'SKU-205': {
    currentInventory: 75,
    salesVelocity: 6,
    forecastedDemand: 42,
    stockoutDate: 'About 12 days',
    reorderRecommendation: 'Reorder 60 units',
  },
  'SKU-309': {
    currentInventory: 40,
    salesVelocity: 5,
    forecastedDemand: 35,
    stockoutDate: 'About 8 days',
    reorderRecommendation: 'Urgent reorder: 90 units',
  },
}

export default function ForecastPage() {
  const [selectedSku, setSelectedSku] = useState('SKU-101')

  const selectedForecast = forecastData[selectedSku]

  return (
    <div>
      <PageHeader
        title="Forecast Lab"
        subtitle="Early prototype for demand forecasting and inventory planning."
      />

      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title as="h2" className="fs-4 mb-3">
                  Forecast Inputs
                </Card.Title>

                <Form.Group controlId="skuSelector">
                  <Form.Label>Select SKU</Form.Label>
                  <Form.Select
                    value={selectedSku}
                    onChange={(event) => setSelectedSku(event.target.value)}
                  >
                    <option value="SKU-101">SKU-101</option>
                    <option value="SKU-205">SKU-205</option>
                    <option value="SKU-309">SKU-309</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <ForecastSummaryCard
          currentInventory={selectedForecast.currentInventory}
          salesVelocity={selectedForecast.salesVelocity}
          forecastedDemand={selectedForecast.forecastedDemand}
          stockoutDate={selectedForecast.stockoutDate}
          reorderRecommendation={selectedForecast.reorderRecommendation}
        />
      </Container>
    </div>
  )
}