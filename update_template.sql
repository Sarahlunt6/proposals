-- Run this in your Supabase SQL Editor to update the template
-- This will replace the active template with the new design

UPDATE template
SET html = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strategic Proposal | [PREPARED_FOR_COMPANY]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            navy: ''#0f2042'',
                            navyMid: ''#1a3260'',
                            navyLight: ''#243d75'',
                            gold: ''#c9a84c'',
                            goldLight: ''#e8c96e'',
                            cream: ''#faf7f0'',
                            creamDark: ''#f0ead8'',
                            red: ''#b83232'',
                            green: ''#1d6b4f'',
                        }
                    },
                    fontFamily: {
                        sans: [''DM Sans'', ''sans-serif''],
                        serif: [''Playfair Display'', ''serif''],
                    }
                }
            }
        }
    </script>

    <style>
        [x-cloak] { display: none !important; }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Loom embed */
        .loom-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(15,32,66,0.25);
            border: 3px solid rgba(201,168,76,0.3);
        }
        .loom-container iframe {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
        }

        /* Check list */
        .check-list li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .check-list li::before {
            content: ''✓'';
            position: absolute;
            left: 0;
            color: #1d6b4f;
            font-weight: bold;
        }

        /* Funnel animations */
        .funnel-stage {
            opacity: 0;
            transform: translateY(16px);
            transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .funnel-stage.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Leak pulse */
        @keyframes leakPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        .leak-icon { animation: leakPulse 2.5s ease-in-out infinite; }

        /* Plug check */
        @keyframes plugPop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        .plug-check { animation: plugPop 0.4s ease-out forwards; }

        /* Referral loop dash animation */
        @keyframes dashFlow {
            to { stroke-dashoffset: -20; }
        }
        .dash-animate { animation: dashFlow 1.2s linear infinite; }

        /* Gold shimmer for CTA */
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .shimmer-btn {
            background: linear-gradient(90deg, #c9a84c 0%, #e8c96e 40%, #fff5d6 50%, #e8c96e 60%, #c9a84c 100%);
            background-size: 200% auto;
            animation: shimmer 3s ease-in-out infinite;
        }

        /* Stat counter */
        .stat-highlight {
            background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02));
            border: 1px solid rgba(201,168,76,0.15);
        }

        /* Card hover lift */
        .card-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-lift:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(15,32,66,0.12);
        }
    </style>
</head>

