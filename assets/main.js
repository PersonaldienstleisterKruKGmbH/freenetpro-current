/* Static Hostinger fallback: keeps the exported site interactive without Next/Vinext. */
(function () {
  "use strict";

  function route(key, fallback) {
    return (window.FREENET_ROUTES && window.FREENET_ROUTES[key]) || fallback;
  }

  var slides = [
    { eyebrow: "Web development + organic growth", quote: "A strong website should make your business easier to understand, easier to trust, and easier to choose.", detail: "We combine web development, e-commerce, SEO, maintenance, and managed hosting into one dependable partnership.", author: "Freenet Pro", role: "Independent digital studio", lineOne: "Websites Built", lineTwo: "For Business Growth", routeKey: "contact", fallback: "/contact/", cta: "Let’s connect" },
    { eyebrow: "Small business website design", quote: "Clear positioning turns a website from an online brochure into a practical sales tool.", detail: "Strategy, responsive design, WordPress development, and conversion paths shaped around the way U.S. customers make decisions.", author: "From $1,800", role: "Preliminary project range", lineOne: "Small Business Sites", lineTwo: "Made To Be Chosen", routeKey: "solution-small-business", fallback: "/web-development/small-business-website-design/", cta: "Explore the service" },
    { eyebrow: "SEO in the foundation", quote: "Search visibility works better when structure and content are planned before the website goes live.", detail: "Keyword-to-page mapping, technical SEO, service architecture, internal links, and useful content connected to commercial intent.", author: "Research-led SEO", role: "Built for the U.S. market", lineOne: "Search Visibility", lineTwo: "Built Into Structure", routeKey: "service-seo", fallback: "/services/small-business-seo/", cta: "See SEO services" },
    { eyebrow: "E-commerce development", quote: "A strong store makes discovery, checkout, payment, and fulfillment feel like one continuous experience.", detail: "WooCommerce architecture, mobile product UX, Stripe or Square, shipping workflows, analytics, and ongoing technical care.", author: "From $4,000", role: "Preliminary project range", lineOne: "Online Stores", lineTwo: "Designed To Convert", routeKey: "solution-ecommerce", fallback: "/web-development/ecommerce-website-development/", cta: "Explore e-commerce" }
  ];

  var plannerConfig = {
    types: {
      landing: ["Landing Page", 750, 750, 1], business: ["Business Website", 1500, 1500, 5], ecommerce: ["E-commerce Website", 2750, 2750, 5], custom: ["Custom Platform / Lean MVP", 4900, 4900, 1]
    },
    features: { blog:["Blog setup",200,200], booking:["Online booking",300,300], payment:["Simple payment",250,250], variations:["Product variations",250,250], filters:["Product filters",300,300], language:["Additional language",350,350], calculator:["Calculator / estimator",650,650], crm:["CRM connection",300,300], chat:["Live chat",100,100], newsletter:["Newsletter integration",125,125], portal:["Customer portal",900,900], dashboard:["Advanced dashboard",700,700], roles:["Multiple user roles",400,400], subscriptions:["Payments and subscriptions",700,700], bookingWorkflow:["Booking workflow",800,800], directory:["Directory / listings",1200,1200], api:["API integration (one)",650,650], documents:["Document management",500,500] },
    content: { copyEditing:["Copy editing",65,65], copywriting:["Full copywriting",120,120], logoRefresh:["Logo refresh",250,250], identity:["New basic identity",650,650] },
    marketing: { seo:["SEO foundation",350,350], localSeo:["Local SEO setup",300,300], gbp:["Google Business Profile",175,175], analytics:["Analytics and tracking",150,150] }
  };

  function ready(callback) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", callback) : callback(); }
  function money(value) { return new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(value); }
  function escapeHtml(value) { return String(value || "").replace(/[&<>'"]/g, function (char) { return {"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]; }); }

  function normalLinks() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href]");
      if (!link || event.defaultPrevented || link.target === "_blank" || link.hasAttribute("download") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|https?:)/i.test(href)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(href);
    }, true);
  }

  function initMenu() {
    var button = document.querySelector(".ax-menu"), nav = document.querySelector(".ax-overlay-menu"), close = document.querySelector(".ax-overlay-close"), theme = document.querySelector(".ax-theme-toggle");
    if (!button || !nav) return;
    function setOpen(open) { nav.classList.toggle("open", open); button.classList.toggle("active", open); button.setAttribute("aria-expanded", open ? "true" : "false"); document.body.style.overflow = open ? "hidden" : ""; }
    function applyTheme(value) { nav.classList.toggle("is-light", value === "light"); if (theme) theme.innerHTML = "<span>" + (value === "light" ? "Day" : "Night") + "</span> / <b>" + (value === "light" ? "☀" : "☾") + "</b>"; }
    var saved = window.localStorage.getItem("freenet-menu-theme"); if (saved === "light" || saved === "dark") applyTheme(saved);
    button.addEventListener("click", function () {
      setOpen(true);
    });
    if (close) close.addEventListener("click", function () { setOpen(false); });
    if (theme) theme.addEventListener("click", function () { var next = nav.classList.contains("is-light") ? "dark" : "light"; window.localStorage.setItem("freenet-menu-theme", next); applyTheme(next); });
    nav.addEventListener("click", function (event) {
      if (!event.target.closest("a")) return;
      setOpen(false);
    });
    window.addEventListener("keydown", function (event) { if (event.key === "Escape") setOpen(false); });
  }

  function initHeaderScroll() {
    var header = document.querySelector(".ax-header");
    if (!header) return;
    function update() { header.classList.toggle("scrolled", window.scrollY > 32); }
    update(); window.addEventListener("scroll", update, { passive:true });
  }

  /* PHP export equivalent of the former React MotionLayer component. */
  function initMotionLayer() {
    var loader = document.querySelector(".site-loader");
    if (loader) window.setTimeout(function () { loader.classList.add("is-leaving"); }, 1100);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var selector = ["[data-reveal]", ".section-head", ".deliverable-list article", ".related-grid > *", ".values-grid article", ".principle-grid article", ".feature-project", ".aixor-value-row", ".aixor-article-card"].join(",");
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window)) { items.forEach(function (item) { item.classList.add("is-visible"); }); return; }
    items.forEach(function (item, index) { item.classList.add("reveal-target"); item.style.setProperty("--reveal-delay", (Math.min(index % 4, 3) * 60) + "ms"); });
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { rootMargin:"0px 0px -8% 0px", threshold:.06 });
    items.forEach(function (item) { observer.observe(item); });
  }

  function initContactForms() {
    document.querySelectorAll(".aixor-contact-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = new FormData(form), name = data.get("first_name") || data.get("name") || "website visitor";
        var services = data.getAll("service_type").join(", ") || data.get("service") || "Not selected";
        var lines = ["Name: " + [data.get("first_name") || data.get("name"), data.get("last_name")].filter(Boolean).join(" "), "Email: " + (data.get("email") || ""), "Phone: " + (data.get("phone") || "Not provided"), "Company / website: " + (data.get("company") || "Not provided"), "Company type: " + (data.get("company_type") || "Not provided"), "Services: " + services, "Budget: " + (data.get("budget") ? "$" + Number(data.get("budget")).toLocaleString() + " approximate" : "To discuss"), "", "Project details:", data.get("message") || ""].join("\n");
        window.location.href = "mailto:kontakt@freenetpro.com?subject=" + encodeURIComponent("New Freenet Pro inquiry from " + name) + "&body=" + encodeURIComponent(lines);
        var status = form.querySelector(".aixor-form-status");
        if (!status) { status = document.createElement("p"); status.className = "aixor-form-status"; status.setAttribute("role", "status"); form.appendChild(status); }
        status.textContent = "Your email app should open with the project brief ready to send.";
      });
    });
  }

  function initFaq() {
    document.querySelectorAll(".aixor-faq-list").forEach(function (list) {
      list.querySelectorAll(".aixor-faq-item > button").forEach(function (button) {
        button.addEventListener("click", function () {
          var item = button.parentElement;
          var open = item.classList.contains("active");
          list.querySelectorAll(".aixor-faq-item").forEach(function (entry) { entry.classList.remove("active"); entry.querySelector("button").setAttribute("aria-expanded", "false"); });
          if (!open) { item.classList.add("active"); button.setAttribute("aria-expanded", "true"); }
        });
      });
    });
  }

  function initHighlights() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".read-highlight"));
    if (!items.length) return;
    function update() {
      var viewport = window.innerHeight;
      items.forEach(function (element) {
        var words = element.querySelectorAll("span");
        if (!words.length) return;
        var rect = element.getBoundingClientRect();
        var progress = Math.max(0, Math.min(1, (viewport * 0.82 - rect.top) / (rect.height + viewport * 0.55)));
        Array.prototype.forEach.call(words, function (word, index) {
          var local = Math.max(0, Math.min(1, (progress * words.length - index * 0.82) / 2.6));
          word.style.opacity = String(.18 + local * .82);
        });
      });
    }
    update();
    window.addEventListener("scroll", update, { passive:true });
    window.addEventListener("resize", update);
  }

  function initHero() {
    var hero = document.querySelector(".ax-hero");
    if (!hero) return;
    var dots = Array.prototype.slice.call(hero.querySelectorAll(".ax-hero-dots button"));
    var active = 0, timer, touchStart = null;
    function render(index) {
      active = (index + slides.length) % slides.length;
      var slide = slides[active];
      hero.className = "ax-hero ax-hero-slide-" + (active + 1);
      var copy = hero.querySelectorAll(".ax-hero-copy p");
      if (copy[0]) copy[0].textContent = "“ " + slide.quote;
      if (copy[1]) copy[1].textContent = slide.detail + " ”";
      var author = hero.querySelector(".ax-hero-author strong"), role = hero.querySelector(".ax-hero-author span"), eyebrow = hero.querySelector(".ax-hero-eyebrow"), title = hero.querySelectorAll("h1 span"), cta = hero.querySelector(".ax-hero-bottom .ax-button"), count = hero.querySelector(".ax-hero-count span");
      if (author) author.textContent = slide.author;
      if (role) role.textContent = slide.role;
      if (eyebrow) eyebrow.textContent = slide.eyebrow;
      if (title[0]) title[0].textContent = slide.lineOne;
      if (title[1]) title[1].textContent = slide.lineTwo;
      if (cta) { cta.href = route(slide.routeKey, slide.fallback); cta.childNodes[0].nodeValue = slide.cta + " "; }
      if (count) count.textContent = String(active + 1).padStart(2, "0");
      dots.forEach(function (dot, dotIndex) { dot.classList.toggle("active", dotIndex === active); dot.setAttribute("aria-current", dotIndex === active ? "true" : "false"); });
    }
    function restart() { window.clearInterval(timer); timer = window.setInterval(function () { render(active + 1); }, 7200); }
    dots.forEach(function (dot, index) { dot.addEventListener("click", function () { render(index); restart(); }); });
    hero.addEventListener("keydown", function (event) { if (event.key === "ArrowLeft") { render(active - 1); restart(); } if (event.key === "ArrowRight") { render(active + 1); restart(); } });
    hero.addEventListener("touchstart", function (event) { touchStart = event.touches[0].clientX; }, { passive:true });
    hero.addEventListener("touchend", function (event) { if (touchStart === null) return; var delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) { render(active + (delta < 0 ? 1 : -1)); restart(); } touchStart = null; }, { passive:true });
    render(0); restart();
  }

  function initHorizontalProjects() {
    var section = document.querySelector(".ax-projects-horizontal"), track = document.querySelector(".ax-horizontal-track");
    if (!section || !track) return;
    var travel = 0, mobile = false, frame = 0;
    function update() {
      frame = 0;
      if (mobile) return;
      var rect = section.getBoundingClientRect(), available = Math.max(1, section.offsetHeight - window.innerHeight), progress = Math.max(0, Math.min(1, -rect.top / available));
      track.style.transform = "translate3d(" + (-travel * progress) + "px,0,0)";
    }
    function measure() {
      mobile = window.matchMedia("(max-width: 760px)").matches;
      if (mobile) { section.style.height = "auto"; track.style.transform = "none"; return; }
      travel = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = (window.innerHeight + travel) + "px";
      update();
    }
    function request() { if (!frame) frame = window.requestAnimationFrame(update); }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", request, { passive:true });
  }

  function plannerHtml(state, step, estimate) {
    function field(key, label, type, extra, full) { return '<label class="planner-field' + (full ? ' full' : '') + '"><span>' + label + '</span><' + (type === 'textarea' ? 'textarea' : 'input') + ' data-field="' + key + '" ' + (type === 'textarea' ? 'rows="5"' : 'type="' + (type || 'text') + '"') + (extra || '') + '>' + (type === 'textarea' ? escapeHtml(state[key]) + '</textarea>' : '') + '</label>'; }
    function checkedGroup(group, map) { return '<div class="planner-options">' + Object.keys(map).map(function (key) { return '<label><input type="checkbox" data-group="' + group + '" value="' + key + '"' + (state[group].indexOf(key) > -1 ? ' checked' : '') + '><span>' + map[key][0] + '</span></label>'; }).join('') + '</div>'; }
    function styleGroup() { var options = ["Minimal","Modern","Editorial","Premium","Bold","Corporate","Friendly","Technical"]; return '<div class="planner-options">' + options.map(function (item) { return '<label><input type="checkbox" data-group="style" value="' + item + '"' + (state.style.indexOf(item) > -1 ? ' checked' : '') + '><span>' + item + '</span></label>'; }).join('') + '</div>'; }
    var content = '';
    if (step === 0) content = '<p class="planner-kicker">01 / Contact and Business</p><h2>Tell us who you are and what the business does.</h2><div class="planner-fields">' + field('name','Full name *','text',' required value="' + escapeHtml(state.name) + '"') + field('email','Business email *','email',' required value="' + escapeHtml(state.email) + '"') + field('phone','Phone','tel',' value="' + escapeHtml(state.phone) + '"') + field('company','Company','text',' value="' + escapeHtml(state.company) + '"') + field('city','City','text',' value="' + escapeHtml(state.city) + '"') + field('state','State','text',' value="' + escapeHtml(state.state) + '"') + field('website','Current website','url',' placeholder="https://" value="' + escapeHtml(state.website) + '"',true) + field('business','Describe the business','textarea','',true) + '</div>';
    if (step === 1) content = '<p class="planner-kicker">02 / Goals and Audience</p><h2>What must the website achieve?</h2><div class="planner-options">' + ["Generate qualified leads","Increase online sales","Build trust and credibility","Enable online booking","Grow organic visibility","Support recruitment"].map(function (item) { return '<label><input type="checkbox" data-group="goals" value="' + item + '"' + (state.goals.indexOf(item)>-1?' checked':'') + '><span>' + item + '</span></label>'; }).join('') + '</div><div class="planner-fields">' + field('audience','Target audience','textarea',' placeholder="Who should choose you, and why?"',true) + field('serviceArea','Service Area','text',' placeholder="City, metro area, state, nationwide, or online" value="' + escapeHtml(state.serviceArea) + '"',true) + '</div>';
    if (step === 2) content = '<p class="planner-kicker">03 / Website Type and Scope</p><h2>Choose a practical, launch-ready starting scope.</h2><p class="planner-disclaimer">Professional website design and development with a focused starting scope and transparent add-on pricing.</p><div class="planner-type-grid">' + Object.keys(plannerConfig.types).map(function (key) { var item = plannerConfig.types[key]; return '<label><input type="radio" data-field="websiteType" name="websiteType" value="' + key + '"' + (state.websiteType===key?' checked':'') + '><span><b>' + item[0] + '</b><strong>From ' + money(item[1]) + '</strong><small>Lean Launch starting scope</small></span></label>'; }).join('') + '</div><div class="planner-fields">' + field('pages','Estimated number of pages','number',' min="1" max="100" value="' + state.pages + '"') + (state.websiteType==='ecommerce'?'<label class="planner-field"><span>Product catalog size</span><select data-field="productTier"><option value="0">Up to 10 simple products — included</option><option value="300">11–25 products (+$300)</option><option value="600">26–50 products (+$600)</option><option value="1100">51–100 products (+$1,100)</option><option value="2000">101–250 products (+$2,000)</option><option value="3200">251–500 products (+$3,200)</option></select></label>':'') + '</div>';
    if (step === 3) content = '<p class="planner-kicker">04 / Features and Integrations</p><h2>Choose the functions the project may require.</h2>' + checkedGroup('features',plannerConfig.features) + '<div class="planner-fields">' + field('otherFeatures','Other functionality','textarea',' placeholder="Portals, workflows, product filters, maps, automation, multilingual content..."',true) + '</div>';
    if (step === 4) content = '<p class="planner-kicker">05 / Design Direction</p><h2>Define how the experience should feel.</h2>' + styleGroup() + '<div class="planner-fields">' + field('colors','Preferred or restricted colors','text',' value="' + escapeHtml(state.colors) + '"',true) + field('examples','Example websites','textarea',' placeholder="Paste links and explain what you like"',true) + field('competitors','Competitors','textarea',' placeholder="Names or links"',true) + '</div>';
    if (step === 5) content = '<p class="planner-kicker">06 / Content and Assets</p><h2>What is ready, and what needs to be created?</h2>' + checkedGroup('content',plannerConfig.content) + '<div class="planner-fields"><label class="planner-field"><span>Domain status</span><select data-field="domain"><option value="">Select</option><option' + (state.domain==='I own the domain'?' selected':'') + '>I own the domain</option><option' + (state.domain==='I need domain guidance'?' selected':'') + '>I need domain guidance</option><option' + (state.domain==='The domain must be transferred'?' selected':'') + '>The domain must be transferred</option></select></label><label class="planner-field"><span>Hosting status</span><select data-field="hosting"><option value="">Select</option><option' + (state.hosting==='I have hosting'?' selected':'') + '>I have hosting</option><option' + (state.hosting==='I need managed hosting'?' selected':'') + '>I need managed hosting</option><option' + (state.hosting==='I am not sure'?' selected':'') + '>I am not sure</option></select></label><label class="planner-field full"><span>Reference files</span><input type="file" data-files multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"/><small>Up to 6 reference files. Attach them after your mail app opens.</small></label>' + field('assetNotes','Asset notes','textarea','',true) + '</div>';
    if (step === 6) content = '<p class="planner-kicker">07 / Marketing and Compliance</p><h2>Add measurement, visibility, and compliance needs.</h2>' + checkedGroup('marketing',plannerConfig.marketing) + '<p class="planner-disclaimer">Accessibility and privacy implementation is scoped to the selected platform and supplied legal requirements. Freenet Pro does not provide legal advice.</p>';
    if (step === 7) content = '<p class="planner-kicker">08 / Budget and Timeline</p><h2>Set the practical boundaries for the project.</h2><div class="planner-fields"><label class="planner-field"><span>Budget in USD</span><select data-field="budget">' + ["Under $1,500","$1,500–$2,500","$2,000–$5,000","$5,000–$10,000","$10,000–$20,000","$20,000+","Not decided"].map(function (item) { return '<option' + (state.budget===item?' selected':'') + '>' + item + '</option>'; }).join('') + '</select></label><label class="planner-field"><span>Preferred timeline</span><select data-field="timeline">' + ["As soon as possible","2–4 weeks","1–2 months","2–4 months","Flexible / not decided"].map(function (item) { return '<option' + (state.timeline===item?' selected':'') + '>' + item + '</option>'; }).join('') + '</select></label><label class="planner-field"><span>Are you the decision-maker?</span><select data-field="decisionMaker">' + ["Yes","Part of the decision team","No"].map(function (item) { return '<option' + (state.decisionMaker===item?' selected':'') + '>' + item + '</option>'; }).join('') + '</select></label><label class="planner-field"><span>Primary priority</span><select data-field="priority">' + ["Balanced","Fast launch","Lowest initial cost","Best long-term result"].map(function (item) { return '<option' + (state.priority===item?' selected':'') + '>' + item + '</option>'; }).join('') + '</select></label>' + field('notes','Additional wishes','textarea','',true) + '</div><div class="planner-estimate"><span>Preliminary Estimate</span><strong>' + money(estimate[0]) + '–' + money(estimate[1]) + '</strong><p>USD. This planning range is calculated from the selected scope. It is not a final quote and may change after discovery, content review, and technical validation.</p></div>';
    var steps = ["Contact and Business","Goals and Audience","Website Type and Scope","Features and Integrations","Design Direction","Content and Assets","Marketing and Compliance","Budget and Timeline"];
    return '<div class="planner-progress"><div><span>Step ' + (step + 1) + ' of 8</span><strong>' + steps[step] + '</strong></div><div class="planner-track"><i style="width:' + ((step+1)/8*100) + '%"></i></div><ol>' + steps.map(function (item,index) { return '<li class="' + (index===step?'active':index<step?'done':'') + '"><button type="button" data-action="go" data-step="' + index + '" aria-label="Go to ' + item + '">' + (index+1) + '</button><span>' + item + '</span></li>'; }).join('') + '</ol></div><form novalidate><section>' + content + '</section><div class="planner-actions"><button type="button" class="planner-back" data-action="back"' + (step===0?' disabled':'') + '>← Back</button><button type="button" class="theme-btn" data-action="' + (step===7?'send':'next') + '">' + (step===7?'Prepare inquiry':'Continue') + ' <span>↗</span></button></div></form><aside class="planner-live-estimate"><span>Live preliminary estimate</span><strong>' + money(estimate[0]) + '–' + money(estimate[1]) + '</strong><small>USD · editable pricing data</small></aside>';
  }

  function initPlanner() {
    var root = document.querySelector(".project-planner");
    if (!root) return;
    var state = { name:"",email:"",phone:"",company:"",city:"",state:"",website:"",business:"",goals:[],audience:"",serviceArea:"",websiteType:"business",pages:5,productTier:0,features:[],otherFeatures:"",style:[],colors:"",examples:"",competitors:"",content:[],domain:"",hosting:"",assetNotes:"",marketing:[],budget:"$1,500–$2,500",timeline:"1–2 months",decisionMaker:"Yes",priority:"Balanced",notes:"",files:[] }, step = 0;
    function estimate() { var type = plannerConfig.types[state.websiteType], min=type[1], max=type[2]; if(state.websiteType==='ecommerce'){min+=Number(state.productTier||0);max+=Number(state.productTier||0);} ["features","content","marketing"].forEach(function(group){state[group].forEach(function(key){var item=plannerConfig[group][key];if(item){var multiplier=(group==='content'&&(key==='copyEditing'||key==='copywriting'))?Math.max(1,Number(state.pages||1)):1;min+=item[1]*multiplier;max+=item[2]*multiplier;}});}); return [min,max]; }
    function capture() {
      root.querySelectorAll("[data-field]").forEach(function(input) { if (input.type === "radio") { if (input.checked) state[input.dataset.field] = input.value; } else state[input.dataset.field] = input.type === "number" ? Number(input.value || 0) : input.value; });
      ["goals","features","style","content","marketing"].forEach(function(group) { state[group] = Array.prototype.slice.call(root.querySelectorAll('[data-group="'+group+'"]:checked')).map(function(input){return input.value;}); });
      var upload = root.querySelector("[data-files]"); if (upload) state.files = Array.prototype.slice.call(upload.files || []).slice(0,6).map(function(file){return file.name;});
    }
    function render() { root.innerHTML = plannerHtml(state, step, estimate()); }
    function labels(group) { return state[group].map(function(key){ return plannerConfig[group] && plannerConfig[group][key] ? plannerConfig[group][key][0] : key; }).join(", ") || "None selected"; }
    function send() {
      capture();
      if (!state.name || !/^.+@.+\..+$/.test(state.email)) { step=0; render(); window.alert("Please add your full name and a valid business email before preparing the inquiry."); return; }
      var amount=estimate(), message=["FREENET PRO — WEBSITE PROJECT BRIEF","","Preliminary Estimate: "+money(amount[0])+"–"+money(amount[1])+" USD","","1. Contact and Business","Name: "+state.name,"Email: "+state.email,"Phone: "+state.phone,"Company: "+state.company,"City and State: "+state.city+", "+state.state,"Current website: "+state.website,"Business: "+state.business,"","2. Goals and Audience","Goals: "+(state.goals.join(", ")||"Not selected"),"Target audience: "+state.audience,"Service area: "+state.serviceArea,"","3. Website Type and Scope","Type: "+plannerConfig.types[state.websiteType][0],"Estimated pages: "+state.pages,"","4. Features and Integrations",labels("features"),"Other: "+state.otherFeatures,"","5. Design Direction","Style: "+(state.style.join(", ")||"Not selected"),"Colors: "+state.colors,"Examples: "+state.examples,"Competitors: "+state.competitors,"","6. Content and Assets",labels("content"),"Domain: "+state.domain,"Hosting: "+state.hosting,"Files: "+(state.files.join(", ")||"None"),"Notes: "+state.assetNotes,"","7. Marketing and Compliance",labels("marketing"),"","8. Budget and Timeline","Budget: "+state.budget,"Timeline: "+state.timeline,"Decision-maker: "+state.decisionMaker,"Priority: "+state.priority,"Additional wishes: "+state.notes,"","This is a preliminary estimate, not a final quote."].join("\n");
      window.location.href = "mailto:kontakt@freenetpro.com?subject=" + encodeURIComponent("Website project brief — " + (state.company || state.name)) + "&body=" + encodeURIComponent(message);
    }
    root.addEventListener("click", function(event) { var button=event.target.closest("[data-action]"); if (!button) return; capture(); var action=button.dataset.action; if(action==="next") step=Math.min(7,step+1); if(action==="back") step=Math.max(0,step-1); if(action==="go") step=Number(button.dataset.step); if(action==="send") { send(); return; } render(); });
    root.addEventListener("input", function() { capture(); var live=root.querySelector(".planner-live-estimate strong"); if(live){var amount=estimate();live.textContent=money(amount[0])+"–"+money(amount[1]);} });
    render();
  }

  ready(function () { initMotionLayer(); normalLinks(); initMenu(); initHeaderScroll(); initContactForms(); initFaq(); initHighlights(); initHero(); initHorizontalProjects(); initPlanner(); });
}());
