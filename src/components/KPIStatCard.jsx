import { Card, Badge } from 'react-bootstrap'

export default function KPIStatCard({
  title,
  value,
  description,
  emphasis = 'default',
}) {
  const isPrimary = emphasis === 'primary'

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="text-muted small">{title}</div>
          {isPrimary ? <Badge bg="dark">Core KPI</Badge> : null}
        </div>

        <div className="fs-2 fw-bold mb-2 lh-sm">{value}</div>
        <div className="small text-muted">{description}</div>
      </Card.Body>
    </Card>
  )
}