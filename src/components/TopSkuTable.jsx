import { Table, Card, Badge } from 'react-bootstrap'

export default function TopSkuTable({ items }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1">Top SKUs</h2>
            <p className="text-muted small mb-0">
              Best-performing products by revenue contribution.
            </p>
          </div>
          <Badge bg="secondary">Products</Badge>
        </div>

        {safeItems.length === 0 ? (
          <p className="text-muted mb-0">No SKU performance data available yet.</p>
        ) : (
          <Table striped bordered hover responsive className="mb-0 align-middle">
            <caption className="visually-hidden">
              Table of top SKUs showing SKU, product name, revenue, and units sold.
            </caption>
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Product</th>
                <th scope="col">Revenue</th>
                <th scope="col">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {safeItems.map((item, index) => (
                <tr key={item.sku}>
                  <th scope="row">
                    <div className="fw-semibold">{item.sku}</div>
                    {index === 0 ? <div className="small text-muted">Top performer</div> : null}
                  </th>
                  <td>{item.product}</td>
                  <td>{item.revenue}</td>
                  <td>{item.unitsSold}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  )
}