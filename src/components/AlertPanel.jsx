import { Alert } from 'react-bootstrap'

export default function AlertPanel() {
  return (
    <div className="mb-4">
      <Alert variant="warning" className="mb-2">
        <strong>Low Inventory:</strong> SKU-309 may stock out within the next 8 days.
      </Alert>

      <Alert variant="danger" className="mb-2">
        <strong>Refund Risk:</strong> Campaign C-17 has a refund rate above normal.
      </Alert>

      <Alert variant="info" className="mb-0">
        <strong>Data Quality Notice:</strong> Some rows in the dataset have missing values.
      </Alert>
    </div>
  )
}