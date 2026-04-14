import { Card } from 'react-bootstrap'

export default function KPIStatCard({ title, value, description }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h2" className="fs-5">
          {title}
        </Card.Title>
        <div className="fs-3 fw-bold mb-2">{value}</div>
        <Card.Text className="text-muted">{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}