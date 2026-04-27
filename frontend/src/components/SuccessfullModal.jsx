const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(39,35,67,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-main)",
          border: "1px solid var(--stroke)",
          borderRadius: "16px",
          padding: "40px 36px 32px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          animation: "modalIn 0.2s ease",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-text)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span
          style={{
            display: "inline-block",
            background: "var(--bg-secondary)",
            color: "var(--text-headline)",
            fontSize: "11px",
            fontFamily: "monospace",
            letterSpacing: "1.5px",
            padding: "4px 10px",
            borderRadius: "20px",
            marginBottom: "16px",
            border: "1px solid var(--stroke)",
          }}
        >
          MESSAGE SENT
        </span>

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--text-headline)",
          }}
        >
          Thank you for reaching out!
        </h2>
        <p
          style={{
            margin: "0 0 28px",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--text-paragraph)",
          }}
        >
          It has been received, and I will respond as soon as possible,
          typically within 1-2 business days.
        </p>

        <button
          onClick={onClose}
          className="w-12/12 hover:opacity-50 py-2"
          style={{
            background: "var(--accent)",
            color: "var(--accent-text)",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
