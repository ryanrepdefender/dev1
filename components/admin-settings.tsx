"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Mail, Shield, Database, Bell } from "lucide-react"

export function AdminSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "RepDefender",
    supportEmail: "support@repdefender.com",
    maintenanceMode: false,

    // Email Settings
    emailNotifications: true,
    weeklyReports: true,
    alertThreshold: "5",

    // Security Settings
    twoFactorRequired: false,
    sessionTimeout: "24",
    passwordPolicy: "medium",

    // API Settings
    rateLimitPerHour: "1000",
    apiLogging: true,
    webhookUrl: "",

    // Notification Settings
    slackWebhook: "",
    discordWebhook: "",
    emailAlerts: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-gray-600">Configure platform settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => handleSettingChange("platformName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Enable to put the platform in maintenance mode</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>Configure email notifications and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications to users</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Send weekly summary reports to admins</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                />
              </div>

              <div>
                <Label htmlFor="alertThreshold">Alert Threshold</Label>
                <Select
                  value={settings.alertThreshold}
                  onValueChange={(value) => handleSettingChange("alertThreshold", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 negative review</SelectItem>
                    <SelectItem value="3">3 negative reviews</SelectItem>
                    <SelectItem value="5">5 negative reviews</SelectItem>
                    <SelectItem value="10">10 negative reviews</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Number of negative reviews before sending alert</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorRequired">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Force all admin users to enable 2FA</p>
                </div>
                <Switch
                  id="twoFactorRequired"
                  checked={settings.twoFactorRequired}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorRequired", checked)}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="passwordPolicy">Password Policy</Label>
                <Select
                  value={settings.passwordPolicy}
                  onValueChange={(value) => handleSettingChange("passwordPolicy", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - 6 characters minimum</SelectItem>
                    <SelectItem value="medium">Medium - 8 characters, mixed case</SelectItem>
                    <SelectItem value="high">High - 12 characters, symbols required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                API Settings
              </CardTitle>
              <CardDescription>Configure API access and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="rateLimitPerHour">Rate Limit (requests per hour)</Label>
                <Input
                  id="rateLimitPerHour"
                  type="number"
                  value={settings.rateLimitPerHour}
                  onChange={(e) => handleSettingChange("rateLimitPerHour", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Maximum API requests per user per hour</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="apiLogging">API Request Logging</Label>
                  <p className="text-sm text-gray-500">Log all API requests for monitoring</p>
                </div>
                <Switch
                  id="apiLogging"
                  checked={settings.apiLogging}
                  onCheckedChange={(checked) => handleSettingChange("apiLogging", checked)}
                />
              </div>

              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  placeholder="https://your-webhook-url.com"
                  value={settings.webhookUrl}
                  onChange={(e) => handleSettingChange("webhookUrl", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">URL to receive platform events</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure external notification channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                <Input
                  id="slackWebhook"
                  type="url"
                  placeholder="https://hooks.slack.com/services/..."
                  value={settings.slackWebhook}
                  onChange={(e) => handleSettingChange("slackWebhook", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Send alerts to Slack channel</p>
              </div>

              <div>
                <Label htmlFor="discordWebhook">Discord Webhook URL</Label>
                <Input
                  id="discordWebhook"
                  type="url"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={settings.discordWebhook}
                  onChange={(e) => handleSettingChange("discordWebhook", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Send alerts to Discord channel</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailAlerts">Email Alerts</Label>
                  <p className="text-sm text-gray-500">Send critical alerts via email</p>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked) => handleSettingChange("emailAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
