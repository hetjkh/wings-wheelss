import { listEnquiriesAdmin } from "../../../lib/enquiries";
import { EnquiriesTable } from "../components/enquiries-table";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  try {
    const enquiries = await listEnquiriesAdmin();
    return (
      <section className="admin-panel">
        <h1>Enquiries</h1>
        <p className="lede">
          Form submissions from the website. Each enquiry is stored here, emailed to info@wwtravels.net, and pushed to WhatsApp when connected.
        </p>
        <EnquiriesTable enquiries={enquiries} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="admin-panel">
        <h1>Enquiries</h1>
        <p className="admin-error" role="alert">
          Could not reach MongoDB. Check your connection string and Atlas Network Access.
        </p>
      </section>
    );
  }
}
