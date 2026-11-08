import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Mail,
  Send,
  X,
} from "lucide-react";

const images = {
  hero: "/images/image-2.webp",
  framing: "/images/image-2.webp",
  drywall: "/images/image-3.webp",
  finishing: "/images/image-4.webp",
  logo: "/images/logo-transparent.png",
};

type Language = "en" | "es";
type Page = "home" | "about" | "services" | "work" | "contact";
const paths: Record<Page, string> = { home: "/", about: "/about", services: "/services", work: "/work", contact: "/contact" };

const copy = {
  en: {
    langLabel: "Español",
    nav: { home: "Home", about: "Who we are", services: "Services", work: "Our Work", contact: "Request an estimate" },
    hero: {
      eyebrow: "Metal framing & drywall · Colorado",
      title: "Metal Framing & Drywall in Colorado",
      description: "Interior and exterior metal framing, drywall installation, taping, finishing and painting for commercial and residential projects. Backed by 22 years of construction experience.",
      primary: "Request a Quote",
      secondary: "Explore Our Services",
      note: "Metal framing to final finish / Colorado",
    },
    intro: {
      label: "01 — The work",
      title: "Framing to final finish.",
      body: "We work with general contractors, construction companies and homeowners on commercial and residential projects throughout Colorado.",
      link: "Explore our services",
    },
    about: {
      label: "Who we are",
      title: "22 years across framing and finishing.",
      body: "5280 Frame and Drywall LLC brings 22 years of hands-on construction experience across metal framing, drywall, taping, finishing and painting. We work with contractors and homeowners on commercial and residential projects throughout Colorado.",
      points: ["22 years in construction", "Metal framing", "Serving all of Colorado"],
    },
    services: {
      label: "02 — Our capabilities",
      title: "From metal framing to final finish.",
      description: "Interior and exterior metal framing, drywall installation, taping, finishing and painting. One subcontractor can coordinate the work from framing through the final finish.",
      items: [
        { title: "Metal framing", description: "Interior and exterior metal framing for commercial and residential projects, coordinated with the drywall work that follows.", image: images.framing, tag: "01", alt: "Interior metal stud framing" },
        { title: "Drywall installation", description: "Drywall hanging and installation for walls and ceilings, following framing work.", image: images.drywall, tag: "02", alt: "Drywall installation" },
        { title: "Taping, mudding & finishing", description: "Joint taping, compound and sanding to prepare drywall for final finishes.", image: images.finishing, tag: "03", alt: "Drywall finishing" },
        { title: "Painting", description: "Painting as part of commercial and residential projects after drywall installation and finishing.", image: images.hero, tag: "04", alt: "Commercial interior under construction" },
        { title: "Framing through final finish", description: "Coordinate metal framing, drywall, taping, mudding, sanding and painting with one subcontractor.", image: images.framing, tag: "05", alt: "Metal framing in an interior under construction" },
      ],
    },
    work: {
      label: "03 — Our work",
      title: "The work, up close.",
      description: "A look at the work involved in building and finishing interiors. Illustrative photography.",
      captions: ["Drywall installation", "Wall preparation", "Interior construction", "Finishing work"],
    },
    contact: {
      label: "04 — Request an estimate",
      title: "Request a project quote.",
      description: "Share the location, scope and timing. We’ll use the details to prepare your estimate.",
      form: {
        company: "Company name (optional)",
        location: "Project location (optional)",
        timeline: "Approximate timeline (optional)",
        name: "Full name",
        phone: "Phone number (optional)",
        email: "Email address",
        service: "Service needed",
        servicePlaceholder: "Select a service",
        description: "Project description",
        descriptionPlaceholder: "Tell us about the location, scope, timing, or anything else that will help us understand the work.",
        submit: "Request a project quote",
        sending: "Sending inquiry…",
        required: "Required",
      },
      contactInfo: "Questions about a project? Contact us by email.",
      phonePending: "No phone number provided",
      emailPending: "fandd5280@iCloud.com",
      success: "Thanks — your inquiry was sent. We’ll follow up using the details you provided.",
      error: "We couldn’t send the inquiry right now. Please try again or email fandd5280@iCloud.com directly.",
    },
    footer: "Metal framing, drywall, finishing and painting for commercial and residential projects across Colorado.",
  },
  es: {
    langLabel: "English",
    nav: { home: "Inicio", about: "Quiénes somos", services: "Servicios", work: "Nuestro trabajo", contact: "Solicitar presupuesto" },
    hero: {
      eyebrow: "Estructuras metálicas y tablaroca · Colorado",
      title: "Estructuras metálicas y tablaroca en Colorado",
      description: "Especialistas en estructuras metálicas interiores y exteriores, instalación de tablaroca, encintado, acabado y pintura. Aportamos 22 años de experiencia práctica a proyectos comerciales y residenciales.",
      primary: "Solicitar presupuesto",
      secondary: "Ver nuestros servicios",
      note: "De la estructura metálica al acabado final / Colorado",
    },
    intro: {
      label: "01 — El trabajo",
      title: "De la estructura al acabado final.",
      body: "Trabajamos con contratistas generales, empresas de construcción y propietarios en proyectos comerciales y residenciales en Colorado.",
      link: "Ver servicios",
    },
    about: {
      label: "Quiénes somos",
      title: "22 años en estructuras y acabados.",
      body: "5280 Frame and Drywall LLC cuenta con 22 años de experiencia práctica en estructuras metálicas, tablaroca, encintado, acabados y pintura para proyectos comerciales y residenciales en Colorado.",
      points: ["22 años en construcción", "Estructuras metálicas", "Servicio en todo Colorado"],
    },
    services: {
      label: "02 — Nuestros servicios",
      title: "De la estructura metálica al acabado final.",
      description: "Estructuras metálicas interiores y exteriores, instalación de tablaroca, encintado, acabados y pintura. Un solo subcontratista puede coordinar el trabajo desde la estructura hasta el acabado final.",
      items: [
        { title: "Estructuras metálicas", description: "Estructuras metálicas interiores y exteriores para proyectos comerciales y residenciales, coordinadas con la instalación de tablaroca.", image: images.framing, tag: "01", alt: "Estructura interior de postes metálicos" },
        { title: "Instalación de tablaroca", description: "Colocación e instalación de tablaroca para muros y plafones después de la estructura.", image: images.drywall, tag: "02", alt: "Instalación de tablaroca" },
        { title: "Encintado, mudding y acabado", description: "Encintado, compuesto y lijado de juntas para preparar la tablaroca para los acabados finales.", image: images.finishing, tag: "03", alt: "Acabado de tablaroca" },
        { title: "Pintura", description: "Pintura como parte de proyectos comerciales y residenciales después de la instalación y el acabado de tablaroca.", image: images.hero, tag: "04", alt: "Interior comercial en construcción" },
        { title: "De la estructura al acabado final", description: "Coordine estructuras metálicas, tablaroca, encintado, compuesto, lijado y pintura con un solo subcontratista.", image: images.framing, tag: "05", alt: "Estructura metálica en un interior en construcción" },
      ],
    },
    work: {
      label: "03 — Nuestro trabajo",
      title: "El trabajo de cerca.",
      description: "Una mirada al trabajo de construcción y acabado de interiores. Fotografías ilustrativas.",
      captions: ["Instalación de tablaroca", "Preparación de muros", "Construcción interior", "Trabajo de acabado"],
    },
    contact: {
      label: "04 — Solicitar presupuesto",
      title: "Solicite un presupuesto para su proyecto.",
      description: "Comparte la ubicación, el alcance y las fechas. Usaremos los detalles para preparar tu presupuesto.",
      form: {
        company: "Empresa (opcional)",
        location: "Ubicación del proyecto (opcional)",
        timeline: "Plazo aproximado (opcional)",
        name: "Nombre completo",
        phone: "Número de teléfono (opcional)",
        email: "Correo electrónico",
        service: "Servicio necesario",
        servicePlaceholder: "Selecciona un servicio",
        description: "Descripción del proyecto",
        descriptionPlaceholder: "Cuéntanos sobre la ubicación, alcance, tiempos o cualquier detalle que nos ayude a entender el trabajo.",
        submit: "Solicitar presupuesto",
        sending: "Enviando consulta…",
        required: "Obligatorio",
      },
      contactInfo: "¿Tienes preguntas sobre un proyecto? Escríbenos por correo electrónico.",
      phonePending: "No se proporciona teléfono",
      emailPending: "fandd5280@iCloud.com",
      success: "Gracias — tu consulta fue enviada. Te contactaremos con los datos que proporcionaste.",
      error: "No pudimos enviar la consulta en este momento. Inténtalo de nuevo o escribe directamente a fandd5280@iCloud.com.",
    },
    footer: "Estructuras metálicas, tablaroca, acabados y pintura para proyectos comerciales y residenciales en Colorado.",
  },
} as const;

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function Home() {
  const [location, navigate] = useLocation();
  const page: Page = (Object.keys(paths) as Page[]).find(key => paths[key] === location) ?? "home";
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem("5280-language") === "es" ? "es" : "en"; } catch { return "en"; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailStatus, setEmailStatus] = useState<"checking" | "available" | "unavailable">("checking");
  const t = copy[language];
  const pageDescriptions = language === "en" ? {
    about: "Metal framing and drywall subcontracting throughout Colorado.",
    services: "Interior and exterior metal framing, drywall, finishing and painting for commercial and residential projects.",
    work: "Installation and finishing work in progress.",
    contact: "Tell us about your project and the work it needs."
  } : {
    about: "Estructuras metálicas y tablaroca para proyectos comerciales y residenciales en Colorado.",
    services: "Estructuras metálicas interiores y exteriores, tablaroca, acabados y pintura para proyectos comerciales y residenciales.",
    work: "Instalación y acabados en proceso.",
    contact: "Cuéntanos sobre tu proyecto y el trabajo que necesita."
  };

  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem("5280-language", language); } catch { /* Language still works without storage. */ }
  }, [language]);
  useEffect(() => {
    const titles: Record<Language, Record<Page, string>> = {
      en: { home: "Metal Framing & Drywall | 5280 Frame and Drywall LLC", about: "About Our Framing Team | 5280 Frame and Drywall LLC", services: "Metal Framing & Drywall Services | 5280 Frame and Drywall LLC", work: "Framing & Drywall Work | 5280 Frame and Drywall LLC", contact: "Project Quote | 5280 Frame and Drywall LLC" },
      es: { home: "Estructuras metálicas y tablaroca | 5280 Frame and Drywall LLC", about: "Quiénes somos | 5280 Frame and Drywall LLC", services: "Servicios | 5280 Frame and Drywall LLC", work: "Nuestro trabajo | 5280 Frame and Drywall LLC", contact: "Presupuesto | 5280 Frame and Drywall LLC" },
    };
    document.title = titles[language][page];
    const description = page === "home" ? t.hero.description : pageDescriptions[page];
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.5280frame.com${paths[page]}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, language]);
  useEffect(() => {
    if (location !== "/") return;
    const hash = window.location.hash.slice(1) as Page;
    if (hash && hash !== "home" && Object.hasOwn(paths, hash)) navigate(paths[hash], { replace: true });
  }, [location, navigate]);
  useEffect(() => {
    if (page !== "contact") return;
    const controller = new AbortController();
    setEmailStatus("checking");
    fetch("/api/inquiry/status", { signal: controller.signal, cache: "no-store" })
      .then(response => { if (!response.ok) throw new Error("Status unavailable"); return response.json(); })
      .then(data => setEmailStatus(data.configured === true ? "available" : "unavailable"))
      .catch(() => { if (!controller.signal.aborted) setEmailStatus("unavailable"); });
    return () => controller.abort();
  }, [page]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>(".intro-grid, .home-services-grid, .home-scope-grid, .section-heading, .about-grid, .contact-grid, .service-card, .work-photo, .page-cta-inner");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(element => { element.classList.add("reveal-ready"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-ready", "is-visible")); };
  }, [page]);

  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id: Page) => {
    navigate(paths[id]);
    closeMenu();
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="site-shell" id="home">
      <a className="skip-link" href="#main-content">{language === "en" ? "Skip to content" : "Saltar al contenido"}</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="/" aria-label="5280 Frame & Drywall LLC home">
            <img className="brand-logo" src={images.logo} alt="5280 Frame & Drywall LLC" />
          </a>
          <nav id="primary-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={language === "en" ? "Primary navigation" : "Navegación principal"}>
            {(["home", "about", "services", "work", "contact"] as const).map((key) => (
              <a key={key} href={paths[key]} aria-current={page === key ? "page" : undefined} onClick={closeMenu}>{t.nav[key]}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-switch" type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={`Switch language to ${t.langLabel}`}>
              <span className="language-dot" /> {t.langLabel}
            </button>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={language === "es" ? (menuOpen ? "Cerrar menú" : "Abrir menú") : (menuOpen ? "Close menu" : "Open menu")}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {page === "home" && <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</p>
              <h1 id="hero-title">{t.hero.title}</h1>
              <p className="hero-description">{t.hero.description}</p>
              <div className="hero-actions">
                <button className="button button-light" type="button" onClick={() => scrollTo("contact")}>
                  {t.hero.primary} <ArrowRight size={17} />
                </button>
                <button className="button button-outline-light" type="button" onClick={() => scrollTo("services")}>
                  {t.hero.secondary} <ArrowDownRight size={17} />
                </button>
              </div>
            </div>
            <div className="hero-side-note"><span>5280</span>{t.hero.note}</div>
          </div>
          <div className="hero-index">01 / 04</div>
        </section>}

        {page !== "home" && <section className="page-hero" aria-labelledby="page-title">
          <div className="container page-hero-inner"><p className="page-hero-kicker">5280 FRAME & DRYWALL / COLORADO</p>
            <h1 id="page-title">{page === "about" ? t.about.label : page === "services" ? t.nav.services : page === "work" ? t.nav.work : t.nav.contact}</h1>
            <p>{pageDescriptions[page]}</p>
          </div>
        </section>}

        {(page === "home" || page === "about") && <section className="intro-section section-pad" id="about">
          <div className="container intro-grid">
            <SectionLabel>{t.intro.label}</SectionLabel>
            <div className="intro-copy">
              <h2>{t.intro.title}</h2>
              <p>{t.intro.body}</p>
              <button className="text-link" type="button" onClick={() => scrollTo("services")}>{t.intro.link} <ArrowRight size={16} /></button>
            </div>
            <div className="intro-aside"><span className="aside-number">22</span><span>{language === "en" ? <>Years of<br />construction<br />experience</> : <>Años de<br />experiencia en<br />construcción</>}</span></div>
          </div>
        </section>}

        {page === "home" && <section className="home-services section-pad">
          <div className="container home-services-grid">
            <div className="home-services-copy">
              <SectionLabel>{t.services.label}</SectionLabel>
              <h2>{t.services.title}</h2>
              <p>{t.services.description}</p>
              <div className="home-service-list">
                {[0, 1, 2, 3].map(index => <a href="/services" key={t.services.items[index].tag}><span>{t.services.items[index].tag}</span><strong>{t.services.items[index].title}</strong><ArrowRight size={18} /></a>)}
              </div>
              <a href="/services" className="text-link">{t.intro.link}<ArrowRight size={16} /></a>
            </div>
            <div className="home-services-image"><img src={images.framing} alt="" loading="lazy" /><span className="image-marker">5280 / CO</span></div>
          </div>
        </section>}

        {page === "home" && <section className="home-scope section-pad">
          <div className="container home-scope-grid"><div><SectionLabel>{language === "en" ? "03 — Complete project services" : "03 — Servicios integrales"}</SectionLabel><h2>{language === "en" ? "One subcontractor. From framing to paint." : "Un subcontratista. De la estructura a la pintura."}</h2></div><div><p>{language === "en" ? "For commercial and residential projects, 5280 Frame and Drywall can coordinate interior and exterior metal framing, drywall installation, taping, mudding, sanding and painting as part of the same project." : "Para proyectos comerciales y residenciales, 5280 Frame and Drywall puede coordinar estructuras metálicas interiores y exteriores, instalación de tablaroca, encintado, compuesto, lijado y pintura como parte del mismo proyecto."}</p><a className="text-link" href="/contact">{t.hero.primary}<ArrowRight size={16} /></a></div></div>
        </section>}

        {page === "home" && <section className="home-gallery section-pad" aria-labelledby="home-gallery-title">
          <div className="container">
            <div className="home-gallery-heading">
              <div><SectionLabel>{language === "en" ? "04 — In the field" : "04 — En obra"}</SectionLabel><h2 id="home-gallery-title">{language === "en" ? "Construction in progress." : "Construcción en progreso."}</h2></div>
              <div><p>{t.work.description}</p><a href="/work" className="text-link">{language === "en" ? "View the gallery" : "Ver la galería"}<ArrowRight size={16} /></a></div>
            </div>
            <div className="home-gallery-grid">{t.work.captions.slice(0, 3).map((caption, index) => <figure key={caption}><img src={`/images/work-${index + 1}.jpg`} alt={caption} loading="lazy" /><figcaption><span>0{index + 1}</span>{caption}</figcaption></figure>)}</div>
          </div>
        </section>}

        {page === "about" && <section className="about-section section-pad section-dark">
          <div className="container about-grid">
            <div className="about-stamp"><div className="stamp-ring">5280</div><span>FRAMEANDDRYWALL<br />LLC</span></div>
            <div className="about-copy">
              <SectionLabel>{t.about.label}</SectionLabel>
              <h2>{t.about.title}</h2>
              <p>{t.about.body}</p>
              <ul className="about-points">{t.about.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
            </div>
          </div>
        </section>}

        {page === "services" && <section className="services-section section-pad" id="services">
          <div className="container">
            <div className="section-heading services-heading">
              <div><SectionLabel>{t.services.label}</SectionLabel><h2>{t.services.title}</h2></div>
              <p>{t.services.description}</p>
            </div>
            <div className="services-list">
              {t.services.items.map((service) => (
                <article className="service-card" key={service.tag}>
                  <div className="service-image-wrap"><img src={service.image} alt={service.alt} className="service-image" /><span className="service-tag">{service.tag}</span></div>
                  <div className="service-content"><h3>{service.title}</h3><p>{service.description}</p><a className="service-quote" href="/contact">{language === "en" ? "Request a quote" : "Solicitar presupuesto"}<ArrowRight size={16} /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {page === "work" && <section className="work-section section-pad" id="work">
          <div className="container">
            <div className="section-heading work-heading">
              <div><SectionLabel>{t.work.label}</SectionLabel><h2>{t.work.title}</h2></div>
              <p>{t.work.description}</p>
            </div>
            <div className="work-gallery">
              {t.work.captions.map((caption, index) => <figure className="work-photo" key={caption}><img src={`/images/work-${index + 1}.jpg`} alt={caption} loading="lazy" /><figcaption><strong>{caption}</strong><span>0{index + 1}</span></figcaption></figure>)}
            </div>
          </div>
        </section>}

        {page === "contact" && <section className="contact-section section-pad section-ink" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionLabel>{t.contact.label}</SectionLabel>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.description}</p>
              <div className="contact-details">
                <p>{t.contact.contactInfo}</p>
                <div className="pending-actions"><a href="mailto:fandd5280@iCloud.com"><Mail size={16} />{t.contact.emailPending}</a></div>
              </div>
            </div>
            <form className="estimate-form" onSubmit={handleSubmit}>
              {emailStatus === "unavailable" && <p className="form-message form-error" role="status">{language === "en" ? "The online form is temporarily unavailable. Please email us directly at " : "El formulario no está disponible temporalmente. Escríbanos directamente a "}<a href="mailto:fandd5280@icloud.com">fandd5280@icloud.com</a>.</p>}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
              <div className="form-row"><label>{t.contact.form.name}<input name="name" type="text" required maxLength={120} autoComplete="name" placeholder={t.contact.form.required} /></label><label>{t.contact.form.company}<input name="company" type="text" maxLength={160} autoComplete="organization" /></label></div>
              <div className="form-row"><label>{t.contact.form.email}<input name="email" type="email" required maxLength={320} autoComplete="email" placeholder={t.contact.form.required} /></label><label>{t.contact.form.phone}<input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label></div>
              <div className="form-row"><label>{t.contact.form.location}<input name="projectLocation" type="text" maxLength={200} /></label><label>{t.contact.form.timeline}<input name="timeline" type="text" maxLength={120} /></label></div>
              <label>{language === "en" ? "Project type" : "Tipo de proyecto"}<select name="projectType" required defaultValue=""><option value="" disabled>{language === "en" ? "Select project type" : "Seleccione el tipo de proyecto"}</option><option value="commercial">{language === "en" ? "Commercial" : "Comercial"}</option><option value="residential">{language === "en" ? "Residential" : "Residencial"}</option></select></label>
              <label>{t.contact.form.service}<select name="service" required defaultValue=""><option value="" disabled>{t.contact.form.servicePlaceholder}</option>{t.services.items.map((item) => <option key={item.tag} value={item.title}>{item.title}</option>)}</select></label>
              <label>{t.contact.form.description}<textarea name="description" rows={4} required maxLength={4000} placeholder={t.contact.form.descriptionPlaceholder} /></label>
              <button className="button button-accent form-submit" type="submit" disabled={formState === "sending" || emailStatus !== "available"}>{formState === "sending" ? t.contact.form.sending : t.contact.form.submit}<ArrowRight size={17} /></button>
              {formState === "success" && <p className="form-message form-success" role="status">{t.contact.success}</p>}
              {formState === "error" && <p className="form-message form-error" role="alert">{t.contact.error}</p>}
            </form>
          </div>
        </section>}
        {page !== "contact" && <section className="page-cta section-ink"><div className="container page-cta-inner"><div><p className="section-label">{page === "home" ? (language === "en" ? "05 — Request an estimate" : "05 — Solicitar presupuesto") : t.contact.label}</p><h2>{t.contact.title}</h2></div><a className="button button-light" href="/contact">{t.hero.primary}<ArrowRight size={17} /></a></div></section>}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><a className="wordmark footer-wordmark" href="/" aria-label="5280 Frame & Drywall LLC home"><img className="brand-logo" src={images.logo} alt="5280 Frame & Drywall LLC" /></a><p>{t.footer}</p><span className="footer-location">COLORADO / USA</span><nav className="footer-nav" aria-label={language === "en" ? "Footer navigation" : "Navegación del pie de página"}>{(["home", "about", "services", "work", "contact"] as const).map(key => <a key={key} href={paths[key]}>{t.nav[key]}</a>)}</nav></div>
      </footer>
    </div>
  );
}

function ArrowUpRight() {
  return <ArrowRight size={19} className="service-arrow" />;
}

export default Home;
