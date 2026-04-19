import { Container, Row, Col, Card } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import FileUploadPanel from '../components/FileUploadPanel'
import DataStatusCard from '../components/DataStatusCard'
import { useCommerceData } from '../context/CommerceDataContext'

export default function DataUploadPage() {
  const { uploadedFiles, uploadCsv, resetToMockData } = useCommerceData()

  return (
    <div>
      <PageHeader
        title="Data Upload"
        subtitle="Upload your own CSV files and update the app across all pages."
      />

      <Container>
        <DataStatusCard uploadedFiles={uploadedFiles} onReset={resetToMockData} />

        <Row>
          <Col lg={6}>
            <FileUploadPanel
              title="Orders Dataset"
              datasetKey="orders"
              uploaded={uploadedFiles.orders}
              onUpload={uploadCsv}
            />
          </Col>

          <Col lg={6}>
            <FileUploadPanel
              title="Inventory Dataset"
              datasetKey="inventory"
              uploaded={uploadedFiles.inventory}
              onUpload={uploadCsv}
            />
          </Col>

          <Col lg={6}>
            <FileUploadPanel
              title="Creators Dataset"
              datasetKey="creators"
              uploaded={uploadedFiles.creators}
              onUpload={uploadCsv}
            />
          </Col>

          <Col lg={6}>
            <FileUploadPanel
              title="Traffic Dataset"
              datasetKey="traffic"
              uploaded={uploadedFiles.traffic}
              onUpload={uploadCsv}
            />
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <h2 className="fs-4 mb-3">Expected CSV Columns</h2>
            <p className="mb-2">
              <strong>orders.csv:</strong> order_id, order_date, sku, product_name, creator_id, campaign_id, units, revenue, discount, refund_amount
            </p>
            <p className="mb-2">
              <strong>inventory.csv:</strong> sku, product_name, inventory_on_hand, reorder_point, lead_time_days, unit_cost
            </p>
            <p className="mb-2">
              <strong>creators.csv:</strong> creator_id, creator_name, channel, commission_rate, campaign_id
            </p>
            <p className="mb-0">
              <strong>traffic.csv:</strong> date, sessions, conversions, ad_spend
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}