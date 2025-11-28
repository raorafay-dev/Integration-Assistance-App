'use client'

import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Settings2 } from 'lucide-react'

interface ConfigurationFormProps {
  formConfig: any
  onFormChange: (field: string, value: string) => void
}

export default function ConfigurationForm({
  formConfig,
  onFormChange,
}: ConfigurationFormProps) {
  return (
    <Card className="border-0 p-0 shadow-md">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Integration Configuration</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="sap-system" className="text-sm font-semibold text-foreground">
                SAP System <span className="text-destructive">*</span>
              </Label>
              <Select value={formConfig.sapSystem} onValueChange={(val) => onFormChange('sapSystem', val)}>
                <SelectTrigger id="sap-system" className="mt-2">
                  <SelectValue placeholder="Select SAP system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ECC">ECC</SelectItem>
                  <SelectItem value="S/4HANA">S/4HANA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="integration-direction" className="text-sm font-semibold text-foreground">
                Integration Direction <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formConfig.integrationDirection}
                onValueChange={(val) => onFormChange('integrationDirection', val)}
              >
                <SelectTrigger id="integration-direction" className="mt-2">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inbound">Inbound (External → SAP)</SelectItem>
                  <SelectItem value="Outbound">Outbound (SAP → External)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="module" className="text-sm font-semibold text-foreground">
                SAP Module
              </Label>
              <Select value={formConfig.module} onValueChange={(val) => onFormChange('module', val)}>
                <SelectTrigger id="module" className="mt-2">
                  <SelectValue placeholder="Select module (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SD">SD - Sales & Distribution</SelectItem>
                  <SelectItem value="MM">MM - Materials Management</SelectItem>
                  <SelectItem value="FI">FI - Financial Accounting</SelectItem>
                  <SelectItem value="CO">CO - Controlling</SelectItem>
                  <SelectItem value="HR">HR - Human Resources</SelectItem>
                  <SelectItem value="PP">PP - Production Planning</SelectItem>
                  <SelectItem value="QM">QM - Quality Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="object-type" className="text-sm font-semibold text-foreground">
                Object Type
              </Label>
              <Input
                id="object-type"
                placeholder="e.g., Sales Order, Material Master"
                value={formConfig.objectType}
                onChange={(e) => onFormChange('objectType', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="external-system" className="text-sm font-semibold text-foreground">
                External System
              </Label>
              <Input
                id="external-system"
                placeholder="e.g., Salesforce, SAP Commerce"
                value={formConfig.externalSystem}
                onChange={(e) => onFormChange('externalSystem', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="additional-notes" className="text-sm font-semibold text-foreground">
                Additional Notes
              </Label>
              <Textarea
                id="additional-notes"
                placeholder="Add any special requirements or notes"
                value={formConfig.additionalNotes}
                onChange={(e) => onFormChange('additionalNotes', e.target.value)}
                className="mt-2"
                rows={1}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
