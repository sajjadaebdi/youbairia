"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, User, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Payout {
  id: string;
  amount: number;
  status: string;
  stripePayoutId?: string;
  processedAt?: string;
  createdAt: string;
  submission: {
    id: string;
    content: string;
    task: {
      title: string;
      seller: {
        shopName: string;
        user: {
          name: string;
          email: string;
        };
      };
    };
  };
  marketer: {
    user: {
      name: string;
      email: string;
    };
  };
  user: {
    name: string;
    email: string;
  };
  paymentMethod?: string;
  upiId?: string;
}

export default function AdminPayoutsPage() {
  const { data: session } = useSession();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPayouts();
  }, [statusFilter]);

  const fetchPayouts = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/payouts?${params}`);
      const data = await response.json();
      setPayouts(data.payouts || []);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      toast.error('Failed to load payouts');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayout = async (submissionId: string) => {
    setProcessing(submissionId);
    try {
      const response = await fetch('/api/payouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Payout processed successfully!');
        fetchPayouts();
      } else {
        toast.error(data.error || 'Failed to process payout');
      }
    } catch (error) {
      console.error('Error processing payout:', error);
      toast.error('Failed to process payout');
    } finally {
      setProcessing(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4" />;
      case 'PROCESSING':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalAmount = (payouts: Payout[]) => {
    return payouts.reduce((total, payout) => total + payout.amount, 0);
  };

  const getPendingAmount = (payouts: Payout[]) => {
    return payouts
      .filter(payout => payout.status === 'PENDING')
      .reduce((total, payout) => total + payout.amount, 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payout Management</h1>
        <p className="text-gray-600">
          Process payouts to marketers for approved content submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalAmount(payouts).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {payouts.length} total transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getPendingAmount(payouts).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {payouts.filter(p => p.status === 'PENDING').length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payouts.filter(p => 
                p.status === 'COMPLETED' && 
                new Date(p.processedAt || '').toDateString() === new Date().toDateString()
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Processed today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payouts List */}
      <div className="space-y-4">
        {payouts.map((payout) => (
          <Card key={payout.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Badge className={getStatusColor(payout.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(payout.status)}
                        {payout.status}
                      </div>
                    </Badge>
                    <span className="text-2xl font-bold text-green-600">
                      ${payout.amount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Task</p>
                      <p className="text-gray-600">{payout.submission.task.title}</p>
                    </div>
                    <div>
                      <p className="font-medium">Marketer</p>
                      <p className="text-gray-600">{payout.marketer.user.name}</p>
                      <p className="text-gray-500 text-xs">{payout.marketer.user.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Seller</p>
                      <p className="text-gray-600">{payout.submission.task.seller.shopName}</p>
                      <p className="text-gray-500 text-xs">{payout.submission.task.seller.user.email}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Content:</strong> {payout.submission.content.substring(0, 100)}...</p>
                    {payout.paymentMethod === 'PAYTM_UPI' && payout.upiId && (
                      <p><strong>Paytm UPI ID:</strong> {payout.upiId}</p>
                    )}
                    {payout.stripePayoutId && (
                      <p><strong>Payment ID:</strong> {payout.stripePayoutId}</p>
                    )}
                    <p><strong>Payment Method:</strong> {payout.paymentMethod || 'PAYTM_UPI'}</p>
                    <p><strong>Created:</strong> {formatDate(payout.createdAt)}</p>
                    {payout.processedAt && (
                      <p><strong>Processed:</strong> {formatDate(payout.processedAt)}</p>
                    )}
                  </div>
                </div>

                <div className="ml-6">
                  {payout.status === 'PENDING' && (
                    <Button
                      onClick={() => handleProcessPayout(payout.submission.id)}
                      disabled={processing === payout.submission.id}
                      className="whitespace-nowrap"
                    >
                      {processing === payout.submission.id ? 'Processing...' : 'Process Payout'}
                    </Button>
                  )}
                  {payout.status === 'COMPLETED' && (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-600 font-medium">Completed</p>
                    </div>
                  )}
                  {payout.status === 'FAILED' && (
                    <div className="text-center">
                      <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <p className="text-sm text-red-600 font-medium">Failed</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {payouts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No payouts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
