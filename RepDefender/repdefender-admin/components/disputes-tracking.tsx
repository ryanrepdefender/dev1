"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function DisputesTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const disputes = [
    {
      id: 1,
      business: "Acme Restaurant",
      platform: "Google",
      reviewId: "REV-001",
      reason: "Fake review - competitor",
      status: "submitted",
      submittedDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      aiGenerated: true,
      priority: "high",
    },
    {
      id: 2,
      business: "Tech Solutions Inc",
      platform: "Yelp",
      reviewId: "REV-002",
      reason: "Violates TOS - inappropriate language",
      status: "under_review",
      submittedDate: "2024-01-18",
      lastUpdate: "2024-01-19",
      aiGenerated: true,
      priority: "medium",
    },
    {
      id: 3,
      business: "Local Bakery",
      platform: "Facebook",
      reviewId: "REV-003",
      reason: "False claims about service",
      status: "approved",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-17",
      aiGenerated: false,
      priority: "low",
    },
    {
      id: 4,
      business: "Auto Repair Shop",
      platform: "Google",
      reviewId: "REV-004",
      reason: "Spam review",
      status: "rejected",
      submittedDate: "2024-01-12",
      lastUpdate: "2024-01-16",
      aiGenerated: true,
      priority: "medium",
    },
    {
      id: 5,
      business: "Dental Practice",
      platform: "Yelp",
      reviewId: "REV-005",
      reason: "Defamatory content",
      status: "pending",
      submittedDate: "2024-01-21",
      lastUpdate: "2024-01-21",
      aiGenerated: true,
      priority: "high",
    },
  ]

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "submitted":
        return <AlertCircle className="h-4 w-4" />
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const statusCounts = {
    total: disputes.length,
    pending: disputes.filter((d) => d.status === "pending").length,
    submitted: disputes.filter((d) => d.status === "submitted").length,
    under_review: disputes.filter((d) => d.status === "under_review").length,
    approved: disputes.filter((d) => d.status === "approved").length,
    rejected: disputes.filter((d) => d.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Disputes Tracking</h1>
        <p className="text-gray-600">Monitor and manage review dispute requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.submitted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.under_review}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Dispute Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search disputes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Disputes ({filteredDisputes.length})</CardTitle>
          <CardDescription>Track the status of all review disputes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>AI Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-medium">{dispute.business}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dispute.platform}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{dispute.reason}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(dispute.status)}
                      <Badge className={getStatusColor(dispute.status)}>{dispute.status.replace("_", " ")}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
                  </TableCell>
                  <TableCell>{dispute.submittedDate}</TableCell>
                  <TableCell>{dispute.lastUpdate}</TableCell>
                  <TableCell>
                    {dispute.aiGenerated ? (
                      <Badge className="bg-purple-100 text-purple-800">AI</Badge>
                    ) : (
                      <Badge variant="outline">Manual</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
