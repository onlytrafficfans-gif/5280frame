import { FormEvent, useState } from "react";
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
  hero: "/manus-storage/async-images/yBQ39O3Owexe3xjYu9gUVz/image-1.webp",
  framing: "/manus-storage/async-images/yBQ39O3Owexe3xjYu9gUVz/image-2.webp",
  drywall: "/manus-storage/async-images/yBQ39O3Owexe3xjYu9gUVz/image-3.webp",
  finishing: "/manus-storage/async-images/yBQ39O3Owexe3xjYu9gUVz/image-4.webp",
  ceiling: "/manus-storage/async-images/yBQ39O3Owexe3xjYu9gUVz/image-5.webp",
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663919752325/TRnfwEnsOJYmfQgQ.PNG",
};

type Language = "en" | "es";

const copy = {
  en: {
    langLabel: "Español",
    nav: { home: "Home", about: "Who we are", services: "Services", work: "Our Work", contact: "Request an estimate" },
    hero: {
      eyebrow: "Commercial drywall subcontractor · Colorado",
      title: "Drywall work that keeps the build moving.",
      description: "Specialized commercial drywall installation, finishing, texture, acoustic ceilings, and new construction support for contractors, builders, and property owners across Colorado.",
      primary: "Request a Free Estimate",
      secondary: "Our Services",
      note: "Built around clean work, clear communication, and jobsite momentum.",
    },
    intro: {
      label: "01 — The work",
      title: "A specialized subcontractor for the next phase of the build.",
      body: "5280frameanddrywallLLC supports general contractors, builders, and construction companies with dependable commercial drywall work — from hanging and taping through mudding, sanding, texture, repairs, and finish-ready surfaces. We also serve residential customers across Colorado.",
      link: "See our capabilities",
    },
    about: {
      label: "Who we are",
      title: "22 years of construction experience behind every finish.",
      body: "With 22 years of experience in construction, 5280frameanddrywallLLC brings a practical, quality-focused approach to commercial drywall and interior finishing. We partner with the people responsible for getting the job done — general contractors, builders, other construction companies, and homeowners.",
      points: ["22 years in construction", "Commercial drywall specialist", "Serving all of Colorado"],
    },
    services: {
      label: "02 — Commercial capabilities",
      title: "Drywall from hang to final coat.",
      description: "We do not publish fixed prices because every project is different. Scope, size, materials, labor, schedule, and site requirements all matter — request an estimate and we’ll start with the work in front of you.",
      items: [
        { title: "Drywall installation", description: "Commercial drywall installation and new construction drywall for clean, efficient interior build-outs.", image: images.drywall, tag: "01", alt: "Commercial drywall installation in Colorado" },
        { title: "Drywall hanging", description: "Panel hanging and layout support that keeps walls and ceilings moving toward the next trade.", image: images.framing, tag: "02", alt: "Drywall panels being hung on a construction site" },
        { title: "Taping & mudding", description: "Joint taping and mudding with careful attention to lines, transitions, and surface consistency.", image: images.finishing, tag: "03", alt: "Drywall taping and mudding for a smooth wall finish" },
        { title: "Drywall finishing & sanding", description: "Finish coats and sanding for smooth, ready-to-prime surfaces across commercial and residential projects.", image: images.finishing, tag: "04", alt: "Drywall finishing and sanding before paint" },
        { title: "Texture application", description: "Wall and ceiling texture application to achieve the surface character the project calls for.", image: images.finishing, tag: "05", alt: "Textured drywall surface application" },
        { title: "Repairs & patching", description: "Drywall repairs, patching, and punch-list work for occupied spaces, remodels, and project closeout.", image: images.drywall, tag: "06", alt: "Drywall repair and patching work" },
        { title: "Acoustic ceilings", description: "Cielos acústicos / acoustic ceiling installation for practical, polished commercial spaces.", image: images.ceiling, tag: "07", alt: "Acoustic ceiling installation in a commercial space" },
        { title: "Painting & residential work", description: "Painting support and drywall services for residential customers, builders, and improvement projects.", image: images.hero, tag: "08", alt: "Drywall and painting work in a residential interior" },
      ],
    },
    work: {
      label: "03 — Our work",
      title: "A place for the projects.",
      description: "Actual project photography will live here as the portfolio grows. These placeholders mark the intended gallery and can be replaced without changing the layout.",
      placeholder: "Project photo placeholder",
      captions: ["Commercial interiors", "Framing in progress", "Finish-ready surfaces", "Ceiling systems"],
    },
    contact: {
      label: "04 — Request an estimate",
      title: "Tell us what’s taking shape.",
      description: "No fixed pricing here — every project depends on its size, scope, materials, labor, schedule, and other requirements. Share the details and request a free estimate.",
      form: {
        name: "Full name",
        phone: "Phone number (optional)",
        email: "Email address",
        type: "Project type",
        typePlaceholder: "Select one",
        commercial: "Commercial",
        residential: "Residential",
        service: "Service needed",
        servicePlaceholder: "Select a service",
        description: "Project description",
        descriptionPlaceholder: "Tell us about the location, scope, timing, or anything else that will help us understand the work.",
        submit: "Request a free estimate",
        sending: "Sending inquiry…",
        required: "Required",
      },
      contactInfo: "Email us directly at fandd5280@iCloud.com. We currently do not provide a phone number.",
      phonePending: "No phone number provided",
      emailPending: "fandd5280@iCloud.com",
      success: "Thanks — your inquiry was sent. We’ll follow up using the details you provided.",
      error: "We couldn’t send the inquiry right now. Please try again or email fandd5280@iCloud.com directly.",
    },
    footer: "Commercial drywall subcontracting and residential drywall services across Colorado.",
  },
  es: {
    langLabel: "English",
    nav: { home: "Inicio", about: "Quiénes somos", services: "Servicios", work: "Nuestro trabajo", contact: "Solicitar presupuesto" },
    hero: {
      eyebrow: "Subcontratista de tablaroca comercial · Colorado",
      title: "Trabajo de tablaroca que mantiene la obra avanzando.",
      description: "Instalación, acabado, textura, plafones acústicos y apoyo para obra nueva comercial para contratistas generales, constructores y propietarios en todo Colorado.",
      primary: "Solicitar presupuesto gratis",
      secondary: "Nuestros servicios",
      note: "Trabajo limpio, comunicación clara y avance constante en la obra.",
    },
    intro: {
      label: "01 — El trabajo",
      title: "Un subcontratista especializado para la siguiente fase de la obra.",
      body: "5280frameanddrywallLLC apoya a contratistas generales, constructores y empresas de construcción con trabajo comercial de tablaroca: instalación, encintado, mudding, lijado, textura, reparaciones y superficies listas para acabado. También atendemos clientes residenciales en todo Colorado.",
      link: "Conoce nuestras capacidades",
    },
    about: {
      label: "Quiénes somos",
      title: "22 años de experiencia en construcción detrás de cada acabado.",
      body: "Con 22 años de experiencia en construcción, 5280frameanddrywallLLC aporta una forma práctica y enfocada en la calidad al trabajo comercial de tablaroca y acabados interiores. Trabajamos con quienes hacen posible la obra: contratistas generales, constructores, otras empresas de construcción y propietarios.",
      points: ["22 años en construcción", "Especialistas en tablaroca comercial", "Servicio en todo Colorado"],
    },
    services: {
      label: "02 — Capacidades comerciales",
      title: "De la instalación al acabado final.",
      description: "No publicamos precios fijos porque cada proyecto es diferente. El tamaño, alcance, materiales, mano de obra, calendario y requisitos del sitio importan — solicita un presupuesto y empezamos con tu proyecto.",
      items: [
        { title: "Instalación de tablaroca", description: "Instalación comercial de tablaroca y tablaroca para obra nueva, con interiores limpios y eficientes.", image: images.drywall, tag: "01", alt: "Instalación de tablaroca comercial en Colorado" },
        { title: "Colocación de paneles", description: "Colocación y distribución de paneles para avanzar muros y plafones hacia la siguiente etapa.", image: images.framing, tag: "02", alt: "Colocación de paneles de tablaroca en una obra" },
        { title: "Encintado y mudding", description: "Encintado y mudding con atención a líneas, transiciones y consistencia de superficie.", image: images.finishing, tag: "03", alt: "Encintado y mudding de tablaroca para un acabado liso" },
        { title: "Acabado y lijado", description: "Capas de acabado y lijado para superficies suaves, listas para imprimar en proyectos comerciales y residenciales.", image: images.finishing, tag: "04", alt: "Acabado y lijado de tablaroca antes de pintar" },
        { title: "Aplicación de textura", description: "Aplicación de textura en muros y plafones para lograr la superficie que el proyecto necesita.", image: images.finishing, tag: "05", alt: "Aplicación de textura en tablaroca" },
        { title: "Reparaciones y parches", description: "Reparaciones, parches y punch-list para espacios ocupados, remodelaciones y cierre de obra.", image: images.drywall, tag: "06", alt: "Reparación y parcheo de tablaroca" },
        { title: "Cielos acústicos", description: "Instalación de cielos acústicos / acoustic ceilings para espacios comerciales prácticos y pulidos.", image: images.ceiling, tag: "07", alt: "Instalación de cielos acústicos en un espacio comercial" },
        { title: "Pintura y residencial", description: "Apoyo de pintura y servicios de tablaroca para clientes residenciales, constructores y mejoras.", image: images.hero, tag: "08", alt: "Trabajo de tablaroca y pintura en un interior residencial" },
      ],
    },
    work: {
      label: "03 — Nuestro trabajo",
      title: "Un lugar para los proyectos.",
      description: "Aquí irán las fotografías de proyectos reales a medida que crezca el portafolio. Estos espacios son marcadores que se pueden reemplazar sin cambiar el diseño.",
      placeholder: "Marcador de foto del proyecto",
      captions: ["Interiores comerciales", "Estructura en proceso", "Superficies listas", "Sistemas de plafón"],
    },
    contact: {
      label: "04 — Solicitar presupuesto",
      title: "Cuéntanos qué estás construyendo.",
      description: "No incluimos precios fijos: cada proyecto depende de su tamaño, alcance, materiales, mano de obra, calendario y otros requisitos. Comparte los detalles y solicita una estimación gratuita.",
      form: {
        name: "Nombre completo",
        phone: "Número de teléfono (opcional)",
        email: "Correo electrónico",
        type: "Tipo de proyecto",
        typePlaceholder: "Selecciona una opción",
        commercial: "Comercial",
        residential: "Residencial",
        service: "Servicio necesario",
        servicePlaceholder: "Selecciona un servicio",
        description: "Descripción del proyecto",
        descriptionPlaceholder: "Cuéntanos sobre la ubicación, alcance, tiempos o cualquier detalle que nos ayude a entender el trabajo.",
        submit: "Solicitar presupuesto gratis",
        sending: "Enviando consulta…",
        required: "Obligatorio",
      },
      contactInfo: "Escríbenos directamente a fandd5280@iCloud.com. Actualmente no proporcionamos un número de teléfono.",
      phonePending: "No se proporciona teléfono",
      emailPending: "fandd5280@iCloud.com",
      success: "Gracias — tu consulta fue enviada. Te contactaremos con los datos que proporcionaste.",
      error: "No pudimos enviar la consulta en este momento. Inténtalo de nuevo o escribe directamente a fandd5280@iCloud.com.",
    },
    footer: "Subcontratación comercial y servicios residenciales de tablaroca en todo Colorado.",
  },
} as const;

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = copy[language];

  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#home" onClick={() => scrollTo("home")} aria-label="5280frameanddrywallLLC home">
            <img className="brand-logo" src={images.logo} alt="5280 Frame & Drywall LLC" />
          </a>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={language === "en" ? "Primary navigation" : "Navegación principal"}>
            {(["home", "about", "services", "work", "contact"] as const).map((key) => (
              <a key={key} href={`#${key}`} onClick={() => scrollTo(key)}>{t.nav[key]}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-switch" type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={`Switch language to ${t.langLabel}`}>
              <span className="language-dot" /> {t.langLabel}
            </button>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
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
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="container intro-grid">
            <SectionLabel>{t.intro.label}</SectionLabel>
            <div className="intro-copy">
              <h2>{t.intro.title}</h2>
              <p>{t.intro.body}</p>
              <button className="text-link" type="button" onClick={() => scrollTo("services")}>{t.intro.link} <ArrowRight size={16} /></button>
            </div>
            <div className="intro-aside"><span className="aside-number">CO</span><span>{language === "en" ? <>Commercial<br />and residential<br />construction</> : <>Construcción<br />comercial y<br />residencial</>}</span></div>
          </div>
        </section>

        <section className="about-section section-pad section-dark">
          <div className="container about-grid">
            <div className="about-stamp"><div className="stamp-ring">5280</div><span>FRAMEANDDRYWALL<br />LLC</span></div>
            <div className="about-copy">
              <SectionLabel>{t.about.label}</SectionLabel>
              <h2>{t.about.title}</h2>
              <p>{t.about.body}</p>
              <ul className="about-points">{t.about.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="container">
            <div className="section-heading services-heading">
              <div><SectionLabel>{t.services.label}</SectionLabel><h2>{t.services.title}</h2></div>
              <p>{t.services.description}</p>
            </div>
            <div className="services-list">
              {t.services.items.map((service) => (
                <article className="service-card" key={service.tag}>
                  <div className="service-image-wrap"><img src={service.image} alt={service.alt} className="service-image" /><span className="service-tag">{service.tag}</span></div>
                  <div className="service-content"><h3>{service.title}</h3><p>{service.description}</p><ArrowUpRight /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="container">
            <div className="section-heading work-heading">
              <div><SectionLabel>{t.work.label}</SectionLabel><h2>{t.work.title}</h2></div>
              <p>{t.work.description}</p>
            </div>
            <div className="work-gallery">
              {t.work.captions.map((caption, index) => <div className={`work-placeholder work-placeholder-${index + 1}`} key={caption}><span className="placeholder-cross" /><span className="placeholder-label">{t.work.placeholder}</span><strong>{caption}</strong><span className="placeholder-index">0{index + 1}</span></div>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad section-ink" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionLabel>{t.contact.label}</SectionLabel>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.description}</p>
              <div className="contact-details">
                <p>{t.contact.contactInfo}</p>
                <div className="pending-actions"><span><Mail size={16} />{t.contact.phonePending}</span><a href="mailto:fandd5280@iCloud.com"><Mail size={16} />{t.contact.emailPending}</a></div>
              </div>
            </div>
            <form className="estimate-form" onSubmit={handleSubmit}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
              <div className="form-row"><label>{t.contact.form.name}<input name="name" type="text" required placeholder={t.contact.form.required} /></label><label>{t.contact.form.phone}<input name="phone" type="tel" placeholder="—" /></label></div>
              <label>{t.contact.form.email}<input name="email" type="email" required placeholder={t.contact.form.required} /></label>
              <div className="form-row"><label>{t.contact.form.type}<select name="projectType" required defaultValue=""><option value="" disabled>{t.contact.form.typePlaceholder}</option><option value="commercial">{t.contact.form.commercial}</option><option value="residential">{t.contact.form.residential}</option></select></label><label>{t.contact.form.service}<select name="service" required defaultValue=""><option value="" disabled>{t.contact.form.servicePlaceholder}</option>{t.services.items.map((item) => <option key={item.tag} value={item.title}>{item.title}</option>)}</select></label></div>
              <label>{t.contact.form.description}<textarea name="description" rows={4} required placeholder={t.contact.form.descriptionPlaceholder} /></label>
              <button className="button button-accent form-submit" type="submit" disabled={formState === "sending"}>{formState === "sending" ? t.contact.form.sending : t.contact.form.submit}<ArrowRight size={17} /></button>
              {formState === "success" && <p className="form-message form-success" role="status">{t.contact.success}</p>}
              {formState === "error" && <p className="form-message form-error" role="alert">{t.contact.error}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><div className="wordmark footer-wordmark"><img className="brand-logo" src={images.logo} alt="5280 Frame & Drywall LLC" /></div><p>{t.footer}</p><span className="footer-location">COLORADO / USA</span></div>
      </footer>
    </div>
  );
}

function ArrowUpRight() {
  return <ArrowRight size={19} className="service-arrow" />;
}

export default Home;
