
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Donation } from '@/types/donation';

interface DonationSummaryCardProps {
  donations: Donation[];
  totalDonated: number;
}

const DonationSummaryCard = ({ donations, totalDonated }: DonationSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Donations</span>
            <span className="font-medium">{donations.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Amount Donated</span>
            <span className="font-medium text-age-teal">₹{totalDonated.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationSummaryCard;
