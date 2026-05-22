import { useState, useEffect, createContext, useContext } from "react";

const API_BASE = "http://localhost:3001/api";

async function apiPost(collection, item) {
  const r = await fetch(`${API_BASE}/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function apiPatch(collection, id, patch) {
  const r = await fetch(`${API_BASE}/${collection}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

const COLORS = {
  rose: "#B5737F",
  roseLight: "#F5E8EB",
  roseMid: "#D4A0A8",
  champagne: "#F7F0E6",
  champagneDark: "#E8D9C4",
  sage: "#8A9E80",
  sageLight: "#EEF3EB",
  gold: "#C4A055",
  goldLight: "#F7F0DC",
  brown: "#6B4C3B",
  ink: "#2C2320",
  muted: "#8C7B74",
  border: "#EAE0D8",
  white: "#FDFAF7",
  bg: "#FAF6F1",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
`;

const LangContext = createContext(null);

const TRANSLATIONS = {
  en: {
    nav_overview: "Overview",
    nav_budget: "Budget",
    nav_venues: "Venues",
    nav_photographers: "Photographers",
    nav_guests: "Guests",
    nav_seating: "Seating",
    nav_checklist: "Checklist",
    nav_vendors: "Vendors",
    nav_settings: "Settings",
    app_title: "Wedding Planner",
    app_tagline: "Planning your forever",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    restore: "Restore",
    name: "Name",
    location: "Location",
    style: "Style",
    emoji: "Emoji",
    price: "Price ($)",
    capacity: "Capacity",
    rating: "Rating",
    hours: "Hours",
    type: "Type",
    email: "Email",
    phone: "Phone",
    status: "Status",
    notes: "Notes",
    all: "all",
    days: "days",
    trash_title: "Deleted Items",
    trash_empty: "No deleted items",
    trash_view: "View deleted items",
    ov_wedding_day: "Your Wedding Day",
    ov_days_until: "Days Until",
    ov_until_big_day: "until your big day",
    ov_budget_used: "Budget Used",
    ov_guests_confirmed: "Guests Confirmed",
    ov_tasks_done: "Tasks Done",
    ov_of_invited: "of {n} invited",
    ov_n_of_tasks: "{done} of {total} tasks",
    ov_pct_of_budget: "{pct}% of budget",
    ov_budget_overview: "Budget Overview",
    ov_planning_progress: "Planning Progress",
    ov_selected_venue: "Selected Venue",
    ov_selected_photographer: "Selected Photographer",
    ov_no_venue: "No venue selected yet",
    ov_no_photographer: "No photographer selected yet",
    ov_up_to: "Up to {n} guests",
    ov_n_hours: "{n} hours",
    cat_venue: "Venue",
    cat_photography: "Photography",
    cat_catering: "Catering",
    cat_stationery: "Stationery",
    cat_beauty: "Beauty",
    bud_title: "Budget & Expenses",
    bud_sub: "Track every expense and stay on budget for your perfect day",
    bud_total: "Total Budget",
    bud_click_edit: "Click to edit",
    bud_total_spent: "Total Spent",
    bud_remaining: "Remaining",
    bud_on_track: "on track",
    bud_over: "over budget!",
    bud_budget_label: "Budget: ${n}",
    bud_spent: "spent",
    bud_pct_left: "{pct}% used · ${left} left",
    bud_hide: "Hide",
    bud_expense_one: "expense",
    bud_expense_many: "expenses",
    bud_add_expense: "Add an Expense",
    bud_description: "Description",
    bud_desc_ph: "e.g. Deposit for florist",
    bud_category: "Category",
    bud_amount: "Amount ($)",
    bud_add: "+ Add",
    ven_title: "Venue Options",
    ven_sub:
      "Compare and select the perfect setting for your ceremony and reception",
    ven_add: "+ Add Venue",
    ven_new: "New Venue",
    ven_location_ph: "City / Region",
    ven_style_ph: "e.g. Garden",
    ven_capacity_ph: "guests",
    ven_notes_ph: "Additional notes…",
    ven_save: "Save Venue",
    ven_selected: "✓ Selected",
    ven_up_to: "Up to {n} guests",
    ven_select: "Select This Venue",
    ven_delete: "Delete venue",
    pho_title: "Photographers",
    pho_sub: "Choose your artist to capture every magical moment",
    pho_add: "+ Add Photographer",
    pho_new: "New Photographer",
    pho_style_ph: "e.g. Candid",
    pho_specialties: "Specialties (comma-separated)",
    pho_specialties_ph: "e.g. Portraits, Drone",
    pho_save: "Save",
    pho_package: "Package",
    pho_chosen: "✓ Chosen",
    pho_selected: "✓ Selected",
    pho_select: "Select",
    pho_hrs: "{n} hrs",
    pho_delete: "Delete photographer",
    gue_title: "Guest List",
    gue_sub: "Manage your guest list and track RSVPs",
    gue_total: "Total Invited",
    gue_confirmed: "Confirmed",
    gue_pending: "Pending",
    gue_declined: "Declined",
    gue_search: "Search guests…",
    gue_add: "+ Add Guest",
    gue_new: "New Guest",
    gue_name_ph: "Full name (or couple name)",
    gue_add_btn: "Add",
    gue_col_name: "Name",
    gue_col_group: "Group",
    gue_col_rsvp: "RSVP",
    gue_col_dietary: "Dietary",
    gue_col_table: "Table",
    gue_table_n: "Table {n}",
    gue_no_found: "No guests found",
    gue_confirmed_opt: "Confirmed",
    gue_pending_opt: "Pending",
    gue_declined_opt: "Declined",
    gue_delete: "Delete guest",
    grp_family: "Family",
    grp_friend: "Friend",
    grp_colleague: "Colleague",
    grp_partners_family: "Partner's Family",
    grp_partners_friend: "Partner's Friend",
    diet_none: "None",
    diet_vegetarian: "Vegetarian",
    diet_vegan: "Vegan",
    diet_gluten: "Gluten-free",
    diet_sodium: "Low-sodium",
    diet_kosher: "Kosher",
    diet_halal: "Halal",
    tbl_title: "Seating & Tables",
    tbl_sub: "Arrange your guests and design your reception seating plan",
    tbl_assign: "Assign Guest to Table",
    tbl_select_guest: "Select guest…",
    tbl_select_table: "Select table…",
    tbl_assign_btn: "Assign",
    tbl_not_seated: "{n} guests not yet seated",
    tbl_add_new: "Add New Table",
    tbl_name_ph: "Table name",
    tbl_seats_ph: "Seats",
    tbl_add_btn: "Add",
    tbl_capacity: "Capacity: {n} seats",
    tbl_empty: "No guests seated yet",
    chk_title: "Planning Checklist",
    chk_sub: "Every detail for your perfect day, tracked and organised",
    chk_completed: "Completed",
    chk_of_tasks: "of {n} tasks",
    chk_remaining: "Remaining",
    chk_progress: "Progress",
    chk_add_ph: "Add a new task…",
    chk_add_btn: "+ Add",
    chk_high: "High",
    chk_medium: "Medium",
    chk_low: "Low",
    vnd_title: "Vendors & Suppliers",
    vnd_sub: "All your wedding vendors in one place",
    vnd_total: "Total Vendors",
    vnd_booked: "Booked",
    vnd_total_cost: "Total Cost",
    vnd_add: "+ Add Vendor",
    vnd_business_name: "Business Name",
    vnd_cost: "Cost ($)",
    vnd_save: "Save Vendor",
    vnd_pending: "Pending",
    vnd_booked_s: "Booked",
    vnd_cancelled: "Cancelled",
    vnd_remove: "Remove",
    vnd_name_ph: "Vendor name",
    vnd_notes_ph: "Notes…",
    vtype_catering: "Catering",
    vtype_florist: "Florist",
    vtype_music: "Music / DJ",
    vtype_hair: "Hair & Makeup",
    vtype_cake: "Wedding Cake",
    vtype_transport: "Transportation",
    vtype_officiant: "Officiant",
    vtype_lighting: "Lighting",
    vtype_rentals: "Rentals",
    vtype_other: "Other",
    set_title: "Settings",
    set_sub: "Customise your Wedding Planner experience",
  },
  el: {
    nav_overview: "Επισκόπηση",
    nav_budget: "Προϋπολογισμός",
    nav_venues: "Χώροι",
    nav_photographers: "Φωτογράφοι",
    nav_guests: "Καλεσμένοι",
    nav_seating: "Τραπέζια",
    nav_checklist: "Λίστα",
    nav_vendors: "Προμηθευτές",
    nav_settings: "Ρυθμίσεις",
    app_title: "Οργανωτής Γάμου",
    app_tagline: "Σχεδιάζονας το μέλλον σας",
    save: "Αποθήκευση",
    cancel: "Ακύρωση",
    add: "Προσθήκη",
    restore: "Επαναφορά",
    name: "Όνομα",
    location: "Τοποθεσία",
    style: "Στυλ",
    emoji: "Εικονίδιο",
    price: "Τιμή (€)",
    capacity: "Χωρητικότητα",
    rating: "Βαθμολογία",
    hours: "Ώρες",
    type: "Κατηγορία",
    email: "Email",
    phone: "Τηλέφωνο",
    status: "Κατάσταση",
    notes: "Σημειώσεις",
    all: "Όλα",
    days: "μέρες",
    trash_title: "Διαγραμμένα Στοιχεία",
    trash_empty: "Δεν υπάρχουν διαγραμμένα",
    trash_view: "Προβολή διαγραμμένων",
    ov_wedding_day: "Η Ημέρα του Γάμου σας",
    ov_days_until: "Ημέρες",
    ov_until_big_day: "μέχρι τη μεγάλη μέρα",
    ov_budget_used: "Δαπάνες Προϋπ.",
    ov_guests_confirmed: "Επιβεβαιωμένοι",
    ov_tasks_done: "Εργασίες",
    ov_of_invited: "από {n} προσκεκλημένους",
    ov_n_of_tasks: "{done} από {total} εργασίες",
    ov_pct_of_budget: "{pct}% του προϋπολογισμού",
    ov_budget_overview: "Επισκόπηση Προϋπολογισμού",
    ov_planning_progress: "Πρόοδος Σχεδιασμού",
    ov_selected_venue: "Επιλεγμένος Χώρος",
    ov_selected_photographer: "Επιλεγμένος Φωτογράφος",
    ov_no_venue: "Δεν έχει επιλεγεί χώρος ακόμα",
    ov_no_photographer: "Δεν έχει επιλεγεί φωτογράφος ακόμα",
    ov_up_to: "Έως {n} άτομα",
    ov_n_hours: "{n} ώρες",
    cat_venue: "Χώρος",
    cat_photography: "Φωτογραφία",
    cat_catering: "Catering",
    cat_stationery: "Προσκλητήρια",
    cat_beauty: "Ομορφιά",
    bud_title: "Προϋπολογισμός & Έξοδα",
    bud_sub: "Παρακολουθήστε κάθε δαπάνη και μείνετε εντός προϋπολογισμού",
    bud_total: "Συνολικός Προϋπ.",
    bud_click_edit: "Κλικ για επεξεργασία",
    bud_total_spent: "Συνολικές Δαπάνες",
    bud_remaining: "Υπόλοιπο",
    bud_on_track: "εντός προϋπολογισμού",
    bud_over: "υπέρβαση προϋπολογισμού!",
    bud_budget_label: "Προϋπ.: ${n}",
    bud_spent: "δαπανήθηκαν",
    bud_pct_left: "{pct}% χρησ. · ${left} απομ.",
    bud_hide: "Απόκρυψη",
    bud_expense_one: "δαπάνη",
    bud_expense_many: "δαπάνες",
    bud_add_expense: "Προσθήκη Δαπάνης",
    bud_description: "Περιγραφή",
    bud_desc_ph: "π.χ. Προκαταβολή ανθοπώλη",
    bud_category: "Κατηγορία",
    bud_amount: "Ποσό (€)",
    bud_add: "+ Προσθήκη",
    ven_title: "Επιλογές Χώρου",
    ven_sub:
      "Συγκρίνετε και επιλέξτε τον τέλειο χώρο για την τελετή και δεξίωσή σας",
    ven_add: "+ Προσθήκη Χώρου",
    ven_new: "Νέος Χώρος",
    ven_location_ph: "Πόλη / Περιοχή",
    ven_style_ph: "π.χ. Κήπος",
    ven_capacity_ph: "άτομα",
    ven_notes_ph: "Επιπλέον σημειώσεις…",
    ven_save: "Αποθήκευση Χώρου",
    ven_selected: "✓ Επιλεγμένο",
    ven_up_to: "Έως {n} άτομα",
    ven_select: "Επιλογή Χώρου",
    ven_delete: "Διαγραφή χώρου",
    pho_title: "Φωτογράφοι",
    pho_sub: "Επιλέξτε τον καλλιτέχνη σας για να αποτυπώσει κάθε μαγική στιγμή",
    pho_add: "+ Προσθήκη Φωτογράφου",
    pho_new: "Νέος Φωτογράφος",
    pho_style_ph: "π.χ. Φυσικό",
    pho_specialties: "Ειδικότητες (χωρισμένες με κόμμα)",
    pho_specialties_ph: "π.χ. Πορτρέτα, Drone",
    pho_save: "Αποθήκευση",
    pho_package: "Πακέτο",
    pho_chosen: "✓ Επιλεγμένο",
    pho_selected: "✓ Επιλεγμένο",
    pho_select: "Επιλογή",
    pho_hrs: "{n} ώρ.",
    pho_delete: "Διαγραφή φωτογράφου",
    gue_title: "Λίστα Καλεσμένων",
    gue_sub:
      "Διαχειριστείτε τη λίστα καλεσμένων και παρακολουθήστε τις απαντήσεις",
    gue_total: "Σύνολο Προσκλήσεων",
    gue_confirmed: "Επιβεβαιωμένοι",
    gue_pending: "Εκκρεμείς",
    gue_declined: "Αρνήσεις",
    gue_search: "Αναζήτηση καλεσμένων…",
    gue_add: "+ Προσθήκη Καλεσμένου",
    gue_new: "Νέος Καλεσμένος",
    gue_name_ph: "Ονοματεπώνυμο (ή ζευγάρι)",
    gue_add_btn: "Προσθήκη",
    gue_col_name: "Όνομα",
    gue_col_group: "Ομάδα",
    gue_col_rsvp: "Απάντηση",
    gue_col_dietary: "Διατροφή",
    gue_col_table: "Τραπέζι",
    gue_table_n: "Τραπέζι {n}",
    gue_no_found: "Δεν βρέθηκαν καλεσμένοι",
    gue_confirmed_opt: "Επιβεβαιωμένος",
    gue_pending_opt: "Εκκρεμής",
    gue_declined_opt: "Αρνήθηκε",
    gue_delete: "Διαγραφή καλεσμένου",
    grp_family: "Οικογένεια",
    grp_friend: "Φίλος",
    grp_colleague: "Συνάδελφος",
    grp_partners_family: "Οικογένεια Συντρόφου",
    grp_partners_friend: "Φίλος Συντρόφου",
    diet_none: "Κανένα",
    diet_vegetarian: "Χορτοφαγικό",
    diet_vegan: "Vegan",
    diet_gluten: "Χωρίς Γλουτένη",
    diet_sodium: "Χαμηλό Αλάτι",
    diet_kosher: "Kosher",
    diet_halal: "Halal",
    tbl_title: "Τοποθέτηση & Τραπέζια",
    tbl_sub: "Οργανώστε τους καλεσμένους και σχεδιάστε το πλάνο δεξίωσης",
    tbl_assign: "Τοποθέτηση Καλεσμένου σε Τραπέζι",
    tbl_select_guest: "Επιλέξτε καλεσμένο…",
    tbl_select_table: "Επιλέξτε τραπέζι…",
    tbl_assign_btn: "Τοποθέτηση",
    tbl_not_seated: "{n} καλεσμένοι χωρίς θέση",
    tbl_add_new: "Νέο Τραπέζι",
    tbl_name_ph: "Όνομα τραπεζιού",
    tbl_seats_ph: "Θέσεις",
    tbl_add_btn: "Προσθήκη",
    tbl_capacity: "Χωρητικότητα: {n} θέσεις",
    tbl_empty: "Δεν έχουν τοποθετηθεί καλεσμένοι",
    chk_title: "Λίστα Ελέγχου",
    chk_sub: "Κάθε λεπτομέρεια για την τέλεια μέρα σας, οργανωμένη",
    chk_completed: "Ολοκληρωμένες",
    chk_of_tasks: "από {n} εργασίες",
    chk_remaining: "Εκκρεμείς",
    chk_progress: "Πρόοδος",
    chk_add_ph: "Προσθήκη νέας εργασίας…",
    chk_add_btn: "+ Προσθήκη",
    chk_high: "Υψηλή",
    chk_medium: "Μέτρια",
    chk_low: "Χαμηλή",
    vnd_title: "Προμηθευτές & Συνεργάτες",
    vnd_sub: "Όλοι οι προμηθευτές του γάμου σας σε ένα μέρος",
    vnd_total: "Σύνολο Προμηθευτών",
    vnd_booked: "Κρατημένοι",
    vnd_total_cost: "Συνολικό Κόστος",
    vnd_add: "+ Προσθήκη Προμηθευτή",
    vnd_business_name: "Επωνυμία",
    vnd_cost: "Κόστος (€)",
    vnd_save: "Αποθήκευση Προμηθευτή",
    vnd_pending: "Εκκρεμής",
    vnd_booked_s: "Κρατημένος",
    vnd_cancelled: "Ακυρωμένος",
    vnd_remove: "Αφαίρεση",
    vnd_name_ph: "Όνομα προμηθευτή",
    vnd_notes_ph: "Σημειώσεις…",
    vtype_catering: "Catering",
    vtype_florist: "Ανθοπώλης",
    vtype_music: "Μουσική / DJ",
    vtype_hair: "Hair & Μακιγιάζ",
    vtype_cake: "Γαμήλια Τούρτα",
    vtype_transport: "Μεταφορά",
    vtype_officiant: "Ιερέας / Λειτουργός",
    vtype_lighting: "Φωτισμός",
    vtype_rentals: "Ενοικιάσεις",
    vtype_other: "Άλλο",
    set_title: "Ρυθμίσεις",
    set_sub: "Προσαρμόστε την εμπειρία του Οργανωτή Γάμου σας",
  },
};

// Data moved to `data/*.json`. At runtime the app loads them via DataStore
// and writes edits to `localStorage` (so the original source files remain read-only).

// Read wedding date from global DataStore.meta if available, otherwise fallback
function getDaysUntil() {
  const fallback = new Date("2025-09-20");
  const weddingDate =
    (typeof window !== "undefined" &&
      window.DataStore &&
      window.DataStore.getMetaDate &&
      window.DataStore.getMetaDate()) ||
    fallback;
  const now = new Date();
  const diff = weddingDate - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getWeddingDateString(lang) {
  const fallback = new Date("2025-09-20");
  const d =
    (typeof window !== "undefined" &&
      window.DataStore &&
      window.DataStore.getMetaDate &&
      window.DataStore.getMetaDate()) ||
    fallback;
  const locale = lang === "el" ? "el-GR" : "en-US";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Badge({ color, bg, children }) {
  return (
    <span
      style={{
        background: bg || COLORS.roseLight,
        color: color || COLORS.rose,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 500,
          color: COLORS.ink,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: COLORS.muted,
            margin: "6px 0 0",
            fontWeight: 300,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <Card style={{ textAlign: "center", padding: "18px 16px" }}>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 36,
          fontWeight: 500,
          color: accent || COLORS.rose,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: COLORS.muted,
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      )}
    </Card>
  );
}

function TrashButton({ count, onClick, active }) {
  const { t } = useContext(LangContext);
  return (
    <button
      onClick={onClick}
      title={t("trash_view")}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 12px",
        background: active ? COLORS.roseLight : "transparent",
        color: active ? COLORS.rose : COLORS.muted,
        border: `1px solid ${active ? COLORS.rose : COLORS.border}`,
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
      }}
    >
      🗑
      {count > 0 && (
        <span
          style={{
            background: COLORS.rose,
            color: "#fff",
            borderRadius: "50%",
            minWidth: 18,
            height: 18,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            padding: "0 3px",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function TrashPanel({ items, onRestore, renderItem }) {
  const { t } = useContext(LangContext);
  return (
    <div
      style={{
        background: "#FFF8F8",
        border: `1px solid ${COLORS.roseMid}`,
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.rose,
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {t("trash_title")}
      </div>
      {items.length === 0 ? (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: COLORS.muted,
          }}
        >
          {t("trash_empty")}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px 12px",
                background: COLORS.white,
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: COLORS.muted,
                }}
              >
                {renderItem(item)}
              </span>
              <button
                onClick={() => onRestore(item.id)}
                style={{
                  padding: "4px 12px",
                  background: COLORS.sage,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                {t("restore")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Overview({ budget, guests, checklist, venues, photographers }) {
  const { t, lang } = useContext(LangContext);
  const daysLeft = getDaysUntil();
  const totalSpent = budget.categories.reduce((s, c) => s + c.spent, 0);
  const activeGuests = guests.filter((g) => !g.deleted);
  const activeChecklist = checklist.filter((c) => !c.deleted);
  const confirmed = activeGuests.filter((g) => g.rsvp === "confirmed").length;
  const done = activeChecklist.filter((c) => c.done).length;
  const selectedVenue = venues.find((v) => v.selected && !v.deleted);
  const selectedPhoto = photographers.find((p) => p.selected && !p.deleted);
  const pct = Math.round((totalSpent / budget.total) * 100);
  const taskPct = Math.round(
    (done / Math.max(1, activeChecklist.length)) * 100,
  );

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: COLORS.muted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          {t("ov_wedding_day")}
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40,
            fontWeight: 500,
            color: COLORS.ink,
            margin: 0,
          }}
        >
          {getWeddingDateString(lang)}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <StatCard
          label={t("ov_days_until")}
          value={daysLeft}
          sub={t("ov_until_big_day")}
          accent={COLORS.rose}
        />
        <StatCard
          label={t("ov_budget_used")}
          value={`${pct}%`}
          sub={`$${totalSpent.toLocaleString()} of $${budget.total.toLocaleString()}`}
          accent={COLORS.gold}
        />
        <StatCard
          label={t("ov_guests_confirmed")}
          value={confirmed}
          sub={t("ov_of_invited", { n: activeGuests.length })}
          accent={COLORS.sage}
        />
        <StatCard
          label={t("ov_tasks_done")}
          value={`${taskPct}%`}
          sub={t("ov_n_of_tasks", { done, total: activeChecklist.length })}
          accent={COLORS.brown}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {t("ov_budget_overview")}
          </div>
          {budget.categories.slice(0, 5).map((cat) => (
            <div key={cat.id} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.ink,
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  ${cat.spent.toLocaleString()} / ${cat.budget.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  background: COLORS.champagneDark,
                  borderRadius: 4,
                  height: 6,
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, Math.round((cat.spent / cat.budget) * 100))}%`,
                    background: cat.color,
                    height: 6,
                    borderRadius: 4,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {t("ov_planning_progress")}
          </div>
          {[
            ["Venue", t("cat_venue")],
            ["Photography", t("cat_photography")],
            ["Catering", t("cat_catering")],
            ["Stationery", t("cat_stationery")],
            ["Beauty", t("cat_beauty")],
          ].map(([catKey, catLabel]) => {
            const tasks = activeChecklist.filter(
              (tk) => tk.category === catKey,
            );
            const doneTasks = tasks.filter((tk) => tk.done).length;
            const pct = tasks.length
              ? Math.round((doneTasks / tasks.length) * 100)
              : 0;
            return (
              <div key={catKey} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: COLORS.ink,
                    }}
                  >
                    {catLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: pct === 100 ? COLORS.sage : COLORS.muted,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  style={{
                    background: COLORS.champagneDark,
                    borderRadius: 4,
                    height: 6,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? COLORS.sage : COLORS.rose,
                      height: 6,
                      borderRadius: 4,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {t("ov_selected_venue")}
          </div>
          {selectedVenue ? (
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ fontSize: 36 }}>{selectedVenue.image}</div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: COLORS.ink,
                  }}
                >
                  {selectedVenue.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  {selectedVenue.location} · {selectedVenue.style}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.rose,
                    marginTop: 4,
                  }}
                >
                  ${selectedVenue.price.toLocaleString()} ·{" "}
                  {t("ov_up_to", { n: selectedVenue.capacity })}
                </div>
              </div>
            </div>
          ) : (
            <p
              style={{
                color: COLORS.muted,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            >
              {t("ov_no_venue")}
            </p>
          )}
        </Card>

        <Card>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {t("ov_selected_photographer")}
          </div>
          {selectedPhoto ? (
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ fontSize: 36 }}>{selectedPhoto.image}</div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: COLORS.ink,
                  }}
                >
                  {selectedPhoto.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  {selectedPhoto.style}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.rose,
                    marginTop: 4,
                  }}
                >
                  ${selectedPhoto.price.toLocaleString()} ·{" "}
                  {t("ov_n_hours", { n: selectedPhoto.hours })}
                </div>
              </div>
            </div>
          ) : (
            <p
              style={{
                color: COLORS.muted,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            >
              {t("ov_no_photographer")}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

function Budget({ budget, setBudget }) {
  const { t } = useContext(LangContext);
  const [newExpense, setNewExpense] = useState({
    name: "",
    category: budget.categories[0]?.id || 1,
    amount: "",
  });
  const [editTotal, setEditTotal] = useState(false);
  const [totalInput, setTotalInput] = useState(budget.total);
  const [expandedCat, setExpandedCat] = useState(null);
  const totalSpent = budget.categories.reduce((s, c) => s + c.spent, 0);
  const remaining = budget.total - totalSpent;

  const addExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    const amt = parseFloat(newExpense.amount);
    if (isNaN(amt)) return;
    const expense = {
      name: newExpense.name,
      amount: amt,
      date: new Date().toLocaleDateString(),
    };
    setBudget((b) => ({
      ...b,
      categories: b.categories.map((c) =>
        c.id === parseInt(newExpense.category)
          ? {
              ...c,
              spent: c.spent + amt,
              expenses: [...(c.expenses || []), expense],
            }
          : c,
      ),
    }));
    setNewExpense({ name: "", category: newExpense.category, amount: "" });
  };

  return (
    <div>
      <SectionTitle sub={t("bud_sub")}>{t("bud_title")}</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {editTotal ? (
          <Card style={{ textAlign: "center", padding: "18px 16px" }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              {t("bud_total")}
            </div>
            <input
              value={totalInput}
              onChange={(e) => setTotalInput(e.target.value)}
              autoFocus
              type="number"
              style={{
                width: "100%",
                padding: "4px 8px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 500,
                textAlign: "center",
                color: COLORS.ink,
                background: COLORS.white,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <button
                onClick={() => {
                  setBudget((b) => ({
                    ...b,
                    total: parseFloat(totalInput) || b.total,
                  }));
                  setEditTotal(false);
                }}
                style={{
                  padding: "4px 14px",
                  background: COLORS.rose,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                }}
              >
                {t("save")}
              </button>
              <button
                onClick={() => setEditTotal(false)}
                style={{
                  padding: "4px 14px",
                  background: "transparent",
                  color: COLORS.muted,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                }}
              >
                {t("cancel")}
              </button>
            </div>
          </Card>
        ) : (
          <div
            onClick={() => {
              setTotalInput(budget.total);
              setEditTotal(true);
            }}
            title="Click to edit total budget"
            style={{ cursor: "pointer" }}
          >
            <StatCard
              label={t("bud_total")}
              value={`$${budget.total.toLocaleString()}`}
              accent={COLORS.ink}
              sub={t("bud_click_edit")}
            />
          </div>
        )}
        <StatCard
          label={t("bud_total_spent")}
          value={`$${totalSpent.toLocaleString()}`}
          sub={t("ov_pct_of_budget", {
            pct: Math.round((totalSpent / budget.total) * 100),
          })}
          accent={COLORS.rose}
        />
        <StatCard
          label={t("bud_remaining")}
          value={`$${remaining.toLocaleString()}`}
          sub={remaining >= 0 ? t("bud_on_track") : t("bud_over")}
          accent={remaining >= 0 ? COLORS.sage : "#C44"}
        />
      </div>

      <div
        style={{
          background: COLORS.champagneDark,
          borderRadius: 8,
          height: 10,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.round((totalSpent / budget.total) * 100))}%`,
            background: `linear-gradient(90deg, ${COLORS.rose}, ${COLORS.gold})`,
            height: 10,
            borderRadius: 8,
            transition: "width 0.8s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {budget.categories.map((cat) => {
          const pct = Math.min(100, Math.round((cat.spent / cat.budget) * 100));
          const isExpanded = expandedCat === cat.id;
          const catExpenses = cat.expenses || [];
          return (
            <Card key={cat.id} style={{ padding: "16px 20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18,
                      fontWeight: 500,
                      color: COLORS.ink,
                    }}
                  >
                    {cat.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: COLORS.muted,
                    }}
                  >
                    {t("bud_budget_label", { n: cat.budget.toLocaleString() })}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: pct > 90 ? "#C44" : COLORS.ink,
                    }}
                  >
                    ${cat.spent.toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: COLORS.muted,
                    }}
                  >
                    {t("bud_spent")}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: COLORS.champagneDark,
                  borderRadius: 4,
                  height: 6,
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    background: pct > 90 ? "#E06060" : cat.color,
                    height: 6,
                    borderRadius: 4,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: COLORS.muted,
                  }}
                >
                  {t("bud_pct_left", {
                    pct,
                    left: (cat.budget - cat.spent).toLocaleString(),
                  })}
                </div>
                {catExpenses.length > 0 && (
                  <button
                    onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                    style={{
                      padding: "2px 9px",
                      background: isExpanded ? COLORS.roseLight : "transparent",
                      color: COLORS.rose,
                      border: `1px solid ${COLORS.roseMid}`,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    {isExpanded
                      ? t("bud_hide")
                      : `${catExpenses.length} ${catExpenses.length !== 1 ? t("bud_expense_many") : t("bud_expense_one")}`}
                  </button>
                )}
              </div>
              {isExpanded && catExpenses.length > 0 && (
                <div
                  style={{
                    marginTop: 10,
                    borderTop: `1px solid ${COLORS.border}`,
                    paddingTop: 10,
                  }}
                >
                  {catExpenses.map((exp, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: i < catExpenses.length - 1 ? 8 : 0,
                        marginBottom: i < catExpenses.length - 1 ? 8 : 0,
                        borderBottom:
                          i < catExpenses.length - 1
                            ? `1px solid ${COLORS.border}`
                            : "none",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            color: COLORS.ink,
                          }}
                        >
                          {exp.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            color: COLORS.muted,
                          }}
                        >
                          {exp.date}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: COLORS.ink,
                        }}
                      >
                        ${exp.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: COLORS.muted,
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          {t("bud_add_expense")}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr auto",
            gap: 12,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              {t("bud_description")}
            </div>
            <input
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense((n) => ({ ...n, name: e.target.value }))
              }
              placeholder={t("bud_desc_ph")}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                background: COLORS.white,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              {t("bud_category")}
            </div>
            <select
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense((n) => ({ ...n, category: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                background: COLORS.white,
              }}
            >
              {budget.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              {t("bud_amount")}
            </div>
            <input
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense((n) => ({ ...n, amount: e.target.value }))
              }
              placeholder="0.00"
              type="number"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                background: COLORS.white,
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={addExpense}
            style={{
              padding: "8px 20px",
              background: COLORS.rose,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {t("bud_add")}
          </button>
        </div>
      </Card>
    </div>
  );
}

function Venues({ venues, setVenues }) {
  const { t } = useContext(LangContext);
  const [showTrash, setShowTrash] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newVenue, setNewVenue] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    style: "",
    rating: "",
    notes: "",
    image: "🏛",
  });

  const active = venues.filter((v) => !v.deleted);
  const deleted = venues.filter((v) => v.deleted);

  const selectVenue = (id) =>
    setVenues((vs) => vs.map((v) => ({ ...v, selected: v.id === id })));

  const addVenue = async () => {
    if (!newVenue.name) return;
    const item = {
      ...newVenue,
      capacity: parseInt(newVenue.capacity) || 0,
      price: parseFloat(newVenue.price) || 0,
      rating: parseFloat(newVenue.rating) || 0,
      selected: false,
      deleted: false,
    };
    try {
      const saved = await apiPost("venues", item);
      setVenues((vs) => [...vs, saved]);
      setNewVenue({
        name: "",
        location: "",
        capacity: "",
        price: "",
        style: "",
        rating: "",
        notes: "",
        image: "🏛",
      });
      setShowAdd(false);
    } catch (e) {
      console.warn("Failed to add venue", e);
    }
  };

  const deleteVenue = async (id) => {
    try {
      await apiPatch("venues", id, { deleted: true });
      setVenues((vs) =>
        vs.map((v) => (v.id === id ? { ...v, deleted: true } : v)),
      );
    } catch (e) {
      console.warn("Failed to delete venue", e);
    }
  };

  const restoreVenue = async (id) => {
    try {
      await apiPatch("venues", id, { deleted: false });
      setVenues((vs) =>
        vs.map((v) => (v.id === id ? { ...v, deleted: false } : v)),
      );
    } catch (e) {
      console.warn("Failed to restore venue", e);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "7px 10px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    background: COLORS.white,
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  };

  return (
    <div>
      <SectionTitle sub={t("ven_sub")}>{t("ven_title")}</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setShowAdd((s) => !s)}
          style={{
            padding: "7px 16px",
            background: showAdd ? COLORS.roseLight : COLORS.rose,
            color: showAdd ? COLORS.rose : "#fff",
            border: `1px solid ${COLORS.rose}`,
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {t("ven_add")}
        </button>
        <TrashButton
          count={deleted.length}
          onClick={() => setShowTrash((s) => !s)}
          active={showTrash}
        />
      </div>

      {showTrash && (
        <TrashPanel
          items={deleted}
          onRestore={restoreVenue}
          renderItem={(v) => `${v.image || "🏛"} ${v.name} · ${v.location}`}
        />
      )}

      {showAdd && (
        <Card
          style={{
            marginBottom: 16,
            background: COLORS.roseLight,
            border: `1px solid ${COLORS.roseMid}`,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.rose,
              marginBottom: 14,
              fontWeight: 600,
            }}
          >
            {t("ven_new")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <div style={labelStyle}>{t("name")}</div>
              <input
                value={newVenue.name}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, name: e.target.value }))
                }
                placeholder={t("ven_new")}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("location")}</div>
              <input
                value={newVenue.location}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, location: e.target.value }))
                }
                placeholder={t("ven_location_ph")}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("style")}</div>
              <input
                value={newVenue.style}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, style: e.target.value }))
                }
                placeholder={t("ven_style_ph")}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("emoji")}</div>
              <input
                value={newVenue.image}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, image: e.target.value }))
                }
                placeholder="🏛"
                style={{ ...inputStyle, fontSize: 20 }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              gap: 10,
              alignItems: "end",
            }}
          >
            <div>
              <div style={labelStyle}>{t("price")}</div>
              <input
                value={newVenue.price}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, price: e.target.value }))
                }
                placeholder="0"
                type="number"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("capacity")}</div>
              <input
                value={newVenue.capacity}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, capacity: e.target.value }))
                }
                placeholder={t("ven_capacity_ph")}
                type="number"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("rating")}</div>
              <input
                value={newVenue.rating}
                onChange={(e) =>
                  setNewVenue((n) => ({ ...n, rating: e.target.value }))
                }
                placeholder="0.0"
                type="number"
                step="0.1"
                style={inputStyle}
              />
            </div>
            <button
              onClick={addVenue}
              style={{
                padding: "7px 20px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {t("ven_save")}
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={labelStyle}>{t("notes")}</div>
            <input
              value={newVenue.notes}
              onChange={(e) =>
                setNewVenue((n) => ({ ...n, notes: e.target.value }))
              }
              placeholder={t("ven_notes_ph")}
              style={inputStyle}
            />
          </div>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {active.map((v) => (
          <Card
            key={v.id}
            style={{
              border: v.selected
                ? `2px solid ${COLORS.rose}`
                : `1px solid ${COLORS.border}`,
              position: "relative",
            }}
          >
            {v.selected && (
              <div style={{ position: "absolute", top: 16, right: 16 }}>
                <Badge>{t("ven_selected")}</Badge>
              </div>
            )}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 48, lineHeight: 1 }}>{v.image}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    marginBottom: 4,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      fontWeight: 500,
                      color: COLORS.ink,
                      margin: 0,
                    }}
                  >
                    {v.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: COLORS.muted,
                    }}
                  >
                    {v.location}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <Badge color={COLORS.brown} bg={COLORS.champagne}>
                    {v.style}
                  </Badge>
                  <Badge color={COLORS.sage} bg={COLORS.sageLight}>
                    {t("ven_up_to", { n: v.capacity })}
                  </Badge>
                  <Badge color={COLORS.gold} bg={COLORS.goldLight}>
                    ⭐ {v.rating}
                  </Badge>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: COLORS.muted,
                    margin: "0 0 12px",
                    lineHeight: 1.6,
                  }}
                >
                  {v.notes}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 24,
                      fontWeight: 500,
                      color: COLORS.rose,
                    }}
                  >
                    ${v.price.toLocaleString()}
                  </span>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    {!v.selected && (
                      <button
                        onClick={() => selectVenue(v.id)}
                        style={{
                          padding: "8px 20px",
                          background: "transparent",
                          color: COLORS.rose,
                          border: `1px solid ${COLORS.rose}`,
                          borderRadius: 10,
                          cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                        }}
                      >
                        {t("ven_select")}
                      </button>
                    )}
                    <button
                      onClick={() => deleteVenue(v.id)}
                      title={t("ven_delete")}
                      style={{
                        background: "none",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        color: COLORS.muted,
                        cursor: "pointer",
                        fontSize: 15,
                        padding: "6px 10px",
                        lineHeight: 1,
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Photographers({ photographers, setPhotographers }) {
  const { t } = useContext(LangContext);
  const [showTrash, setShowTrash] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    name: "",
    style: "",
    price: "",
    hours: "",
    rating: "",
    specialties: "",
    image: "📷",
  });

  const active = photographers.filter((p) => !p.deleted);
  const deleted = photographers.filter((p) => p.deleted);

  const select = (id) =>
    setPhotographers((ps) => ps.map((p) => ({ ...p, selected: p.id === id })));

  const addPhotographer = async () => {
    if (!newPhoto.name) return;
    const item = {
      name: newPhoto.name,
      style: newPhoto.style,
      price: parseFloat(newPhoto.price) || 0,
      hours: parseInt(newPhoto.hours) || 0,
      rating: parseFloat(newPhoto.rating) || 0,
      specialties: newPhoto.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: newPhoto.image || "📷",
      selected: false,
      deleted: false,
    };
    try {
      const saved = await apiPost("photographers", item);
      setPhotographers((ps) => [...ps, saved]);
      setNewPhoto({
        name: "",
        style: "",
        price: "",
        hours: "",
        rating: "",
        specialties: "",
        image: "📷",
      });
      setShowAdd(false);
    } catch (e) {
      console.warn("Failed to add photographer", e);
    }
  };

  const deletePhotographer = async (id) => {
    try {
      await apiPatch("photographers", id, { deleted: true });
      setPhotographers((ps) =>
        ps.map((p) => (p.id === id ? { ...p, deleted: true } : p)),
      );
    } catch (e) {
      console.warn("Failed to delete photographer", e);
    }
  };

  const restorePhotographer = async (id) => {
    try {
      await apiPatch("photographers", id, { deleted: false });
      setPhotographers((ps) =>
        ps.map((p) => (p.id === id ? { ...p, deleted: false } : p)),
      );
    } catch (e) {
      console.warn("Failed to restore photographer", e);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "7px 10px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    background: COLORS.white,
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  };

  return (
    <div>
      <SectionTitle sub={t("pho_sub")}>{t("pho_title")}</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setShowAdd((s) => !s)}
          style={{
            padding: "7px 16px",
            background: showAdd ? COLORS.roseLight : COLORS.rose,
            color: showAdd ? COLORS.rose : "#fff",
            border: `1px solid ${COLORS.rose}`,
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {t("pho_add")}
        </button>
        <TrashButton
          count={deleted.length}
          onClick={() => setShowTrash((s) => !s)}
          active={showTrash}
        />
      </div>

      {showTrash && (
        <TrashPanel
          items={deleted}
          onRestore={restorePhotographer}
          renderItem={(p) => `${p.image || "📷"} ${p.name} · ${p.style}`}
        />
      )}

      {showAdd && (
        <Card
          style={{
            marginBottom: 16,
            background: COLORS.roseLight,
            border: `1px solid ${COLORS.roseMid}`,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.rose,
              marginBottom: 14,
              fontWeight: 600,
            }}
          >
            {t("pho_new")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <div style={labelStyle}>{t("name")}</div>
              <input
                value={newPhoto.name}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, name: e.target.value }))
                }
                placeholder={t("pho_new")}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("style")}</div>
              <input
                value={newPhoto.style}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, style: e.target.value }))
                }
                placeholder={t("pho_style_ph")}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("price")}</div>
              <input
                value={newPhoto.price}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, price: e.target.value }))
                }
                placeholder="0"
                type="number"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("emoji")}</div>
              <input
                value={newPhoto.image}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, image: e.target.value }))
                }
                placeholder="📷"
                style={{ ...inputStyle, fontSize: 20 }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 2fr auto",
              gap: 10,
              alignItems: "end",
            }}
          >
            <div>
              <div style={labelStyle}>{t("hours")}</div>
              <input
                value={newPhoto.hours}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, hours: e.target.value }))
                }
                placeholder="hrs"
                type="number"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("rating")}</div>
              <input
                value={newPhoto.rating}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, rating: e.target.value }))
                }
                placeholder="0.0"
                type="number"
                step="0.1"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>{t("pho_specialties")}</div>
              <input
                value={newPhoto.specialties}
                onChange={(e) =>
                  setNewPhoto((n) => ({ ...n, specialties: e.target.value }))
                }
                placeholder={t("pho_specialties_ph")}
                style={inputStyle}
              />
            </div>
            <button
              onClick={addPhotographer}
              style={{
                padding: "7px 20px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {t("pho_save")}
            </button>
          </div>
        </Card>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        {active.map((p) => (
          <Card
            key={p.id}
            style={{
              border: p.selected
                ? `2px solid ${COLORS.rose}`
                : `1px solid ${COLORS.border}`,
              position: "relative",
            }}
          >
            {p.selected && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <Badge>{t("pho_chosen")}</Badge>
              </div>
            )}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{p.image}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.ink,
                  margin: "0 0 4px",
                }}
              >
                {p.name}
              </h3>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: COLORS.muted,
                }}
              >
                {p.style}
              </div>
            </div>
            <div
              style={{
                borderTop: `1px solid ${COLORS.border}`,
                paddingTop: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  {t("pho_package")}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.ink,
                  }}
                >
                  ${p.price.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  {t("hours")}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.ink,
                  }}
                >
                  {t("pho_hrs", { n: p.hours })}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  {t("rating")}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.gold,
                  }}
                >
                  ⭐ {p.rating}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginBottom: 14,
              }}
            >
              {(p.specialties || []).map((s) => (
                <Badge key={s} color={COLORS.muted} bg={COLORS.bg}>
                  {s}
                </Badge>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => select(p.id)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: p.selected ? COLORS.roseLight : "transparent",
                  color: COLORS.rose,
                  border: `1px solid ${COLORS.rose}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                }}
              >
                {p.selected ? t("pho_selected") : t("pho_select")}
              </button>
              <button
                onClick={() => deletePhotographer(p.id)}
                title={t("pho_delete")}
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  color: COLORS.muted,
                  cursor: "pointer",
                  fontSize: 15,
                  padding: "6px 10px",
                  lineHeight: 1,
                }}
              >
                🗑
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Guests({ guests, setGuests }) {
  const { t } = useContext(LangContext);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    group: "Friend",
    rsvp: "pending",
    dietary: "None",
    plusOne: false,
  });

  const activeGuests = guests.filter((g) => !g.deleted);
  const deletedGuests = guests.filter((g) => g.deleted);

  const filtered = activeGuests.filter((g) => {
    const matchFilter = filter === "all" || g.rsvp === filter;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const addGuest = () => {
    if (!newGuest.name) return;
    setGuests((gs) => [
      ...gs,
      { ...newGuest, id: Date.now(), table: null, deleted: false },
    ]);
    setNewGuest({
      name: "",
      group: "Friend",
      rsvp: "pending",
      dietary: "None",
      plusOne: false,
    });
    setShowAdd(false);
  };

  const deleteGuest = async (id) => {
    try {
      await apiPatch("guests", id, { deleted: true });
      setGuests((gs) =>
        gs.map((g) => (g.id === id ? { ...g, deleted: true } : g)),
      );
    } catch (e) {
      console.warn("Failed to delete guest", e);
    }
  };

  const restoreGuest = async (id) => {
    try {
      await apiPatch("guests", id, { deleted: false });
      setGuests((gs) =>
        gs.map((g) => (g.id === id ? { ...g, deleted: false } : g)),
      );
    } catch (e) {
      console.warn("Failed to restore guest", e);
    }
  };

  const updateRsvp = (id, rsvp) =>
    setGuests((gs) => gs.map((g) => (g.id === id ? { ...g, rsvp } : g)));

  const confirmed = activeGuests.filter((g) => g.rsvp === "confirmed").length;
  const pending = activeGuests.filter((g) => g.rsvp === "pending").length;
  const declined = activeGuests.filter((g) => g.rsvp === "declined").length;

  const rsvpColors = {
    confirmed: { color: COLORS.sage, bg: COLORS.sageLight },
    pending: { color: COLORS.gold, bg: COLORS.goldLight },
    declined: { color: COLORS.rose, bg: COLORS.roseLight },
  };

  return (
    <div>
      <SectionTitle sub={t("gue_sub")}>{t("gue_title")}</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <TrashButton
          count={deletedGuests.length}
          onClick={() => setShowTrash((s) => !s)}
          active={showTrash}
        />
      </div>

      {showTrash && (
        <TrashPanel
          items={deletedGuests}
          onRestore={restoreGuest}
          renderItem={(g) => `${g.name} · ${g.group}`}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <StatCard
          label={t("gue_total")}
          value={activeGuests.length}
          accent={COLORS.ink}
        />
        <StatCard
          label={t("gue_confirmed")}
          value={confirmed}
          accent={COLORS.sage}
        />
        <StatCard
          label={t("gue_pending")}
          value={pending}
          accent={COLORS.gold}
        />
        <StatCard
          label={t("gue_declined")}
          value={declined}
          accent={COLORS.rose}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("gue_search")}
          style={{
            padding: "8px 14px",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            background: COLORS.white,
            flex: 1,
            minWidth: 200,
          }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["all", t("all")],
            ["confirmed", t("gue_confirmed")],
            ["pending", t("gue_pending")],
            ["declined", t("gue_declined")],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                padding: "6px 14px",
                background: filter === val ? COLORS.rose : "transparent",
                color: filter === val ? "#fff" : COLORS.muted,
                border: `1px solid ${filter === val ? COLORS.rose : COLORS.border}`,
                borderRadius: 20,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAdd((s) => !s)}
          style={{
            padding: "8px 16px",
            background: COLORS.rose,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          {t("gue_add")}
        </button>
      </div>

      {showAdd && (
        <Card
          style={{
            marginBottom: 16,
            background: COLORS.roseLight,
            border: `1px solid ${COLORS.roseMid}`,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: COLORS.rose,
              marginBottom: 12,
            }}
          >
            {t("gue_new")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <input
              value={newGuest.name}
              onChange={(e) =>
                setNewGuest((g) => ({ ...g, name: e.target.value }))
              }
              placeholder={t("gue_name_ph")}
              style={{
                padding: "7px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            />
            <select
              value={newGuest.group}
              onChange={(e) =>
                setNewGuest((g) => ({ ...g, group: e.target.value }))
              }
              style={{
                padding: "7px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            >
              {[
                ["Family", t("grp_family")],
                ["Friend", t("grp_friend")],
                ["Colleague", t("grp_colleague")],
                ["Partner's Family", t("grp_partners_family")],
                ["Partner's Friend", t("grp_partners_friend")],
              ].map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            <select
              value={newGuest.dietary}
              onChange={(e) =>
                setNewGuest((g) => ({ ...g, dietary: e.target.value }))
              }
              style={{
                padding: "7px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            >
              {[
                ["None", t("diet_none")],
                ["Vegetarian", t("diet_vegetarian")],
                ["Vegan", t("diet_vegan")],
                ["Gluten-free", t("diet_gluten")],
                ["Low-sodium", t("diet_sodium")],
                ["Kosher", t("diet_kosher")],
                ["Halal", t("diet_halal")],
              ].map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            <button
              onClick={addGuest}
              style={{
                padding: "7px 16px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {t("gue_add_btn")}
            </button>
          </div>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.champagne }}>
              {[
                t("gue_col_name"),
                t("gue_col_group"),
                t("gue_col_rsvp"),
                t("gue_col_dietary"),
                t("gue_col_table"),
                "",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: COLORS.muted,
                    textAlign: "left",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr
                key={g.id}
                style={{
                  background: i % 2 === 0 ? COLORS.white : COLORS.bg,
                  transition: "background 0.15s",
                }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: COLORS.ink,
                  }}
                >
                  {g.name}
                  {g.plusOne && (
                    <span
                      style={{
                        fontSize: 11,
                        color: COLORS.muted,
                        marginLeft: 6,
                      }}
                    >
                      +1
                    </span>
                  )}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <Badge color={COLORS.brown} bg={COLORS.champagne}>
                    {g.group}
                  </Badge>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <select
                    value={g.rsvp}
                    onChange={(e) => updateRsvp(g.id, e.target.value)}
                    style={{
                      padding: "3px 8px",
                      border: `1px solid ${rsvpColors[g.rsvp].color}`,
                      borderRadius: 6,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      background: rsvpColors[g.rsvp].bg,
                      color: rsvpColors[g.rsvp].color,
                      cursor: "pointer",
                    }}
                  >
                    <option value="confirmed">{t("gue_confirmed_opt")}</option>
                    <option value="pending">{t("gue_pending_opt")}</option>
                    <option value="declined">{t("gue_declined_opt")}</option>
                  </select>
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: g.dietary !== "None" ? COLORS.sage : COLORS.muted,
                  }}
                >
                  {g.dietary}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: g.table ? COLORS.ink : COLORS.muted,
                  }}
                >
                  {g.table ? t("gue_table_n", { n: g.table }) : "—"}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <button
                    onClick={() => deleteGuest(g.id)}
                    title={t("gue_delete")}
                    style={{
                      background: "none",
                      border: "none",
                      color: COLORS.muted,
                      cursor: "pointer",
                      fontSize: 15,
                      padding: "0 4px",
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: COLORS.muted,
            }}
          >
            {t("gue_no_found")}
          </div>
        )}
      </Card>
    </div>
  );
}

function Tables({ guests, setGuests, tables, setTables }) {
  const { t } = useContext(LangContext);
  const [newTable, setNewTable] = useState({ name: "", capacity: 8 });
  const [assignGuest, setAssignGuest] = useState({ guestId: "", tableId: "" });

  const unassigned = guests.filter((g) => !g.table && g.rsvp !== "declined");

  const assignToTable = () => {
    if (!assignGuest.guestId || !assignGuest.tableId) return;
    setGuests((gs) =>
      gs.map((g) =>
        g.id === parseInt(assignGuest.guestId)
          ? { ...g, table: parseInt(assignGuest.tableId) }
          : g,
      ),
    );
    setAssignGuest({ guestId: "", tableId: "" });
  };

  const removeFromTable = (guestId) =>
    setGuests((gs) =>
      gs.map((g) => (g.id === guestId ? { ...g, table: null } : g)),
    );

  const addTable = () => {
    if (!newTable.name) return;
    setTables((ts) => [
      ...ts,
      {
        id: Date.now(),
        name: newTable.name,
        capacity: parseInt(newTable.capacity) || 8,
        shape: "round",
      },
    ]);
    setNewTable({ name: "", capacity: 8 });
  };

  return (
    <div>
      <SectionTitle sub={t("tbl_sub")}>{t("tbl_title")}</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card
          style={{
            background: COLORS.champagne,
            border: `1px solid ${COLORS.champagneDark}`,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {t("tbl_assign")}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select
              value={assignGuest.guestId}
              onChange={(e) =>
                setAssignGuest((a) => ({ ...a, guestId: e.target.value }))
              }
              style={{
                flex: 1,
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            >
              <option value="">{t("tbl_select_guest")}</option>
              {unassigned.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <select
              value={assignGuest.tableId}
              onChange={(e) =>
                setAssignGuest((a) => ({ ...a, tableId: e.target.value }))
              }
              style={{
                flex: 1,
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            >
              <option value="">{t("tbl_select_table")}</option>
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <button
              onClick={assignToTable}
              style={{
                padding: "8px 16px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {t("tbl_assign_btn")}
            </button>
          </div>
          {unassigned.length > 0 && (
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                marginTop: 10,
              }}
            >
              {t("tbl_not_seated", { n: unassigned.length })}
            </div>
          )}
        </Card>

        <Card
          style={{
            background: COLORS.champagne,
            border: `1px solid ${COLORS.champagneDark}`,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: COLORS.muted,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {t("tbl_add_new")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={newTable.name}
              onChange={(e) =>
                setNewTable((t) => ({ ...t, name: e.target.value }))
              }
              placeholder={t("tbl_name_ph")}
              style={{
                flex: 2,
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            />
            <input
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable((t) => ({ ...t, capacity: e.target.value }))
              }
              type="number"
              placeholder={t("tbl_seats_ph")}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            />
            <button
              onClick={addTable}
              style={{
                padding: "8px 14px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {t("tbl_add_btn")}
            </button>
          </div>
        </Card>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {tables.map((tbl) => {
          const tableGuests = guests.filter((g) => g.table === tbl.id);
          const occupancy = tableGuests.length;
          const full = occupancy >= tbl.capacity;
          return (
            <Card
              key={tbl.id}
              style={{
                border: full
                  ? `1.5px solid ${COLORS.rose}`
                  : `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 500,
                      color: COLORS.ink,
                      margin: 0,
                    }}
                  >
                    {tbl.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: COLORS.muted,
                    }}
                  >
                    {t("tbl_capacity", { n: tbl.capacity })}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 24,
                    fontWeight: 500,
                    color: full ? COLORS.rose : COLORS.sage,
                  }}
                >
                  {occupancy}/{tbl.capacity}
                </div>
              </div>
              <div
                style={{
                  background: COLORS.champagneDark,
                  borderRadius: 4,
                  height: 6,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: `${Math.round((occupancy / tbl.capacity) * 100)}%`,
                    background: full ? COLORS.rose : COLORS.sage,
                    height: 6,
                    borderRadius: 4,
                  }}
                />
              </div>
              {tableGuests.length > 0 ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  {tableGuests.map((g) => (
                    <div
                      key={g.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "4px 0",
                        borderBottom: `1px solid ${COLORS.border}`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          color: COLORS.ink,
                        }}
                      >
                        {g.name}
                      </span>
                      <button
                        onClick={() => removeFromTable(g.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: COLORS.muted,
                          cursor: "pointer",
                          fontSize: 14,
                          padding: "0 2px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                    textAlign: "center",
                    padding: "8px 0",
                  }}
                >
                  {t("tbl_empty")}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Checklist({ checklist, setChecklist }) {
  const { t } = useContext(LangContext);
  const [newTask, setNewTask] = useState({
    task: "",
    category: "Planning",
    priority: "medium",
  });
  const [filterCat, setFilterCat] = useState("all");
  const [showTrash, setShowTrash] = useState(false);

  const activeChecklist = checklist.filter((t) => !t.deleted);
  const deletedTasks = checklist.filter((t) => t.deleted);
  const categories = [...new Set(activeChecklist.map((t) => t.category))];

  const toggle = (id) =>
    setChecklist((cl) =>
      cl.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const deleteTask = async (id) => {
    try {
      await apiPatch("checklist", id, { deleted: true });
      setChecklist((cl) =>
        cl.map((t) => (t.id === id ? { ...t, deleted: true } : t)),
      );
    } catch (e) {
      console.warn("Failed to delete task", e);
    }
  };

  const restoreTask = async (id) => {
    try {
      await apiPatch("checklist", id, { deleted: false });
      setChecklist((cl) =>
        cl.map((t) => (t.id === id ? { ...t, deleted: false } : t)),
      );
    } catch (e) {
      console.warn("Failed to restore task", e);
    }
  };

  const addTask = () => {
    if (!newTask.task) return;
    setChecklist((cl) => [
      ...cl,
      { ...newTask, id: Date.now(), done: false, dueMonths: 3, deleted: false },
    ]);
    setNewTask({ task: "", category: "Planning", priority: "medium" });
  };

  const filtered = activeChecklist.filter(
    (item) => filterCat === "all" || item.category === filterCat,
  );
  const done = activeChecklist.filter((item) => item.done).length;

  const priorityColors = {
    high: { color: "#B05050", bg: "#FAE8E8" },
    medium: { color: COLORS.gold, bg: COLORS.goldLight },
    low: { color: COLORS.sage, bg: COLORS.sageLight },
  };

  return (
    <div>
      <SectionTitle sub={t("chk_sub")}>{t("chk_title")}</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <TrashButton
          count={deletedTasks.length}
          onClick={() => setShowTrash((s) => !s)}
          active={showTrash}
        />
      </div>

      {showTrash && (
        <TrashPanel
          items={deletedTasks}
          onRestore={restoreTask}
          renderItem={(t) => `${t.task} · ${t.category}`}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <StatCard
          label={t("chk_completed")}
          value={done}
          sub={t("chk_of_tasks", { n: activeChecklist.length })}
          accent={COLORS.sage}
        />
        <StatCard
          label={t("chk_remaining")}
          value={activeChecklist.length - done}
          accent={COLORS.rose}
        />
        <StatCard
          label={t("chk_progress")}
          value={`${Math.round((done / Math.max(1, activeChecklist.length)) * 100)}%`}
          accent={COLORS.gold}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            style={{
              padding: "5px 12px",
              background: filterCat === cat ? COLORS.rose : "transparent",
              color: filterCat === cat ? "#fff" : COLORS.muted,
              border: `1px solid ${filterCat === cat ? COLORS.rose : COLORS.border}`,
              borderRadius: 20,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              textTransform: "capitalize",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <Card
        style={{
          marginBottom: 16,
          background: COLORS.roseLight,
          border: `1px solid ${COLORS.roseMid}`,
          padding: "14px 18px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr auto",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            value={newTask.task}
            onChange={(e) =>
              setNewTask((t) => ({ ...t, task: e.target.value }))
            }
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder={t("chk_add_ph")}
            style={{
              padding: "7px 12px",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              background: COLORS.white,
            }}
          />
          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask((t) => ({ ...t, category: e.target.value }))
            }
            style={{
              padding: "7px 10px",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              background: COLORS.white,
            }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option value="Planning">Planning</option>
          </select>
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask((t) => ({ ...t, priority: e.target.value }))
            }
            style={{
              padding: "7px 10px",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              background: COLORS.white,
            }}
          >
            <option value="high">{t("chk_high")}</option>
            <option value="medium">{t("chk_medium")}</option>
            <option value="low">{t("chk_low")}</option>
          </select>
          <button
            onClick={addTask}
            style={{
              padding: "7px 16px",
              background: COLORS.rose,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}
          >
            {t("chk_add_btn")}
          </button>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map((task) => (
          <Card
            key={task.id}
            style={{
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: task.done ? 0.7 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggle(task.id)}
              style={{
                width: 18,
                height: 18,
                accentColor: COLORS.rose,
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: COLORS.ink,
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.task}
              </span>
            </div>
            <Badge
              color={priorityColors[task.priority].color}
              bg={priorityColors[task.priority].bg}
            >
              {{
                high: t("chk_high"),
                medium: t("chk_medium"),
                low: t("chk_low"),
              }[task.priority] ?? task.priority}
            </Badge>
            <Badge color={COLORS.brown} bg={COLORS.champagne}>
              {task.category}
            </Badge>
            <button
              onClick={() => deleteTask(task.id)}
              title={t("trash_view")}
              style={{
                background: "none",
                border: "none",
                color: COLORS.muted,
                cursor: "pointer",
                fontSize: 15,
                padding: "0 4px",
                flexShrink: 0,
              }}
            >
              🗑
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Vendors({ vendors, setVendors }) {
  const { t } = useContext(LangContext);
  const [showAdd, setShowAdd] = useState(false);
  const [newVendor, setNewVendor] = useState({
    type: "Florist",
    name: "",
    contact: "",
    phone: "",
    price: "",
    status: "pending",
    notes: "",
  });

  const addVendor = () => {
    if (!newVendor.name) return;
    setVendors((vs) => [
      ...vs,
      { ...newVendor, id: Date.now(), price: parseFloat(newVendor.price) || 0 },
    ]);
    setNewVendor({
      type: "Florist",
      name: "",
      contact: "",
      phone: "",
      price: "",
      status: "pending",
      notes: "",
    });
    setShowAdd(false);
  };

  const removeVendor = (id) =>
    setVendors((vs) => vs.filter((v) => v.id !== id));
  const statusColors = {
    booked: { color: COLORS.sage, bg: COLORS.sageLight },
    pending: { color: COLORS.gold, bg: COLORS.goldLight },
    cancelled: { color: COLORS.rose, bg: COLORS.roseLight },
  };

  const totalVendorCost = vendors.reduce((s, v) => s + (v.price || 0), 0);

  return (
    <div>
      <SectionTitle sub={t("vnd_sub")}>{t("vnd_title")}</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <StatCard
          label={t("vnd_total")}
          value={vendors.length}
          accent={COLORS.ink}
        />
        <StatCard
          label={t("vnd_booked")}
          value={vendors.filter((v) => v.status === "booked").length}
          accent={COLORS.sage}
        />
        <StatCard
          label={t("vnd_total_cost")}
          value={`$${totalVendorCost.toLocaleString()}`}
          accent={COLORS.rose}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => setShowAdd((s) => !s)}
          style={{
            padding: "8px 16px",
            background: COLORS.rose,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          {t("vnd_add")}
        </button>
      </div>

      {showAdd && (
        <Card
          style={{
            marginBottom: 16,
            background: COLORS.roseLight,
            border: `1px solid ${COLORS.roseMid}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("type")}
              </div>
              <select
                value={newVendor.type}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, type: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                }}
              >
                {[
                  ["Catering", t("vtype_catering")],
                  ["Florist", t("vtype_florist")],
                  ["Music / DJ", t("vtype_music")],
                  ["Hair & Makeup", t("vtype_hair")],
                  ["Wedding Cake", t("vtype_cake")],
                  ["Transportation", t("vtype_transport")],
                  ["Officiant", t("vtype_officiant")],
                  ["Lighting", t("vtype_lighting")],
                  ["Rentals", t("vtype_rentals")],
                  ["Other", t("vtype_other")],
                ].map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("vnd_business_name")}
              </div>
              <input
                value={newVendor.name}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, name: e.target.value }))
                }
                placeholder={t("vnd_name_ph")}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("email")}
              </div>
              <input
                value={newVendor.contact}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, contact: e.target.value }))
                }
                placeholder="email@vendor.com"
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("phone")}
              </div>
              <input
                value={newVendor.phone}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, phone: e.target.value }))
                }
                placeholder="+1 555 0000"
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("vnd_cost")}
              </div>
              <input
                value={newVendor.price}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, price: e.target.value }))
                }
                type="number"
                placeholder="0"
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 4,
                }}
              >
                {t("status")}
              </div>
              <select
                value={newVendor.status}
                onChange={(e) =>
                  setNewVendor((v) => ({ ...v, status: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  background: COLORS.white,
                }}
              >
                <option value="pending">{t("vnd_pending")}</option>
                <option value="booked">{t("vnd_booked_s")}</option>
                <option value="cancelled">{t("vnd_cancelled")}</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={newVendor.notes}
              onChange={(e) =>
                setNewVendor((v) => ({ ...v, notes: e.target.value }))
              }
              placeholder={t("vnd_notes_ph")}
              style={{
                flex: 1,
                padding: "7px 10px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                background: COLORS.white,
              }}
            />
            <button
              onClick={addVendor}
              style={{
                padding: "7px 20px",
                background: COLORS.rose,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            >
              {t("vnd_save")}
            </button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {vendors.map((v) => (
          <Card
            key={v.id}
            style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Badge color={COLORS.brown} bg={COLORS.champagne}>
                  {v.type}
                </Badge>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20,
                    fontWeight: 500,
                    color: COLORS.ink,
                    margin: 0,
                  }}
                >
                  {v.name}
                </h3>
                <Badge
                  color={statusColors[v.status].color}
                  bg={statusColors[v.status].bg}
                >
                  {{
                    booked: t("vnd_booked_s"),
                    pending: t("vnd_pending"),
                    cancelled: t("vnd_cancelled"),
                  }[v.status] ?? v.status}
                </Badge>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  ✉ {v.contact}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: COLORS.muted,
                  }}
                >
                  📞 {v.phone}
                </span>
                {v.notes && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: COLORS.muted,
                    }}
                  >
                    💬 {v.notes}
                  </span>
                )}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: COLORS.rose,
                }}
              >
                ${v.price.toLocaleString()}
              </div>
              <button
                onClick={() => removeVendor(v.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.muted,
                  cursor: "pointer",
                  fontSize: 13,
                  padding: "4px 0",
                }}
              >
                {t("vnd_remove")}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  const { t, lang, setLang } = useContext(LangContext);
  return (
    <div>
      <SectionTitle sub={t("set_sub")}>{t("set_title")}</SectionTitle>
      <Card style={{ maxWidth: 480 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 500,
            color: COLORS.ink,
            marginBottom: 4,
          }}
        >
          {t("set_language")}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: COLORS.muted,
            marginBottom: 20,
          }}
        >
          {t("set_language_sub")}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { value: "en", label: t("set_lang_en"), flag: "🇬🇧" },
            { value: "el", label: t("set_lang_el"), flag: "🇬🇷" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setLang(opt.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: lang === opt.value ? COLORS.rose : "transparent",
                color: lang === opt.value ? "#fff" : COLORS.muted,
                border: `1.5px solid ${lang === opt.value ? COLORS.rose : COLORS.border}`,
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: lang === opt.value ? 500 : 400,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 20 }}>{opt.flag}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

const NAV_ITEMS_BASE = [
  { id: "overview", label: "Overview", icon: "🌸" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "venues", label: "Venues", icon: "🏛" },
  { id: "photographers", label: "Photographers", icon: "📷" },
  { id: "guests", label: "Guests", icon: "👥" },
  { id: "tables", label: "Seating", icon: "🪑" },
  { id: "checklist", label: "Checklist", icon: "✅" },
  { id: "vendors", label: "Vendors", icon: "🎀" },
];

const SETTINGS_NAV_ITEM = { id: "settings", label: "Settings", icon: "⚙️" };

export default function WeddingPlanner() {
  const [activeTab, setActiveTab] = useState("overview");
  const [venues, setVenues] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [budget, setBudget] = useState({ total: 0, categories: [] });
  const [guests, setGuests] = useState([]);
  const [tables, setTables] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [navItems, setNavItems] = useState([
    ...NAV_ITEMS_BASE,
    SETTINGS_NAV_ITEM,
  ]);
  const [lang, setLangState] = useState(
    () =>
      (typeof localStorage !== "undefined" &&
        localStorage.getItem("wp_lang")) ||
      "en",
  );

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("wp_lang", newLang);
    } catch (_) {}
    try {
      if (typeof window !== "undefined" && window.DataStore) {
        const currentMeta = window.DataStore.get("meta") || {};
        window.DataStore.saveCollection("meta", {
          ...currentMeta,
          lang: newLang,
        });
      }
    } catch (_) {}
  };

  const t = (key, vars = {}) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const str = dict[key] ?? TRANSLATIONS.en[key] ?? key;
    return Object.entries(vars).reduce(
      (s, [k, v]) => s.replace(`{${k}}`, String(v)),
      str,
    );
  };

  const ctxValue = { t, lang, setLang };

  const navLabelKeys = {
    overview: "nav_overview",
    budget: "nav_budget",
    venues: "nav_venues",
    photographers: "nav_photographers",
    guests: "nav_guests",
    tables: "nav_seating",
    checklist: "nav_checklist",
    vendors: "nav_vendors",
    settings: "nav_settings",
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = fonts;
    document.head.appendChild(style);

    if (
      typeof window !== "undefined" &&
      window.DataStore &&
      window.DataStore.loadAll
    ) {
      window.DataStore.loadAll()
        .then((data) => {
          if (!data) return;
          setVenues(data.venues || []);
          setPhotographers(data.photographers || []);
          setBudget(data.budget || { total: 0, categories: [] });
          setGuests(data.guests || []);
          setTables(data.tables || []);
          setChecklist(data.checklist || []);
          setVendors(data.vendors || []);
          setNavItems([...(data.nav || NAV_ITEMS_BASE), SETTINGS_NAV_ITEM]);
          if (data.meta && data.meta.lang) {
            setLangState(data.meta.lang);
            try {
              localStorage.setItem("wp_lang", data.meta.lang);
            } catch (_) {}
          }
        })
        .catch((e) => console.warn("DataStore.loadAll failed", e));
    }

    return () => document.head.removeChild(style);
  }, []);

  // Persisting setters: update state then send the full collection to the server
  const createPersistSetter = (key, setter) => (updater) => {
    setter((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        if (
          typeof window !== "undefined" &&
          window.DataStore &&
          window.DataStore.saveCollection
        ) {
          // send the updated collection payload so server writes the correct content
          try {
            window.DataStore.saveCollection(key, next).catch((e) =>
              console.warn("saveCollection failed", key, e),
            );
          } catch (e) {}
          if (window.DataStore.loadCollection)
            window.DataStore.loadCollection(key).catch(() => {});
        }
      } catch (e) {
        console.warn("Failed to persist", key, e);
      }
      return next;
    });
  };

  const setVenuesPersist = createPersistSetter("venues", setVenues);
  const setPhotographersPersist = createPersistSetter(
    "photographers",
    setPhotographers,
  );
  const setBudgetPersist = createPersistSetter("budget", setBudget);
  const setGuestsPersist = createPersistSetter("guests", setGuests);
  const setTablesPersist = createPersistSetter("tables", setTables);
  const setChecklistPersist = createPersistSetter("checklist", setChecklist);
  const setVendorsPersist = createPersistSetter("vendors", setVendors);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Overview
            budget={budget}
            guests={guests}
            checklist={checklist}
            venues={venues}
            photographers={photographers}
          />
        );
      case "budget":
        return <Budget budget={budget} setBudget={setBudgetPersist} />;
      case "venues":
        return <Venues venues={venues} setVenues={setVenuesPersist} />;
      case "photographers":
        return (
          <Photographers
            photographers={photographers}
            setPhotographers={setPhotographersPersist}
          />
        );
      case "guests":
        return <Guests guests={guests} setGuests={setGuestsPersist} />;
      case "tables":
        return (
          <Tables
            guests={guests}
            setGuests={setGuestsPersist}
            tables={tables}
            setTables={setTablesPersist}
          />
        );
      case "checklist":
        return (
          <Checklist checklist={checklist} setChecklist={setChecklistPersist} />
        );
      case "vendors":
        return <Vendors vendors={vendors} setVendors={setVendorsPersist} />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <LangContext.Provider value={ctxValue}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: COLORS.bg,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            width: 220,
            background: COLORS.white,
            borderRight: `1px solid ${COLORS.border}`,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "28px 20px 20px",
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                color: COLORS.rose,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              {t("app_title")}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 500,
                color: COLORS.ink,
              }}
            >
              Emma & James
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.muted,
                marginTop: 2,
              }}
            >
              {getWeddingDateString(lang)} · {getDaysUntil()} {t("days")}
            </div>
          </div>
          <nav style={{ padding: "12px 12px", flex: 1 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  background:
                    activeTab === item.id ? COLORS.roseLight : "transparent",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 2,
                  textAlign: "left",
                  color: activeTab === item.id ? COLORS.rose : COLORS.muted,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: activeTab === item.id ? 500 : 400,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {navLabelKeys[item.id] ? t(navLabelKeys[item.id]) : item.label}
              </button>
            ))}
          </nav>
          <div
            style={{
              padding: "16px 20px",
              borderTop: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                color: COLORS.muted,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {t("app_tagline")}
            </div>
          </div>
        </div>

        <main
          style={{
            flex: 1,
            padding: "36px 40px",
            overflowY: "auto",
            maxWidth: 900,
          }}
        >
          {renderContent()}
        </main>
      </div>
    </LangContext.Provider>
  );
}
