
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const donationFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  transactionId: z.string().min(3, "Transaction ID is required"),
  amount: z.string().min(1, "Amount is required"),
  message: z.string().optional(),
  screenshot: z.any().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

interface DonationConfirmationFormProps {
  oldAgeHomeId: string;
  oldAgeHomeName: string;
  onSuccess: () => void;
}

const DonationConfirmationForm: React.FC<DonationConfirmationFormProps> = ({
  oldAgeHomeId,
  oldAgeHomeName,
  onSuccess,
}) => {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      transactionId: '',
      amount: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    form.setValue('screenshot', file);
  };

  const onSubmit = async (formData: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      let screenshotUrl = '';
      
      // If a file is selected, upload it to Supabase Storage
      if (selectedFile) {
        // Make sure the bucket name is exactly as it appears in Supabase
        const bucketName = 'donations';
        
        console.log("Starting file upload to bucket:", bucketName);
        
        try {
          // Create directory if it doesn't exist (not needed but helps organize)
          const folderPath = 'donation-screenshots';
          const fileExt = selectedFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const filePath = `${folderPath}/${fileName}`;
          
          console.log("Attempting to upload file to path:", filePath);
          
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from(bucketName)
            .upload(filePath, selectedFile);
          
          if (uploadError) {
            console.error("Upload error:", uploadError);
            toast.error("Failed to upload screenshot, but will continue with donation");
          } else {
            console.log("Upload successful:", uploadData);
            const { data: urlData } = await supabase.storage
              .from(bucketName)
              .getPublicUrl(filePath);
              
            screenshotUrl = urlData?.publicUrl || '';
            console.log("Generated public URL:", screenshotUrl);
          }
        } catch (uploadException) {
          console.error("Unexpected upload error:", uploadException);
        }
      }
      
      console.log("Preparing to call process-donation edge function");
      console.log("Donation data:", { 
        oldAgeHomeId, 
        oldAgeHomeName,
        fullName: formData.fullName,
        email: formData.email,
        amount: formData.amount,
        transactionId: formData.transactionId,
        screenshotUrl
      });
      
      // Call the Edge Function to process donation
      try {
        const functionResponse = await supabase.functions.invoke('process-donation', {
          body: {
            fullName: formData.fullName,
            email: formData.email,
            transactionId: formData.transactionId,
            amount: formData.amount,
            message: formData.message || '',
            screenshotUrl,
            oldAgeHomeId,
            oldAgeHomeName
          }
        });
        
        // Handle potential Edge Function errors
        if (functionResponse.error) {
          console.error("Edge function error response:", functionResponse.error);
          throw new Error(`Error processing donation: ${functionResponse.error.message || JSON.stringify(functionResponse.error)}`);
        }
        
        // Check the response data from the edge function
        const responseData = functionResponse.data;
        console.log("Edge function response:", responseData);
        
        if (responseData.success) {
          // Check detailed email results if available
          if (responseData.emailResults) {
            console.log("Email sending details:", responseData.emailResults);
            
            if (responseData.emailResults.donorEmail?.error) {
              console.warn("Donor email issue:", responseData.emailResults.donorEmail.error);
            }
            
            if (responseData.emailResults.ngoEmail?.error) {
              console.warn("NGO email issue:", responseData.emailResults.ngoEmail.error);
            }
          }
          
          // Show success message based on email status
          toast.success("Donation confirmation submitted successfully!", {
            description: "Thank you for your generosity. " + 
              (responseData.emailSent 
                ? "We've sent you a confirmation email with the details." 
                : "Your donation has been recorded."),
          });
          
          // If emails failed but donation was processed
          if (responseData.emailError) {
            console.warn("Email sending failed:", responseData.emailError);
            toast.warning("Note: We couldn't send confirmation emails at this time, but your donation is recorded.", {
              duration: 5000
            });
          }
          
          onSuccess();
          form.reset();
          setSelectedFile(null);
        } else {
          throw new Error(responseData.message || "Unexpected response from server");
        }
      } catch (edgeFunctionError) {
        console.error("Failed to call edge function:", edgeFunctionError);
        
        // Create a more user-friendly error message
        let errorMessage = "Could not reach the donation processing service. Please try again later.";
        
        if (edgeFunctionError instanceof Error && edgeFunctionError.message) {
          if (edgeFunctionError.message.includes("Failed to fetch") || 
              edgeFunctionError.message.includes("network") ||
              edgeFunctionError.message.includes("Edge Function")) {
            errorMessage = "Server connection issue. Your donation information is saved, but processing is delayed.";
          } else {
            errorMessage = edgeFunctionError.message;
          }
        }
        
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error('Donation submission error:', error);
      toast.error("Failed to submit donation confirmation", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter transaction reference/ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Amount (₹)</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount donated" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Share a few words about your donation..." className="min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="screenshot"
          render={() => (
            <FormItem>
              <FormLabel>Payment Screenshot (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    accept="image/*"
                    id="screenshot"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-1 file:px-4 file:border-0 file:bg-age-teal/10 file:text-age-teal hover:file:bg-age-teal/20 file:rounded-md"
                  />
                  {selectedFile && (
                    <span className="text-sm text-gray-500">
                      {selectedFile.name.length > 20 ? `${selectedFile.name.substring(0, 20)}...` : selectedFile.name}
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-age-teal hover:bg-age-teal/90"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Confirm Donation
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DonationConfirmationForm;
