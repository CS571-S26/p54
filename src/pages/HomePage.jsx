import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import KpiGrid from '../components/KpiGrid'
import AlertPanel from '../components/AlertPanel'
import RevenueTrendChart from '../components/RevenueTrendChart'
import TopSkuTable from '../components/TopSkuTable'
import TopCreatorTable from '../components/TopCreatorTable'
import { useCommerceData } from '../context/CommerceDataContext'

function OverviewSummaryBanner({ kpis }) {
  const revenue = kpis.find((item) => item.title === 'Total Revenue')?.value || 'N/A'
  const orders = kpis.find((item) => item.title === 'Total Orders')?.value || 'N/A'
  const conversion = kpis.find((item) => item.title === 'Conversion Rate')?.value || 'N/A'

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1">Executive Snapshot</h2>
            <p className="text-muted mb-0">
              Quick summary of the current uploaded business performance.
            </p>
          </div>
          <Badge bg="dark">Live Data</Badge>
        </div>

        <Row className="g-3">
          <Col md={4}>
            <div className="p-3 bg-light rounded h-100">
              <div className="text-muted small">Revenue Position</div>
              <div className="fs-5 fw-bold">{revenue}</div>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-light rounded h-100">
              <div className="text-muted small">Order Volume</div>
              <div className="fs-5 fw-bold">{orders}</div>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-light rounded h-100">
              <div className="text-muted small">Conversion Signal</div>
              <div className="fs-5 fw-bold">{conversion}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default function HomePage() {
  const { dashboardData } = useCommerceData()

  return (
    <div>
      <PageHeader
        title="Executive Overview"
        subtitle="A polished internal dashboard view of revenue, creators, products, and business alerts."
      />

      <Container fluid="lg">
        <OverviewSummaryBanner kpis={dashboardData.kpiData} />

        <KpiGrid items={dashboardData.kpiData} />

        <AlertPanel alerts={dashboardData.alerts} />

        <RevenueTrendChart data={dashboardData.revenueTrendData} />

        <Row className="g-3">
          <Col xl={6}>
            <TopSkuTable items={dashboardData.topSkuData} />
          </Col>
          <Col xl={6}>
            <TopCreatorTable items={dashboardData.topCreatorData} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}