import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../constants/siteData';
import logo from '../assets/logo.webp';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <header className="bg-[#3451a1] py-8 md:py-12">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[#f5e6c8]/70 hover:text-[#f5e6c8] transition-colors mb-6 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna alla Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f5e6c8] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#3451a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#f5e6c8] text-3xl md:text-4xl font-display font-bold uppercase">Cookie Policy</h1>
              <p className="text-[#f5e6c8]/60 text-sm">Informativa sull'utilizzo dei cookie</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-[#f5e6c8]/10">
            <p className="text-[#f5e6c8]/50 text-sm mb-8">
              Ultimo aggiornamento: {siteData.lastPolicyUpdate}
            </p>

            {/* Privacy Friendly Notice */}
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-green-400 font-semibold mb-2">Sito Privacy-Friendly</h3>
                  <p className="text-[#f5e6c8]/70 text-sm">
                    Questo sito web utilizza <strong className="text-[#f5e6c8]">solo cookie tecnici</strong> necessari al funzionamento. <strong className="text-[#f5e6c8]">Non utilizziamo cookie di profilazione, tracciamento o analisi</strong>. La tua privacy è protetta e non serve il tuo consenso per la navigazione.
                  </p>
                </div>
              </div>
            </div>

            {/* Sezione 1 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                1. Cosa sono i Cookie
              </h2>
              <p className="text-[#f5e6c8]/70">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o smartphone) quando visiti un sito web. I cookie permettono al sito di riconoscere il tuo dispositivo e memorizzare alcune informazioni sulle tue preferenze o azioni passate.
              </p>
            </section>

            {/* Sezione 2 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                2. Tipologie di Cookie
              </h2>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.1 Cookie Tecnici</h3>
              <p className="text-[#f5e6c8]/70 mb-4">
                Sono cookie necessari al funzionamento del sito e permettono di navigare e utilizzare le funzionalità base. Senza questi cookie, il sito potrebbe non funzionare correttamente.
              </p>
              <div className="bg-[#f5e6c8]/5 border border-[#f5e6c8]/10 p-4 rounded-lg mb-6">
                <p className="text-[#f5e6c8] font-semibold text-sm mb-2">Cookie tecnici utilizzati su questo sito:</p>
                <ul className="text-[#f5e6c8]/70 text-sm space-y-1">
                  <li>• Cookie di navigazione e di sessione</li>
                  <li>• Cookie per memorizzare le preferenze dell'interfaccia</li>
                </ul>
                <p className="text-[#f5e6c8]/50 text-xs mt-3">
                  Secondo la normativa vigente, i cookie tecnici non richiedono il consenso dell'utente.
                </p>
              </div>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.2 Cookie Analitici</h3>
              <div className="flex items-center gap-3 bg-red-900/10 border border-red-500/20 p-4 rounded-lg mb-6">
                <span className="text-red-400 font-semibold text-sm">NON UTILIZZATI</span>
                <p className="text-[#f5e6c8]/70 text-sm">
                  Questo sito NON utilizza cookie analitici come Google Analytics o simili per tracciare il comportamento degli utenti.
                </p>
              </div>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.3 Cookie di Profilazione</h3>
              <div className="flex items-center gap-3 bg-red-900/10 border border-red-500/20 p-4 rounded-lg mb-6">
                <span className="text-red-400 font-semibold text-sm">NON UTILIZZATI</span>
                <p className="text-[#f5e6c8]/70 text-sm">
                  Questo sito NON utilizza cookie di profilazione per creare profili utente o inviare pubblicità mirata.
                </p>
              </div>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.4 Cookie di Terze Parti</h3>
              <div className="flex items-center gap-3 bg-red-900/10 border border-red-500/20 p-4 rounded-lg">
                <span className="text-red-400 font-semibold text-sm">NON UTILIZZATI</span>
                <p className="text-[#f5e6c8]/70 text-sm">
                  Questo sito NON utilizza servizi di terze parti che installano cookie (Facebook Pixel, Google Ads, ecc.).
                </p>
              </div>
            </section>

            {/* Sezione 3 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                3. Cookie Utilizzati su Questo Sito
              </h2>
              <p className="text-[#f5e6c8]/70 mb-6">
                Il nostro sito utilizza esclusivamente i seguenti cookie tecnici:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#f5e6c8]/20">
                      <th className="text-left text-[#f5e6c8] py-3 px-4">Nome Cookie</th>
                      <th className="text-left text-[#f5e6c8] py-3 px-4">Tipologia</th>
                      <th className="text-left text-[#f5e6c8] py-3 px-4">Finalità</th>
                      <th className="text-left text-[#f5e6c8] py-3 px-4">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f5e6c8]/10">
                      <td className="text-[#f5e6c8]/70 py-3 px-4">{siteData.cookieKey}</td>
                      <td className="py-3 px-4"><span className="text-xs bg-[#3451a1]/30 text-[#f5e6c8] px-2 py-1 rounded">Tecnico</span></td>
                      <td className="text-[#f5e6c8]/70 py-3 px-4">Memorizza lo stato di espansione/chiusura della barra laterale per migliorare l'esperienza di navigazione</td>
                      <td className="text-[#f5e6c8]/70 py-3 px-4">7 giorni</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f5e6c8]/5 border border-[#f5e6c8]/10 p-4 rounded-lg mt-6">
                <p className="text-[#f5e6c8]/70 text-sm">
                  <strong className="text-[#f5e6c8]">Nota importante:</strong> I cookie tecnici come "{siteData.cookieKey}" sono essenziali per il funzionamento del sito e non richiedono il consenso dell'utente ai sensi del Provvedimento del Garante Privacy n. 229/2014 e del GDPR.
                </p>
              </div>
            </section>

            {/* Sezione 4 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                4. Come Gestire i Cookie
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Anche se i cookie tecnici non richiedono consenso, puoi comunque gestirli o eliminarli attraverso le impostazioni del tuo browser.
              </p>

              <p className="text-[#f5e6c8] font-semibold mb-3">Disabilitare i cookie tramite il browser:</p>
              <ul className="text-[#f5e6c8]/70 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Mozilla Firefox:</strong> Preferenze → Privacy e sicurezza → Cookie e dati dei siti web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Safari:</strong> Preferenze → Privacy → Cookie e dati dei siti web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Microsoft Edge:</strong> Impostazioni → Cookie e autorizzazioni del sito → Gestisci e elimina cookie</span>
                </li>
              </ul>

              <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold text-sm mb-2">Attenzione:</p>
                <p className="text-[#f5e6c8]/70 text-sm">
                  La disabilitazione completa dei cookie tecnici potrebbe compromettere alcune funzionalità del sito e ridurre la qualità dell'esperienza di navigazione.
                </p>
              </div>
            </section>

            {/* Sezione 5 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                5. Link a Siti Esterni
              </h2>
              <p className="text-[#f5e6c8]/70">
                Il nostro sito potrebbe contenere link a siti web di terze parti. Non siamo responsabili per le pratiche di privacy o il contenuto di tali siti esterni. Ti invitiamo a leggere le informative sulla privacy dei siti che visiti.
              </p>
            </section>

            {/* Sezione 6 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                6. Aggiornamenti della Cookie Policy
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Questa Cookie Policy può essere modificata nel tempo. Eventuali modifiche sostanziali saranno comunicate attraverso un avviso pubblicato su questa pagina.
              </p>
              <p className="text-[#f5e6c8]/70">
                Ti invitiamo a consultare periodicamente questa pagina per rimanere aggiornato sull'utilizzo dei cookie sul nostro sito.
              </p>
            </section>

            {/* Sezione 7 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                7. Base Normativa
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Questa Cookie Policy è redatta in conformità a:
              </p>
              <ul className="text-[#f5e6c8]/70 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Regolamento (UE) 2016/679 del Parlamento Europeo (GDPR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Direttiva 2002/58/CE (Direttiva ePrivacy) aggiornata dalla Direttiva 2009/136/CE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Provvedimento del Garante per la protezione dei dati personali dell'8 maggio 2014, n. 229</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Linee guida cookie e altri strumenti di tracciamento del 10 giugno 2021</span>
                </li>
              </ul>
            </section>

            {/* Sezione 8 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                8. Contatti
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Per domande o chiarimenti su questa Cookie Policy, puoi contattarci:
              </p>
              <div className="bg-[#3451a1]/10 border-l-4 border-[#3451a1] p-4 rounded-r-lg">
                <p className="text-[#f5e6c8] font-semibold">{siteData.name}</p>
                <p className="text-[#f5e6c8]/70 text-sm mt-1">{siteData.address.full}</p>
                <p className="text-[#f5e6c8]/70 text-sm">Email: <a href={`mailto:${siteData.contact.email}`} className="text-[#3451a1] hover:underline">{siteData.contact.email}</a></p>
                <p className="text-[#f5e6c8]/70 text-sm">Tel: <a href={`tel:${siteData.contact.phone}`} className="text-[#3451a1] hover:underline">{siteData.contact.phone}</a></p>
              </div>
            </section>

            {/* Zero Tracking Badge */}
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-green-400 font-display font-bold text-xl uppercase mb-2">Zero Tracciamento</h3>
              <p className="text-[#f5e6c8]/70 text-sm">
                Naviga tranquillo: questo sito rispetta la tua privacy e non traccia le tue attività online
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/"
              className="text-center border-2 border-[#f5e6c8]/30 text-[#f5e6c8] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#f5e6c8] hover:text-[#0a0a0a] transition-all"
            >
              Torna alla Home
            </Link>
            <Link
              to="/privacy-policy"
              className="text-center bg-[#3451a1] text-[#f5e6c8] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#4563b5] transition-all"
            >
              Leggi la Privacy Policy
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-[#f5e6c8]/10">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <img src={logo} alt="3 Smash Palermo - Logo" title="3 Smash Palermo - Smash Burger Artigianali" className="h-10 opacity-50" loading="lazy" width="40" height="40" />
            <p className="text-[#f5e6c8]/30 text-sm">
              © {new Date().getFullYear()} {siteData.name}. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm">Privacy Policy</Link>
              <Link to="/cookie-policy" onClick={() => window.scrollTo(0, 0)} className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
