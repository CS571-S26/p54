import { Table, Card } from 'react-bootstrap'

export default function TopSkuTable() {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h2" className="fs-4 mb-3">
          Top SKUs
        </Card.Title>

        <Table striped bordered hover responsive className="mb-0">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Revenue</th>
              <th>Units Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SKU-101</td>
              <td>Heat Protect Spray</td>
              <td>$21,500</td>
              <td>640</td>
            </tr>
            <tr>
              <td>SKU-205</td>
              <td>Curl Serum</td>
              <td>$18,200</td>
              <td>520</td>
            </tr>
            <tr>
              <td>SKU-309</td>
              <td>Styling Iron Kit</td>
              <td>$15,900</td>
              <td>210</td>
            </tr>
            <tr>
              <td>SKU-414</td>
              <td>Shine Oil</td>
              <td>$12,750</td>
              <td>410</td>
            </tr>
            <tr>
              <td>SKU-508</td>
              <td>Volume Mist</td>
              <td>$10,100</td>
              <td>370</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}