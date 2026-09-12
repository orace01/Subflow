import { MailIcon } from "@/components/icons";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Contact · SubFlow" };

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>Une question, un problème avec une détection, une suggestion ?</p>
      <a
        href="mailto:contact@subflow.app"
        className="hard-sm inline-flex items-center gap-2.5 bg-surface px-5 py-3.5 w-fit text-[14.5px] font-bold no-underline text-ink"
      >
        <MailIcon className="w-[18px] h-[18px] text-blue" />
        contact@subflow.app
      </a>
    </LegalPage>
  );
}
