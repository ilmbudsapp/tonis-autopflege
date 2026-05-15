import fs from "fs";

const p = new URL("../src/components/layout/SiteFooter.tsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");

const articleStart = s.indexOf('<article className="space-y-5');
const articleEnd = s.indexOf("</article>", articleStart) + "</article>".length;

const fixed = `        <article className="space-y-5 rounded-2xl border border-[#c9a227]/20 bg-black/35 px-4 py-8 shadow-[inset_0_1px_0_rgba(201,162,39,0.06)] md:px-8">
          <div className="flex gap-4">
            <LucideInGold Icon={Building2} />
            <motion.div className="min-w-0 text-left">
              <p className="text-base font-bold text-white" style={{ fontFamily: fontDisplay }}>
                {FIRMENFOOTER.firma}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{FIRMENFOOTER.inhaber}</p>
              <p className="text-sm font-medium text-[#c9a227]/90">{FIRMENFOOTER.branche}</p>
            </motion.div>
          </motion.div>

          <motion.div className="flex gap-4">
            <LucideInGold Icon={MapPin} />
            <motion.div className="min-w-0 text-left text-sm leading-relaxed text-zinc-300">
              <p className="font-medium text-zinc-200">{FIRMENFOOTER.strasse}</p>
              <p>{FIRMENFOOTER.ort}</p>
            </motion.div>
          </motion.div>

          <motion.div className="flex gap-4">
            <LucideInGold Icon={Phone} />
            <motion.div className="min-w-0 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefon</p>
              <a
                href={FIRMENFOOTER.telefonHref}
                className="text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
              >
                {FIRMENFOOTER.telefonLabel}
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="flex gap-4">
            <LucideInGold Icon={Mail} />
            <motion.div className="min-w-0 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">E-Mail</p>
              <a
                href={\`mailto:\${FIRMENFOOTER.email}\`}
                className="break-all text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
              >
                {FIRMENFOOTER.email}
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="border-t border-white/[0.06] pt-6">
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Social Media
            </p>
            <motion.div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <a
                href={FIRMENFOOTER.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <SvgFacebookGold className="h-5 w-5" />
                </GoldIconFrame>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  Facebook · {FIRMENFOOTER.facebook.label}
                </span>
              </a>
              <a
                href={FIRMENFOOTER.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <SvgInstagramGold className="h-5 w-5" />
                </GoldIconFrame>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  Instagram · {FIRMENFOOTER.instagram.label}
                </span>
              </a>
              <a
                href={FIRMENFOOTER.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <motion.div className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <LucideInGold Icon={Music2} />
                </motion.div>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  TikTok · {FIRMENFOOTER.tiktok.label}
                </span>
              </a>
            </motion.div>
          </motion.div>
        </article>`;

const corrected = fixed.replaceAll("<motion.div", "<div").replaceAll("</motion.div>", "</div>");

s = s.slice(0, articleStart) + corrected + s.slice(articleEnd);
fs.writeFileSync(p, s);
console.log("SiteFooter article fixed");
