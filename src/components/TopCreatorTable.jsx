import { Table, Card, Badge } from 'react-bootstrap'

export default function TopCreatorTable({ items }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1">Top Creators</h2>
            <p className="text-muted small mb-0">
              Highest-performing creators based on attributed revenue.
            </p>
          </div>
          <Badge bg="secondary">Attribution</Badge>
        </div>

        {safeItems.length === 0 ? (
          <p className="text-muted mb-0">No creator attribution data available yet.</p>
        ) : (
          <Table striped bordered hover responsive className="mb-0 align-middle">
            <thead>
              <tr>
                <th scope="col">Creator</th>
                <th scope="col">Channel</th>
                <th scope="col">Revenue</th>
                <th scope="col">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {safeItems.map((item, index) => (
                <tr key={item.creator}>
                  <td>
                    <div className="fw-semibold">{item.creator}</div>
                    {index === 0 ? <div className="small text-muted">Top contributor</div> : null}
                  </td>
                  <td>{item.channel}</td>
                  <td>{item.revenue}</td>
                  <td>{item.conversions}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  )
}