const DRIVING_LABELS = ["운행일", "측정분야", "차량번호", "사용인력", "차량운행일지"];

function ownText(node) {
  return [...node.childNodes]
    .filter((child) => child.nodeType === Node.TEXT_NODE)
    .map((child) => child.textContent || "")
    .join("")
    .replace(/\s+/g, "")
    .replace(/[*:]/g, "");
}

function regionFor(label) {
  if (label.tagName === "LABEL") {
    if (label.htmlFor) {
      const target = label.ownerDocument.getElementById(label.htmlFor);
      if (target) return target.closest("td, dd, div") || target.parentElement;
    }
    if (label.querySelector("input, select, textarea")) return label;
  }
  const next = label.nextElementSibling;
  if (!next) return null;
  if (next.matches("input, select, textarea")) {
    const parent = next.parentElement;
    const count = parent ? parent.querySelectorAll("input, select, textarea").length : 0;
    if (parent && count > 0 && count <= 8) return parent;
    return null;
  }
  const count = next.querySelectorAll("input, select, textarea").length;
  if (count > 0 && count <= 8) return next;
  return null;
}

function findLabel(doc, label) {
  const nodes = [...doc.querySelectorAll("th, td, label, dt, span, div, p, strong")];
  return (
    nodes.find((node) => {
      if (node.closest("nav, aside, header, #left-panel, .header, .gnb")) return false;
      return ownText(node) === label && regionFor(node);
    }) || null
  );
}

function regions(doc) {
  return DRIVING_LABELS.map((label) => findLabel(doc, label)).filter(Boolean).map((label) => regionFor(label));
}

export function prepareDrivingFields(doc) {
  for (const region of regions(doc)) {
    for (const element of region.querySelectorAll("input, select, textarea")) {
      if (element.tagName === "INPUT" && ["button", "submit", "image", "file", "hidden"].includes(element.type)) continue;
      element.readOnly = false;
      element.disabled = false;
    }
  }
}

export function collectDrivingFields(doc) {
  const fields = [];
  for (const region of regions(doc)) {
    for (const element of region.querySelectorAll("input, select, textarea")) {
      if (element.tagName === "INPUT" && ["button", "submit", "image", "file"].includes(element.type)) continue;
      if (element.tagName === "SELECT" && element.multiple) {
        for (const option of element.selectedOptions) {
          const value = option.value.trim();
          if (!value) continue;
          fields.push({ id: element.id || "", name: element.name || "", value });
        }
        continue;
      }
      if (element.type === "checkbox" || element.type === "radio") {
        if (!element.checked) continue;
        const value = (element.value || "").trim();
        if (!value) continue;
        fields.push({ id: element.id || "", name: element.name || "", value });
        continue;
      }
      const value = (element.value || "").trim();
      if (!value) continue;
      fields.push({ id: element.id || "", name: element.name || "", value });
    }
  }
  return fields;
}

export function findDrivingSearch(doc) {
  return [...doc.querySelectorAll("a, button, input")].find((element) => {
    if (element.closest("nav, aside, header, #left-panel, .header, .gnb")) return false;
    if (element.tagName === "INPUT" && !["button", "submit", "image"].includes(element.type)) return false;
    const raw = element.tagName === "INPUT" ? element.value : element.textContent || "";
    return raw.replace(/\s+/g, "") === "검색";
  });
}
