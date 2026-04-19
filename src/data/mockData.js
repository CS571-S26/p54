export const kpiData = [
  {
    title: 'Total Revenue',
    value: '$128,400',
    description: 'Revenue across all tracked products in the current period.',
  },
  {
    title: 'Total Orders',
    value: '3,214',
    description: 'Completed orders from the current reporting window.',
  },
  {
    title: 'Average Order Value',
    value: '$39.95',
    description: 'Average revenue generated per completed order.',
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    description: 'Orders divided by total site sessions.',
  },
]

export const revenueTrendData = [
  { week: 'W1', revenue: 18400 },
  { week: 'W2', revenue: 20150 },
  { week: 'W3', revenue: 19300 },
  { week: 'W4', revenue: 22600 },
  { week: 'W5', revenue: 24100 },
  { week: 'W6', revenue: 23850 },
]

export const topSkuData = [
  { sku: 'SKU-101', product: 'Heat Protect Spray', revenue: '$21,500', unitsSold: 640 },
  { sku: 'SKU-205', product: 'Curl Serum', revenue: '$18,200', unitsSold: 520 },
  { sku: 'SKU-309', product: 'Styling Iron Kit', revenue: '$15,900', unitsSold: 210 },
  { sku: 'SKU-414', product: 'Shine Oil', revenue: '$12,750', unitsSold: 410 },
  { sku: 'SKU-508', product: 'Volume Mist', revenue: '$10,100', unitsSold: 370 },
]

export const topCreatorData = [
  { creator: 'Maya Chen', channel: 'TikTok', revenue: '$14,900', conversions: 335 },
  { creator: 'Ava Brooks', channel: 'Instagram', revenue: '$12,400', conversions: 289 },
  { creator: 'Nina Perez', channel: 'YouTube', revenue: '$10,850', conversions: 240 },
  { creator: 'Lila Hart', channel: 'TikTok', revenue: '$9,700', conversions: 221 },
  { creator: 'Sofia James', channel: 'Instagram', revenue: '$8,950', conversions: 206 },
]

export const forecastData = {
  'SKU-101': {
    currentInventory: 120,
    salesVelocity: 9,
    forecastedDemand: 63,
    stockoutDate: 'About 13 days',
    reorderRecommendation: 'Reorder 80 units soon',
    forecastTrend: [
      { day: 'Mon', demand: 8 },
      { day: 'Tue', demand: 9 },
      { day: 'Wed', demand: 10 },
      { day: 'Thu', demand: 9 },
      { day: 'Fri', demand: 8 },
      { day: 'Sat', demand: 10 },
      { day: 'Sun', demand: 9 },
    ],
  },
  'SKU-205': {
    currentInventory: 75,
    salesVelocity: 6,
    forecastedDemand: 42,
    stockoutDate: 'About 12 days',
    reorderRecommendation: 'Reorder 60 units',
    forecastTrend: [
      { day: 'Mon', demand: 5 },
      { day: 'Tue', demand: 6 },
      { day: 'Wed', demand: 7 },
      { day: 'Thu', demand: 6 },
      { day: 'Fri', demand: 5 },
      { day: 'Sat', demand: 7 },
      { day: 'Sun', demand: 6 },
    ],
  },
  'SKU-309': {
    currentInventory: 40,
    salesVelocity: 5,
    forecastedDemand: 35,
    stockoutDate: 'About 8 days',
    reorderRecommendation: 'Urgent reorder: 90 units',
    forecastTrend: [
      { day: 'Mon', demand: 4 },
      { day: 'Tue', demand: 5 },
      { day: 'Wed', demand: 6 },
      { day: 'Thu', demand: 5 },
      { day: 'Fri', demand: 4 },
      { day: 'Sat', demand: 6 },
      { day: 'Sun', demand: 5 },
    ],
  },
}