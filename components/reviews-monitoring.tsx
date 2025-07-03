"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Star, ExternalLink, AlertTriangle } from "lucide-react"

export function ReviewsMonitoring() {
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const reviews = [
    {
      id: 1,
      business: "Acme Restaurant",
      platform: "Google",
      rating: 1,
      reviewer: "Anonymous User",
      content: "Terrible service, food was cold and staff was rude. Would not recommend.",
      date: "2024-01-20",
      status: "flagged",
      sentiment: "negative",
    },
    {
      id: 2,
      business: "Tech Solutions Inc",
      platform: "Yelp",
      rating: 2,
      reviewer: "John D.",
      content: "Poor customer support, took weeks to resolve my issue.",
      date: "2024-01-19",
      status: "disputed",
      sentiment: "negative",
    },
    {
      id: 3,
      business: "Local Bakery",
      platform: "Facebook",
      rating: 5,
      reviewer: "Sarah M.",
      content: "Amazing pastries and great service! Highly recommend.",
      date: "2024-01-18",
      status: "positive",
      sentiment: "positive",
    },
    {
      id: 4,
      business: "Auto Repair Shop",
      platform: "Google",
      rating: 1,
      reviewer: "Mike R.",
      content: "Overcharged me and didn't fix the problem properly.",
      date: "2024-01-17",
      status: "flagged",
      sentiment: "negative",
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === "all" || review.platform.toLowerCase() === platformFilter
    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "low" && review.rating <= 2) ||
      (ratingFilter === "high" && review.rating >= 4)

    return matchesSearch && matchesPlatform && matchesRating
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "flagged":
        return "bg-red-100 text-red-800"
      case "disputed":
        return "bg-yellow-100 text-yellow-800"
      case "positive":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews Monitoring</h1>
        <p className="text-gray-600">Monitor and analyze reviews across all platforms</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,392</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1,247</div>
            <p className="text-xs text-muted-foreground">Negative sentiment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">Across all businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">New reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Review Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="yelp">Yelp</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="low">Low (1-2 stars)</SelectItem>
                <SelectItem value="high">High (4-5 stars)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>Latest reviews from all monitored businesses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.business}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.platform}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm">({review.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{review.content}</p>
                    <p className="text-xs text-gray-500">by {review.reviewer}</p>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      {review.status === "flagged" && (
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-3 w-3" />
                        </Button>
                      )}
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
