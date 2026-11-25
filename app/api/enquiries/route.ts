import { NextResponse } from "next/server";
import {
  createEnquiry,
  markEnquiryDelivery,
  type EnquiryInput,
} from "../../../lib/enquiries";
import {
  formatEnquiryEmailHtml,
  formatEnquiryEmailText,
  formatEnquirySubject,
  formatEnquiryWhatsApp,
} from "../../../lib/enquiry-notify";
import { sendEnquiryEmail } from "../../../lib/email";
import { notifyWhatsApp } from "../../../lib/whatsapp-notify";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryInput;
    const result = await createEnquiry(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    const whatsappText = formatEnquiryWhatsApp(result.enquiry);
    const emailText = formatEnquiryEmailText(result.enquiry);
    const emailHtml = formatEnquiryEmailHtml(result.enquiry);
    const subject = formatEnquirySubject(result.enquiry);

    const [emailResult, whatsappResult] = await Promise.all([
      sendEnquiryEmail({
        subject,
        text: emailText,
        html: emailHtml,
        replyTo: result.enquiry.email || undefined,
      }).catch(error => {
        console.error("[email]", error);
        return { ok: false as const, error: "email failed" };
      }),
      notifyWhatsApp(whatsappText).catch(error => {
        console.error("[whatsapp]", error);
        return { ok: false as const, status: 500, data: { error: "whatsapp failed" } };
      }),
    ]);

    await markEnquiryDelivery(result.enquiry.id, {
      emailSent: emailResult.ok,
      whatsappSent: Boolean(whatsappResult.ok),
    });

    return NextResponse.json({
      ok: true,
      enquiry: {
        id: result.enquiry.id,
        emailSent: emailResult.ok,
        whatsappSent: Boolean(whatsappResult.ok),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
