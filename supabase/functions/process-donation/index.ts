
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  fullName: string;
  email: string;
  transactionId: string;
  amount: string;
  message: string;
  screenshotUrl: string;
  oldAgeHomeId: string;
  oldAgeHomeName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing donation request...");
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Successfully parsed request body");
    } catch (parseError) {
      console.error("Failed to parse request JSON:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const { 
      fullName,
      email,
      transactionId,
      amount,
      message,
      screenshotUrl,
      oldAgeHomeId,
      oldAgeHomeName
    }: DonationRequest = requestBody;

    console.log("Received donation data:", { 
      fullName, email, transactionId, amount, oldAgeHomeId, oldAgeHomeName,
      screenshotUrl: screenshotUrl ? "URL provided" : "No URL provided"
    });

    if (!fullName || !email || !transactionId || !amount || !oldAgeHomeId) {
      console.error("Missing required fields in request");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get NGO email based on oldAgeHomeId
    const ngoEmails: Record<string, string> = {
      "1": "kalyanmitrasamiti@yahoo.com",
      "2": "Daanpatra18@gmail.com",
      "3": "info@ashanjali.org",
      "4": "pandit.swapnil007@gmail.com",
    };

    const ngoEmail = ngoEmails[oldAgeHomeId] || "admin@vrudhsevasolutions.com";
    console.log(`Using NGO email: ${ngoEmail} for home ID ${oldAgeHomeId}`);

    // Get supabaseClient from request
    const supabaseClient = req.supabaseClient;
    
    // Store donation in the database
    console.log("Inserting donation record into database...");
    try {
      const { error: insertError } = await supabaseClient
        .from('donations')
        .insert({
          donor_name: fullName,
          donor_email: email,
          transaction_id: transactionId,
          amount: amount,
          message: message,
          screenshot_url: screenshotUrl,
          old_age_home_id: oldAgeHomeId,
          status: 'pending'
        });

      if (insertError) {
        console.error("Database insertion error:", insertError);
        console.log("Continuing process despite database error");
      } else {
        console.log("Donation record inserted successfully");
      }
    } catch (dbError) {
      console.error("Failed to insert donation record:", dbError);
      // Continue processing to at least try sending emails
    }

    // Initialize email sending functionality
    let emailFunctional = false;
    let resend;
    
    // Check if RESEND_API_KEY is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      console.log("RESEND_API_KEY is available, length:", resendApiKey.length);
      try {
        resend = new Resend(resendApiKey);
        emailFunctional = true;
        console.log("Resend email client initialized successfully");
      } catch (resendInitError) {
        console.error("Failed to initialize Resend:", resendInitError);
      }
    } else {
      console.warn("RESEND_API_KEY not set - email functionality disabled");
    }

    // If email functionality is available, try to send emails
    if (emailFunctional && resend) {
      // Send confirmation email to donor
      console.log("Attempting to send confirmation email to donor:", email);
      
      try {
        const { data: donorEmailData, error: donorEmailError } = await resend.emails.send({
          from: "VrudhSeva Donations <onboarding@resend.dev>",
          to: [email],
          subject: `Thank You for Your Donation to ${oldAgeHomeName}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #2a5885; margin-bottom: 5px;">Thank You for Your Donation!</h1>
                <p style="font-size: 18px; color: #555;">Your generosity makes a difference</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.5;">Dear ${fullName},</p>
              
              <p style="font-size: 16px; line-height: 1.5;">Thank you for your generous donation of ₹${amount} to ${oldAgeHomeName}. Your contribution will help provide essential care and support for the elderly residents.</p>
              
              <div style="background-color: #f5f5f5; border-radius: 5px; padding: 15px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2a5885;">Donation Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Transaction ID:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${transactionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Amount:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">₹${amount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${new Date().toLocaleDateString()}</td>
                  </tr>
                </table>
              </div>
              
              ${message ? `<p style="font-size: 16px; line-height: 1.5;"><strong>Your Message:</strong> "${message}"</p>` : ''}
              
              <p style="font-size: 16px; line-height: 1.5;">If you have any questions regarding your donation, please don't hesitate to contact us.</p>
              
              <p style="font-size: 16px; line-height: 1.5;">
                Warm regards,<br>
                The ${oldAgeHomeName} Team
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; text-align: center;">
                <p>This is an automated confirmation of your donation. Please do not reply to this email.</p>
                <p>VrudhSeva Solutions - Connecting compassionate donors with elderly care homes</p>
              </div>
            </div>
          `,
        });

        if (donorEmailError) {
          console.error("Error sending donor confirmation email:", donorEmailError);
        } else {
          console.log("Donor confirmation email sent successfully. Response data:", JSON.stringify(donorEmailData));
        }

        // Send notification email to NGO
        console.log("Attempting to send notification email to NGO:", ngoEmail);
        const { data: ngoEmailData, error: ngoEmailError } = await resend.emails.send({
          from: "VrudhSeva Donations <onboarding@resend.dev>",
          to: [ngoEmail],
          subject: `New Donation Received: ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #2a5885; margin-bottom: 5px;">New Donation Received</h1>
                <p style="font-size: 18px; color: #555;">A new contribution to your organization</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.5;">A new donation has been made to your organization through VrudhSeva Solutions.</p>
              
              <div style="background-color: #f5f5f5; border-radius: 5px; padding: 15px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2a5885;">Donor Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Transaction ID:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${transactionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Amount:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">₹${amount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${new Date().toLocaleDateString()}</td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Message:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">"${message}"</td>
                  </tr>
                  ` : ''}
                  ${screenshotUrl ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Payment Screenshot:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                      <a href="${screenshotUrl}" target="_blank">View Screenshot</a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <p style="font-size: 16px; line-height: 1.5;">Log in to your dashboard to view more details about this donation.</p>
              
              <p style="font-size: 16px; line-height: 1.5;">
                Best regards,<br>
                The VrudhSeva Solutions Team
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; text-align: center;">
                <p>This is an automated notification. Please do not reply to this email.</p>
                <p>VrudhSeva Solutions - Connecting compassionate donors with elderly care homes</p>
              </div>
            </div>
          `,
        });

        if (ngoEmailError) {
          console.error("Error sending NGO notification email:", ngoEmailError);
        } else {
          console.log("NGO notification email sent successfully. Response data:", JSON.stringify(ngoEmailData));
        }

        // Check if any emails were sent successfully
        const emailsSent = !donorEmailError || !ngoEmailError;
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Donation processed successfully",
            emailSent: emailsSent,
            emailResults: {
              donorEmail: {
                success: !donorEmailError,
                error: donorEmailError ? donorEmailError.message : null
              },
              ngoEmail: {
                success: !ngoEmailError,
                error: ngoEmailError ? ngoEmailError.message : null
              }
            }
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Donation processed but email sending failed",
            emailSent: false,
            emailError: emailError instanceof Error ? emailError.message : "Unknown email error"
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Donation processed successfully",
        emailSent: emailFunctional 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error processing donation:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to process donation" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