<body class="bg-brand-cream text-brand-navy antialiased" x-data="{ currentLayer: ''inside'', showFunnel: ''typical'' }">

    <!-- ════════════════════════════════════════════ -->
    <!-- STICKY TOP BAR                              -->
    <!-- ════════════════════════════════════════════ -->
    <div class="bg-brand-navy text-white py-3 px-4 text-center text-sm font-medium border-b-2 border-brand-gold sticky top-0 z-50">
        <div class="max-w-7xl mx-auto flex justify-center items-center gap-2">
            <i class="fas fa-clock text-brand-gold"></i>
            <span>Proposal for <strong>[PREPARED_FOR_COMPANY]</strong> · Bonus expires <strong>[BONUS_EXPIRATION_DATE]</strong></span>
        </div>
    </div>

    <!-- ════════════════════════════════════════════ -->
    <!-- NAV                                         -->
    <!-- ════════════════════════════════════════════ -->
    <nav class="absolute w-full z-20 top-14">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center py-4">
            <img src="https://assets.cdn.filesafe.space/vmzEamyXqsd9g2bEFYGu/media/67660cd505c6f02139705a90.svg" alt="Opkie" class="h-8 w-auto opacity-90">
        </div>
    </nav>

    <!-- ════════════════════════════════════════════ -->
    <!-- HERO                                        -->
    <!-- ════════════════════════════════════════════ -->
    <header class="relative bg-brand-navy text-white overflow-hidden pb-28 pt-36">
        <!-- Decorative circles -->
        <div class="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-brand-gold/5"></div>
        <div class="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-brand-goldLight/5"></div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div class="grid md:grid-cols-2 gap-14 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 border border-brand-gold/40 bg-brand-navy/60 px-4 py-1.5 rounded-full text-brand-gold text-sm font-semibold mb-8 backdrop-blur-sm">
                        <i class="fas fa-check-circle"></i> Prepared for [PREPARED_FOR_COMPANY]
                    </div>

                    <h1 class="text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold mb-6 leading-[1.15]">
                        Your Practice Should Be Performing <em class="text-brand-goldLight italic">Better Than This.</em>
                    </h1>

                    <p class="text-lg text-gray-300 mb-8 font-light leading-relaxed max-w-lg">
                        Stop looking for the right patients in the wrong places. Play to your strengths and get found in better ways.
                    </p>

                    <div class="flex flex-col gap-3 mb-10">
                        <div class="flex items-start gap-3">
                            <div class="mt-1 bg-brand-red/20 border border-brand-red/30 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                <i class="fas fa-times text-brand-red text-xs"></i>
                            </div>
                            <p class="text-sm text-gray-300">Don''t try to out-spend the chains in saturated marketing channels.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="mt-1 bg-brand-green/20 border border-brand-green/30 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                <i class="fas fa-check text-brand-green text-xs"></i>
                            </div>
                            <p class="text-sm text-gray-300">Diversify into less-competitive local channels where you have the unfair advantage.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="mt-1 bg-brand-green/20 border border-brand-green/30 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                <i class="fas fa-check text-brand-green text-xs"></i>
                            </div>
                            <p class="text-sm text-gray-300">Attract quality patients who value <em>you</em> — not just the lowest price.</p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <a href="#offer" class="inline-block px-8 py-4 bg-brand-gold text-brand-navy rounded font-bold shadow-lg hover:bg-brand-goldLight transition transform hover:-translate-y-0.5">
                            View The Strategy &amp; Offer
                        </a>
                        <div class="flex items-center gap-3 text-sm text-gray-400">
                            <img src="https://ui-avatars.com/api/?name=[PREPARED_BY_INITIALS]&background=c9a84c&color=0f2042&bold=true" class="w-10 h-10 rounded-full border-2 border-brand-gold/40">
                            <div>
                                <p class="font-semibold text-white">[PREPARED_BY_NAME]</p>
                                <p class="text-xs">[PREPARED_BY_PHONE]</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loom Video -->
                <div>
                    <div class="loom-container bg-black">
                        <iframe src="https://www.loom.com/embed/[LOOM_VIDEO_ID]" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                    <p class="text-center text-xs text-gray-500 mt-3">
                        <i class="fas fa-play-circle mr-1"></i> A personal message for [PREPARED_FOR_FIRST_NAME]
                    </p>
                </div>
            </div>
        </div>
    </header>

    <!-- ════════════════════════════════════════════ -->
    <!-- STAT CARDS (overlapping hero)               -->
    <!-- ════════════════════════════════════════════ -->
    <section class="relative -mt-16 z-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-xl p-8 border-t-4 border-brand-gold">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-brand-navy">Why The Old Playbook Is Broken</h2>
                <p class="text-slate-500 text-sm mt-1">The data paints a clear but unfortunate picture for independent dentists.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div class="text-center py-4">
                    <div class="text-brand-red text-5xl font-bold mb-2 font-serif">-16%</div>
                    <div class="text-lg font-bold text-brand-navy">Avg Dentist Income</div>
                    <p class="text-slate-500 text-sm mt-2 px-4">Dropped $38k from 2022–2025. The only profession moving backwards.</p>
                </div>
                <div class="text-center py-4">
                    <div class="text-brand-green text-5xl font-bold mb-2 font-serif">+47%</div>
                    <div class="text-lg font-bold text-brand-navy">Premium Dental Demand</div>
                    <p class="text-slate-500 text-sm mt-2 px-4">Patient spending on implants, veneers, and Invisalign is surging.</p>
                </div>
                <div class="text-center py-4">
                    <div class="text-brand-navy text-5xl font-bold mb-2 font-serif">15%</div>
                    <div class="text-lg font-bold text-brand-navy">The Google Trap</div>
                    <p class="text-slate-500 text-sm mt-2 px-4">Google &amp; Ads are only 15–25% of new patients. Stop relying on it alone.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- THE MIRROR — Problem Framing                -->
    <!-- ════════════════════════════════════════════ -->
    <section class="py-20 bg-brand-cream">
        <div class="max-w-3xl mx-auto px-6 lg:px-8">
            <div class="border-l-4 border-brand-gold bg-white rounded-r-lg px-8 py-6 mb-8 shadow-sm">
                <p class="font-serif text-lg italic text-brand-navy leading-relaxed">
                    "[AI_MIRROR_QUOTE]"
                </p>
            </div>
            <p class="text-slate-600 leading-relaxed mb-4">
                This is what we hear most often. And it makes sense — because the real causes of practice underperformance are almost never obvious from the inside. They fall into two categories almost no one looks at simultaneously: <strong class="text-brand-navy">an incomplete approach to attracting patients</strong> and <strong class="text-brand-navy">quiet leaks that reduce the value of every patient who does come in.</strong>
            </p>
            <p class="text-slate-600 leading-relaxed">
                Most practices are aware of one or neither. The ones pulling ahead have addressed both.
            </p>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- FUNNEL COMPARISON — Interactive              -->
    <!-- ════════════════════════════════════════════ -->
    <section class="py-20 bg-white border-y border-brand-creamDark" x-data="{ view: ''typical'' }">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-6">
                <p class="text-xs font-bold uppercase tracking-[3px] text-brand-gold mb-2">Two approaches. One clear difference.</p>
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-brand-navy mb-3">Where Your Revenue Actually Goes</h2>
                <p class="text-slate-500 max-w-xl mx-auto">Toggle between the typical approach and the full-funnel model to see why most practices leave money on the table.</p>
            </div>

            <!-- Toggle -->
            <div class="flex justify-center gap-3 mb-12">
                <button @click="view = ''typical''"
                    :class="view === ''typical'' ? ''bg-brand-red/10 text-brand-red border-brand-red/30 shadow-sm'' : ''bg-white text-slate-400 border-slate-200 hover:border-slate-300''"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition">
                    <i class="fas fa-exclamation-triangle mr-1.5"></i> Typical Approach
                </button>
                <button @click="view = ''full''"
                    :class="view === ''full'' ? ''bg-brand-green/10 text-brand-green border-brand-green/30 shadow-sm'' : ''bg-white text-slate-400 border-slate-200 hover:border-slate-300''"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition">
                    <i class="fas fa-check-circle mr-1.5"></i> Full-Funnel Approach
                </button>
            </div>

            <!-- TYPICAL FUNNEL -->
            <div x-show="view === ''typical''" x-transition.opacity.duration.400ms class="max-w-2xl mx-auto">
                <div class="grid md:grid-cols-2 gap-10 items-start">
                    <!-- SVG Funnel -->
                    <div class="flex justify-center">
                        <svg viewBox="0 0 280 420" width="100%" class="max-w-[260px]" xmlns="http://www.w3.org/2000/svg">
                            <!-- Channel badge -->
                            <text x="140" y="16" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="#8a9bb0" letter-spacing="1.5">ONE CHANNEL IN</text>
                            <rect x="80" y="24" width="120" height="24" rx="12" fill="rgba(184,50,50,0.10)" stroke="rgba(184,50,50,0.28)" stroke-width="1"/>
                            <text x="140" y="40" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="10" font-weight="600" fill="#b83232">Google Ads + SEO</text>

                            <!-- Stage 1: Top -->
                            <path d="M60 58 L220 58 L178 130 L102 130 Z" fill="rgba(184,50,50,0.09)" stroke="rgba(184,50,50,0.25)" stroke-width="1.5"/>
                            <text x="140" y="90" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" fill="#b83232" font-weight="600">Limited search volume</text>
                            <text x="140" y="105" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="rgba(184,50,50,0.6)">Rising CPCs. DSO competition.</text>

                            <!-- Leak line -->
                            <line x1="60" y1="130" x2="220" y2="130" stroke="rgba(184,50,50,0.18)" stroke-width="1" stroke-dasharray="4,3"/>

                            <!-- Stage 2 -->
                            <path d="M102 130 L178 130 L162 182 L118 182 Z" fill="rgba(184,50,50,0.07)" stroke="rgba(184,50,50,0.18)" stroke-width="1.5"/>
                            <text x="140" y="161" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#b83232" font-weight="600">Poor call conversion</text>
                            <!-- Leak arrow -->
                            <text x="188" y="160" font-family="DM Sans,sans-serif" font-size="10" fill="#b83232" class="leak-icon">→ leak</text>

                            <line x1="75" y1="182" x2="205" y2="182" stroke="rgba(184,50,50,0.14)" stroke-width="1" stroke-dasharray="4,3"/>

                            <!-- Stage 3 -->
                            <path d="M118 182 L162 182 L152 230 L128 230 Z" fill="rgba(184,50,50,0.06)" stroke="rgba(184,50,50,0.16)" stroke-width="1.5"/>
                            <text x="140" y="211" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#b83232" font-weight="600">Low case acceptance</text>
                            <text x="82" y="210" text-anchor="end" font-family="DM Sans,sans-serif" font-size="10" fill="#b83232" class="leak-icon">leak ←</text>

                            <line x1="90" y1="230" x2="190" y2="230" stroke="rgba(184,50,50,0.12)" stroke-width="1" stroke-dasharray="4,3"/>

                            <!-- Stage 4 -->
                            <path d="M128 230 L152 230 L145 270 L135 270 Z" fill="rgba(184,50,50,0.05)" stroke="rgba(184,50,50,0.14)" stroke-width="1.5"/>
                            <text x="140" y="255" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#b83232" font-weight="600">Patient attrition</text>
                            <text x="188" y="255" font-family="DM Sans,sans-serif" font-size="10" fill="#b83232" class="leak-icon">→ leak</text>

                            <!-- Narrow neck -->
                            <path d="M135 270 L145 270 L142 300 L138 300 Z" fill="rgba(184,50,50,0.06)" stroke="rgba(184,50,50,0.16)" stroke-width="1.5"/>

                            <!-- Tiny profit -->
                            <rect x="120" y="308" width="40" height="24" rx="4" fill="rgba(184,50,50,0.12)" stroke="rgba(184,50,50,0.30)" stroke-width="1.5"/>
                            <text x="140" y="324" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" font-weight="700" fill="#b83232">PROFIT</text>

                            <text x="140" y="360" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="#b83232" opacity="0.5">No referral system.</text>
                            <text x="140" y="374" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="#b83232" opacity="0.5">Dormant patients ignored.</text>
                            <text x="140" y="388" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="#b83232" opacity="0.5">Results reset every month.</text>
                        </svg>
                    </div>

                    <!-- Problem bullets -->
                    <div class="space-y-4">
                        <h3 class="font-serif text-xl font-bold text-brand-navy">The Typical Approach</h3>
                        <p class="text-sm text-slate-500 leading-relaxed">One narrow channel in. Leaks at every stage. Limited profit with no compounding.</p>

                        <div class="space-y-3 mt-6">
                            <div class="flex items-start gap-3 bg-brand-red/5 border border-brand-red/15 rounded-lg p-3">
                                <span class="text-brand-red font-bold text-sm mt-0.5">✗</span>
                                <p class="text-sm text-slate-600">One channel, one ceiling</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-red/5 border border-brand-red/15 rounded-lg p-3">
                                <span class="text-brand-red font-bold text-sm mt-0.5">✗</span>
                                <p class="text-sm text-slate-600">Rising ad costs, shrinking returns</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-red/5 border border-brand-red/15 rounded-lg p-3">
                                <span class="text-brand-red font-bold text-sm mt-0.5">✗</span>
                                <p class="text-sm text-slate-600">Patient value left on the table</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-red/5 border border-brand-red/15 rounded-lg p-3">
                                <span class="text-brand-red font-bold text-sm mt-0.5">✗</span>
                                <p class="text-sm text-slate-600">Results reset every month — no compounding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FULL FUNNEL -->
            <div x-show="view === ''full''" x-transition.opacity.duration.400ms x-cloak class="max-w-2xl mx-auto">
                <div class="grid md:grid-cols-2 gap-10 items-start">
                    <!-- SVG Funnel -->
                    <div class="flex justify-center">
                        <svg viewBox="0 0 280 440" width="100%" class="max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
                            <!-- Multiple channel badges -->
                            <text x="140" y="14" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="#8a9bb0" letter-spacing="1.5">MULTIPLE CHANNELS IN</text>

                            <rect x="4" y="22" width="62" height="22" rx="11" fill="rgba(29,107,79,0.10)" stroke="rgba(29,107,79,0.28)" stroke-width="1"/>
                            <text x="35" y="37" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" font-weight="600" fill="#1d6b4f">AI Digital</text>

                            <rect x="72" y="22" width="76" height="22" rx="11" fill="rgba(29,107,79,0.10)" stroke="rgba(29,107,79,0.28)" stroke-width="1"/>
                            <text x="110" y="37" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" font-weight="600" fill="#1d6b4f">Word of Mouth</text>

                            <rect x="154" y="22" width="72" height="22" rx="11" fill="rgba(29,107,79,0.10)" stroke="rgba(29,107,79,0.28)" stroke-width="1"/>
                            <text x="190" y="37" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" font-weight="600" fill="#1d6b4f">Community</text>

                            <rect x="232" y="22" width="44" height="22" rx="11" fill="rgba(29,107,79,0.10)" stroke="rgba(29,107,79,0.28)" stroke-width="1"/>
                            <text x="254" y="37" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7.5" font-weight="600" fill="#1d6b4f">Other</text>

                            <!-- Wide funnel top -->
                            <path d="M8 54 L272 54 L194 128 L86 128 Z" fill="rgba(29,107,79,0.09)" stroke="rgba(29,107,79,0.25)" stroke-width="1.5"/>
                            <text x="140" y="84" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" fill="#1d6b4f" font-weight="600">Full market coverage</text>
                            <text x="140" y="99" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="rgba(29,107,79,0.7)">Digital + word of mouth + community</text>

                            <!-- Stage 2 plugged -->
                            <path d="M86 128 L194 128 L176 180 L104 180 Z" fill="rgba(29,107,79,0.08)" stroke="rgba(29,107,79,0.22)" stroke-width="1.5"/>
                            <circle cx="224" cy="154" r="10" fill="rgba(29,107,79,0.12)" stroke="rgba(29,107,79,0.3)" stroke-width="1"/>
                            <text x="224" y="158" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#1d6b4f">✓</text>
                            <text x="140" y="150" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" font-weight="600">Conversion optimized</text>
                            <text x="140" y="165" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="rgba(29,107,79,0.65)">Front desk + call systems</text>

                            <!-- Stage 3 -->
                            <path d="M104 180 L176 180 L162 228 L118 228 Z" fill="rgba(29,107,79,0.07)" stroke="rgba(29,107,79,0.20)" stroke-width="1.5"/>
                            <circle cx="56" cy="204" r="10" fill="rgba(29,107,79,0.12)" stroke="rgba(29,107,79,0.3)" stroke-width="1"/>
                            <text x="56" y="208" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#1d6b4f">✓</text>
                            <text x="140" y="200" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" font-weight="600">Case acceptance improved</text>
                            <text x="140" y="215" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="rgba(29,107,79,0.65)">Presentation + follow-up</text>

                            <!-- Stage 4 -->
                            <path d="M118 228 L162 228 L150 272 L130 272 Z" fill="rgba(29,107,79,0.07)" stroke="rgba(29,107,79,0.18)" stroke-width="1.5"/>
                            <circle cx="224" cy="250" r="10" fill="rgba(29,107,79,0.12)" stroke="rgba(29,107,79,0.3)" stroke-width="1"/>
                            <text x="224" y="254" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#1d6b4f">✓</text>
                            <text x="140" y="248" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" font-weight="600">Retention infrastructure</text>
                            <text x="140" y="263" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="rgba(29,107,79,0.65)">Patients stay, refer, return</text>

                            <!-- Wide neck into profit -->
                            <path d="M130 272 L150 272 L164 308 L116 308 Z" fill="rgba(29,107,79,0.08)" stroke="rgba(29,107,79,0.20)" stroke-width="1.5"/>

                            <!-- Large profit box -->
                            <rect x="80" y="316" width="120" height="34" rx="5" fill="rgba(29,107,79,0.15)" stroke="rgba(29,107,79,0.38)" stroke-width="1.5"/>
                            <text x="140" y="330" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="#1d6b4f">PROFIT</text>
                            <text x="140" y="344" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="#1d6b4f" opacity="0.8">compounding &amp; growing</text>

                            <!-- Referral loop (left) -->
                            <path d="M118 295 Q64 305 32 250 Q18 200 22 130 Q24 80 36 66" stroke="#1d6b4f" stroke-width="2.5" fill="none" opacity="0.7" stroke-dasharray="7,4" class="dash-animate"/>
                            <rect x="6" y="50" width="76" height="18" rx="9" fill="#1d6b4f" opacity="0.85"/>
                            <text x="44" y="62" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7.5" font-weight="700" fill="white">+ Referral Engine</text>

                            <!-- Reactivation loop (right) -->
                            <path d="M162 295 Q216 305 248 250 Q262 200 258 130 Q256 80 244 66" stroke="#1d6b4f" stroke-width="2.5" fill="none" opacity="0.5" stroke-dasharray="7,4" class="dash-animate"/>
                            <rect x="198" y="50" width="78" height="18" rx="9" fill="#1d6b4f" opacity="0.7"/>
                            <text x="237" y="62" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7.5" font-weight="700" fill="white">+ Reactivation</text>

                            <text x="140" y="380" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" opacity="0.85">Referrals &amp; reactivation re-enter the funnel</text>
                            <text x="140" y="396" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" opacity="0.85">Every stage compounds the next</text>
                            <text x="140" y="412" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8.5" fill="#1d6b4f" opacity="0.85">Each month builds on the last</text>
                        </svg>
                    </div>

                    <!-- Benefit bullets -->
                    <div class="space-y-4">
                        <h3 class="font-serif text-xl font-bold text-brand-navy">The Full-Funnel Approach</h3>
                        <p class="text-sm text-slate-500 leading-relaxed">Multiple channels in. Leaks plugged. Referrals and reactivation compound profit every month.</p>

                        <div class="space-y-3 mt-6">
                            <div class="flex items-start gap-3 bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                                <span class="text-brand-green font-bold text-sm mt-0.5">✓</span>
                                <p class="text-sm text-slate-600">Multiple channels — no single ceiling</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                                <span class="text-brand-green font-bold text-sm mt-0.5">✓</span>
                                <p class="text-sm text-slate-600">Lower acquisition cost over time</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                                <span class="text-brand-green font-bold text-sm mt-0.5">✓</span>
                                <p class="text-sm text-slate-600">Full value extracted from every patient</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                                <span class="text-brand-green font-bold text-sm mt-0.5">✓</span>
                                <p class="text-sm text-slate-600">Results compound — each month builds on the last</p>
                            </div>
                            <div class="flex items-start gap-3 bg-brand-green/5 border border-brand-green/15 rounded-lg p-3">
                                <span class="text-brand-green font-bold text-sm mt-0.5">✓</span>
                                <p class="text-sm text-slate-600">DSO-proof — built on relationships, not spend</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- DIVIDER STATEMENT                           -->
    <!-- ════════════════════════════════════════════ -->
    <div class="bg-brand-navy py-10 px-6 text-center">
        <p class="font-serif text-xl md:text-2xl italic text-white max-w-2xl mx-auto leading-relaxed">
            Getting more leads is only half the battle. <span class="text-brand-goldLight not-italic font-bold">The practices winning also plug the leaks to maximize profit.</span>
        </p>
    </div>

    <!-- ════════════════════════════════════════════ -->
    <!-- THE 3-LAYER SYSTEM                          -->
    <!-- ════════════════════════════════════════════ -->
    <section id="logic" class="py-20 bg-brand-cream">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-14">
                <p class="text-xs font-bold uppercase tracking-[3px] text-brand-gold mb-2">How it works</p>
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-brand-navy mb-4">Inside-Out Patient Acquisition</h2>
                <p class="text-slate-500 max-w-2xl mx-auto">
                    Corporate dentists can out-spend you, but they can''t out-relate you. We help you build assets in the channels where you have the unfair advantage.
                </p>
            </div>

            <div class="grid lg:grid-cols-12 gap-8">
                <!-- Tabs -->
                <div class="lg:col-span-4 flex flex-col gap-3">
                    <button @click="currentLayer = ''inside''"
                        :class="currentLayer === ''inside'' ? ''bg-brand-navy text-white shadow-lg border-l-[6px] border-brand-gold'' : ''bg-white text-slate-500 hover:bg-slate-50 border border-slate-200''"
                        class="p-5 rounded-r-lg text-left transition-all duration-200">
                        <span class="text-[10px] uppercase tracking-widest opacity-60 block mb-1">Layer 1</span>
                        <span class="text-lg font-bold block">The Inside Layer</span>
                        <span class="text-xs opacity-60">Patient value, referrals &amp; retention</span>
                    </button>

                    <button @click="currentLayer = ''local''"
                        :class="currentLayer === ''local'' ? ''bg-brand-navy text-white shadow-lg border-l-[6px] border-brand-gold'' : ''bg-white text-slate-500 hover:bg-slate-50 border border-slate-200''"
                        class="p-5 rounded-r-lg text-left transition-all duration-200">
                        <span class="text-[10px] uppercase tracking-widest opacity-60 block mb-1">Layer 2</span>
                        <span class="text-lg font-bold block">The Local Layer</span>
                        <span class="text-xs opacity-60">Community authority &amp; partnerships</span>
                    </button>

                    <button @click="currentLayer = ''digital''"
                        :class="currentLayer === ''digital'' ? ''bg-brand-navy text-white shadow-lg border-l-[6px] border-brand-gold'' : ''bg-white text-slate-500 hover:bg-slate-50 border border-slate-200''"
                        class="p-5 rounded-r-lg text-left transition-all duration-200">
                        <span class="text-[10px] uppercase tracking-widest opacity-60 block mb-1">Layer 3</span>
                        <span class="text-lg font-bold block">The Digital Layer</span>
                        <span class="text-xs opacity-60">AI-powered online visibility</span>
                    </button>
                </div>

                <!-- Content panels -->
                <div class="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm min-h-[440px]">

                    <!-- INSIDE -->
                    <div x-show="currentLayer === ''inside''" x-transition.opacity.duration.300ms>
                        <div class="inline-block bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-full text-xs font-bold mb-4">INTERNAL</div>
                        <h3 class="text-2xl font-serif font-bold text-brand-navy mb-3">Patient Value, Leverage &amp; Retention</h3>
                        <p class="text-slate-500 mb-6">Strategies and systems that maximize every patient''s value, drive referrals, and stop attrition. This layer produces the fastest ROI.</p>

                        <div class="grid md:grid-cols-2 gap-5">
                            <div class="bg-brand-cream p-5 rounded-lg">
                                <h4 class="font-bold text-brand-navy mb-3 text-sm"><i class="fas fa-cogs text-brand-gold mr-2"></i> Tangible Deliverables</h4>
                                <ul class="text-sm text-slate-600 space-y-2 check-list">
                                    <li><strong>Practice Identity Clarity:</strong> Genuine differentiation</li>
                                    <li><strong>Reactivation Campaigns:</strong> Wake up your dormant patient base</li>
                                    <li><strong>Referral Automation:</strong> Systematic, not random</li>
                                    <li><strong>Treatment Acceptance Systems:</strong> Increase case close rate</li>
                                    <li><strong>Call Tracking &amp; Coaching:</strong> Recorded calls with feedback loops</li>
                                </ul>
                            </div>
                            <div class="bg-brand-navy p-5 rounded-lg text-white">
                                <h4 class="font-bold text-brand-gold mb-3 text-sm"><i class="fas fa-chart-line mr-2"></i> The Outcome</h4>
                                <p class="text-sm leading-relaxed opacity-90">Stop the "leaky bucket." Get more value from the patients you already have — before spending a dime on ads.</p>
                                <div class="mt-4 pt-4 border-t border-white/10">
                                    <p class="text-[10px] uppercase tracking-widest text-brand-gold/70 font-bold">Includes</p>
                                    <p class="text-sm mt-1">Patient journey mapping &amp; competitive audit</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- LOCAL -->
                    <div x-show="currentLayer === ''local''" x-transition.opacity.duration.300ms x-cloak>
                        <div class="inline-block bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-full text-xs font-bold mb-4">LOCAL</div>
                        <h3 class="text-2xl font-serif font-bold text-brand-navy mb-3">Community Authority Infrastructure</h3>
                        <p class="text-slate-500 mb-6">Become the obvious choice through strategic relationships in your 1–3 mile radius.</p>

                        <div class="grid md:grid-cols-2 gap-5">
                            <div class="bg-brand-cream p-5 rounded-lg">
                                <h4 class="font-bold text-brand-navy mb-3 text-sm"><i class="fas fa-handshake text-brand-gold mr-2"></i> Tangible Deliverables</h4>
                                <ul class="text-sm text-slate-600 space-y-2 check-list">
                                    <li><strong>Local Networking:</strong> Strategic B2B referral paths</li>
                                    <li><strong>Hyper-Local Outreach:</strong> Opportunities unique to [PREPARED_FOR_CITY]</li>
                                    <li><strong>Organization Sponsorships:</strong> High-visibility partnerships</li>
                                    <li><strong>Community Roadmap:</strong> Your local authority playbook</li>
                                </ul>
                            </div>
                            <div class="bg-brand-navy p-5 rounded-lg text-white">
                                <h4 class="font-bold text-brand-gold mb-3 text-sm"><i class="fas fa-chart-line mr-2"></i> The Outcome</h4>
                                <p class="text-sm leading-relaxed opacity-90">High-value patients choose you because of trust, not rank. You own the geography DSOs can''t penetrate.</p>
                                <div class="mt-4 pt-4 border-t border-white/10">
                                    <p class="text-[10px] uppercase tracking-widest text-brand-gold/70 font-bold">Key Feature</p>
                                    <p class="text-sm mt-1">We uncover hidden opportunities to connect with your ideal patients.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DIGITAL -->
                    <div x-show="currentLayer === ''digital''" x-transition.opacity.duration.300ms x-cloak>
                        <div class="inline-block bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-full text-xs font-bold mb-4">DIGITAL</div>
                        <h3 class="text-2xl font-serif font-bold text-brand-navy mb-3">AI-Powered Online Visibility</h3>
                        <p class="text-slate-500 mb-6">Amplify your practice with agentic AI marketing technology built specifically for dental — not a generic ad setup.</p>

                        <div class="grid md:grid-cols-2 gap-5">
                            <div class="bg-brand-cream p-5 rounded-lg">
                                <h4 class="font-bold text-brand-navy mb-3 text-sm"><i class="fas fa-laptop-code text-brand-gold mr-2"></i> Tangible Deliverables</h4>
                                <ul class="text-sm text-slate-600 space-y-2 check-list">
                                    <li><strong>New Practice Website:</strong> Built to convert, not just look nice</li>
                                    <li><strong>AI-Managed Ads:</strong> Google &amp; Meta — ad spend included</li>
                                    <li><strong>Local SEO:</strong> GBP optimization &amp; monitoring</li>
                                    <li><strong>PMS Integration:</strong> Direct connection for attribution</li>
                                    <li><strong>Call Tracking:</strong> Every call recorded &amp; source-attributed</li>
                                </ul>
                            </div>
                            <div class="bg-brand-navy p-5 rounded-lg text-white">
                                <h4 class="font-bold text-brand-gold mb-3 text-sm"><i class="fas fa-chart-line mr-2"></i> The Outcome</h4>
                                <p class="text-sm leading-relaxed opacity-90">Your digital presence actively repels price shoppers and attracts premium patients — with reporting so clear you''ll always know what''s working.</p>
                                <div class="mt-4 pt-4 border-t border-white/10">
                                    <p class="text-[10px] uppercase tracking-widest text-brand-gold/70 font-bold">Included at no extra cost</p>
                                    <p class="text-sm mt-1">Website, ad spend, call tracking, and PMS attribution — all baked in.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- PROOF / RESULTS                             -->
    <!-- ════════════════════════════════════════════ -->
    <section class="py-16 bg-white border-y border-brand-creamDark">
        <div class="max-w-5xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-10">
                <p class="text-xs font-bold uppercase tracking-[3px] text-brand-gold mb-2">It works</p>
                <h2 class="text-2xl font-serif font-bold text-brand-navy">What addressing both sides of the funnel produces.</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="stat-highlight rounded-xl p-7 card-lift">
                    <div class="font-serif text-4xl font-bold text-brand-navy mb-2">32 <span class="text-brand-gold">→ 56</span></div>
                    <p class="text-sm text-slate-500 leading-relaxed mb-3">New patients per month — same market, same digital foundation. Adding the internal and local layer did what additional digital spend could not.</p>
                    <p class="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold">Millcreek, UT</p>
                </div>
                <div class="stat-highlight rounded-xl p-7 card-lift">
                    <div class="font-serif text-4xl font-bold text-brand-gold mb-2">$64k</div>
                    <p class="text-sm text-slate-500 leading-relaxed mb-3">Attributable production in the first five weeks — before the community layer was fully built. The dormant patient base alone moved the number.</p>
                    <p class="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold">Garland, TX</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- OFFER SECTION                               -->
    <!-- ════════════════════════════════════════════ -->
    <section id="offer" class="py-20 bg-brand-navy text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div class="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-brand-gold rounded-full filter blur-3xl opacity-5"></div>

        <div class="max-w-4xl mx-auto px-6 relative z-10">
            <!-- Bonus header -->
            <div class="text-center mb-12">
                <div class="inline-block bg-brand-gold/20 border border-brand-gold text-brand-gold px-4 py-1 rounded text-sm font-bold mb-4">
                    VALID UNTIL [BONUS_EXPIRATION_DATE]
                </div>
                <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">Bonus Strategic Accelerators Included</h2>
                <p class="text-lg text-gray-300 font-light">To reward decisive action, we''re including 2 Accelerators for free if we move forward by the deadline.</p>
            </div>

            <!-- Bonus cards -->
            <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12">
                <div class="space-y-8" id="bonuses-container">
                    <!-- BONUSES_PLACEHOLDER -->
                </div>
            </div>

            <!-- ROI Logic -->
            <div class="bg-white/10 border border-white/20 p-6 rounded-lg text-center mb-12 max-w-2xl mx-auto backdrop-blur-sm">
                <h4 class="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">The ROI Logic</h4>
                <p class="text-lg text-gray-300 font-light">
                    Get 2–3 implants, veneers, or Invisalign treatments and the entire system is paid for.
                    <br><span class="font-bold text-white">Anything beyond that builds your bottom line.</span>
                </p>
            </div>

            <!-- ═══ PRICING CARDS ═══ -->
            <div class="grid md:grid-cols-2 gap-6 mb-10">
                <!-- Monthly -->
                <div class="bg-white text-slate-900 p-8 rounded-xl border-4 border-transparent hover:border-brand-gold/30 transition flex flex-col card-lift">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-brand-navy mb-2">Monthly</h3>
                        <div class="text-4xl font-bold mb-1">$3,995<span class="text-base font-normal text-slate-400">/mo</span></div>
                        <p class="text-slate-400 text-sm mb-6">No contract. Cancel anytime.<br>You own all assets forever.</p>

                        <ul class="text-sm text-slate-500 space-y-2.5 mb-8 border-t border-slate-100 pt-5">
                            <li><i class="fas fa-check text-brand-green mr-2"></i> All 3 Strategy Layers</li>
                            <li><i class="fas fa-check text-brand-green mr-2"></i> New website + AI-managed ads</li>
                            <li><i class="fas fa-check text-brand-green mr-2"></i> Ad spend included</li>
                            <li><i class="fas fa-check text-brand-green mr-2"></i> PMS integration + call tracking</li>
                            <li><i class="fas fa-check text-brand-green mr-2"></i> Weekly calls month 1, monthly after</li>
                            <li><i class="fas fa-check text-brand-green mr-2"></i> 14-Day Refund Guarantee</li>
                        </ul>
                    </div>
                    <a href="https://link.opkie.com/documents/doc-form/69d3e6b55b0644e0993db8f5?locale=en-US" target="_blank" class="w-full block text-center py-3.5 border-2 border-brand-navy text-brand-navy font-bold rounded hover:bg-brand-navy hover:text-white transition">
                        Review Agreement
                    </a>
                </div>

                <!-- Accelerated Launch -->
                <div class="bg-brand-gold text-brand-navy p-8 rounded-xl border-4 border-white shadow-2xl transform md:scale-[1.03] relative flex flex-col">
                    <div class="absolute top-0 right-0 bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded-bl-lg">SAVE $490</div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold mb-2">Accelerated Launch</h3>
                        <div class="text-4xl font-bold mb-1">$7,500<span class="text-base font-normal opacity-60"> one-time</span></div>
                        <p class="opacity-70 text-sm mb-6">Covers months 1 &amp; 2 in full. No payment until month 3.<br>Then $3,995/mo. You own all assets forever.</p>

                        <ul class="text-sm opacity-80 space-y-2.5 mb-8 border-t border-brand-navy/15 pt-5">
                            <li><i class="fas fa-check mr-2"></i> <strong>Everything in Monthly</strong></li>
                            <li><i class="fas fa-check mr-2"></i> <strong>Months 1 &amp; 2 fully paid</strong> — next payment at month 3</li>
                            <li><i class="fas fa-check mr-2"></i> <strong>2x strategy sessions</strong> during month 1</li>
                            <li><i class="fas fa-check mr-2"></i> Priority build &amp; launch queue</li>
                            <li><i class="fas fa-check mr-2"></i> Instant $490 savings vs. monthly</li>
                        </ul>
                    </div>
                    <a href="https://link.opkie.com/documents/doc-form/69d3e95a5d2b0fd18d2b475d?locale=en-US" target="_blank" class="w-full block text-center py-3.5 bg-brand-navy text-white font-bold rounded hover:bg-brand-navyLight transition shadow-lg">
                        Lock In Accelerated Launch
                    </a>
                    <p class="text-[11px] text-center mt-3 opacity-50">Redirects to secure agreement</p>
                </div>
            </div>

            <!-- Questions -->
            <div class="text-center mb-12">
                <p class="text-gray-400 text-sm">
                    Have questions?
                    <a href="[PREPARED_BY_CALENDAR_LINK]" target="_blank" class="text-brand-gold hover:text-white underline decoration-dotted underline-offset-4">
                        Book a quick call with [PREPARED_BY_FIRST_NAME]
                    </a>
                </p>
            </div>

            <!-- Guarantees -->
            <div class="border-t border-white/10 pt-10">
                <div class="grid md:grid-cols-2 gap-8 text-center md:text-left">
                    <div class="flex flex-col md:flex-row items-center gap-4">
                        <div class="text-brand-gold text-3xl"><i class="fas fa-undo"></i></div>
                        <div>
                            <h4 class="font-bold text-white">14-Day "No Regrets" Refund</h4>
                            <p class="text-sm text-gray-400">If you don''t feel the momentum in 2 weeks, we refund 100%. You keep the strategy.</p>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row items-center gap-4">
                        <div class="text-brand-gold text-3xl"><i class="fas fa-chart-line"></i></div>
                        <div>
                            <h4 class="font-bold text-white">60-Day Performance Guarantee</h4>
                            <p class="text-sm text-gray-400">If we don''t hit 2X ROI in production opportunity, we work for free until we do.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════ -->
    <!-- FOOTER                                      -->
    <!-- ════════════════════════════════════════════ -->
    <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <img src="https://assets.cdn.filesafe.space/vmzEamyXqsd9g2bEFYGu/media/67660cd505c6f02139705a90.svg" alt="Opkie" class="h-7 w-auto mx-auto mb-6 opacity-40 invert">

            <h3 class="text-white font-serif text-xl mb-6">Questions? Ready to start?</h3>

            <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div class="flex items-center gap-3">
                    <i class="fas fa-envelope text-brand-gold"></i>
                    <a href="mailto:[PREPARED_BY_EMAIL]" class="hover:text-white transition">[PREPARED_BY_EMAIL]</a>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fas fa-phone text-brand-gold"></i>
                    <a href="tel:[PREPARED_BY_PHONE_RAW]" class="hover:text-white transition">[PREPARED_BY_PHONE]</a>
                </div>
            </div>

            <a href="[PREPARED_BY_CALENDAR_LINK]" target="_blank" class="inline-block border border-slate-700 text-slate-400 px-6 py-2 rounded-full text-sm hover:bg-slate-800 hover:text-white transition mb-8">
                Book a Call with [PREPARED_BY_FIRST_NAME]
            </a>

            <p class="text-sm opacity-40">&copy; 2026 Opkie. Prepared exclusively for [PREPARED_FOR_COMPANY].</p>
        </div>
    </footer>

</body>
</html>',
updated_at = NOW()
WHERE is_active = true;
