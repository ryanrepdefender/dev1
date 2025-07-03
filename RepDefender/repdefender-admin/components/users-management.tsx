"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Ban, Mail } from "lucide-react"

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@acmerestaurant.com",
      business: "Acme Restaurant",
      plan: "Pro",
      status: "active",
      reviewCount: 45,
      disputeCount: 8,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@techsolutions.com",
      business: "Tech Solutions Inc",
      plan: "Agency",
      status: "active",
      reviewCount: 123,
      disputeCount: 23,
      joinDate: "2023-11-20",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@localbakery.com",
      business: "Local Bakery",
      plan: "Starter",
      status: "inactive",
      reviewCount: 12,
      disputeCount: 2,
      joinDate: "2024-02-10",
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "Lisa Chen",
      email: "lisa@autorepair.com",
      business: "Auto Repair Shop",
      plan: "Pro",
      status: "suspended",
      reviewCount: 67,
      disputeCount: 15,
      joinDate: "2023-12-05",
      lastActive: "3 days ago",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.business.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Starter":
        return "bg-blue-100 text-blue-800"
      case "Pro":
        return "bg-purple-100 text-purple-800"
      case "Agency":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-gray-600">Manage and monitor all platform users</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Complete list of platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Disputes</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.business}</TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(user.plan)}>{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.reviewCount}</TableCell>
                  <TableCell>{user.disputeCount}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Ban className="h-3 w-3" />
                      </Button>
                    </div>
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
