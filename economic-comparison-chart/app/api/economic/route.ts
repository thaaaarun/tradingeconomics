import { NextResponse } from 'next/server'

const API_KEY = process.env.TRADING_ECONOMICS_API_KEY
const API_BASE = "https://api.tradingeconomics.com/historical"

export async function GET(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const indicator = searchParams.get('indicator')

  if (!country || !indicator) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const url = `${API_BASE}/country/${country}/indicator/${indicator}?c=${API_KEY}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}