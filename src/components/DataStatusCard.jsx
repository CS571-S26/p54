import { Card, ListGroup, Button } from 'react-bootstrap'

export default function DataStatusCard({ uploadedFiles, onReset }) {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <h2 className="fs-4 mb-3">Data Source Status</h2>

        <ListGroup className="mb-3">
          <ListGroup.Item>orders.csv: {uploadedFiles.orders ? 'Uploaded' : 'Mock data'}</ListGroup.Item>
          <ListGroup.Item>inventory.csv: {uploadedFiles.inventory ? 'Uploaded' : 'Mock data'}</ListGroup.Item>
          <ListGroup.Item>creators.csv: {uploadedFiles.creators ? 'Uploaded' : 'Mock data'}</ListGroup.Item>
          <ListGroup.Item>traffic.csv: {uploadedFiles.traffic ? 'Uploaded' : 'Mock data'}</ListGroup.Item>
        </ListGroup>

        <Button variant="outline-dark" onClick={onReset}>
          Reset to Mock Data
        </Button>
      </Card.Body>
    </Card>
  )
}