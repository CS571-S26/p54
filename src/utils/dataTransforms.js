function safeNumber(value) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`
}

function getTopItems(items, key, count = 5) {
  return [...items].sort((a, b) => b[key] - a[key]).slice(0, count)
}

function createStableSkuSeed(sku) {
  return sku.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function generateForecastTrend(sevenDayDemand, sku, currentInventory, reorderPoint) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const seed = createStableSkuSeed(sku)

  const skuPatterns = [
    [0.82, 0.9, 1.0, 1.08, 1.18, 1.34, 1.12], // strong weekend lift
    [0.95, 1.0, 1.04, 1.08, 1.1, 0.96, 0.87], // weekday-heavy
    [0.88, 0.94, 1.02, 1.12, 1.22, 1.16, 1.0], // Friday/Sat surge
    [0.84, 0.92, 0.98, 1.06, 1.14, 1.26, 1.18], // gradual build into weekend
    [0.9, 0.96, 1.01, 1.03, 1.07, 1.15, 1.22], // Sunday strongest
  ]

  const selectedPattern = skuPatterns[seed % skuPatterns.length]
  const baseDaily = Math.max(1, sevenDayDemand / 7)

  const inventoryPressure =
    reorderPoint > 0 && currentInventory <= reorderPoint
      ? 1.08
      : currentInventory <= reorderPoint * 1.3
      ? 1.04
      : 1

  const trendBias = ((seed % 7) - 3) * 0.015
  const microVariationStrength = 0.025

  const rawTrend = selectedPattern.map((multiplier, index) => {
    const trendFactor = 1 + trendBias * index
    const microFactor = 1 + (((seed + index * 11) % 5) - 2) * microVariationStrength

    return baseDaily * multiplier * trendFactor * microFactor * inventoryPressure
  })

  const rawTotal = rawTrend.reduce((sum, value) => sum + value, 0)
  const scale = rawTotal > 0 ? sevenDayDemand / rawTotal : 1

  let rounded = rawTrend.map((value) => Math.max(1, Math.round(value * scale)))
  let roundedTotal = rounded.reduce((sum, value) => sum + value, 0)

  while (roundedTotal < sevenDayDemand) {
    const maxIndex = rawTrend.indexOf(Math.max(...rawTrend))
    rounded[maxIndex] += 1
    roundedTotal += 1
  }

  while (roundedTotal > sevenDayDemand) {
    const minIndex = rounded.findIndex((value) => value > 1)
    if (minIndex === -1) break
    rounded[minIndex] -= 1
    roundedTotal -= 1
  }

  return days.map((day, index) => ({
    day,
    demand: rounded[index],
  }))
}

export function buildDashboardData(rawData) {
  const orders = rawData.orders || []
  const inventory = rawData.inventory || []
  const creators = rawData.creators || []
  const traffic = rawData.traffic || []

  const totalRevenue = orders.reduce((sum, order) => sum + safeNumber(order.revenue), 0)
  const totalOrders = orders.length
  const totalRefunds = orders.reduce((sum, order) => sum + safeNumber(order.refund_amount), 0)
  const totalUnits = orders.reduce((sum, order) => sum + safeNumber(order.units), 0)

  const totalSessions = traffic.reduce((sum, row) => sum + safeNumber(row.sessions), 0)
  const totalConversions = traffic.reduce((sum, row) => sum + safeNumber(row.conversions), 0)

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const conversionRate = totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0
  const refundRate = totalRevenue > 0 ? (totalRefunds / totalRevenue) * 100 : 0

  const revenueTrendMap = {}
  orders.forEach((order) => {
    const key = order.order_date ? order.order_date.slice(0, 7) : 'Unknown'
    revenueTrendMap[key] = (revenueTrendMap[key] || 0) + safeNumber(order.revenue)
  })

  const revenueTrendData = Object.entries(revenueTrendMap)
    .map(([week, revenue]) => ({
      week,
      revenue: Math.round(revenue),
    }))
    .sort((a, b) => a.week.localeCompare(b.week))

  const skuMap = {}
  orders.forEach((order) => {
    const sku = order.sku || 'Unknown'
    if (!skuMap[sku]) {
      skuMap[sku] = {
        sku,
        product: order.product_name || 'Unknown Product',
        revenueValue: 0,
        unitsValue: 0,
      }
    }
    skuMap[sku].revenueValue += safeNumber(order.revenue)
    skuMap[sku].unitsValue += safeNumber(order.units)
  })

  const topSkuData = getTopItems(Object.values(skuMap), 'revenueValue').map((item) => ({
    sku: item.sku,
    product: item.product,
    revenue: formatCurrency(item.revenueValue),
    unitsSold: item.unitsValue,
  }))

  const creatorLookup = {}
  creators.forEach((creator) => {
    creatorLookup[creator.creator_id] = {
      creator: creator.creator_name || creator.creator_id,
      channel: creator.channel || 'Unknown',
    }
  })

  const creatorRevenueMap = {}
  orders.forEach((order) => {
    const creatorId = order.creator_id || 'Unknown'
    if (!creatorRevenueMap[creatorId]) {
      creatorRevenueMap[creatorId] = {
        creator: creatorLookup[creatorId]?.creator || creatorId,
        channel: creatorLookup[creatorId]?.channel || 'Unknown',
        revenueValue: 0,
        conversions: 0,
      }
    }
    creatorRevenueMap[creatorId].revenueValue += safeNumber(order.revenue)
    creatorRevenueMap[creatorId].conversions += 1
  })

  const topCreatorData = getTopItems(Object.values(creatorRevenueMap), 'revenueValue').map(
    (item) => ({
      creator: item.creator,
      channel: item.channel,
      revenue: formatCurrency(item.revenueValue),
      conversions: item.conversions,
    })
  )

  const alerts = []

  inventory.forEach((item) => {
    const onHand = safeNumber(item.inventory_on_hand)
    const reorderPoint = safeNumber(item.reorder_point)

    if (onHand <= reorderPoint) {
      alerts.push({
        variant: 'warning',
        title: 'Low Inventory',
        message: `${item.sku} is at or below its reorder point.`,
      })
    }
  })

  if (refundRate > 8) {
    alerts.push({
      variant: 'danger',
      title: 'Refund Risk',
      message: `Refund rate is elevated at ${formatPercent(refundRate)}.`,
    })
  }

  if (orders.length === 0 || inventory.length === 0 || traffic.length === 0) {
    alerts.push({
      variant: 'info',
      title: 'Missing Data',
      message: 'One or more datasets are empty. Upload all CSVs for full analytics.',
    })
  }

  const kpiData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Revenue across uploaded orders.',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      description: 'Total order rows in orders.csv.',
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(averageOrderValue),
      description: 'Average revenue per order.',
    },
    {
      title: 'Conversion Rate',
      value: formatPercent(conversionRate),
      description: 'Conversions divided by sessions.',
    },
    {
      title: 'Refund Rate',
      value: formatPercent(refundRate),
      description: 'Refunds as a percent of revenue.',
    },
  ]

  const inventoryLookup = {}
  inventory.forEach((item) => {
    inventoryLookup[item.sku] = item
  })

  const forecastData = {}
  Object.values(skuMap).forEach((item) => {
    const inventoryItem = inventoryLookup[item.sku]
    const currentInventory = safeNumber(inventoryItem?.inventory_on_hand)
    const reorderPoint = safeNumber(inventoryItem?.reorder_point)
    const sevenDayDemand = Math.max(1, Math.round(item.unitsValue / 4))
    const salesVelocity = Number((sevenDayDemand / 7).toFixed(1))
    const daysUntilStockout =
      salesVelocity > 0 ? Math.max(1, Math.round(currentInventory / salesVelocity)) : 999

    const forecastTrend = generateForecastTrend(
      sevenDayDemand,
      item.sku,
      currentInventory,
      reorderPoint
    )

    forecastData[item.sku] = {
      currentInventory,
      salesVelocity,
      forecastedDemand: sevenDayDemand,
      stockoutDate: `${daysUntilStockout} days`,
      reorderRecommendation:
        currentInventory <= reorderPoint
          ? `Reorder ${Math.max(sevenDayDemand * 2, 25)} units soon`
          : 'Monitor inventory for next reorder cycle',
      forecastTrend,
    }
  })

  const availableSkus = Object.keys(forecastData)

  return {
    kpiData,
    revenueTrendData,
    topSkuData,
    topCreatorData,
    alerts,
    forecastData,
    availableSkus,
    scenarioBaseline: {
      revenue: totalRevenue || 128400,
      demand: totalUnits || 3200,
      conversionRate: conversionRate || 4.8,
      margin: 34,
    },
  }
}