
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, CheckCircle } from 'lucide-react';
import DonationConfirmationForm from './DonationConfirmationForm';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  oldAgeHomeName: string;
  oldAgeHomeId: string;
  qrCodeImage: string;
  bankDetails?: {
    name?: string;
    accountNumber?: string;
    ifsc?: string;
    branch?: string;
    upiId?: string;
  };
}

const DonationDialog: React.FC<DonationDialogProps> = ({
  isOpen,
  onClose,
  oldAgeHomeName,
  oldAgeHomeId,
  qrCodeImage,
  bankDetails,
}) => {
  const [step, setStep] = useState<'qrCode' | 'confirmDonation'>('qrCode');

  const handleConfirmDonation = () => {
    setStep('confirmDonation');
  };

  const handleDonationSuccess = () => {
    onClose();
    setStep('qrCode'); // Reset to first step for next time
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md md:max-w-lg max-h-[90vh]">
        <ScrollArea className="max-h-[80vh] pr-4">
          {step === 'qrCode' ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl text-center text-age-navy">
                  Donate to {oldAgeHomeName}
                </DialogTitle>
                <DialogDescription className="text-center text-age-teal font-medium">
                  Scan the QR code to donate directly
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col items-center py-4">
                <div className="bg-white rounded-lg p-4 shadow-md max-w-[280px] mx-auto mb-4">
                  <img 
                    src={qrCodeImage} 
                    alt={`${oldAgeHomeName} donation QR code`} 
                    className="w-full h-auto"
                  />
                </div>

                {bankDetails && Object.values(bankDetails).some(value => value) && (
                  <div className="mt-4 w-full bg-slate-50 p-4 rounded-md">
                    <h3 className="font-bold text-center mb-2 text-age-navy">Bank/UPI Details</h3>
                    <div className="space-y-1 text-sm">
                      {bankDetails.name && (
                        <p><span className="font-semibold">Name:</span> {bankDetails.name}</p>
                      )}
                      {bankDetails.accountNumber && (
                        <p><span className="font-semibold">Account Number:</span> {bankDetails.accountNumber}</p>
                      )}
                      {bankDetails.ifsc && (
                        <p><span className="font-semibold">IFSC:</span> {bankDetails.ifsc}</p>
                      )}
                      {bankDetails.branch && (
                        <p><span className="font-semibold">Branch:</span> {bankDetails.branch}</p>
                      )}
                      {bankDetails.upiId && (
                        <p><span className="font-semibold">UPI ID:</span> {bankDetails.upiId}</p>
                      )}
                    </div>
                  </div>
                )}

                <p className="mt-6 text-center text-sm text-gray-500">
                  Thank you for your generosity! Your donation will help provide care and support for the elderly residents.
                </p>
                
                <Button 
                  className="mt-6 bg-age-teal hover:bg-age-teal/90"
                  onClick={handleConfirmDonation}
                >
                  <CheckCircle className="mr-2" size={16} />
                  I've Made a Donation
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl text-center text-age-navy">
                  Confirm Your Donation
                </DialogTitle>
                <DialogDescription className="text-center text-gray-600">
                  Please provide your donation details for confirmation
                </DialogDescription>
              </DialogHeader>
              
              <DonationConfirmationForm
                oldAgeHomeId={oldAgeHomeId}
                oldAgeHomeName={oldAgeHomeName}
                onSuccess={handleDonationSuccess}
              />
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
