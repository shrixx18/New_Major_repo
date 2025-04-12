
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Donation } from '@/types/donation';

interface DonationHistoryTableProps {
  donations: Donation[];
  loading: boolean;
  formatDate: (dateString: string) => string;
}

const DonationHistoryTable = ({ donations, loading, formatDate }: DonationHistoryTableProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : donations.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Old Age Home</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{formatDate(donation.created_at)}</TableCell>
                    <TableCell>{donation.old_age_home_name}</TableCell>
                    <TableCell>₹{Number(donation.amount).toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        donation.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : donation.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {donation.status === 'completed' 
                          ? 'Completed' 
                          : donation.status === 'pending'
                            ? 'Pending'
                            : donation.status || 'Unknown'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>You haven't made any donations yet.</p>
            <p className="mt-2">Support an old age home today and make a difference!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationHistoryTable;
