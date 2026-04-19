import { Card, Form } from 'react-bootstrap'

export default function FileUploadPanel({
  title,
  datasetKey,
  uploaded,
  onUpload,
}) {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <h2 className="fs-4 mb-3">{title}</h2>

        <Form.Group controlId={`${datasetKey}Upload`}>
          <Form.Label>Upload {datasetKey}.csv</Form.Label>
          <Form.Control
            type="file"
            accept=".csv"
            onChange={(event) => onUpload(datasetKey, event.target.files[0])}
          />
        </Form.Group>

        <div className="mt-3">
          <strong>Status:</strong> {uploaded ? 'Uploaded' : 'Using mock data'}
        </div>
      </Card.Body>
    </Card>
  )
}