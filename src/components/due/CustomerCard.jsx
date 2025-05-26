import { useState } from "react";
import emailjs, { send } from "emailjs-com";
import EmailSendModal from "./EmailSendModal";
import Customer_Card from "./Customer_Card";

const CustomerCard = ({ customer, onPayDue }) => {
  // State management
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState(
    `Dear ${
      customer.name
    }, you have an unpaid balance of $${customer.remainValue?.toFixed(
      2
    )} from your last purchase on ${new Date(
      customer.lastPurchaseAt
    ).toLocaleDateString()}. Please clear your payment within 7 days. Thank you!`
  );
  const [isPersian, setIsPersian] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  // Initialize EmailJS
  emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual EmailJS user ID

  // Translation content
  const translations = {
    en: {
      template: `Dear ${
        customer.name
      }, you have an unpaid balance of $${customer.remainValue?.toFixed(
        2
      )} from your last purchase on ${new Date(
        customer.lastPurchaseAt
      ).toLocaleDateString()}. Please clear your payment within 7 days. Thank you!`,
      subject: "Payment Reminder",
      labels: {
        customer: "Customer",
        phone: "Phone",
        date: "Date",
        message: "Message",
        cancel: "Cancel",
        send: "Send Message",
        language: "Language",
      },
      status: {
        sending: "Sending...",
        success: "Email sent successfully!",
        error: "Failed to send email. Please try again.",
      },
    },
    fa: {
      template: `جناب ${
        customer.name
      }، شما مبلغ پرداخت نشده ${customer.remainValue?.toFixed(
        2
      )} دلار از خرید مورخ ${new Date(
        customer.lastPurchaseAt
      ).toLocaleDateString(
        "fa-IR"
      )} دارید. لطفاً ظرف 7 روز پرداخت خود را انجام دهید. با تشکر!`,
      subject: "یادآوری پرداخت",
      labels: {
        customer: "مشتری",
        phone: "تلفن",
        date: "تاریخ",
        message: "پیام",
        cancel: "انصراف",
        send: "ارسال پیام",
        language: "زبان",
      },
      status: {
        sending: "در حال ارسال...",
        success: "ایمیل با موفقیت ارسال شد!",
        error: "ارسال ایمیل ناموفق بود. لطفاً مجدداً تلاش کنید.",
      },
    },
  };

  // Handle sending email
  emailjs.init("jY1tG4Em1ASbrORVp");

  const handleSendEmail = async () => {
    setIsSending(true);
    setSendStatus(null);

    try {
      const response = await emailjs.send(
        "service_uwve17l",
        "template_gwq7ymd",
        {
          to_name: customer.name,
          to_email: customer.email,
          from_name: "Digital Store",
          message: isPersian ? translations.fa.template : emailContent,
          subject: isPersian
            ? translations.fa.subject
            : translations.en.subject,
          due_amount: customer.remainValue?.toFixed(2),
          due_date: new Date().toLocaleDateString(
            isPersian ? "fa-IR" : undefined
          ),
        }
      );

      console.log(customer.email);
      console.log(response);

      setSendStatus({
        success: true,
        message: isPersian
          ? translations.fa.status.success
          : translations.en.status.success,
      });
      setTimeout(() => {
        setShowEmailModal(false);
        setIsSending(false);
      }, 1500);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSendStatus({
        success: false,
        message: isPersian
          ? translations.fa.status.error
          : translations.en.status.error,
      });
      setIsSending(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setIsPersian(language === "fa");
    setEmailContent(translations[language].template);
    setShowLanguageDropdown(false);
  };

  return (
    <>
      {/* Customer Card */}
      <Customer_Card
        customer={customer}
        copied={copied}
        onPayDue={onPayDue}
        setShowEmailModal={setShowEmailModal}
        setCopied={setCopied}
      />

      {showEmailModal && (
        <EmailSendModal
          isPersian={isPersian}
          translations={translations}
          setShowEmailModal={setShowEmailModal}
          customer={customer}
          showLanguageDropdown={showLanguageDropdown}
          setShowLanguageDropdown={setShowLanguageDropdown}
          handleLanguageChange={handleLanguageChange}
          handleSendEmail={handleSendEmail}
          isSending={isSending}
          emailContent={emailContent}
          sendStatus={sendStatus}
        />
      )}
    </>
  );
};

export default CustomerCard;
