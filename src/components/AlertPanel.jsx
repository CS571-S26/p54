import { Alert, Card, Badge } from 'react-bootstrap'

export default function AlertPanel({ alerts }) {
  const safeAlerts = Array.isArray(alerts) ? alerts : []

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1">Business Alerts</h2>
            <p className="text-muted mb-0">
              Highlighted operational and data-quality issues detected in the current dataset.
            </p>
          </div>
          <Badge bg={safeAlerts.length > 0 ? 'warning' : 'success'}>
            {safeAlerts.length > 0 ? `${safeAlerts.length} Active` : 'No Active Alerts'}
          </Badge>
        </div>

        {safeAlerts.length === 0 ? (
          <Alert variant="success" className="mb-0">
            No major alerts detected in the current dataset.
          </Alert>
        ) : (
          safeAlerts.map((alert, index) => (
            <Alert
              key={index}
              variant={alert.variant}
              className={index === safeAlerts.length - 1 ? 'mb-0' : 'mb-2'}
            >
              <strong>{alert.title}:</strong> {alert.message}
            </Alert>
          ))
        )}
      </Card.Body>
    </Card>
  )
}