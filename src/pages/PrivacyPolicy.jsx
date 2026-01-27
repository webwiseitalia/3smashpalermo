import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import siteData from '../constants/siteData';
import logo from '../assets/logo.webp';

export default function PrivacyPolicy() {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#f5e6c8] text-3xl md:text-4xl font-display font-bold uppercase">Privacy Policy</h1>
              <p className="text-[#f5e6c8]/60 text-sm">Informativa sul trattamento dei dati personali</p>
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

            {/* Sezione 1 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                1. Titolare del Trattamento
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Il Titolare del trattamento dei dati personali è:
              </p>
              <div className="bg-[#3451a1]/10 border-l-4 border-[#3451a1] p-4 rounded-r-lg">
                <p className="text-[#f5e6c8] font-semibold">{siteData.name}</p>
                <p className="text-[#f5e6c8]/70 text-sm mt-1">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {siteData.address.full}
                  </span>
                </p>
                <p className="text-[#f5e6c8]/70 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {siteData.contact.phone}
                  </span>
                </p>
                <p className="text-[#f5e6c8]/70 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {siteData.contact.email}
                  </span>
                </p>
              </div>
            </section>

            {/* Sezione 2 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                2. Dati Raccolti e Finalità del Trattamento
              </h2>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.1 Dati forniti volontariamente dall'utente</h3>
              <p className="text-[#f5e6c8]/70 mb-4">
                Tramite il modulo di contatto presente sul sito, raccogliamo i seguenti dati personali:
              </p>
              <ul className="text-[#f5e6c8]/70 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Nome e Cognome</strong> - per identificare l'interessato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Indirizzo Email</strong> - per rispondere alle richieste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Numero di Telefono</strong> (facoltativo) - per contatti telefonici</span>
                </li>
              </ul>

              <div className="bg-[#f5e6c8]/5 border border-[#f5e6c8]/10 p-4 rounded-lg mb-6">
                <p className="text-[#f5e6c8]/80 text-sm">
                  <strong className="text-[#f5e6c8]">Finalità:</strong> I dati vengono raccolti esclusivamente per:
                </p>
                <ul className="text-[#f5e6c8]/70 text-sm mt-2 space-y-1">
                  <li>• Rispondere alle richieste di preventivo</li>
                  <li>• Fornire informazioni sui nostri servizi</li>
                  <li>• Gestire la relazione commerciale</li>
                </ul>
              </div>

              <h3 className="text-[#f5e6c8] text-lg font-semibold mb-3">2.2 Base giuridica del trattamento</h3>
              <p className="text-[#f5e6c8]/70">
                Il trattamento è basato sul <strong className="text-[#f5e6c8]">consenso esplicito</strong> dell'interessato (Art. 6, par. 1, lett. a del GDPR), fornito attraverso l'invio del modulo di contatto, e sulla <strong className="text-[#f5e6c8]">esecuzione di misure precontrattuali</strong> (Art. 6, par. 1, lett. b del GDPR).
              </p>
            </section>

            {/* Sezione 3 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                3. Modalità di Trattamento
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                I dati personali sono trattati con strumenti informatici e/o telematici, con logiche strettamente correlate alle finalità indicate e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati stessi.
              </p>
              <p className="text-[#f5e6c8]/70">
                Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o divulgazione.
              </p>
            </section>

            {/* Sezione 4 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                4. Conservazione dei Dati
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                I dati personali vengono conservati per il tempo strettamente necessario a gestire le richieste ricevute e le relazioni commerciali conseguenti:
              </p>
              <ul className="text-[#f5e6c8]/70 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Richieste di preventivo:</strong> I dati vengono conservati per 24 mesi dalla richiesta, salvo instaurazione di rapporto contrattuale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Rapporti contrattuali:</strong> I dati vengono conservati per 10 anni in conformità agli obblighi fiscali e contabili</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Richieste di informazioni:</strong> I dati vengono conservati per 12 mesi dalla risposta</span>
                </li>
              </ul>
            </section>

            {/* Sezione 5 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                5. Comunicazione e Diffusione dei Dati
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                I dati personali non vengono diffusi e possono essere comunicati esclusivamente a:
              </p>
              <ul className="text-[#f5e6c8]/70 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Personale interno autorizzato al trattamento (titolare e collaboratori)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Professionisti esterni (commercialista, consulenti legali) vincolati da obblighi di riservatezza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span>Autorità competenti in caso di richieste legittime previste per legge</span>
                </li>
              </ul>

              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <p className="text-red-400 font-semibold text-sm mb-2">I tuoi dati NON verranno MAI:</p>
                <ul className="text-[#f5e6c8]/70 text-sm space-y-1">
                  <li>• Venduti a terze parti</li>
                  <li>• Condivisi con scopi di marketing</li>
                  <li>• Utilizzati per invio di newsletter non richieste</li>
                  <li>• Trasferiti fuori dall'Unione Europea</li>
                </ul>
              </div>
            </section>

            {/* Sezione 6 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                6. Diritti dell'Interessato
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">In qualità di interessato, hai il diritto di:</p>
              <ul className="text-[#f5e6c8]/70 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Accesso (Art. 15 GDPR):</strong> Ottenere conferma dell'esistenza dei tuoi dati e riceverne copia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Rettifica (Art. 16 GDPR):</strong> Richiedere la correzione di dati inesatti o incompleti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Cancellazione (Art. 17 GDPR):</strong> Richiedere la cancellazione dei dati ("diritto all'oblio")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Limitazione (Art. 18 GDPR):</strong> Richiedere la limitazione del trattamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Portabilità (Art. 20 GDPR):</strong> Ricevere i dati in formato strutturato e trasferirli ad altro titolare</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Opposizione (Art. 21 GDPR):</strong> Opporti al trattamento dei dati personali</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3451a1]">•</span>
                  <span><strong className="text-[#f5e6c8]">Revoca del consenso:</strong> Revocare il consenso in qualsiasi momento</span>
                </li>
              </ul>

              <div className="bg-[#3451a1]/10 border border-[#3451a1]/30 p-4 rounded-lg">
                <p className="text-[#f5e6c8] font-semibold text-sm mb-2">Come esercitare i tuoi diritti:</p>
                <p className="text-[#f5e6c8]/70 text-sm">
                  Puoi esercitare i tuoi diritti inviando una richiesta via email a <a href={`mailto:${siteData.contact.email}`} className="text-[#3451a1] hover:underline">{siteData.contact.email}</a> o tramite raccomandata A/R all'indirizzo: {siteData.address.full}.
                </p>
                <p className="text-[#f5e6c8]/70 text-sm mt-2">
                  Risponderemo entro <strong className="text-[#f5e6c8]">30 giorni</strong> dalla ricezione della richiesta.
                </p>
              </div>
            </section>

            {/* Sezione 7 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                7. Diritto di Reclamo
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Hai il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali se ritieni che il trattamento dei tuoi dati violi il GDPR.
              </p>
              <div className="bg-[#f5e6c8]/5 border border-[#f5e6c8]/10 p-4 rounded-lg">
                <p className="text-[#f5e6c8] font-semibold text-sm">Garante per la protezione dei dati personali:</p>
                <p className="text-[#f5e6c8]/70 text-sm">Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#3451a1] hover:underline">www.garanteprivacy.it</a></p>
                <p className="text-[#f5e6c8]/70 text-sm">Email: garante@gpdp.it</p>
                <p className="text-[#f5e6c8]/70 text-sm">PEC: protocollo@pec.gpdp.it</p>
              </div>
            </section>

            {/* Sezione 8 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                8. Cookie e Tecnologie di Tracciamento
              </h2>
              <p className="text-[#f5e6c8]/70">
                Il nostro sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Per maggiori informazioni, consulta la nostra <Link to="/cookie-policy" className="text-[#3451a1] hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            {/* Sezione 9 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                9. Modifiche alla Privacy Policy
              </h2>
              <p className="text-[#f5e6c8]/70">
                Ci riserviamo il diritto di modificare o aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a consultare periodicamente questa pagina per essere sempre informato sulle nostre politiche di privacy.
              </p>
            </section>

            {/* Sezione 10 */}
            <section className="mb-10">
              <h2 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-4">
                10. Contatti
              </h2>
              <p className="text-[#f5e6c8]/70 mb-4">
                Per qualsiasi domanda o richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci:
              </p>
              <div className="flex flex-col gap-3">
                <a href={`mailto:${siteData.contact.email}`} className="inline-flex items-center gap-3 text-[#f5e6c8]/70 hover:text-[#3451a1] transition-colors">
                  <div className="w-10 h-10 bg-[#3451a1]/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#3451a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {siteData.contact.email}
                </a>
                <a href={`tel:${siteData.contact.phone}`} className="inline-flex items-center gap-3 text-[#f5e6c8]/70 hover:text-[#3451a1] transition-colors">
                  <div className="w-10 h-10 bg-[#3451a1]/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#3451a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  {siteData.contact.phone}
                </a>
              </div>
            </section>

            {/* Footer nota */}
            <div className="border-t border-[#f5e6c8]/10 pt-8 mt-10">
              <p className="text-[#f5e6c8]/40 text-xs text-center">
                Questa Privacy Policy è conforme al Regolamento (UE) 2016/679 (GDPR) e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018
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
              to="/cookie-policy"
              className="text-center bg-[#3451a1] text-[#f5e6c8] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#4563b5] transition-all"
            >
              Leggi la Cookie Policy
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
