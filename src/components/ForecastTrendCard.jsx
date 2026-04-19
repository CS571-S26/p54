import { Card, Row, Col } from 'react-bootstrap'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #dcdcdc',
        borderRadius: '10px',
        padding: '10px 12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{label}</div>
      <div>Projected Demand: {payload[0].value} units</div>
    </div>
  )
}

export default function ForecastTrendCard({ data }) {
  const safeData = Array.isArray(data) ? data : []

  const totalDemand = safeData.reduce((sum, item) => sum + (item.demand || 0), 0)
  const peakDay =
    safeData.length > 0
      ? safeData.reduce((max, item) => (item.demand > max.demand ? item : max), safeData[0])
      : null
  const lowestDay =
    safeData.length > 0
      ? safeData.reduce((min, item) => (item.demand < min.demand ? item : min), safeData[0])
      : null

  const barColors = [
    '#0d6efd',
    '#3d8bfd',
    '#6ea8fe',
    '#0dcaf0',
    '#20c997',
    '#198754',
    '#6f42c1',
  ]

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h2 className="fs-4 mb-3">7-Day Demand Forecast</h2>

        {safeData.length === 0 ? (
          <p className="text-muted mb-0">
            No forecast data available yet. Upload order and inventory data to populate this chart.
          </p>
        ) : (
          <>
            <Row className="mb-3 g-3">
              <Col md={4}>
                <div className="p-3 bg-light rounded">
                  <div className="text-muted small">Total 7-Day Demand</div>
                  <div className="fs-5 fw-bold">{totalDemand} units</div>
                </div>
              </Col>

              <Col md={4}>
                <div className="p-3 bg-light rounded">
                  <div className="text-muted small">Peak Day</div>
                  <div className="fs-5 fw-bold">
                    {peakDay ? `${peakDay.day} (${peakDay.demand})` : 'N/A'}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="p-3 bg-light rounded">
                  <div className="text-muted small">Lowest Day</div>
                  <div className="fs-5 fw-bold">
                    {lowestDay ? `${lowestDay.day} (${lowestDay.demand})` : 'N/A'}
                  </div>
                </div>
              </Col>
            </Row>

            <div
              style={{ width: '100%', height: 320 }}
              aria-label="Bar chart showing projected demand for each day of the week"
            >
              <ResponsiveContainer>
                <BarChart
                  data={safeData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="demand" radius={[10, 10, 0, 0]}>
                    {safeData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.day}`}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}