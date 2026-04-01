import { Card } from 'react-bootstrap'

export default function KPIStatCard({ title, value, description }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="fs-5">
          {title}
        </Card.Title>
        <p className="fs-3 fw-bold mb-2">{value}</p>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}