import { Card, ListGroup } from 'react-bootstrap'

export default function ForecastSummaryCard({
  currentInventory,
  salesVelocity,
  forecastedDemand,
  stockoutDate,
  reorderRecommendation,
}) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h2" className="fs-4 mb-3">
          Forecast Summary
        </Card.Title>

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
            <strong>Estimated Stockout Window:</strong> {stockoutDate}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Reorder Recommendation:</strong> {reorderRecommendation}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}