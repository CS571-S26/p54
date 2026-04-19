import { Card, Row, Col, Badge } from 'react-bootstrap'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #dcdcdc',
        borderRadius: '10px',
        padding: '10px 12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div>Revenue: ${Number(payload[0].value).toLocaleString()}</div>
    </div>
  )
}

export default function RevenueTrendChart({ data }) {
  const safeData = Array.isArray(data) ? data : []

  const totalRevenue = safeData.reduce((sum, item) => sum + (item.revenue || 0), 0)
  const peakPeriod =
    safeData.length > 0
      ? safeData.reduce((max, item) => (item.revenue > max.revenue ? item : max), safeData[0])
      : null
  const firstValue = safeData[0]?.revenue || 0
  const lastValue = safeData[safeData.length - 1]?.revenue || 0
  const trendDirection =
    safeData.length > 1
      ? lastValue > firstValue
        ? 'Upward trend'
        : lastValue < firstValue
        ? 'Downward trend'
        : 'Stable trend'
      : 'Limited data'

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1">Revenue Trend</h2>
            <p className="text-muted mb-0">
              Revenue progression over the uploaded reporting periods.
            </p>
          </div>
          <Badge bg="dark">Executive View</Badge>
        </div>

        {safeData.length === 0 ? (
          <p className="text-muted mb-0">
            No revenue trend data available yet. Upload orders data to populate this chart.
          </p>
        ) : (
          <>
            <Row className="g-3 mb-3">
              <Col md={4}>
                <div className="p-3 bg-light rounded h-100">
                  <div className="text-muted small">Total Revenue in Chart</div>
                  <div className="fs-5 fw-bold">${Math.round(totalRevenue).toLocaleString()}</div>
                </div>
              </Col>

              <Col md={4}>
                <div className="p-3 bg-light rounded h-100">
                  <div className="text-muted small">Peak Period</div>
                  <div className="fs-5 fw-bold">
                    {peakPeriod ? `${peakPeriod.week}` : 'N/A'}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="p-3 bg-light rounded h-100">
                  <div className="text-muted small">Directional Signal</div>
                  <div className="fs-5 fw-bold">{trendDirection}</div>
                </div>
              </Col>
            </Row>

            <div
              style={{ width: '100%', height: 320 }}
              aria-label="Line chart showing revenue trend over time"
            >
              <ResponsiveContainer>
                <ComposedChart data={safeData} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    fill="rgba(13,110,253,0.12)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0d6efd"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}