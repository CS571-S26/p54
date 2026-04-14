import { Container, Row, Col } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import KPIStatCard from '../components/KPIStatCard'
import AlertPanel from '../components/AlertPanel'
import TopSkuTable from '../components/TopSkuTable'

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Executive Overview"
        subtitle="A high-level e-commerce performance dashboard for CommercePulse."
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
              description="Completed orders in the current reporting window."
            />
          </Col>

          <Col md={6} lg={3}>
            <KPIStatCard
              title="Average Order Value"
              value="$39.95"
              description="Average revenue generated per order."
            />
          </Col>

          <Col md={6} lg={3}>
            <KPIStatCard
              title="Conversion Rate"
              value="4.8%"
              description="Estimated orders divided by sessions."
            />
          </Col>
        </Row>

        <AlertPanel />

        <TopSkuTable />
      </Container>
    </div>
  )
}