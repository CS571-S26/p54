import { createContext, useContext, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { buildDashboardData } from '../utils/dataTransforms'

const CommerceDataContext = createContext(null)

const mockRawData = {
  orders: [
    {
      order_id: '1001',
      order_date: '2026-03-01',
      sku: 'SKU-101',
      product_name: 'Heat Protect Spray',
      creator_id: 'C1',
      campaign_id: 'CMP-01',
      units: '2',
      revenue: '80',
      discount: '10',
      refund_amount: '0',
    },
    {
      order_id: '1002',
      order_date: '2026-03-02',
      sku: 'SKU-205',
      product_name: 'Curl Serum',
      creator_id: 'C2',
      campaign_id: 'CMP-02',
      units: '1',
      revenue: '42',
      discount: '0',
      refund_amount: '0',
    },
    {
      order_id: '1003',
      order_date: '2026-03-03',
      sku: 'SKU-309',
      product_name: 'Styling Iron Kit',
      creator_id: 'C1',
      campaign_id: 'CMP-03',
      units: '1',
      revenue: '140',
      discount: '15',
      refund_amount: '10',
    },
    {
      order_id: '1004',
      order_date: '2026-03-05',
      sku: 'SKU-101',
      product_name: 'Heat Protect Spray',
      creator_id: 'C3',
      campaign_id: 'CMP-01',
      units: '3',
      revenue: '120',
      discount: '5',
      refund_amount: '0',
    },
  ],
  inventory: [
    {
      sku: 'SKU-101',
      product_name: 'Heat Protect Spray',
      inventory_on_hand: '120',
      reorder_point: '60',
      lead_time_days: '10',
      unit_cost: '12',
    },
    {
      sku: 'SKU-205',
      product_name: 'Curl Serum',
      inventory_on_hand: '72',
      reorder_point: '40',
      lead_time_days: '7',
      unit_cost: '9',
    },
    {
      sku: 'SKU-309',
      product_name: 'Styling Iron Kit',
      inventory_on_hand: '28',
      reorder_point: '35',
      lead_time_days: '12',
      unit_cost: '55',
    },
  ],
  creators: [
    {
      creator_id: 'C1',
      creator_name: 'Maya Chen',
      channel: 'TikTok',
      commission_rate: '12',
      campaign_id: 'CMP-01',
    },
    {
      creator_id: 'C2',
      creator_name: 'Ava Brooks',
      channel: 'Instagram',
      commission_rate: '10',
      campaign_id: 'CMP-02',
    },
    {
      creator_id: 'C3',
      creator_name: 'Nina Perez',
      channel: 'YouTube',
      commission_rate: '14',
      campaign_id: 'CMP-03',
    },
  ],
  traffic: [
    { date: '2026-03-01', sessions: '1000', conversions: '45', ad_spend: '300' },
    { date: '2026-03-08', sessions: '1200', conversions: '60', ad_spend: '340' },
    { date: '2026-03-15', sessions: '950', conversions: '41', ad_spend: '290' },
    { date: '2026-03-22', sessions: '1100', conversions: '52', ad_spend: '310' },
  ],
}

function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    })
  })
}

export function CommerceDataProvider({ children }) {
  const [rawData, setRawData] = useState(mockRawData)
  const [uploadedFiles, setUploadedFiles] = useState({
    orders: false,
    inventory: false,
    creators: false,
    traffic: false,
  })

  async function uploadCsv(type, file) {
    if (!file) return

    const rows = await parseCsvFile(file)

    setRawData((prev) => ({
      ...prev,
      [type]: rows,
    }))

    setUploadedFiles((prev) => ({
      ...prev,
      [type]: true,
    }))
  }

  function resetToMockData() {
    setRawData(mockRawData)
    setUploadedFiles({
      orders: false,
      inventory: false,
      creators: false,
      traffic: false,
    })
  }

  const dashboardData = useMemo(() => buildDashboardData(rawData), [rawData])

  return (
    <CommerceDataContext.Provider
      value={{
        rawData,
        uploadedFiles,
        uploadCsv,
        resetToMockData,
        dashboardData,
      }}
    >
      {children}
    </CommerceDataContext.Provider>
  )
}

export function useCommerceData() {
  const context = useContext(CommerceDataContext)

  if (!context) {
    throw new Error('useCommerceData must be used inside CommerceDataProvider')
  }

  return context
}