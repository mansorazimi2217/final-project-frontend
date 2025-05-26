import { Mail, Languages, ChevronDown, Loader2 } from "lucide-react";
function EmailSendModal({
  isPersian,
  translations,
  setShowEmailModal,
  customer,
  showLanguageDropdown,
  setShowLanguageDropdown,
  handleLanguageChange,
  handleSendEmail,
  isSending,
  emailContent,
  sendStatus,
}) {
  return (
    <div>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#006EBD] to-[#006EBD] p-4 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">
              {isPersian ? translations.fa.subject : translations.en.subject}
            </h3>
            <button
              onClick={() => !isSending && setShowEmailModal(false)}
              className={`text-white/80 hover:text-white text-xl ${
                isSending ? "cursor-not-allowed" : ""
              }`}
              disabled={isSending}
            >
              &times;
            </button>
          </div>

          {/* Customer Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="text-[#006EBD] w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">{customer.name}</h4>
                <p className="text-sm text-gray-500">
                  {isPersian ? "مبلغ پرداخت نشده:" : "Unpaid:"} $
                  {customer.remainValue?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">
                  {isPersian
                    ? translations.fa.labels.phone
                    : translations.en.labels.phone}
                  :
                </span>{" "}
                {customer.phone}
              </div>
              <div>
                <span className="text-gray-500">
                  {isPersian
                    ? translations.fa.labels.date
                    : translations.en.labels.date}
                  :
                </span>{" "}
                {new Date().toLocaleDateString(isPersian ? "fa-IR" : undefined)}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Email:</span> {customer.email}
              </div>
            </div>
          </div>

          {/* Message Editor */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                {isPersian
                  ? translations.fa.labels.message
                  : translations.en.labels.message}
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    !isSending && setShowLanguageDropdown(!showLanguageDropdown)
                  }
                  className={`flex items-center text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full ${
                    isSending ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  disabled={isSending}
                >
                  <Languages className="w-3 h-3 mr-1" />
                  {isPersian
                    ? translations.fa.labels.language
                    : translations.en.labels.language}
                  <ChevronDown
                    className="w-3 h-3 ml-1 transition-transform"
                    style={{
                      transform: showLanguageDropdown
                        ? "rotate(180deg)"
                        : "none",
                    }}
                  />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange("fa")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                      dir="rtl"
                    >
                      فارسی
                    </button>
                  </div>
                )}
              </div>
            </div>

            <textarea
              className={`w-full p-3 border ${
                isSending ? "bg-gray-50" : "bg-white"
              } border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              rows="5"
              value={isPersian ? translations.fa.template : emailContent}
              onChange={(e) => !isSending && setEmailContent(e.target.value)}
              dir={isPersian ? "rtl" : "ltr"}
            />
          </div>

          {/* Status Message */}
          {sendStatus && (
            <div
              className={`px-4 py-2 mx-4 rounded-md ${
                sendStatus.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {sendStatus.message}
            </div>
          )}

          {/* Modal Footer */}
          <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
            <button
              onClick={() => !isSending && setShowEmailModal(false)}
              className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
                isSending ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={isSending}
            >
              {isPersian
                ? translations.fa.labels.cancel
                : translations.en.labels.cancel}
            </button>
            <button
              onClick={handleSendEmail}
              className="px-4 py-2 bg-[#006EBD] hover:bg-[#006EBD] text-white rounded-lg transition-colors flex items-center justify-center min-w-24"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPersian
                    ? translations.fa.status.sending
                    : translations.en.status.sending}
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  {isPersian
                    ? translations.fa.labels.send
                    : translations.en.labels.send}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSendModal;
