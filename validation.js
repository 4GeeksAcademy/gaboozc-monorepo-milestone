const form = document.getElementById("application-form");
const alertBox = document.getElementById("form-alert");
const budgetHelp = document.getElementById("budget-help");
const marketSegment = document.getElementById("marketSegment");

const segmentBudgetRules = {
  pyme_latam: {
    currency: "MXN",
    min: 15000,
    max: 250000
  },
  startup_usd: {
    currency: "USD",
    min: 3000,
    max: 120000
  },
  venezuela: {
    currency: "USD",
    min: 500,
    max: 25000
  }
};

const fieldValidators = {
  fullName: (value) => {
    const validName = /^[A-Za-zÀ-ÿ'\-.\s]{3,}$/.test(value.trim());
    const hasTwoWords = value.trim().split(/\s+/).length >= 2;
    if (!validName || !hasTwoWords) {
      return "Enter your full name (at least first and last name).";
    }
    return "";
  },
  email: (value) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
    return valid ? "" : "Enter a valid work email address.";
  },
  phone: (value) => {
    const valid = /^\+?[0-9\s()-]{8,20}$/.test(value.trim());
    return valid ? "" : "Enter a valid international phone number.";
  },
  role: (value) =>
    value.trim().length >= 2 ? "" : "Enter your role in the company.",
  companyName: (value) =>
    value.trim().length >= 2 ? "" : "Enter your company name.",
  businessNiche: (value) =>
    value.trim().length >= 3 ? "" : "Enter your business niche.",
  marketSegment: (value) =>
    value ? "" : "Select the market segment that matches your business.",
  teamSize: (value) => {
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1 || num > 500) {
      return "Team size must be an integer between 1 and 500.";
    }
    return "";
  },
  budget: (value) => {
    const segment = marketSegment.value;
    if (!segment || !segmentBudgetRules[segment]) {
      return "Select market segment before entering your budget.";
    }

    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) {
      return "Enter a valid positive budget amount.";
    }

    const rule = segmentBudgetRules[segment];
    if (num < rule.min || num > rule.max) {
      return `Budget for this segment must be between ${rule.min.toLocaleString()} and ${rule.max.toLocaleString()} ${rule.currency}.`;
    }

    return "";
  },
  timelineWeeks: (value) => {
    const num = Number(value);
    if (!Number.isInteger(num) || num < 2 || num > 24) {
      return "Timeline must be between 2 and 24 weeks.";
    }
    return "";
  },
  painPoints: (value) =>
    value.trim().length >= 20
      ? ""
      : "Describe your pain points in at least 20 characters.",
  projectVision: (value) =>
    value.trim().length >= 30
      ? ""
      : "Describe expected outcomes in at least 30 characters.",
  terms: (_, checked) =>
    checked ? "" : "You must accept the consent statement to continue."
};

function setFieldError(fieldName, message) {
  const errorNode = document.getElementById(`${fieldName}-error`);
  const inputNode = document.getElementById(fieldName);

  if (errorNode) {
    errorNode.textContent = message;
  }

  if (inputNode) {
    inputNode.setAttribute("aria-invalid", message ? "true" : "false");
    inputNode.classList.toggle("border-red-500", Boolean(message));
    inputNode.classList.toggle("border-amber/30", !message);
  }
}

function validateServices() {
  const checked = document.querySelectorAll('input[name="services"]:checked');
  const errorNode = document.getElementById("services-error");

  if (checked.length < 1) {
    errorNode.textContent = "Choose at least one service.";
    return false;
  }

  errorNode.textContent = "";
  return true;
}

function setAlert(type, message) {
  alertBox.classList.remove("hidden", "border-red-300", "bg-red-50", "text-red-700", "border-emerald-300", "bg-emerald-50", "text-emerald-700");

  if (type === "error") {
    alertBox.classList.add("border-red-300", "bg-red-50", "text-red-700");
  } else {
    alertBox.classList.add("border-emerald-300", "bg-emerald-50", "text-emerald-700");
  }

  alertBox.textContent = message;
}

function updateBudgetHint() {
  const segment = marketSegment.value;
  if (!segment || !segmentBudgetRules[segment]) {
    budgetHelp.textContent = "Choose your market segment first to view valid budget range.";
    return;
  }

  const rule = segmentBudgetRules[segment];
  budgetHelp.textContent = `Valid range: ${rule.min.toLocaleString()} to ${rule.max.toLocaleString()} ${rule.currency}.`;
}

function validateField(fieldName) {
  const element = document.getElementById(fieldName);

  if (!element || !fieldValidators[fieldName]) {
    return true;
  }

  const message = fieldValidators[fieldName](element.value, element.checked);
  setFieldError(fieldName, message);
  return !message;
}

function getInputFields() {
  return [
    "fullName",
    "email",
    "phone",
    "role",
    "companyName",
    "businessNiche",
    "marketSegment",
    "teamSize",
    "budget",
    "timelineWeeks",
    "painPoints",
    "projectVision",
    "terms"
  ];
}

if (form) {
  getInputFields().forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (!field) {
      return;
    }

    const eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => {
      validateField(fieldName);
      if (fieldName === "marketSegment") {
        updateBudgetHint();
        validateField("budget");
      }
    });
  });

  document.querySelectorAll('input[name="services"]').forEach((checkbox) => {
    checkbox.addEventListener("change", validateServices);
  });

  marketSegment.addEventListener("change", updateBudgetHint);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    for (const fieldName of getInputFields()) {
      const fieldOk = validateField(fieldName);
      if (!fieldOk) {
        isValid = false;
      }
    }

    if (!validateServices()) {
      isValid = false;
    }

    if (!isValid) {
      setAlert("error", "Please fix the highlighted fields and submit again.");
      const firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    setAlert("success", "Application submitted successfully. Our team will contact you shortly.");
    form.reset();
    updateBudgetHint();
    document.querySelectorAll('input[name="services"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    getInputFields().forEach((fieldName) => setFieldError(fieldName, ""));
    document.getElementById("services-error").textContent = "";
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      getInputFields().forEach((fieldName) => setFieldError(fieldName, ""));
      document.getElementById("services-error").textContent = "";
      alertBox.classList.add("hidden");
      alertBox.textContent = "";
      updateBudgetHint();
    }, 0);
  });

  updateBudgetHint();
}
