import { Container, Row, Col, Alert, Table } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import KPIStatCard from '../components/KPIStatCard'

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Executive Overview"
        subtitle="CommercePulse is a front-end analytics dashboard for e-commerce business performance."
      />

      <Container>
        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <KPIStatCard
              title="Total Revenue"
              value="$128,400"
              description="Mock revenue across all product brands."
            />
          </Col>

          <Col md={6} lg={3}>
            <KPIStatCard
              title="Total Orders"
              value="3,214"
              description="Completed orders from the current reporting period."
            />
          </Col>

          <Col md={6} lg={3}>
            <KPIStatCard
              title="Average Order Value"
              value="$39.95"
              description="Average value per completed order."
            />
          </Col>

          <Col md={6} lg={3}>
            <KPIStatCard
              title="Conversion Rate"
              value="4.8%"
              description="Orders divided by total sessions."
            />
          </Col>
        </Row>

        <Alert variant="warning">
          <strong>Alert:</strong> 2 SKUs are close to stockout and one campaign has an unusually high refund rate.
        </Alert>

        <h2 className="mt-4">Top SKUs</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SKU-101</td>
              <td>Heat Protect Spray</td>
              <td>$21,500</td>
            </tr>
            <tr>
              <td>SKU-205</td>
              <td>Curl Serum</td>
              <td>$18,200</td>
            </tr>
            <tr>
              <td>SKU-309</td>
              <td>Styling Iron Kit</td>
              <td>$15,900</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  )
}