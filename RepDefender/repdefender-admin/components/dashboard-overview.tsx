"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active subscribers",
    },
    {
      title: "Reviews Monitored",
      value: "18,392",
      change: "+8%",
      trend: "up",
      icon: MessageSquare,
      description: "Across all platforms",
    },
    {
      title: "Active Disputes",
      value: "342",
      change: "-5%",
      trend: "down",
      icon: AlertTriangle,
      description: "Pending resolution",
    },
    {
      title: "Monthly Revenue",
      value: "$24,680",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "Subscription revenue",
    },
  ]

  const recentActivity = [
    { user: "Acme Restaurant", action: "Disputed Google review", time: "2 hours ago", status: "pending" },
    { user: "Tech Solutions Inc", action: "Generated reply for Yelp review", time: "4 hours ago", status: "completed" },
    { user: "Local Bakery", action: "Review removed successfully", time: "6 hours ago", status: "success" },
    { user: "Auto Repair Shop", action: "New negative review detected", time: "8 hours ago", status: "alert" },
    { user: "Dental Practice", action: "Dispute rejected by platform", time: "1 day ago", status: "failed" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "alert":
        return "bg-red-100 text-red-800"
      case "failed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your RepDefender platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
