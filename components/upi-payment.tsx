"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Copy, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface UPIPaymentProps {
  amount: number
  onPaymentComplete: () => void
}

export function UPIPayment({ amount, onPaymentComplete }: UPIPaymentProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [copied, setCopied] = useState(false)

  // UPI ID
  const upiId = "9368598307@pthdfc"
  
  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${upiId}&pn=Youbairia&am=${amount}&cu=INR&tn=Payment for Digital Products`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(upiId)
      setCopied(true)
      toast({
        title: "UPI ID copied!",
        description: "You can now paste it in your UPI app.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the UPI ID manually.",
        variant: "destructive",
      })
    }
  }

  const openUpiApp = () => {
    window.open(upiUrl, "_blank")
  }

  const verifyPayment = () => {
    setPaymentVerified(true)
    toast({
      title: "Payment verified!",
      description: "Thank you for your payment.",
    })
    setTimeout(() => {
      onPaymentComplete()
    }, 1500)
  }

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setShowPaymentModal(true)}>
        Pay with UPI
      </Button>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay with UPI</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={upiUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Amount */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Amount to pay</p>
              <p className="text-2xl font-bold">₹{amount.toFixed(2)}</p>
            </div>

            {/* UPI ID */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">UPI ID:</p>
              <code className="text-sm bg-muted px-2 py-1 rounded">{upiId}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Payment Instructions */}
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>1. Open any UPI app (Google Pay, PhonePe, Paytm)</p>
              <p>2. Scan the QR code or enter the UPI ID</p>
              <p>3. Verify the amount and complete the payment</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={openUpiApp} className="w-full">
                Open UPI App <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              
              {!paymentVerified ? (
                <Button
                  variant="outline"
                  onClick={verifyPayment}
                  className="w-full"
                >
                  I've Completed the Payment
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Payment Verified ✓
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 