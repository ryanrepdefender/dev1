"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Download, FileText, Table, BarChart3, Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function DataExport() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [exportFormat, setExportFormat] = useState("csv")
  const [dataTypes, setDataTypes] = useState({
    users: true,
    reviews: true,
    disputes: false,
    analytics: false,
  })

  const exportOptions = [
    {
      id: "users",
      label: "User Data",
      description: "User accounts, subscription info, activity logs",
      icon: FileText,
    },
    {
      id: "reviews",
      label: "Reviews Data",
      description: "All monitored reviews across platforms",
      icon: Table,
    },
    {
      id: "disputes",
      label: "Disputes Data",
      description: "Dispute requests and their statuses",
      icon: BarChart3,
    },
    {
      id: "analytics",
      label: "Analytics Data",
      description: "Platform usage and performance metrics",
      icon: Calendar,
    },
  ]

  const recentExports = [
    {
      id: 1,
      name: "Users_Export_2024-01-20.csv",
      type: "Users Data",
      date: "2024-01-20",
      size: "2.4 MB",
      status: "completed",
    },
    {
      id: 2,
      name: "Reviews_Export_2024-01-19.xlsx",
      type: "Reviews Data",
      date: "2024-01-19",
      size: "15.7 MB",
      status: "completed",
    },
    {
      id: 3,
      name: "Disputes_Export_2024-01-18.csv",
      type: "Disputes Data",
      date: "2024-01-18",
      size: "892 KB",
      status: "processing",
    },
  ]

  const handleDataTypeChange = (type: string, checked: boolean) => {
    setDataTypes((prev) => ({
      ...prev,
      [type]: checked,
    }))
  }

  const handleExport = () => {
    // Simulate export process
    console.log("Exporting data:", {
      dateRange,
      exportFormat,
      dataTypes: Object.entries(dataTypes)
        .filter(([_, selected]) => selected)
        .map(([type]) => type),
    })
    alert("Export started! You will receive an email when it's ready.")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Export</h1>
        <p className="text-gray-600">Export platform data for analysis and reporting</p>
      </div>

      {/* Export Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Configure your data export settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>

            {/* Export Format */}
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Types */}
            <div>
              <label className="text-sm font-medium mb-3 block">Data to Export</label>
              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={option.id}
                      checked={dataTypes[option.id as keyof typeof dataTypes]}
                      onCheckedChange={(checked) => handleDataTypeChange(option.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleExport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Start Export
            </Button>
          </CardContent>
        </Card>

        {/* Recent Exports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
            <CardDescription>Your recent data exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExports.map((exportItem) => (
                <div key={exportItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{exportItem.name}</p>
                    <p className="text-xs text-gray-500">{exportItem.type}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{exportItem.date}</span>
                      <span className="text-xs text-gray-500">{exportItem.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {exportItem.status === "completed" ? (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    ) : (
                      <div className="text-xs text-yellow-600 font-medium">Processing...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Export Statistics</CardTitle>
          <CardDescription>Overview of your data export usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">47</div>
              <p className="text-sm text-gray-500">Total Exports</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2.1 GB</div>
              <p className="text-sm text-gray-500">Data Exported</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">CSV</div>
              <p className="text-sm text-gray-500">Most Used Format</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
